import Reveal from "../components/Reveal";
import PixelField from "../components/PixelField";
import WipeTransition from "../components/WipeTransition";

/**
 * About 黑区（300vh）：文案 sticky 钉满一屏约 4 秒滚动，
 * 像素方块铺满全高随滚动匀速穿过文字上方
 */
export default function AboutIntro() {
  return (
    <section id="about" className="about-intro panel panel--dark">
      <WipeTransition color="#000000" />
      <div className="about-intro__pin">
        <Reveal>
          <p className="tag-bracket">[ ABOUT ]</p>
          <h2 className="about-intro__title">
            我把规范的装配调试工艺，与单片机的应用实践结合在一起。
          </h2>
          <p className="about-intro__sub">
            电子技术专业 · 海宁技师学院（海宁市集成电路技术学校）
            <br />
            从海宁市技能节一等奖到浙江省技能竞赛二等奖，以赛促学、持续进阶
          </p>
        </Reveal>
      </div>
      <PixelField />
    </section>
  );
}
