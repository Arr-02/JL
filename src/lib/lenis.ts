import Lenis from "lenis";

let lenis: Lenis | null = null;

/** Lenis 单例；prefers-reduced-motion 下返回 null（退化为原生滚动） */
export function getLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  if (!lenis) {
    lenis = new Lenis({ lerp: 0.1 });
    const raf = (time: number) => {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }
  return lenis;
}
