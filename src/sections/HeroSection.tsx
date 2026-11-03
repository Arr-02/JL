import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { scrollToSection } from "../lib/scroll";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const LINES = ["我是张家福，", "一名专注装配调试与", "单片机应用的技能人才。"];

export default function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section className="hero panel panel--dark">
      <div className="container hero__inner">
        <h1
          className="hero__title"
          aria-label="我是张家福，一名专注装配调试与单片机应用的技能人才。"
        >
          {LINES.map((line, i) => (
            <span className="hero-line" key={line} aria-hidden="true">
              <motion.span
                className="hero-line__in"
                initial={reduce ? { opacity: 0 } : { y: "110%" }}
                animate={reduce ? { opacity: 1 } : { y: "0%" }}
                transition={{ duration: 1, delay: 0.15 + i * 0.1, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="hero__bottom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.55 }}
        >
          <p className="hero__sub">
            求职意向：电子产品装配与调试 / 电子设备装接 / 单片机应用方向。
            持电子设备装接工高级工（三级）证书，坚持以赛促学——
            从海宁市一等奖到浙江省二等奖，让每一次焊接与调试都更近一步。
          </p>
          <div className="hero__actions">
            <Link to="/resume" className="hero__cta">
              [ 快速浏览 ] →
            </Link>
            <button className="hero__scroll" onClick={() => scrollToSection("work")}>
              [ 查看竞赛成果 ] ↓
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
