import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Collection | Boutique Art Store",
  description: "Browse and acquire original masterpieces from Bhoomi's studio. Each piece is unique and comes with a certificate of authenticity.",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
