import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import useRevealed from "../lib/useRevealed";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  amount?: number;
};

/** 进入视口（含被瞬移滚过）时淡入上移（尊重 prefers-reduced-motion） */
export default function Reveal({
  children,
  delay = 0,
  className,
  amount = 0.2,
}: RevealProps) {
  const reduce = useReducedMotion();
  const { ref, revealed } = useRevealed(1 - amount);
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
      animate={revealed ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};
