"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";
import { useCart } from "@/context/CartContext";
import { Plus, ArrowRight, ImageIcon } from "lucide-react";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  category: string;
  isAvailable?: boolean;
  className?: string;
}

export default function ProductCard({
  id,
  title,
  price,
  imageUrl,
  category,
  isAvailable = true,
  className,
}: ProductCardProps) {
  const { addToCart } = useCart();
  
  const isValidImage = typeof imageUrl === 'string' && imageUrl.length > 0;

  return (
    <Reveal>
      <div className={cn("group relative flex flex-col", className)}>
        {/* Image Container with Floating Effects */}
        <Link 
          href={`/shop/${id}`} 
          className="block relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary/20 mb-8 group"
        >
          <motion.div 
            className="w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          >
            {isValidImage ? (
              <Image
                src={imageUrl}
                alt={title}
                fill
                unoptimized
                className="object-cover transition-opacity duration-700 group-hover:opacity-90"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-text-muted/40">
                 <ImageIcon className="w-12 h-12 mb-2" />
                 <span className="text-[10px] uppercase tracking-widest font-bold">In Curation</span>
              </div>
            )}
          </motion.div>
          
          {/* Status Badge */}
          {!isAvailable && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-white rounded-full shadow-2xl">
                Sold Out
              </div>
            </div>
          )}

          {/* Quick Action Overlay */}
          {isAvailable && isValidImage && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart({ id, title, price, imageUrl, quantity: 1 });
                }}
                className="w-full bg-white text-black py-4 rounded-sm text-[10px] uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-3 hover:bg-accent hover:text-white transition-all duration-500 translate-y-4 group-hover:translate-y-0 shadow-2xl"
              >
                <Plus className="w-3 h-3" />
                Reserve Piece
              </button>
            </div>
          )}

          {/* Category Tag - Floating Corner */}
          <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0">
             <span className="text-[9px] uppercase tracking-[0.3em] font-bold bg-white/10 backdrop-blur-md border border-white/10 text-white px-3 py-1.5 rounded-full">
               {category}
             </span>
          </div>
        </Link>

        {/* Content Section */}
        <div className="flex flex-col gap-3 px-2">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <Link 
                href={`/shop/${id}`} 
                className="block font-serif text-2xl md:text-3xl leading-tight hover:text-accent transition-colors italic group-hover:pl-2 duration-500"
              >
                {title}
              </Link>
              <div className="flex items-center gap-3 mt-2">
                <span className="h-[1px] w-8 bg-accent/30" />
                <p className="text-[10px] text-text-muted uppercase tracking-[0.3em] font-medium">{category}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-lg font-light tracking-tight text-text-main">
                ₹ {price.toLocaleString('en-IN')}
              </p>
              <p className="text-[8px] text-text-muted uppercase tracking-[0.1em] mt-1 font-bold">Inclusive of taxes</p>
            </div>
          </div>
          
          {/* Subtle View Detail Arrow */}
          <Link 
            href={`/shop/${id}`}
            className="flex items-center gap-2 text-[9px] uppercase tracking-[0.4em] text-text-muted hover:text-accent transition-all duration-500 mt-2 group/link"
          >
            <span>View Details</span>
            <ArrowRight className="w-3 h-3 group-hover/link:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
