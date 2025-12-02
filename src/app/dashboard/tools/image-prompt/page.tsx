'use client';

import { useState } from 'react';
import { api } from "@/trpc/react";
import { Loader2, Copy, Check } from "lucide-react";

export default function ImagePromptPage() {
  const [concept, setConcept] = useState('');
  const [style, setStyle] = useState('Cinematic');
  const [generatedContent, setGeneratedContent] = useState('');
  const [copied, setCopied] = useState(false);

  const generateText = api.ai.generateText.useMutation({
    onSuccess: (data) => {
      setGeneratedContent(data.output);
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  const handleGenerate = () => {
    if (!concept) return;
    
    const prompt = `Generate a detailed image generation prompt for "${concept}". Style: ${style}. Include lighting, camera angle, and mood details.`;

    generateText.mutate({
      prompt,
      type: 'IMAGE_PROMPT',
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Image Prompt Generator</h1>
        <p className="text-muted-foreground">Create detailed prompts for Midjourney, DALL-E, or Stable Diffusion.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <div className="space-y-4">
              <div>
                <label htmlFor="concept" className="block text-sm font-medium text-foreground mb-2">
                  Image Concept
                </label>
                <input
                  type="text"
                  id="concept"
                  className="w-full rounded-md bg-accent/50 border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary"
                  placeholder="e.g. A futuristic city on Mars"
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="style" className="block text-sm font-medium text-foreground mb-2">
                  Art Style
                </label>
                <select
                  id="style"
                  className="w-full rounded-md bg-accent/50 border-border text-foreground focus:border-primary focus:ring-primary"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                >
                  <option>Cinematic</option>
                  <option>Photorealistic</option>
                  <option>Anime / Manga</option>
                  <option>Oil Painting</option>
                  <option>Cyberpunk</option>
                  <option>3D Render</option>
                </select>
              </div>

              <button
                onClick={handleGenerate}
                disabled={generateText.isPending || !concept}
                className="w-full flex justify-center items-center gap-2 btn-primary py-2.5 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {generateText.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Prompt'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm min-h-[500px] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-foreground">Generated Prompt</h2>
            {generatedContent && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          
          <div className="flex-1 bg-accent/30 rounded-lg p-4 overflow-y-auto border border-border">
            {generatedContent ? (
              <div className="prose prose-invert max-w-none whitespace-pre-wrap text-foreground">
                {generatedContent}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <p>Your generated prompt will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
