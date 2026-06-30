"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Satellite, 
  Sparkles, 
  Globe2, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Network
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AkastarPage() {
  return (
    <main className="relative flex min-h-screen w-full flex-col bg-black text-gray-200 selection:bg-orange-500/30 overflow-x-hidden font-sans">
      <Navbar />

      {/* --- BACKGROUND GLOWS --- */}
      <div className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none">
        <Image src="/earth.webp" alt="bg" fill className="object-cover" />
      </div>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-orange-600/10 blur-[150px] rounded-full" />
        <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full" />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center md:pt-48 min-h-[80vh]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-6 px-5 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.2)]"
        >
          <Sparkles size={16} />
          <span className="text-xs font-black uppercase tracking-[0.3em]">The Flagship Product</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 text-5xl font-extrabold tracking-tighter md:text-7xl lg:text-8xl text-white uppercase"
        >
          AKA<span className="text-orange-500">STAR</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl text-gray-400 md:text-xl font-medium leading-relaxed"
        >
          Diambil dari bahasa Sansekerta <span className="text-white font-bold">"Akasa"</span> (ruang) dan dipadukan dengan bintang. Akastar adalah wujud komitmen NSC dalam membawa teknologi konektivitas tingkat tinggi menembus ruang tanpa batas ke seluruh kepulauan Indonesia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <Link href="/product" className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-orange-500 text-black text-xs font-black uppercase tracking-[0.2em] hover:bg-orange-400 transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)] active:scale-95">
            Lihat Seri Akastar <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      {/* --- VISUAL SHOWCASE --- */}
      <section className="relative z-10 px-6 py-12 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto relative rounded-[40px] overflow-hidden border border-white/10 shadow-2xl aspect-video md:aspect-[21/9]">
          <Image 
            src="/particle7.webp" 
            alt="Satelit Akastar di Orbit" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-2xl">
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-3">Menghubungkan yang Tak Terjangkau</h3>
            <p className="text-gray-300 font-medium text-sm md:text-base">Membawa kecepatan fiber optik ke udara melalui konstelasi Low Earth Orbit (LEO).</p>
          </div>
        </div>
      </section>

      {/* --- TEKNOLOGI & KEUNGGULAN --- */}
      <section className="relative z-10 px-6 py-24 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight mb-4">Mengapa Akastar?</h2>
            <div className="h-1.5 w-24 bg-orange-500 rounded-full mx-auto shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: <Zap size={32} />, 
                title: "Latensi Ultra Rendah", 
                desc: "Beroperasi pada ketinggian kurang dari 600km, menghasilkan ping di bawah 40ms layaknya koneksi kabel." 
              },
              { 
                icon: <Globe2 size={32} />, 
                title: "Jangkauan Nasional", 
                desc: "Sinyal menyelimuti 100% wilayah Indonesia, dari pegunungan Papua hingga kepulauan Natuna." 
              },
              { 
                icon: <ShieldCheck size={32} />, 
                title: "Enkripsi Enterprise", 
                desc: "Data Anda dilindungi dengan standar keamanan tinggi dari titik terminal hingga ke gerbang internet global." 
              },
              { 
                icon: <Satellite size={32} />, 
                title: "Tahan Cuaca Ekstrem", 
                desc: "Perangkat didesain khusus (IP67) untuk menahan badai tropis dan kondisi lingkungan paling keras sekalipun." 
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#111111] border border-white/5 p-8 rounded-[32px] hover:border-orange-500/50 hover:bg-[#1a1a1a] transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-black transition-all duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="relative z-10 px-6 pb-24 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#1a1a1a] to-black border border-orange-500/30 rounded-[40px] p-10 md:p-16 text-center relative overflow-hidden shadow-[0_0_50px_rgba(249,115,22,0.1)]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            <Network size={48} className="text-orange-500 mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Siap Memasuki Era Baru?</h2>
            <p className="text-gray-400 font-medium mb-10 max-w-2xl text-sm md:text-base leading-relaxed">
              Tinggalkan keterbatasan infrastruktur lama. Jelajahi pilihan paket Akastar yang dirancang khusus untuk kebutuhan residensial, mobilitas, hingga korporasi raksasa.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/product" className="px-8 py-4 rounded-xl bg-orange-500 text-black text-[11px] font-black uppercase tracking-[0.2em] hover:bg-orange-400 transition-all active:scale-95 shadow-lg">
                Pesan Sekarang
              </Link>
              <Link href="/hubungi-kami" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all active:scale-95">
                Konsultasi Tim Ahli
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}