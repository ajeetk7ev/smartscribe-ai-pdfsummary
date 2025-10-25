"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import image1 from "@/public/images/summarizer-step-one.png";
import image2 from "@/public/images/summarizer-step-two.png";
import image3 from "@/public/images/summarizer-step-three.png";

export function WorkFlowSection() {
  const steps = [
    {
      step: "Step 1",
      title: "Input or Upload Your File",
      desc: "Simply paste your text or upload documents like PDF or Word, and AI PDF summarizer will be ready to process your content.",
     image: "/images/summarizer-step-one.png",
    },
    {
      step: "Step 2",
      title: "Generate a Summary",
      desc: "Choose a suitable template or customize your settings, and within seconds, summarize PDF AI will produce a structured summary highlighting the key points.",
      image: "/images/summarizer-step-two.png",
    },
    {
      step: "Step 3",
      title: "Download or Copy",
      desc: "With one click, download your summary as a Markdown-formatted TXT file, or copy the content directly — perfect for organizing, reviewing, or sharing quickly.",
     image: "/images/summarizer-step-three.png",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      <h3 className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-900 dark:text-white">
        How to Use AI to Summarize a PDF?
      </h3>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {steps.map((item, i) => (
          <motion.div
            key={i}
            className="p-8 rounded-3xl bg-white dark:bg-slate-800 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center border border-slate-100 dark:border-slate-700"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * i, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Step Image */}
            <div className="mb-6 relative w-40 h-32">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 200px"
              />
            </div>

            {/* Step Label */}
            <p className="text-blue-500 font-medium mb-2">{item.step}</p>

            {/* Title */}
            <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              {item.title}
            </h4>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
