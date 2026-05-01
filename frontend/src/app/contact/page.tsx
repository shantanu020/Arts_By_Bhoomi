"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Upload, Camera, Mail, Phone, ArrowRight, Sparkles, MoveRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function ContactPage() {
  const [requestType, setRequestType] = useState<"general" | "custom">("custom");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Your inquiry has been sent to the studio. I will get back to you shortly.");
    }, 1500);
  };

  return (
    <div className="bg-[#fcfcf9] min-h-screen relative overflow-hidden">
      {/* Background Decorative Aura */}
      <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 py-40 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 items-start">
          
          {/* Left Column: Info & Contact Details */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-4 mb-8">
                 <span className="h-[1px] w-12 bg-accent" />
                 <span className="text-accent text-[11px] uppercase tracking-[0.5em] font-bold">Studio Inquiries</span>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <h1 className="text-6xl md:text-8xl font-serif mb-12 leading-[0.9] tracking-tighter italic">
                Let's create <br />
                <span className="text-accent/80">something</span><br/>
                meaningful.
              </h1>
            </Reveal>

            <Reveal delay={0.4}>
              <p className="text-xl text-text-muted mb-20 max-w-md font-light leading-relaxed italic font-serif">
                Whether you're seeking a centerpiece for your private collection or a custom-tailored commission, the studio is open for dialogue.
              </p>
            </Reveal>

            <div className="space-y-12">
              {[
                { icon: Camera, label: "Digital Atelier", value: "@artsbybhoomi", link: "#" },
                { icon: Mail, label: "Direct Correspondence", value: "hello@artsbybhoomi.com", link: "mailto:hello@artsbybhoomi.com" },
                { icon: Phone, label: "Private Line", value: "+91 98765 43210", link: "tel:+919876543210" }
              ].map((contact, idx) => (
                <Reveal key={idx} delay={0.6 + idx * 0.1}>
                  <a 
                    href={contact.link}
                    className="flex items-center gap-8 group cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-full bg-white border border-secondary/60 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-700 shadow-sm relative overflow-hidden">
                      <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                      <contact.icon className="w-5 h-5 relative z-10 text-text-main group-hover:text-white transition-colors duration-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-text-muted uppercase tracking-[0.3em] mb-2 font-bold">{contact.label}</p>
                      <p className="font-serif text-2xl italic group-hover:text-accent transition-colors duration-500">{contact.value}</p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.4}>
              <div className="bg-white/40 backdrop-blur-2xl rounded-sm p-10 md:p-20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-white/60 relative overflow-hidden">
                {/* Decorative Sparkle */}
                <div className="absolute top-10 right-10 opacity-10">
                   <Sparkles className="w-20 h-20 text-accent" />
                </div>
                
                <div className="flex gap-10 mb-16 relative z-10 border-b border-secondary/60 pb-8">
                  <button
                    type="button"
                    onClick={() => setRequestType("custom")}
                    className={`relative text-[11px] uppercase tracking-[0.4em] font-bold transition-all duration-500 ${
                      requestType === "custom" ? "text-accent" : "text-text-muted hover:text-text-main"
                    }`}
                  >
                    Commission a Piece
                    {requestType === "custom" && (
                      <motion.div layoutId="tab" className="absolute -bottom-[33px] left-0 right-0 h-[2px] bg-accent" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRequestType("general")}
                    className={`relative text-[11px] uppercase tracking-[0.4em] font-bold transition-all duration-500 ${
                      requestType === "general" ? "text-accent" : "text-text-muted hover:text-text-main"
                    }`}
                  >
                    General Inquiry
                    {requestType === "general" && (
                      <motion.div layoutId="tab" className="absolute -bottom-[33px] left-0 right-0 h-[2px] bg-accent" />
                    )}
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="relative group">
                      <label className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold block mb-4">Collector Name</label>
                      <input 
                        required 
                        type="text" 
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-transparent border-b border-secondary/60 py-4 outline-none transition-colors focus:border-accent text-lg font-serif italic" 
                        placeholder="Bhoomi Singh" 
                      />
                      <motion.div 
                        animate={{ width: focusedField === "name" ? "100%" : "0%" }}
                        className="absolute bottom-0 left-0 h-[1px] bg-accent"
                      />
                    </div>
                    
                    <div className="relative group">
                      <label className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold block mb-4">Email Protocol</label>
                      <input 
                        required 
                        type="email" 
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-transparent border-b border-secondary/60 py-4 outline-none transition-colors focus:border-accent text-lg font-serif italic" 
                        placeholder="hello@example.com" 
                      />
                      <motion.div 
                        animate={{ width: focusedField === "email" ? "100%" : "0%" }}
                        className="absolute bottom-0 left-0 h-[1px] bg-accent"
                      />
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {requestType === "custom" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="relative"
                      >
                        <label className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold block mb-4">Proposed Budget</label>
                        <select className="w-full bg-transparent border-b border-secondary/60 py-4 outline-none focus:border-accent transition-colors text-lg font-serif italic appearance-none cursor-pointer">
                          <option value="">Select an investment range...</option>
                          <option value="under5k">Under ₹15,000</option>
                          <option value="5kto15k">₹15,000 - ₹30,000</option>
                          <option value="over30k">₹30,000+</option>
                        </select>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="relative group">
                    <label className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold block mb-4">Message</label>
                    <textarea 
                      required 
                      rows={4} 
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-transparent border-b border-secondary/60 py-4 outline-none transition-colors focus:border-accent resize-none text-lg leading-relaxed font-serif italic" 
                      placeholder={requestType === "custom" ? "Describe your vision, subject, and desired dimensions..." : "Tell us how we can assist you..."}
                    ></textarea>
                    <motion.div 
                      animate={{ width: focusedField === "message" ? "100%" : "0%" }}
                      className="absolute bottom-1 left-0 h-[1px] bg-accent"
                    />
                  </div>

                  {requestType === "custom" && (
                    <div className="space-y-6">
                      <label className="text-[9px] uppercase tracking-[0.3em] text-text-muted font-bold block">Moodboard / References</label>
                      <div className="border border-dashed border-secondary hover:border-accent hover:bg-accent/[0.02] transition-all duration-700 p-12 rounded-sm text-center cursor-pointer group/upload">
                        <Upload className="w-8 h-8 text-text-muted/40 group-hover/upload:text-accent group-hover/upload:scale-110 transition-all duration-500 mx-auto mb-4" />
                        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-text-muted group-hover/upload:text-accent transition-colors">Click to Upload Portfolio</p>
                      </div>
                    </div>
                  )}

                  <div className="pt-10">
                    <button 
                      disabled={isSubmitting}
                      type="submit" 
                      className="group relative w-full overflow-hidden bg-text-main py-8 font-bold text-white transition-all disabled:opacity-70 rounded-sm shadow-3xl"
                    >
                      <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                      <span className="relative z-10 flex items-center justify-center gap-6 text-[11px] uppercase tracking-[0.6em]">
                        {isSubmitting ? "Dispatching Inquiry..." : "Send Correspondence"}
                        {!isSubmitting && <MoveRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Decorative vertical divider */}
      <div className="pb-32 flex justify-center opacity-10">
         <div className="h-48 w-[1px] bg-gradient-to-b from-accent to-transparent" />
      </div>
    </div>
  );
}
