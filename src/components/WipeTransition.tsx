import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import useMediaQuery from "../lib/useMediaQuery";

type ColumnProps = {
  progress: MotionValue<number>;
  start: number;
  color: string;
};

/** 单列：scroll 进度从 start → 1 时，柱体从下方 100% 升起到 0 */
function Column({ progress, start, color }: ColumnProps) {
  const y = useTransform(progress, [start, 1], ["100%", "0%"]);
  return (
    <div className="wipe__col">
      <motion.div
        style={{
          y,
          width: "100%",
          height: "100%",
          background: color,
        }}
      />
    </div>
  );
}

type WipeTransitionProps = {
  /** 柱体颜色（= 本区块底色，升起后阶梯式盖住上一区块） */
  color: string;
};

/**
 * 阶梯柱状转场：放置于区块内部顶部（CSS: absolute; bottom: 100%），
 * 滚动经过时 5 列（移动端 3 列）柱体以中间列领先的节奏依次升起，
 * 用本区块底色把上一区块「阶梯式擦除」。
 *
 * 移动端优化：
 * - 触屏对 scroll 进度叠加临界阻尼弹簧（触屏无 Lenis 平滑）：
 *   吸收滚动事件量化造成的阶梯边缘生硬感，并掩盖 iOS/Android
 *   地址栏收展导致的进度跳变（视口高度突变 → useScroll 偏移跳帧）。
 * - 阶梯幅度小屏收敛：step 过大时（0.3）拱形落差达 ~25% 视口高，
 *   阶梯带会占据半个屏幕；移动端 step 收敛到 0.1（落差 ~8%）。
 * - will-change 仅在进度处于 (0,1) 活跃区间挂载到「实际做 transform
 *   的内层柱体」，用完即撤，避免常驻合成层吃显存（拆解文档 §4.1）。
 */
export default function WipeTransition({ color }: WipeTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTouch = useMediaQuery("(hover: none) and (pointer: coarse)");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });

  // 触屏专用弹簧：偏硬的临界阻尼（无回弹），快速跟随滚动、
  // 仅有 ~100ms 平滑尾迹，避免转场滞后脱节的同时掩盖地址栏跳变
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 800,
    damping: 60,
  });
  const progress = isTouch ? smoothed : scrollYProgress;

  // 活跃区间检测 → 切换 .wipe--active（挂/撤 will-change）
  const [active, setActive] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const on = v > 0 && v < 1;
    setActive((prev) => (prev === on ? prev : on));
  });

  if (reduce) return null;

  const count = isMobile ? 3 : 5;
  const mid = (count - 1) / 2;
  // 拱形差：中间列领先、两侧依次滞后；小屏收敛 step，避免阶梯带过高
  const step = isMobile ? 0.1 : 0.16;
  const starts = Array.from({ length: count }, (_, i) => Math.abs(i - mid) * step);

  return (
    <div
      ref={ref}
      className={`wipe${active ? " wipe--active" : ""}`}
      aria-hidden="true"
    >
      {starts.map((s, i) => (
        <Column key={i} progress={progress} start={s} color={color} />
      ))}
    </div>
  );
}
