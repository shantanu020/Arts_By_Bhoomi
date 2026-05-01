"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Image as ImageIcon, MessageSquare, Settings, LogOut, Loader2, BookOpen } from "lucide-react";
import api from "@/lib/api";
import NewOrderNotification from "@/components/admin/NewOrderNotification";
import { AnimatePresence } from "framer-motion";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newOrderCount, setNewOrderCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  
  // Use localStorage to persist count so we can detect new orders even across tabs
  const [lastSeenCount, setLastSeenCount] = useState<number | null>(null);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage) {
      const user = localStorage.getItem("adminUser");
      if (!user) {
        router.push("/admin/login");
      } else {
        const userData = JSON.parse(user);
        if (userData.role !== "admin") {
          router.push("/");
        } else {
          setIsAdmin(true);
          // Initialize last seen count from localStorage or current state
          const savedCount = localStorage.getItem("lastOrderCount");
          if (savedCount) setLastSeenCount(parseInt(savedCount));
        }
      }
    }
    setIsAuthenticating(false);
  }, [pathname, router, isLoginPage]);

  // Order Polling Logic
  useEffect(() => {
    if (!isAdmin || isLoginPage) return;

    const checkOrders = async () => {
      try {
        const { data } = await api.get("/orders/stats");
        const currentCount = data.totalOrders;

        if (lastSeenCount !== null && currentCount > lastSeenCount) {
          setNewOrderCount(currentCount - lastSeenCount);
          setShowNotification(true);
          // Don't update lastSeenCount immediately to let the user see the notification
        } else if (lastSeenCount === null || currentCount < lastSeenCount) {
          // Initialize or reset if count decreased (deleted orders)
          setLastSeenCount(currentCount);
          localStorage.setItem("lastOrderCount", currentCount.toString());
        }
      } catch (err) {
        console.error("Order check failed");
      }
    };

    const interval = setInterval(checkOrders, 10000); // Check every 10s for more responsiveness
    checkOrders(); // Immediate check

    return () => clearInterval(interval);
  }, [isAdmin, isLoginPage, lastSeenCount]);

  const handleCloseNotification = () => {
    setShowNotification(false);
    // Update last seen count to current total so we don't show it again
    api.get("/orders/stats").then(res => {
      const count = res.data.totalOrders;
      setLastSeenCount(count);
      localStorage.setItem("lastOrderCount", count.toString());
    });
  };

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Products", href: "/admin/products", icon: ShoppingBag },
    { name: "Journal", href: "/admin/blog", icon: BookOpen },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Requests", href: "/admin/requests", icon: MessageSquare },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("lastOrderCount");
    router.push("/admin/login");
  };

  if (isAuthenticating && !isLoginPage) {
    return (
      <div className="min-h-screen bg-[#fcfcf9] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-[#fcfcf9] relative">
      {/* Background Decorative Aura */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Sidebar */}
      <aside className="w-72 bg-white/40 backdrop-blur-2xl border-r border-secondary/60 hidden md:flex flex-col relative z-20">
        <div className="p-10">
          <h2 className="text-2xl font-serif italic tracking-tighter">Studio Panel</h2>
          <p className="text-[9px] text-text-muted uppercase tracking-[0.3em] font-bold mt-2">Arts by Bhoomi</p>
        </div>
        
        <nav className="flex-1 px-6 space-y-4 mt-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-4 px-6 py-4 rounded-sm transition-all duration-500 group ${
                  isActive 
                    ? "bg-text-main text-white shadow-xl translate-x-2" 
                    : "text-text-muted hover:text-text-main hover:bg-secondary/40"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-accent" : "group-hover:text-accent transition-colors"}`} />
                <span className="text-[11px] uppercase tracking-[0.2em] font-bold">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-8 border-t border-secondary/60">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-6 py-4 w-full text-left rounded-sm text-red-500 hover:bg-red-50 transition-all duration-500 font-bold text-[10px] uppercase tracking-[0.2em]"
          >
            <LogOut className="w-5 h-5" />
            End Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-12 overflow-y-auto relative z-10">
        {children}
      </main>

      {/* Real-time Notification */}
      <AnimatePresence>
        {showNotification && (
          <NewOrderNotification 
            orderCount={newOrderCount} 
            onClose={handleCloseNotification} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
