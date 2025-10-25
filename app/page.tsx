import { FeaturesSection } from "@/components/home/features-section";
import { WorkFlowSection } from "@/components/home/workflow-section";
import { Footer } from "@/components/footer/footer";
import { saveUser } from "@/actions/save-user";
import SummarizePdf from "@/components/home/summarize-section";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import PdfSummarizeHighlight from "@/components/home/PdfSummarizeHighlight";
import FAQSection from "@/components/home/FAQ";

export const dynamic = "force-dynamic";

const PdfSummarizeHighlightData = [
  {
    id:1,
    heading: "Deep Dive into Long PDFs in No Time",
    image: "image1",
    reverse: false,
    subHeading:
      "With SmartScribe AI PDF Summarizer, you can quickly extract the key points and boost your study or work efficiency. This smart PDF summary tool processes your file page by page, compressing heavy documents into clear, concise summaries. In just minutes, you’ll grasp the essential ideas without having to read every line.",
  },

  {
    id:2,
    heading: "Accurate Text Extraction",
    image: "image2",
    reverse: true,
    subHeading:
      "AI PDF summarizer is powered by advanced OCR technology, allowing it to accurately recognize text, images, and structured data such as formulas and tables from scanned files and images. AI PDF summary tool lets you summarize PDF online for free, capturing every detail to deliver a complete and reliable summary.",
  },

  {
    id:3,
    heading: "Quickly Capture Key Points with Mind Maps",
    image: "image3",
    reverse: false,
    subHeading:
      "Mind maps present the essentials at a glance, making every key idea easy to spot. With AI PDF summarizer, you can summarize PDF files and condense long documents into clean, concise mind maps—helping you learn faster and save significant reading time. This tool also lets you export your PDF summary as an image or an XMind file, so you can share it with your team or use it for personal review.",
  },

  {
    id:4,
    heading: "Break Language Barriers with Knowledge",
    image: "image4",
    reverse: true,
    subHeading:
      "With our PDF summarizer, you can view the original content at a glance while quickly generating summaries in multiple languages. This makes your documents instantly clear and easy to understand, breaking down language barriers for seamless cross-language communication.",
  },
];

export default async function HomePage() {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    redirect("/sign-in");
  }

  await saveUser();
  return (
    <div className="bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-white transition-colors duration-300 ">
      {/* Hero Section */}
      <SummarizePdf />

      <div>
        {PdfSummarizeHighlightData.map((data) => (
          <PdfSummarizeHighlight
            key={data.id}
            heading={data.heading}
            subHeading={data.subHeading}
            image={data.image}
            reverse={data.reverse}
          />
        ))}
      </div>

      {/* Features */}
      <FeaturesSection />

      {/* Workflow / Steps */}
      <WorkFlowSection />

      <FAQSection/>

      {/* Footer */}
      <Footer />
    </div>
  );
}
