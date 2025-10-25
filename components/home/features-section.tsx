"use client";

import { motion } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  FileText,
  History,
  Brain,
  Globe2,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Zap className="w-10 h-10 text-blue-500" />,
      title: "Lightning-Fast Summarization",
      desc: "Powered by Gemini AI, SmartScribe processes even long PDFs in just a few seconds — turning hours of reading into moments of clarity.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-green-500" />,
      title: "Privacy-First Design",
      desc: "Your files are processed securely in real time and never stored on our servers. You stay in full control of your data at every step.",
    },
    {
      icon: <FileText className="w-10 h-10 text-purple-500" />,
      title: "Multi-Page Intelligence",
      desc: "SmartScribe understands context across pages, intelligently linking ideas and retaining the essence of your entire document.",
    },
    {
      icon: <History className="w-10 h-10 text-orange-500" />,
      title: "Smart History & Reuse",
      desc: "Access your past summaries anytime in your dashboard — perfect for referencing, editing, or exporting again later.",
    },
    {
      icon: <Brain className="w-10 h-10 text-pink-500" />,
      title: "Adaptive Understanding",
      desc: "Our AI adjusts its summarization depth based on document type — concise for reports, detailed for research papers.",
    },
    {
      icon: <Globe2 className="w-10 h-10 text-cyan-500" />,
      title: "Multilingual Support",
      desc: "SmartScribe supports summaries in 20+ languages — breaking language barriers for global learners and professionals.",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-20 bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-950">
      <motion.h3
        className="text-4xl font-bold text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Why Choose <span className="text-blue-600 dark:text-blue-400">SmartScribe?</span>
      </motion.h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((item, i) => (
          <motion.div
            key={i}
            className="relative border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center w-16 h-16 mb-5 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-slate-700 dark:to-slate-600 shadow-inner">
              {item.icon}
            </div>

            <h4 className="text-lg font-semibold mb-2 text-slate-800 dark:text-white">
              {item.title}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {item.desc}
            </p>

            {/* Glow Hover Accent */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 hover:opacity-100 transition duration-500 pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.1 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
