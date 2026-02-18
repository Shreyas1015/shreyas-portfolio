"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import SectionHeading from "@/components/section-heading";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-16">
          <motion.div
            style={{ y, opacity }}
            className="relative flex justify-center mb-16"
          >
            <CardContainer containerClassName="py-0">
              <CardBody className="relative w-[340px] md:w-[400px]">
                {/* Decorative corners — float behind */}
                <CardItem
                  translateZ={-20}
                  className="absolute -top-6 -left-6 w-24 h-24 border-2 border-rose-500 rounded-tl-2xl pointer-events-none"
                />
                <CardItem
                  translateZ={-20}
                  className="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-emerald-500 rounded-br-2xl pointer-events-none"
                />

                {/* Main image — direct child of CardBody, full width, fixed height */}
                <div
                  className="relative rounded-2xl overflow-hidden p-[3px] bg-gradient-to-br from-rose-500 via-purple-500 to-emerald-500"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <div className="relative rounded-xl overflow-hidden w-full h-[440px] md:h-[520px]">
                    <Image
                      src="/profilepic.jpeg"
                      alt="Shreyas Gurav"
                      fill
                      className="object-cover object-[center_15%]"
                      priority
                    />
                  </div>
                </div>

                {/* Stats badge — floats highest */}
                <CardItem
                  translateZ={80}
                  className="absolute -bottom-10 -right-10 bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-4 z-20"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-500">
                        1+
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
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              I am a Software Engineer at Schbang working on{" "}
              <span className="font-semibold text-rose-500 dark:text-rose-400">
                backend platforms and cloud infrastructure
              </span>{" "}
              powering internal automation and AI-driven systems.
            </p>

            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              My engineering focus lies in building services that remain stable
              under real usage — systems that are observable, maintainable, and
              scalable over time. I work across FastAPI, Node.js, and AWS to
              design automation pipelines, operate distributed services, and
              improve reliability through structured debugging and monitoring.
            </p>

            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Rather than treating development and operations separately, I
              approach systems end-to-end: architecture decisions, deployment,
              incident analysis, and long-term stability improvements. I hold
              the{" "}
              <span className="font-semibold">
                AWS Certified Developer – Associate
              </span>{" "}
              certification and specialize in event-driven architectures and
              microservice-based backend systems.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-semibold text-lg mb-2">Education</h3>
                <p className="text-zinc-700 dark:text-zinc-300 font-medium">
                  Bachelor of Engineering — Computer Engineering
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                  Vasantdada Patil College of Engineering & Visual Arts, Mumbai
                  University
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                  2021 — 2025 | CGPA: 7.75
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-semibold text-lg mb-2">Location</h3>
                <p className="text-zinc-700 dark:text-zinc-300 font-medium">
                  Mumbai, India
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                  Open to product engineering and cloud-focused roles.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <a href="/Shreyas_Gurav_Software_Engineer.pdf" download>
                <Button className="rounded-full gap-2 bg-gradient-to-r from-rose-500 via-purple-500 to-emerald-500 hover:shadow-lg hover:shadow-rose-500/20 transition-shadow duration-300">
                  <Download className="h-4 w-4" />
                  Download Resume
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
