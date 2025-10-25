"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import image1 from "@/public/images/pdf-summarize1.png";
import image2 from "@/public/images/pdf-summarize2.png";
import image3 from "@/public/images/pdf-summarize3.png";
import image4 from '@/public/images/pdf-summarize4.png';

export interface PdfSummarizeHighlightProps {
  heading: string;
  subHeading: string;
  image?: string;
  reverse?: boolean; 
}

export default function PdfSummarizeHighlight({
  heading,
  subHeading,
  image = "image1",
  reverse = false,
}: PdfSummarizeHighlightProps) {
  const selectedImage =
    image === "image2" ? image2 : image === "image3" ? image3 : image === "image4" ? image4 : image1;

  return (
    <section
      className={`w-full   bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950`}
    >
     <div  className={`w-[90vw]  flex  flex-col mx-auto md:flex-row items-center justify-between gap-12 md:gap-20 px-6 md:px-16 py-20 ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950`}>
         {/* Left: Text Section */}
      <motion.div
        className="flex-1 max-w-xl"
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-snug mb-6">
          {heading}
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {subHeading}
        </p>
      </motion.div>

      {/* Right: Image Section */}
      <motion.div
        className="flex-1 flex justify-center items-center relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {/* Decorative circle background */}
        <div className="absolute -z-10 w-64 h-64 md:w-80 md:h-80 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-2xl"></div>

        {/* Main Image */}
        <div className="relative w-[320px] md:w-[450px] drop-shadow-xl">
          <Image
            src={selectedImage}
            alt="PDF summarization demo"
            className="rounded-xl object-contain"
            priority
          />
        </div>
      </motion.div>
     </div>
    </section>
  );
}
