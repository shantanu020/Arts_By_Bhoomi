"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Edit, Trash2, X, Loader2, Image as ImageIcon, IndianRupee, Save, Upload } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    category: "Paintings",
    images: [] as string[],
    stock: 1,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const isValidImageSrc = (src: any) => {
    return typeof src === 'string' && src.length > 0;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append("image", file);

    try {
      const { data } = await api.post("/upload", uploadFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData({ ...formData, images: [data.image] });
    } catch (err) {
      alert("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        images: product.images || [],
        stock: product.stock,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        title: "",
        description: "",
        price: 0,
        category: "Paintings",
        images: [],
        stock: 1,
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this piece from the collection?")) {
      try {
        await api.delete(`/products/${id}`);
        setProducts(products.filter((p) => p._id !== id));
      } catch (err) {
        alert("Failed to delete product");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.images || formData.images.length === 0 || !isValidImageSrc(formData.images[0])) {
      alert("Please upload at least one image for the masterpiece.");
      return;
    }

    try {
      if (editingProduct) {
        const { data } = await api.put(`/products/${editingProduct._id}`, formData);
        setProducts(products.map((p) => (p._id === data._id ? data : p)));
      } else {
        const { data } = await api.post("/products", formData);
        setProducts([data, ...products]);
      }
      setIsModalOpen(false);
    } catch (err) {
      alert("Failed to save product. Check if all required fields are filled.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-end mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
             <span className="h-[1px] w-12 bg-accent" />
             <span className="text-accent text-[11px] uppercase tracking-[0.5em] font-bold">Inventory Control</span>
          </div>
          <h1 className="text-5xl font-serif italic tracking-tighter">Art Collection</h1>
          <p className="text-sm text-text-muted font-light italic font-serif">Curate and manage your exhibition pieces.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="group relative overflow-hidden bg-text-main px-10 py-5 font-bold text-white transition-all rounded-sm shadow-xl"
        >
          <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="relative z-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em]">
            <Plus className="w-4 h-4" />
            Acquire New Piece
          </span>
        </button>
      </div>

      {loading ? (
        <div className="h-96 flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-accent" />
        </div>
      ) : (
        <div className="bg-white/40 backdrop-blur-xl border border-secondary/60 rounded-sm shadow-[0_40px_100px_-200px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-secondary/60">
                  <th className="px-10 py-8 text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">Masterpiece</th>
                  <th className="px-10 py-8 text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">Genre</th>
                  <th className="px-10 py-8 text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">Investment</th>
                  <th className="px-10 py-8 text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">Status</th>
                  <th className="px-10 py-8 text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold text-right">Curation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/40">
                {products.map((item) => (
                  <tr key={item._id} className="group hover:bg-white/40 transition-all duration-500">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-24 bg-secondary/30 rounded-sm overflow-hidden relative border border-secondary/40">
                           {item.images && item.images.length > 0 && isValidImageSrc(item.images[0]) ? (
                             <Image 
                                src={item.images[0]} 
                                alt={item.title} 
                                fill 
                                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                unoptimized
                             />
                           ) : (
                             <div className="absolute inset-0 flex items-center justify-center text-text-muted">
                               <ImageIcon className="w-6 h-6 opacity-20" />
                             </div>
                           )}
                        </div>
                        <div>
                          <p className="text-xl font-serif italic group-hover:text-accent transition-colors duration-500">{item.title}</p>
                          <p className="text-[9px] uppercase tracking-[0.2em] text-text-muted mt-1 font-bold">ID: {item._id.slice(-8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                       <span className="text-xs uppercase tracking-widest text-text-muted font-medium">{item.category}</span>
                    </td>
                    <td className="px-10 py-8">
                       <div className="flex items-center gap-1 text-lg font-serif italic">
                         <span className="text-accent">₹</span>
                         {(item.price || 0).toLocaleString('en-IN')}
                       </div>
                    </td>
                    <td className="px-10 py-8">
                      {item.stock > 0 ? (
                        <div className="flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                           <span className="text-[10px] uppercase tracking-widest text-green-700 font-bold">{item.stock} Available</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]" />
                           <span className="text-[10px] uppercase tracking-widest text-red-700 font-bold">Archived</span>
                        </div>
                      )}
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex items-center justify-end gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <button 
                          onClick={() => handleOpenModal(item)}
                          className="p-3 bg-white text-text-muted hover:text-accent rounded-sm shadow-sm transition-all hover:shadow-md"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item._id)}
                          className="p-3 bg-white text-text-muted hover:text-red-500 rounded-sm shadow-sm transition-all hover:shadow-md"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-text-main/20 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-4xl bg-white rounded-sm shadow-4xl relative z-10 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <div className="w-full md:w-2/5 bg-secondary/20 p-12 flex flex-col items-center justify-center border-r border-secondary/60 overflow-y-auto">
                 <div className="w-full aspect-[3/4] relative bg-white border-2 border-dashed border-secondary flex flex-col items-center justify-center group mb-8 overflow-hidden">
                    {formData.images && formData.images.length > 0 && isValidImageSrc(formData.images[0]) ? (
                      <Image src={formData.images[0]} alt="Preview" fill className="object-cover" unoptimized />
                    ) : (
                      <div className="text-center space-y-4">
                         <ImageIcon className="w-12 h-12 text-secondary mx-auto" />
                         <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-bold">Image Preview</p>
                      </div>
                    )}
                    {isUploading && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                         <Loader2 className="w-8 h-8 animate-spin text-accent" />
                      </div>
                    )}
                 </div>
                 <div className="w-full space-y-6">
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      className="hidden"
                      accept="image/*"
                    />
                    <button 
                      type="button"
                      disabled={isUploading}
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-4 border border-accent text-accent text-[10px] uppercase tracking-widest font-bold hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-3"
                    >
                      <Upload className="w-4 h-4" />
                      {isUploading ? "Uploading..." : "Upload Local Image"}
                    </button>
                    <div className="relative py-4 text-center">
                       <span className="text-[9px] uppercase tracking-widest text-text-muted bg-secondary/20 px-2 relative z-10">OR</span>
                       <div className="absolute top-1/2 left-0 right-0 h-px bg-secondary/60" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold block">Image URL</label>
                      <input 
                        type="text" 
                        value={isValidImageSrc(formData.images[0]) ? formData.images[0] : ""}
                        onChange={(e) => setFormData({...formData, images: [e.target.value]})}
                        className="w-full bg-white border border-secondary/60 py-3 px-4 outline-none focus:border-accent text-xs font-serif italic"
                        placeholder="https://..."
                      />
                    </div>
                 </div>
              </div>

              <div className="flex-1 p-12 overflow-y-auto">
                 <div className="flex justify-between items-start mb-12">
                    <div>
                       <h2 className="text-3xl font-serif italic mb-2">{editingProduct ? "Edit Curation" : "New Collection Addition"}</h2>
                       <p className="text-[9px] uppercase tracking-[0.4em] text-accent font-bold">Masterpiece Details</p>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-secondary/40 rounded-full transition-colors">
                       <X className="w-6 h-6" />
                    </button>
                 </div>

                 <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="space-y-3">
                       <label className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold block">Art Title</label>
                       <input 
                          required
                          type="text" 
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          className="w-full bg-transparent border-b border-secondary/60 py-3 outline-none focus:border-accent text-2xl font-serif italic"
                          placeholder="Untitled Masterpiece"
                       />
                    </div>

                    <div className="grid grid-cols-2 gap-10">
                       <div className="space-y-3">
                          <label className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold block">Investment (INR)</label>
                          <div className="relative">
                             <span className="absolute left-0 top-1/2 -translate-y-1/2 text-accent font-serif italic">₹</span>
                             <input 
                                required
                                type="number" 
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                                className="w-full bg-transparent border-b border-secondary/60 py-3 pl-6 outline-none focus:border-accent text-xl font-serif italic"
                             />
                          </div>
                       </div>
                       <div className="space-y-3">
                          <label className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold block">Genre / Category</label>
                          <select 
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                            className="w-full bg-transparent border-b border-secondary/60 py-3 outline-none focus:border-accent text-xl font-serif italic appearance-none cursor-pointer"
                          >
                             <option value="Paintings">Paintings</option>
                             <option value="Sketches">Sketches</option>
                             <option value="Digital">Digital Art</option>
                             <option value="Photography">Photography</option>
                          </select>
                       </div>
                    </div>

                    <div className="space-y-3">
                       <label className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold block">Narrative / Description</label>
                       <textarea 
                          required
                          rows={4}
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          className="w-full bg-transparent border border-secondary/60 p-6 outline-none focus:border-accent text-base font-light italic font-serif leading-relaxed"
                          placeholder="Describe the story and technical details of this piece..."
                       />
                    </div>

                    <div className="space-y-3">
                       <label className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold block">Available Units (Stock)</label>
                       <input 
                          required
                          type="number" 
                          value={formData.stock}
                          onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                          className="w-full bg-transparent border-b border-secondary/60 py-3 outline-none focus:border-accent text-xl font-serif italic"
                       />
                    </div>

                    <div className="pt-8">
                       <button 
                          type="submit" 
                          disabled={isUploading}
                          className="group relative w-full overflow-hidden bg-text-main py-6 font-bold text-white transition-all rounded-sm shadow-xl disabled:opacity-50"
                       >
                          <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                          <span className="relative z-10 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.5em]">
                            <Save className="w-4 h-4" />
                            {editingProduct ? "Update Curation" : "Confirm Addition"}
                          </span>
                       </button>
                    </div>
                 </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
