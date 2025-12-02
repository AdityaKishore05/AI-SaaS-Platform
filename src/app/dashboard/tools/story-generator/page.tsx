'use client';

import { useState } from 'react';
import { api } from "@/trpc/react";
import { Loader2, Copy, Check } from "lucide-react";

export default function StoryGeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [genre, setGenre] = useState('Fantasy');
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
    if (!prompt) return;
    
    const fullPrompt = `Write a creative story based on this prompt: "${prompt}". Genre: ${genre}. Include dialogue and character development.`;

    generateText.mutate({
      prompt: fullPrompt,
      type: 'STORY',
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
        <h1 className="text-2xl font-bold text-foreground">Story Generator</h1>
        <p className="text-muted-foreground">Create engaging stories, plots, and character dialogues.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <div className="space-y-4">
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-foreground mb-2">
                  Story Prompt / Idea
                </label>
                <textarea
                  id="prompt"
                  rows={4}
                  className="w-full rounded-md bg-accent/50 border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary"
                  placeholder="e.g. A detective discovers a secret society in 1920s London..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="genre" className="block text-sm font-medium text-foreground mb-2">
                  Genre
                </label>
                <select
                  id="genre"
                  className="w-full rounded-md bg-accent/50 border-border text-foreground focus:border-primary focus:ring-primary"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                >
                  <option>Fantasy</option>
                  <option>Sci-Fi</option>
                  <option>Mystery</option>
                  <option>Romance</option>
                  <option>Horror</option>
                  <option>Adventure</option>
                </select>
              </div>

              <button
                onClick={handleGenerate}
                disabled={generateText.isPending || !prompt}
                className="w-full flex justify-center items-center gap-2 btn-primary py-2.5 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {generateText.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Story'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm min-h-[500px] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-foreground">Generated Story</h2>
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
                <p>Your generated story will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
