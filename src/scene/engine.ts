/**
 * The sky renderer: plain WebGL, no three.js. It draws the journey's point clouds and nothing else, so it
 * can stay tiny. Frames are drawn only while something is moving (the journey position easing, a scroll
 * sway, the pointer, a resize or a theme flip); at rest the GPU is idle.
 *
 * Each layer is a cloud built to fit a unit sphere and shown at its own power of ten: layer i is scaled by
 * 10^((stop - i) * K), so neighbouring layers grow past the camera or shrink into a point of light.
 */
import { LAYER_IDS, type SceneId } from "./layers";
import { sceneStore } from "./store";
import * as clouds from "./clouds";
import type { Cloud } from "./clouds";

/** Visual decades per journey stop: small enough that neighbouring stops overlap on screen. */
const K = 1.25;
const CAMERA_Z = 3.2;
const FOV = (50 * Math.PI) / 180;

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
const TILT: Record<SceneId, readonly [number, number, number]> = {
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

const VERTEX = `
attribute vec3 aPos;
attribute float aTint;
attribute float aSize;
uniform mat4 uModelView;
uniform mat4 uProj;
uniform float uPointScale;
varying float vTint;
varying float vNear;
void main() {
  vec4 mv = uModelView * vec4(aPos, 1.0);
  gl_Position = uProj * mv;
  gl_PointSize = min(aSize * uPointScale * (3.2 / -mv.z), 28.0);
  vTint = aTint;
  vNear = smoothstep(0.02, 0.6, -mv.z);
}`;

const FRAGMENT = `
precision mediump float;
uniform vec3 uInk;
uniform vec3 uGold;
uniform float uOpacity;
varying float vTint;
varying float vNear;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.05, d) * uOpacity * vNear;
  gl_FragColor = vec4(mix(uInk, uGold, vTint) * a, a);
}`;

type Layer = { buffer: WebGLBuffer; count: number };
type Vec3 = [number, number, number];

/** Starts the sky on a canvas and returns a cleanup function. Returns a no-op if WebGL is unavailable. */
export function startSky(canvas: HTMLCanvasElement): () => void {
  const context = canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: true, powerPreference: "high-performance" });
  if (!context) return () => undefined;
  const gl: WebGLRenderingContext = context; // narrowed once, so hoisted helpers below see a non-null context
  const program = link(gl);
  if (!program) return () => undefined;

  const loc = {
    pos: gl.getAttribLocation(program, "aPos"),
    tint: gl.getAttribLocation(program, "aTint"),
    size: gl.getAttribLocation(program, "aSize"),
    modelView: gl.getUniformLocation(program, "uModelView"),
    proj: gl.getUniformLocation(program, "uProj"),
    pointScale: gl.getUniformLocation(program, "uPointScale"),
    ink: gl.getUniformLocation(program, "uInk"),
    gold: gl.getUniformLocation(program, "uGold"),
    opacity: gl.getUniformLocation(program, "uOpacity"),
  };
  gl.useProgram(program);
  gl.enable(gl.BLEND);
  gl.disable(gl.DEPTH_TEST);

  const narrow = () => innerWidth / innerHeight <= 1.25;
  // Phones get half the points: the clouds read the same and the fill cost halves.
  const stride = innerWidth < 768 ? 2 : 1;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const upload = (c: Cloud): Layer | null => {
    const n = Math.floor(c.size.length / stride);
    const data = new Float32Array(n * 5);
    for (let i = 0; i < n; i++) {
      const j = i * stride;
      data.set([c.positions[j * 3] ?? 0, c.positions[j * 3 + 1] ?? 0, c.positions[j * 3 + 2] ?? 0, c.tint[j] ?? 0, c.size[j] ?? 1], i * 5);
    }
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    return { buffer, count: n };
  };

  // Clouds are built lazily, the first time a layer is close enough to be seen.
  const layers = new Map<SceneId | "stars", Layer | null>();
  let readerReady = false;
  void document.fonts.load(`200px "Amiri Quran"`).then(() => {
    readerReady = true;
    request();
  });
  const layer = (id: SceneId | "stars"): Layer | null => {
    if (layers.has(id)) return layers.get(id) ?? null;
    if (id === "reader" && !readerReady) return null;
    const l = upload(id === "stars" ? clouds.stars() : GENERATORS[id]());
    layers.set(id, l);
    return l;
  };

  // Colours come from the CSS tokens (styles/app.css), read once per theme change, never per frame.
  const palette: { dark: boolean; ink: Vec3; gold: Vec3 } = { dark: true, ink: [1, 1, 1], gold: [0.86, 0.74, 0.46] };
  const readPalette = () => {
    const css = getComputedStyle(document.documentElement);
    palette.dark = document.documentElement.dataset.theme !== "light";
    palette.ink = hex(css.getPropertyValue("--ink"), palette.ink);
    palette.gold = hex(css.getPropertyValue("--gold"), palette.gold);
  };
  readPalette();

  const view = { stop: sceneStore.getState().stop, rx: 0, ry: 0 };
  const input = { scroll: scrollY, px: 0, py: 0 };
  let dpr = 1;
  let frame = 0;
  let last = 0;

  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, stride === 2 ? 1.5 : 1.75);
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    request();
  };

  function request() {
    if (!frame && !document.hidden) frame = requestAnimationFrame(draw);
  }

  function draw(now: number) {
    frame = 0;
    const dt = last ? Math.min((now - last) / 1000, 0.1) : 1 / 60;
    last = now;
    const k = reduced ? 1 : 1 - Math.exp(-dt * 2.4);
    const target = sceneStore.getState().stop;
    const stop = Number.isFinite(target) ? target : view.stop;
    view.stop += (stop - view.stop) * k;
    const tx = input.py * 0.12;
    // A bounded sway with scroll: long pages must never turn a layer edge-on.
    const ty = input.px * 0.2 + Math.sin(input.scroll * 0.0006) * 0.22;
    view.rx += (tx - view.rx) * k;
    view.ry += (ty - view.ry) * k;
    const moving = Math.abs(stop - view.stop) > 1e-4 || Math.abs(tx - view.rx) > 1e-4 || Math.abs(ty - view.ry) > 1e-4;

    const aspect = canvas.width / canvas.height;
    const wide = !narrow();
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.blendFunc(gl.ONE, palette.dark ? gl.ONE : gl.ONE_MINUS_SRC_ALPHA);
    gl.uniformMatrix4fv(loc.proj, false, perspective(FOV, aspect, 0.01, 200));
    gl.uniform3fv(loc.ink, palette.ink);
    gl.uniform3fv(loc.gold, palette.gold);
    gl.uniform1f(loc.pointScale, 2.2 * dpr);

    const stars = layer("stars");
    if (stars) render(stars, modelView([0, 0, 0], 1, [0, 0, 0]), palette.dark ? 0.7 : 0.35);

    // On wide screens the sky sits to the right so it never competes with the text column.
    const offset = wide ? 1.35 : 0;
    const base = wide ? 0.82 : 0.9;
    for (const [i, id] of LAYER_IDS.entries()) {
      const d = view.stop - i;
      const opacity = (1 - smooth(0.25, 0.9, Math.abs(d))) * (palette.dark ? 0.9 : 0.55) * (wide ? 1 : 0.4);
      if (opacity < 0.005) continue;
      const l = layer(id);
      if (!l) continue;
      const [ax, ay, az] = TILT[id];
      render(l, modelView([offset, 0, 0], base * 10 ** (d * K), [ax + view.rx, ay + view.ry, az]), opacity);
    }
    if (moving) request();
  }

  function render(l: Layer, mv: Float32Array, opacity: number) {
    gl.bindBuffer(gl.ARRAY_BUFFER, l.buffer);
    gl.enableVertexAttribArray(loc.pos);
    gl.enableVertexAttribArray(loc.tint);
    gl.enableVertexAttribArray(loc.size);
    gl.vertexAttribPointer(loc.pos, 3, gl.FLOAT, false, 20, 0);
    gl.vertexAttribPointer(loc.tint, 1, gl.FLOAT, false, 20, 12);
    gl.vertexAttribPointer(loc.size, 1, gl.FLOAT, false, 20, 16);
    gl.uniformMatrix4fv(loc.modelView, false, mv);
    gl.uniform1f(loc.opacity, opacity);
    gl.drawArrays(gl.POINTS, 0, l.count);
  }

  const onScroll = () => {
    input.scroll = scrollY;
    request();
  };
  const onPointer = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    input.px = e.clientX / innerWidth - 0.5;
    input.py = e.clientY / innerHeight - 0.5;
    request();
  };
  const onVisible = () => {
    last = 0;
    request();
  };
  const unsubscribe = sceneStore.subscribe(request);
  const themeWatch = new MutationObserver(() => {
    readPalette();
    request();
  });
  themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("pointermove", onPointer, { passive: true });
  addEventListener("resize", resize);
  document.addEventListener("visibilitychange", onVisible);
  resize();

  return () => {
    cancelAnimationFrame(frame);
    unsubscribe();
    themeWatch.disconnect();
    removeEventListener("scroll", onScroll);
    removeEventListener("pointermove", onPointer);
    removeEventListener("resize", resize);
    document.removeEventListener("visibilitychange", onVisible);
    for (const l of layers.values()) if (l) gl.deleteBuffer(l.buffer);
    gl.deleteProgram(program);
  };
}

function link(gl: WebGLRenderingContext): WebGLProgram | null {
  const shader = (type: number, src: string) => {
    const s = gl.createShader(type);
    if (!s) return null;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const vs = shader(gl.VERTEX_SHADER, VERTEX);
  const fs = shader(gl.FRAGMENT_SHADER, FRAGMENT);
  const p = gl.createProgram();
  if (!vs || !fs) return null;
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  return gl.getProgramParameter(p, gl.LINK_STATUS) ? p : null;
}

/** "#dcbc76" → [r, g, b] in 0..1; falls back when the token is missing. */
function hex(value: string, fallback: Vec3): Vec3 {
  const m = /^#([0-9a-f]{6})$/i.exec(value.trim());
  if (!m?.[1]) return fallback;
  const n = parseInt(m[1], 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function perspective(fov: number, aspect: number, near: number, far: number) {
  const f = 1 / Math.tan(fov / 2);
  const nf = 1 / (near - far);
  return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
}

/** View × model for a layer: translate(pos) · scale(s) · Rx · Ry · Rz, with the camera at z = CAMERA_Z (column-major). */
function modelView([tx, ty, tz]: Vec3, s: number, [x, y, z]: Vec3) {
  const cx = Math.cos(x), sx = Math.sin(x), cy = Math.cos(y), sy = Math.sin(y), cz = Math.cos(z), sz = Math.sin(z);
  // R = Rx · Ry · Rz
  const r00 = cy * cz, r01 = -cy * sz, r02 = sy;
  const r10 = sx * sy * cz + cx * sz, r11 = -sx * sy * sz + cx * cz, r12 = -sx * cy;
  const r20 = -cx * sy * cz + sx * sz, r21 = cx * sy * sz + sx * cz, r22 = cx * cy;
  return new Float32Array([r00 * s, r10 * s, r20 * s, 0, r01 * s, r11 * s, r21 * s, 0, r02 * s, r12 * s, r22 * s, 0, tx, ty, tz - CAMERA_Z, 1]);
}

function smooth(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}
