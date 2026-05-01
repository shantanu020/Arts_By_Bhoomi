import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Gallery | Immersive Art Curation",
  description: "Experience a curated journey through Bhoomi's most significant works. A digital sanctuary for art lovers and collectors.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
