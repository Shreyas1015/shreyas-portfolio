import type { CSSProperties } from "react";
import { impact, work } from "@/content/site";

/*
 * The sideways Impact reel, in the same company order as the spread above.
 * Pinned on desktop with motion; a swipeable strip on phones.
 */
export function ImpactReel() {
  return (
    <div className="impact" aria-label="Impact in numbers">
      <div className="imp-pin">
        <div className="imp-track">
          {work.jobs.flatMap((job) =>
            impact.items
              .filter((it) => it.where === job.co)
              .map((it) => (
                <article className="imp" key={it.label} aria-label={`${job.co}: ${it.fig} ${it.label}`}>
                  <p
                    className="imp-fig"
                    data-count={it.count?.to}
                    data-dec={it.count?.decimals}
                    data-from={it.count?.from ?? 0}
                    data-pre={it.count?.prefix ?? ""}
                    data-suf={it.count?.suffix ?? ""}
                  >
                    {it.fig}
                  </p>
                  <h3 className="imp-label">{it.label}</h3>
                  <p className="imp-ctx">{it.ctx}</p>
                  {it.bar && (
                    <div className="imp-bars" aria-label={`From ${it.bar.before} to ${it.bar.after}`}>
                      <div className="imp-bar">
                        <span>{it.bar.before}</span>
                        <i />
                      </div>
                      <div className="imp-bar after" style={{ "--r": it.bar.ratio } as CSSProperties}>
                        <span>{it.bar.after}</span>
                        <i />
                      </div>
                    </div>
                  )}
                </article>
              )),
          )}
        </div>
        <div className="imp-prog" aria-hidden="true">
          <i />
        </div>
      </div>
    </div>
  );
}
