import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);



export async function summarizeWithGemini(rawText: string): Promise<string> {
  const prompt = `
You are an AI assistant.

Summarize the following PDF content into **5 to 6 clearly separated sections**, each with:
- A **section heading** (start with "##")
- **4 to 6 concise bullet points** (start each point with "-")

Use clear, informative, and concise language. Avoid repeating ideas. Use bullet points that capture key concepts, facts, or takeaways.

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
