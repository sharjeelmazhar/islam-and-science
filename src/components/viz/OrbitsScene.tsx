import { useEffect, useMemo, useRef, type ComponentRef } from "react";
import { Canvas, invalidate, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { BufferAttribute, BufferGeometry, Color, Line, LineBasicMaterial, type Mesh, Vector3 } from "three";
import { MOON, PLANETS, SUN, focus, positions, type BodyId, type Frame, type Vec3 } from "./orbits-model";

export type OrbitsProps = { frame: Frame; playing: boolean; speed: number; trails: boolean; resetKey: number };

const BODY_IDS = ["sun", "mercury", "venus", "earth", "mars", "moon"] as const satisfies readonly BodyId[];
const LOOK: Record<Frame, Vec3> = { helio: [0, 1.7, 2.6], geo: [0, 2.8, 1.4], galactic: [-1.9, 1.1, 2.3] };
const TRAIL = 900;
const colorOf = (id: BodyId) => (id === "sun" ? SUN.color : id === "moon" ? MOON.color : PLANETS[id].color);
const radiusOf = (id: BodyId) => (id === "sun" ? SUN.r : id === "moon" ? MOON.r : PLANETS[id].r);
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

function makeTrail(id: BodyId) {
  const g = new BufferGeometry();
  g.setAttribute("position", new BufferAttribute(new Float32Array(TRAIL * 3), 3));
  g.setDrawRange(0, 0);
  const line = new Line(g, new LineBasicMaterial({ color: new Color(colorOf(id)), transparent: true, opacity: 0.55 }));
  line.frustumCulled = false;
  return { line, n: 0 };
}

/** The WebGL part of OrbitsViz, loaded only when the figure nears the viewport. */
export default function OrbitsScene(props: OrbitsProps) {
  return (
    <Canvas frameloop={props.playing ? "always" : "demand"} dpr={[1, 1.75]} camera={{ position: [...LOOK[props.frame]], fov: 45, near: 0.01, far: 200 }}>
      <Model {...props} />
    </Canvas>
  );
}

function Model({ frame, playing, speed, trails, resetKey }: OrbitsProps) {
  const sim = useRef({ days: 0, from: frame, to: frame, t: 1, sample: 0 });
  const bodies = useRef<Partial<Record<BodyId, Mesh | null>>>({});
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);

  // One line per body for trails, drawn from a fixed-size buffer.
  const lines = useMemo(
    () => ({
      sun: makeTrail("sun"),
      mercury: makeTrail("mercury"),
      venus: makeTrail("venus"),
      earth: makeTrail("earth"),
      mars: makeTrail("mars"),
      moon: makeTrail("moon"),
    }),
    [],
  );

  const clearTrails = () => {
    for (const id of BODY_IDS) {
      lines[id].n = 0;
      lines[id].line.geometry.setDrawRange(0, 0);
    }
  };

  // Switching frame glides every body from its old description to the new one.
  useEffect(() => {
    const s = sim.current;
    if (s.to === frame) return;
    s.from = s.to;
    s.to = frame;
    s.t = 0;
    clearTrails();
    invalidate();
  }, [frame]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    sim.current.days = 0;
    clearTrails();
    controls.current?.object.position.set(...LOOK[sim.current.to]);
    invalidate();
  }, [resetKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const target = useMemo(() => new Vector3(), []);

  useFrame((_, dt) => {
    const s = sim.current;
    const step = Math.min(dt, 0.05);
    const perSecond = 4 * 60 ** (speed / 100);
    if (playing) s.days += step * perSecond;
    if (s.t < 1) {
      s.t = Math.min(1, s.t + step / 1.4);
      invalidate();
    }
    const k = ease(s.t);
    const a = positions(s.from, s.days);
    const b = positions(s.to, s.days);
    for (const id of BODY_IDS) {
      const m = bodies.current[id];
      if (!m) continue;
      m.position.set(a[id][0] + (b[id][0] - a[id][0]) * k, a[id][1] + (b[id][1] - a[id][1]) * k, a[id][2] + (b[id][2] - a[id][2]) * k);
    }
    const fa = focus(s.from, a);
    const fb = focus(s.to, b);
    target.set(fa[0] + (fb[0] - fa[0]) * k, fa[1] + (fb[1] - fa[1]) * k, fa[2] + (fb[2] - fa[2]) * k);
    const c = controls.current;
    if (c) {
      const shift = target.clone().sub(c.target);
      c.target.copy(target);
      c.object.position.add(shift);
      c.update();
    }

    if (trails && playing && s.t >= 1) {
      s.sample += step * perSecond;
      if (s.sample > 1.5) {
        s.sample = 0;
        for (const id of BODY_IDS) {
          if ((s.to === "helio" && id === "sun") || (s.to === "geo" && id === "earth")) continue;
          const tr = lines[id];
          const attr = tr.line.geometry.getAttribute("position");
          if (!(attr instanceof BufferAttribute)) continue;
          if (tr.n >= TRAIL) {
            attr.array.copyWithin(0, 3);
            tr.n = TRAIL - 1;
          }
          const p = b[id];
          attr.setXYZ(tr.n, p[0], p[1], p[2]);
          tr.n++;
          attr.needsUpdate = true;
          tr.line.geometry.setDrawRange(0, tr.n);
        }
      }
    }
  });

  return (
    <>
      <OrbitControls ref={controls} enablePan={false} minDistance={0.6} maxDistance={8} onChange={() => invalidate()} />
      {BODY_IDS.map((id) => (
        <mesh
          key={id}
          ref={(el) => {
            bodies.current[id] = el;
          }}
        >
          <sphereGeometry args={[radiusOf(id), 24, 16]} />
          <meshBasicMaterial color={colorOf(id)} />
        </mesh>
      ))}
      {trails ? BODY_IDS.map((id) => <primitive key={`t-${id}`} object={lines[id].line} />) : null}
      <Guides frame={frame} />
    </>
  );
}

/** Faint orbit circles: the planets' orbits around the Sun, or the Sun's apparent yearly circle around Earth. */
function Guides({ frame }: { frame: Frame }) {
  const rings = frame === "helio" ? Object.values(PLANETS).map((p) => p.a) : frame === "geo" ? [1] : [];
  return (
    <>
      {rings.map((r) => (
        <mesh key={r} rotation-x={-Math.PI / 2}>
          <ringGeometry args={[r - 0.002, r + 0.002, 160]} />
          <meshBasicMaterial color={frame === "geo" ? SUN.color : "#ffffff"} transparent opacity={frame === "geo" ? 0.3 : 0.14} />
        </mesh>
      ))}
    </>
  );
}
