"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Award,
  CheckCircle,
  Medal,
  Trophy,
  BadgeCheck,
  Star,
} from "lucide-react";
import SectionHeading from "@/components/section-heading";

export default function Achievements() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const achievements = [
    {
      title: "1st Runner-Up in Quasar 2.0 Inter-College Hackathon",
      icon: <Trophy className="h-6 w-6" />,
      color:
        "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
    },
    {
      title: "2nd Runner-Up in Next-Tech Inter-College Hackathon",
      icon: <Medal className="h-6 w-6" />,
      color:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
    },
    {
      title: "Qualified For The 2nd Round Of Flipkart Grid 6.0",
      icon: <Award className="h-6 w-6" />,
      color: "bg-rose-100 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400",
    },
  ];

  const certifications = [
    {
      title: "Full-Stack Developer Intern - Getfly Technologies",
      icon: <BadgeCheck className="h-6 w-6" />,
    },
    // {
    //   title: "Complete Web Development Bootcamp - Udemy",
    //   icon: <BadgeCheck className="h-6 w-6" />,
    // },
    {
      title: "Full-Stack Web Development - Devtown",
      icon: <BadgeCheck className="h-6 w-6" />,
    },
    {
      title: "Web Development Intern - Sparks Foundation",
      icon: <BadgeCheck className="h-6 w-6" />,
    },
    {
      title: "AWS Certified Solutions Architect Associate - Devtown(AWS)",
      icon: <BadgeCheck className="h-6 w-6" />,
    },
  ];

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="py-24 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 w-1/3 h-1/3 bg-rose-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute left-0 bottom-1/4 w-1/3 h-1/3 bg-emerald-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 mx-auto">
        <SectionHeading
          title="Achievements & Certifications"
          subtitle="Recognition & learning"
        />

        <motion.div
          style={{ y, opacity }}
          className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-8 flex items-center"
            >
              <Trophy className="h-6 w-6 mr-2 text-rose-500" />
              Achievements
            </motion.h3>

            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-start border border-zinc-200 dark:border-zinc-700"
                >
                  <div className={`p-3 rounded-full ${achievement.color} mr-4`}>
                    {achievement.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{achievement.title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-8 bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-700"
            >
              <h4 className="font-semibold mb-4 flex items-center">
                <Star className="h-5 w-5 mr-2 text-rose-500" />
                Participations
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-zinc-700 dark:text-zinc-300 text-sm">
                    Qualified For The 2nd Round Of Flipkart Grid 6.0, A
                    Nationwide Competition
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-zinc-700 dark:text-zinc-300 text-sm">
                    SMART INDIA HACKATHON - 2023
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-zinc-700 dark:text-zinc-300 text-sm">
                    Technical Events - VPPCOE - 2022-2023
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>

          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-8 flex items-center"
            >
              <BadgeCheck className="h-6 w-6 mr-2 text-emerald-500" />
              Certifications
            </motion.h3>

            <div className="grid grid-cols-1 gap-4">
              {certifications.map((certification, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center border border-zinc-200 dark:border-zinc-700 group"
                >
                  <div className="p-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white mr-3 group-hover:scale-110 transition-transform duration-300">
                    {certification.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{certification.title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-8 bg-gradient-to-r from-rose-500 via-purple-500 to-emerald-500 p-0.5 rounded-xl"
            >
              <div className="bg-white dark:bg-zinc-800 rounded-[calc(0.75rem-1px)] p-6">
                <h4 className="font-semibold text-lg mb-4">
                  Skills Validation
                </h4>
                <p className="text-zinc-700 dark:text-zinc-300">
                  These certifications validate my expertise in full-stack
                  development, cloud architecture, and modern web technologies,
                  demonstrating my commitment to continuous learning and
                  professional growth.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
