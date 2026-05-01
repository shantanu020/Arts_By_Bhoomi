import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artistic Journal | Studio Stories & Process",
  description: "Dive deep into the stories behind the art. Tutorials, studio updates, and reflections on the creative journey.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
