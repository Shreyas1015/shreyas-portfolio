# shreyas-portfolio

Personal site for Shreyas Gurav. Next.js 16 (App Router), GSAP 3.15 (ScrollTrigger, SplitText, DrawSVG, CustomEase), Lenis, plain CSS. The design is pinned to the `shreyas-gurav-site-concept` prototype.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Editing content

Every word on the page lives in `src/content/site.ts`. Updating the resume means editing that file, not components.

- Never add the dispatch planner's open-order value (confidential).
- The resume download is `public/Shreyas_Gurav_Software_Engineer.pdf` (redacted 2026 version). Only ever replace it with a redacted copy.

## Layout

- `src/app/globals.css` – the concept's stylesheet, unchanged apart from font variables.
- `src/app/sections.css` – sections added beyond the concept (about, experience systems, AWS, footer bar).
- `src/components/*` – one component per section.
- `src/motion/site.ts` – all page motion; `src/motion/hero-gl.ts` – the hero photo shader.

Debug flags: `?static` renders everything settled, `?at=<px>` skips the preloader and jumps to a scroll offset.
