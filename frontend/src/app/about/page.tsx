"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Palette, Heart, Sparkles, MoveRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="w-full flex-1 bg-[#fcfcf9] relative overflow-hidden">
      {/* Decorative Aura Backgrounds */}
      <div className="absolute top-[-5%] right-[-5%] w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden px-6 py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2000&auto=format&fit=crop"
            alt="Artist Studio"
            fill
            className="object-cover opacity-20 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#fcfcf9]/80 via-[#fcfcf9]/95 to-[#fcfcf9]" />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-white/40 border border-accent/10 mb-12 backdrop-blur-xl shadow-sm">
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-[10px] tracking-[0.6em] uppercase font-bold text-accent">The Creative Soul</span>
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <h1 className="text-7xl md:text-[10rem] font-serif mb-12 leading-[0.8] tracking-tighter italic">
              Behind the <br />
              <span className="text-accent/90">Canvas</span>
            </h1>
          </Reveal>
          
          <Reveal delay={0.4}>
            <p className="text-2xl md:text-3xl text-text-muted max-w-3xl mx-auto font-light tracking-wide leading-relaxed italic font-serif">
              "Art is not what you see, but what you make <span className="text-text-main">others</span> see."
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-6 py-48 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            <div className="relative">
              <Reveal>
                <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-3xl group">
                   <Image
                      src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop"
                      alt="Bhoomi Painting"
                      fill
                      className="object-cover transition-transform duration-[3s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-accent/5 mix-blend-overlay" />
                </div>
              </Reveal>
              {/* Internal Floating Label - Moved inside to prevent overflow */}
              <div className="absolute right-4 bottom-8 rotate-90 origin-right">
                 <span className="text-[10px] uppercase tracking-[0.8em] text-white/50 font-bold whitespace-nowrap select-none">Bhoomi Singh — 2024</span>
              </div>
            </div>

            <div className="space-y-16">
              <Reveal delay={0.2}>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <span className="h-[1px] w-12 bg-accent" />
                     <span className="text-accent text-[11px] uppercase tracking-[0.5em] font-bold">The Narrative</span>
                  </div>
                  <h3 className="text-5xl md:text-7xl font-serif italic tracking-tighter leading-none mb-12">
                    From margins to <br/><span className="text-accent">masterpieces.</span>
                  </h3>
                </div>
              </Reveal>
              
              <Reveal delay={0.4}>
                <div className="space-y-10 text-xl text-text-muted leading-relaxed font-light italic font-serif">
                  <p>
                    Hi, I'm <span className="text-text-main font-bold not-italic font-sans text-lg tracking-[0.1em] uppercase border-b border-accent/20 pb-1">Bhoomi Singh</span>. My journey with art began long before I could put it into words. It started with graphite smudges on notebook margins and has blossomed into a lifelong pursuit of capturing emotion on canvas.
                  </p>
                  <p>
                    Through "Arts by Bhoomi", I share not just my finished pieces, but the raw, unpolished process of creation. My work spans across acrylics, charcoal sketches, and digital mediums.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.6}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-16 border-t border-secondary/60">
                  <div className="space-y-6">
                    <div className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-accent">
                      <Palette className="w-6 h-6" />
                    </div>
                    <h4 className="text-2xl font-serif italic">Mixed Mediums</h4>
                    <p className="text-sm text-text-muted font-light leading-relaxed">Exploring the boundaries between acrylics, charcoal, and digital innovation.</p>
                  </div>
                  <div className="space-y-6">
                    <div className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-accent">
                      <Heart className="w-6 h-6" />
                    </div>
                    <h4 className="text-2xl font-serif italic">Emotional Depth</h4>
                    <p className="text-sm text-text-muted font-light leading-relaxed">Every stroke is an intentional fragment of a story meant to resonate.</p>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative py-48 px-6 overflow-hidden bg-text-main">
        {/* Abstract backgrounds */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px]" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <Reveal>
             <div className="flex flex-col items-center gap-12">
                <div className="w-px h-24 bg-gradient-to-b from-transparent to-accent" />
                <span className="text-accent text-[11px] tracking-[0.6em] uppercase font-bold">My Philosophy</span>
                <p className="text-4xl md:text-6xl font-serif leading-[1.2] text-white italic tracking-tight">
                  "I believe that art should be <span className="text-accent">accessible</span>, emotional, and deeply personal. It's a conversation between the creator and the observer."
                </p>
                <div className="w-24 h-[1px] bg-accent/40" />
                
                <Link 
                  href="/contact" 
                  className="group flex items-center gap-6 text-[11px] uppercase tracking-[0.5em] font-bold text-white border border-white/20 px-12 py-6 hover:bg-white hover:text-black transition-all duration-700 rounded-sm"
                >
                  Start a Conversation
                  <MoveRight className="w-4 h-4 group-hover:translate-x-3 transition-transform" />
                </Link>
             </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
