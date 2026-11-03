import { Link } from "react-router-dom";
import { motion } from "motion/react";
import type { Award } from "../data/awards";
import useRevealed from "../lib/useRevealed";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** 详情页功能已弃用：置为 true 可恢复点击卡片跳转详情页 */
const PROJECT_DETAIL_ENABLED = false;

type ProjectCardProps = {
  project: Award;
  eager?: boolean;
};

export default function ProjectCard({ project, eager = false }: ProjectCardProps) {
  const { ref, revealed } = useRevealed<HTMLLIElement>(0.75);

  const cardBody = (
    <>
      <div className="project-card__media">
        <img
          src={project.cover}
          alt={project.subtitle}
          loading={eager ? "eager" : "lazy"}
        />
        <span className="project-card__caption" aria-hidden="true">
          张家福 · ZHANG JIAFU
        </span>
      </div>
      <div className="project-card__meta">
        <span className="project-card__num">({project.number})</span>
        <h3 className="project-card__title">{project.title}</h3>
        <span className="project-card__year">{project.year}</span>
      </div>
      <div className="project-card__cats">
        {project.categories.map((c) => (
          <span key={c} className="chip">
            {c}
          </span>
        ))}
      </div>
    </>
  );

  return (
    <motion.li
      ref={ref}
      className="work-item"
      initial={{ opacity: 0, y: 60 }}
      animate={revealed ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.9, ease: EASE }}
    >
      {PROJECT_DETAIL_ENABLED ? (
        <Link
          to={`/work/${project.slug}`}
          className="project-card"
          aria-label={`查看成果：${project.title}`}
        >
          {cardBody}
        </Link>
      ) : (
        <div className="project-card project-card--static">{cardBody}</div>
      )}
    </motion.li>
  );
}
