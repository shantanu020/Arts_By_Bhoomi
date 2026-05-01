"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/lib/api";
import Reveal from "@/components/ui/Reveal";
import ProductCard from "@/components/shop/ProductCard";

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
    images: ['https://images.unsplash.com/photo-1536337005238-94b997371b40?q=80&w=1000&auto=format&fit=crop'],
    stock: 0
  },
  {
    _id: '3',
    title: 'Digital Soul',
    price: 8000,
    category: 'Digital',
    images: ['https://images.unsplash.com/photo-1547891301-1555e0c0792e?q=80&w=1000&auto=format&fit=crop'],
    stock: 5
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
    <div className="bg-primary min-h-screen">
      {/* Premium Shop Header */}
      <section className="pt-48 pb-24 px-6">
        <div className="max-w-[1800px] mx-auto border-b border-secondary pb-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="max-w-2xl">
              <Reveal>
                <span className="text-accent text-[10px] uppercase tracking-[0.5em] mb-6 block font-bold">The Boutique</span>
              </Reveal>
              <Reveal>
                <h1 className="text-6xl md:text-9xl font-serif tracking-tighter leading-[0.8] italic">
                  Acquire<br/><span className="text-text-muted/40 ml-12 md:ml-32">Art</span>
                </h1>
              </Reveal>
            </div>
            
            <div className="flex flex-wrap gap-8 md:gap-12 pb-2">
              {['All', 'Paintings', 'Sketches', 'Digital', 'Custom Art'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`text-[10px] uppercase tracking-[0.3em] transition-all duration-500 relative group pb-1 ${
                    filter === activeFilter ? 'text-text-main font-bold' : 'text-text-muted hover:text-text-main'
                  }`}
                >
                  {filter}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-700 ${filter === activeFilter ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Product Grid */}
      <section className="px-6 pb-48">
        <div className="max-w-[1800px] mx-auto">
          {loading && products.length === 0 ? (
            <div className="h-[40vh] flex items-center justify-center">
               <p className="text-[10px] uppercase tracking-[0.6em] animate-pulse">Consulting the Archives...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
              {filteredProducts.map((product, idx) => (
                <div key={product._id} className={idx % 2 === 1 ? 'md:mt-32' : ''}>
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
          {filteredProducts.length === 0 && !loading && (
            <div className="h-[40vh] flex flex-col items-center justify-center space-y-4">
              <p className="font-serif italic text-3xl text-text-muted">This vault is currently empty.</p>
              <button 
                onClick={() => setActiveFilter('All')}
                className="text-[10px] uppercase tracking-[0.3em] border-b border-text-main pb-1"
              >
                Show All Categories
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
