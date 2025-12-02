'use client';

import { api } from "@/trpc/react";
import { Zap, History, CreditCard } from "lucide-react";

export default function DashboardPage() {
  const { data: stats, isLoading } = api.user.getStats.useQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const statsData = [
    {
      name: 'Available Credits',
      value: stats?.credits.toString() ?? '0',
      icon: Zap,
      change: 'Refill anytime',
      changeType: 'neutral',
    },
    {
      name: 'Total Generations',
      value: stats?.generationsCount.toString() ?? '0',
      icon: History,
      change: 'Lifetime usage',
      changeType: 'neutral',
    },
    {
      name: 'Plan Status',
      value: 'Free Tier',
      icon: CreditCard,
      change: 'Upgrade for more',
      changeType: 'positive',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {statsData.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-xl bg-card p-6 shadow-lg ring-1 ring-border"
          >
            <div className="flex items-center gap-x-4">
              <div className="rounded-lg bg-violet-500/10 p-3">
                <item.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-medium leading-6 text-muted-foreground">{item.name}</p>
                <p className="text-2xl font-bold leading-9 text-foreground">{item.value}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-x-2 text-xs leading-5 text-muted-foreground">
              <span className="font-medium text-primary">{item.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-semibold text-foreground mb-6">Quick Start</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a href="/dashboard/tools/blog-writer" className="group relative flex items-center gap-x-6 rounded-lg bg-card p-4 hover:bg-accent ring-1 ring-border transition-all">
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20">
              <span className="text-xl">✍️</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">Blog Writer</span>
              <span className="absolute inset-0" />
            </div>
          </a>
          <a href="/dashboard/tools/social-media" className="group relative flex items-center gap-x-6 rounded-lg bg-card p-4 hover:bg-accent ring-1 ring-border transition-all">
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-pink-500/10 group-hover:bg-pink-500/20">
              <span className="text-xl">📱</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">Social Media</span>
              <span className="absolute inset-0" />
            </div>
          </a>
          <a href="/dashboard/tools/email-writer" className="group relative flex items-center gap-x-6 rounded-lg bg-card p-4 hover:bg-accent ring-1 ring-border transition-all">
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-violet-500/10 group-hover:bg-violet-500/20">
              <span className="text-xl">📧</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">Email Writer</span>
              <span className="absolute inset-0" />
            </div>
          </a>
          <a href="/dashboard/tools/product-description" className="group relative flex items-center gap-x-6 rounded-lg bg-card p-4 hover:bg-accent ring-1 ring-border transition-all">
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-fuchsia-500/10 group-hover:bg-fuchsia-500/20">
              <span className="text-xl">🛍️</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">Product Desc.</span>
              <span className="absolute inset-0" />
            </div>
          </a>
          <a href="/dashboard/tools/seo-tags" className="group relative flex items-center gap-x-6 rounded-lg bg-card p-4 hover:bg-accent ring-1 ring-border transition-all">
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-rose-500/10 group-hover:bg-rose-500/20">
              <span className="text-xl">🔍</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">SEO Tags</span>
              <span className="absolute inset-0" />
            </div>
          </a>
          <a href="/dashboard/tools" className="group relative flex items-center gap-x-6 rounded-lg bg-card p-4 hover:bg-accent ring-1 ring-border transition-all border-dashed border-2 border-muted">
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg">
              <span className="text-xl">🚀</span>
            </div>
            <div>
              <span className="font-semibold text-primary">View All Tools</span>
              <span className="absolute inset-0" />
            </div>
          </a>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-semibold text-foreground mb-6">Recent Activity</h2>
        <div className="overflow-hidden rounded-xl bg-card shadow-lg ring-1 ring-border">
          <div className="p-6">
            {stats?.recentGenerations.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No activity yet. Start creating!</p>
            ) : (
              <ul role="list" className="divide-y divide-border">
                {stats?.recentGenerations.map((item: any) => (
                  <li key={item.id} className="py-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.type}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-md">{item.prompt}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</p>
                      <p className="text-xs font-medium text-primary">-{item.cost} credits</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
