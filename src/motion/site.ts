/*
 * All page motion, ported from the site concept. Runs once after hydration.
 * Modes (set by the boot script in layout.tsx): .static, .reduced, or full motion.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { CustomEase } from "gsap/CustomEase";
import Lenis from "lenis";
import { createHeroGL } from "./hero-gl";

type El = HTMLElement;
const $ = <T extends Element = El>(s: string, c: ParentNode = document) => c.querySelector<T>(s);
const $$ = <T extends Element = El>(s: string, c: ParentNode = document) => Array.from(c.querySelectorAll<T>(s));

declare global {
  interface Window {
    __pf?: number;
  }
}

/* ---------- split helpers ---------- */
const isSvg = (n: Node) => (n as Element).namespaceURI === "http://www.w3.org/2000/svg";
function splitWords(el: El) {
  const out: El[] = [];
  (function walk(node: Node) {
    Array.from(node.childNodes).forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        (n.textContent || "").split(/(\s+)/).forEach((w) => {
          if (!w) return;
          if (/^\s+$/.test(w)) return void frag.appendChild(document.createTextNode(w));
          const s = document.createElement("span");
          s.className = "w";
          s.textContent = w;
          frag.appendChild(s);
          out.push(s);
        });
        n.parentNode!.replaceChild(frag, n);
      } else if (n.nodeType === 1 && !isSvg(n)) walk(n);
    });
  })(el);
  return out;
}
function maskWords(el: El) {
  const ws = splitWords(el);
  ws.forEach((w) => {
    const m = document.createElement("span");
    m.className = "m";
    w.parentNode!.insertBefore(m, w);
    m.appendChild(w);
  });
  return ws;
}
function manualChars(el: El, cls: string) {
  const out: El[] = [];
  (function walk(node: Node) {
    Array.from(node.childNodes).forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        Array.from(n.textContent || "").forEach((ch) => {
          if (/\s/.test(ch)) return void frag.appendChild(document.createTextNode(ch));
          const s = document.createElement("span");
          s.className = cls;
          s.textContent = ch;
          s.style.display = "inline-block";
          frag.appendChild(s);
          out.push(s);
        });
        n.parentNode!.replaceChild(frag, n);
      } else if (n.nodeType === 1 && !isSvg(n)) walk(n);
    });
  })(el);
  return out;
}
function splitChars(el: El, cls: string): El[] {
  try {
    return new SplitText(el, { type: "chars", charsClass: cls, tag: "span" }).chars as El[];
  } catch {
    return manualChars(el, cls);
  }
}

let started = false;

export function start() {
  if (started) return;
  started = true;

  const root = document.documentElement;
  clearTimeout(window.__pf);
  const Q = location.search;
  const STATIC = root.classList.contains("static");
  const REDUCED = root.classList.contains("reduced");
  const MOTION = !STATIC && !REDUCED;
  const FINE = matchMedia("(hover:hover) and (pointer:fine)").matches && innerWidth > 900;
  const AT = (Q.match(/[?&]at=(\d+)/) || [])[1];
  let lenis: Lenis | null = null;

  if (STATIC) root.style.setProperty("--hero-h", innerHeight + "px");
  if (!MOTION) root.classList.remove("pre", "ld");

  /* clocks */
  const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" });
  const fmtS = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "Asia/Kolkata" });
  function tick() {
    const d = new Date(), t = fmt.format(d), s = fmtS.format(d);
    $$(".clock").forEach((c) => (c.textContent = t));
    $$(".clock-s").forEach((c) => (c.textContent = s));
  }
  tick();
  setInterval(tick, 1000);

  /* AWS validity marker, recomputed for today */
  const av = $(".aws-valid");
  if (av) {
    const a = Date.parse(av.dataset.from!), b = Date.parse(av.dataset.to!);
    const p = Math.min(100, Math.max(0, ((Date.now() - a) / (b - a)) * 100));
    $(".aws-line", av)!.style.setProperty("--p", p.toFixed(1) + "%");
  }

  /* copy buttons */
  $$("[data-copy]").forEach((b) => {
    b.addEventListener("click", () => {
      const t = b.getAttribute("data-copy")!, lbl = $(".cp-t", b);
      (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(
        () => {
          b.classList.add("ok");
          if (lbl) lbl.textContent = "Copied";
          setTimeout(() => {
            b.classList.remove("ok");
            if (lbl) lbl.textContent = "Copy";
          }, 1600);
        },
        () => {
          if (t.indexOf("@") > 0 && t.indexOf(" ") < 0) location.href = "mailto:" + t;
        },
      );
    });
  });

  /* menu */
  const mb = $(".menu-btn")!;
  function setMenu(open: boolean) {
    root.classList.toggle("menu-open", open);
    mb.setAttribute("aria-expanded", String(open));
    mb.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  mb.addEventListener("click", () => setMenu(!root.classList.contains("menu-open")));
  $(".scrim")!.addEventListener("click", () => setMenu(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });
  $$<HTMLAnchorElement>(".menu nav a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

  /* back to top */
  $(".to-top")!.addEventListener("click", () => {
    if (lenis) lenis.scrollTo(0, { duration: 2.4, easing: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2) });
    else window.scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" });
  });


  /* codeloom journey connectors (all modes; drawn by default) */
  const jr = $(".journey");
  function layoutJourney() {
    if (!jr) return;
    const svg = $<SVGSVGElement>(".jr-lines", jr)!, nodes = $$(".jr-node", jr), paths = $$<SVGPathElement>(".jr-path", jr), ghosts = $$<SVGPathElement>(".jr-ghost", jr);
    const vertical = innerWidth <= 900;
    svg.setAttribute("viewBox", "0 0 " + jr.offsetWidth + " " + jr.offsetHeight);
    for (let i = 0; i < 3; i++) {
      const a = nodes[i], b = nodes[i + 1];
      let d: string;
      if (!vertical) {
        const x1 = a.offsetLeft + a.offsetWidth, y1 = a.offsetTop + a.offsetHeight / 2, x2 = b.offsetLeft, y2 = b.offsetTop + b.offsetHeight / 2, dx = (x2 - x1) * 0.62;
        d = `M${x1} ${y1} C${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}`;
      } else {
        const X1 = a.offsetLeft + a.offsetWidth / 2, Y1 = a.offsetTop + a.offsetHeight, X2 = b.offsetLeft + b.offsetWidth / 2, Y2 = b.offsetTop, dy = (Y2 - Y1) * 0.7;
        d = `M${X1} ${Y1} C${X1} ${Y1 + dy} ${X2} ${Y2 - dy} ${X2} ${Y2}`;
      }
      paths[i].setAttribute("d", d);
      ghosts[i].setAttribute("d", d);
    }
  }
  layoutJourney();
  addEventListener("resize", layoutJourney);
  document.fonts?.ready.then(layoutJourney);

  /* everything below waits for the webfonts (capped), so splits + measurements are exact */
  const fontsReady = document.fonts ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]) : Promise.resolve();
  fontsReady.then(boot);

  function boot() {
    /* ---------- marquees (always built; moved only with motion) ---------- */
    const marquees = $$("[data-marquee]").map((tr) => {
      Array.from(tr.children).forEach((k) => {
        const c = k.cloneNode(true) as El;
        c.setAttribute("aria-hidden", "true");
        tr.appendChild(c);
      });
      const key = tr.getAttribute("data-marquee");
      return { el: tr, key, x: key === "k2" ? -1 : 0, w: 0, speed: key === "hero" ? 70 : 55, sign: key === "k2" ? 1 : -1 };
    });
    const heroL: { el: El; c: number; y: number }[] = [];
    if (MOTION) $$(".marquee-track > span").forEach((sp) => splitChars(sp, "lt").forEach((c) => heroL.push({ el: c, c: 0, y: 0 })));
    function measure() {
      marquees.forEach((m) => {
        m.w = m.el.scrollWidth / 2;
        if (m.x === -1) m.x = -m.w;
      });
      heroL.forEach((L) => (L.c = L.el.offsetLeft + L.el.offsetWidth / 2));
    }
    measure();
    if (STATIC) marquees.forEach((m) => m.sign === 1 && gsap.set(m.el, { x: -m.w * 0.35 }));

    if (!MOTION) return;

    /* ================================================================
       MOTION
       ================================================================ */
    root.classList.add("motion");
    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText, CustomEase);
    CustomEase.create("io", "M0,0 C0.76,0 0.24,1 1,1");
    CustomEase.create("flow", "M0,0 C0.16,1 0.3,1 1,1");
    const IO = "io", OUT = "flow";
    function scrubbed(tl: gsap.core.Timeline, vars: ScrollTrigger.Vars, invalidate = false) {
      tl.pause();
      const seek = (p: number) => gsap.to(tl, { progress: p, duration: 0.8, ease: "power2.out", overwrite: true });
      const st = ScrollTrigger.create({
        ...vars,
        onUpdate: (self) => seek(self.progress),
        onRefresh: (self) => {
          if (invalidate) tl.invalidate();
          tl.progress(self.progress);
        },
      });
      tl.progress(st.progress);
    }
    function draw(tl: gsap.core.Timeline, el: Element | null, at: number, dur: number, ease?: string) {
      if (el) tl.fromTo(el, { drawSVG: "0%" }, { drawSVG: "100%", duration: dur, ease: ease || "none" }, at);
    }

    /* ---------- Lenis + one ticker ---------- */
    const L = new Lenis({ lerp: 0.085, wheelMultiplier: 1 });
    lenis = L;
    L.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => L.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    $$<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href")!;
        if (id.length < 2) return;
        e.preventDefault();
        setMenu(false);
        L.scrollTo(id === "#top" ? 0 : id, { duration: 1.8 });
      });
    });

    let mx = innerWidth / 2, my = innerHeight / 2, pointerIn = false;
    addEventListener("pointermove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      pointerIn = true;
    }, { passive: true });

    /* scroll velocity (px/s), smoothed + normalised to -1..1 */
    let lastY = scrollY, vel = 0, dir = 1;
    const ring = $<SVGCircleElement>(".prog .pb")!;

    /* ---------- hero WebGL photo ---------- */
    const me = $<HTMLImageElement>("#me")!;
    const GL = createHeroGL(me, root);
    let heroVisible = true;
    new IntersectionObserver((es) => (heroVisible = es[0].isIntersecting)).observe($(".hero")!);

    /* ---------- master ticker ---------- */
    const hero = $(".hero")!, photo = $(".hero-photo")!;
    let heroHover = 0, waveAmp = 0;
    const skews = marquees.map((m) => gsap.quickTo(m.el, "skewX", { duration: 0.6, ease: "power3" }));
    const setters = heroL.map((l) => gsap.quickSetter(l.el, "y", "px") as (v: number) => void);
    gsap.ticker.add((time, dt) => {
      const s = Math.min(dt, 64) / 1000;
      const y = L.animatedScroll;
      const raw = (y - lastY) / Math.max(s, 0.001);
      lastY = y;
      if (raw > 40) dir = 1;
      else if (raw < -40) dir = -1;
      vel += (gsap.utils.clamp(-1, 1, raw / 2600) - vel) * 0.14;
      const boost = Math.abs(vel) * 7;
      marquees.forEach((m, i) => {
        if (!m.w) return;
        m.x += m.sign * dir * m.speed * (1 + boost) * s;
        if (m.x <= -m.w) m.x += m.w;
        if (m.x > 0) m.x -= m.w;
        gsap.set(m.el, { x: m.x });
        skews[i](gsap.utils.clamp(-14, 14, -vel * 16));
      });
      /* name wave under the cursor */
      if (heroL.length && FINE) {
        const hr = hero.getBoundingClientRect();
        const tgt = pointerIn && heroVisible && my > hr.top && my < hr.bottom ? 1 : 0;
        heroHover += (tgt - heroHover) * 0.08;
        if (heroHover > 0.002 || waveAmp) {
          waveAmp = heroHover > 0.002 ? 1 : 0;
          const m0 = marquees[0], fs = (heroL[0].el.parentNode as El).offsetHeight || 200, amp = fs * 0.16, sig = Math.max(110, innerWidth * 0.085);
          for (let k = 0; k < heroL.length; k++) {
            const l = heroL[k], dx = m0.x + l.c - mx;
            const t = Math.abs(dx) > sig * 4 ? 0 : -amp * Math.exp(-(dx * dx) / (2 * sig * sig)) * heroHover;
            const ny = l.y + (t - l.y) * 0.16;
            if (Math.abs(ny - l.y) > 0.01 || (t === 0 && l.y !== 0)) {
              l.y = Math.abs(ny) < 0.05 && t === 0 ? 0 : ny;
              setters[k](l.y);
            }
          }
        }
      }
      /* WebGL */
      if (GL && GL.ready() && heroVisible && !document.hidden) {
        const st = GL.st;
        if (FINE) {
          const r = GL.cv.getBoundingClientRect(), fr = photo.getBoundingClientRect();
          st.tx = (mx - r.left) / r.width;
          st.ty = 1 - (my - r.top) / r.height;
          st.th = pointerIn && mx > fr.left && mx < fr.right && my > fr.top && my < fr.bottom ? 1 : 0;
        } else {
          st.th = 0;
        }
        st.mx += (st.tx - st.mx) * 0.1;
        st.my += (st.ty - st.my) * 0.1;
        st.h += (st.th - st.h) * 0.035;
        st.vel += (vel - st.vel) * 0.2;
        if (st.h > 0.002 || Math.abs(st.vel) > 0.002 || st.dirty > 0) {
          GL.render();
          st.dirty--;
        }
      }
    });

    /* ---------- hero intro (runs after the preloader) ---------- */
    const heroChars = heroL.map((l) => l.el);
    gsap.set(heroChars, { yPercent: 115 });
    gsap.set(".hero-photo", { clipPath: "inset(100% 0% 0% 0%)" });
    gsap.set(".ph-media", { scale: 1.35 });
    gsap.set([".hero-loc", ".hero-role", ".nav"], { y: 30, opacity: 0 });
    gsap.set(".say-hi .btn-round", { scale: 0 });
    root.classList.remove("pre");
    let introDone = false;
    function heroIntro() {
      if (introDone) return;
      introDone = true;
      gsap
        .timeline({ defaults: { ease: OUT } })
        .to(".hero-photo", { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: IO })
        .to(".ph-media", { scale: 1, duration: 2.1 }, "<.15")
        .to(heroChars, { yPercent: 0, duration: 1.4, stagger: { amount: 0.7 } }, "<.25")
        .to([".nav", ".hero-loc", ".hero-role"], { y: 0, opacity: 1, duration: 1.2, stagger: 0.08 }, "-=1.4")
        .to(".say-hi .btn-round", { scale: 1, duration: 1.2, ease: "elastic.out(1,.5)" }, "-=1.2");
    }

    /* ---------- preloader ---------- */
    if (root.classList.contains("ld")) {
      L.stop();
      const FLAT = "M0 0 L1000 0 Q500 0 0 0 Z";
      const greet = ["Hello", "नमस्ते", "नमस्कार", "Hola", "Bonjour", "こんにちは", "Shreyas"];
      const wEl = $(".ld-word span")!, cnt = $(".ld-count")!, ctr = { v: 0 };
      const ltl = gsap.timeline();
      ltl
        .from(".ld-word", { opacity: 0, y: 24, duration: 0.4, ease: OUT }, 0)
        .from(".ld-brand", { opacity: 0, duration: 0.5 }, 0)
        .to(ctr, { v: 100, duration: 1.55, ease: "power2.inOut", onUpdate: () => void (cnt.textContent = String(Math.round(ctr.v))) }, 0)
        .to(".ld-line i", { scaleX: 1, duration: 1.55, ease: "power2.inOut" }, 0);
      greet.forEach((w, i) => i && ltl.call(() => void (wEl.textContent = w), undefined, 0.08 + i * 0.18));
      ltl
        .fromTo(".ld-word i", { scale: 1 }, { scale: 1.7, duration: 0.16, yoyo: true, repeat: 1, ease: "power2.out" }, 1.16)
        .addLabel("exit", 1.6)
        .to([".ld-brand", ".ld-word", ".ld-line", ".ld-count"], { y: -50, opacity: 0, duration: 0.45, ease: "power3.in", stagger: 0.03 }, "exit")
        .to(".ld-main", { yPercent: -100, duration: 0.95, ease: IO }, "exit+=.18")
        .to(".ld-main .ld-curve path", { attr: { d: FLAT }, duration: 0.95, ease: IO }, "exit+=.18")
        .to(".ld-sheet", { yPercent: -100, duration: 0.95, ease: IO }, "exit+=.3")
        .to(".ld-sheet .ld-curve path", { attr: { d: FLAT }, duration: 0.95, ease: IO }, "exit+=.3")
        .call(heroIntro, undefined, "exit+=.6")
        .call(() => {
          root.classList.remove("ld");
          L.start();
          ScrollTrigger.refresh();
        }, undefined, "exit+=1.3");
      $(".loader")!.addEventListener("click", () => {
        if (ltl.time() < ltl.labels.exit) {
          ltl.seek("exit");
          wEl.textContent = "Shreyas";
          cnt.textContent = "100";
        }
      });
    } else {
      gsap.delayedCall(0.15, heroIntro);
    }

    /* hero scroll: photo drifts, name sinks, side copy parallax */
    const heroST = { trigger: ".hero", start: "top top", end: "bottom top", scrub: true };
    gsap.to(".ph-media", { yPercent: -12, ease: "none", scrollTrigger: heroST });
    gsap.to(".marquee", { yPercent: 40, ease: "none", scrollTrigger: heroST });
    gsap.to(".hero-role", { y: -90, ease: "none", scrollTrigger: heroST });
    gsap.to(".hero-loc", { y: -40, ease: "none", scrollTrigger: heroST });

    /* menu button appears after hero; circular scroll progress */
    ScrollTrigger.create({
      trigger: ".hero",
      start: "bottom 20%",
      onEnter: () => mb.classList.add("on"),
      onLeaveBack: () => {
        mb.classList.remove("on");
        setMenu(false);
      },
    });
    ScrollTrigger.create({ start: 0, end: "max", onUpdate: (self) => void (ring.style.strokeDashoffset = (1 - self.progress).toFixed(4)) });

    /* ---------- statement: scrubbed fill + drawn marks ---------- */
    const words = splitWords($("[data-words]")!);
    const stl = gsap.timeline({ scrollTrigger: { trigger: ".statement", start: "top 80%", end: "bottom 42%", scrub: true } });
    words.forEach((w, i) => stl.fromTo(w, { opacity: 0.14 }, { opacity: 1, duration: 1, ease: "none" }, i * 0.5));
    $$(".statement .hot").forEach((h) => {
      const hw = $$(".w", h), first = words.indexOf(hw[0]);
      draw(stl, $(".mark path", h), first * 0.5 + 0.2, hw.length * 0.5 + 1.4, "power2.inOut");
    });

    /* ---------- zoom-through into Open source ---------- */
    const zoom = $(".zoom")!, ztxt = $(".zoom-txt")!, zdot = $(".zdot")!, zo = $(".zo")!;
    let zS = 40;
    function zMeasure() {
      const ox = zo.offsetLeft + zdot.offsetLeft + zdot.offsetWidth / 2, oy = zo.offsetTop + zdot.offsetTop + zdot.offsetHeight / 2;
      gsap.set(ztxt, { transformOrigin: ox + "px " + oy + "px" });
      const cx = ztxt.offsetLeft + ox, cy = ztxt.offsetTop + oy, W = innerWidth, H = zoom.offsetHeight;
      const far = Math.max(Math.hypot(cx, cy), Math.hypot(W - cx, cy), Math.hypot(cx, H - cy), Math.hypot(W - cx, H - cy));
      zS = (far / (zdot.offsetWidth / 2)) * 1.1;
    }
    zMeasure();
    ScrollTrigger.addEventListener("refreshInit", () => {
      gsap.set(ztxt, { scale: 1 });
      zMeasure();
      layoutJourney();
    });
    const sayWs = maskWords($(".zoom-say")!);
    gsap.from($$(".zc"), { yPercent: 70, opacity: 0, rotate: 6, ease: "none", stagger: 0.06, scrollTrigger: { trigger: zoom, start: "top 90%", end: "top 10%", scrub: 1 } });
    gsap
      .timeline({ scrollTrigger: { trigger: zoom, start: "top top", end: () => "+=" + Math.round(innerHeight * 3.2), pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true } })
      .to(".zl:last-child", { xPercent: 4, duration: 1.2, ease: "power1.inOut" }, 0)
      .fromTo(zdot, { scale: 1 }, { scale: 1.25, duration: 0.6, ease: "power2.out" }, 0.4)
      .to(ztxt, { scale: () => zS, duration: 5, ease: "power4.in" }, 1)
      .set(".zoom-flood", { opacity: 1 }, 5.97)
      .set(".zoom-curve", { opacity: 1 }, 5.97)
      .set(ztxt, { autoAlpha: 0 }, 5.99)
      .from(sayWs, { yPercent: 115, duration: 1.3, stagger: 0.1, ease: OUT }, 6.2)
      .to({}, { duration: 1.4 });
    gsap.fromTo(".zoom-curve", { height: innerWidth > 900 ? "10vw" : "18vw" }, { height: 0, ease: "none", scrollTrigger: { trigger: ".projects", start: "top bottom", end: "top 30%", scrub: true } });

    /* ---------- masked heading + block reveals ---------- */
    $$("[data-split]").forEach((h) => {
      const ws = maskWords(h);
      gsap.set(ws, { yPercent: 110 });
      gsap.to(ws, { yPercent: 0, duration: 1.3, ease: OUT, stagger: 0.06, scrollTrigger: { trigger: h, start: "top 88%" } });
    });
    $$(".sec-head p, .about-cta, .proj-body, .proj-why, .stack-grid div, .aws-body > :not(h3), .cred, .talk-pills, .foot-bar").forEach((el) => {
      gsap.from(el, { y: 40, opacity: 0, duration: 1.2, ease: OUT, scrollTrigger: { trigger: el, start: "top 92%" } });
    });
    $$(".proj").forEach((row) => {
      const ws = maskWords($(".proj-name", row)!);
      gsap.set(ws, { yPercent: 110 });
      gsap.to(ws, { yPercent: 0, duration: 1.4, ease: OUT, stagger: 0.05, scrollTrigger: { trigger: row, start: "top 88%" } });
    });

    /* ---------- about: the principle crossing the middle of the screen is lit ---------- */
    $$(".pr").forEach((pr) => {
      ScrollTrigger.create({ trigger: pr, start: "top center", end: "bottom center", toggleClass: "on" });
      gsap.from(pr, { y: 40, opacity: 0, duration: 1.2, ease: OUT, scrollTrigger: { trigger: pr, start: "top 92%" } });
    });
    $$("[data-lines]").forEach((p, i) => {
      SplitText.create(p, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, { yPercent: 100, duration: 1.1, stagger: 0.08, ease: OUT, delay: i ? 0.05 : 0, scrollTrigger: { trigger: p, start: "top 88%" } }),
      });
    });

    /* ---------- codeloom journey: node by node ---------- */
    if (jr) {
      const nodes = $$(".jr-node", jr), jpaths = $$<SVGPathElement>(".jr-path", jr), tip = $(".jr-tip", jr)!, tipH = $(".jr-tip-h", jr)!;
      const jtl = gsap.timeline({ paused: true });
      gsap.set([tip, tipH], { opacity: 0 });
      nodes.forEach((n, i) => {
        const at = i * 1.6;
        jtl
          .fromTo(n, { scale: 0.55, opacity: 0, y: 26, rotate: i % 2 ? 3 : -3 }, { scale: 1, opacity: 1, y: 0, rotate: 0, duration: 0.55, ease: "back.out(2.2)" }, at)
          .fromTo($(".jr-ic", n), { scale: 0, rotate: -90 }, { scale: 1, rotate: 0, duration: 0.5, ease: "back.out(3)" }, at + 0.15);
        if (i < 3) {
          const p = jpaths[i];
          jtl.fromTo(p, { drawSVG: "0%" }, {
            drawSVG: "100%",
            duration: 1,
            ease: "power1.inOut",
            onUpdate(this: gsap.core.Tween) {
              const len = p.getTotalLength(), pt = p.getPointAtLength(len * this.progress());
              [tip, tipH].forEach((c) => {
                c.setAttribute("cx", String(pt.x));
                c.setAttribute("cy", String(pt.y));
              });
            },
          }, at + 0.55);
          if (i === 0) jtl.to([tip, tipH], { opacity: 1, duration: 0.1 }, at + 0.55);
        }
      });
      jtl.to(tipH, { attr: { r: 26 }, opacity: 0, duration: 0.5 }, ">-.2");
      scrubbed(jtl, { trigger: jr, start: "top 85%", end: "bottom 48%" }, true);
    }

    /* ---------- create-rigel gate: ticks one by one ---------- */
    const gate = $(".gate");
    if (gate) {
      const rows = $$(".gate-list li", gate), n = rows.length * 1.1;
      const gtl = gsap.timeline({ paused: true });
      gtl
        .fromTo(".gate-prog i", { scaleX: 0 }, { scaleX: 1, duration: n, ease: "none" }, 0)
        .fromTo(".gate-st .q", { opacity: 1 }, { opacity: 0, duration: 0.2 }, n)
        .fromTo(".gate-st .ok", { opacity: 0 }, { opacity: 1, duration: 0.2 }, n);
      rows.forEach((r, i) => {
        const at = i * 1.1;
        gtl.fromTo(r, { opacity: 0.3, x: -14 }, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }, at);
        draw(gtl, $(".tk circle", r), at + 0.1, 0.55, "power1.inOut");
        draw(gtl, $(".tk path", r), at + 0.6, 0.35, "power2.out");
        gtl
          .fromTo($(".gs .q", r), { opacity: 1 }, { opacity: 0, duration: 0.15 }, at + 0.6)
          .fromTo($(".gs .ok", r), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(3)" }, at + 0.65);
      });
      gtl
        .fromTo(".gate-stamp", { opacity: 0, scale: 2.6, rotate: -26 }, { opacity: 1, scale: 1, rotate: innerWidth > 900 ? -9 : -6, duration: 0.55, ease: "expo.out" }, n + 0.2)
        .fromTo(gate, { borderColor: "rgba(241,237,230,.14)" }, { borderColor: "rgba(99,214,139,.5)", duration: 0.3 }, n + 0.2)
        .to({}, { duration: 0.5 });
      /* the stamp lands only once the gate has been scrolled through */
      scrubbed(gtl, { trigger: gate, start: "top 75%", end: "bottom 45%" });
    }

    /* ---------- experience spread: both leaves open outward from the centre seam ---------- */
    const spread = $(".spread");
    if (spread) {
      const stacked = innerWidth <= 900;
      const [then, now] = $$(".leaf", spread);
      const names = $$(".leaf-co", spread).map((n) => maskWords(n));
      gsap.set(names.flat(), { yPercent: 110 });
      gsap
        .timeline({ scrollTrigger: { trigger: spread, start: "top 75%" } })
        .fromTo(then, { clipPath: stacked ? "inset(0% 0% 100% 0%)" : "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: IO }, 0)
        .fromTo(now, { clipPath: stacked ? "inset(0% 0% 100% 0%)" : "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: IO }, stacked ? 0.2 : 0)
        .to(names.flat(), { yPercent: 0, duration: 1.3, ease: OUT, stagger: 0.12 }, 0.55)
        .from($$(".leaf-when, .leaf-role, .leaf-tx", spread), { y: 24, opacity: 0, duration: 1, stagger: 0.06, ease: OUT }, 0.75);

      /* the names are set in a variable face: weight is the material that moves */
      const BASE = 500, PEAK = 720;
      const words = $$(".leaf-co", spread).map((name, wi) => {
        const chars = $$(".w", name).flatMap((w) => manualChars(w, "lc"));
        const setW = chars.map((c) => gsap.quickTo(c, "fontWeight", { duration: 0.6, ease: "power3" }));
        return { name, leaf: name.closest(".leaf") as El, chars, setW, hover: false, drift: wi === 0 ? -1 : 1 };
      });
      /* scrolling through the spread sends one wave of weight across each name, left to right */
      ScrollTrigger.create({
        trigger: spread,
        start: "top 70%",
        end: "bottom 30%",
        onUpdate: (self) => {
          const c = -0.25 + self.progress * 1.5;
          words.forEach((w) => {
            if (w.hover) return;
            const n = Math.max(1, w.chars.length - 1);
            w.chars.forEach((_, i) => w.setW[i](BASE + (PEAK - BASE) * Math.exp(-((i / n - c) ** 2) / (2 * 0.14 ** 2))));
          });
        },
        onLeave: () => words.forEach((w) => w.setW.forEach((f) => f(BASE))),
        onLeaveBack: () => words.forEach((w) => w.setW.forEach((f) => f(BASE))),
      });
      /* and the two names drift apart from the seam */
      words.forEach((w) =>
        gsap.fromTo(w.name, { x: -w.drift * 16 }, { x: w.drift * 28, ease: "none", scrollTrigger: { trigger: spread, start: "top bottom", end: "bottom top", scrub: true } }),
      );
      /* with a pointer, the letters nearest the cursor thicken like ink under pressure */
      if (FINE) {
        words.forEach((w) => {
          w.leaf.addEventListener("pointermove", (e) => {
            w.hover = true;
            const sigma = (parseFloat(getComputedStyle(w.name).fontSize) || 150) * 0.55;
            w.chars.forEach((c, i) => {
              const r = c.getBoundingClientRect(), dx = r.left + r.width / 2 - e.clientX;
              w.setW[i](BASE + (PEAK - BASE) * Math.exp(-(dx * dx) / (2 * sigma * sigma)));
            });
          });
          w.leaf.addEventListener("pointerleave", () => {
            w.hover = false;
            w.setW.forEach((f) => f(BASE));
          });
        });
      }
    }

    /* ---------- impact reel: pinned sideways on desktop, counters everywhere ---------- */
    const impactEl = $(".impact");
    if (impactEl) {
      const itrack = $(".imp-track", impactEl)!;
      const panels = $$(".imp", impactEl);
      const enter = panels.map((panel) => {
        const tl = gsap.timeline({ paused: true });
        const fig = $(".imp-fig", panel)!;
        if (fig.dataset.count) {
          const to = +fig.dataset.count, from = +(fig.dataset.from || 0), dec = +(fig.dataset.dec || 0);
          const pre = fig.dataset.pre || "", suf = fig.dataset.suf || "", o = { v: from };
          fig.textContent = pre + from.toFixed(dec) + suf;
          tl.to(o, { v: to, duration: 1.6, ease: "expo.out", onUpdate: () => void (fig.textContent = pre + o.v.toFixed(dec) + suf) }, 0);
        } else {
          tl.from(splitChars(fig, "fc"), { yPercent: 100, opacity: 0, duration: 1.1, stagger: 0.04, ease: OUT, immediateRender: true }, 0);
        }
        tl.from($$(".imp-label, .imp-ctx", panel), { y: 30, opacity: 0, duration: 1, stagger: 0.08, ease: OUT, immediateRender: true }, 0.15);
        const bars = $$(".imp-bar i", panel);
        if (bars.length) tl.from(bars, { scaleX: 0, duration: 1.4, stagger: 0.25, ease: IO, immediateRender: true }, 0.2);
        return tl;
      });
      /* each panel plays once, the first time its left edge crosses 88% of the viewport */
      const played = new Set<number>();
      const check = () =>
        panels.forEach((panel, i) => {
          if (played.has(i)) return;
          const r = panel.getBoundingClientRect();
          if (r.left < innerWidth * 0.88 && r.top < innerHeight * 0.85) {
            played.add(i);
            enter[i].play();
          }
        });

      if (innerWidth > 900) {
        root.classList.add("hx");
        impactEl.classList.add("pinned");
        const dist = () => Math.max(0, itrack.scrollWidth - document.documentElement.clientWidth);
        const hold = innerHeight * 0.3;
        /* one scrubbed timeline: pin, hold so the first figure settles under the page margin, then slide */
        gsap
          .timeline({
            scrollTrigger: {
              trigger: impactEl,
              start: "top top",
              end: () => "+=" + (dist() + hold),
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => void gsap.set(".imp-prog i", { scaleX: self.progress }),
            },
            /* the scrubbed strip keeps easing after the scroll stops, so check on every frame it moves */
            onUpdate: check,
          })
          .to({}, { duration: hold })
          .to(itrack, { x: () => -dist(), duration: Math.max(1, dist()), ease: "none" });
      } else {
        /* phones: the strip is swiped; the progress rule follows the swipe */
        const bar = $(".imp-prog i", impactEl)!;
        itrack.addEventListener(
          "scroll",
          () => {
            const max = itrack.scrollWidth - itrack.clientWidth;
            gsap.set(bar, { scaleX: max > 0 ? itrack.scrollLeft / max : 0 });
            check();
          },
          { passive: true },
        );
      }
      ScrollTrigger.create({ trigger: impactEl, start: "top 85%", end: "bottom top", onUpdate: check, onEnter: check });
    }

    /* ---------- stack band: clip rise + throwable words ---------- */
    gsap.fromTo(".light", { clipPath: "inset(16% 3% 0% 3% round 64px 64px 0px 0px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)", ease: "none", scrollTrigger: { trigger: ".light", start: "top bottom", end: "top 20%", scrub: true } });
    const hops = new WeakMap<El, gsap.core.Timeline>();
    function hop(sp: El, delay = 0) {
      if (hops.get(sp)?.isActive()) return;
      hops.set(
        sp,
        gsap
          .timeline({ delay })
          .to(sp, { y: -gsap.utils.random(40, 80), rotate: gsap.utils.random(-18, 18), scale: 1.06, duration: 0.3, ease: "power3.out" })
          .to(sp, { y: 0, rotate: 0, scale: 1, duration: 1.3, ease: "elastic.out(1,.3)" }),
      );
    }
    $$(".k-track span").forEach((sp) => {
      sp.addEventListener("pointerenter", () => hop(sp));
      sp.addEventListener("pointerdown", () => hop(sp));
    });
    if (!FINE) {
      ScrollTrigger.create({
        trigger: ".kinetic",
        start: "top 70%",
        onEnter: () =>
          $$(".k-track span").forEach((sp) => {
            const r = sp.getBoundingClientRect();
            if (r.right > 0 && r.left < innerWidth) hop(sp, Math.random() * 0.5);
          }),
      });
    }

    /* ---------- AWS badge: ring turns with scroll, core lands, validity draws ---------- */
    if ($(".aws")) {
      gsap.to(".aws-ring", { rotate: 360, repeat: -1, duration: 40, ease: "none" });
      gsap.fromTo(".aws-badge", { rotate: -40 }, { rotate: 40, ease: "none", scrollTrigger: { trigger: ".aws", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(".aws-core", { scale: 0, rotate: -120, duration: 1.4, ease: "elastic.out(1,.6)", scrollTrigger: { trigger: ".aws", start: "top 75%" } });
      gsap
        .timeline({ scrollTrigger: { trigger: ".aws-valid", start: "top 90%" } })
        .from(".aws-line i", { scaleX: 0, duration: 1.4, ease: IO })
        .from(".aws-line b, .aws-line em", { scale: 0, opacity: 0, duration: 0.8, ease: "back.out(3)" }, "-=.3");
    }

    /* ---------- curve into footer + footer ---------- */
    gsap.fromTo(".curve", { height: "9vw" }, { height: 0, ease: "none", scrollTrigger: { trigger: ".foot", start: "top bottom", end: "top 30%", scrub: true } });
    gsap.from(".foot-in", { yPercent: -18, ease: "none", scrollTrigger: { trigger: ".foot", start: "top bottom", end: "bottom bottom", scrub: true } });
    const tchars = splitChars($(".talk-txt")!, "tc");
    gsap.from(tchars, { yPercent: 120, skewY: 12, opacity: 0, duration: 1.3, ease: OUT, stagger: 0.045, scrollTrigger: { trigger: ".talk", start: "top 85%" } });
    gsap.from(".talk .ava", { scale: 0, rotate: -120, duration: 1.4, ease: "elastic.out(1,.6)", scrollTrigger: { trigger: ".talk", start: "top 85%" } });

    ScrollTrigger.sort();
    addEventListener("resize", measure);
    document.fonts?.ready.then(() => {
      measure();
      ScrollTrigger.refresh();
    });

    /* deep link for captures: ?at=<px> */
    if (AT) {
      setTimeout(() => {
        ScrollTrigger.refresh();
        L.scrollTo(+AT, { immediate: true, force: true });
      }, 300);
    }

    /* ================================================================
       POINTER-ONLY
       ================================================================ */
    if (!FINE) return;
    root.classList.add("has-cursor");
    const cur = $(".cursor")!, curL = $(".cursor-l")!, curT = $(".cursor-l span")!;
    const cx = gsap.quickTo(cur, "x", { duration: 0.18, ease: "power3" }), cy = gsap.quickTo(cur, "y", { duration: 0.18, ease: "power3" });
    const lx = gsap.quickTo(curL, "x", { duration: 0.5, ease: "power3" }), ly = gsap.quickTo(curL, "y", { duration: 0.5, ease: "power3" });
    let seen = false;
    addEventListener("pointermove", (e) => {
      if (!seen) {
        seen = true;
        gsap.set([cur, curL], { x: e.clientX, y: e.clientY });
        cur.classList.remove("hide");
      }
      cx(e.clientX);
      cy(e.clientY);
      lx(e.clientX);
      ly(e.clientY);
    });
    document.addEventListener("pointerleave", () => {
      cur.classList.add("hide");
      curL.classList.remove("on");
    });
    document.addEventListener("pointerenter", () => cur.classList.remove("hide"));
    let lastLabel = "";
    function cursorFor(t: Element | null) {
      const el = t?.closest("[data-cursor]") ?? null, link = t?.closest("a, button, .k-track span") ?? null;
      let label = el ? el.getAttribute("data-cursor") || "" : "";
      if (el && link && el.contains(link) && link !== el && !link.hasAttribute("data-cursor")) label = "";
      cur.classList.toggle("hide", label === "hide");
      if (label && label !== "hide") {
        if (label !== lastLabel) curT.textContent = label;
        curL.classList.add("on");
        cur.classList.add("lab");
        cur.classList.remove("big");
      } else {
        curL.classList.remove("on");
        cur.classList.remove("lab");
        cur.classList.toggle("big", !!link && label !== "hide");
      }
      lastLabel = label;
    }
    document.addEventListener("pointerover", (e) => cursorFor(e.target as Element));
    /* magnetic */
    $$("[data-mag]").forEach((el) => {
      const k = parseFloat(el.getAttribute("data-mag")!) || 0.35, lbl = $(".lbl", el);
      const xT = gsap.quickTo(el, "x", { duration: 0.9, ease: "power3" }), yT = gsap.quickTo(el, "y", { duration: 0.9, ease: "power3" });
      const lxx = lbl && gsap.quickTo(lbl, "x", { duration: 0.9, ease: "power3" }), lyy = lbl && gsap.quickTo(lbl, "y", { duration: 0.9, ease: "power3" });
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        xT(dx * k);
        yT(dy * k);
        if (lxx && lyy) {
          lxx(dx * k * 0.6);
          lyy(dy * k * 0.6);
        }
      });
      el.addEventListener("pointerleave", () => {
        gsap.to(el, { x: 0, y: 0, duration: 1.2, ease: "elastic.out(1,.3)" });
        if (lbl) gsap.to(lbl, { x: 0, y: 0, duration: 1.2, ease: "elastic.out(1,.3)" });
      });
    });
    $$(".nav ul a, .gh, .to-top").forEach((a) => {
      a.addEventListener("pointermove", (e) => {
        const r = a.getBoundingClientRect();
        gsap.to(a, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.4, duration: 0.6, ease: "power3" });
      });
      a.addEventListener("pointerleave", () => gsap.to(a, { x: 0, y: 0, duration: 1, ease: "elastic.out(1,.35)" }));
    });

    /* "Let's talk" letters repel from the cursor */
    const foot = $(".foot")!, R = 240;
    const tst = tchars.map(() => ({ on: false }));
    foot.addEventListener("pointermove", (e) => {
      tchars.forEach((c, i) => {
        const r = c.getBoundingClientRect(), ox = gsap.getProperty(c, "x") as number, oy = gsap.getProperty(c, "y") as number;
        const dx = r.left + r.width / 2 - ox - e.clientX, dy = r.top + r.height / 2 - oy - e.clientY, d = Math.hypot(dx, dy) || 1;
        if (d < R) {
          const f = Math.pow(1 - d / R, 1.5) * 110;
          tst[i].on = true;
          gsap.to(c, { x: (dx / d) * f, y: (dy / d) * f, rotate: (dx / d) * f * 0.18, duration: 0.45, ease: "power3.out", overwrite: "auto" });
        } else if (tst[i].on) {
          tst[i].on = false;
          gsap.to(c, { x: 0, y: 0, rotate: 0, duration: 1.6, ease: "elastic.out(1,.28)", overwrite: "auto" });
        }
      });
    });
    foot.addEventListener("pointerleave", () => {
      tchars.forEach((c, i) => {
        tst[i].on = false;
        gsap.to(c, { x: 0, y: 0, rotate: 0, duration: 1.6, ease: "elastic.out(1,.28)", overwrite: "auto" });
      });
    });
  }
}
