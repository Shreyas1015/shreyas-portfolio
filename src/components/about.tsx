"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import SectionHeading from "@/components/section-heading";

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 w-1/3 h-1/3 bg-rose-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute left-0 bottom-1/4 w-1/3 h-1/3 bg-emerald-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 mx-auto">
        <SectionHeading title="About Me" subtitle="My introduction" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-16">
          <motion.div style={{ y, opacity }} className="relative">
            <div className="relative mx-auto max-w-md">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-rose-500 rounded-tl-2xl z-0"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-emerald-500 rounded-br-2xl z-0"></div>

              {/* Main image with gradient border */}
              <div className="relative z-10 rounded-2xl overflow-hidden p-1 bg-gradient-to-br from-rose-500 via-purple-500 to-emerald-500">
                <div className="absolute inset-0 bg-white dark:bg-zinc-950 rounded-2xl m-[3px]"></div>
                <div className="relative rounded-xl overflow-hidden aspect-[4/5]">
                  <Image
                    src="/PROFILE-PIC.jpg"
                    alt="Shreyas Gurav"
                    width={480}
                    height={600}
                    className="object-cover h-full w-full"
                  />
                </div>
              </div>

              {/* Experience stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="absolute -bottom-10 -right-10 bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-4 z-20"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-500">
                      2+
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Years of
                      <br />
                      Experience
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-emerald-500">
                      5+
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Projects
                      <br />
                      Completed
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              I&apos;m a{" "}
              <span className="font-semibold text-rose-500 dark:text-rose-400">
                Full Stack Developer
              </span>{" "}
              with hands-on experience in JavaScript, React.js, Node.js, and
              Tailwind CSS. My journey in web development started with a passion
              for creating efficient, user-friendly applications that solve
              real-world problems.
            </p>

            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Skilled in building scalable applications with MongoDB and MySQL
              while following best practices in clean coding and performance
              optimization. I specialize in creating responsive, accessible, and
              performant web applications that provide exceptional user
              experiences.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-semibold text-lg mb-2">Education</h3>
                <p className="text-zinc-700 dark:text-zinc-300">
                  B.Tech in Computer Engineering
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  Vasantdada Patil College Of Engineering
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  2021-2025 • CGPA: 7.75
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-semibold text-lg mb-2">Location</h3>
                <p className="text-zinc-700 dark:text-zinc-300">
                  Mumbai, Maharashtra
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  Open to remote opportunities
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  Available for freelance work
                </p>
              </div>
            </div>

            <div className="pt-6">
              <Button className="rounded-full gap-2 bg-gradient-to-r from-rose-500 via-purple-500 to-emerald-500 hover:shadow-lg hover:shadow-rose-500/20 transition-shadow duration-300">
                <Download className="h-4 w-4" />
                Download Resume
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
