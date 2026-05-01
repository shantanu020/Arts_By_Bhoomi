"use client";

import { useCart } from "@/context/CartContext";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const { cart, removeFromCart, isOpen, setIsOpen, cartTotal } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    setIsOpen(false);
    router.push('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-[4px]"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-[450px] bg-[#fcfcf9] h-full shadow-[0_0_100px_rgba(0,0,0,0.2)] flex flex-col"
          >
            {/* Header */}
            <div className="p-10 border-b border-secondary/60 flex justify-between items-center bg-white/50 backdrop-blur-md">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-accent" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-white text-[8px] flex items-center justify-center rounded-full font-bold">
                      {cart.length}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-serif italic tracking-tight">Your Collection</h2>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-secondary/50 transition-colors group"
              >
                <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {cart.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-6"
                  >
                    <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mb-4">
                       <ShoppingBag className="w-6 h-6 text-text-muted/30" />
                    </div>
                    <p className="text-text-muted text-[10px] uppercase tracking-[0.4em] font-bold">The collection is empty.</p>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="text-[9px] uppercase tracking-[0.3em] border-b border-text-main pb-1 hover:text-accent hover:border-accent transition-colors"
                    >
                      Return to Gallery
                    </button>
                  </motion.div>
                ) : (
                  cart.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      key={item.id} 
                      className="flex gap-8 items-start group"
                    >
                      <div className="relative w-24 aspect-[3/4] overflow-hidden bg-[#f5f5f0] rounded-sm shadow-md">
                        {item.imageUrl ? (
                          <Image 
                            src={item.imageUrl} 
                            alt={item.title} 
                            fill 
                            unoptimized
                            className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-text-muted/30">
                             <ShoppingBag className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-2 pt-2">
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="font-serif text-xl leading-tight group-hover:text-accent transition-colors">{item.title}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-text-muted hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-text-muted font-light tracking-[0.2em] italic">Original Work</p>
                        <p className="text-lg font-light tracking-tight pt-2">₹ {item.price.toLocaleString('en-IN')}</p>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-10 border-t border-secondary/60 space-y-8 bg-white/50 backdrop-blur-md">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-text-muted font-bold">Subtotal</p>
                    <p className="text-3xl font-serif italic text-accent">₹ {cartTotal.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="flex justify-between items-center text-[9px] uppercase tracking-[0.2em] text-text-muted font-medium">
                    <span>Shipping</span>
                    <span className="text-green-600">Complimentary</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full bg-text-main text-white py-8 text-[11px] uppercase tracking-[0.6em] font-bold transition-all duration-700 shadow-2xl overflow-hidden relative group rounded-sm"
                >
                  <div className="relative z-10 flex items-center justify-center gap-4">
                    <span>Complete Acquisition</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                  </div>
                  <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </button>
                
                <p className="text-[8px] text-center text-text-muted uppercase tracking-[0.3em] font-medium italic">
                  PCI-Compliant Encryption Secured Checkout
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
