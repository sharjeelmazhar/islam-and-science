import { useEffect, useRef } from "react";
import { startSky } from "./engine";

/**
 * The persistent sky behind every page: one fixed canvas driven by the small WebGL renderer in engine.ts.
 * Mounted only in the browser, after first paint (see routes/__root.tsx).
 */
export default function Sky() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => (canvas.current ? startSky(canvas.current) : undefined), []);
  return <canvas ref={canvas} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-lvh w-screen" />;
}
