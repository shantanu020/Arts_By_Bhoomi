"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Reveal from "@/components/ui/Reveal";
import { motion } from "framer-motion";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const [orderRef, setOrderRef] = useState("");

  useEffect(() => {
    setOrderRef(`AB-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
    const timer = setTimeout(() => {
      clearCart();
    }, 150);
    return () => clearTimeout(timer);
  }, [clearCart]);

  if (!orderRef) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-primary">
         <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
         <p className="mt-8 text-[10px] uppercase tracking-[0.6em] text-text-muted">Recording Acquisition...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Abstract Luxury Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/30 -skew-x-12 translate-x-1/2" />
      
      <div className="max-w-4xl w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          
          <div className="space-y-12">
            <Reveal>
              <div className="inline-flex items-center gap-4 px-6 py-2 bg-text-main text-white text-[10px] uppercase tracking-[0.4em] font-bold">
                <CheckCircle2 className="w-3 h-3 text-accent" />
                Confirmed
              </div>
            </Reveal>

            <div className="space-y-6">
              <Reveal delay={0.2}>
                <h1 className="text-6xl md:text-8xl font-serif tracking-tighter leading-tight italic">
                  Thank You,<br/><span className="text-accent">Collector.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-text-muted text-sm tracking-[0.2em] uppercase leading-relaxed max-w-sm">
                  Your curated pieces have been prepared for transition to your private space.
                </p>
              </Reveal>
            </div>

            <div className="space-y-8 pt-8 border-t border-secondary">
               <Reveal delay={0.4}>
                <div className="flex flex-col gap-2">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-text-muted">Order Reference</p>
                  <p className="text-2xl font-serif italic tracking-widest">{orderRef}</p>
                </div>
               </Reveal>
               
               <Reveal delay={0.5}>
                <div className="flex flex-wrap gap-12">
                  <Link 
                    href="/shop" 
                    className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold text-text-main hover:text-accent transition-colors"
                  >
                    <span>Continue Browsing</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </Link>
                </div>
               </Reveal>
            </div>
          </div>

          <div className="hidden md:block">
             <Reveal delay={0.6}>
              <div className="relative aspect-[3/4] bg-secondary rounded-sm overflow-hidden shadow-2xl">
                 <Image 
                  src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000&auto=format&fit=crop"
                  alt="Success Artwork"
                  fill
                  className="object-cover grayscale contrast-125"
                  sizes="30vw"
                />
                <div className="absolute inset-0 bg-accent/10" />
              </div>
             </Reveal>
          </div>

        </div>
      </div>

      <div className="absolute bottom-12 text-[8px] uppercase tracking-[0.5em] text-text-muted/40">
        Arts by Bhoomi — Private Acquisition Department
      </div>
    </div>
  );
}
