import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIGenerationService } from '@/lib/types/ai';

export class GeminiAIService implements AIGenerationService {
  private genAI: GoogleGenerativeAI;
  
  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateContent(prompt: string): Promise<string> {
  try {
    const model  = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash-8b' });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(message);
    throw new Error(message);
  }
}
}
