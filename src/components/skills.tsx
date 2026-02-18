"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "@/components/section-heading";

const skills = [
  {
    category: "Cloud & Infrastructure",
    items: [
      "AWS EC2",
      "S3",
      "RDS",
      "SQS",
      "SNS",
      "Elastic Beanstalk",
      "Monitoring & Logging",
      "Deployment Management",
      "Reliability Engineering",
    ],
    accent: "rose",
  },
  {
    category: "Backend Engineering",
    items: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "REST APIs",
      "Microservices",
      "Performance Optimization",
      "Production Debugging",
    ],
    accent: "purple",
  },
  {
    category: "AI & Data Systems",
    items: [
      "LLM Integrations",
      "Retrieval-Augmented Generation",
      "Vector Database Pipelines",
    ],
    accent: "indigo",
  },
  {
    category: "Frontend",
    items: ["JavaScript", "React.js", "Next.js", "Tailwind CSS"],
    accent: "blue",
  },
  {
    category: "Databases",
    items: ["MySQL", "PostgreSQL", "MongoDB"],
    accent: "emerald",
  },
  {
    category: "DevOps & Delivery",
    items: ["Docker", "Git", "GitHub", "GitHub Actions CI/CD"],
    accent: "teal",
  },
  {
    category: "Engineering Practices",
    items: [
      "System Design",
      "Root Cause Analysis",
      "Observability",
      "Clean Code",
      "Documentation",
      "Operational Ownership",
    ],
    accent: "orange",
  },
];

const accentMap: Record<string, string> = {
  rose: "text-rose-500 dark:text-rose-400",
  purple: "text-purple-500 dark:text-purple-400",
  indigo: "text-indigo-500 dark:text-indigo-400",
  blue: "text-blue-500 dark:text-blue-400",
  emerald: "text-emerald-500 dark:text-emerald-400",
  teal: "text-teal-500 dark:text-teal-400",
  orange: "text-orange-500 dark:text-orange-400",
};

const pillMap: Record<string, string> = {
  rose: "bg-rose-500/8 text-rose-700 dark:text-rose-300 ring-rose-500/15",
  purple:
    "bg-purple-500/8 text-purple-700 dark:text-purple-300 ring-purple-500/15",
  indigo:
    "bg-indigo-500/8 text-indigo-700 dark:text-indigo-300 ring-indigo-500/15",
  blue: "bg-blue-500/8 text-blue-700 dark:text-blue-300 ring-blue-500/15",
  emerald:
    "bg-emerald-500/8 text-emerald-700 dark:text-emerald-300 ring-emerald-500/15",
  teal: "bg-teal-500/8 text-teal-700 dark:text-teal-300 ring-teal-500/15",
  orange:
    "bg-orange-500/8 text-orange-700 dark:text-orange-300 ring-orange-500/15",
};

export default function Skills() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0],
  );

  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-24 relative overflow-hidden bg-zinc-50 dark:bg-zinc-900"
    >
      {/* Subtle background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/4 w-1/3 h-1/3 bg-rose-500/5 rounded-full filter blur-3xl" />
        <div className="absolute right-0 bottom-1/4 w-1/3 h-1/3 bg-emerald-500/5 rounded-full filter blur-3xl" />
      </div>

      <div className="container px-4 md:px-6 mx-auto">
        <SectionHeading
          title="Technical Expertise"
          subtitle="My core competencies"
        />

        <motion.div
          style={{ opacity }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              viewport={{ once: true }}
            >
              {/* Category heading with a subtle left accent line */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`block w-0.5 h-5 rounded-full bg-current ${accentMap[skill.accent]}`}
                />
                <h3
                  className={`text-sm font-semibold uppercase tracking-widest ${accentMap[skill.accent]}`}
                >
                  {skill.category}
                </h3>
              </div>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${pillMap[skill.accent]}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
