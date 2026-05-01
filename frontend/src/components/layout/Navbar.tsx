"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingBag } from 'lucide-react';

export default function Navbar() {
  const { cartCount, setIsOpen } = useCart();

  return (
    <header className="fixed w-full top-0 z-50 py-4 bg-text-main text-white shadow-2xl">
      <div className="max-w-screen-2xl mx-auto px-6 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-2xl font-serif tracking-tighter text-white hover:text-accent transition-colors duration-500"
        >
          Arts by Bhoomi
        </Link>
        
        <nav className="hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.3em] font-medium text-white/70">
          {['Shop', 'Gallery', 'Blog', 'About', 'Contact'].map((item) => (
            <Link 
              key={item}
              href={`/${item.toLowerCase()}`} 
              className="transition-colors duration-300 relative group hover:text-white"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-8">
          <button 
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-medium text-white/70 hover:text-white transition-colors group"
          >
            <ShoppingBag className="w-4 h-4 text-accent transition-colors" />
            <span>Cart ({cartCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
}
