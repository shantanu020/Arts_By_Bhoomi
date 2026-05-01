"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { cartCount, setIsOpen: setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navItems = ['Shop', 'Gallery', 'Blog', 'About', 'Contact'];

  return (
    <>
      <header className="fixed w-full top-0 z-[100] py-6 md:py-8 bg-text-main text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link 
            href="/" 
            className="text-xl md:text-2xl font-serif tracking-tighter text-white hover:text-accent transition-colors duration-500 z-10"
          >
            Arts by Bhoomi
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.3em] font-bold text-white/70">
            {navItems.map((item) => (
              <Link 
                key={item}
                href={`/${item.toLowerCase()}`} 
                className="transition-colors duration-300 relative group hover:text-white"
              >
                {item}
                <motion.span 
                  className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-500 group-hover:w-full"
                  layoutId="nav-underline"
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-10">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 md:gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-white/70 hover:text-white transition-colors group"
            >
              <ShoppingBag className="w-4 h-4 text-accent transition-colors" />
              <span className="hidden sm:inline">Cart ({cartCount})</span>
              <span className="sm:hidden">({cartCount})</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white hover:text-accent transition-colors z-[110]"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] bg-text-main md:hidden flex flex-col justify-center px-12"
          >
            {/* Background Decorative Sparkle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
               <ShoppingBag className="w-[500px] h-[500px] text-accent" />
            </div>

            <nav className="flex flex-col gap-8 relative z-10">
              <p className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold mb-4">Navigation Registry</p>
              {navItems.map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                >
                  <Link 
                    href={`/${item.toLowerCase()}`}
                    className="group flex items-center justify-between text-5xl font-serif italic tracking-tighter text-white hover:text-accent transition-all duration-500"
                  >
                    <span>{item}</span>
                    <ArrowRight className="w-8 h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-accent" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 left-12 right-12 border-t border-white/10 pt-12"
            >
               <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 mb-2">Connect with the Studio</p>
               <p className="text-xl font-serif italic text-white/80">hello@artsbybhoomi.com</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
