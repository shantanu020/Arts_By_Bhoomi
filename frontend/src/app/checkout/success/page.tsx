"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { CheckCircle2, ArrowRight, Package, Mail } from "lucide-react";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function CheckoutSuccessPage() {
  useEffect(() => {
    // Trigger confetti on successful load
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#D4AF37', '#1A1A1A', '#F5F5F0']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#D4AF37', '#1A1A1A', '#F5F5F0']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl w-full text-center space-y-12">
        <Reveal>
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-50 text-green-500 mb-8 shadow-sm border border-green-100">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif italic tracking-tighter mb-4">
            Thank you for your order
          </h1>
          <p className="text-text-muted max-w-lg mx-auto">
            Your payment has been successfully processed. We are now preparing your artwork for careful shipping.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-secondary/50 p-6 rounded-sm border border-secondary space-y-3">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4">
                <Package className="w-4 h-4" />
              </div>
              <h3 className="font-serif italic">Order Processing</h3>
              <p className="text-sm text-text-muted">
                You will receive a shipping confirmation email with tracking details once your order is dispatched.
              </p>
            </div>
            
            <div className="bg-secondary/50 p-6 rounded-sm border border-secondary space-y-3">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4">
                <Mail className="w-4 h-4" />
              </div>
              <h3 className="font-serif italic">Confirmation Sent</h3>
              <p className="text-sm text-text-muted">
                A receipt and order summary has been sent to your email address.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/shop"
              className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-medium border-b border-text-main pb-2 hover:text-accent hover:border-accent transition-colors"
            >
              Continue Shopping
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
