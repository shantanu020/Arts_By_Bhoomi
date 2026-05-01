"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Image as ImageIcon, MessageSquare, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: ShoppingBag },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Requests", href: "/admin/requests", icon: MessageSquare },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-secondary/30">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-secondary hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-medium tracking-tight">Admin Portal</h2>
          <p className="text-sm text-text-muted mt-1">Manage your art empire</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  isActive 
                    ? "bg-text-main text-white" 
                    : "text-text-muted hover:bg-secondary hover:text-text-main"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-secondary">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-md text-red-500 hover:bg-red-50 transition-colors font-medium">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
