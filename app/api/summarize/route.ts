import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import os from "os";
import { v4 as uuidv4 } from "uuid";
import PDFParser from "pdf2json";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { summarizeWithGemini } from "@/lib/gemini";


export async function POST(req: NextRequest) {
  try {

    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }
    const formData = await req.formData();
    const uploadedFile = formData.get("file") as File;

    if (!uploadedFile || !(uploadedFile instanceof File)) {
      console.log("Invalid or missing file.");
      return NextResponse.json({ error: "No valid file uploaded." }, { status: 400 });
    }

    // ✅ Generate a unique file path in OS temp dir
    const fileName = `${uuidv4()}.pdf`;
    const tempPath = path.join(os.tmpdir(), fileName);

    // ✅ Convert file to buffer and save to disk
    const buffer = Buffer.from(await uploadedFile.arrayBuffer());
    await fs.writeFile(tempPath, buffer);

    // ✅ Parse with pdf2json
    const extractedText = await parsePdfText(tempPath);

    // ✅ Clean up temp file
    await fs.unlink(tempPath);


    // 👉 Ask Gemini to summarize
    const summary = await summarizeWithGemini(extractedText);

    console.log("[GEMINI_SUMMARY]", summary);

    const saved = await prisma.summary.create({
      data: {
        title: generateTitle(summary),
        fileName,
        rawText: summary,
        userId: user.id,
      },
    });

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("[PDF_UPLOAD_ERROR]", error);
    return NextResponse.json({ error: "Failed to process PDF." }, { status: 500 });
  }
}

// 🔧 Parse PDF using pdf2json
function parsePdfText(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new (PDFParser as any)(null, 1);

    pdfParser.on("pdfParser_dataError", (errData: any) => {
      console.error("[PDF_PARSE_ERROR]", errData.parserError);
      reject(errData.parserError);
    });

    pdfParser.on("pdfParser_dataReady", () => {
      const text = (pdfParser as any).getRawTextContent();
      resolve(text);
    });

    pdfParser.loadPDF(filePath);
  });
}

function generateTitle(summary: string): string {
  const match = summary.match(/##\s*(.+)/);
  return match ? match[1].trim() : "Untitled Summary";
}


