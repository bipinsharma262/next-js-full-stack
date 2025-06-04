'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/app/components/ui/Button';
import { Label } from '@/app/components/ui/Label';
import { ProductSchema } from '@/lib/utils/schema';
import { Sparkles, Loader } from 'lucide-react';
import { z } from 'zod';
import { TextArea } from '@/app/components/ui/Textarea';
import { generateAIDescription } from '@/app/actions/ai';

interface Props {
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
}: Props) {
  const [localError, setLocalError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const handleDescriptionGeneration = () =>
    startTransition(async () => {
      try {
        const desc = await generateAIDescription(title);
        handleChange('description', desc);
      } catch (err) {
        setLocalError((err as Error).message);
      }
    });

  return (
    <div className="mt-2">
      <div className="flex justify-between mb-2">
        <Label htmlFor="description" className="mt-2">
          Description<span className="text-red-500">*</span>
        </Label>

        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={isPending}
          onClick={handleDescriptionGeneration}
          className="flex items-center gap-1 text-xs !bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:!text-white hover:opacity-90 disabled:opacity-60 transition-all"
        >
          {isPending ? (
            <>
              <Loader size={14} className="animate-spin" />
              Generating…
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
        error={propError ?? localError}
      />
    </div>
  );
}
