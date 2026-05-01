"use client";

import { useState, useEffect } from "react";
import { Loader2, Mail, Clock, CheckCircle, Trash2, Eye, ExternalLink, Calendar, X, Sparkles, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import Image from "next/image";

interface CollectorRequest {
  _id: string;
  name: string;
  email: string;
  budget?: string;
  message: string;
  type: string;
  attachments?: string[];
  status: string;
  createdAt: string;
}

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<CollectorRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<CollectorRequest | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data } = await api.get("/inquiries");
      // Filter out archived by default
      setRequests(data.filter((r: CollectorRequest) => r.status !== 'archived'));
    } catch (err) {
      console.error("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await api.patch(`/inquiries/${id}`, { status: newStatus });
      
      if (newStatus === 'archived') {
        setRequests(requests.filter(r => r._id !== id));
        setSelectedRequest(null);
      } else {
        setRequests(requests.map(r => r._id === id ? { ...r, status: newStatus } : r));
        if (selectedRequest?._id === id) {
          setSelectedRequest({ ...selectedRequest, status: newStatus });
        }
      }
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-4">
           <span className="h-[1px] w-12 bg-accent" />
           <span className="text-accent text-[11px] uppercase tracking-[0.5em] font-bold">Collector Dialogue</span>
        </div>
        <h1 className="text-5xl font-serif italic tracking-tighter">Inquiries & Commissions</h1>
      </div>

      {loading ? (
        <div className="h-96 flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-accent" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* List of Requests */}
          <div className="lg:col-span-7 space-y-6">
            {requests.map((request) => (
              <motion.div 
                key={request._id}
                layoutId={request._id}
                onClick={() => setSelectedRequest(request)}
                className={`p-8 rounded-sm border transition-all duration-500 cursor-pointer group ${
                  selectedRequest?._id === request._id 
                    ? "bg-white border-accent shadow-2xl scale-[1.01]" 
                    : "bg-white/40 border-secondary/60 hover:bg-white/60"
                }`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center text-accent font-serif italic text-xl">
                      {request.name[0]}
                    </div>
                    <div>
                      <h3 className="text-lg font-serif italic">{request.name}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-text-muted font-bold">{request.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full ${
                      request.status === 'new' ? "bg-orange-100 text-orange-700" :
                      request.status === 'responded' ? "bg-blue-100 text-blue-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {request.status}
                    </span>
                    <span className="text-[8px] uppercase tracking-widest text-accent font-bold">{request.type}</span>
                  </div>
                </div>
                <p className="text-sm text-text-muted italic font-serif line-clamp-2 mb-6">"{request.message}"</p>
                <div className="flex items-center justify-between text-[9px] uppercase tracking-widest font-bold text-text-muted">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {new Date(request.createdAt).toLocaleDateString()}
                  </div>
                  {request.budget && (
                    <div className="flex items-center gap-2 text-accent">
                       Budget: {request.budget}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {requests.length === 0 && (
              <div className="h-96 flex flex-col items-center justify-center text-text-muted italic border border-dashed border-secondary/60 rounded-sm bg-white/20">
                 <MessageSquare className="w-12 h-12 mb-6 opacity-20" />
                 <p className="text-xl font-serif">The archive is currently quiet.</p>
                 <p className="text-[9px] uppercase tracking-[0.2em] font-bold mt-2">No active inquiries to display</p>
              </div>
            )}
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-5 relative">
            <AnimatePresence mode="wait">
              {selectedRequest ? (
                <motion.div 
                  key="details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="sticky top-12 bg-white p-12 rounded-sm shadow-4xl border border-secondary/40 space-y-12"
                >
                  <div className="flex justify-between items-start">
                    <h2 className="text-3xl font-serif italic">Inquiry Details</h2>
                    <button onClick={() => setSelectedRequest(null)} className="p-2 hover:bg-secondary/40 rounded-full transition-colors">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold">Collector Identity</p>
                      <div className="p-6 bg-secondary/10 rounded-sm">
                        <p className="text-xl font-serif italic mb-2">{selectedRequest.name}</p>
                        <p className="text-sm text-accent flex items-center gap-2">
                          <Mail className="w-3 h-3" />
                          {selectedRequest.email}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold">Message / Vision</p>
                      <p className="text-lg leading-relaxed font-serif italic text-text-main">
                        "{selectedRequest.message}"
                      </p>
                    </div>

                    {selectedRequest.attachments && selectedRequest.attachments.length > 0 && (
                      <div className="space-y-4">
                        <p className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold">Visual References</p>
                        <div className="grid grid-cols-1 gap-4">
                          {selectedRequest.attachments.map((url, i) => (
                            <div key={i} className="relative aspect-video rounded-sm overflow-hidden border border-secondary shadow-sm group bg-secondary/10">
                               <Image 
                                 src={url} 
                                 alt="Reference" 
                                 fill 
                                 unoptimized
                                 className="object-cover transition-transform duration-700 group-hover:scale-110" 
                               />
                               <a 
                                 href={url} 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-[10px] uppercase tracking-widest font-bold z-10"
                               >
                                 View Full Image
                               </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <p className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold">Proposed Budget</p>
                          <p className="text-xl font-serif italic text-accent">{selectedRequest.budget || "N/A"}</p>
                       </div>
                       <div className="space-y-2">
                          <p className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold">Status Protocol</p>
                          <p className="text-xl font-serif italic uppercase text-text-main">{selectedRequest.status}</p>
                       </div>
                    </div>
                  </div>

                  <div className="pt-12 border-t border-secondary/60 grid grid-cols-2 gap-6">
                    <button 
                      onClick={() => updateStatus(selectedRequest._id, 'responded')}
                      className="flex flex-col items-center justify-center gap-2 py-6 border border-secondary text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-secondary/20 transition-all rounded-sm group/btn"
                    >
                      <CheckCircle className={`w-5 h-5 transition-colors ${selectedRequest.status === 'responded' ? 'text-green-600' : 'text-text-muted group-hover/btn:text-green-600'}`} />
                      <span>{selectedRequest.status === 'responded' ? 'Responded' : 'Mark Responded'}</span>
                    </button>
                    <button 
                      onClick={() => updateStatus(selectedRequest._id, 'archived')}
                      className="flex flex-col items-center justify-center gap-2 py-6 bg-text-main text-white text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-accent transition-all rounded-sm shadow-xl"
                    >
                      <Trash2 className="w-5 h-5" />
                      <span>Archive Request</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="sticky top-12 h-[600px] bg-secondary/10 border-2 border-dashed border-secondary/60 rounded-sm flex flex-col items-center justify-center text-center p-12 text-text-muted">
                   <Clock className="w-16 h-16 mb-8 opacity-20" />
                   <p className="text-2xl font-serif italic mb-2">Select an inquiry</p>
                   <p className="text-[10px] uppercase tracking-[0.2em] font-bold">to view complete dialogue manifest</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
