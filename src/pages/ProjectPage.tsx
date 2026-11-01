import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { getNextAward, getAward } from "../data/awards";
import ParallaxImage from "../components/ParallaxImage";
import Reveal from "../components/Reveal";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getAward(slug) : undefined;

  if (!project) return <Navigate to="/" replace />;

  const next = getNextAward(project.slug);

  return (
    <motion.main
      className="page"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <article className="container">
        <header className="pj-hero">
          <Link to="/" className="pj-back">
            ← 返回成果列表
          </Link>
          <p className="pj-hero__num">AWARD {project.number}</p>
          <h1 className="pj-hero__title">{project.subtitle}</h1>
          <div className="pj-hero__cats">
            {project.categories.map((c) => (
              <span key={c} className="chip">
                {c}
              </span>
            ))}
          </div>

          <div className="pj-meta">
            <div>
              <span>主办方 Host</span>
              <p>{project.host}</p>
            </div>
            <div>
              <span>参赛身份 Role</span>
              <p>{project.role}</p>
            </div>
            <div>
              <span>年份 Year</span>
              <p>{project.year}</p>
            </div>
            <div>
              <span>关键能力 Skills</span>
              <p>{project.skills.join(" / ")}</p>
            </div>
          </div>
        </header>

        <Reveal amount={0.1}>
          <ParallaxImage className="pj-cover" amplitude={4}>
            <img src={project.cover} alt={project.subtitle} />
          </ParallaxImage>
        </Reveal>

        <div className="pj-body">
          <Reveal>
            <h2>成果背景</h2>
            {project.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>

          <Reveal>
            <h2 style={{ marginTop: "48px" }}>备赛目标</h2>
            <ul className="pj-goals">
              {project.goals.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h2 style={{ marginTop: "48px" }}>过程</h2>
            <div className="pj-process">
              {project.process.map((s, i) => (
                <div key={s.title} className="pj-process__step">
                  <b>STEP {String(i + 1).padStart(2, "0")}</b>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="pj-gallery">
          {project.gallery.map((src, i) => (
            <Reveal key={src} delay={i * 0.08} amount={0.1}>
              <ParallaxImage className="pj-gallery__frame" amplitude={5}>
                <img src={src} alt={`${project.title} 配图 ${i + 1}`} />
              </ParallaxImage>
            </Reveal>
          ))}
        </div>

        <div className="pj-body" style={{ marginTop: 0 }}>
          <Reveal>
            <h2>关键成果</h2>
            <div className="pj-outcomes">
              {project.outcomes.map((o) => (
                <div key={o.label}>
                  <b>{o.value}</b>
                  <span>{o.label}</span>
                </div>
              ))}
            </div>
            <p className="pj-disclaimer">
              * 以上内容依据个人简历与获奖记录整理，过程为概括性描述；配图为 Pexels 免费图库照片（黑白处理）。
            </p>
          </Reveal>
        </div>

        <Link to={`/work/${next.slug}`} className="pj-next">
          <div className="container">
            <small>下一项成果 Next</small>
            <strong>
              {next.title} · {next.year}
              <span className="arr" aria-hidden="true">
                →
              </span>
            </strong>
          </div>
        </Link>
      </article>
    </motion.main>
  );
}
