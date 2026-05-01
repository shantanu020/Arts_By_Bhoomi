"use client";

import { useEffect, useState } from "react";
import { DollarSign, ShoppingBag, Eye, Clock, Loader2, ArrowUpRight, TrendingUp, Sparkles } from "lucide-react";
import api from "@/lib/api";
import { motion } from "framer-motion";

export default function AdminDashboardOverview() {
  const [stats, setStats] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, ordersRes] = await Promise.all([
          api.get("/orders/stats"),
          api.get("/orders")
        ]);
        setStats(statsRes.data);
        setRecentOrders(ordersRes.data.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
      </div>
    );
  }

  const revenueTarget = 100000;
  const currentRevenue = stats?.totalRevenue || 0;
  const progressPercent = Math.min(Math.round((currentRevenue / revenueTarget) * 100), 100);

  const statCards = [
    { label: "Total Revenue", value: `₹${currentRevenue.toLocaleString('en-IN')}`, icon: DollarSign, color: "bg-green-500" },
    { label: "Total Acquisitions", value: stats?.totalOrders || 0, icon: ShoppingBag, color: "bg-blue-500" },
    { label: "Recent Inquiries", value: "New", icon: Clock, color: "bg-orange-500" },
    { label: "Studio Pulse", value: "Live", icon: Sparkles, color: "bg-accent" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-12">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
             <span className="h-[1px] w-12 bg-accent" />
             <span className="text-accent text-[11px] uppercase tracking-[0.5em] font-bold">Studio Performance</span>
          </div>
          <h1 className="text-5xl font-serif italic tracking-tighter">Dashboard Overview</h1>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="bg-white/40 backdrop-blur-xl p-8 rounded-sm border border-secondary/60 shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <ArrowUpRight className="w-4 h-4 text-accent" />
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-sm ${stat.color}/10 flex items-center justify-center text-accent`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">{stat.label}</p>
            </div>
            <p className="text-4xl font-serif italic tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Recent Orders */}
        <div className="lg:col-span-8 bg-white/40 backdrop-blur-xl border border-secondary/60 rounded-sm shadow-2xl overflow-hidden">
          <div className="p-10 border-b border-secondary/60 flex justify-between items-center">
            <h2 className="text-2xl font-serif italic">Recent Acquisitions</h2>
            <button className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent hover:text-text-main transition-colors">View Registry</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-secondary/10">
                  <th className="px-10 py-6 text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold">Collector</th>
                  <th className="px-10 py-6 text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold">Date</th>
                  <th className="px-10 py-6 text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold">Value</th>
                  <th className="px-10 py-6 text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/40">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-white/40 transition-colors group">
                    <td className="px-10 py-8">
                       <p className="font-serif italic text-lg">{order.shippingAddress.fullName}</p>
                       <p className="text-[9px] text-text-muted uppercase tracking-widest font-bold">{order.guestEmail}</p>
                    </td>
                    <td className="px-10 py-8 text-sm text-text-muted italic font-serif">
                       {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-10 py-8">
                       <p className="font-serif italic text-accent text-lg">₹{order.totalPrice.toLocaleString('en-IN')}</p>
                    </td>
                    <td className="px-10 py-8">
                      <span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${
                        order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {order.isPaid ? "Secured" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-10 py-20 text-center text-text-muted italic font-serif">
                      No acquisitions recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Activity */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-text-main p-10 rounded-sm shadow-3xl text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              <h3 className="text-2xl font-serif italic mb-6 relative z-10">Creative Pulse</h3>
              <div className="space-y-6 relative z-10">
                 {recentOrders.length > 0 ? (
                   recentOrders.slice(0, 3).map((order, i) => (
                     <div key={i} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-accent">
                           <ShoppingBag className="w-4 h-4" />
                        </div>
                        <div>
                           <p className="text-[10px] uppercase tracking-widest font-bold">Acquisition Secured</p>
                           <p className="text-[9px] text-white/40 uppercase tracking-widest">₹{order.totalPrice.toLocaleString()}</p>
                        </div>
                     </div>
                   ))
                 ) : (
                   <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Awaiting activity...</p>
                 )}
              </div>
           </div>

           <div className="bg-accent p-10 rounded-sm shadow-3xl text-white">
              <h3 className="text-2xl font-serif italic mb-4">Studio Goal</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] mb-8 font-bold opacity-80">Monthly Performance</p>
              <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden mb-4">
                 <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-white rounded-full" 
                 />
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                 <span>₹{currentRevenue.toLocaleString()} / ₹1,00,000</span>
                 <span>{progressPercent}%</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
