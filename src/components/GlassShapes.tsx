import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

type GlassShapesProps = {
  variant: "hero" | "contact";
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * CSS 渐变 + clip-path 绘制的磨砂玻璃几何体（圆锥/球/棱锥/远景小球）。
 * 首尾呼应：hero 与 contact 共用同一套动效语言 ——
 * - 落位显影（淡入 + 上移，错峰 stagger，hero 在首屏加载时播、contact 滚入时播）
 * - 整组鼠标视差（文档 §三.4：±24px 经 useSpring(40,18) 低刚度跟随）
 * - 个体乘 1.4 / 0.8 / -0.6 / 1.2 系数制造层次差
 * - 内层 .shape 保留 CSS idle 漂浮（三层变换互不冲突）
 */
export default function GlassShapes({ variant }: GlassShapesProps) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });

  // 个体不同倍率二次映射：同向但不同步（文档 §三.4）
  const coneX = useTransform(sx, (v) => v * 1.4);
  const coneY = useTransform(sy, (v) => v * 1.4);
  const ballX = useTransform(sx, (v) => v * 0.8);
  const ballY = useTransform(sy, (v) => v * 0.8);
  const pyrX = useTransform(sx, (v) => v * -0.6);
  const pyrY = useTransform(sy, (v) => v * -0.6);
  const smallX = useTransform(sx, (v) => v * 1.2);
  const smallY = useTransform(sy, (v) => v * 1.2);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 48);
      my.set((e.clientY / window.innerHeight - 0.5) * 48);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  // hero 首屏加载时在大标题之后错峰落位；contact 随黑区滚入落位
  const delays =
    variant === "hero" ? [0.35, 0.45, 0.55, 0.65] : [0, 0.12, 0.24, 0.36];

  const items = [
    { cls: "shape--cone", x: coneX, y: coneY, delay: delays[0] },
    { cls: "shape--ball", x: ballX, y: ballY, delay: delays[1] },
    { cls: "shape--pyramid", x: pyrX, y: pyrY, delay: delays[2] },
    { cls: "shape--small", x: smallX, y: smallY, delay: delays[3] },
  ];

  return (
    <div className={`shapes shapes--${variant}`} aria-hidden="true">
      {items.map((it) => (
        <motion.div
          key={it.cls}
          className="shape-fx"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: it.delay, ease: EASE }}
        >
          <motion.div className="shape-drift" style={{ x: it.x, y: it.y }}>
            <div className={`shape ${it.cls}`} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
