import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import GlassShapes from "../components/GlassShapes";
import Reveal from "../components/Reveal";
import { scrollToTop } from "../lib/scroll";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** 履历速览（全部来自简历既有事实，逐行 stagger） */
const FACTS = [
  { k: "省技能竞赛", v: "电子技术 · 二等奖 · 2026" },
  { k: "市技能节", v: "装配与调试 · 一等奖 · 2024" },
  { k: "科技创新", v: "电磁力拖把 · 一等奖 · 2024" },
  { k: "职业技能", v: "电子设备装接工 · 高级工（三级）" },
  { k: "在校荣誉", v: "「仿真企业」先进 · 连续六学期" },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
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
      <GlassShapes variant="contact" />
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
                <a className="contact__value" href="mailto:zhangjiafu@example.com">
                  zhangjiafu@example.com
                </a>
              </div>
            </Reveal>

            {/* 巨字「联系我」：左栏收尾主视觉，最后升起（文档 §三.5） */}
            <motion.h2
              className="contact__giant"
              aria-label="联系我"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.32, ease: EASE }}
            >
              联系我
            </motion.h2>
          </div>

          {/* 右栏：履历速览表（几何体在其背后做层深） */}
          <ul className="contact__facts">
            <li className="contact__facts-head" aria-hidden="true">
              <span> highlights </span>
              <span>履历速览</span>
            </li>
            {FACTS.map((f, i) => (
              <motion.li
                key={f.k}
                className="contact__fact"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, color: "#8a8a8a" }}
                whileInView={{ opacity: 1, y: 0, color: "#fafafa" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.12 + i * 0.1, ease: EASE }}
              >
                <span className="contact__fact-k">{f.k}</span>
                <span className="contact__fact-v">{f.v}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="contact__footer">
          <span>© 2026 张家福 · 电子技术专业个人主页 · React + Motion 构建</span>
          {/* [ SCROLL ] ↑ 最后显现（文档 §一.9） */}
          <Reveal className="contact__top" delay={0.55}>
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
