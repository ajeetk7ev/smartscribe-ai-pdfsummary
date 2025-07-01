"use client";
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <motion.section
      className="h-[100vh] flex flex-col justify-center items-center text-center px-6 md:px-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-6">
        <span className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm px-4 py-1 rounded-full border border-white/20 shadow-md tracking-wide">
          🚀 AI Powered
        </span>
      </div>

      <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 leading-tight">
        Summarize PDFs in Seconds with AI
      </h2>

      <p className="text-lg max-w-2xl mx-auto mb-8 text-slate-600 dark:text-slate-300">
        Use our intelligent PDF summarizer to turn long documents into easy-to-read insights instantly.
      </p>

      <Link href="/upload" className="inline-flex items-center gap-2">
        <Button className="px-8 py-3 text-lg rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
          Summarize
        </Button>
      </Link>
    </motion.section>
  )
}