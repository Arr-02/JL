import { motion, useReducedMotion } from "motion/react";
import Reveal from "../components/Reveal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SKILLS = [
  { num: "01", name: "装配与调试" },
  { num: "02", name: "焊接与拆焊" },
  { num: "03", name: "单片机应用" },
  { num: "04", name: "设备装接" },
];

/**
 * 每格独立 inview 触发（逐张显影，文档 §一.7）：
 * 卡体 + 编号先到（y:24，0.6s），技能名延迟 0.12s 第二拍（同样 y:24）
 */
function SkillCard({ skill }: { skill: (typeof SKILLS)[number] }) {
  const reduce = useReducedMotion();
  const vp = { once: true, margin: "-10% 0px -10% 0px" };
  return (
    <motion.div
      className="skill-card"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={vp}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <span className="skill-card__num">{skill.num}</span>
      <motion.h3
        className="skill-card__name"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
      >
        {skill.name}
      </motion.h3>
    </motion.div>
  );
}

/** My Skillset：左栏标题 + 右侧两列等大描边方格（右列错位下移半格） */
export default function SkillsetSection() {
  return (
    <section id="skillset" className="panel panel--light section-pad">
      <div className="container split">
        <Reveal className="split__head">
          <p className="tag-bracket">[ SKILLS ]</p>
          <h2 className="split__title">技能清单</h2>
          <p className="split__sub">从手工焊接工艺到单片机外围电路，四项核心能力。</p>
        </Reveal>
        <div className="skill-grid">
          <div className="skill-col">
            <SkillCard skill={SKILLS[0]} />
            <SkillCard skill={SKILLS[2]} />
          </div>
          <div className="skill-col skill-col--offset">
            <SkillCard skill={SKILLS[1]} />
            <SkillCard skill={SKILLS[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}
