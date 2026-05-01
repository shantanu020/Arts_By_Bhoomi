"use client";

import { useEffect, useState, useRef } from "react";
import MasonryGallery from "@/components/features/MasonryGallery";
import Reveal from "@/components/ui/Reveal";
import { motion, useScroll, useTransform } from "framer-motion";
import api from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function GalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headingX = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await api.get("/gallery");
        // Add random height classes for masonry variety if not present
        const heights = ["h-64", "h-80", "h-96", "h-[28rem]", "h-72"];
        const itemsWithHeights = data.map((item: any, i: number) => ({
          ...item,
          heightClass: heights[i % heights.length]
        }));
        setItems(itemsWithHeights);
      } catch (err) {
        console.error("Failed to fetch gallery items", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div ref={containerRef} className="bg-primary min-h-screen">
      {/* Floating Heading Section */}
      <section className="h-[60vh] flex items-center justify-center relative overflow-hidden px-6">
        <motion.div style={{ x: headingX }} className="flex flex-col items-center">
          <Reveal>
            <span className="text-accent text-[10px] uppercase tracking-[0.5em] mb-8 block font-bold text-center">The Exhibition</span>
          </Reveal>
          <Reveal>
            <h1 className="text-7xl md:text-[12rem] font-serif tracking-tighter leading-[0.8] italic whitespace-nowrap text-center">
              Curated<br/>
              <span className="text-text-muted/20 ml-12 md:ml-48">Galleria</span>
            </h1>
          </Reveal>
        </motion.div>
        
        <div className="absolute right-12 bottom-12 hidden md:block">
           <Reveal delay={0.5}>
            <p className="text-[10px] uppercase tracking-[0.3em] text-text-muted text-right max-w-[200px]">
              A chronological journey through texture, light, and emotion.
            </p>
           </Reveal>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="px-6 pb-48">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="h-96 flex flex-col items-center justify-center gap-4 text-text-muted">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold">Unveiling Collection</p>
            </div>
          ) : items.length > 0 ? (
            <MasonryGallery items={items} />
          ) : (
            <div className="h-96 flex flex-col items-center justify-center text-text-muted border border-dashed border-secondary/60 rounded-sm">
               <p className="font-serif italic text-2xl">The gallery is currently being curated.</p>
               <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent mt-4">Check back soon</p>
            </div>
          )}
        </div>
      </section>

      {/* Luxury Footer Bridge */}
      <section className="py-48 bg-text-main text-white text-center flex flex-col items-center gap-8">
         <Reveal>
          <h2 className="text-4xl md:text-7xl font-serif italic tracking-tighter mb-4">Start your journey today.</h2>
         </Reveal>
         <Reveal delay={0.2}>
          <div className="w-1 h-24 bg-accent" />
         </Reveal>
      </section>
    </div>
  );
}
