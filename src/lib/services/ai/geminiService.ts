import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIGenerationService } from '@/lib/types/ai';

export class GeminiAIService implements AIGenerationService {
  private genAI: GoogleGenerativeAI;
  
  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateContent(prompt: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error('Failed to generate content');
    }
  }
}