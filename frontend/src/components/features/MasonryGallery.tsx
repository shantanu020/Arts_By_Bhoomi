"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { motion } from "framer-motion";

interface GalleryItem {
  _id: string;
  imageUrl: string;
  title: string;
  heightClass: string;
  category?: string;
}

export default function MasonryGallery({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
      {items.map((item, index) => (
        <motion.div 
          key={item._id} 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.8, 
            delay: (index % 3) * 0.2,
            ease: [0.21, 0.47, 0.32, 0.98]
          }}
        >
          <div className="relative group rounded-sm overflow-hidden bg-secondary/10 border border-secondary/20 shadow-2xl transition-all duration-700 hover:shadow-accent/5">
            <div className="relative w-full aspect-square overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                unoptimized
                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 group-hover:rotate-1"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Artistic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-text-main/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100">
                <div className="overflow-hidden mb-2">
                  <p className="text-accent text-[8px] uppercase tracking-[0.5em] font-bold">
                    {item.category || "Original Work"}
                  </p>
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-white text-3xl font-serif italic tracking-tight leading-none">
                    {item.title}
                  </h3>
                </div>
                
                {/* Decorative Line */}
                <div className="w-0 group-hover:w-12 h-[1px] bg-accent/50 mt-4 transition-all duration-700 delay-100" />
              </div>
            </div>
            
            {/* Minimalist Caption for Mobile/Static view */}
            <div className="p-6 md:hidden">
               <p className="text-[8px] uppercase tracking-widest text-accent mb-1 font-bold">{item.category}</p>
               <h3 className="font-serif italic text-xl text-text-main">{item.title}</h3>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
