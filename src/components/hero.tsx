"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MousePointer, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Moved outside to prevent unnecessary re-renders and dependency warnings
const words = [
  "Full Stack Developer",
  "React.js Expert",
  "Next.js Developer",
  "Node.js Developer",
];

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Typing effect
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 50 : subIndex === words[index].length ? 1000 : 100, Math.random() * 100));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  // Blink effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout);
  }, [blink]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-30 dark:opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(244, 63, 94, 0.15), transparent 40%)`,
          }}
        />
        <div className="absolute top-20 left-20 w-72 h-72 bg-rose-500/10 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-emerald-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.02]"></div>

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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="h-8 flex items-center justify-center"
          >
            <h2 className="text-xl md:text-2xl font-medium text-zinc-700 dark:text-zinc-300">
              {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="max-w-2xl text-zinc-600 dark:text-zinc-400"
          >
            Crafting exceptional digital experiences with modern technologies.
            Specialized in building scalable applications with React.js,
            Next.js, and Node.js.
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
                <span className="absolute inset-0 bg-gradient-to-r from-rose-500 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
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
                <span className="absolute inset-0 bg-gradient-to-r from-rose-500 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                <Linkedin className="h-5 w-5" />
                <span>LinkedIn</span>
              </Button>
            </Link>
            <Link href="mailto:shreyas1234gurav@gmail.com">
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

      {/* Mouse follower */}
      <motion.div
        className="hidden md:block fixed w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          mass: 0.5,
        }}
      >
        <MousePointer className="text-white h-6 w-6" />
      </motion.div>
    </section>
  );
}
