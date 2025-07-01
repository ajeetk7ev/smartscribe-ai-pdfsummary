"use client";
import {motion} from 'framer-motion'

export  function FeaturesSection() {
  return (
     <section className="py-24 px-6 md:px-20 bg-white dark:bg-slate-900">
        <h3 className="text-3xl font-bold text-center mb-14">Why Summarify?</h3>
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {[
            {
              icon: "⚡",
              title: "Lightning Fast",
              desc: "Summaries delivered in less than 5 seconds using GPT-4 Turbo."
            },
            {
              icon: "🔐",
              title: "Privacy First",
              desc: "Your files are never stored without your permission."
            },
            {
              icon: "📜",
              title: "Multi-Page Support",
              desc: "Handle long PDFs with intelligent chunking and memory."
            },
            {
              icon: "📁",
              title: "Saved History",
              desc: "All your summaries accessible anytime in your dashboard."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="border border-slate-300 dark:border-slate-700 p-6 rounded-xl shadow-sm bg-white dark:bg-slate-800 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <h4 className="text-xl font-semibold mb-1">{item.title}</h4>
              <p className="text-sm opacity-80">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
  );
}