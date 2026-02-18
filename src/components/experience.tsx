"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  BarChart,
  Database,
  Code,
  Users,
} from "lucide-react";
import SectionHeading from "@/components/section-heading";
import { TracingBeam } from "@/components/ui/tracing-beam";

const experiences = [
  {
    title: "Software Engineer",
    company: "Schbang",
    period: "Jun 2025 – Present",
    achievements: [
      "Operate and optimize a distributed AWS environment (SQS, SNS, EC2, Elastic Beanstalk, S3, RDS) maintaining 99.9% uptime through monitoring and root-cause analysis.",
      "Designed automation pipelines using FastAPI and Node.js to process meeting intelligence and ingest structured data into vector databases.",
      "Reduced operational dependency on external tooling by building internal automation systems.",
      "Diagnosed performance regressions using centralized logging and implemented targeted stability improvements.",
      "Contributed to incident reviews and preventative engineering practices with production ownership mindset.",
      "Created operational runbooks improving system recovery and team efficiency.",
    ],
    icons: [Code, Database, BarChart, Users, Code, Database],
    color: "from-rose-500 to-purple-500",
    dotColor: "bg-rose-500",
  },
  {
    title: "Full Stack Developer Intern",
    company: "Data Insights",
    period: "Aug 2024 – Oct 2024",
    achievements: [
      "Migrated frontend architecture from React.js to Next.js improving performance and maintainability.",
      "Optimized backend APIs and SQL queries reducing response latency by ~30%.",
      "Investigated production data issues using PostgreSQL and SQLite.",
      "Produced technical documentation supporting onboarding and debugging workflows.",
    ],
    icons: [Code, Database, BarChart, Users],
    color: "from-purple-500 to-indigo-500",
    dotColor: "bg-purple-500",
  },
  {
    title: "Full Stack Developer Intern",
    company: "Getfly Technologies",
    period: "Jul 2023 – Jan 2024",
    achievements: [
      "Built ERP backend workflows reducing manual operations by 60%.",
      "Implemented secure APIs and debugging workflows using logs and request tracing.",
      "Supported transition to software-driven admission processing.",
      "Improved application reliability through backend and database optimizations.",
    ],
    icons: [Code, Database, BarChart, Users],
    color: "from-indigo-500 to-emerald-500",
    dotColor: "bg-emerald-500",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 w-1/3 h-1/3 bg-rose-500/5 rounded-full filter blur-3xl" />
        <div className="absolute left-0 bottom-1/4 w-1/3 h-1/3 bg-emerald-500/5 rounded-full filter blur-3xl" />
      </div>

      <div className="container px-4 md:px-6 mx-auto">
        <SectionHeading
          title="Work Experience"
          subtitle="My professional journey"
        />

        <div className="mt-16">
          <TracingBeam className="px-6">
            <div className="space-y-16">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Dot marker for tracing beam */}
                  <div
                    className={`absolute -left-[52px] md:-left-[76px] top-1 w-3 h-3 rounded-full ${exp.dotColor} ring-4 ring-white dark:ring-zinc-950 z-10`}
                  />

                  <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow duration-300">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className={`p-1.5 rounded-lg bg-gradient-to-r ${exp.color}`}
                          >
                            <Briefcase className="h-3.5 w-3.5 text-white" />
                          </div>
                          <h3 className="text-xl font-bold">{exp.title}</h3>
                        </div>
                        <p
                          className={`font-semibold text-transparent bg-clip-text bg-gradient-to-r ${exp.color}`}
                        >
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 shrink-0">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {/* Achievements */}
                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, idx) => {
                        const Icon = exp.icons[idx % exp.icons.length];
                        return (
                          <li key={idx} className="flex items-start gap-3">
                            <Icon className="h-4 w-4 text-zinc-400 dark:text-zinc-500 shrink-0 mt-0.5" />
                            <span className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
                              {achievement}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </TracingBeam>
        </div>
      </div>
    </section>
  );
}
