"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Ghost } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-white px-6 text-center">
      {/* Floating Ghost Animation */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: [0, -20, 0], opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center justify-center mb-6"
      >
        <Ghost className="w-20 h-20 text-blue-500 dark:text-blue-400" />
      </motion.div>

      {/* 404 Heading */}
      <motion.h1
        className="text-6xl md:text-8xl font-extrabold text-blue-600 dark:text-blue-400 mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        404
      </motion.h1>

      {/* Message */}
      <motion.p
        className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-lg mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </motion.p>

      {/* Home Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link href="/">
          <Button className="px-6 py-2 text-lg flex items-center gap-2">
            <Home className="w-5 h-5" />
            Back to Home
          </Button>
        </Link>
      </motion.div>

      {/* Decorative background shapes */}
      <motion.div
        className="absolute top-10 left-10 w-24 h-24 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-2xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-16 right-10 w-32 h-32 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
