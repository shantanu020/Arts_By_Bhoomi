"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="w-full flex-1">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full bg-secondary flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2000&auto=format&fit=crop"
          alt="Artist Studio"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-light text-white mb-4 tracking-tight">The Artist Behind the Canvas</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light tracking-wide">
            "Art is not what you see, but what you make others see."
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="max-w-5xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-light mb-6 tracking-tight">My Journey</h2>
            <div className="space-y-4 text-text-muted leading-relaxed">
              <p>
                Hi, I'm Bhoomi Singh. My journey with art began long before I could put it into words. It started with graphite smudges on notebook margins and has blossomed into a lifelong pursuit of capturing emotion on canvas.
              </p>
              <p>
                Through "Arts by Bhoomi", I share not just my finished pieces, but the raw, unpolished process of creation. My work spans across acrylics, charcoal sketches, and digital mediums, always striving to find the delicate balance between realism and abstract expression.
              </p>
              <p>
                Every stroke tells a story. Whether it's a vibrant landscape that evokes nostalgia or a commissioned portrait that captures a fleeting memory, my goal is to create art that resonates deeply with you.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square md:aspect-[4/5] bg-secondary rounded-lg overflow-hidden"
          >
             <Image
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop"
                alt="Bhoomi Painting"
                fill
                className="object-cover"
              />
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-text-main text-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-light mb-8">My Philosophy</h2>
          <p className="text-xl md:text-2xl font-light leading-relaxed text-white/80 italic">
            "I believe that art should be accessible, emotional, and deeply personal. It's a conversation between the creator and the observer, a shared moment of vulnerability suspended in time."
          </p>
        </div>
      </section>
    </div>
  );
}
