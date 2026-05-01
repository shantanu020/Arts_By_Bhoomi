"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, Loader2, Sparkles } from "lucide-react";
import api from "@/lib/api";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      router.push("/admin");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await api.post("/auth/login", { email, password });
      
      if (data.role === "admin") {
        localStorage.setItem("adminToken", data.token || "logged_in"); // Fallback if token is in cookie
        localStorage.setItem("adminUser", JSON.stringify(data));
        router.push("/admin");
      } else {
        setError("Unauthorized access. Admin privileges required.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcf9] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Aura */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/40 backdrop-blur-2xl p-10 md:p-14 rounded-sm border border-white/60 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)]">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
              <Lock className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-3xl font-serif italic mb-3">Studio Access</h1>
            <p className="text-text-muted text-xs uppercase tracking-[0.3em] font-bold">Administrative Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold block ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/50 border border-secondary/60 py-4 pl-12 pr-4 outline-none focus:border-accent transition-all font-serif italic text-lg"
                  placeholder="admin@artsbybhoomi.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold block ml-1">Secret Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent transition-colors" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white/50 border border-secondary/60 py-4 pl-12 pr-4 outline-none focus:border-accent transition-all font-serif italic text-lg"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-500 text-xs italic tracking-wide"
              >
                {error}
              </motion.p>
            )}

            <button 
              disabled={loading}
              type="submit" 
              className="group relative w-full overflow-hidden bg-text-main py-6 font-bold text-white transition-all disabled:opacity-70 rounded-sm"
            >
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.4em]">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Authenticate"}
                {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />}
              </span>
            </button>
          </form>
        </div>

        <div className="mt-12 text-center">
           <p className="text-[10px] uppercase tracking-[0.4em] text-text-muted flex items-center justify-center gap-3">
             <Sparkles className="w-3 h-3 text-accent" />
             Authenticated Session Required
           </p>
        </div>
      </motion.div>
    </div>
  );
}
