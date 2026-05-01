import type { Metadata } from "next";
import { Inter, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", style: "italic" });

export const metadata: Metadata = {
  title: {
    default: "Arts by Bhoomi | Original Artworks & Commissions",
    template: "%s | Arts by Bhoomi"
  },
  description: "Official studio and gallery of Bhoomi. Explore original paintings, digital masterpieces, and custom art commissions. A journey through color and emotion.",
  keywords: ["Original Art", "Bhoomi Art", "Custom Commissions", "Acrylic Paintings", "Art Gallery", "Indian Artist", "Modern Art"],
  authors: [{ name: "Bhoomi Singh" }],
  creator: "Bhoomi Singh",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://artsbybhoomi.com",
    title: "Arts by Bhoomi | Original Artworks & Commissions",
    description: "Explore the immersive world of Bhoomi's art. Original paintings and custom pieces available for private collectors.",
    siteName: "Arts by Bhoomi",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Arts by Bhoomi Gallery"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Arts by Bhoomi | Original Artworks & Commissions",
    description: "Explore the immersive world of Bhoomi's art.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  }
};

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/shop/CartDrawer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <CartProvider>
          <CartDrawer />
          <Navbar />
          <main className="min-h-screen flex flex-col pt-16">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
