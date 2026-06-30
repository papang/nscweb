"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Clock, 
  ChevronLeft, 
  Share2, 
  Bookmark, 
  MessageCircle, 
  User,
  Calendar
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Data Dummy Artikel Detail
const article = {
  category: "Teknologi",
  title: "Teknologi Beamforming: Masa Depan Internet Tanpa Lag di Indonesia",
  author: "Syal Pratama",
  date: "23 April 2026",
  readTime: "8 Menit",
  image: "/particle9.webp",
  content: [
    "Pernahkah Anda membayangkan koneksi internet satelit yang memiliki kecepatan setara fiber optik dengan latensi yang sangat rendah? Jawabannya terletak pada teknologi Beamforming. Sebagai inovasi terbaru dalam industri komunikasi satelit LEO (Low Earth Orbit), beamforming memungkinkan transmisi sinyal yang lebih fokus dan efisien.",
    "Berbeda dengan antena tradisional yang memancarkan sinyal ke segala arah, beamforming menggunakan algoritma canggih untuk mengarahkan energi sinyal tepat ke perangkat pengguna. Hal ini meminimalisir gangguan (interference) dan memastikan bandwidth maksimal tersalurkan tanpa hambatan fisik seperti cuaca ekstrem.",
    "Nusantara Star Connect (NSC) telah mulai mengimplementasikan teknologi ini pada perangkat Starlink Enterprise mereka, memberikan pengalaman gaming dan video conference yang mulus bahkan di wilayah terpencil di Indonesia."
  ]
};

const relatedNews = [
  { id: 1, title: "Cara Optimalkan Latensi Satelit", cat: "Tech" },
  { id: 2, title: "Update Firmware Antena NSC V2", cat: "Hardware" },
  { id: 3, title: "Jangkauan Satelit LEO di Papua", cat: "Update" },
];

export default function NewsDetail() {
  return (
    <main className="relative min-h-screen bg-black text-gray-200 font-sans overflow-hidden selection:bg-orange-500/30">
      
      {/* Background Glows (Aksen Orange/Amber) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] bg-amber-500/10 blur-[100px] rounded-full" />
      </div>

      <Navbar />
      
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20 max-w-6xl">
        
        {/* Tombol Kembali */}
        <Link href="/berita" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors mb-8 group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Kembali ke Berita</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* --- KOLOM KIRI: KONTEN ARTIKEL --- */}
          <div className="lg:col-span-2">
            <motion.article 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Header Artikel */}
              <div className="space-y-4">
                <span className="bg-orange-500 px-3 py-1 rounded-md text-[10px] font-black text-black uppercase tracking-widest shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                  {article.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tighter text-white">
                  {article.title}
                </h1>
                
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 py-4 border-y border-white/10 text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                      <User size={14} />
                    </div>
                    <span className="text-xs font-bold text-gray-300">{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <Calendar size={14} />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <Clock size={14} />
                    <span>{article.readTime} Baca</span>
                  </div>
                </div>
              </div>

              {/* Gambar Utama */}
              <div className="relative aspect-video rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
                <Image 
                  src={article.image} 
                  alt="Headline" 
                  fill 
                  className="object-cover"
                />
              </div>

              {/* Konten Teks */}
              {/* --- KONTEN ARTIKEL DENGAN WRAPPER CARD GELAP --- */}
                <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative p-8 md:p-12 rounded-[40px] bg-[#111111] border border-white/5 backdrop-blur-xl shadow-2xl"
                >
                {/* Aksen dekoratif di pojok kartu agar tidak flat */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full -mr-10 -mt-10" />

                <div className="prose prose-invert max-w-none relative z-10">
                    {article.content.map((p, index) => (
                    <div key={index}>
                        <p className="text-lg leading-relaxed text-gray-300 mb-8 font-medium">
                        {p}
                        </p>
                    </div>
                    ))}
                </div>
                </motion.div>

              {/* Action Buttons (Share/Save) */}
              <div className="flex items-center gap-4 pt-8 border-t border-white/10">
                <button className="flex items-center gap-2 text-gray-400 bg-white/5 hover:bg-orange-500/10 hover:text-orange-500 hover:border-orange-500/30 px-4 py-2 rounded-xl transition-all border border-white/10">
                  <Share2 size={18} />
                  <span className="text-xs font-bold uppercase tracking-widest">Share</span>
                </button>
                <button className="flex items-center gap-2 text-gray-400 bg-white/5 hover:bg-orange-500/10 hover:text-orange-500 hover:border-orange-500/30 px-4 py-2 rounded-xl transition-all border border-white/10">
                  <Bookmark size={18} />
                  <span className="text-xs font-bold uppercase tracking-widest">Save</span>
                </button>
              </div>
            </motion.article>
          </div>

          {/* --- KOLOM KANAN: SIDEBAR --- */}
          <div className="space-y-10">
            
            {/* Widget Berita Terkait */}
            <section className="bg-[#111111] p-6 rounded-[32px] border border-white/5 shadow-2xl backdrop-blur-md">
              <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4 mb-6">Berita Terkait</h3>
              <div className="space-y-6">
                {relatedNews.map((news) => (
                  <div key={news.id} className="group cursor-pointer">
                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-1">
                      {news.cat}
                    </span>
                    <h4 className="text-sm font-bold text-gray-300 leading-snug group-hover:text-orange-400 transition-colors">
                      {news.title}
                    </h4>
                  </div>
                ))}
              </div>
            </section>

            {/* Newsletter atau Promo (Sekarang bernuansa dark & orange glow) */}
            <section className="relative overflow-hidden p-8 rounded-[32px] bg-[#0a0a0a] border border-orange-500/30 shadow-[0_0_20px_rgba(249,115,22,0.1)] group cursor-pointer">
              <div className="relative z-10 space-y-4">
                <h3 className="text-xl font-bold leading-tight text-white">Butuh Internet Cepat?</h3>
                <p className="text-sm text-gray-400 font-medium">Dapatkan layanan Starlink Enterprise dengan instalasi prioritas sekarang.</p>
                <button className="w-full bg-orange-500 text-black font-black text-[10px] uppercase py-3 rounded-xl hover:bg-orange-400 transition-all tracking-[0.2em] shadow-[0_0_15px_rgba(249,115,22,0.3)] active:scale-95 mt-2">
                  Hubungi Kami
                </button>
              </div>
              {/* Dekorasi BG */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />
            </section>

          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}