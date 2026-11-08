import { nav, person } from "@/content/site";

/* Fixed layers that sit outside the page flow: cursor, preloader, menu, hover panels. */

export function Cursor() {
  return (
    <>
      <div className="cursor hide" aria-hidden="true">
        <i />
      </div>
      <div className="cursor-l" aria-hidden="true">
        <span>View</span>
      </div>
    </>
  );
}

const CURVE = "M0 0 L1000 0 Q500 200 0 0 Z";

export function Loader() {
  return (
    <div className="loader" aria-hidden="true" data-cursor="Skip">
      <div className="ld-sheet">
        <svg className="ld-curve" viewBox="0 0 1000 200" preserveAspectRatio="none">
          <path d={CURVE} />
        </svg>
      </div>
      <div className="ld-main">
        <span className="ld-brand">
          <i />
          {person.name}
        </span>
        <p className="ld-word">
          <i />
          <span>Hello</span>
        </p>
        <span className="ld-line">
          <i />
        </span>
        <span className="ld-count">0</span>
        <svg className="ld-curve" viewBox="0 0 1000 200" preserveAspectRatio="none">
          <path d={CURVE} />
        </svg>
      </div>
    </div>
  );
}

export function Menu() {
  return (
    <>
      <button className="menu-btn" aria-label="Open menu" aria-expanded="false" aria-controls="menu">
        <svg className="prog" viewBox="0 0 80 80" aria-hidden="true">
          <circle className="pt" cx="40" cy="40" r="38" />
          <circle className="pb" cx="40" cy="40" r="38" pathLength={1} transform="rotate(-90 40 40)" />
        </svg>
        <span className="bars" />
      </button>
      <div className="scrim" aria-hidden="true" />
      <aside className="menu" id="menu" aria-label="Menu">
        <nav>
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="soc">
          <a href={person.github} data-cursor="Open">
            GitHub
          </a>
          <a href={person.linkedin} data-cursor="Open">
            LinkedIn
          </a>
          <a href={person.resume} data-cursor="Open">
            Resume
          </a>
        </div>
      </aside>
    </>
  );
}
