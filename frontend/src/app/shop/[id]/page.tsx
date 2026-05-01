"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, Truck, RotateCcw, Share2 } from "lucide-react";
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
    <div className="bg-primary min-h-screen">
      {/* Premium Header/Nav Space */}
      <section className="pt-32 px-6">
        <div className="max-w-[1800px] mx-auto flex justify-between items-center pb-8 border-b border-secondary">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold text-text-muted hover:text-text-main transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
            Back
          </button>
          <div className="flex items-center gap-8">
            <button className="text-text-muted hover:text-accent transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <span className="text-accent text-[10px] uppercase tracking-[0.4em] font-bold">{product.category}</span>
          </div>
        </div>
      </section>

      {/* Hero Exhibition Layout */}
      <section className="py-24 px-6">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          {/* Visual Presentation */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary shadow-2xl group">
                <Image 
                  src={product.images[0]} 
                  alt={product.title} 
                  fill 
                  className="object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                  priority 
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Reveal>
          </div>

          {/* Details & Acquisition */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <Reveal>
              <h1 className="text-5xl md:text-8xl font-serif tracking-tighter leading-tight mb-8 italic">
                {product.title}
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex items-end gap-6 mb-12">
                <p className="text-4xl font-light tracking-widest text-text-main">
                  ₹ {product.price.toLocaleString('en-IN')}
                </p>
                <span className="text-[10px] text-text-muted uppercase tracking-[0.3em] pb-2">Vat Included</span>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="prose prose-stone font-light leading-relaxed text-text-main/70 mb-16 text-lg max-w-xl">
                <p>{product.description}</p>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12 mb-16 border-y border-secondary py-12">
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-text-muted font-bold">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Truck className="w-3 h-3 text-accent" />
                  </div>
                  <span>Global Shipping</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-text-muted font-bold">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <ShieldCheck className="w-3 h-3 text-accent" />
                  </div>
                  <span>Authenticity Seal</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-text-muted font-bold">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <RotateCcw className="w-3 h-3 text-accent" />
                  </div>
                  <span>Returns Policy</span>
                </div>
              </div>
            </Reveal>

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
                className={`w-full py-8 text-[10px] uppercase tracking-[0.6em] font-bold transition-all duration-700 shadow-2xl overflow-hidden relative group ${
                  product.stock > 0 
                    ? 'bg-text-main text-white' 
                    : 'bg-secondary text-text-muted cursor-not-allowed'
                }`}
              >
                <span className="relative z-10">{product.stock > 0 ? 'Acquire Original Piece' : 'Currently Unavailable'}</span>
                {product.stock > 0 && (
                  <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                )}
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Artistic Footer Space */}
      <section className="py-24 border-t border-secondary">
        <div className="max-w-[1800px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
           <div className="space-y-4">
             <p className="text-[10px] uppercase tracking-[0.4em] font-bold">Collector Support</p>
             <p className="text-xs text-text-muted font-light leading-relaxed">Our concierge is available for private inquiries and custom commission requests.</p>
           </div>
           <div className="space-y-4">
             <p className="text-[10px] uppercase tracking-[0.4em] font-bold">Safe Acquisition</p>
             <p className="text-xs text-text-muted font-light leading-relaxed">Every piece is insured for its full value during transit and arrives with a personalized authenticity dossier.</p>
           </div>
           <div className="space-y-4">
             <p className="text-[10px] uppercase tracking-[0.4em] font-bold">Exhibition Ready</p>
             <p className="text-xs text-text-muted font-light leading-relaxed">Pieces come professionally mounted and ready for display in your private space.</p>
           </div>
        </div>
      </section>
    </div>
  );
}
