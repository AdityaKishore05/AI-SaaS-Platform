'use client';

import { useState } from 'react';
import { api } from "@/trpc/react";
import { Loader2, Copy, Check } from "lucide-react";

export default function ProductDescriptionPage() {
  const [productName, setProductName] = useState('');
  const [features, setFeatures] = useState('');
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
    if (!productName) return;
    
    const prompt = `Write a persuasive product description for "${productName}". Features: ${features}.`;

    generateText.mutate({
      prompt,
      type: 'PRODUCT',
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
        <h1 className="text-2xl font-bold text-foreground">Product Description</h1>
        <p className="text-muted-foreground">Generate compelling copy for your e-commerce products.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <div className="space-y-4">
              <div>
                <label htmlFor="productName" className="block text-sm font-medium text-foreground mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  className="w-full rounded-md bg-accent/50 border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary"
                  placeholder="e.g. Ergonomic Office Chair"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="features" className="block text-sm font-medium text-foreground mb-2">
                  Key Features
                </label>
                <textarea
                  id="features"
                  rows={4}
                  className="w-full rounded-md bg-accent/50 border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary"
                  placeholder="List the main features..."
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={generateText.isPending || !productName}
                className="w-full flex justify-center items-center gap-2 btn-primary py-2.5 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {generateText.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Description'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm min-h-[500px] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-foreground">Generated Content</h2>
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
                <p>Your generated content will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
