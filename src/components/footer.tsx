"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
      <div className="container px-4 md:px-6 py-12 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-0"
          >
            <Link
              href="/"
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-emerald-500"
            >
              SG
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              Software Engineer | AWS Certified Developer – Associate
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-end"
          >
            <div className="flex items-center gap-4 mb-4">
              <Link
                href="https://github.com/Shreyas1015"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com/in/shreyasgurav1015"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="mailto:shreyasss15.10@gmail.com"
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>

            <p className="text-center md:text-right text-sm text-zinc-500 dark:text-zinc-400">
              © 2026 Shreyas Gurav. All rights reserved.
            </p>
          </motion.div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 mt-8 pt-8 text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center justify-center">
            Made with <Heart className="h-4 w-4 text-rose-500 mx-1" /> by
            Shreyas Gurav
          </p>
        </div>
      </div>
    </footer>
  );
}
