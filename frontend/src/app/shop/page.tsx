"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import Reveal from "@/components/ui/Reveal";
import ProductCard from "@/components/shop/ProductCard";
import { Sparkles, ArrowDown, ImageIcon } from "lucide-react";

interface Product {
  _id: string;
  title: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
}

const MOCK_PRODUCTS: Product[] = [
  {
    _id: '1',
    title: 'Serenity in Blue',
    price: 15000,
    category: 'Paintings',
    images: ['https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1000&auto=format&fit=crop'],
    stock: 1
  },
  {
    _id: '2',
    title: 'Charcoal Whispers',
    price: 5000,
    category: 'Sketches',
    images: ['https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop'],
    stock: 1
  },
  {
    _id: '3',
    title: 'Digital Soul',
    price: 8000,
    category: 'Digital',
    images: ['https://images.unsplash.com/photo-1547891301-1555e0c0792e?q=80&w=1000&auto=format&fit=crop'],
    stock: 5
  },
  {
    _id: '4',
    title: 'Midnight Reverie',
    price: 12000,
    category: 'Paintings',
    images: ['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop'],
    stock: 1
  },
  {
    _id: '5',
    title: 'Abstract Echoes',
    price: 9500,
    category: 'Digital',
    images: ['https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop'],
    stock: 0
  }
];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        if (data && data.length > 0) setProducts(data);
      } catch (error) {
        console.error('API Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(p => p.category === activeFilter);

  return (
    <div className="bg-[#fcfcf9] min-h-screen relative overflow-hidden">
      {/* Background Decorative Aura */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Floating Vertical Label */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 vertical-text hidden xl:block">
        <span className="text-[10px] uppercase tracking-[1em] text-text-muted/30 font-bold whitespace-nowrap">
          Curated Original Artworks
        </span>
      </div>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-16">
            <div className="max-w-3xl">
              <Reveal>
                <div className="flex items-center gap-4 mb-8">
                  <span className="h-[1px] w-12 bg-accent" />
                  <span className="text-accent text-[10px] uppercase tracking-[0.5em] font-bold">The Collection</span>
                </div>
              </Reveal>
              <Reveal>
                <h1 className="text-7xl md:text-[10rem] font-serif tracking-tighter leading-[0.75] italic">
                  Acquire<br/>
                  <span className="text-text-muted/20 relative">
                    Masterpieces
                    <motion.span 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                      className="absolute bottom-4 left-0 h-[2px] bg-accent/30"
                    />
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={0.4}>
                <p className="mt-12 text-lg text-text-muted max-w-xl font-light leading-relaxed">
                  Browse a curated selection of mixed-medium paintings, charcoal sketches, and digital art. Each piece is a unique dialogue between the artist and the canvas.
                </p>
              </Reveal>
            </div>

            {/* Premium Filter Navigation */}
            <div className="flex flex-wrap gap-x-8 gap-y-6 lg:pb-6">
              {['All', 'Paintings', 'Sketches', 'Digital', 'Custom Art'].map((filter, i) => (
                <motion.button 
                  key={filter}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  onClick={() => setActiveFilter(filter)}
                  className={`group relative text-[11px] uppercase tracking-[0.3em] transition-all duration-500 pb-2 ${
                    filter === activeFilter ? 'text-text-main font-bold' : 'text-text-muted hover:text-text-main'
                  }`}
                >
                  {filter}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-700 ease-out ${
                    filter === activeFilter ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Spotlight Section */}
      {activeFilter === 'All' && products.length > 0 && (
        <section className="px-6 mb-32">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="relative h-[60vh] md:h-[70vh] rounded-sm overflow-hidden group bg-secondary/10">
                {products[0].images && products[0].images.length > 0 && typeof products[0].images[0] === 'string' ? (
                  <Image 
                    src={products[0].images[0]} 
                    alt="Featured" 
                    fill 
                    unoptimized
                    className="object-cover transition-transform duration-[3s] group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-text-muted/40">
                     <ImageIcon className="w-16 h-16" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
                  <span className="text-[10px] uppercase tracking-[0.6em] mb-4 font-bold">Featured Artwork</span>
                  <h2 className="text-5xl md:text-8xl font-serif italic mb-8">{products[0].title}</h2>
                  <div className="flex flex-col items-center gap-6">
                    <p className="max-w-lg text-sm text-white/70 font-light tracking-wide leading-relaxed">
                      A deep exploration of color and emotion. This centerpiece represents the culmination of a three-month study on atmospheric serenity.
                    </p>
                    <button className="bg-white text-black px-10 py-4 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-accent hover:text-white transition-all duration-500 rounded-full">
                      Examine Details
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Product Grid */}
      <section className="px-6 pb-48 relative z-10">
        <div className="max-w-7xl mx-auto">
          {loading && products.length === 0 ? (
            <div className="h-[40vh] flex flex-col items-center justify-center gap-6">
               <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
               <p className="text-[10px] uppercase tracking-[0.6em] animate-pulse">Curating the Gallery...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
              {filteredProducts.map((product, idx) => (
                <div key={product._id}>
                  <ProductCard
                    id={product._id}
                    title={product.title}
                    price={product.price}
                    category={product.category}
                    imageUrl={product.images[0]}
                    isAvailable={product.stock > 0}
                  />
                </div>
              ))}
            </div>
          )}

          <AnimatePresence>
            {filteredProducts.length === 0 && !loading && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-[40vh] flex flex-col items-center justify-center space-y-8 text-center"
              >
                <div className="w-24 h-[1px] bg-accent/30" />
                <p className="font-serif italic text-4xl text-text-muted/60">This vault is currently empty.</p>
                <button 
                  onClick={() => setActiveFilter('All')}
                  className="bg-text-main text-white px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-medium hover:bg-accent transition-all duration-500 rounded-full"
                >
                  View All Pieces
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Decorative Footer Element */}
      <div className="pb-24 flex justify-center opacity-20">
         <div className="flex flex-col items-center gap-4">
            <div className="h-32 w-[1px] bg-gradient-to-b from-accent to-transparent" />
            <Sparkles className="w-4 h-4 text-accent" />
         </div>
      </div>
      
      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
}
