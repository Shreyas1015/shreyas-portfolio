"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/header";
import Hero from "@/components/hero";
import About from "@/components/about";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Achievements from "@/components/achievements";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";

export default function MainLayout() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      const sections = [
        { id: "home", offset: 0 },
        {
          id: "about",
          offset: document.getElementById("about")?.offsetTop || 0,
        },
        {
          id: "skills",
          offset: document.getElementById("skills")?.offsetTop || 0,
        },
        {
          id: "experience",
          offset: document.getElementById("experience")?.offsetTop || 0,
        },
        {
          id: "projects",
          offset: document.getElementById("projects")?.offsetTop || 0,
        },
        {
          id: "achievements",
          offset: document.getElementById("achievements")?.offsetTop || 0,
        },
        {
          id: "contact",
          offset: document.getElementById("contact")?.offsetTop || 0,
        },
      ];

      // Find the current section (with a buffer of 200px)
      const buffer = 200;
      const currentSection = sections
        .filter((section) => scrollY >= section.offset - buffer)
        .reduce(
          (prev, current) => (current.offset > prev.offset ? current : prev),
          sections[0]
        );

      setActiveSection(currentSection.id);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50"
          >
            <Loader />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div
        className={cn(
          "min-h-screen px-4 sm:px-6 md:px-12 lg:px-20 bg-white dark:bg-zinc-950",
          loading ? "overflow-hidden h-screen" : ""
        )}
      >
        <Header activeSection={activeSection} />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Achievements />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
