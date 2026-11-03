import { useEffect, useRef, useState } from "react";

/**
 * 入场显影判定（对任何滚动方式鲁棒）：
 * 元素顶部到达视口触发线（或已被滚过）时置 true，之后保持。
 *
 * 取代 motion whileInView 的 IntersectionObserver 逐帧采样——后者在
 * 瞬间跳转滚动（End/PgDn/拖滚动条/刷新后恢复滚动位置）时会漏判，
 * 导致内容永久卡在 opacity:0 的隐藏态。本 hook 用 rAF 逐帧主动测量
 * 位置，不依赖事件时序；元素显影后轮询自动停止。
 */
export default function useRevealed<T extends HTMLElement = HTMLDivElement>(
  /** 触发线：视口高度的百分比（0.9 = 元素顶部进入视口 90% 处触发） */
  triggerRatio = 0.9,
) {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;
    let raf = 0;
    const loop = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * triggerRatio) {
        setRevealed(true);
        return; // 显影后停止轮询
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [triggerRatio, revealed]);

  return { ref, revealed };
}
