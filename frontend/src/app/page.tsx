"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight, Sparkles, Loader2 } from "lucide-react";
import api from "@/lib/api";

export default function Home() {
  const [featuredItems, setFeaturedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get("/gallery");
        setFeaturedItems(data.slice(0, 2));
      } catch (err) {
        console.error("Failed to fetch featured works", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#fcfcf9] overflow-x-hidden relative">
      {/* Decorative Aura Backgrounds */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Section */}
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

      {/* The Manifesto */}
      <section className="py-64 px-6 bg-[#fcfcf9] relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
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
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-48 px-6 bg-secondary/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
            <div className="max-w-2xl">
              <Reveal>
                <h2 className="text-6xl md:text-9xl font-serif italic tracking-tighter leading-none">The Current<br/>Archives</h2>
              </Reveal>
            </div>
            <Reveal>
              <Link href="/gallery" className="group flex items-center gap-4 text-[11px] uppercase tracking-[0.5em] font-bold bg-text-main text-white px-12 py-6 hover:bg-accent transition-all duration-500 shadow-2xl">
                View All Works
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Reveal>
          </div>

          {loading ? (
            <div className="h-96 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : featuredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              {featuredItems.map((item) => (
                <div key={item._id} className="relative group">
                  <Reveal>
                    <div className="relative aspect-square overflow-hidden rounded-sm bg-primary shadow-3xl">
                       <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-[3s] group-hover:scale-110"
                        sizes="50vw"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-1000" />
                    </div>
                    <div className="mt-12">
                      <div className="flex items-center gap-3 mb-4">
                         <span className="w-8 h-[1px] bg-accent" />
                         <span className="text-accent text-[9px] uppercase tracking-widest font-bold">{item.category}</span>
                      </div>
                      <h3 className="text-4xl font-serif italic tracking-tight">{item.title}</h3>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center font-serif italic text-2xl text-text-muted">Collection unveiling soon.</p>
          )}
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
    </div>
  );
}
