'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, PenTool, CreditCard } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'AI Tools', href: '/dashboard/tools', icon: PenTool },
  { name: 'Credits', href: '/dashboard/credits', icon: CreditCard },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r border-border">
      <div className="flex h-16 items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/20">
            AI
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground">
            SaaS Platform
          </span>
        </Link>
      </div>
      
      <div className="flex flex-1 flex-col gap-y-7 overflow-y-auto px-6 py-8">
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`
                          group flex gap-x-3 rounded-lg p-2 text-sm leading-6 font-medium transition-all duration-200
                          ${isActive 
                            ? 'bg-violet-500/10 text-primary shadow-sm shadow-violet-500/5 ring-1 ring-violet-500/20' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                          }
                        `}
                      >
                        <item.icon
                          className={`h-5 w-5 shrink-0 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            
            <li className="mt-auto">
              <div className="rounded-xl bg-accent/50 border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold">
                    GU
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">Guest User</span>
                    <span className="text-xs text-muted-foreground">Free Tier</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
