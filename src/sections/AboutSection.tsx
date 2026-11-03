import { motion, useReducedMotion } from "motion/react";
import Reveal from "../components/Reveal";
import WipeTransition from "../components/WipeTransition";
import PixelField from "../components/PixelField";
import ParallaxImage from "../components/ParallaxImage";
import useRevealed from "../lib/useRevealed";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const TITLE_LINES = ["我专注于", "严谨规范的装配与调试，", "让电路可靠运行。"];

/**
 * About 详情（文档 §一.2 / §三.4）：
 * - 左栏 [ ABOUT ] → 大标题 → [ DIGITAL NATIVE ] → 正文（按行遮罩入场）
 * - 右栏大图滚动视差（-6%→6%，素材上下 bleed 8% 防露边）
 * - 小图独立入场：淡入 + 上移
 * 入场判定统一走 useRevealed：对瞬移滚动 / 刷新恢复滚动位置鲁棒
 */
export default function AboutSection() {
  const reduce = useReducedMotion();
  const titleReveal = useRevealed<HTMLHeadingElement>(0.4);
  const smallReveal = useRevealed<HTMLDivElement>(0.6);

  return (
    <section className="panel panel--light section-pad">
      <WipeTransition color="#fafafa" />
      <PixelField tone="black" />
      <div className="container about-grid">
        <div className="about__text">
          <Reveal>
            <p className="tag-bracket">[ ABOUT ]</p>
          </Reveal>
          <h2
            ref={titleReveal.ref}
            className="about__title"
            aria-label="我专注于严谨规范的装配与调试，让电路可靠运行。"
          >
            {TITLE_LINES.map((line, i) => (
              <span className="hero-line" key={line} aria-hidden="true">
                <motion.span
                  className="hero-line__in"
                  initial={reduce ? { opacity: 0 } : { y: "110%" }}
                  animate={titleReveal.revealed ? (reduce ? { opacity: 1 } : { y: "0%" }) : undefined}
                  transition={{ duration: 1, delay: i * 0.1, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>
          <Reveal delay={0.2}>
            <span className="tag-bracket about__dn">[ HANDS-ON MAKER ]</span>
            <p>
              我是张家福，海宁技师学院电子技术专业的学生。我相信<strong>技能是在一次次动手实践中长出来的</strong>——
              从元器件认读、手工焊接，到整机装配、通电调试，每一步都踏实走过。
            </p>
            <p>
              在校期间我坚持<strong>「以赛促学」</strong>：从海宁市技能节一等奖、嘉兴市三等奖，
              到浙江省技工院校学生技能竞赛二等奖，名次逐年进阶；
              与队友三人组队的《一种电磁力拖把》还拿到了市青少年科技创新大赛一等奖。
            </p>
            <p>
              我已取得电子设备装接工高级工（三级）证书与 TEMI 拆焊专业级认证，
              连续六个学期获评校内「仿真企业」先进学生。
              期待在电子产品装配与调试、单片机应用方向继续深耕，欢迎与我联系。
            </p>
          </Reveal>
        </div>
        <div className="about__media">
          <ParallaxImage className="about__media-main" amplitude={6}>
            <img
              src="images/about-main.webp"
              alt="电子实训工位上的装配调试工作"
              loading="lazy"
            />
          </ParallaxImage>
          <motion.div
            ref={smallReveal.ref}
            className="about__media-small"
            aria-hidden="true"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
            animate={smallReveal.revealed ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            <img src="images/about-small.webp" alt="" loading="lazy" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
