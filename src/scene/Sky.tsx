import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, invalidate, useFrame, useThree } from "@react-three/fiber";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, NormalBlending, ShaderMaterial, type Group } from "three";
import { LAYER_IDS, type SceneId } from "./layers";
import { sceneStore } from "./store";
import * as clouds from "./clouds";
import type { Cloud } from "./clouds";

/**
 * The persistent sky behind every page. One canvas, one point cloud per journey stop.
 * Moving between stops zooms through nested powers of ten: each layer is scaled by 10^((stop - i) * K),
 * so neighbouring layers grow past the camera or shrink into a point of light.
 * frameloop="demand": nothing renders unless the stop changes, the page scrolls, the pointer moves or the theme flips.
 */
export default function Sky() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        frameloop="demand"
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 3.2], fov: 50, near: 0.01, far: 200 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <Layers />
      </Canvas>
    </div>
  );
}

/** Visual decades per journey stop: small enough that neighbouring stops overlap on screen. */
const K = 1.25;

const GENERATORS = {
  cosmos: clouds.cosmos,
  galaxy: clouds.galaxy,
  solar: clouds.solar,
  earth: clouds.earth,
  mountain: clouds.mountain,
  reader: clouds.reader,
  hive: clouds.hive,
  embryo: clouds.embryo,
  atom: clouds.atom,
} satisfies Record<SceneId, () => Cloud>;

/** Resting orientation per layer, so each reads well from the fixed camera. */
const TILT: Record<SceneId, [number, number, number]> = {
  cosmos: [0.3, 0, 0],
  galaxy: [1.05, 0, 0.25],
  solar: [1.2, 0, 0.1],
  earth: [0.35, 0, 0.2],
  mountain: [0.2, -0.35, 0],
  reader: [0, 0, 0],
  hive: [0.25, 0, 0],
  embryo: [0.1, 0.3, 0],
  atom: [0.4, 0.3, 0],
};

const vertex = /* glsl */ `
  attribute float aTint;
  attribute float aSize;
  uniform float uPixelRatio;
  uniform float uSize;
  varying float vTint;
  varying float vNear;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = min(aSize * uSize * uPixelRatio * (3.2 / -mv.z), 28.0);
    vTint = aTint;
    vNear = smoothstep(0.02, 0.6, -mv.z);
  }
`;
const fragment = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uGold;
  uniform float uOpacity;
  varying float vTint;
  varying float vNear;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d);
    gl_FragColor = vec4(mix(uInk, uGold, vTint), a * uOpacity * vNear);
  }
`;

/** A points material plus a typed handle on its uniforms (three types uniforms as a loose record). */
function makeMaterial() {
  const u = {
    uInk: { value: new Color("#fff") },
    uGold: { value: new Color("#dcbc76") },
    uOpacity: { value: 0 },
    uPixelRatio: { value: 1 },
    uSize: { value: 2.2 },
  };
  const material = new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: u,
  });
  return { material, u };
}

function toGeometry(c: Cloud) {
  const g = new BufferGeometry();
  g.setAttribute("position", new BufferAttribute(c.positions, 3));
  g.setAttribute("aTint", new BufferAttribute(c.tint, 1));
  g.setAttribute("aSize", new BufferAttribute(c.size, 1));
  return g;
}

/** Reads the theme tokens from CSS so the sky always matches the page (styles/app.css is the one source of colour). */
function readPalette() {
  const css = getComputedStyle(document.documentElement);
  const theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
  return { theme, ink: css.getPropertyValue("--ink").trim(), gold: css.getPropertyValue("--gold").trim() } as const;
}

function Layers() {
  const { gl, size } = useThree();
  const groups = useRef<(Group | null)[]>([]);
  const starsMat = useMemo(() => makeMaterial(), []);
  const starsGeo = useMemo(() => toGeometry(clouds.stars()), []);
  const mats = useMemo(() => LAYER_IDS.map(makeMaterial), []);
  // The sky only mounts in the browser, so clouds can be built on first render.
  // The reader layer waits for the Qur'an font so its letters trace correctly.
  const [geos, setGeos] = useState<(BufferGeometry | null)[]>(() =>
    LAYER_IDS.map((id) => (id === "reader" ? null : toGeometry(GENERATORS[id]()))),
  );
  useEffect(() => {
    let cancelled = false;
    void document.fonts.load(`200px "Amiri Quran"`).then(() => {
      if (cancelled) return;
      setGeos((g) => g.map((x, i) => (LAYER_IDS[i] === "reader" ? toGeometry(clouds.reader()) : x)));
      invalidate();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Repaint when a page moves the journey or the theme flips (the store and theme code stay three-free).
  useEffect(() => {
    const unsub = sceneStore.subscribe(() => invalidate());
    const mo = new MutationObserver(() => invalidate());
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      unsub();
      mo.disconnect();
    };
  }, []);

  // Scroll and pointer only nudge the view; they never start a loop.
  const input = useRef({ scroll: 0, px: 0, py: 0 });
  useEffect(() => {
    const onScroll = () => {
      input.current.scroll = scrollY;
      invalidate();
    };
    const onPointer = (e: PointerEvent) => {
      input.current.px = e.clientX / innerWidth - 0.5;
      input.current.py = e.clientY / innerHeight - 0.5;
      invalidate();
    };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("pointermove", onPointer);
    };
  }, []);

  const view = useRef({ stop: sceneStore.getState().stop, rx: 0, ry: 0, theme: "" });
  const reduced = useMemo(() => matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  useFrame((_, dt) => {
    const v = view.current;
    const target = sceneStore.getState().stop;
    const k = reduced ? 1 : 1 - Math.exp(-Math.min(dt, 0.1) * 2.4);
    v.stop += (target - v.stop) * k;
    const tx = input.current.py * 0.12;
    // A bounded sway with scroll: long pages must never turn a layer edge-on.
    const ty = input.current.px * 0.2 + Math.sin(input.current.scroll * 0.0006) * 0.22;
    v.rx += (tx - v.rx) * k;
    v.ry += (ty - v.ry) * k;
    const moving = Math.abs(target - v.stop) > 1e-4 || Math.abs(tx - v.rx) > 1e-4 || Math.abs(ty - v.ry) > 1e-4;

    const pal = readPalette();
    if (pal.theme !== v.theme) {
      v.theme = pal.theme;
      for (const m of [...mats, starsMat]) {
        m.u.uInk.value.set(pal.ink);
        m.u.uGold.value.set(pal.gold);
        m.material.blending = pal.theme === "dark" ? AdditiveBlending : NormalBlending;
        m.material.needsUpdate = true;
      }
    }
    const light = v.theme === "light";
    const pr = gl.getPixelRatio();
    starsMat.u.uOpacity.value = light ? 0.35 : 0.7;
    starsMat.u.uPixelRatio.value = pr;

    // On wide screens the sky sits to the right so it never competes with the text column.
    const wide = size.width / size.height > 1.25;
    const offset = wide ? 1.35 : 0;
    const base = wide ? 0.82 : 0.9;
    for (const [i, id] of LAYER_IDS.entries()) {
      const g = groups.current[i];
      const m = mats[i];
      if (!g || !m) continue;
      const d = v.stop - i;
      const opacity = 1 - smooth(0.25, 0.9, Math.abs(d));
      g.visible = opacity > 0.005;
      const [ax, ay, az] = TILT[id];
      g.scale.setScalar(base * 10 ** (d * K));
      g.position.x = offset;
      g.rotation.set(ax + v.rx, ay + v.ry, az);
      // On narrow screens the sky sits behind the text, so it steps back to a faint presence.
      m.u.uOpacity.value = opacity * (light ? 0.55 : 0.9) * (wide ? 1 : 0.4);
      m.u.uPixelRatio.value = pr;
    }
    if (moving) invalidate();
  });

  return (
    <>
      <points geometry={starsGeo} material={starsMat.material} />
      {LAYER_IDS.map((id, i) => {
        const g = geos[i];
        const m = mats[i];
        return (
          <group
            key={id}
            ref={(el) => {
              groups.current[i] = el;
            }}
          >
            {g && m ? <points geometry={g} material={m.material} /> : null}
          </group>
        );
      })}
    </>
  );
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
