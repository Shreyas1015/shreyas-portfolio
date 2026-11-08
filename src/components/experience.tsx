import { work } from "@/content/site";
import { ImpactReel } from "./impact-reel";

/*
 * Experience: the career as one spread, read left to right (cream = before, dark = now),
 * then the Impact reel that proves it. The numbers live only in the reel.
 */
export function Experience() {
  return (
    <section className="exp" id="experience" aria-labelledby="exp-h">
      <div className="sec-head">
        <h2 id="exp-h" data-split>
          Experience
        </h2>
        <p>{work.intro}</p>
      </div>
      <div className="spread">
        {work.jobs.map((j) => (
          <article className={j.when.endsWith("Present") ? "leaf leaf-now" : "leaf leaf-then"} key={j.co}>
            <p className="leaf-when">{j.when}</p>
            <h3 className="leaf-co" aria-label={j.coFull}>
              {j.co}
            </h3>
            <p className="leaf-role">{j.role}</p>
            <p className="leaf-tx">{j.owned}</p>
          </article>
        ))}
      </div>
      <ImpactReel />
    </section>
  );
}
