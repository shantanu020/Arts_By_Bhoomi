"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/api";
import Reveal from "@/components/ui/Reveal";
import { Sparkles, ArrowRight, MoveRight, Loader2, BookOpen } from "lucide-react";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: string;
  createdAt: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await api.get('/blogs');
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  const regularBlogs = blogs.length > 1 ? blogs.slice(1) : [];

  if (loading) {
    return (
      <div className="h-screen bg-[#fcfcf9] flex flex-col items-center justify-center gap-6">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
        <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-text-muted">Opening the Archive</p>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 bg-[#fcfcf9] min-h-screen relative overflow-hidden pb-48">
      {/* Decorative Aura Backgrounds */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Section */}
      <section className="relative pt-48 pb-32 px-6 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-white/40 border border-accent/10 mb-12 backdrop-blur-xl shadow-sm">
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-[10px] tracking-[0.6em] uppercase font-bold text-accent">The Written Archive</span>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-7xl md:text-[9rem] lg:text-[10rem] font-serif mb-12 leading-[0.8] tracking-tighter italic">
              Artistic <span className="text-accent/90">Musings</span>
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="text-xl md:text-2xl text-text-muted max-w-2xl mx-auto font-light tracking-wide leading-relaxed italic font-serif">
              Tutorials, studio updates, and intimate reflections on the <span className="text-text-main">creative journey</span> behind the canvas.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {blogs.length === 0 ? (
            <div className="py-48 text-center border-y border-secondary/40">
               <BookOpen className="w-16 h-16 mx-auto mb-8 text-secondary/40" />
               <p className="text-3xl font-serif italic text-text-muted">The journal is currently being written.</p>
               <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mt-4">Check back for studio stories</p>
            </div>
          ) : (
            <>
              {/* Featured Blog */}
              {featuredBlog && (
                <Reveal delay={0.6}>
                  <Link href={`/blog/${featuredBlog.slug || featuredBlog._id}`} className="group block mb-48 relative overflow-hidden bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl rounded-sm transition-all duration-1000 hover:shadow-3xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                      <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-secondary/10">
                        {featuredBlog.coverImage && (
                          <Image
                            src={featuredBlog.coverImage}
                            alt={featuredBlog.title}
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-[3s] group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 bg-accent/5 mix-blend-overlay" />
                      </div>
                      <div className="lg:col-span-5 p-12 md:p-24 flex flex-col justify-center space-y-10">
                        <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-accent font-bold">
                          <span className="w-8 h-[1px] bg-accent" />
                          {featuredBlog.category}
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif leading-[1.1] tracking-tight group-hover:text-accent transition-colors duration-700 italic">
                          {featuredBlog.title}
                        </h2>
                        <p className="text-lg text-text-muted leading-relaxed italic font-serif line-clamp-4">
                          "{featuredBlog.excerpt}"
                        </p>
                        <div className="pt-8">
                           <div className="inline-flex items-center gap-6 text-[11px] uppercase tracking-[0.4em] font-bold border-b border-text-main pb-2 group-hover:text-accent group-hover:border-accent transition-all duration-500">
                              Read the Full Entry
                              <MoveRight className="w-4 h-4 group-hover:translate-x-3 transition-transform" />
                           </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              )}

              {/* Regular Blogs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                {regularBlogs.map((post, idx) => (
                  <article key={post._id}>
                    <Reveal delay={0.2 + idx * 0.1}>
                      <Link href={`/blog/${post.slug || post._id}`} className="group block h-full flex flex-col">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#f5f5f0] shadow-2xl mb-10 group-hover:shadow-3xl transition-all duration-700">
                          {post.coverImage && (
                            <Image
                              src={post.coverImage}
                              alt={post.title}
                              fill
                              unoptimized
                              className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                            />
                          )}
                          <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[9px] uppercase tracking-[0.3em] font-bold text-accent shadow-sm">
                            {post.category}
                          </div>
                        </div>
                        <div className="flex flex-col flex-1 space-y-6">
                          <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-text-muted font-bold">
                            <span className="w-6 h-[1px] bg-secondary" />
                            {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </div>
                          <h3 className="text-3xl font-serif leading-tight group-hover:text-accent transition-colors duration-500 italic">
                            {post.title}
                          </h3>
                          <p className="text-text-muted text-base leading-relaxed line-clamp-3 font-light italic font-serif flex-1">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-text-main group-hover:text-accent transition-all duration-500 pt-4">
                            Explore Entry <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* Decorative Ticker */}
      <div className="mt-64 py-20 bg-text-main overflow-hidden border-y border-white/10 opacity-30">
        <div className="flex whitespace-nowrap animate-pulse">
           {[1,2,3,4,5,6].map(i => (
             <span key={i} className="text-white text-[10px] uppercase tracking-[1em] font-bold px-12">Studio Updates • Technical Process • Artist Philosophy •</span>
           ))}
        </div>
      </div>
    </div>
  );
}
