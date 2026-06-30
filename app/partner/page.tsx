"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Handshake, 
  ArrowRight,
  Network
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Data Partner dengan path logo yang sudah disesuaikan
const partners = [
  {
    id: "telkomsel",
    name: "Telkomsel",
    role: "Telecommunication Partner",
    description: "Berkolaborasi dalam memperluas cakupan backhaul seluler 4G/5G di wilayah 3T menggunakan infrastruktur satelit.",
    image: "/telkomsel.png",
    brandColor: "group-hover:border-red-500/50 group-hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]"
  },
  {
    id: "spacex",
    name: "SpaceX",
    role: "LEO Constellation Provider",
    description: "Penyedia utama konstelasi satelit Low Earth Orbit (LEO) global yang mendasari layanan internet kecepatan tinggi Akastar.",
    image: "/spacex.png",
    brandColor: "group-hover:border-gray-400/50 group-hover:shadow-[0_0_30px_rgba(156,163,175,0.15)]"
  },
  {
    id: "angkasa",
    name: "Angkasa (Malaysia)",
    role: "Regional Strategic Partner",
    description: "Mitra strategis dalam pengembangan solusi satelit maritim dan integrasi jaringan lintas batas di Asia Tenggara.",
    image: "/angkasa.svg",
    brandColor: "group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
  }
];

export default function PartnerPage() {
  return (
    <main className="relative flex min-h-screen w-full flex-col bg-black text-gray-200 selection:bg-orange-500/30 overflow-x-hidden font-sans">
      <Navbar />

      {/* --- BACKGROUND DECOR --- */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-amber-500/5 blur-[150px] rounded-full" />
      </div>

      {/* --- HEADER HERO --- */}
      <section className="relative z-10 flex flex-col items-center justify-center px-6 pt-32 pb-16 text-center md:pt-48">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500"
        >
          <Handshake size={14} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Partner Kami</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl text-white"
        >
          Mitra Strategis & <br /> <span className="text-orange-500">Portofolio Global.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl text-gray-400 md:text-lg font-medium"
        >
          Nusantara Star Connect (NSC) bangga dapat berkolaborasi dengan pemimpin teknologi dunia untuk mewujudkan konektivitas tanpa batas di seluruh wilayah Indonesia.
        </motion.p>
      </section>

      {/* --- LOGO WALL (GRID PARTNER) --- */}
      <section className="relative z-10 px-6 py-12 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partners.map((partner, idx) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group flex flex-col p-8 md:p-10 rounded-[32px] bg-[#111111] border border-white/10 transition-all duration-500 cursor-default ${partner.brandColor}`}
              >
                {/* Logo Image */}
                <div className="h-20 mb-8 border-b border-white/10 pb-6 flex items-center">
                  <div className="relative w-40 h-12">
                    <Image 
                      src={partner.image} 
                      alt={partner.name} 
                      fill 
                      className="object-contain object-left filter brightness-90 group-hover:brightness-100 transition-all duration-500" 
                    />
                  </div>
                </div>

                <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-3">
                  {partner.role}
                </span>
                
                <p className="text-gray-400 text-sm font-medium leading-relaxed">
                  {partner.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* --- SECTION JARINGAN --- */}
      <section className="relative z-10 px-6 py-20 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto bg-[#0a0a0a] border border-white/5 rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="md:w-1/2 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ingin Menjadi Bagian dari Ekosistem Kami?</h2>
            <p className="text-gray-400 font-medium leading-relaxed mb-8">
              Kami selalu terbuka untuk berkolaborasi dengan ISP lokal, perusahaan teknologi, dan integrator sistem guna memperluas jangkauan layanan satelit di seluruh pelosok negeri.
            </p>
            <Link href="/hubungi-kami" className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] hover:bg-gray-200 transition-all active:scale-95">
              Jadilah Mitra Kami <ArrowRight size={16} />
            </Link>
          </div>

          <div className="md:w-1/2 flex justify-center relative z-10">
            <div className="w-48 h-48 rounded-full border border-orange-500/30 flex items-center justify-center relative shadow-[0_0_50px_rgba(249,115,22,0.1)]">
               <div className="absolute inset-0 rounded-full border-t border-orange-500 animate-spin-slow" style={{ animationDuration: '8s' }} />
               <Network size={64} className="text-orange-500" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}