import Reveal from "./Reveal";

type SectionHeadingProps = {
  tag: string;
  title: string;
  aside?: string;
};

export default function SectionHeading({ tag, title, aside }: SectionHeadingProps) {
  return (
    <Reveal className="section-head">
      <div>
        <p className="tag-bracket">{tag}</p>
        <h2 className="section-head__title">{title}</h2>
      </div>
      {aside && <p className="section-head__aside">{aside}</p>}
    </Reveal>
  );
}
