import { awards } from "../data/awards";
import ProjectCard from "../components/ProjectCard";
import SectionHeading from "../components/SectionHeading";
import WipeTransition from "../components/WipeTransition";

export default function FeaturedWork() {
  return (
    <section id="work" className="panel panel--light section-pad">
      <WipeTransition color="#fafafa" />
      <div className="container">
        <SectionHeading
          tag="[ COMPETITIONS ]"
          title="竞赛与成果"
          aside={`2024 — 2026 · 共 ${awards.length} 项省市级奖项`}
        />
        <ul className="work-list">
          {awards.map((a, i) => (
            <ProjectCard key={a.slug} project={a} eager={i < 2} />
          ))}
        </ul>
      </div>
    </section>
  );
}
