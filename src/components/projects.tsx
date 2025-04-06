"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Globe, ChevronRight } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/section-heading";

export default function Projects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const projects = [
    {
      title: "EventLink",
      description:
        "A centralized platform for college event information that solves fragmented announcements across platforms.",
      image: "/ChatGPT Image Apr 6, 2025, 09_27_14 PM.png",
      technologies: ["Next.js", "React.js", "Express.js", "MySQL"],
      link: "https://event-link-web.vercel.app",
      github: "#",
      features: [
        "Centralized event information system",
        "Improved visibility and engagement for college events",
        "Streamlined experience for students and job seekers",
      ],
    },
    {
      title: "Tripto",
      description:
        "A B2B platform connecting car owners and vendors to streamline outstation travel.",
      image: "/ChatGPT Image Apr 6, 2025, 09_23_04 PM.png",
      technologies: ["React.js", "Express.js", "MySQL"],
      link: "https://tripto-web.vercel.app",
      github: "#",
      features: [
        "Real-time tracking and vendor management",
        "Secure payment processing",
        "Empowering local businesses and entrepreneurs",
      ],
    },
  ];

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-24 relative overflow-hidden bg-zinc-50 dark:bg-zinc-900"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/4 w-1/3 h-1/3 bg-rose-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute right-0 bottom-1/4 w-1/3 h-1/3 bg-emerald-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 mx-auto">
        <SectionHeading title="Featured Projects" subtitle="My recent work" />

        <motion.div style={{ y, opacity }} className="mt-16 space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-12 items-center`}
            >
              <div className="lg:w-3/5 relative group">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Decorative elements */}
                  <div
                    className={`absolute -top-4 ${
                      index % 2 === 0 ? "-right-4" : "-left-4"
                    } w-24 h-24 border-2 border-rose-500 ${
                      index % 2 === 0 ? "rounded-tr-2xl" : "rounded-tl-2xl"
                    } z-0`}
                  ></div>
                  <div
                    className={`absolute -bottom-4 ${
                      index % 2 === 0 ? "-left-4" : "-right-4"
                    } w-24 h-24 border-2 border-emerald-500 ${
                      index % 2 === 0 ? "rounded-bl-2xl" : "rounded-br-2xl"
                    } z-0`}
                  ></div>

                  {/* Main image with gradient border */}
                  <div className="relative z-10 rounded-xl overflow-hidden p-1 bg-gradient-to-br from-rose-500 via-purple-500 to-emerald-500">
                    <div className="absolute inset-0 bg-white dark:bg-zinc-950 rounded-xl m-[3px]"></div>
                    <div className="relative rounded-lg overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex gap-4">
                          <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              variant="secondary"
                              size="icon"
                              className="rounded-full"
                            >
                              <ExternalLink className="h-5 w-5" />
                            </Button>
                          </Link>
                          <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              variant="secondary"
                              size="icon"
                              className="rounded-full"
                            >
                              <Github className="h-5 w-5" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="lg:w-2/5 space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <p className="text-zinc-700 dark:text-zinc-300 mt-2">
                    {project.description}
                  </p>

                  <div className="space-y-4 mt-6">
                    <h4 className="font-semibold">Key Features:</h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-rose-500 mr-2 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white dark:bg-zinc-800 rounded-full text-sm shadow-sm border border-zinc-200 dark:border-zinc-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="rounded-full gap-2 bg-gradient-to-r from-rose-500 via-purple-500 to-emerald-500 hover:shadow-lg hover:shadow-rose-500/20 transition-shadow duration-300">
                        <Globe className="h-4 w-4" />
                        Live Demo
                      </Button>
                    </Link>
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        className="rounded-full gap-2 group"
                      >
                        <Github className="h-4 w-4 group-hover:text-rose-500 transition-colors" />
                        Source Code
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
