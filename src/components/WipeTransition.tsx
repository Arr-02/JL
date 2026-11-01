import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import useMediaQuery from "../lib/useMediaQuery";

type ColumnProps = {
  progress: MotionValue<number>;
  start: number;
  color: string;
};

/** 单列：scroll 进度从 start → 1 时，柱体从下方 100% 收起到 0 */
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
  /** 柱体颜色（= 上一区块的背景色） */
  color: string;
};

/**
 * 阶梯柱状转场：放置于区块内部顶部（CSS: absolute; bottom: 100%），
 * 滚动经过时 5 列（移动端 3 列）柱体以中间列领先的节奏依次收起，
 * 露出上一区块内容，形成「阶梯」擦除效果。
 */
export default function WipeTransition({ color }: WipeTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });

  if (reduce) return null;

  const count = isMobile ? 3 : 5;
  const mid = (count - 1) / 2;
  // 拱形差：中间列领先、两侧依次滞后；线性分布让 5 根柱子都有明显阶梯感
  const step = isMobile ? 0.2 : 0.16;
  const starts = Array.from({ length: count }, (_, i) => Math.abs(i - mid) * step);

  return (
    <div ref={ref} className="wipe" aria-hidden="true">
      {starts.map((s, i) => (
        <Column key={i} progress={scrollYProgress} start={s} color={color} />
      ))}
    </div>
  );
}
