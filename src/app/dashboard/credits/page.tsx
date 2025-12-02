'use client';

import { api } from "@/trpc/react";
import { Zap, CreditCard } from "lucide-react";

export default function CreditsPage() {
  const { data: stats, isLoading } = api.user.getStats.useQuery();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-4">Credits & Billing</h1>
        <p className="text-muted-foreground">Manage your subscription and view usage history.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Balance Card */}
        <div className="rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-8 shadow-lg text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <Zap className="h-8 w-8" />
            </div>
            <div>
              <p className="text-violet-100 font-medium">Available Credits</p>
              <h2 className="text-4xl font-bold">Unlimited</h2>
            </div>
          </div>
          <p className="text-sm text-violet-100 mb-6">
            You are on the Beta Free Tier.
          </p>
          <button disabled className="w-full bg-white/20 text-white font-bold py-3 px-4 rounded-lg cursor-not-allowed">
            Free Plan Active
          </button>
        </div>

        {/* Plan Card */}
        <div className="rounded-xl bg-card p-8 shadow-lg ring-1 ring-border lg:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-accent rounded-lg">
              <CreditCard className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Current Plan</h3>
              <p className="text-muted-foreground">Beta Access</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-muted-foreground">Plan Status</span>
              <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm font-medium">Active</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-muted-foreground">Renewal Date</span>
              <span className="text-foreground">Lifetime Free</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History Placeholder */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold text-foreground mb-6">Transaction History</h2>
        <div className="rounded-xl bg-card shadow-lg ring-1 ring-border overflow-hidden">
          <div className="p-8 text-center text-muted-foreground">
            <p>No transactions found.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
