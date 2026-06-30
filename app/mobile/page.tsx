"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Compass, Wifi, MapPin, Zap, ArrowRight, PhoneCall } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MobileRoamPage() {
  return (
    <main className="relative flex min-h-screen w-full flex-col bg-black text-gray-200 selection:bg-orange-500/30 overflow-x-hidden font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src="/kemah.webp" 
          alt="Mobile Roaming"
          fill
          priority
          className="object-cover brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500"
          >
            <Compass size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Mobile Roam</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl text-white"
          >
            Koneksi Tanpa Batas <br /> <span className="text-orange-500">Di Mana Saja.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-gray-400 md:text-lg font-medium"
          >
            Bawa internet satelit berkecepatan tinggi ke lokasi terpencil, proyek lapangan, atau petualangan off-grid Anda. Solusi dirancang khusus sesuai kebutuhan mobilitas Anda.
          </motion.p>
        </div>
      </section>

      {/* Fitur Section */}
      <section className="relative z-10 px-6 py-20 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { icon: <MapPin size={24} />, title: "Jangkauan Global", desc: "Terhubung di darat mana pun di wilayah jangkauan aktif satelit LEO NSC." },
            { icon: <Wifi size={24} />, title: "Plug & Play", desc: "Nyalakan perangkat dan sistem akan mencari satelit secara otomatis tanpa ribet." },
            { icon: <Zap size={24} />, title: "High-Speed Data", desc: "Akses kecepatan broadband untuk video call, streaming, & operasional logistik." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-[32px] bg-[#111111] border border-white/5 hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6 group-hover:bg-orange-500 group-hover:text-black transition-all border border-orange-500/20">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA (Custom Solution) */}
        <div className="mt-24 text-center max-w-3xl mx-auto bg-[#111111] p-12 rounded-[40px] border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />
          <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Dapatkan Solusi Mobilitas Anda</h2>
          <p className="text-gray-400 mb-8 font-medium relative z-10">Setiap perjalanan dan proyek memiliki kebutuhan yang unik. Tim ahli kami siap membantu Anda merancang konfigurasi perangkat dan paket data yang paling optimal.</p>
          <Link href="/hubungi-kami" className="relative z-10 inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-orange-500 text-black text-xs font-black uppercase tracking-widest hover:bg-orange-400 transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] active:scale-95">
            <PhoneCall size={18} /> Konsultasi & Hubungi Kami
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}