"use client";
import { motion } from 'framer-motion'

export  function WorkFlowSection () {
    return (
        <section className="py-20 px-6 md:px-20 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
        <h3 className="text-3xl font-bold text-center mb-14">How It Works</h3>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            ["1", "Upload your PDF", "Drag and drop or choose a file"],
            ["2", "We Summarize It", "AI extracts meaningful content"],
            ["3", "You Read & Save", "Download or share summary instantly"],
          ].map(([num, title, desc], i) => (
            <motion.div
              key={i}
              className="p-6 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 shadow hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * i, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2 text-blue-500">{num}</div>
              <h4 className="text-xl font-semibold mb-1">{title}</h4>
              <p className="text-sm opacity-75">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    )
}