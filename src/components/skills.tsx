"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Code, Database, Globe, Server, Layers, GitBranch, Cpu, Palette, Zap } from "lucide-react"
import SectionHeading from "@/components/section-heading"

export default function Skills() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const skills = [
    {
      category: "Frontend",
      icon: <Globe className="h-6 w-6" />,
      items: ["JavaScript", "React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
      color: "from-rose-500 to-purple-500",
    },
    {
      category: "Backend",
      icon: <Server className="h-6 w-6" />,
      items: ["Node.js", "Express.js"],
      color: "from-purple-500 to-indigo-500",
    },
    {
      category: "Database",
      icon: <Database className="h-6 w-6" />,
      items: ["MongoDB", "MySQL", "PostgreSQL", "SQLite"],
      color: "from-indigo-500 to-emerald-500",
    },
    {
      category: "Tools & Platforms",
      icon: <GitBranch className="h-6 w-6" />,
      items: ["Git", "GitHub", "Vercel", "AWS"],
      color: "from-emerald-500 to-rose-500",
    },
  ]

  return (
    <section id="skills" ref={containerRef} className="py-24 relative overflow-hidden bg-zinc-50 dark:bg-zinc-900">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/4 w-1/3 h-1/3 bg-rose-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute right-0 bottom-1/4 w-1/3 h-1/3 bg-emerald-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 mx-auto">
        <SectionHeading title="Technical Skills" subtitle="My expertise" />

        <motion.div style={{ y, opacity }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-zinc-200 dark:border-zinc-700 group"
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${skill.color} text-white`}>{skill.icon}</div>
                <h3 className="ml-4 font-semibold text-lg">{skill.category}</h3>
              </div>

              <div className="space-y-4">
                {skill.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-rose-500 to-emerald-500 mr-2"></div>
                    <span className="text-zinc-700 dark:text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-zinc-800 rounded-xl p-8 shadow-lg border border-zinc-200 dark:border-zinc-700"
          >
            <h3 className="font-semibold text-xl mb-6 flex items-center">
              <Code className="h-5 w-5 mr-2 text-rose-500" />
              Programming Skills
            </h3>

            {["Problem Solving", "Clean Code", "Debugging", "Performance Optimization"].map((skill, idx) => (
              <div key={idx} className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{skill}</span>
                  <span className="text-sm font-medium">90%</span>
                </div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "90%" }}
                    transition={{ duration: 1, delay: 0.2 * idx }}
                    viewport={{ once: true }}
                    className="h-full rounded-full bg-gradient-to-r from-rose-500 to-emerald-500 relative"
                  >
                    <span className="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-white dark:bg-zinc-900 border-2 border-rose-500"></span>
                  </motion.div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-zinc-800 rounded-xl p-8 shadow-lg border border-zinc-200 dark:border-zinc-700"
          >
            <h3 className="font-semibold text-xl mb-6 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-emerald-500" />
              Soft Skills
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {[
                { name: "Communication", icon: <Layers className="h-5 w-5" />, value: 85 },
                { name: "Teamwork", icon: <Cpu className="h-5 w-5" />, value: 90 },
                { name: "Time Management", icon: <Palette className="h-5 w-5" />, value: 80 },
                { name: "Adaptability", icon: <GitBranch className="h-5 w-5" />, value: 95 },
              ].map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                  viewport={{ once: true }}
                  className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-4 flex flex-col items-center text-center"
                >
                  <div className="relative mb-2">
                    <svg className="w-20 h-20" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-zinc-200 dark:text-zinc-700"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="url(#skillGradient)"
                        strokeWidth="8"
                        strokeDasharray="251.2"
                        strokeDashoffset="251.2"
                        strokeLinecap="round"
                        whileInView={{
                          strokeDashoffset: 251.2 - (251.2 * skill.value) / 100,
                        }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                        viewport={{ once: true }}
                      />
                      <defs>
                        <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f43f5e" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-lg font-bold">{skill.value}%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-sm font-medium">
                    {skill.icon}
                    <span>{skill.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

