// import { GoogleGenerativeAI } from "@google/generative-ai";
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// console.log("GEMINI API KEY IS ",process.env.GEMINI_API_KEY)

// export async function summarizeWithGemini(rawText: string, language:string, mode:string): Promise<string> {
//   const prompt = `
// You are an AI assistant.

// Summarize the following PDF content into **5 to 6 clearly separated sections**, each with:
// - A **section heading** (start with "##")
// - **4 to 6 concise bullet points** (start each point with "-")

// Use clear, informative, and concise language. Avoid repeating ideas. Use bullet points that capture key concepts, facts, or takeaways.

// Follow this exact format:

// ## Section Title 1
// - Bullet point 1
// - Bullet point 2
// ...

// ## Section Title 2
// - Bullet point 1
// - Bullet point 2
// ...

// Here is the content to summarize:

// ${rawText.slice(0, 12000)}
// `;

//   // Get the model instance
//   const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//   // Generate content
//   const result = await model.generateContent(prompt);
//   const response = await result.response;

//   // Extract plain text output
//   const text = response.text();
//   return text;
// }

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

console.log("GEMINI API KEY IS ", process.env.GEMINI_API_KEY);

export async function summarizeWithGemini(
  rawText: string,
  language: string,
  mode: string
): Promise<string> {
  // Dynamically adjust summary depth based on mode
  const modeInstructions =
    mode === "short"
      ? "Provide a **very concise summary** with only the most essential points (around 2–3 bullet points per section)."
      : mode === "medium"
      ? "Provide a **balanced summary** with moderate detail (around 4–6 bullet points per section)."
      : "Provide a **comprehensive summary** that covers all important details (around 6–8 bullet points per section).";

  const prompt = `
You are an AI summarization assistant.

Your task is to summarize the given PDF text based on the user's preferences.

🗣 **Language:** ${language}
📏 **Summary Mode:** ${mode}

Please summarize the following PDF content into **5 to 6 clearly separated sections**, each with:
- A **section heading** (start with "##")
- Bullet points as per the summary mode instructions below.

${modeInstructions}

Make sure:
- The summary is written entirely in **${language}**.
- Each section is meaningful, clear, and informative.
- Avoid repeating points or filler text.
- Maintain consistent formatting for headings and bullet points.

Follow this exact format:
## Section Title 1
- Bullet point 1
- Bullet point 2
...

## Section Title 2
- Bullet point 1
- Bullet point 2
...

Here is the content to summarize:
${rawText.slice(0, 12000)}
`;

  // Get the model instance
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // Generate content
  const result = await model.generateContent(prompt);
  const response = await result.response;

  // Extract plain text output
  const text = response.text();
  return text;
}
