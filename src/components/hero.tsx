"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight";
import { FlipWords } from "@/components/ui/flip-words";

const words = [
  "Software Engineer",
  "Backend & Cloud Engineer",
  "AWS Certified Developer",
  "FastAPI & Node.js Engineer",
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Aceternity Spotlight */}
      <Spotlight className="absolute inset-0 z-0" fill="white" />

      {/* Dot grid background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(161,161,170,0.25) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Soft gradient blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-rose-500/10 rounded-full filter blur-3xl animate-blob" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-emerald-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <h2 className="text-sm md:text-base font-medium text-zinc-500 dark:text-zinc-400 tracking-widest uppercase mb-2">
              Welcome to my portfolio
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-purple-500 to-emerald-500">
              Shreyas Gurav
            </h1>
          </motion.div>

          {/* Aceternity FlipWords */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="h-10 flex items-center justify-center"
          >
            <h2 className="text-xl md:text-2xl font-medium text-zinc-700 dark:text-zinc-300">
              <FlipWords words={words} duration={2800} />
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="max-w-2xl text-zinc-600 dark:text-zinc-400"
          >
            I build reliable backend systems and cloud-native platforms designed
            for scale, automation, and operational clarity. My work focuses on
            production engineering — designing services, operating distributed
            AWS infrastructure, and integrating AI workflows that reduce manual
            processes and improve system efficiency.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="flex flex-wrap justify-center gap-4 mt-6"
          >
            <Link
              href="https://github.com/Shreyas1015"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="gap-2 rounded-full group overflow-hidden relative"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-rose-500 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </Button>
            </Link>
            <Link
              href="https://linkedin.com/in/shreyasgurav1015"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="gap-2 rounded-full group overflow-hidden relative"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-rose-500 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <Linkedin className="h-5 w-5" />
                <span>LinkedIn</span>
              </Button>
            </Link>
            <Link href="mailto:shreyasss15.10@gmail.com">
              <Button className="gap-2 rounded-full size-lg bg-gradient-to-r from-rose-500 via-purple-500 to-emerald-500 hover:shadow-lg hover:shadow-rose-500/20 transition-shadow duration-300">
                <Mail className="h-5 w-5" />
                <span>Contact Me</span>
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-10"
          >
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full animate-bounce"
              onClick={() => {
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <ArrowDown className="h-6 w-6" />
              <span className="sr-only">Scroll Down</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
