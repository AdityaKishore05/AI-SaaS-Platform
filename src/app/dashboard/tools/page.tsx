'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  PenTool, Share2, Mail, ShoppingBag, Search, 
  Video, Subtitles, Image, FileText, List, 
  BarChart, Megaphone, Languages, RefreshCw, BookOpen 
} from 'lucide-react';

const tools = [
  {
    name: 'Blog Post Writer',
    description: 'Generate SEO-optimized blog posts with perfect tone and structure.',
    href: '/dashboard/tools/blog-writer',
    icon: PenTool,
    color: 'text-primary',
    bgColor: 'bg-violet-500/10',
  },
  {
    name: 'Social Media',
    description: 'Create engaging posts for Twitter, LinkedIn, Instagram, and Facebook.',
    href: '/dashboard/tools/social-media',
    icon: Share2,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
  },
  {
    name: 'Email Writer',
    description: 'Draft professional emails, newsletters, and outreach campaigns.',
    href: '/dashboard/tools/email-writer',
    icon: Mail,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    name: 'Product Descriptions',
    description: 'Turn features into benefits with persuasive e-commerce copy.',
    href: '/dashboard/tools/product-description',
    icon: ShoppingBag,
    color: 'text-fuchsia-500',
    bgColor: 'bg-fuchsia-500/10',
  },
  {
    name: 'SEO Meta Tags',
    description: 'Boost your rankings with AI-generated titles and meta descriptions.',
    href: '/dashboard/tools/seo-tags',
    icon: Search,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
  },
  {
    name: 'Video Scriptwriter',
    description: 'Generate full video scripts for YouTube, Reels, or Shorts.',
    href: '/dashboard/tools/video-script',
    icon: Video,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
  {
    name: 'Video Caption Generator',
    description: 'Auto-generate captions or subtitles from your transcript.',
    href: '/dashboard/tools/video-caption',
    icon: Subtitles,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    name: 'Image Prompt Generator',
    description: 'Create detailed prompts for Midjourney, DALL-E, or Stable Diffusion.',
    href: '/dashboard/tools/image-prompt',
    icon: Image,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    name: 'Research & Outline',
    description: 'Auto-generate detailed outlines and research pointers.',
    href: '/dashboard/tools/research-outline',
    icon: List,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    name: 'Content Summarizer',
    description: 'Get concise summaries or TL;DRs from long text.',
    href: '/dashboard/tools/content-summarizer',
    icon: FileText,
    color: 'text-teal-500',
    bgColor: 'bg-teal-500/10',
  },
  {
    name: 'SEO Optimizer',
    description: 'Analyze and optimize your content for search engines.',
    href: '/dashboard/tools/seo-optimizer',
    icon: BarChart,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    name: 'Ad Copy Generator',
    description: 'Create high-converting ads for social media and search.',
    href: '/dashboard/tools/ad-copy',
    icon: Megaphone,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    name: 'Translation Tool',
    description: 'Translate content while preserving tone and context.',
    href: '/dashboard/tools/translation',
    icon: Languages,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
  },
  {
    name: 'Content Repurposer',
    description: 'Transform existing content into new formats.',
    href: '/dashboard/tools/content-repurposer',
    icon: RefreshCw,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
  },
  {
    name: 'Story Generator',
    description: 'Create engaging stories, plots, and character dialogues.',
    href: '/dashboard/tools/story-generator',
    icon: BookOpen,
    color: 'text-pink-600',
    bgColor: 'bg-pink-600/10',
  },
];

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-4">AI Tools</h1>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tools..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool) => (
          <Link
            key={tool.name}
            href={tool.href}
            className="group relative overflow-hidden rounded-xl bg-card p-6 shadow-lg ring-1 ring-border transition-all hover:bg-accent hover:ring-primary/50"
          >
            <div className={`absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y-[-8px] rounded-full ${tool.bgColor} opacity-20 blur-2xl transition-all group-hover:opacity-40`} />
            
            <div className="relative">
              <div className={`mb-4 inline-flex rounded-lg ${tool.bgColor} p-3`}>
                <tool.icon className={`h-6 w-6 ${tool.color}`} aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {tool.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
