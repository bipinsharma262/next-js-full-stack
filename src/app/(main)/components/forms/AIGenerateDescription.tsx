'use client';

import { Button } from '@/app/components/ui/Button';
import { Label } from '@/app/components/ui/Label';
import { ProductSchema } from '@/lib/utils/schema';
import { Loader2, Sparkles } from 'lucide-react';
import { z } from 'zod';
import { useAIGeneration } from '@/lib/hooks/useAIGeneration';
import { TextArea } from '@/app/components/ui/Textarea';


interface AIGenerateDescriptionProps {
  title: string;
  description: string;
  handleChange: (field: keyof z.infer<typeof ProductSchema>, value: string) => void;
  error?: string;
}

export default function AIGenerateDescription({
  title,
  description,
  handleChange,
  error: propError,
}: AIGenerateDescriptionProps) {
  const { loading, error: generationError, generateDescription, startTransition } = useAIGeneration();

  const handleDescriptionGeneration = async () => {
    startTransition(async () => {
      const generatedDescription = await generateDescription(title);
      if (generatedDescription) {
        handleChange('description', generatedDescription);
      }
    });
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between mb-2">
        <Label htmlFor="description" className="mt-2">
          Description <span className="text-red-500">*</span>
        </Label>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="flex items-center gap-1 text-xs !bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:!text-white hover:opacity-90 transition-all"
          onClick={handleDescriptionGeneration}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={14} className="animate-pulse" />
              Generate with AI
            </>
          )}
        </Button>
      </div>
      <TextArea
        id="description"
        value={description}
        onChange={(e) => handleChange('description', e.target.value)}
        className="w-full"
        placeholder="Enter product description or generate one with AI"
        rows={4}
        error={propError || generationError}
      />
    </div>
  );
}
