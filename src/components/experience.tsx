"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Briefcase, Calendar, BarChart, Database, Code, Users } from "lucide-react"
import SectionHeading from "@/components/section-heading"

export default function Experience() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Data Insights",
      period: "Aug 2024 - Oct 2024",
      achievements: [
        "Migrated key application components from React.js to Next.js, improving page load performance by 40% and enhancing SEO capabilities.",
        "Refactored backend logic using Node.js and Express.js, reducing API response times by 30%.",
        "Integrated and optimized PostgreSQL and SQLite, ensuring efficient data storage and real-time insights.",
        "Collaborated with cross-functional teams to improve system scalability, achieving a 25% increase in operational efficiency.",
      ],
      icons: [<Code key="1" />, <Database key="2" />, <BarChart key="3" />, <Users key="4" />],
    },
    {
      title: "Full Stack Developer",
      company: "Getfly Technologies",
      period: "July 2023 - Jan 2024",
      achievements: [
        "Developed and deployed ERP modules, reducing manual workload by 60% and improving operational efficiency.",
        "Introduced a customized financial tracking tool, enabling real-time monitoring of student payments and fee statuses, resulting in a 45% increase in financial workflow efficiency.",
        "Transitioned to software-based admission processes, achieving a 60% reduction in processing time.",
        "Demonstrated proficiency in React.js, Express.js, and MySQL, resulting in a 30% increase in system reliability.",
      ],
      icons: [<Code key="1" />, <Database key="2" />, <BarChart key="3" />, <Users key="4" />],
    },
  ]

  return (
    <section id="experience" ref={containerRef} className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 w-1/3 h-1/3 bg-rose-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute left-0 bottom-1/4 w-1/3 h-1/3 bg-emerald-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 mx-auto">
        <SectionHeading title="Work Experience" subtitle="My professional journey" />

        <motion.div style={{ y, opacity }} className="mt-16 relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-500 via-purple-500 to-emerald-500"></div>

          <div className="relative space-y-20">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
              >
                <div className="md:w-1/2 md:px-8 mb-8 md:mb-0">
                  <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-zinc-200 dark:border-zinc-700 relative">
                    <div
                      className={`absolute top-6 ${index % 2 === 0 ? "md:-right-4 -left-3 md:left-auto" : "md:-left-4 -left-3"} w-8 h-8 rounded-full flex items-center justify-center z-10 bg-gradient-to-r from-rose-500 to-emerald-500`}
                    >
                      <Briefcase className="h-4 w-4 text-white" />
                    </div>

                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <div className="flex items-center text-rose-500 dark:text-rose-400 mb-2">
                      <span>{exp.company}</span>
                    </div>
                    <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{exp.period}</span>
                    </div>

                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex">
                          <div className="mr-2 mt-1 text-rose-500 dark:text-rose-400">
                            {exp.icons[idx % exp.icons.length]}
                          </div>
                          <span className="text-zinc-700 dark:text-zinc-300 text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="md:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

