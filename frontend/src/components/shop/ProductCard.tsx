"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";
import { useCart } from "@/context/CartContext";

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
  return (
    <Reveal>
      <div className={cn("group relative flex flex-col", className)}>
        <Link href={`/shop/${id}`} className="block relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary mb-6">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {!isAvailable && (
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-black rounded-sm shadow-sm">
              Acquired
            </div>
          )}

          {/* Luxury Acquisition Trigger - Static Hover */}
          {isAvailable && (
            <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart({ id, title, price, imageUrl, quantity: 1 });
                }}
                className="w-full bg-text-main text-white py-4 text-[10px] uppercase tracking-[0.3em] font-medium hover:bg-accent transition-colors duration-500 shadow-xl"
              >
                Add to Cart
              </button>
            </div>
          )}
        </Link>

        <div className="flex flex-col gap-2 px-1 text-center">
          <p className="text-[10px] text-text-muted uppercase tracking-[0.3em] font-medium">{category}</p>
          <Link href={`/shop/${id}`} className="font-serif text-2xl hover:text-accent transition-colors italic">
            {title}
          </Link>
          <p className="text-sm tracking-widest text-text-main/60 font-light">
            ₹ {price.toLocaleString('en-IN')}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
