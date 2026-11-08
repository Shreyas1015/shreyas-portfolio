import type { Metadata, Viewport } from "next";
import { Funnel_Display, Funnel_Sans, JetBrains_Mono } from "next/font/google";
import { person } from "@/content/site";
import "./globals.css";
import "./sections.css";

const display = Funnel_Display({ subsets: ["latin"], variable: "--f-display", display: "swap" });
const text = Funnel_Sans({ subsets: ["latin"], style: ["normal", "italic"], variable: "--f-text", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--f-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://shreyas-full-stack-portfolio.vercel.app"),
  title: person.name,
  description: person.description,
  openGraph: { title: person.name, description: person.description, images: [person.photo], type: "website" },
};

export const viewport: Viewport = { themeColor: "#0f0e0d" };

/*
 * Runs before paint: picks the motion mode and hides the hero until the intro plays.
 * ?static renders everything settled, ?at=<px> skips the preloader for captures.
 */
const bootScript = `(function(){var q=location.search,d=document.documentElement;
var reduced=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
if(/[?&]static\\b/.test(q))d.classList.add('static');
else if(reduced)d.classList.add('reduced');
else{d.classList.add('pre');if(!/[?&]at=/.test(q))d.classList.add('ld');
window.__pf=setTimeout(function(){d.classList.remove('pre','ld');},6000);}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
