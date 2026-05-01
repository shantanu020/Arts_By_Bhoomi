"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import api from "@/lib/api";
import Reveal from "@/components/ui/Reveal";

interface BlogPost {
  title: string;
  content: string;
  coverImage: string;
  category: string;
  createdAt: string;
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/blogs/${slug}`);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
        // Fallback for demo
        setPost({
          title: "The Art of Patience",
          content: "<p>Coming soon... This is a placeholder for the full article content. In the real app, this will be rendered from Markdown or HTML stored in the database.</p><p>We are constantly evolving our creative process to bring you more immersive stories.</p>",
          coverImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2000&auto=format&fit=crop",
          category: "Philosophy",
          createdAt: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return null;
  if (!post) return <div className="text-center py-24">Post not found</div>;

  return (
    <article className="max-w-4xl mx-auto px-6 md:px-12 py-24 w-full flex-1">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-medium text-text-muted hover:text-text-main transition-colors mb-16 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
        Back to Archive
      </button>

      <header className="mb-16">
        <Reveal>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-accent mb-6 font-medium">
            <span>{post.category}</span>
            <span className="w-1 h-1 bg-accent/30 rounded-full" />
            <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </Reveal>
        <Reveal>
          <h1 className="text-4xl md:text-7xl font-serif leading-tight tracking-tighter mb-12 italic">
            {post.title}
          </h1>
        </Reveal>
        <Reveal>
          <div className="relative aspect-[21/9] overflow-hidden rounded-sm bg-secondary">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </Reveal>
      </header>

      <Reveal>
        <div 
          className="prose prose-lg max-w-none prose-stone font-light leading-relaxed text-text-main/80 space-y-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </Reveal>
    </article>
  );
}
