"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Upload, Camera, Mail, Phone } from "lucide-react";

export default function ContactPage() {
  const [requestType, setRequestType] = useState<"general" | "custom">("custom");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Request submitted successfully! I will get back to you soon.");
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 w-full flex-1">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Column: Info & Contact Details */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="sticky top-24"
        >
          <h1 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">Let's create something beautiful together.</h1>
          <p className="text-lg text-text-muted mb-12">
            Whether you are looking to purchase an existing piece, commission a custom artwork, 
            or just want to say hello, I'd love to hear from you.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-text-main group-hover:text-white transition-colors">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-text-muted uppercase tracking-wider mb-1">Follow my journey</p>
                <p className="font-medium">@artsbybhoomi</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-text-main group-hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-text-muted uppercase tracking-wider mb-1">General Inquiries</p>
                <p className="font-medium">hello@artsbybhoomi.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-text-main group-hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-text-muted uppercase tracking-wider mb-1">WhatsApp Chat</p>
                <p className="font-medium">+91 98765 43210</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Dynamic Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-secondary/50 rounded-2xl p-8 md:p-10 border border-secondary"
        >
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setRequestType("custom")}
              className={`flex-1 py-3 border-b-2 transition-all duration-300 font-medium ${
                requestType === "custom" 
                  ? "border-text-main text-text-main" 
                  : "border-transparent text-text-muted hover:text-text-main"
              }`}
            >
              Custom Artwork
            </button>
            <button
              onClick={() => setRequestType("general")}
              className={`flex-1 py-3 border-b-2 transition-all duration-300 font-medium ${
                requestType === "general" 
                  ? "border-text-main text-text-main" 
                  : "border-transparent text-text-muted hover:text-text-main"
              }`}
            >
              General Inquiry
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <input required type="text" className="w-full bg-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-accent/50 transition-shadow" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input required type="email" className="w-full bg-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-accent/50 transition-shadow" placeholder="your@email.com" />
              </div>
            </div>

            {requestType === "custom" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Budget Range (Optional)</label>
                <select className="w-full bg-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-accent/50 transition-shadow text-text-main">
                  <option value="">Select a range...</option>
                  <option value="under5k">Under ₹5,000</option>
                  <option value="5kto15k">₹5,000 - ₹15,000</option>
                  <option value="15kto30k">₹15,000 - ₹30,000</option>
                  <option value="over30k">₹30,000+</option>
                </select>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {requestType === "custom" ? "Describe your vision" : "Message"}
              </label>
              <textarea 
                required 
                rows={5} 
                className="w-full bg-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-accent/50 transition-shadow resize-none" 
                placeholder={requestType === "custom" ? "Tell me about the size, subject, colors, and overall mood..." : "How can I help you?"}
              ></textarea>
            </div>

            {requestType === "custom" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Reference Images (Optional)</label>
                <div className="border-2 border-dashed border-text-muted/30 rounded-md p-8 flex flex-col items-center justify-center text-center hover:border-accent transition-colors cursor-pointer bg-white">
                  <Upload className="w-8 h-8 text-text-muted mb-3" />
                  <p className="text-sm font-medium">Click to upload or drag & drop</p>
                  <p className="text-xs text-text-muted mt-1">SVG, PNG, JPG or GIF (max. 10MB)</p>
                </div>
              </div>
            )}

            <button 
              disabled={isSubmitting}
              type="submit" 
              className="w-full bg-text-main text-white py-4 rounded-md font-medium hover:bg-black transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              {!isSubmitting && <Send className="w-4 h-4" />}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
