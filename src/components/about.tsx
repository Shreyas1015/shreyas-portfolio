import { about, person } from "@/content/site";
import { Icon } from "./icons";

export function About() {
  const s = about.statement;
  return (
    <section className="intro" id="about" aria-label="About">
      <p className="statement" data-words>
        {s.lead}{" "}
        <span className="hot">
          {s.hot1}
          <svg className="mark mark-u" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
            <path d="M4 15C50 5 95 21 150 12S250 5 296 13" />
          </svg>
        </span>{" "}
        {s.mid}{" "}
        <span className="hot">
          {s.hot2}
          <svg className="mark mark-o" viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M253 18C204 3 82 4 33 26C-3 44 14 82 95 91C177 99 281 86 289 53C296 25 231 9 163 8C131 8 101 11 79 16" />
          </svg>
        </span>
      </p>

      <div className="how">
        <div className="how-side">
          <p className="how-intro" data-lines>
            {about.intro}
          </p>
          <div className="about-cta">
            <a className="mag" href={person.resume} data-mag="0.4" data-cursor="Open">
              <span className="btn-round">
                <span className="fill" />
                <span className="lbl">
                  <Icon name="file" style={{ fontSize: 22 }} />
                  Resume
                </span>
              </span>
            </a>
            <a className="gh" href={person.linkedin} data-cursor="Open">
              LinkedIn
              <Icon name="arrowUR" className="ico arr" />
            </a>
            <a className="gh" href={person.github} data-cursor="Open">
              GitHub
              <Icon name="arrowUR" className="ico arr" />
            </a>
          </div>
        </div>

        <div className="how-main">
          <h2 className="how-h" data-split>
            {about.principlesTitle}
          </h2>
          <ol className="principles">
            {about.principles.map((p) => (
              <li className="pr" key={p.title}>
                <h3 className="pr-t">{p.title}</h3>
                <p className="pr-b">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
