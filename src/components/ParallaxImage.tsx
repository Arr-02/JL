import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

type ParallaxImageProps = {
  children: ReactNode;
  className?: string;
  /** 视差幅度（百分比），默认 5；上限 6（内层 bleed 上下各 6%） */
  amplitude?: number;
};

/** 容器内内容的滚动视差：内层 .plx-inner 高 112%/上提 6% 防露边，只动合成层 transform */
export default function ParallaxImage({
  children,
  className,
  amplitude = 5,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${Math.min(amplitude, 6)}%`, `${Math.min(amplitude, 6)}%`]
  );

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden", position: "relative" }}>
      <motion.div className="plx-inner" style={reduce ? undefined : { y }}>
        {children}
      </motion.div>
    </div>
  );
}
