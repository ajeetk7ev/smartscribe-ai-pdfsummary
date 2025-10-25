"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FileUp,
  FileText,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import LanguageAndModeSupport from "./LanguageAndModeSupport";
import MindMap from "./MindMap";

export default function SummarizePdf() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("english");
  const [mode, setMode] = useState("medium");
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<"cards" | "mindmap">("cards");
  const [summaryData, setSummaryData] = useState<
    { heading: string; points: string[] }[]
  >([]);
  const [current, setCurrent] = useState(0);
  const [statusMessage, setStatusMessage] = useState("Idle");

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    setCurrent(0);
    setSummaryData([]);
    setStatusMessage("Extracting PDF text... 🧾");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("language", language);
      formData.append("mode", mode);

      // Progress messages
      setTimeout(
        () => setStatusMessage("Analyzing document content... 🤖"),
        1500
      );
      setTimeout(() => setStatusMessage("Generating summary... ✨"), 3000);

      const res = await fetch("/api/summarize", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Unknown error");
      }

      const { summary } = await res.json();
      const parsed = parseSummaryIntoCards(summary);
      setSummaryData(parsed);
      setStatusMessage("Summary generated successfully ✅");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Upload failed.");
      setStatusMessage("Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 md:px-16 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-white transition-colors">
      <div className="max-w-3xl mx-auto text-center mt-14">
        <motion.h1
          className="text-4xl font-extrabold mb-2 hidden sm:block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Upload & Summarize Your PDF
        </motion.h1>
        <p className="hidden sm:block text-lg mb-10 text-slate-600 dark:text-slate-300">
          AI-powered summarization in beautiful card format.
        </p>

        {/* 🌐 Language and Mode Selector */}
        <LanguageAndModeSupport
          language={language}
          setLanguage={setLanguage}
          mode={mode}
          setMode={setMode}
        />

        {/* 📂 File Upload */}
        <motion.label
          className="flex flex-col items-center justify-center border-2 border-dashed border-blue-400 dark:border-blue-600 p-8 rounded-xl cursor-pointer transition hover:bg-blue-50 dark:hover:bg-blue-800/20 text-center mb-6"
          whileHover={{ scale: 1.02 }}
        >
          <FileUp className="w-10 h-10 text-blue-500 mb-3" />
          <span className="font-medium text-blue-600 dark:text-blue-400 mb-1">
            Click to choose a PDF file
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Max 10MB — .pdf only
          </span>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
          {file && (
            <span className="mt-3 text-sm text-green-600 dark:text-green-400">
              Selected: {file.name}
            </span>
          )}
        </motion.label>

        {/* 🚀 Upload Button */}
        <Button
          onClick={handleUpload}
          disabled={!file || loading}
          className="px-6 py-2 text-lg"
        >
          {loading ? (
            <Loader2 className="animate-spin w-5 h-5 mr-2" />
          ) : (
            <FileText className="w-5 h-5 mr-2" />
          )}
          Summarize
        </Button>

        {/* 📊 Status */}
        {loading && (
          <div className="mt-4">
            <p className="text-blue-600 dark:text-blue-400 font-medium animate-pulse">
              {statusMessage}
            </p>
            <div className="w-48 h-1.5 bg-slate-300 dark:bg-slate-700 mt-2 rounded-full overflow-hidden mx-auto">
              <motion.div
                className="h-full bg-blue-500"
                initial={{ width: "0%" }}
                animate={{ width: loading ? "100%" : "0%" }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </div>
        )}

        {error && <p className="mt-4 text-red-500">{error}</p>}

        {/* 🧠 Summary Output */}
        {!loading && summaryData.length > 0 && (
          <motion.div
            className="mt-12 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* View Toggle */}
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant={viewMode === "cards" ? "default" : "outline"}
                onClick={() => setViewMode("cards")}
              >
                🗒️ Card View
              </Button>
              <Button
                variant={viewMode === "mindmap" ? "default" : "outline"}
                onClick={() => setViewMode("mindmap")}
              >
                🌳 Mind Map
              </Button>
            </div>

            {viewMode === "cards" ? (
              <>
                <h2 className="text-2xl font-bold mb-6">AI Summary Preview</h2>

                {/* Summary Card */}
                <motion.div
                  key={current}
                  className="relative bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-lg w-[90%] max-w-xl p-6 mb-6 transition-all"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                >
                  <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                    {summaryData[current].heading}
                  </h3>
                  <ul className="list-none space-y-3">
                    {summaryData[current].points.map((point, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <span className="mr-2">✅</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Navigation */}
                <div className="flex items-center gap-4 mb-4">
                  <Button
                    onClick={() => setCurrent((prev) => Math.max(prev - 1, 0))}
                    disabled={current === 0}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Prev
                  </Button>
                  <Button
                    onClick={() =>
                      setCurrent((prev) =>
                        Math.min(prev + 1, summaryData.length - 1)
                      )
                    }
                    disabled={current === summaryData.length - 1}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Dots */}
                <div className="flex items-center justify-center gap-2 mt-2">
                  {summaryData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrent(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === current
                          ? "bg-blue-500 scale-110"
                          : "bg-slate-400 dark:bg-slate-600 opacity-50"
                      }`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">Mind Map View</h2>
                <MindMap summaryData={summaryData} />
              </>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

// 🧩 Parse Summary Text
function parseSummaryIntoCards(
  text: string
): { heading: string; points: string[] }[] {
  const sections = text.split(/(?:^|\n)##\s+/g).filter((s) => s.trim());

  return sections.map((section) => {
    const lines = section.trim().split("\n");
    const heading = lines[0]?.trim() || "Untitled Section";
    const points = lines
      .slice(1)
      .map((line) => line.trim())
      .filter((line) => line.startsWith("-"))
      .map((line) => line.replace(/^-/, "").trim());

    return { heading, points };
  });
}
