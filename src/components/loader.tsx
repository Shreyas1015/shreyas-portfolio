"use client"

import { motion } from "framer-motion"

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-zinc-950 z-50">
      <div className="relative w-40 h-40">
        <svg className="absolute inset-0" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF3366" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-emerald-500">
            SG
          </h1>
        </motion.div>
      </div>
    </div>
  )
}

