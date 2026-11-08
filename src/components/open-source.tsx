import { openSource } from "@/content/site";
import { Icon } from "./icons";

type Pkg = (typeof openSource)["codeloom"] | (typeof openSource)["rigel"];

function Zoom() {
  const top = ["p", "e", "n"];
  const bottom = ["s", "o", "u", "r", "c", "e"];
  return (
    <div className="zoom" aria-hidden="true">
      <div className="zoom-stage">
        <div className="zoom-clip">
          <div className="zoom-txt">
            <span className="zl">
              <span className="zc zo">
                O<i className="zdot" />
              </span>
              {top.map((c, i) => (
                <span className="zc" key={i}>
                  {c}
                </span>
              ))}
            </span>
            <span className="zl">
              {bottom.map((c, i) => (
                <span className="zc" key={i}>
                  {c}
                </span>
              ))}
            </span>
          </div>
        </div>
        <div className="zoom-flood">
          <p className="zoom-say">{openSource.say}</p>
        </div>
        <div className="zoom-curve" />
      </div>
    </div>
  );
}

function Body({ p }: { p: Pkg }) {
  return (
    <>
      <h3 className="proj-name">
        {p.name}
        <span className="v">{p.version}</span>
      </h3>
      <div className="proj-body">
        <p className="proj-desc">{p.desc}</p>
        <ul className="proj-points">
          {p.points.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <div className="proj-actions">
          <button className="cmd" data-copy={p.cmd} data-cursor="Copy" aria-label={`Copy command: ${p.cmd}`}>
            <span>
              <span className="p">$</span> {p.cmd}
            </span>
            <span className="cp">
              <Icon name="copy" />
              <span className="cp-t">Copy</span>
            </span>
          </button>
          <a className="gh" href={p.repo} data-cursor="Open">
            <Icon name="github" />
            {p.repo.replace("https://", "")}
            <Icon name="arrowUR" className="ico arr" />
          </a>
          <a className="gh npm" href={p.npm} data-cursor="Open">
            <Icon name="npm" />
            npm
            <Icon name="arrowUR" className="ico arr" />
          </a>
        </div>
      </div>
      <dl className="proj-why">
        {p.why.map((w) => (
          <div key={w.k}>
            <dt>{w.k}</dt>
            <dd>{w.v}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

function Journey() {
  const nodes = [
    { icon: "page" as const, b: <><span className="k">web</span> /customers/new</>, s: "(page)", d: false },
    { icon: "swap" as const, b: <><span className="k">POST</span> /api/customers</>, s: "(api route)", d: true },
    {
      icon: "code" as const,
      b: <><span className="nw">CustomersController.store</span> <span className="nw">→ CustomerService.create</span></>,
      s: "(code)",
      d: false,
    },
    { icon: "db" as const, b: <>customers, audit_logs</>, s: "(db tables)", d: true },
  ];
  return (
    <div
      className="journey"
      role="img"
      aria-label="One journey codeloom maps: the web page /customers/new calls POST /api/customers, handled by CustomersController.store and CustomerService.create, which write the customers and audit_logs tables."
    >
      <svg className="jr-lines" aria-hidden="true">
        <path className="jr-ghost" />
        <path className="jr-ghost" />
        <path className="jr-ghost" />
        <path className="jr-path" />
        <path className="jr-path" />
        <path className="jr-path" />
        <circle className="jr-tip-h" r="11" cx="-99" cy="-99" />
        <circle className="jr-tip" r="5" cx="-99" cy="-99" />
      </svg>
      {nodes.map((n, i) => (
        <div className={n.d ? "jr-node d" : "jr-node"} key={i}>
          <span className="jr-ic">
            <Icon name={n.icon} />
          </span>
          <span>
            <b>{n.b}</b>
            <small>{n.s}</small>
          </span>
        </div>
      ))}
    </div>
  );
}

function Gate() {
  const g = openSource.rigel.gate;
  return (
    <div className="gate" role="group" aria-label="The create-rigel gate, run on every commit. Any step fails, the commit is blocked.">
      <div className="gate-bar">
        <i />
        <i />
        <i />
        <span>the gate, run on every commit</span>
        <span className="gate-st">
          <span className="q">running</span>
          <span className="ok">all {g.length} passed</span>
        </span>
      </div>
      <div className="gate-prog">
        <i />
      </div>
      <ol className="gate-list">
        {g.map((s) => (
          <li key={s.name}>
            <Icon name="check" className="tk" />
            <b>
              {s.name}
              {s.note && <em>{s.note}</em>}
            </b>
            <span className="gs">
              <span className="q">queued</span>
              <span className="ok">pass</span>
            </span>
          </li>
        ))}
      </ol>
      <div className="gate-stamp" aria-hidden="true">
        <b>gate passed</b>
        <small>commit lands</small>
      </div>
    </div>
  );
}

export function OpenSource() {
  return (
    <section className="work" id="work" aria-labelledby="work-h">
      <Zoom />
      <div className="sec-head">
        <h2 id="work-h" data-split>
          Open source
        </h2>
        <p>{openSource.say}</p>
      </div>
      <div className="projects">
        <article className="proj">
          <Body p={openSource.codeloom} />
          <Journey />
        </article>
        <article className="proj">
          <Body p={openSource.rigel} />
          <Gate />
        </article>
      </div>
    </section>
  );
}
