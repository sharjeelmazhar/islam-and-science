/**
 * The journey's stops. Each layer is a point cloud drawn at unit size and shown at its own power of ten,
 * so the camera never needs a float range of 10^36: zooming just rescales nested layers (Powers of Ten).
 */
export const LAYERS = {
  cosmos: { scale: 26, name: "The observable universe" },
  galaxy: { scale: 21, name: "The Milky Way" },
  solar: { scale: 13, name: "The Solar System" },
  earth: { scale: 7, name: "The Earth" },
  mountain: { scale: 4, name: "A mountain and its root" },
  reader: { scale: 0, name: "A reader" },
  hive: { scale: -2, name: "A honeycomb" },
  embryo: { scale: -3, name: "An embryo at four weeks" },
  atom: { scale: -10, name: "An atom" },
} as const satisfies Record<string, { scale: number; name: string }>;

export type SceneId = keyof typeof LAYERS;
export const LAYER_IDS = Object.keys(LAYERS) as readonly SceneId[]; // eslint-disable-line @typescript-eslint/consistent-type-assertions -- Object.keys loses the literal keys of a const object
