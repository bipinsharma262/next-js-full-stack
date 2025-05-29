import { useState, useTransition } from 'react';
import { AIGenerationService } from '@/lib/types/ai';
import { GeminiAIService } from '@/lib/services/ai/geminiService';

export function useAIGeneration() {
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<string>('');

  const aiService: AIGenerationService = new GeminiAIService(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''
  );

  const generateDescription = async (title: string) => {
    if (!title.trim()) {
      setError('Please enter a title first to generate a description');
      return null;
    }

    setError('');

    try {
      const prompt = `Write a detailed, engaging, and professional product description for a product titled "${title}". 
      The description should be 3-4 sentences long, highlight key features and benefits, and be written in a persuasive tone. 
      Do not use placeholder text or mention that this is AI-generated content.`;

      const description = await aiService.generateContent(prompt);
      return description;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        setError(error.message);
      }
      return null;
    }
  };

  return {
    loading,
    error,
    generateDescription,
    startTransition,
  };
}
