"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does the AI summarize long PDFs?",
      answer:
        "Our AI reads your PDF page by page, extracts key sentences and headings, and condenses the information into structured summaries — without losing context or important details.",
    },
    {
      question: "Can I upload scanned or image-based PDFs?",
      answer:
        "Currently, text-based PDFs are fully supported. For scanned or image-based PDFs, you can use OCR tools to extract text before summarizing.",
    },
    {
      question: "Is my uploaded document safe and private?",
      answer:
        "Yes. Your uploaded files are processed securely and are never stored permanently on our servers. Once summarization is complete, the data is deleted automatically.",
    },
    {
      question: "Can I download or copy the summary?",
      answer:
        "Absolutely! You can download the summary as a Markdown or text file, or directly copy it with a single click.",
    },
    {
      question: "Does it support other languages?",
      answer:
        "Yes! You can summarize PDFs in multiple languages like English, Spanish, French, and more — depending on your selected language mode.",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
      <motion.h2
        className="text-3xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Frequently Asked Questions
      </motion.h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left"
            >
              <span className="font-medium text-lg text-slate-800 dark:text-slate-100">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-slate-600 dark:text-slate-300 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
