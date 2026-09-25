/**
 * Point clouds for each journey stop, all built to fit a unit sphere. Pure maths, seeded, so every visit
 * looks the same. Each cloud is positions (xyz), tint (0 = ink, 1 = gold) and size per point.
 */
export type Cloud = { positions: Float32Array; tint: Float32Array; size: Float32Array };

export function rng(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Collects points, then packs them into typed arrays. */
function builder() {
  const p: number[] = [];
  const t: number[] = [];
  const s: number[] = [];
  return {
    add(x: number, y: number, z: number, tint = 0, size = 1) {
      p.push(x, y, z);
      t.push(tint);
      s.push(size);
    },
    done(): Cloud {
      return { positions: new Float32Array(p), tint: new Float32Array(t), size: new Float32Array(s) };
    },
  };
}

const gauss = (r: () => number) => Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(2 * Math.PI * r());

/** 10^26 m: filaments of galaxies strung between clusters (the cosmic web). */
export function cosmos(): Cloud {
  const r = rng(26);
  const b = builder();
  const nodes = Array.from({ length: 46 }, () => {
    const u = r() * 2 - 1;
    const a = r() * Math.PI * 2;
    const rad = Math.cbrt(r()) * 1.05;
    const q = Math.sqrt(1 - u * u);
    return [Math.cos(a) * q * rad, u * rad * 0.8, Math.sin(a) * q * rad] as const;
  });
  for (const [i, n] of nodes.entries()) {
    const near = nodes
      .map((m, j) => ({ j, d: Math.hypot(m[0] - n[0], m[1] - n[1], m[2] - n[2]) }))
      .filter((x) => x.j > i)
      .sort((x, y) => x.d - y.d)
      .slice(0, 2);
    for (const { j } of near) {
      const m = nodes[j];
      if (!m) continue;
      for (let k = 0; k < 170; k++) {
        const f = r();
        const j2 = 0.04;
        b.add(n[0] + (m[0] - n[0]) * f + gauss(r) * j2, n[1] + (m[1] - n[1]) * f + gauss(r) * j2, n[2] + (m[2] - n[2]) * f + gauss(r) * j2, r() > 0.96 ? 1 : 0, 0.5 + r() * 0.8);
      }
    }
    for (let k = 0; k < 45; k++) b.add(n[0] + gauss(r) * 0.06, n[1] + gauss(r) * 0.06, n[2] + gauss(r) * 0.06, r() > 0.8 ? 1 : 0, 0.7 + r());
  }
  return b.done();
}

/** 10^21 m: a three-armed spiral with a warm bulge. */
export function galaxy(): Cloud {
  const r = rng(21);
  const b = builder();
  for (let i = 0; i < 22000; i++) {
    const arm = i % 3;
    const t = Math.pow(r(), 0.75);
    const a = t * 6.4 + (arm * Math.PI * 2) / 3 + gauss(r) * (0.32 - t * 0.18);
    const rad = t * 1.0 + gauss(r) * 0.02;
    const y = gauss(r) * 0.03 * (1 - t);
    b.add(Math.cos(a) * rad, y, Math.sin(a) * rad, t < 0.12 ? 1 : r() > 0.94 ? 1 : 0, 0.6 + r() * (1 - t));
  }
  for (let i = 0; i < 2500; i++) b.add(gauss(r) * 0.09, gauss(r) * 0.05, gauss(r) * 0.09, 1, 1 + r());
  return b.done();
}

/** 10^13 m: the Sun and the orbits of the planets, each planet a small bright clump. */
export function solar(): Cloud {
  const r = rng(13);
  const b = builder();
  for (let i = 0; i < 1800; i++) b.add(gauss(r) * 0.035, gauss(r) * 0.035, gauss(r) * 0.035, 1, 1.4 + r());
  const orbits = [0.16, 0.25, 0.34, 0.46, 0.68, 0.86, 1.0];
  for (const [k, R] of orbits.entries()) {
    const n = Math.round(500 * R) + 120;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      b.add(Math.cos(a) * R, 0, Math.sin(a) * R, 0, 0.55);
    }
    const pa = k * 2.1 + 0.6;
    const pr = k === 2 ? 0.018 : 0.012 + (k > 3 ? 0.012 : 0);
    for (let i = 0; i < 90; i++) b.add(Math.cos(pa) * R + gauss(r) * pr, gauss(r) * pr, Math.sin(pa) * R + gauss(r) * pr, k === 2 ? 1 : 0, 1.2);
  }
  return b.done();
}

/** Cheap smooth 3D noise from summed sines, enough to suggest continents. */
const land = (x: number, y: number, z: number) =>
  Math.sin(x * 3.1 + 1.3) * Math.cos(y * 2.7 - 0.4) + Math.sin(z * 3.7 + x * 1.9) * 0.8 + Math.cos(y * 5.3 + z * 2.1) * 0.35;

/** 10^7 m: the Earth, continents in gold, a thin shell of atmosphere. */
export function earth(): Cloud {
  const b = builder();
  const n = 12000;
  const R = 0.62;
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const q = Math.sqrt(1 - y * y);
    const a = i * 2.399963;
    const x = Math.cos(a) * q;
    const z = Math.sin(a) * q;
    const onLand = land(x, y, z) > 0.55;
    b.add(x * R, y * R, z * R, onLand ? 1 : 0, onLand ? 1.1 : 0.55);
  }
  const r = rng(7);
  for (let i = 0; i < 1600; i++) {
    const a = r() * Math.PI * 2;
    const rr = R * (1.05 + r() * 0.04);
    b.add(Math.cos(a) * rr, Math.sin(a) * rr, 0, 0, 0.5);
  }
  return b.done();
}

/** 10^4 m: a mountain range, and below the crust line its much deeper root (isostasy, 78:7). */
export function mountain(): Cloud {
  const r = rng(4);
  const b = builder();
  const ridge = (x: number) => Math.max(0, 0.34 * Math.exp(-((x * 1.6) ** 2)) + 0.12 * Math.sin(x * 9) * Math.exp(-((x * 1.3) ** 2)));
  for (let i = 0; i < 9000; i++) {
    const x = r() * 2 - 1;
    const z = (r() - 0.5) * 0.5;
    const h = ridge(x) * (1 - Math.abs(z) * 1.2);
    b.add(x, h * r(), z, 0, 0.7);
    b.add(x, -h * 3.2 * Math.pow(r(), 0.7) - 0.02, z, 1, 0.6);
  }
  for (let i = 0; i < 700; i++) b.add(r() * 2.2 - 1.1, 0, (r() - 0.5) * 0.6, 0, 0.45);
  return b.done();
}

/** 10^0 m: the reader. Points trace the first word revealed, اقْرَأْ, "Read" (96:1). Needs a canvas (browser only). */
export function reader(): Cloud {
  const b = builder();
  const W = 520;
  const H = 300;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return b.done();
  ctx.fillStyle = "#fff";
  ctx.font = `200px "Amiri Quran", "Amiri", serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.direction = "rtl";
  ctx.fillText("ٱقْرَأْ", W / 2, H / 2 + 10);
  const data = ctx.getImageData(0, 0, W, H).data;
  const r = rng(0);
  for (let y = 0; y < H; y += 2) {
    for (let x = 0; x < W; x += 2) {
      const alpha = data[(y * W + x) * 4 + 3] ?? 0;
      if (alpha > 128 && r() > 0.25) b.add((x / W - 0.5) * 1.9, -(y / H - 0.5) * 1.1, (r() - 0.5) * 0.06, r() > 0.8 ? 1 : 0, 0.9 + r() * 0.6);
    }
  }
  for (let i = 0; i < 1400; i++) b.add(gauss(r) * 0.9, gauss(r) * 0.5, gauss(r) * 0.4, 0, 0.4);
  return b.done();
}

/** 10^-2 m: honeycomb. Hexagon walls as points; the centre cells hold honey (gold). */
export function hive(): Cloud {
  const r = rng(-2);
  const b = builder();
  const s = 0.11;
  for (let q = -6; q <= 6; q++) {
    for (let k = -6; k <= 6; k++) {
      const cx = s * Math.sqrt(3) * (q + k / 2);
      const cy = s * 1.5 * k;
      const d = Math.hypot(cx, cy);
      if (d > 0.95) continue;
      const honey = d < 0.35;
      for (let e = 0; e < 6; e++) {
        const a1 = (Math.PI / 3) * e + Math.PI / 6;
        const a2 = a1 + Math.PI / 3;
        for (let i = 0; i < 16; i++) {
          const f = i / 16;
          const x = cx + s * (Math.cos(a1) * (1 - f) + Math.cos(a2) * f);
          const y = cy + s * (Math.sin(a1) * (1 - f) + Math.sin(a2) * f);
          b.add(x, y, (r() - 0.5) * 0.02, honey ? 1 : 0, 0.8);
        }
      }
      if (honey) for (let i = 0; i < 26; i++) b.add(cx + gauss(r) * s * 0.3, cy + gauss(r) * s * 0.3, 0.01, 1, 0.6);
    }
  }
  return b.done();
}

/** 10^-3 m: an embryo at about four weeks, a curled body with paired somites. Abstract, not anatomical. */
export function embryo(): Cloud {
  const r = rng(-3);
  const b = builder();
  for (let i = 0; i < 16000; i++) {
    const t = r();
    const a = -0.6 + t * 4.6;
    const R = 0.52 - t * 0.12;
    const cx = Math.cos(a) * R;
    const cy = Math.sin(a) * R;
    const somite = 1 + 0.18 * Math.max(0, Math.sin(t * 60)) * (t > 0.2 && t < 0.85 ? 1 : 0);
    const tube = (0.06 + 0.16 * Math.pow(1 - t, 2.2) + 0.07 * Math.exp(-((t / 0.08) ** 2))) * somite;
    const u = r() * Math.PI * 2;
    const nx = Math.cos(a);
    const ny = Math.sin(a);
    b.add(cx + nx * Math.cos(u) * tube, cy + ny * Math.cos(u) * tube, Math.sin(u) * tube, t < 0.1 && r() > 0.7 ? 1 : 0, 0.7 + r() * 0.5);
  }
  for (let i = 0; i < 2000; i++) {
    const a = r() * Math.PI * 2;
    const rr = 0.92 + gauss(r) * 0.02;
    b.add(Math.cos(a) * rr, Math.sin(a) * rr, gauss(r) * 0.05, 0, 0.45);
  }
  return b.done();
}

/** 10^-10 m: an atom. A gold nucleus and the electron's probability cloud (1s shell and a 2p lobe pair). */
export function atom(): Cloud {
  const r = rng(-10);
  const b = builder();
  for (let n = 0; n < 12; n++) {
    const cx = gauss(r) * 0.03;
    const cy = gauss(r) * 0.03;
    const cz = gauss(r) * 0.03;
    for (let i = 0; i < 80; i++) b.add(cx + gauss(r) * 0.008, cy + gauss(r) * 0.008, cz + gauss(r) * 0.008, 1, 1.2);
  }
  for (let i = 0; i < 9000; i++) {
    const rad = -Math.log(r() + 1e-9) * 0.16;
    const u = r() * 2 - 1;
    const a = r() * Math.PI * 2;
    const q = Math.sqrt(1 - u * u);
    b.add(Math.cos(a) * q * rad, u * rad, Math.sin(a) * q * rad, 0, 0.55);
  }
  for (let i = 0; i < 7000; i++) {
    const side = r() > 0.5 ? 1 : -1;
    const rad = Math.abs(gauss(r)) * 0.28 + 0.1;
    b.add(side * rad * 1.6, gauss(r) * 0.12, gauss(r) * 0.12, 0, 0.5);
  }
  return b.done();
}

/** Faint fixed stars behind everything. */
export function stars(): Cloud {
  const r = rng(1447);
  const b = builder();
  for (let i = 0; i < 2600; i++) {
    const u = r() * 2 - 1;
    const a = r() * Math.PI * 2;
    const q = Math.sqrt(1 - u * u);
    b.add(Math.cos(a) * q * 40, u * 40, Math.sin(a) * q * 40, r() > 0.97 ? 1 : 0, 0.5 + r() * r() * 2.2);
  }
  return b.done();
}
