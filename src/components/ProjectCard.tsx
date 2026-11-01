import { Link } from "react-router-dom";
import { motion } from "motion/react";
import type { Award } from "../data/awards";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type ProjectCardProps = {
  project: Award;
  eager?: boolean;
};

export default function ProjectCard({ project, eager = false }: ProjectCardProps) {
  return (
    <motion.li
      className="work-item"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <Link
        to={`/work/${project.slug}`}
        className="project-card"
        aria-label={`查看成果：${project.title}`}
      >
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
      </Link>
    </motion.li>
  );
}
