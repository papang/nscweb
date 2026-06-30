"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { X, Play, Camera } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Data Dummy Galeri dengan tipe media (Image & YouTube)
const galleryItems = [
  {
    id: 1,
    type: "video",
    src: "/starlink_gunung.mp4", thumbnail: "/thumb_instalasi_gunung.png", 
    youtubeId: "",
    title: "Instalasi Antena NSC di Area Pegunungan",
    category: "Instalasi",
  },
  {
    id: 2,
    type: "video",
    src: "/satelit_starlink.mp4", thumbnail: "/thumb_satelit_leo.png", 
    youtubeId: "",
    title: "Peluncuran Satelit LEO Terbaru",
    category: "Event",
  },
  {
    id: 3,
    type: "image",
    src: "/ut_high_perform.jpeg",
    youtubeId: "",
    title: "UT Flat High Performance Gen2",
    category: "Produk",
  },
  {
    id: 4,
    type: "video",
    src: "/starlink_hujan_deras.mp4", thumbnail: "/thumb_hujan_deras.png", 
    youtubeId: "",
    title: "Koneksi Stabil di Cuaca Ekstrem (Uji Coba)",
    category: "Testimoni",
  },
  {
    id: 5,
    type: "image",
    src: "/kemah.webp",
    youtubeId: "",
    title: "Layanan Mobile Roam di Lokasi Terpencil",
    category: "Layanan",
  },
  {
    id: 6,
    type: "image",
    src: "/instalasi_laut.jpeg",
    youtubeId: "",
    title: "Pemasangan Terminal Akastar Maritim",
    category: "Instalasi",
  },
];

// Daftar Kategori berdasarkan data di atas
const categories = ["Semua", "Instalasi", "Event", "Produk", "Testimoni", "Layanan"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);

  // Filter gambar/video berdasarkan kategori
  const filteredGallery = activeCategory === "Semua" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col bg-black text-gray-200 selection:bg-orange-500/30 overflow-x-hidden font-sans">
      <Navbar />

      {/* --- BACKGROUND DECOR --- */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-amber-500/5 blur-[150px] rounded-full" />
      </div>

      {/* --- HEADER HERO --- */}
      <section className="relative z-10 flex flex-col items-center justify-center px-6 pt-32 pb-12 text-center md:pt-40">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500"
        >
          <Camera size={16} />
          <span className="text-[16px] font-black uppercase tracking-[0.3em]">Our Gallery</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl text-white"
        >
          Our <span className="text-orange-500">Projects</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl text-gray-400 md:text-lg font-medium"
        >
          Kumpulan momen instalasi, uji coba perangkat, dan perjalanan NSC dalam menghadirkan konektivitas satelit tanpa batas ke seluruh pelosok negeri.
        </motion.p>
      </section>

      {/* --- FILTER KATEGORI --- */}
      <section className="relative z-10 px-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all border active:scale-95 ${
                activeCategory === category
                  ? "bg-orange-500 text-black border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                  : "bg-[#111111] text-gray-500 border-white/10 hover:border-orange-500/50 hover:text-orange-500"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
      </section>

      {/* --- GALLERY GRID --- */}
      <section className="relative z-10 px-6 pb-24 md:px-12 lg:px-24">
        <motion.div layout className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedItem(item)}
                className="group relative cursor-pointer rounded-[24px] overflow-hidden bg-[#111111] border border-white/10 hover:border-orange-500/50 transition-all duration-500 hover:shadow-[0_0_25px_rgba(249,115,22,0.15)] aspect-[4/3]"
              >
                {/* Thumbnail / Gambar */}
                <div className="absolute inset-0">
                  {(() => {               
                  switch (item.type) {
                    case "youtube":
                      return (
                        // PERBAIKAN: Format URL Thumbnail YouTube yang benar
                        <Image 
                          src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`} 
                          alt={item.title} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                        />
                      );
                      break;
                    
                    case "video":
                      return (
                        <Image 
                          src={item.thumbnail!} 
                          alt={item.title} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                        />
                      );
                      break;

                    case "image":
                      return (
                        <Image 
                          src={item.src!} 
                          alt={item.title} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                        />
                      );
                      break;

                    default:
                      break;
                  }
                  })()}
                </div>

                {/* Overlay Gelap */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Ikon Play Besar di Tengah (Khusus Video) */}
                {item.type === "youtube" && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-orange-500/20 backdrop-blur-sm border border-orange-500/50 flex items-center justify-center text-orange-500 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-black transition-all duration-300">
                      <Play size={24} fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                )}

                {/* Teks Info */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 block mb-2 drop-shadow-md">
                    {item.category}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white leading-snug drop-shadow-lg">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pesan jika kategori kosong */}
        {filteredGallery.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 font-medium">Belum ada media untuk kategori ini.</p>
          </div>
        )}
      </section>

      {/* --- MODAL VIEWER (FOTO & VIDEO YOUTUBE) --- */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            {/* Overlay Hitam */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={closeModal} 
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            />
            
            {/* Kontainer Modal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()} 
              className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-[24px] md:rounded-[40px] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Tombol Tutup (X) */}
              <button 
                onClick={closeModal} 
                className="absolute top-4 right-4 z-50 p-2 md:p-3 rounded-full bg-black/50 text-white hover:bg-orange-500 hover:text-black transition-all backdrop-blur-md"
              >
                <X size={20} />
              </button>

              {/* Konten Media */}
              <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                {(() => {               
                  switch (selectedItem.type) {
                    case "youtube":
                      return (
                        <iframe
                          className="absolute inset-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${selectedItem.youtubeId}?autoplay=1&mute=1&rel=0`}
                          title={selectedItem.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      );
                      break;
                      
                    case "video":
                      return (
                        <video 
                          controls 
                          preload="none" autoPlay 
                          aria-label="Video player"
                          className="h-[550] w-auto object-contain"
                        >
                          <source src={selectedItem.src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      );
                      break;

                    case "image":
                        return (
                          <Image 
                            src={selectedItem.src!} 
                            alt={selectedItem.title} 
                            fill 
                            className="object-contain"
                          />
                        );
                        break;
                  
                    default:
                      break;
                  }
                })()}
                
              </div>

              {/* Info Tambahan di Modal */}
              <div className="p-6 md:p-8 border-t border-white/5 bg-[#111111]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-lg text-[10px] font-black uppercase tracking-widest">
                    {selectedItem.category}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white">{selectedItem.title}</h2>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}