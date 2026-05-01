"use client";

import { useState, useEffect } from "react";
import { Loader2, Package, Truck, CheckCircle, IndianRupee, Eye, ExternalLink, Calendar, MapPin, User, Mail, Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import Image from "next/image";

interface Order {
  _id: string;
  guestEmail: string;
  orderItems: any[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders");
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const markAsDelivered = async (id: string) => {
    try {
      await api.put(`/orders/${id}/deliver`);
      fetchOrders(); // Refresh
      if (selectedOrder?._id === id) {
        setSelectedOrder({ ...selectedOrder, isDelivered: true, deliveredAt: new Date().toISOString() });
      }
    } catch (err) {
      alert("Failed to update delivery status");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-4">
           <span className="h-[1px] w-12 bg-accent" />
           <span className="text-accent text-[11px] uppercase tracking-[0.5em] font-bold">Sales Registry</span>
        </div>
        <h1 className="text-5xl font-serif italic tracking-tighter">Collector Acquisitions</h1>
      </div>

      {loading ? (
        <div className="h-96 flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-accent" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* List of Orders */}
          <div className="lg:col-span-6 space-y-6">
            {orders.map((order) => (
              <motion.div 
                key={order._id}
                layoutId={order._id}
                onClick={() => setSelectedOrder(order)}
                className={`p-8 rounded-sm border transition-all duration-500 cursor-pointer ${
                  selectedOrder?._id === order._id 
                    ? "bg-white border-accent shadow-2xl scale-[1.01]" 
                    : "bg-white/40 border-secondary/60 hover:bg-white/60"
                }`}
              >
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-lg font-serif italic mb-1">{order.shippingAddress.fullName}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Acquisition #{order._id.slice(-8)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${
                      order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {order.isPaid ? "Payment Secured" : "Pending Payment"}
                    </span>
                    <span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${
                      order.isDelivered ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                    }`}>
                      {order.isDelivered ? "Dispatched & Received" : "Awaiting Shipment"}
                    </span>
                  </div>
                </div>
                
                <div className="flex -space-x-4 mb-8">
                   {order.orderItems.map((item, idx) => (
                     <div key={idx} className="w-12 h-16 relative rounded-sm border-2 border-white overflow-hidden shadow-sm bg-secondary/10">
                        {item.image ? (
                          <Image 
                            src={item.image} 
                            alt={item.title} 
                            fill 
                            unoptimized
                            className="object-cover" 
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-[8px] text-text-muted">No Image</div>
                        )}
                     </div>
                   ))}
                </div>

                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold">
                  <div className="flex items-center gap-2 text-text-muted">
                    <Calendar className="w-3 h-3" />
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1 text-accent text-lg font-serif italic">
                    <span>₹</span>
                    {order.totalPrice.toLocaleString('en-IN')}
                  </div>
                </div>
              </motion.div>
            ))}
            {orders.length === 0 && (
              <div className="h-64 flex flex-col items-center justify-center text-text-muted italic border-2 border-dashed border-secondary/60 rounded-sm">
                 <p>No acquisitions in the registry yet.</p>
              </div>
            )}
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              {selectedOrder ? (
                <motion.div 
                  key="details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="sticky top-12 bg-white p-12 rounded-sm shadow-4xl border border-secondary/40 space-y-16"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-serif italic mb-2">Manifest Details</h2>
                    </div>
                    <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-secondary/40 rounded-full transition-colors">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold">Collector Info</p>
                      <div className="space-y-3">
                         <div className="flex items-center gap-3 text-sm font-serif italic">
                            <User className="w-4 h-4 text-accent" />
                            {selectedOrder.shippingAddress.fullName}
                         </div>
                         <div className="flex items-center gap-3 text-sm font-serif italic">
                            <Mail className="w-4 h-4 text-accent" />
                            {selectedOrder.guestEmail}
                         </div>
                         <div className="flex items-center gap-3 text-sm font-serif italic">
                            <Phone className="w-4 h-4 text-accent" />
                            {selectedOrder.shippingAddress.phone}
                         </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold">Shipping Destination</p>
                      <div className="flex gap-3 text-sm font-serif italic leading-relaxed">
                         <MapPin className="w-4 h-4 text-accent shrink-0 mt-1" />
                         <div>
                            {selectedOrder.shippingAddress.address}<br/>
                            {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}<br/>
                            {selectedOrder.shippingAddress.country}
                         </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold">Acquired Pieces</p>
                    <div className="space-y-6">
                       {selectedOrder.orderItems.map((item, idx) => (
                         <div key={idx} className="flex items-center gap-6 p-4 bg-secondary/10 rounded-sm">
                            <div className="w-16 h-20 relative rounded-sm overflow-hidden bg-white">
                               {item.image ? (
                                 <Image 
                                   src={item.image} 
                                   alt={item.title} 
                                   fill 
                                   unoptimized
                                   className="object-cover" 
                                 />
                               ) : (
                                 <div className="absolute inset-0 flex items-center justify-center text-[10px] text-text-muted">N/A</div>
                               )}
                            </div>
                            <div className="flex-1">
                               <p className="font-serif italic text-lg">{item.title}</p>
                               <p className="text-[10px] uppercase tracking-widest text-text-muted">Quantity: {item.qty}</p>
                            </div>
                            <p className="font-serif italic text-accent">₹{item.price.toLocaleString('en-IN')}</p>
                         </div>
                       ))}
                       <div className="pt-6 border-t border-secondary/60 flex justify-between items-center">
                          <p className="text-[10px] uppercase tracking-[0.4em] font-bold">Total Acquisition Value</p>
                          <p className="text-3xl font-serif italic text-accent">₹{selectedOrder.totalPrice.toLocaleString('en-IN')}</p>
                       </div>
                    </div>
                  </div>

                  <div className="pt-12 border-t border-secondary/60 grid grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <p className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold">Payment Status</p>
                        <div className={`flex items-center gap-3 font-serif italic text-lg ${selectedOrder.isPaid ? "text-green-600" : "text-red-500"}`}>
                           {selectedOrder.isPaid ? <CheckCircle className="w-5 h-5" /> : <Loader2 className="w-5 h-5 animate-spin" />}
                           {selectedOrder.isPaid ? `Paid on ${new Date(selectedOrder.paidAt!).toLocaleDateString()}` : "Awaiting Verification"}
                        </div>
                     </div>
                     <div className="space-y-4">
                        <p className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold">Shipment Protocol</p>
                        {selectedOrder.isDelivered ? (
                           <div className="flex items-center gap-3 font-serif italic text-lg text-blue-600">
                              <Truck className="w-5 h-5" />
                              Delivered on {new Date(selectedOrder.deliveredAt!).toLocaleDateString()}
                           </div>
                        ) : (
                           <button 
                             onClick={() => markAsDelivered(selectedOrder._id)}
                             className="group relative overflow-hidden bg-text-main px-8 py-4 font-bold text-white transition-all rounded-sm shadow-xl flex items-center justify-center gap-3 w-full"
                           >
                              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                              <span className="relative z-10 flex items-center gap-3 text-[9px] uppercase tracking-[0.3em]">
                                <Package className="w-4 h-4" />
                                Execute Dispatch
                              </span>
                           </button>
                        )}
                     </div>
                  </div>
                </motion.div>
              ) : (
                <div className="sticky top-12 h-[600px] bg-secondary/10 border-2 border-dashed border-secondary/60 rounded-sm flex flex-col items-center justify-center text-center p-12 text-text-muted">
                   <Package className="w-16 h-16 mb-8 opacity-20" />
                   <p className="text-2xl font-serif italic mb-2">Select an acquisition</p>
                   <p className="text-[10px] uppercase tracking-[0.3em] font-bold">to view complete manifest documentation</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
