"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, Truck, RotateCcw, Share2, Sparkles, MoveRight } from "lucide-react";
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

export default function ProductDetailPage() {
  const { id } = useParams();
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
        setProduct({
          _id: id as string,
          title: "Serenity in Blue",
          price: 15000,
          description: "This original acrylic painting explores the delicate balance of tranquility and depth. Hand-painted on premium linen canvas, it features layers of oceanic blues and soft pearl highlights, capturing the fleeting essence of a calm morning at sea.",
          category: "Paintings",
          images: ["https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=2000&auto=format&fit=crop"],
          stock: 1
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return null;
  if (!product) return <div className="h-screen flex items-center justify-center font-serif italic text-3xl">Piece not found.</div>;

  return (
    <div className="bg-[#fcfcf9] min-h-screen relative overflow-hidden">
      {/* Background Aura */}
      <div className="absolute top-[-5%] left-[-5%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Navigation Space */}
      <section className="pt-32 px-6">
        <div className="max-w-[1800px] mx-auto flex justify-between items-center pb-8 border-b border-secondary/60">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold text-text-muted hover:text-text-main transition-all group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
            Return to Gallery
          </button>
          
          <div className="flex items-center gap-8">
            <button className="text-text-muted hover:text-accent transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3">
               <span className="w-8 h-[1px] bg-accent/30" />
               <span className="text-accent text-[10px] uppercase tracking-[0.5em] font-bold">{product.category}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Exhibition Area */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-32">
          
          {/* Visual Presentation */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] overflow-hidden rounded-sm bg-[#f5f5f0] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] group cursor-zoom-in">
                <Image 
                  src={product.images[0]} 
                  alt={product.title} 
                  fill 
                  className="object-cover transition-transform duration-[3s] group-hover:scale-105" 
                  priority 
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                <div className="absolute top-8 right-8">
                   <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-full">
                      <Sparkles className="w-4 h-4 text-white" />
                   </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Details & Acquisition */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <Reveal>
              <div className="flex items-center gap-4 mb-10">
                 <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">Limited Original</span>
                 <div className="h-[1px] flex-1 bg-secondary" />
              </div>
              <h1 className="text-6xl md:text-8xl font-serif tracking-tighter leading-[0.9] mb-12 italic">
                {product.title}
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex items-baseline gap-6 mb-16">
                <p className="text-5xl font-light tracking-tight text-text-main">
                  ₹ {product.price.toLocaleString('en-IN')}
                </p>
                <span className="text-[10px] text-text-muted uppercase tracking-[0.4em] border-l border-secondary pl-6">
                  Fine Art Tax Incl.
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="prose prose-stone font-light leading-relaxed text-text-main/80 mb-20 text-xl max-w-xl italic font-serif">
                <p>"{product.description}"</p>
              </div>
            </Reveal>

            {/* Curated Specifications */}
            <Reveal delay={0.4}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12 mb-20 border-y border-secondary py-16">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-accent">
                    <Truck className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Global Transit</span>
                  </div>
                  <p className="text-xs text-text-muted font-light leading-relaxed">Insured express delivery to any private residence globally.</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-accent">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Certificate</span>
                  </div>
                  <p className="text-xs text-text-muted font-light leading-relaxed">Signed dossier verifying the piece's technical details and provenance.</p>
                </div>
              </div>
            </Reveal>

            {/* Acquisition Trigger */}
            <Reveal delay={0.5}>
              <button
                onClick={() => addToCart({
                  id: product._id,
                  title: product.title,
                  price: product.price,
                  imageUrl: product.images[0],
                  quantity: 1
                })}
                disabled={product.stock <= 0}
                className={`w-full py-10 text-[11px] uppercase tracking-[0.6em] font-bold transition-all duration-700 shadow-3xl overflow-hidden relative group rounded-sm ${
                  product.stock > 0 
                    ? 'bg-text-main text-white' 
                    : 'bg-secondary text-text-muted cursor-not-allowed'
                }`}
              >
                <div className="relative z-10 flex items-center justify-center gap-4">
                  <span>{product.stock > 0 ? 'Acquire Original Piece' : 'Currently Unavailable'}</span>
                  {product.stock > 0 && <MoveRight className="w-4 h-4 group-hover:translate-x-3 transition-transform duration-500" />}
                </div>
                {product.stock > 0 && (
                  <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                )}
              </button>
              
              {product.stock > 0 && (
                 <p className="text-center mt-6 text-[9px] uppercase tracking-[0.3em] text-text-muted animate-pulse">
                   Exclusive Piece — Only One Available in the World
                 </p>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Collector Information */}
      <section className="py-32 border-t border-secondary/60 relative z-10">
        <div className="max-w-[1800px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-24">
           <div className="space-y-6">
             <div className="w-10 h-10 bg-secondary flex items-center justify-center rounded-full text-accent">
               <span className="text-[10px] font-bold italic">01</span>
             </div>
             <p className="text-[11px] uppercase tracking-[0.4em] font-bold">Curatorial Inquiries</p>
             <p className="text-sm text-text-muted font-light leading-relaxed italic">Direct communication with the artist is available for collectors regarding custom framing or private commissions.</p>
           </div>
           <div className="space-y-6">
             <div className="w-10 h-10 bg-secondary flex items-center justify-center rounded-full text-accent">
               <span className="text-[10px] font-bold italic">02</span>
             </div>
             <p className="text-[11px] uppercase tracking-[0.4em] font-bold">Safe Arrival</p>
             <p className="text-sm text-text-muted font-light leading-relaxed italic">Museum-grade packaging ensures the artwork arrives in pristine condition, regardless of distance.</p>
           </div>
           <div className="space-y-6">
             <div className="w-10 h-10 bg-secondary flex items-center justify-center rounded-full text-accent">
               <span className="text-[10px] font-bold italic">03</span>
             </div>
             <p className="text-[11px] uppercase tracking-[0.4em] font-bold">Investment Profile</p>
             <p className="text-sm text-text-muted font-light leading-relaxed italic">Each acquisition includes a digital portfolio of the artist's current exhibition record for your records.</p>
           </div>
        </div>
      </section>
    </div>
  );
}
