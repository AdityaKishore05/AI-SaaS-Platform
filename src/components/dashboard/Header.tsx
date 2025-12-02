import { auth, signOut } from "@/server/auth";
import { Bell, User } from 'lucide-react';
import Image from 'next/image';

export async function Header() {
  // const session = await auth(); // Removed for No-Auth mode
  // const user = session?.user;

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center">
        {/* Mobile menu button could go here */}
        <h1 className="text-lg font-semibold text-foreground md:hidden">AI SaaS</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
          <Bell className="h-5 w-5" />
        </button>
        <div className="h-8 w-px bg-border"></div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-foreground">Guest User</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold">
            G
          </div>
        </div>
      </div>
    </header>
  );
}
