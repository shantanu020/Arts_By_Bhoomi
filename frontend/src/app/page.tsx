"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight, Sparkles, Camera, Mail, Phone } from "lucide-react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} className="w-full bg-[#fcfcf9] overflow-x-hidden relative">
      {/* Decorative Aura Backgrounds */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

      {/* State-of-the-Art Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000&auto=format&fit=crop"
            alt="Signature Artwork"
            fill
            className="object-cover scale-110"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </motion.div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
               <span className="h-[1px] w-12 bg-white/30" />
               <span className="text-white text-[10px] uppercase tracking-[0.8em] font-bold">Est. 2024 — India</span>
               <span className="h-[1px] w-12 bg-white/30" />
            </div>
            <h1 className="text-white text-8xl md:text-[12rem] font-serif mb-12 tracking-tighter leading-[0.75] italic">
              Bhoomi<br/>
              <span className="text-accent/90 relative">
                Singh
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, delay: 1 }}
                  className="absolute bottom-6 left-0 h-[2px] bg-accent/40"
                />
              </span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
            className="flex flex-col md:flex-row items-center justify-center gap-12 mt-16"
          >
            <p className="text-white/70 text-sm md:text-lg font-light tracking-[0.2em] uppercase max-w-md italic font-serif">
              Translating the unsaid into a canvas of raw emotions.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-white/40 text-[9px] uppercase tracking-[0.4em] font-bold">Scroll to Explore</span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-white/60 to-transparent relative overflow-hidden">
             <motion.div 
               animate={{ y: [0, 80] }}
               transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
               className="w-full h-1/2 bg-accent absolute top-0 left-0"
             />
          </div>
        </motion.div>
      </section>

      {/* The Manifesto - Premium Typography Reveal */}
      <section className="py-64 px-6 bg-[#fcfcf9] relative z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-5 relative">
             <Reveal>
               <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-3xl">
                  <Image 
                    src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop"
                    alt="Process"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
               </div>
             </Reveal>
             {/* Floating Badge */}
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
               className="absolute -bottom-12 -right-12 w-48 h-48 hidden lg:flex items-center justify-center"
             >
                <div className="absolute inset-0 border border-accent/20 rounded-full border-dashed" />
                <span className="text-accent text-[8px] uppercase tracking-[0.5em] font-bold">Authentic • Original • Soulful</span>
             </motion.div>
          </div>
          
          <div className="lg:col-span-7">
            <Reveal>
              <span className="text-accent text-[11px] uppercase tracking-[0.5em] mb-8 block font-bold">The Philosophy</span>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="text-5xl md:text-8xl font-serif leading-[0.9] tracking-tighter mb-16 italic">
                "Art is the <span className="text-accent">whisper</span> of the soul when words become too loud."
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-text-muted text-lg font-light leading-relaxed tracking-wide italic font-serif">
               <Reveal delay={0.4}>
                <p>
                  Every stroke is a deliberate act of vulnerability. In my studio, I don't just paint colors; I curate silences, capture whispers, and freeze the fleeting essence of human connection.
                </p>
               </Reveal>
               <Reveal delay={0.6}>
                <p>
                  Inspired by the raw textures of Indian landscapes and the precision of modern minimalism, my work exists at the intersection of heritage and the avant-garde.
                </p>
               </Reveal>
            </div>
            <Reveal delay={0.8}>
               <Link 
                href="/about" 
                className="inline-flex items-center gap-6 mt-16 text-[11px] uppercase tracking-[0.4em] font-bold border-b border-text-main pb-2 hover:text-accent hover:border-accent transition-all group"
               >
                 Discover the Artist
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-3 transition-transform" />
               </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured Works - Asymmetrical Luxury Grid */}
      <section className="py-48 px-6 bg-secondary/20 relative overflow-hidden">
        {/* Decorative Vertical Text */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden 2xl:block opacity-[0.03] select-none">
           <h2 className="text-[15rem] font-serif italic rotate-90 origin-left whitespace-nowrap">Exhibition 2024</h2>
        </div>

        <div className="max-w-[1800px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
            <div className="max-w-2xl">
              <Reveal>
                <h2 className="text-6xl md:text-9xl font-serif italic tracking-tighter leading-none">The Current<br/>Archives</h2>
              </Reveal>
            </div>
            <Reveal>
              <Link href="/shop" className="group flex items-center gap-4 text-[11px] uppercase tracking-[0.5em] font-bold bg-text-main text-white px-12 py-6 hover:bg-accent transition-all duration-500 shadow-2xl">
                Enter the Shop
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-32 md:gap-x-24">
            {/* Main Feature */}
            <div className="md:col-span-7 relative group">
              <Reveal>
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-primary shadow-3xl">
                   <Image
                    src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=2000&auto=format&fit=crop"
                    alt="Serenity in Blue"
                    fill
                    className="object-cover transition-transform duration-[3s] group-hover:scale-110"
                    sizes="60vw"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-1000" />
                </div>
                <div className="mt-12 flex justify-between items-end">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <span className="w-8 h-[1px] bg-accent" />
                       <span className="text-accent text-[9px] uppercase tracking-widest font-bold">Oil on Linen</span>
                    </div>
                    <h3 className="text-4xl font-serif italic tracking-tight">Serenity in Blue</h3>
                  </div>
                  <Link href="/shop" className="text-[10px] uppercase tracking-[0.4em] font-bold border-b border-text-main pb-1 hover:text-accent hover:border-accent transition-colors">
                    Inquire
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Side Feature */}
            <div className="md:col-span-5 md:mt-64 relative group">
              <Reveal>
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-primary shadow-3xl">
                   <Image
                    src="https://images.unsplash.com/photo-1536337005238-94b997371b40?q=80&w=1000&auto=format&fit=crop"
                    alt="Charcoal Whispers"
                    fill
                    className="object-cover transition-transform duration-[3s] group-hover:scale-110"
                    sizes="30vw"
                  />
                </div>
                <div className="mt-12 space-y-6 max-w-md">
                  <div className="flex items-center gap-3">
                     <span className="w-8 h-[1px] bg-accent" />
                     <span className="text-accent text-[9px] uppercase tracking-widest font-bold">Charcoal on Paper</span>
                  </div>
                  <h3 className="text-4xl font-serif italic tracking-tight">Charcoal Whispers</h3>
                  <p className="text-text-muted text-base font-light leading-relaxed italic font-serif">
                    A deep dive into the monochromatic soul of the city. Hand-sketched over 40 hours of meditative focus.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Scroll/Ticker Style CTA */}
      <section className="py-32 bg-text-main overflow-hidden whitespace-nowrap border-y border-white/10 relative z-20">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex items-center gap-16"
        >
          {[1,2,3,4].map(i => (
            <div key={i} className="flex items-center gap-16">
              <span className="text-white/10 text-6xl md:text-[10rem] font-serif italic tracking-tighter">Acquire Originals</span>
              <div className="w-6 h-6 bg-accent rotate-45" />
              <span className="text-white/80 text-6xl md:text-[10rem] font-serif italic tracking-tighter">Bhoomi Singh</span>
              <div className="w-6 h-6 border border-white rotate-45" />
            </div>
          ))}
        </motion.div>
      </section>

      {/* Final Call to Action */}
      <section className="relative h-screen flex items-center justify-center">
         <Image
          src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2000&auto=format&fit=crop"
          alt="Studio View"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <Reveal>
             <div className="flex flex-col items-center gap-8">
               <Sparkles className="w-8 h-8 text-accent animate-pulse" />
               <h2 className="text-6xl md:text-[9rem] font-serif mb-12 italic tracking-tighter leading-none">
                 Bring the<br/>Gallery Home.
               </h2>
               <p className="text-white/60 text-lg md:text-xl font-light tracking-[0.3em] uppercase max-w-2xl mb-16">
                 Private viewings and custom commissions available globally.
               </p>
               <Link 
                href="/shop" 
                className="group relative inline-flex items-center gap-8 px-20 py-8 bg-accent text-white text-[11px] uppercase tracking-[0.5em] font-bold overflow-hidden rounded-sm"
              >
                <span className="relative z-10">Start Your Collection</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-3 transition-transform duration-500" />
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-700 font-bold z-20">
                  Start Your Collection
                </span>
              </Link>
             </div>
          </Reveal>
        </div>
      </section>

      {/* Final Decorative Footer Line */}
      <div className="py-24 flex justify-center bg-[#fcfcf9]">
         <div className="flex flex-col items-center gap-6">
            <div className="h-48 w-[1px] bg-gradient-to-b from-accent to-transparent" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-text-muted/40 font-bold">Arts by Bhoomi</span>
         </div>
      </div>
    </div>
  );
}
