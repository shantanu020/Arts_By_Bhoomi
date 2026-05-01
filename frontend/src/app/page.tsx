"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/ui/Reveal";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} className="w-full bg-primary overflow-x-hidden">
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
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-accent text-[10px] uppercase tracking-[0.6em] mb-6 block font-medium">Est. 2024 — India</span>
            <h1 className="text-white text-7xl md:text-[10rem] font-serif mb-8 tracking-tighter leading-[0.8] italic">
              Bhoomi<br/>
              <span className="text-accent/80 ml-12 md:ml-32">Singh</span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.5 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12"
          >
            <div className="w-px h-12 bg-white/20 hidden md:block" />
            <p className="text-white/60 text-sm md:text-base font-light tracking-[0.2em] uppercase max-w-xs">
              Translating the unsaid into a canvas of emotions.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12 left-12 flex items-center gap-6"
        >
          <div className="flex flex-col gap-2">
            <span className="text-white/40 text-[8px] uppercase tracking-[0.3em]">Scroll</span>
            <div className="w-12 h-[1px] bg-white/40 overflow-hidden">
               <motion.div 
                animate={{ x: [ -48, 48 ] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="w-full h-full bg-accent"
               />
            </div>
          </div>
        </motion.div>
      </section>

      {/* The Manifesto - Premium Typography Reveal */}
      <section className="py-48 px-6 bg-primary relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
             <Reveal>
              <span className="text-accent text-[10px] uppercase tracking-[0.4em] mb-4 block font-medium">The Philosophy</span>
             </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal>
              <h2 className="text-4xl md:text-7xl font-serif leading-[1.1] tracking-tighter mb-16 italic">
                "Art is not just a visual experience, it is a <span className="text-accent">conversation</span> between the soul and the canvas."
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-text-muted text-sm font-light leading-relaxed tracking-wide">
               <Reveal delay={0.2}>
                <p>
                  Every stroke is a deliberate act of vulnerability. In my studio, I don't just paint colors; I curate silences, capture whispers, and freeze the fleeting essence of human connection.
                </p>
               </Reveal>
               <Reveal delay={0.3}>
                <p>
                  Inspired by the raw textures of Indian landscapes and the precision of modern minimalism, my work exists at the intersection of heritage and the avant-garde.
                </p>
               </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Works - Asymmetrical Luxury Grid */}
      <section className="py-24 pb-48 bg-secondary/30">
        <div className="max-w-[1800px] mx-auto px-6">
          <div className="flex justify-between items-end mb-24">
            <Reveal>
              <h2 className="text-5xl md:text-8xl font-serif italic tracking-tighter">Current<br/>Exhibitions</h2>
            </Reveal>
            <Reveal>
              <Link href="/shop" className="text-[10px] uppercase tracking-[0.4em] border-b border-text-main pb-2 hover:text-accent transition-all">
                View All Pieces
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-x-12">
            {/* Main Feature */}
            <div className="md:col-span-7 relative group">
              <Reveal>
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-primary shadow-2xl">
                   <Image
                    src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=2000&auto=format&fit=crop"
                    alt="Serenity in Blue"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                    sizes="60vw"
                  />
                </div>
                <div className="mt-8 flex justify-between items-start">
                  <div className="space-y-2">
                    <span className="text-accent text-[8px] uppercase tracking-widest font-bold">Painting — 2024</span>
                    <h3 className="text-3xl font-serif italic">Serenity in Blue</h3>
                  </div>
                  <p className="text-text-muted text-[10px] uppercase tracking-[0.3em] font-medium">Acquire Piece</p>
                </div>
              </Reveal>
            </div>

            {/* Side Feature */}
            <div className="md:col-span-4 md:col-start-9 md:mt-48">
              <Reveal>
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-primary shadow-xl group">
                   <Image
                    src="https://images.unsplash.com/photo-1536337005238-94b997371b40?q=80&w=1000&auto=format&fit=crop"
                    alt="Charcoal Whispers"
                    fill
                    className="object-cover sepia-[0.2] hover:sepia-0 transition-all duration-1000 group-hover:scale-110"
                    sizes="30vw"
                  />
                </div>
                <div className="mt-8 space-y-4">
                  <h3 className="text-2xl font-serif italic">Charcoal Whispers</h3>
                  <p className="text-text-muted text-xs font-light leading-relaxed">
                    A deep dive into the monochromatic soul of the city. Hand-sketched over 40 hours of meditative focus.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Scroll/Ticker Style CTA */}
      <section className="py-24 bg-text-main overflow-hidden whitespace-nowrap border-y border-white/10">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex items-center gap-12"
        >
          {[1,2,3,4,5].map(i => (
            <div key={i} className="flex items-center gap-12">
              <span className="text-white/20 text-6xl md:text-9xl font-serif italic tracking-tighter">Enter the Studio</span>
              <div className="w-4 h-4 bg-accent rotate-45" />
              <span className="text-white text-6xl md:text-9xl font-serif italic tracking-tighter">Collector's Edition</span>
              <div className="w-4 h-4 bg-white rotate-45" />
            </div>
          ))}
        </motion.div>
      </section>

      {/* The Studio - Final Call */}
      <section className="relative h-[90vh] flex items-center justify-center">
         <Image
          src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2000&auto=format&fit=crop"
          alt="Studio View"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative z-10 text-center text-white px-4 max-w-3xl">
          <Reveal>
            <h2 className="text-5xl md:text-8xl font-serif mb-12 italic tracking-tighter">Your space,<br/>reimagined.</h2>
          </Reveal>
          <Reveal delay={0.3}>
            <Link 
              href="/gallery" 
              className="group relative inline-flex items-center gap-4 px-12 py-6 bg-accent text-white text-[10px] uppercase tracking-[0.4em] font-bold overflow-hidden"
            >
              <span className="relative z-10">Private Viewing</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 group-hover:text-black transition-colors">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
