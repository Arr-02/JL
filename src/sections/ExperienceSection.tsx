import { motion, useReducedMotion } from "motion/react";
import Reveal from "../components/Reveal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** 按颁证时间倒序 */
const CERTS: { role: string; company: string; years: string }[] = [
  {
    role: "电子设备装接工 · 高级工（三级）",
    company: "海宁技师学院（海宁市集成电路技术学校）",
    years: "2026·10·08",
  },
  { role: "TEMI 电子元件拆焊 · 专业级", company: "台湾嵌入式暨单晶片系统发展协会", years: "2025·05" },
  { role: "TEMI 单晶片能力 · 实用级", company: "台湾嵌入式暨单晶片系统发展协会", years: "2025·05" },
  {
    role: "电子设备装接工 · 中级工（四级）",
    company: "海宁技师学院（海宁市集成电路技术学校）",
    years: "2024·09·30",
  },
  { role: "TEMI 电子元件拆焊 · 实用级", company: "台湾嵌入式暨单晶片系统发展协会", years: "2024·05" },
];

/**
 * 职业认证：左栏教育背景 + 右侧证书表（文档 §一.5 / §三.3 同款 stagger 动画）
 * - 表头静止，数据行从底部裁剪边滑入（容器 overflow hidden）
 * - 每行 y:32 + opacity:0，stagger 0.2s，0.7s 播完（触发式 once）
 */
export default function ExperienceSection() {
  const reduce = useReducedMotion();
  return (
    <section id="experience" className="panel panel--light section-pad">
      <div className="container split">
        <Reveal className="split__head">
          <p className="tag-bracket">[ CREDENTIALS ]</p>
          <h2 className="split__title">职业认证</h2>
          <p className="split__sub">
            2022 年 9 月至今就读于海宁技师学院电子技术专业。
            已取得电子设备装接工高级工（三级）、中级工（四级）等
            职业技能等级证书与 TEMI 系列认证。
          </p>
        </Reveal>
        <ul className="exp-table">
          <li className="exp-row exp-row--head" aria-hidden="true">
            <span>CERTIFICATE</span>
            <span>ISSUER</span>
            <span>YEAR</span>
          </li>
          {CERTS.map((e, i) => (
            <motion.li
              key={e.role}
              className="exp-row"
              initial={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, y: 32, color: "#8a8a8a" }
              }
              whileInView={{ opacity: 1, y: 0, color: "#000000" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.2, ease: EASE }}
            >
              <h3 className="exp-row__role">{e.role}</h3>
              <span className="exp-row__company">{e.company}</span>
              <span className="exp-row__years">{e.years}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
