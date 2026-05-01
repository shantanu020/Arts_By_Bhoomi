"use client";

import MasonryGallery from "@/components/features/MasonryGallery";
import Reveal from "@/components/ui/Reveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const MOCK_GALLERY_ITEMS = [
  {
    id: "g1",
    title: "Urban Pulse",
    imageUrl: "https://images.unsplash.com/photo-1547891301-1555e0c0792e?q=80&w=1000&auto=format&fit=crop",
    heightClass: "h-96", 
    category: "Digital"
  },
  {
    id: "g2",
    title: "Silent Whisper",
    imageUrl: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?q=80&w=1000&auto=format&fit=crop",
    heightClass: "h-64",
    category: "Acrylic"
  },
  {
    id: "g3",
    title: "Ocean's Depth",
    imageUrl: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=1000&auto=format&fit=crop",
    heightClass: "h-80",
    category: "Acrylic"
  },
  {
    id: "g4",
    title: "Golden Hour",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop",
    heightClass: "h-[28rem]",
    category: "Digital"
  },
  {
    id: "g5",
    title: "Lost in Thought",
    imageUrl: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=1000&auto=format&fit=crop",
    heightClass: "h-72",
    category: "Pencil"
  },
  {
    id: "g6",
    title: "Abstract Flow",
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000&auto=format&fit=crop",
    heightClass: "h-96",
    category: "Acrylic"
  },
];

export default function GalleryPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headingX = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div ref={containerRef} className="bg-primary min-h-screen">
      {/* Floating Heading Section */}
      <section className="h-[60vh] flex items-center justify-center relative overflow-hidden px-6">
        <motion.div style={{ x: headingX }} className="flex flex-col items-center">
          <Reveal>
            <span className="text-accent text-[10px] uppercase tracking-[0.5em] mb-8 block font-bold">The Exhibition</span>
          </Reveal>
          <Reveal>
            <h1 className="text-7xl md:text-[12rem] font-serif tracking-tighter leading-[0.8] italic whitespace-nowrap">
              Curated<br/>
              <span className="text-text-muted/20 ml-24 md:ml-48">Galleria</span>
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
        <div className="max-w-[1800px] mx-auto">
          <MasonryGallery items={MOCK_GALLERY_ITEMS} />
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
