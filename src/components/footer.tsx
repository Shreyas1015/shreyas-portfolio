import Image from "next/image";
import { person, work } from "@/content/site";
import { Icon } from "./icons";

export function Footer() {
  return (
    <footer className="foot" id="contact">
      <div className="foot-in">
        <div className="talk">
          <h2>
            <span className="ava">
              <Image src={person.photo} alt="" width={768} height={722} sizes="440px" />
            </span>
            <span className="talk-txt">Let&apos;s talk</span>
          </h2>
        </div>
        <div className="talk-line">
          <a className="mag" href={`mailto:${person.email}`} data-mag="0.4" data-cursor="Mail">
            <span className="btn-round">
              <span className="fill" />
              <span className="lbl">Get in touch</span>
            </span>
          </a>
        </div>
        <div className="talk-pills">
          <button className="pill copy-mail" data-copy={person.email} data-cursor="Copy">
            <span className="fill" />
            <Icon name="mail" />
            {person.email} <small className="cp-t">Copy</small>
          </button>
          <a className="pill" href={person.resume} data-cursor="Open">
            <span className="fill" />
            <Icon name="file" />
            Resume
          </a>
        </div>
        <div className="foot-bar">
          <dl className="col">
            <div>
              <dt>Local time</dt>
              <dd>
                <span className="live">
                  <i />
                </span>
                <time className="clock-s">--:--:--</time> IST, Mumbai
              </dd>
            </div>
            <div>
              <dt>Now</dt>
              <dd>{work.jobs.find((j) => j.when.endsWith("Present"))?.coFull}</dd>
            </div>
            <div>
              <dt>Certified</dt>
              <dd>AWS Developer – Associate</dd>
            </div>
            <div>
              <dt>Socials</dt>
              <dd className="socs">
                <a href={person.github} data-cursor="Open">
                  GitHub
                </a>
                <a href={person.linkedin} data-cursor="Open">
                  LinkedIn
                </a>
                <a href={`mailto:${person.email}`} data-cursor="Mail">
                  Email
                </a>
              </dd>
            </div>
          </dl>
          <button className="to-top" type="button" data-cursor="Top">
            <span className="ar">
              <Icon name="arrowUp" />
            </span>
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
