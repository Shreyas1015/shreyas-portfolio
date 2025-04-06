"use client";

import { motion } from "framer-motion";

type SectionHeadingProps = {
  title: string;
  subtitle: string;
  align?: "left" | "center" | "right";
};

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div className={`text-${align} relative`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <h3 className="text-sm md:text-base font-medium text-zinc-500 dark:text-zinc-400 tracking-widest uppercase mb-2">
          {subtitle}
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {title}
        </h2>
        <div
          className={`w-20 h-1 bg-gradient-to-r from-rose-500 to-emerald-500 mt-4 ${
            align === "center" ? "mx-auto" : ""
          }`}
        ></div>
      </motion.div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[120px] font-bold text-zinc-100 dark:text-zinc-900 opacity-20 select-none pointer-events-none">
        {title.split(" ")[0]}
      </div>
    </div>
  );
}
