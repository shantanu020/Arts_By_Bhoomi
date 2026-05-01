"use client";

import { useCart } from "@/context/CartContext";
import { X, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function CartDrawer() {
  const { cart, removeFromCart, isOpen, setIsOpen, cartTotal } = useCart();
  const router = useRouter();

  if (!isOpen) return null;

  const handleCheckout = () => {
    setIsOpen(false);
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-primary h-full shadow-2xl flex flex-col">
        <div className="p-8 border-b border-secondary flex justify-between items-center">
          <div className="flex items-center gap-4">
            <ShoppingBag className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-serif italic">Your Collection</h2>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:text-accent transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <p className="text-text-muted text-sm uppercase tracking-widest font-light">The collection is empty.</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[10px] uppercase tracking-[0.3em] border-b border-text-main pb-1"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-6 items-start group">
                <div className="relative w-20 aspect-[3/4] overflow-hidden bg-secondary rounded-sm">
                  <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-serif text-lg">{item.title}</h3>
                  <p className="text-sm text-text-muted font-light tracking-widest">₹ {item.price.toLocaleString('en-IN')}</p>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-[10px] text-accent uppercase tracking-widest flex items-center gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-8 border-t border-secondary space-y-6">
            <div className="flex justify-between items-end">
              <p className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-medium">Subtotal</p>
              <p className="text-2xl font-serif italic">₹ {cartTotal.toLocaleString('en-IN')}</p>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-text-main text-white py-6 text-[10px] uppercase tracking-[0.4em] font-medium hover:bg-accent transition-all duration-500 shadow-xl"
            >
              Complete Acquisition
            </button>
            <p className="text-[8px] text-center text-text-muted uppercase tracking-[0.2em]">
              Shipping and taxes calculated at checkout
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
