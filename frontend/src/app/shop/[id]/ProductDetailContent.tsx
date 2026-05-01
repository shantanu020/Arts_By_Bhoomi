"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, Truck, RotateCcw, Share2, Sparkles, MoveRight, ImageIcon, Loader2 } from "lucide-react";
import api from "@/lib/api";
import Reveal from "@/components/ui/Reveal";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  stock: number;
}

export default function ProductDetailContent({ id }: { id: string }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen bg-[#fcfcf9] flex flex-col items-center justify-center gap-6">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
        <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-text-muted">Loading Masterpiece</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-screen bg-[#fcfcf9] flex flex-col items-center justify-center gap-8 px-6 text-center">
        <h2 className="text-4xl font-serif italic text-text-muted">Masterpiece not found.</h2>
        <button 
          onClick={() => router.push('/shop')}
          className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold text-accent hover:text-text-main transition-all group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
          Back to Collection
        </button>
      </div>
    );
  }

  const isValidImage = product.images && product.images.length > 0 && typeof product.images[0] === 'string';

  return (
    <div className="bg-[#fcfcf9] min-h-screen relative overflow-hidden flex flex-col">
      {/* Background Aura Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation - Slim */}
      <section className="pt-24 px-6 shrink-0">
        <div className="max-w-6xl mx-auto flex justify-between items-center pb-4 border-b border-secondary/30">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] font-bold text-text-muted hover:text-text-main transition-all group"
          >
            <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
            Back
          </button>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <span className="w-4 h-[1px] bg-accent/30" />
               <span className="text-accent text-[9px] uppercase tracking-[0.4em] font-bold">{product.category}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Exhibition Area - Optimized for one-page view */}
      <section className="flex-1 flex items-center py-8 px-6 relative z-10 min-h-0">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          
          {/* Visual Presentation */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <Reveal>
              <div className="relative aspect-[4/5] w-full max-h-[65vh] overflow-hidden rounded-sm bg-secondary/10 shadow-2xl group border border-secondary/40">
                {isValidImage ? (
                  <Image 
                    src={product.images[0]} 
                    alt={product.title} 
                    fill 
                    unoptimized
                    className="object-cover" 
                    priority 
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-text-muted/40">
                     <ImageIcon className="w-16 h-16 mb-2" />
                     <span className="text-[10px] uppercase tracking-[0.4em] font-bold">In Curation</span>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                   <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-full">
                      <Sparkles className="w-3 h-3 text-accent" />
                   </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Details & Acquisition */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                 <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-bold">Original Work</span>
                 <div className="h-[1px] w-8 bg-secondary/60" />
              </div>
              <h1 className="text-5xl md:text-6xl font-serif tracking-tighter leading-none mb-6 italic">
                {product.title}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex items-baseline gap-4 mb-6">
                <p className="text-4xl font-light tracking-tight text-text-main">
                  ₹ {product.price.toLocaleString('en-IN')}
                </p>
                <span className="text-[9px] text-text-muted uppercase tracking-[0.3em] border-l border-secondary pl-4">
                  Inclusive of tax
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-base text-text-muted/80 mb-8 italic font-serif leading-relaxed max-w-lg">
                "{product.description}"
              </p>
            </Reveal>

            {/* Compact Specs */}
            <Reveal delay={0.3}>
              <div className="grid grid-cols-2 gap-6 mb-8 border-y border-secondary/40 py-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-accent">
                    <Truck className="w-3 h-3" />
                    <span className="text-[8px] uppercase tracking-[0.2em] font-bold">Transit</span>
                  </div>
                  <p className="text-[10px] text-text-muted font-light">Insured delivery.</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-accent">
                    <ShieldCheck className="w-3 h-3" />
                    <span className="text-[8px] uppercase tracking-[0.2em] font-bold">Protocol</span>
                  </div>
                  <p className="text-[10px] text-text-muted font-light">Signed provenance.</p>
                </div>
              </div>
            </Reveal>

            {/* Acquisition Trigger */}
            <Reveal delay={0.4}>
              <button
                onClick={() => {
                  if (isValidImage) {
                    addToCart({
                      id: product._id,
                      title: product.title,
                      price: product.price,
                      imageUrl: product.images[0],
                      quantity: 1
                    });
                  }
                }}
                disabled={product.stock <= 0}
                className={`w-full py-6 text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-700 shadow-xl relative group rounded-sm overflow-hidden ${
                  product.stock > 0 
                    ? 'bg-text-main text-white' 
                    : 'bg-secondary text-text-muted cursor-not-allowed'
                }`}
              >
                <div className="relative z-10 flex items-center justify-center gap-4">
                  <span>{product.stock > 0 ? 'Acquire Piece' : 'Sold Out'}</span>
                  {product.stock > 0 && <MoveRight className="w-3 h-3 group-hover:translate-x-2 transition-transform duration-500" />}
                </div>
                {product.stock > 0 && (
                  <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                )}
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <section className="py-6 border-t border-secondary/30 px-6 shrink-0 bg-white/40">
        <div className="max-w-6xl mx-auto flex justify-between text-[8px] uppercase tracking-[0.3em] text-text-muted font-bold opacity-60">
           <span>01. Inquiry</span>
           <span>02. Secure Ship</span>
           <span>03. Provenance</span>
        </div>
      </section>
    </div>
  );
}
