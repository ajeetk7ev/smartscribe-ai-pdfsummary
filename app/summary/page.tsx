"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Download, ChevronRight, ChevronLeft, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";


// Summary type
type Summary = {
  id: string;
  title: string;
  rawText: string;
  fileName?: string;
  createdAt: string;
};

type Section = {
  heading: string;
  points: string[];
};

export default function SummaryPage() {
  const { isSignedIn } = useUser();
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [parsedSections, setParsedSections] = useState<Section[]>([]);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const res = await fetch("/api/summary");
        const data = await res.json();
        setSummaries(data || []);
      } catch (err) {
        console.error("Failed to fetch summaries:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isSignedIn) fetchSummaries();
  }, [isSignedIn]);

  const handleOpen = (index: number) => {
    setSelectedIndex(index);
    const summary = summaries[index];
    const sections = parseSummaryIntoCards(summary.rawText);
    setParsedSections(sections);
    setSectionIndex(0);
    setOpen(true);
  };

  const handleDownloadPdf = async () => {
    const summary = summaries[selectedIndex ?? 0];
    if (!summary) return;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;
    const lineHeight = fontSize + 4;
    const margin = 50;
    let y = height - margin;
    const maxWidth = width - margin * 2;

    const lines = summary.rawText.split("\n");
    for (const line of lines) {
      const wrapped = wrapText(line, font, fontSize, maxWidth);
      for (const wrapLine of wrapped) {
        if (y < margin) {
          y = height - margin;
          pdfDoc.addPage();
        }
        page.drawText(wrapLine, { x: margin, y, size: fontSize, font, color: rgb(0, 0, 0) });
        y -= lineHeight;
      }
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${summary.title || "summary"}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/summary/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setSummaries((prev) => prev.filter((s) => s.id !== deleteId));
      setDeleteDialog(false);
    } catch (err) {
      console.error("Delete failed", err);
    }
    setDeleteLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-white px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          className="text-4xl font-bold mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Your Summaries
        </motion.h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin w-6 h-6 text-blue-500" />
          </div>
        ) : summaries.length === 0 ? (
          <p className="text-center text-slate-600 dark:text-slate-400">No summaries found yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {summaries?.map((summary, index) => (
              <motion.div key={summary.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }}>
                <Card className="hover:shadow-lg transition-all h-full">
                  <CardContent className="p-5 space-y-3 cursor-pointer" onClick={() => handleOpen(index)}>
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 line-clamp-1">
                        {summary.title}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteId(summary.id);
                          setDeleteDialog(true);
                        }}
                        title="Delete Summary"
                        className="text-red-600 hover:text-white hover:bg-red-600 border border-red-600 rounded-full p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                      {summary.rawText.replace(/##/g, "").replace(/- /g, "• ")}
                    </p>
                    <p className="text-xs text-right text-slate-500 dark:text-slate-400">
                      {formatDistanceToNow(new Date(summary.createdAt))} ago
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{summaries[selectedIndex ?? 0]?.title}</DialogTitle>
            </DialogHeader>
            {parsedSections[sectionIndex] && (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-4 shadow-sm mt-4"
              >
                <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  {parsedSections[sectionIndex].heading}
                </h4>
                <ul className="space-y-2 text-sm list-disc list-inside text-slate-700 dark:text-slate-200">
                  {parsedSections[sectionIndex].points.map((point, i) => <li key={i}>{point}</li>)}
                </ul>
              </motion.div>
            )}

            <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
              <Button
                onClick={() => setSectionIndex((prev) => Math.max(prev - 1, 0))}
                disabled={sectionIndex === 0}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </Button>

              <div className="flex gap-2">
                {parsedSections.map((_, i) => (
                  <button
                    key={i}
                    className={`w-3 h-3 rounded-full ${i === sectionIndex ? "bg-blue-600" : "bg-gray-400"}`}
                    onClick={() => setSectionIndex(i)}
                  />
                ))}
              </div>

              <Button
                onClick={() => setSectionIndex((prev) => Math.min(prev + 1, parsedSections.length - 1))}
                disabled={sectionIndex === parsedSections.length - 1}
                className="flex items-center gap-2"
              >
                Next <ChevronRight className="w-4 h-4" />
              </Button>

              <Button onClick={handleDownloadPdf} variant="secondary" className="flex items-center gap-2">
                <Download className="w-4 h-4" /> Download PDF
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to delete this summary?</DialogTitle>
            </DialogHeader>
            <div className="flex justify-end gap-4 mt-6">
              <Button variant="ghost" onClick={() => setDeleteDialog(false)}>
                Cancel
              </Button>
              <Button
                disabled={deleteLoading}
                variant="destructive"
                onClick={handleDelete}
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium"
              >
                {deleteLoading ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </>
                )}
              </Button>

            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function parseSummaryIntoCards(text: string): Section[] {
  const sections = text.split(/(?:^|\n)##\s+/g).filter(Boolean);
  return sections.map((section) => {
    const lines = section.trim().split("\n");
    const heading = lines[0]?.trim() || "Untitled Section";
    const points = lines.slice(1).map((line) => line.trim()).filter((line) => line.startsWith("-")).map((line) => line.replace(/^-/, "").trim());
    return { heading, points };
  });
}

function wrapText(text: string, font: any, fontSize: number, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";
  for (const word of words) {
    const width = font.widthOfTextAtSize(currentLine + " " + word, fontSize);
    if (width > maxWidth) {
      lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine += " " + word;
    }
  }
  if (currentLine) lines.push(currentLine.trim());
  return lines;
}
