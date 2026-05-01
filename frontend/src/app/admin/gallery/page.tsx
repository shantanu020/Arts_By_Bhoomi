"use client";

import { useEffect, useState, useRef } from "react";
import { Plus, Trash2, Loader2, Image as ImageIcon, UploadCloud, Link as LinkIcon } from "lucide-react";
import api from "@/lib/api";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [inputType, setInputType] = useState<"url" | "upload">("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({ title: "", category: "Acrylic", imageUrl: "", displayOrder: 0 });

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const { data } = await api.get("/gallery");
      setItems(data);
    } catch (err) {
      console.error("Failed to fetch gallery");
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let finalImageUrl = formData.imageUrl;

      if (inputType === "upload" && selectedFile) {
        const uploadData = new FormData();
        uploadData.append("image", selectedFile);
        
        const uploadRes = await api.post("/upload", uploadData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        
        finalImageUrl = uploadRes.data.image;
      } else if (inputType === "upload" && !selectedFile) {
        alert("Please select a file to upload.");
        setSubmitting(false);
        return;
      }

      await api.post("/gallery", { ...formData, imageUrl: finalImageUrl });
      
      setIsAdding(false);
      setFormData({ title: "", category: "Acrylic", imageUrl: "", displayOrder: 0 });
      setSelectedFile(null);
      fetchGalleryItems();
    } catch (err) {
      console.error("Failed to add item", err);
      alert("Failed to upload. Ensure the file is a valid image under 5MB.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this from the gallery?")) {
      try {
        await api.delete(`/gallery/${id}`);
        fetchGalleryItems();
      } catch (err) {
        console.error("Failed to delete item");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-12">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
             <span className="h-[1px] w-12 bg-accent" />
             <span className="text-accent text-[11px] uppercase tracking-[0.5em] font-bold">Curation</span>
          </div>
          <h1 className="text-5xl font-serif italic tracking-tighter">Gallery Management</h1>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-text-main text-white px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-accent transition-colors flex items-center gap-3 rounded-sm"
        >
          {isAdding ? "Cancel" : <><Plus className="w-4 h-4" /> Add Artwork</>}
        </button>
      </div>

      {isAdding && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-white/40 backdrop-blur-xl p-8 border border-secondary/60 rounded-sm shadow-xl"
        >
          <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-text-muted">Title</label>
              <input 
                required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-white/50 border border-secondary/60 p-4 font-serif italic outline-none focus:border-accent"
                placeholder="Artwork Title"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-text-muted">Category</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full bg-white/50 border border-secondary/60 p-4 font-serif italic outline-none focus:border-accent"
              >
                {["Acrylic", "Pencil", "Digital", "Watercolor", "Other"].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-2 space-y-4">
              <div className="flex gap-4 border-b border-secondary/40 pb-4">
                 <button 
                   type="button"
                   onClick={() => setInputType("upload")}
                   className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold pb-2 border-b-2 transition-colors ${inputType === "upload" ? "border-accent text-accent" : "border-transparent text-text-muted hover:text-text-main"}`}
                 >
                   <UploadCloud className="w-4 h-4" /> Upload File
                 </button>
                 <button 
                   type="button"
                   onClick={() => setInputType("url")}
                   className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold pb-2 border-b-2 transition-colors ${inputType === "url" ? "border-accent text-accent" : "border-transparent text-text-muted hover:text-text-main"}`}
                 >
                   <LinkIcon className="w-4 h-4" /> Image URL
                 </button>
              </div>

              {inputType === "url" ? (
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-text-muted">Image URL</label>
                  <input 
                    required={inputType === "url"}
                    value={formData.imageUrl}
                    onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                    className="w-full bg-white/50 border border-secondary/60 p-4 font-serif italic outline-none focus:border-accent"
                    placeholder="https://..."
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-text-muted">Select Image</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-white/50 border-2 border-dashed border-secondary/60 p-8 flex flex-col items-center justify-center cursor-pointer hover:border-accent transition-colors rounded-sm group"
                  >
                     <UploadCloud className="w-8 h-8 text-secondary group-hover:text-accent transition-colors mb-4" />
                     {selectedFile ? (
                       <p className="font-serif italic text-lg text-text-main">{selectedFile.name}</p>
                     ) : (
                       <>
                         <p className="font-serif italic text-lg text-text-muted">Click to browse your computer</p>
                         <p className="text-[9px] uppercase tracking-[0.2em] text-text-muted mt-2">JPG, PNG, WEBP (Max 5MB)</p>
                       </>
                     )}
                     <input 
                       type="file"
                       ref={fileInputRef}
                       onChange={handleFileChange}
                       accept="image/*"
                       className="hidden"
                     />
                  </div>
                </div>
              )}
            </div>

            <div className="md:col-span-2 flex justify-end mt-4">
               <button disabled={submitting} type="submit" className="bg-accent text-white px-8 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-text-main transition-colors rounded-sm disabled:opacity-70 flex items-center gap-3">
                 {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                 {submitting ? "Publishing..." : "Publish to Gallery"}
               </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={item._id} 
            className="group relative bg-white/40 backdrop-blur-xl border border-secondary/60 rounded-sm overflow-hidden"
          >
            <div className="aspect-square relative overflow-hidden bg-secondary/20">
              {item.imageUrl ? (
                <Image 
                  src={item.imageUrl} 
                  alt={item.title} 
                  fill 
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-secondary">
                  <ImageIcon className="w-12 h-12 opacity-50" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10">
                <button 
                  onClick={() => handleDelete(item._id)}
                  className="bg-white/10 backdrop-blur-md text-white p-4 rounded-full hover:bg-red-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 text-center border-t border-secondary/60">
              <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-accent mb-2">{item.category}</p>
              <h3 className="font-serif italic text-2xl">{item.title}</h3>
            </div>
          </motion.div>
        ))}

        {items.length === 0 && !isAdding && (
          <div className="col-span-full py-20 text-center border border-dashed border-secondary/60 bg-white/20 rounded-sm">
            <ImageIcon className="w-12 h-12 mx-auto text-text-muted opacity-50 mb-4" />
            <p className="font-serif italic text-xl text-text-muted">No artwork in gallery yet</p>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent mt-2">Add your first piece</p>
          </div>
        )}
      </div>
    </div>
  );
}
