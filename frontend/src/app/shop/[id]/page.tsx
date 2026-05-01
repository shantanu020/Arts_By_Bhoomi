import { Metadata } from "next";
import ProductDetailContent from "./ProductDetailContent";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const { data: product } = await axios.get(`${API_URL}/products/${id}`);
    return {
      title: `${product.title} | Original ${product.category}`,
      description: product.description.substring(0, 160),
      openGraph: {
        title: product.title,
        description: product.description.substring(0, 160),
        images: product.images[0] ? [product.images[0]] : [],
      },
    };
  } catch (error) {
    return {
      title: "Artwork Detail | Arts by Bhoomi",
    };
  }
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <ProductDetailContent id={id} />;
}
