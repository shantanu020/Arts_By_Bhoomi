"use client";

import { useState, useEffect } from "react";
import { User, Lock, Mail, Save, Loader2, Sparkles } from "lucide-react";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AdminSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    // Load current user data
    const userStr = localStorage.getItem("adminUser");
    if (userStr) {
      const user = JSON.parse(userStr);
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || ""
      }));
    }
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (formData.password && formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.put("/auth/profile", {
        name: formData.name,
        email: formData.email,
        password: formData.password || undefined
      });

      // Update local storage
      const token = localStorage.getItem("adminToken");
      const newUser = { ...data, token };
      localStorage.setItem("adminUser", JSON.stringify(newUser));

      setSuccessMsg("Profile updated successfully!");
      setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }));
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[800px] mx-auto space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
           <span className="h-[1px] w-12 bg-accent" />
           <span className="text-accent text-[11px] uppercase tracking-[0.5em] font-bold">Preferences</span>
        </div>
        <h1 className="text-5xl font-serif italic tracking-tighter">Security & Settings</h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/40 backdrop-blur-xl p-10 md:p-14 border border-secondary/60 rounded-sm shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden"
      >
        <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        
        <form onSubmit={handleUpdate} className="space-y-8 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-text-muted ml-1">Administrator Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent transition-colors" />
                <input 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/50 border border-secondary/60 py-4 pl-12 pr-4 outline-none focus:border-accent font-serif italic text-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-text-muted ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent transition-colors" />
                <input 
                  required
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/50 border border-secondary/60 py-4 pl-12 pr-4 outline-none focus:border-accent font-serif italic text-lg"
                />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-secondary/40">
            <h3 className="font-serif italic text-xl mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5 text-accent" /> Update Credentials
            </h3>
            <p className="text-xs text-text-muted mb-6">Leave blank if you do not wish to change your password.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-text-muted ml-1">New Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent transition-colors" />
                  <input 
                    type="password"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    placeholder="••••••••"
                    className="w-full bg-white/50 border border-secondary/60 py-4 pl-12 pr-4 outline-none focus:border-accent font-serif italic text-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-text-muted ml-1">Confirm New Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent transition-colors" />
                  <input 
                    type="password"
                    value={formData.confirmPassword}
                    onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="••••••••"
                    className="w-full bg-white/50 border border-secondary/60 py-4 pl-12 pr-4 outline-none focus:border-accent font-serif italic text-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {errorMsg && (
            <p className="text-red-500 text-xs italic tracking-wide">{errorMsg}</p>
          )}
          
          {successMsg && (
            <p className="text-green-600 text-xs italic tracking-wide font-bold flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> {successMsg}
            </p>
          )}

          <div className="pt-6">
            <button 
              disabled={loading}
              type="submit" 
              className="bg-text-main text-white px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-accent transition-colors flex items-center gap-3 rounded-sm ml-auto disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Preferences
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
