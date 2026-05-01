"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Edit, Trash2, X, Loader2, Image as ImageIcon, Save, BookOpen, Clock, UploadCloud, Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  createdAt: string;
}

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [inputType, setInputType] = useState<"url" | "upload">("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "Process",
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data } = await api.get("/blogs");
      setBlogs(data);
    } catch (err) {
      console.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (blog?: BlogPost) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        coverImage: blog.coverImage,
        category: blog.category,
      });
      setInputType("url");
    } else {
      setEditingBlog(null);
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        coverImage: "",
        category: "Process",
      });
      setInputType("upload");
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this story from the journal?")) {
      try {
        await api.delete(`/blogs/${id}`);
        setBlogs(blogs.filter((b) => b._id !== id));
      } catch (err) {
        alert("Failed to delete blog post");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let finalImageUrl = formData.coverImage;

      if (inputType === "upload" && selectedFile) {
        const uploadData = new FormData();
        uploadData.append("image", selectedFile);
        const uploadRes = await api.post("/upload", uploadData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        finalImageUrl = uploadRes.data.image;
      }

      const payload = { ...formData, coverImage: finalImageUrl };

      if (editingBlog) {
        const { data } = await api.put(`/blogs/${editingBlog._id}`, payload);
        setBlogs(blogs.map((b) => (b._id === data._id ? data : b)));
      } else {
        const { data } = await api.post("/blogs", payload);
        setBlogs([data, ...blogs]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save blog post");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-end mb-16">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
             <span className="h-[1px] w-12 bg-accent" />
             <span className="text-accent text-[11px] uppercase tracking-[0.5em] font-bold">Studio Archive</span>
          </div>
          <h1 className="text-5xl font-serif italic tracking-tighter">Artistic Journal</h1>
          <p className="text-sm text-text-muted font-light italic font-serif">Document your creative process and stories.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="group relative overflow-hidden bg-text-main px-10 py-5 font-bold text-white transition-all rounded-sm shadow-xl"
        >
          <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="relative z-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em]">
            <Plus className="w-4 h-4" />
            Write New Entry
          </span>
        </button>
      </div>

      {loading ? (
        <div className="h-96 flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-accent" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog) => (
            <motion.div 
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group bg-white/40 backdrop-blur-xl border border-secondary/60 rounded-sm shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-secondary/10">
                 {blog.coverImage ? (
                   <Image 
                     src={blog.coverImage} 
                     alt={blog.title} 
                     fill 
                     unoptimized
                     className="object-cover group-hover:scale-110 transition-transform duration-[2s]" 
                   />
                 ) : (
                   <div className="absolute inset-0 flex items-center justify-center">
                     <ImageIcon className="w-10 h-10 text-secondary" />
                   </div>
                 )}
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold text-accent shadow-sm">
                   {blog.category}
                 </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                 <div className="flex items-center gap-3 text-[9px] uppercase tracking-widest text-text-muted font-bold mb-4">
                    <Clock className="w-3 h-3" />
                    {new Date(blog.createdAt).toLocaleDateString()}
                 </div>
                 <h3 className="text-2xl font-serif italic mb-4 line-clamp-2 group-hover:text-accent transition-colors">{blog.title}</h3>
                 <p className="text-sm text-text-muted font-light italic font-serif line-clamp-3 mb-8 flex-1">"{blog.excerpt}"</p>
                 
                 <div className="pt-6 border-t border-secondary/60 flex justify-between items-center">
                    <button 
                      onClick={() => handleOpenModal(blog)}
                      className="text-[10px] uppercase tracking-widest font-bold text-text-main hover:text-accent transition-colors flex items-center gap-2"
                    >
                      <Edit className="w-3 h-3" /> Edit Entry
                    </button>
                    <button 
                      onClick={() => handleDelete(blog._id)}
                      className="text-[10px] uppercase tracking-widest font-bold text-red-400 hover:text-red-600 transition-colors flex items-center gap-2"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                 </div>
              </div>
            </motion.div>
          ))}
          {blogs.length === 0 && (
            <div className="col-span-full h-96 flex flex-col items-center justify-center text-text-muted italic border-2 border-dashed border-secondary/60 rounded-sm bg-white/20">
               <BookOpen className="w-12 h-12 mb-6 opacity-20" />
               <p className="text-xl font-serif">No entries in the journal yet.</p>
               <p className="text-[10px] uppercase tracking-[0.2em] font-bold mt-2">Share your creative journey</p>
            </div>
          )}
        </div>
      )}

      {/* Blog Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitting && setIsModalOpen(false)}
              className="absolute inset-0 bg-text-main/20 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-5xl bg-white rounded-sm shadow-4xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center p-10 border-b border-secondary/60">
                 <div>
                    <h2 className="text-3xl font-serif italic mb-1">{editingBlog ? "Refine Entry" : "New Journal Entry"}</h2>
                    <p className="text-[9px] uppercase tracking-[0.4em] text-accent font-bold">Documenting the Vision</p>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-secondary/40 rounded-full transition-colors">
                    <X className="w-6 h-6" />
                 </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                       <div className="space-y-3">
                          <label className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold block">Entry Title</label>
                          <input 
                             required
                             type="text" 
                             value={formData.title}
                             onChange={(e) => setFormData({...formData, title: e.target.value})}
                             className="w-full bg-transparent border-b border-secondary/60 py-3 outline-none focus:border-accent text-2xl font-serif italic"
                             placeholder="The Essence of Color..."
                          />
                       </div>

                       <div className="space-y-3">
                          <label className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold block">Category</label>
                          <select 
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                            className="w-full bg-transparent border-b border-secondary/60 py-3 outline-none focus:border-accent text-xl font-serif italic appearance-none cursor-pointer"
                          >
                             <option value="Process">Technical Process</option>
                             <option value="Musings">Artist Musings</option>
                             <option value="Tutorial">Tutorial / Guide</option>
                             <option value="Exhibition">Exhibition News</option>
                          </select>
                       </div>

                       <div className="space-y-6">
                         <div className="flex gap-4 border-b border-secondary/40 pb-4">
                            <button 
                              type="button"
                              onClick={() => setInputType("upload")}
                              className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold pb-2 border-b-2 transition-colors ${inputType === "upload" ? "border-accent text-accent" : "border-transparent text-text-muted hover:text-text-main"}`}
                            >
                              <UploadCloud className="w-4 h-4" /> Upload
                            </button>
                            <button 
                              type="button"
                              onClick={() => setInputType("url")}
                              className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold pb-2 border-b-2 transition-colors ${inputType === "url" ? "border-accent text-accent" : "border-transparent text-text-muted hover:text-text-main"}`}
                            >
                              <LinkIcon className="w-4 h-4" /> URL
                            </button>
                         </div>

                         {inputType === "url" ? (
                           <div className="space-y-3">
                              <label className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold block">Cover Image URL</label>
                              <input 
                                 required={inputType === "url"}
                                 type="text" 
                                 value={formData.coverImage}
                                 onChange={(e) => setFormData({...formData, coverImage: e.target.value})}
                                 className="w-full bg-transparent border-b border-secondary/60 py-3 outline-none focus:border-accent text-base font-serif italic"
                                 placeholder="https://images.unsplash.com/..."
                              />
                           </div>
                         ) : (
                           <div 
                             onClick={() => fileInputRef.current?.click()}
                             className="w-full border-2 border-dashed border-secondary/60 p-8 flex flex-col items-center justify-center cursor-pointer hover:border-accent transition-colors rounded-sm group bg-secondary/5"
                           >
                              <UploadCloud className="w-8 h-8 text-secondary group-hover:text-accent transition-colors mb-4" />
                              {selectedFile ? (
                                <p className="font-serif italic text-lg text-text-main">{selectedFile.name}</p>
                              ) : (
                                <p className="font-serif italic text-lg text-text-muted">Browse Cover Image</p>
                              )}
                              <input 
                                type="file"
                                ref={fileInputRef}
                                onChange={(e) => e.target.files?.[0] && setSelectedFile(e.target.files[0])}
                                accept="image/*"
                                className="hidden"
                              />
                           </div>
                         )}
                       </div>
                    </div>

                    <div className="space-y-3">
                       <label className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold block">Excerpt (Short Summary)</label>
                       <textarea 
                          required
                          rows={10}
                          value={formData.excerpt}
                          onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                          className="w-full bg-secondary/5 border border-secondary/60 p-6 outline-none focus:border-accent text-base font-light italic font-serif leading-relaxed h-[calc(100%-2rem)]"
                          placeholder="A brief glimpse into this story..."
                       />
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold block">Full Narrative (Markdown Supported)</label>
                    <textarea 
                       required
                       rows={12}
                       value={formData.content}
                       onChange={(e) => setFormData({...formData, content: e.target.value})}
                       className="w-full bg-secondary/5 border border-secondary/60 p-8 outline-none focus:border-accent text-lg font-light italic font-serif leading-relaxed"
                       placeholder="Write your heart out here..."
                    />
                 </div>

                 <div className="pt-8 border-t border-secondary/60">
                    <button 
                       disabled={submitting}
                       type="submit" 
                       className="group relative w-full md:w-auto md:min-w-[300px] overflow-hidden bg-text-main py-6 px-12 font-bold text-white transition-all rounded-sm shadow-xl mx-auto block disabled:opacity-70"
                    >
                       <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                       <span className="relative z-10 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.5em]">
                         {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                         {submitting ? "Publishing..." : editingBlog ? "Preserve Changes" : "Publish to Journal"}
                       </span>
                    </button>
                 </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
