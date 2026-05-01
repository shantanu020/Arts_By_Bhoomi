"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/api";
import Reveal from "@/components/ui/Reveal";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: string;
  createdAt: string;
}

const MOCK_BLOGS: BlogPost[] = [
  {
    _id: "1",
    title: "How to Start with Charcoal Sketches",
    slug: "start-charcoal-sketches",
    excerpt: "Learn the basic techniques and tools needed to begin your journey with charcoal art.",
    coverImage: "https://images.unsplash.com/photo-1547891301-1555e0c0792e?q=80&w=1000&auto=format&fit=crop",
    category: "Tutorial",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    title: "The Magic of Acrylic Gradients",
    slug: "magic-acrylic-gradients",
    excerpt: "Exploring how to blend colors seamlessly using acrylic paints for stunning sunsets.",
    coverImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1000&auto=format&fit=crop",
    category: "Process",
    createdAt: new Date().toISOString(),
  }
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>(MOCK_BLOGS); // Start with mocks
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await api.get('/blogs');
        if (data && data.length > 0) {
          setBlogs(data);
        }
      } catch (error) {
        console.error('Error fetching blogs, using mock data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 w-full flex-1">
      <div className="mb-20 text-center">
        <Reveal>
          <span className="text-accent text-[10px] uppercase tracking-[0.4em] mb-6 block font-medium">Insights</span>
        </Reveal>
        <Reveal>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-tighter">Artistic Musings</h1>
        </Reveal>
        <Reveal>
          <p className="text-text-muted text-sm tracking-widest leading-relaxed max-w-xl mx-auto">
            Tutorials, studio updates, and reflections on the creative process.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
        {blogs.map((post) => (
          <article key={post._id} className="group">
            <Link href={`/blog/${post.slug}`} className="block">
              <Reveal>
                <div className="relative aspect-[16/9] overflow-hidden rounded-sm mb-8 bg-secondary">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              </Reveal>
              <div className="space-y-4">
                <Reveal>
                  <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-text-muted">
                    <span>{post.category}</span>
                    <span className="w-1 h-1 bg-accent rounded-full" />
                    <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </Reveal>
                <Reveal>
                  <h2 className="text-3xl font-serif group-hover:text-accent transition-colors leading-tight italic">
                    {post.title}
                  </h2>
                </Reveal>
                <Reveal>
                  <p className="text-text-muted text-sm leading-relaxed line-clamp-3 font-light">
                    {post.excerpt}
                  </p>
                </Reveal>
                <Reveal>
                  <div className="pt-4 text-[10px] uppercase tracking-[0.3em] font-medium border-b border-text-main inline-block group-hover:text-accent group-hover:border-accent transition-all">
                    Read Article
                  </div>
                </Reveal>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
