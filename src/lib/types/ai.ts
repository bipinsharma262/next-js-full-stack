export interface AIGenerationService {
    generateContent(prompt: string): Promise<string>;
  }