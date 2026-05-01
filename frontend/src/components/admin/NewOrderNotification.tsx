"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface NewOrderNotificationProps {
  orderCount: number;
  onClose: () => void;
}

export default function NewOrderNotification({ orderCount, onClose }: NewOrderNotificationProps) {
  useEffect(() => {
    // Trigger the SAME confetti as the checkout success page
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#D4AF37', '#1A1A1A', '#F5F5F0']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#D4AF37', '#1A1A1A', '#F5F5F0']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed bottom-12 right-12 z-[200] w-96 bg-text-main text-white p-8 rounded-sm shadow-[0_50px_100px_rgba(0,0,0,0.4)] border border-accent/20 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <Sparkles className="w-4 h-4 text-accent" />
             <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent">New Acquisition</span>
          </div>
          <h3 className="text-3xl font-serif italic tracking-tight">You've received {orderCount} new {orderCount === 1 ? 'order' : 'orders'}!</h3>
          <p className="text-white/60 text-xs font-light leading-relaxed italic">
            A collector has just secured a masterpiece. Review the manifest to begin the dispatch protocol.
          </p>
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-8 py-4 bg-white text-black text-[10px] uppercase tracking-[0.3em] font-bold rounded-sm hover:bg-accent hover:text-white transition-all duration-500 shadow-xl"
        >
          View Registry
        </button>
      </div>
    </motion.div>
  );
}
