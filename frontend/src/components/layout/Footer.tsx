"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-24 px-6 border-t border-secondary bg-primary">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-xs">
          <h3 className="text-xl font-serif mb-4 italic">Arts by Bhoomi</h3>
          <p className="text-text-muted text-xs leading-relaxed tracking-wider uppercase">
            Curated original artworks and visual stories. Based in India, shipping globally.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-16">
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-text-main">Social</p>
            <div className="flex flex-col gap-2 text-xs text-text-muted">
              <a href="#" className="hover:text-accent transition-colors">Instagram</a>
              <a href="#" className="hover:text-accent transition-colors">Pinterest</a>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-text-main">Inquiries</p>
            <div className="flex flex-col gap-2 text-xs text-text-muted">
              <a href="mailto:hello@artsbybhoomi.com" className="hover:text-accent transition-colors">Email</a>
              <Link href="/contact" className="hover:text-accent transition-colors">Contact Form</Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-secondary flex justify-between items-center text-[8px] uppercase tracking-[0.3em] text-text-muted">
        <p>© {new Date().getFullYear()} Arts by Bhoomi. All rights reserved.</p>
        <p>Built for the extraordinary.</p>
      </div>
    </footer>
  );
}
