"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/shop/CheckoutForm";

// Replace with your real public key in production
const stripePromise = loadStripe("pk_test_placeholder");

export default function CheckoutPage() {
  const { cart, cartTotal } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<"shipping" | "payment">("shipping");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India"
  });

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-serif mb-8 italic">Your cart is empty.</h1>
        <button 
          onClick={() => router.push('/shop')}
          className="text-[10px] uppercase tracking-[0.3em] border-b border-text-main pb-2"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const proceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 w-full flex-1">
      <div className="flex flex-col lg:flex-row gap-24">
        {/* Left: Interactive Steps */}
        <div className="flex-1 space-y-12">
          <header className="flex items-center justify-between">
            <div>
              <Reveal>
                <h1 className="text-4xl md:text-6xl font-serif mb-4 italic tracking-tighter">
                  {step === "shipping" ? "Delivery Details" : "Secure Payment"}
                </h1>
              </Reveal>
              <Reveal>
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-text-muted">
                  <span className={step === "shipping" ? "text-accent font-bold" : "flex items-center gap-2"}>
                    {step === "payment" && <CheckCircle2 className="w-3 h-3 text-green-500" />}
                    Shipping
                  </span>
                  <span className="w-1 h-px bg-secondary flex-1 min-w-[20px]" />
                  <span className={step === "payment" ? "text-accent font-bold" : ""}>Payment</span>
                </div>
              </Reveal>
            </div>
            
            {step === "payment" && (
              <button 
                onClick={() => setStep("shipping")}
                className="text-[10px] uppercase tracking-[0.3em] text-text-muted hover:text-text-main flex items-center gap-2"
              >
                <ArrowLeft className="w-3 h-3" />
                Back
              </button>
            )}
          </header>

          {step === "shipping" ? (
            <form onSubmit={proceedToPayment} className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-[0.2em] font-medium border-b border-secondary pb-4 italic font-serif">Contact Information</h3>
                <input 
                  required 
                  type="email" 
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-secondary px-6 py-4 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                />
              </div>

              <div className="space-y-6 pt-6">
                <h3 className="text-sm uppercase tracking-[0.2em] font-medium border-b border-secondary pb-4 italic font-serif">Shipping Address</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    required 
                    type="text" 
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-secondary px-6 py-4 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <input 
                    required 
                    type="text" 
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-secondary px-6 py-4 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
                <input 
                  required 
                  type="text" 
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-secondary px-6 py-4 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    required 
                    type="text" 
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-secondary px-6 py-4 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <input 
                    required 
                    type="text" 
                    name="zipCode"
                    placeholder="Zip Code"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full bg-secondary px-6 py-4 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>

              <div className="pt-8">
                <button 
                  type="submit"
                  className="w-full bg-text-main text-white py-6 text-[10px] uppercase tracking-[0.4em] font-medium hover:bg-accent transition-all duration-500 shadow-xl flex items-center justify-center gap-4"
                >
                  Proceed to Payment
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-12">
              <Reveal>
                <div className="p-8 bg-secondary/30 rounded-sm border border-secondary space-y-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-text-muted">Delivery To</p>
                  <p className="text-sm font-serif italic">
                    {formData.firstName} {formData.lastName}<br />
                    {formData.address}, {formData.city} {formData.zipCode}
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <Elements stripe={stripePromise}>
                  <CheckoutForm customerDetails={formData} amount={cartTotal} />
                </Elements>
              </Reveal>
            </div>
          )}
        </div>

        {/* Right: Order Summary - Sticky */}
        <div className="w-full lg:w-[400px]">
          <div className="sticky top-32 bg-secondary p-8 rounded-sm space-y-8">
            <h3 className="text-sm uppercase tracking-[0.2em] font-medium border-b border-primary/20 pb-4 text-center italic font-serif">Order Summary</h3>
            
            <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="relative w-16 aspect-[3/4] overflow-hidden rounded-sm bg-primary/20">
                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-sm italic">{item.title}</h4>
                    <p className="text-[10px] text-text-muted tracking-widest">Qty: 1</p>
                  </div>
                  <p className="text-sm font-medium">₹ {item.price.toLocaleString('en-IN')}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-primary/20">
              <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-text-muted">
                <span>Shipping</span>
                <span className="text-accent">Complimentary</span>
              </div>
              <div className="flex justify-between text-2xl font-serif italic pt-4">
                <span>Total</span>
                <span>₹ {cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <div className="flex items-center gap-3 text-[8px] uppercase tracking-[0.2em] text-text-muted">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>PCI-Compliant Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
