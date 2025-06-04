'use server';

import { generateDescription } from "@/lib/services/ai/gemini";

export async function generateAIDescription(inputText: string) {
  return generateDescription(inputText);
}
