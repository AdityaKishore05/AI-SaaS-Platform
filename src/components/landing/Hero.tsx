import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-24 pb-12 md:pt-36 md:pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-violet-600/30 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[900px] h-[700px] bg-fuchsia-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-violet-500" />
          <span className="text-sm font-medium text-muted-foreground">New: Gemini 2.0 Flash Integration</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight text-foreground">
          Create Content with <br />
          <span className="text-gradient">Professional AI</span>
        </h1>

        <p className="text-lg leading-8 text-zinc-300 max-w-2xl mx-auto mb-12">
          Create blog posts, social media content, emails, and more in seconds.
          Powered by Google's advanced Gemini 2.0 Flash model.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/dashboard">
            <button className="btn-primary px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 group">
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <Link href="#features">
            <button className="px-8 py-4 rounded-full text-lg font-medium text-foreground glass hover:bg-accent transition-all">
              View Features
            </button>
          </Link>
        </div>

        {/* Stats / Social Proof */}
        <div className="mt-20 pt-10 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Active Users", value: "10k+" },
            { label: "Generations", value: "1M+" },
            { label: "Uptime", value: "99.9%" },
            { label: "Cost", value: "Free" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground mb-1">{stat.value}</span>
              <span className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
