"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  heightClass: string;
  category?: string;
}

export default function MasonryGallery({ items }: { items: GalleryItem[] }) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-12 space-y-12">
      {items.map((item) => (
        <div key={item.id} className="break-inside-avoid">
          <Reveal>
            <div className="relative group rounded-sm overflow-hidden bg-secondary">
              <div className={`relative w-full ${item.heightClass}`}>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Hover overlay - Minimalist but static */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <p className="text-white/60 text-[8px] uppercase tracking-[0.4em] mb-2">{item.category || "Original Work"}</p>
                  <h3 className="text-white text-2xl font-serif italic tracking-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      ))}
    </div>
  );
}
