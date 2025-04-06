"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Github,
  CheckCircle,
} from "lucide-react";
import SectionHeading from "@/components/section-heading";

export default function Contact() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-24 relative overflow-hidden bg-zinc-50 dark:bg-zinc-900"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/4 w-1/3 h-1/3 bg-rose-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute right-0 bottom-1/4 w-1/3 h-1/3 bg-emerald-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 mx-auto">
        <SectionHeading title="Get In Touch" subtitle="Contact me" />

        <motion.div
          style={{ y, opacity }}
          className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold">
              Let&apos;s Talk About Your Project
            </h3>
            <p className="text-zinc-700 dark:text-zinc-300">
              Have a project in mind or want to discuss potential opportunities?
              Feel free to reach out! I&apos;m always open to new challenges and
              collaborations.
            </p>

            <div className="space-y-6 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-start"
              >
                <div className="p-3 rounded-xl bg-gradient-to-r from-rose-500 to-purple-500 text-white mr-4">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <a
                    href="mailto:shreyas1234gurav@gmail.com"
                    className="text-zinc-700 dark:text-zinc-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                  >
                    shreyas1234gurav@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex items-start"
              >
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white mr-4">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <a
                    href="tel:+918879794186"
                    className="text-zinc-700 dark:text-zinc-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                  >
                    +91 8879794186
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-start"
              >
                <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-rose-500 text-white mr-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-zinc-700 dark:text-zinc-300">
                    Mumbai, Maharashtra, India
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="space-y-4 mt-8">
              <h4 className="font-semibold">Connect With Me</h4>
              <div className="flex gap-4">
                <motion.a
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  href="https://linkedin.com/in/shreyasgurav1015"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-zinc-200 dark:border-zinc-700"
                >
                  <Linkedin className="h-6 w-6 text-[#0077B5]" />
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  href="https://github.com/Shreyas1015"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-zinc-200 dark:border-zinc-700"
                >
                  <Github className="h-6 w-6" />
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  href="mailto:shreyas1234gurav@gmail.com"
                  className="p-3 rounded-xl bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-zinc-200 dark:border-zinc-700"
                >
                  <Mail className="h-6 w-6 text-rose-500" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-zinc-800 rounded-xl p-8 shadow-lg border border-zinc-200 dark:border-zinc-700">
              <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="p-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white mb-4">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Message Sent!</h4>
                  <p className="text-zinc-700 dark:text-zinc-300">
                    Thank you for reaching out. I&apos;ll get back to you as
                    soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="rounded-lg border-zinc-300 dark:border-zinc-700 focus:border-rose-500 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      required
                      className="rounded-lg border-zinc-300 dark:border-zinc-700 focus:border-rose-500 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      rows={5}
                      required
                      className="rounded-lg border-zinc-300 dark:border-zinc-700 focus:border-rose-500 focus:ring-rose-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-lg gap-2 bg-gradient-to-r from-rose-500 via-purple-500 to-emerald-500 hover:shadow-lg hover:shadow-rose-500/20 transition-shadow duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
