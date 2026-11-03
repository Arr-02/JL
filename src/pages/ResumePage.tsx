import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import useRevealed from "../lib/useRevealed";
import { awards, type Award } from "../data/awards";
import { RESUME_AS_HOME } from "../lib/scroll";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** 竞赛获奖：按年份倒序 */
const AWARDS = [...awards].sort((a, b) => Number(b.year) - Number(a.year));

/** 职业技能等级证书（按颁证时间倒序，同 ExperienceSection） */
const CERTS: { role: string; company: string; years: string }[] = [
  {
    role: "电子设备装接工 · 高级工（三级）",
    company: "海宁技师学院（海宁市集成电路技术学校）",
    years: "2026·10",
  },
  { role: "TEMI 电子元件拆焊 · 专业级", company: "台湾嵌入式暨单晶片系统发展协会", years: "2025·05" },
  { role: "TEMI 单晶片能力 · 实用级", company: "台湾嵌入式暨单晶片系统发展协会", years: "2025·05" },
  {
    role: "电子设备装接工 · 中级工（四级）",
    company: "海宁技师学院（海宁市集成电路技术学校）",
    years: "2024·09",
  },
  { role: "TEMI 电子元件拆焊 · 实用级", company: "台湾嵌入式暨单晶片系统发展协会", years: "2024·05" },
];

/** 教育背景 */
const EDUCATION = [
  { k: "院校", v: "海宁技师学院（海宁市集成电路技术学校）" },
  { k: "专业", v: "电子技术应用" },
  { k: "时间", v: "2022.09 — 至今（在读）" },
  { k: "主修课程", v: "电子技术、电工基础、电子焊接、C 语言、单片机" },
  { k: "成绩", v: "专业排名前 1%，连续三年获得一等奖学金" },
];

/** 专业技能 */
const SKILLS = [
  {
    name: "硬件设计",
    desc: "电路故障诊断、电子焊接与排故、PCB 设计（嘉立创 EDA）、电路仿真（LTspice）",
  },
  {
    name: "嵌入式开发",
    desc: "51 单片机与 STM32 应用开发、C 语言编程（Keil5 / STM32CubeIDE）",
  },
  {
    name: "开发工具",
    desc: "STM32CubeMX、STM32CubeProgrammer、STM32TrustedPackageCreator、Proteus、Autodesk Fusion",
  },
  { name: "其他能力", desc: "电子元件拆焊（专业级认证）、技术文档编写" },
];

/** 项目实践：浙江省电子技术项目技能竞赛整机作品（A / B / C 三模块） */
const PROJECTS = [
  {
    title: "浙江省技工院校电子技术项目技能竞赛 · 整机作品",
    meta: "2026 · 省赛二等奖 · 覆盖硬件设计、装接、嵌入式、故障诊断全流程",
    points: [
      "硬件设计：使用 LTspice 完成减法器、量化输出、3 位 AD 编码与 NE555 定时电路的仿真验证，按《电子技术项目 PCB 最佳实践设计规范》完成 PCB 设计",
      "电路装接：基于 74HC / CD40xx / STM32G030 等 20 余种器件完成整机装配与通电调试，撰写设计报告",
      "嵌入式开发：基于 STM32L052K8 目标板，用 STM32CubeMX / STM32CubeIDE 完成外设配置，基于 HAL 库实现 ADC 多通道采样（DMA 搬运）、I2C OLED 显示驱动与主控制逻辑",
      "故障诊断：对装接完成的电路板进行故障检测、记录与维修，固化分级排故流程",
    ],
  },
];

/** 通用 stagger 行：整表进入视口触发，行按 index 顺序 0.2s 逐行显示 */
function StaggerLi({
  children,
  index,
  revealed,
  className,
}: {
  children: ReactNode;
  index: number;
  revealed: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.li
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
      animate={revealed ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay: index * 0.2, ease: EASE }}
    >
      {children}
    </motion.li>
  );
}

/** 获奖行：年份 + 奖项 + 级别 chip（静态展示） */
function AwardRow({
  award,
  index,
  revealed,
}: {
  award: Award;
  index: number;
  revealed: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.li
      className="resume__award"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
      animate={revealed ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay: index * 0.2, ease: EASE }}
    >
      <span className="resume__award-year">{award.year}</span>
      <span className="resume__award-main">
        <strong>{award.title}</strong>
        <small>{award.subtitle}</small>
      </span>
      <span className="chip">{award.categories[1]}</span>
    </motion.li>
  );
}

/** 单页简历：沿用全站 split 分栏 + hairline 表格 + stagger 入场语言 */
export default function ResumePage() {
  const reduce = useReducedMotion();
  const eduReveal = useRevealed<HTMLUListElement>(0.6);
  const awardReveal = useRevealed<HTMLUListElement>(0.6);
  const certReveal = useRevealed<HTMLUListElement>(0.6);
  const skillReveal = useRevealed<HTMLUListElement>(0.6);
  const projReveal = useRevealed<HTMLUListElement>(0.6);

  return (
    <motion.main
      className="page resume"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="container">
        {/* 开关：简历页作为主页时隐藏自指的返回链接（保留代码可切回） */}
        {!RESUME_AS_HOME && (
          <Link to="/" className="pj-back">
            [ ← 返回主页 ]
          </Link>
        )}

        {/* 头部：标签 → 姓名（行遮罩入场）→ 求职意向 */}
        <header className="resume__head">
          <Reveal>
            <p className="tag-bracket">[ RESUME · 单页简历 ]</p>
          </Reveal>
          <h1 className="resume__name" aria-label="张家福">
            <span className="hero-line" aria-hidden="true">
              <motion.span
                className="hero-line__in"
                initial={reduce ? { opacity: 0 } : { y: "110%" }}
                animate={reduce ? { opacity: 1 } : { y: "0%" }}
                transition={{ duration: 1, delay: 0.15, ease: EASE }}
              >
                张家福
              </motion.span>
            </span>
          </h1>
          <Reveal delay={0.25}>
            <p className="resume__intent">
              求职意向：嵌入式开发工程师 / 电子研发 / 智能制造方向。
              电子技术应用专业，专业排名前 1%、连续三年一等奖学金；
              持电子设备装接工高级工（三级）等多项专业认证。
            </p>
          </Reveal>
        </header>

        {/* 基本信息速览：四格 hairline 横幅 */}
        <Reveal delay={0.3}>
          <div className="resume__facts">
            <div>
              <span>EDUCATION</span>
              <p>海宁技师学院 · 电子技术应用</p>
            </div>
            <div>
              <span>RANK</span>
              <p>专业排名前 1%</p>
            </div>
            <div>
              <span>SCHOLARSHIP</span>
              <p>一等奖学金 · 连续三年</p>
            </div>
            <div>
              <span>EMAIL</span>
              <p>wenghe91715@126.com</p>
            </div>
          </div>
        </Reveal>

        {/* 教育背景 */}
        <section id="education" className="resume__section split">
          <Reveal className="split__head">
            <p className="tag-bracket">[ EDUCATION ]</p>
            <h2 className="split__title">教育背景</h2>
            <p className="split__sub">
              2022 年 9 月入学，专业排名前 1%，连续三年获得一等奖学金。
            </p>
          </Reveal>
          <ul className="resume__rows" ref={eduReveal.ref}>
            {EDUCATION.map((r, i) => (
              <StaggerLi key={r.k} index={i} revealed={eduReveal.revealed}>
                <strong>{r.k}</strong>
                <span>{r.v}</span>
              </StaggerLi>
            ))}
          </ul>
        </section>

        {/* 项目实践 */}
        <section id="projects" className="resume__section split">
          <Reveal className="split__head">
            <p className="tag-bracket">[ PROJECTS ]</p>
            <h2 className="split__title">项目实践</h2>
            <p className="split__sub">
              电子技术竞赛整机作品：从原理图仿真、PCB 设计到固件联调。
            </p>
          </Reveal>
          <ul className="resume__projects" ref={projReveal.ref}>
            {PROJECTS.map((p, i) => (
              <StaggerLi
                key={p.title}
                className="resume__project"
                index={i}
                revealed={projReveal.revealed}
              >
                <h3 className="resume__project-title">{p.title}</h3>
                <p className="resume__project-meta">{p.meta}</p>
                <ul className="resume__project-points">
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </StaggerLi>
            ))}
          </ul>
        </section>

        {/* 竞赛获奖 */}
        <section id="awards" className="resume__section split">
          <Reveal className="split__head">
            <p className="tag-bracket">[ AWARDS ]</p>
            <h2 className="split__title">竞赛获奖</h2>
            <p className="split__sub">
              以赛促学：从市赛一等奖到省赛二等奖，名次逐年进阶。
            </p>
          </Reveal>
          <ul className="resume__awards" ref={awardReveal.ref}>
            {AWARDS.map((a, i) => (
              <AwardRow key={a.slug} award={a} index={i} revealed={awardReveal.revealed} />
            ))}
          </ul>
        </section>

        {/* 职业证书 */}
        <section id="certificates" className="resume__section split">
          <Reveal className="split__head">
            <p className="tag-bracket">[ CERTIFICATES ]</p>
            <h2 className="split__title">职业证书</h2>
            <p className="split__sub">
              职业技能等级证书与 TEMI 系列认证，共 5 项。
            </p>
          </Reveal>
          <ul className="exp-table" ref={certReveal.ref}>
            <li className="exp-row exp-row--head" aria-hidden="true">
              <span>CERTIFICATE</span>
              <span>ISSUER</span>
              <span>YEAR</span>
            </li>
            {CERTS.map((c, i) => (
              <StaggerLi
                key={c.role}
                className="exp-row"
                index={i}
                revealed={certReveal.revealed}
              >
                <h3 className="exp-row__role">{c.role}</h3>
                <span className="exp-row__company">{c.company}</span>
                <span className="exp-row__years">{c.years}</span>
              </StaggerLi>
            ))}
          </ul>
        </section>

        {/* 专业技能 */}
        <section id="skills" className="resume__section split">
          <Reveal className="split__head">
            <p className="tag-bracket">[ SKILLS ]</p>
            <h2 className="split__title">专业技能</h2>
            <p className="split__sub">
              从电路故障诊断到 51 / STM32 单片机开发，覆盖硬件与嵌入式全链路。
            </p>
          </Reveal>
          <ul className="resume__rows" ref={skillReveal.ref}>
            {SKILLS.map((s, i) => (
              <StaggerLi key={s.name} index={i} revealed={skillReveal.revealed}>
                <strong>{s.name}</strong>
                <span>{s.desc}</span>
              </StaggerLi>
            ))}
          </ul>
        </section>

        {/* 自我评价 + 在校荣誉 */}
        <section id="profile" className="resume__section split">
          <Reveal className="split__head">
            <p className="tag-bracket">[ PROFILE ]</p>
            <h2 className="split__title">自我评价</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="resume__profile">
              <p>
                电子技术应用专业学生，<strong>专业排名前 1%</strong>
                ，具备扎实的电路设计、单片机编程及电子焊接能力，熟悉 EDA
                工具与嵌入式开发流程。
              </p>
              <p>
                擅长快速学习新技术，注重细节与动手能力；持电子设备装接工高级工（三级）等
                多项专业认证，连续六个学期获评校内「仿真企业」先进学生。
              </p>
              <p>
                希望将技术能力应用于<strong>电子研发或智能制造领域</strong>，欢迎与我联系。
              </p>
            </div>
          </Reveal>
        </section>

        {/* 页脚 */}
        <footer className="resume__footer">
          <span>© 2026 张家福 · 单页简历</span>
          <a href="mailto:wenghe91715@126.com">wenghe91715@126.com</a>
          {!RESUME_AS_HOME && <Link to="/">[ 返回主页 ]</Link>}
        </footer>
      </div>
    </motion.main>
  );
}
