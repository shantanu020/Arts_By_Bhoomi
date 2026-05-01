import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commisions & Dialogue | Contact Studio",
  description: "Start a conversation with the studio. Inquire about private collections, custom commissions, or collaborations.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
