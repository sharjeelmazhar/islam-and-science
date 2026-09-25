import { createStore } from "zustand/vanilla";
import { useStore } from "zustand";
import { LAYERS, LAYER_IDS, type SceneId } from "./layers";

/**
 * What the background sky shows. Pages and the home journey write here; the canvas reads it every frame
 * without React re-rendering.
 * - `stop`: position along the journey in stop units (0 = cosmos … 8 = atom); fractional between stops.
 * - `scale`: the matching size in log10 metres, for the scale ruler.
 * This module must not import three.js: it runs in the main bundle. The sky subscribes and repaints itself.
 */
export type SceneState = { stop: number; scale: number };

export const sceneStore = createStore<SceneState>()(() => ({ stop: 1, scale: 21 }));

const scales = LAYER_IDS.map((id) => LAYERS[id].scale);

/** Real scale (log10 m) at a fractional stop, interpolated between neighbouring stops. */
export function scaleAtStop(stop: number): number {
  const i = Math.max(0, Math.min(scales.length - 1, Math.floor(stop)));
  const a = scales[i] ?? 0;
  const b = scales[Math.min(scales.length - 1, i + 1)] ?? a;
  return a + (b - a) * (stop - i);
}

export function setStop(stop: number, scale = scaleAtStop(stop)) {
  sceneStore.setState({ stop, scale });
}

export const stopOf = (id: SceneId) => LAYER_IDS.indexOf(id);

export const useSceneScale = () => useStore(sceneStore, (s) => s.scale);
