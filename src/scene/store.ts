import { createStore } from "zustand/vanilla";
import { useStore } from "zustand";
import { invalidate } from "@react-three/fiber";

/**
 * What the background sky shows. Pages and the home journey write here; the canvas reads it every frame
 * without React re-rendering. `scale` is log10 metres (the zoom); `dim` fades the sky behind long reading.
 */
export type SceneState = { scale: number; dim: number; drift: number };

export const sceneStore = createStore<SceneState>()(() => ({ scale: 21, dim: 0, drift: 0 }));

export function setScene(patch: Partial<SceneState>) {
  sceneStore.setState(patch);
  invalidate();
}

export const useSceneScale = () => useStore(sceneStore, (s) => s.scale);
