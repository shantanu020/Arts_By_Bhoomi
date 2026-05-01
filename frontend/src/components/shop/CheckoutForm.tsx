"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import api from "@/lib/api";
import { ShieldCheck, IndianRupee } from "lucide-react";
import { useRazorpay } from "react-razorpay";

interface CheckoutFormProps {
  customerDetails: any;
  amount: number;
  cartItems: any[];
}

export default function CheckoutForm({ customerDetails, amount, cartItems }: CheckoutFormProps) {
  const router = useRouter();
  const { clearCart } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const { Razorpay } = useRazorpay();

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    try {
      // 1. Create order on the backend
      const { data: order } = await api.post("/razorpay/create-order", {
        amount,
        customerDetails,
      });

      if (order.id === 'order_mock_123') {
        // Mock success for development fallback
        setTimeout(() => {
          clearCart();
          router.push("/checkout/success");
        }, 1500);
        return;
      }

      // 2. Initialize Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: order.amount,
        currency: order.currency,
        name: "Arts by Bhoomi",
        description: "Artwork Purchase",
        order_id: order.id,
        handler: async (response: any) => {
          try {
            // Optional: verify payment on backend
            await api.post("/razorpay/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderData: {
                orderItems: cartItems.map(item => ({
                  product: item.id,
                  title: item.title,
                  qty: 1,
                  price: item.price,
                  image: item.imageUrl,
                })),
                shippingAddress: {
                  fullName: `${customerDetails.firstName} ${customerDetails.lastName}`,
                  address: customerDetails.address,
                  city: customerDetails.city,
                  postalCode: customerDetails.zipCode,
                  country: customerDetails.country || 'India',
                  phone: '0000000000' // Placeholder since we didn't collect it
                },
                paymentMethod: 'Razorpay',
                totalPrice: amount,
                guestEmail: customerDetails.email
              }
            });
            clearCart();
            router.push("/checkout/success");
          } catch (verifyErr: any) {
            const errorMsg = verifyErr.response?.data?.message || "Payment verification failed. Please contact support.";
            setError(errorMsg);
            setProcessing(false);
          }
        },
        prefill: {
          name: `${customerDetails.firstName} ${customerDetails.lastName}`,
          email: customerDetails.email,
        },
        theme: {
          color: "#D4AF37", // Matches accent color
        },
      };

      const rzp = new Razorpay(options);
      
      rzp.on("payment.failed", function (response: any) {
        setError(`Payment failed: ${response.error.description}`);
        setProcessing(false);
      });

      rzp.open();
    } catch (err: any) {
      console.error(err);
      setError("An unexpected error occurred while initializing payment.");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="space-y-8">
      <div className="bg-secondary/50 p-8 rounded-sm border border-secondary text-center space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-2">
          <IndianRupee className="w-6 h-6 text-accent" />
        </div>
        <h3 className="text-xl font-serif italic">Complete your purchase</h3>
        <p className="text-sm text-text-muted max-w-sm mx-auto">
          You will be securely redirected to Razorpay to complete your payment using UPI, Credit/Debit Card, or Netbanking.
        </p>
        
        {error && (
          <p className="mt-4 text-xs text-red-500 font-light tracking-wide italic">{error}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={processing}
        className="w-full bg-text-main text-white py-6 text-[10px] uppercase tracking-[0.4em] font-medium hover:bg-accent transition-all duration-500 shadow-xl flex items-center justify-center gap-4 disabled:opacity-50"
      >
        {processing ? "Preparing Gateway..." : "Pay with Razorpay"}
      </button>

      <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-text-muted mt-4">
        <ShieldCheck className="w-3 h-3 text-accent" />
        <span>100% Secure Checkout</span>
      </div>
    </form>
  );
}
