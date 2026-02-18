"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/section-heading";
import Link from "next/link";

export default function Certifications() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="certifications"
      ref={containerRef}
      className="py-24 relative overflow-hidden bg-zinc-50 dark:bg-zinc-900"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 w-1/3 h-1/3 bg-orange-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute left-0 bottom-1/4 w-1/3 h-1/3 bg-yellow-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 mx-auto">
        <SectionHeading
          title="Certifications"
          subtitle="Professional Credentials"
        />

        <motion.div
          style={{ y, opacity }}
          className="mt-16 flex justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full max-w-4xl bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden"
          >
            <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Badge Image */}
              <div className="w-40 h-40 shrink-0 relative flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 rounded-full p-4 border border-zinc-100 dark:border-zinc-700">
                <Award className="w-20 h-20 text-orange-500" />
                {/* 
                <Image 
                   src="/aws-certified-developer-associate.png" 
                   alt="AWS Certified Developer - Associate" 
                   width={160} 
                   height={160} 
                   className="object-contain" // Or use actual image if available
                /> 
                */}
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500">
                      AWS Certified Developer – Associate
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                      Credential Holder: Shreyas Gurav
                    </p>
                  </div>
                  <Link
                    href="https://aws.amazon.com/verification"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Verify
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                  <div className="flex items-center justify-center md:justify-start">
                    <span className="font-semibold mr-2 text-zinc-700 dark:text-zinc-300">
                      Issued:
                    </span>{" "}
                    February 13, 2026
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <span className="font-semibold mr-2 text-zinc-700 dark:text-zinc-300">
                      Valid Until:
                    </span>{" "}
                    February 13, 2029
                  </div>
                  <div className="flex items-center justify-center md:justify-start sm:col-span-2">
                    <span className="font-semibold mr-2 text-zinc-700 dark:text-zinc-300">
                      Credential ID:
                    </span>{" "}
                    5e4985ab20b34a8e9c20337eeb4edd6d
                  </div>
                </div>

                <div className="border-t border-zinc-100 dark:border-zinc-700 pt-6">
                  <h4 className="font-semibold mb-3 text-zinc-800 dark:text-zinc-200">
                    Validated Areas
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {[
                      "Cloud-native application development",
                      "Event-driven system design",
                      "Secure deployments & IAM practices",
                      "Monitoring and observability",
                      "CI/CD workflows",
                      "Scalable backend architecture",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 text-orange-500">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
