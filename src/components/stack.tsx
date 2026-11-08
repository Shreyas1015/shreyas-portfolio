import type { CSSProperties } from "react";
import { aws, education, stack } from "@/content/site";
import { Icon } from "./icons";

/* Share of the certification window already behind us, 0–100. */
function validity(now = Date.now()) {
  const a = Date.parse(aws.fromDate), b = Date.parse(aws.toDate);
  return Math.min(100, Math.max(0, ((now - a) / (b - a)) * 100));
}

function Aws() {
  const p = validity();
  return (
    <div className="aws" id="aws">
      <div className="aws-badge" aria-hidden="true">
        <svg className="aws-ring" viewBox="0 0 200 200">
          <defs>
            <path id="aws-arc" d="M100 100 m-86 0 a86 86 0 1 1 172 0 a86 86 0 1 1 -172 0" />
          </defs>
          <text>
            <textPath href="#aws-arc" textLength="535">
              {aws.ring}
            </textPath>
          </text>
        </svg>
        <div className="aws-core">
          <Icon name="badge" />
          <b>AWS</b>
          <small>Developer<br />Associate</small>
        </div>
      </div>
      <div className="aws-body">
        <h3 data-split>{aws.title}</h3>
        <p className="aws-issuer">{aws.issuer}</p>
        <p className="aws-desc">{aws.desc}</p>
        <ul className="aws-covers">
          {aws.covers.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <div className="aws-valid" data-from={aws.fromDate} data-to={aws.toDate}>
          <div className="aws-line" style={{ "--p": `${p.toFixed(1)}%` } as CSSProperties}>
            <i />
            <b />
            <em>Today</em>
          </div>
          <div className="aws-ends">
            <span>Issued {aws.from}</span>
            <span>Valid to {aws.to}</span>
          </div>
        </div>
        <div className="aws-cred">
          <div className="aws-id">
            <span className="aws-id-k">Credential ID</span>
            <button className="aws-id-v" data-copy={aws.credentialId} data-cursor="Copy" aria-label={`Copy credential ID ${aws.credentialId}`}>
              <code>{aws.credentialId}</code>
              <span className="cp">
                <Icon name="copy" />
                <span className="cp-t">Copy</span>
              </span>
            </button>
          </div>
          <a className="aws-verify" href={aws.verifyUrl} target="_blank" rel="noopener noreferrer" data-cursor="Open">
            Verify on AWS
            <Icon name="arrowUR" className="ico arr" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function Stack() {
  return (
    <>
      <section className="light" id="stack" aria-labelledby="stack-h">
        <div className="sec-head">
          <h2 id="stack-h" data-split>
            Stack
          </h2>
          <p>{stack.intro}</p>
        </div>
        <div className="kinetic" aria-hidden="true">
          <div className="k-row">
            <div className="k-track" data-marquee="k1">
              {stack.rowA.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
          <div className="k-row alt">
            <div className="k-track" data-marquee="k2">
              {stack.rowB.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </div>
        <dl className="stack-grid">
          {stack.groups.map((g) => (
            <div key={g.k}>
              <dt>{g.k}</dt>
              <dd>{g.v}</dd>
            </div>
          ))}
        </dl>

        <Aws />

        <div className="creds">
          <div className="sec-head">
            <h2 data-split>Education</h2>
          </div>
          <ul className="cred-list">
            <li className="cred">
              <span className="cred-mark">
                <Icon name="cap" />
              </span>
              <h3>{education.degree}</h3>
              <p>
                {education.school}
                <br />
                {education.grade}
              </p>
              <span className="when">{education.when}</span>
            </li>
          </ul>
        </div>
      </section>
      <div className="curve-wrap" aria-hidden="true">
        <div className="curve" />
      </div>
    </>
  );
}
