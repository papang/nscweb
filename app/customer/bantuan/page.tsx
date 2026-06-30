"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LifeBuoy, ArrowLeft, MessageSquare, Ticket, Phone, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SupportPage() {
  return (
    <main className="relative flex min-h-screen w-full flex-col bg-black text-gray-200 selection:bg-orange-500/30 overflow-hidden font-sans">
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <Image src="/particle7.webp" alt="bg" fill className="object-cover" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.05),transparent)]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-24 lg:px-12">
        
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Link href="/customer" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors mb-6 text-sm font-bold">
              <ArrowLeft size={16} /> Kembali ke Dashboard
            </Link>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h4 className="text-orange-500 text-[10px] font-black uppercase tracking-[0.5em] mb-3 opacity-80">Support Center</h4>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Pusat Bantuan</h1>
            </motion.div>
          </div>
        </div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-2xl mb-12"
        >
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-500" />
          </div>
          <input 
            type="text" 
            placeholder="Cari solusi masalah Anda (contoh: Internet lambat, ganti password...)" 
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all shadow-inner"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: <MessageSquare size={24}/>, title: "Live Chat", desc: "Ngobrol langsung dengan teknisi kami (Respon < 5 menit)." },
            { icon: <Ticket size={24}/>, title: "Tiket Keluhan", desc: "Pantau status tiket perbaikan jaringan Anda." },
            { icon: <Phone size={24}/>, title: "Call Center", desc: "Hubungi layanan prioritas di 1500-NSC (Bebas Pulsa)." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="bg-[#111111] border border-white/5 rounded-[24px] p-8 hover:border-orange-500/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.1)] transition-all"
            >
              <div className="p-4 bg-orange-500/10 border border-orange-500/20 inline-block rounded-2xl text-orange-500 mb-6">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
      <Footer />
    </main>
  );
}