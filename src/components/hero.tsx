import Image from "next/image";
import { nav, person } from "@/content/site";
import { Icon } from "./icons";

export function Hero() {
  return (
    <header className="hero" id="top">
      <div className="nav h-in">
        <a className="brand" href="#top">
          <span className="dot" />
          {person.name}
        </a>
        <ul>
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href}>{n.label}</a>
            </li>
          ))}
        </ul>
      </div>

      <figure className="hero-photo h-in">
        <div className="ph-media">
          <Image id="me" src={person.photo} alt={person.photoAlt} width={768} height={722} priority sizes="(max-width: 900px) 100vw, 520px" />
          <canvas className="ph-gl" aria-hidden="true" />
        </div>
      </figure>

      <div className="say-hi h-in">
        <a className="mag" href={`mailto:${person.email}`} data-mag="0.45" data-cursor="Mail">
          <span className="btn-round">
            <span className="fill" />
            <span className="lbl">Say hi</span>
          </span>
        </a>
      </div>

      <div className="hero-loc h-in">
        <span className="glyph">
          <Icon name="pin" />
        </span>
        <span>
          <b>{person.city}</b>
          <small>
            <time className="clock">--:--</time> IST, local time
          </small>
        </span>
      </div>

      <div className="hero-role h-in">
        <Icon name="arrowDR" />
        <p>{person.role}</p>
        <p>{person.focus}</p>
      </div>

      <div className="marquee h-in" aria-hidden="true">
        <div className="marquee-track" data-marquee="hero">
          {[0, 1, 2].map((i) => (
            <span key={i}>
              {person.name} <em>—</em>
            </span>
          ))}
        </div>
      </div>
      <h1 className="sr">
        {person.name}, {person.role}
      </h1>
    </header>
  );
}
