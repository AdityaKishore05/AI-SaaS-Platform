"use client";

import * as React from "react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-all duration-300">
            AI
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground group-hover:text-primary transition-colors">
            SaaS Platform
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Everything you need
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How it Works
          </Link>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <button className="btn-primary px-5 py-2 rounded-full text-sm font-medium">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
