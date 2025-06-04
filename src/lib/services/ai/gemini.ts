import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-8b' });

export async function generateDescription(title: string): Promise<string> {
  const prompt =
    `Write a detailed, engaging, and professional product description for a product titled "${title}". 
      The description should be 3-4 sentences long, highlight key features and benefits, and be written in a persuasive tone. 
      Do not use placeholder text or mention that this is AI-generated content`;

  const result = await model.generateContent(prompt);
  return result.response.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? '';
}
