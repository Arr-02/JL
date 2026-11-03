import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Reveal from "../components/Reveal";
import useRevealed from "../lib/useRevealed";
import { scrollToTop } from "../lib/scroll";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** 履历速览（全部来自简历既有事实，逐行 stagger） */
const FACTS = [
  { k: "省技能竞赛", v: "电子技术 · 二等奖 · 2026" },
  { k: "市技能节", v: "装配与调试 · 一等奖 · 2024" },
  { k: "市技能节（团体）", v: "电子产品设计与应用 · 三等奖 · 2025" },
  { k: "科技创新", v: "电磁力拖把 · 一等奖 · 2024" },
  { k: "职业技能", v: "电子设备装接工 · 高级工（三级）" },
  { k: "在校荣誉", v: "「仿真企业」先进 · 连续六学期" },
];

/** 速览行：入场显影（useRevealed 对瞬移滚动鲁棒），逐行 stagger
 *  末区块无法再下滚，触发线放宽到视口下缘（同巨字「联系我」），
 *  否则 PC 一屏布局下居中的后几行永远越不过 60% 触发线而卡在 opacity:0 */
function FactRow({ fact, index }: { fact: (typeof FACTS)[number]; index: number }) {
  const reduce = useReducedMotion();
  const { ref, revealed } = useRevealed<HTMLLIElement>(1);
  return (
    <motion.li
      ref={ref}
      className="contact__fact"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, color: "#8a8a8a" }}
      animate={revealed ? { opacity: 1, y: 0, color: "#fafafa" } : undefined}
      transition={{ duration: 0.7, delay: 0.12 + index * 0.1, ease: EASE }}
    >
      <span className="contact__fact-k">{fact.k}</span>
      <span className="contact__fact-v">{fact.v}</span>
    </motion.li>
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  // 末区块无法再下滚，触发线放宽到视口下缘（top 进入视口即显影）
  const giantReveal = useRevealed<HTMLHeadingElement>(1);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  // 文档 §7.5：平推黑幕进入时轻微 scale(1.02→1)，强化「推上来」的收尾仪式感
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.02, 1]);

  return (
    <motion.section
      ref={sectionRef}
      id="contact"
      className="contact panel panel--dark contact--slide"
      style={{ scale, transformOrigin: "50% 0" }}
    >
      <div className="container contact__inner">
        <div className="contact__grid">
          {/* 左栏：标签 → 意向 → 邮箱 → 巨字主视觉 */}
          <div className="contact__left">
            <Reveal>
              <p className="tag-bracket">[ CONTACT ]</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="contact__sub">
                电子产品装配与调试 / 电子设备装接 / 单片机应用方向，
                期待与你共事。
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="contact__row">
                <span className="contact__label">EMAIL</span>
                <a className="contact__value" href="mailto:wenghe91715@126.com">
                  wenghe91715@126.com
                </a>
              </div>
            </Reveal>

            {/* 巨字「联系我」：左栏收尾主视觉，最后升起（文档 §三.5） */}
            <motion.h2
              ref={giantReveal.ref}
              className="contact__giant"
              aria-label="联系我"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
              animate={giantReveal.revealed ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, delay: 0.32, ease: EASE }}
            >
              联系我
            </motion.h2>
          </div>

          {/* 右栏：履历速览表 */}
          <ul className="contact__facts">
            <li className="contact__facts-head" aria-hidden="true">
              <span> highlights </span>
              <span>履历速览</span>
            </li>
            {FACTS.map((f, i) => (
              <FactRow key={f.k} fact={f} index={i} />
            ))}
          </ul>
        </div>

        <div className="contact__footer">
          <span>© 2026 张家福 · 电子技术专业个人主页 · React + Motion 构建</span>
          {/* [ SCROLL ] ↑ 最后显现（文档 §一.9） */}
          <Reveal className="contact__top" delay={0.55} amount={0}>
            <button className="contact__top-btn" onClick={() => scrollToTop()}>
              [ SCROLL ] ↑
            </button>
          </Reveal>
          <span aria-hidden="true" />
        </div>
      </div>
    </motion.section>
  );
}
