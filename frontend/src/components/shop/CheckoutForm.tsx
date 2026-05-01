"use client";

import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import api from "@/lib/api";
import { Lock } from "lucide-react";

interface CheckoutFormProps {
  customerDetails: any;
  amount: number;
}

export default function CheckoutForm({ customerDetails, amount }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { clearCart } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      const { data } = await api.post("/stripe/create-payment-intent", {
        amount,
        customerDetails,
      });

      if (data.clientSecret === 'mock_secret_for_demo') {
        // Mock success for development
        setTimeout(() => {
          router.push("/checkout/success");
        }, 1500);
        return;
      }

      const payload = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: `${customerDetails.firstName} ${customerDetails.lastName}`,
            email: customerDetails.email,
          },
        },
      });

      if (payload.error) {
        setError(`Payment failed: ${payload.error.message}`);
        setProcessing(false);
      } else {
        router.push("/checkout/success");
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-secondary/50 p-6 rounded-sm border border-secondary">
        <div className="flex items-center gap-3 mb-6 text-[10px] uppercase tracking-widest text-text-muted">
          <Lock className="w-3 h-3 text-accent" />
          <span>Secure Payment Information</span>
        </div>
        
        <div className="px-4 py-4 bg-primary rounded-sm border border-secondary shadow-inner">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#1a1a1a',
                  '::placeholder': { color: '#a0a0a0' },
                  fontFamily: 'Inter, sans-serif',
                },
                invalid: { color: '#ff4b4b' },
              },
            }} 
          />
        </div>
        {error && (
          <p className="mt-4 text-xs text-red-500 font-light tracking-wide italic">{error}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-text-main text-white py-6 text-[10px] uppercase tracking-[0.4em] font-medium hover:bg-accent transition-all duration-500 shadow-xl flex items-center justify-center gap-4"
      >
        {processing ? "Authorizing Collection..." : "Confirm & Acquire"}
      </button>
    </form>
  );
}
