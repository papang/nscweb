"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Clock, 
  ChevronLeft, 
  Share2, 
  Bookmark, 
  User,
  Calendar,
  Clock10,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {News, Category } from "@/app/lib/structNews";

const formatDateTime: Intl.DateTimeFormatOptions = {
  timeZone: "UTC",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false // Forces 24-hour format
}

// Fungsi untuk mengubah format slug (kebab-case) menjadi Judul Normal jika berita tidak ada di database
const formatSlugToTitle = (slug: string) => {
  if (!slug) return "";
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Database Dummy Berita Lengkap
const newsDatabase: Record<string, any> = {
  // Berita dari halaman List Berita
  "nsc-luncurkan-satelit-leo-terbaru-di-orbit-indonesia": {
    category: "Update",
    title: "NSC Luncurkan Satelit LEO Terbaru di Orbit Indonesia",
    author: "Tim Redaksi NSC",
    date: "23 April 2026",
    readTime: "4 Menit",
    image: "/particle7.webp",
    content: [
      "Nusantara Star Connect (NSC) secara resmi mengumumkan peluncuran satelit Low Earth Orbit (LEO) terbarunya yang difokuskan untuk mengkover wilayah timur Indonesia. Langkah ini diambil guna mengatasi tantangan blank spot yang masih sering terjadi di area kepulauan.",
      "Dengan mengorbit di ketinggian kurang dari 1.000 km, satelit ini menawarkan latensi yang jauh lebih rendah dibandingkan satelit geostasioner (GEO) tradisional, memungkinkan komunikasi real-time tanpa jeda yang berarti untuk pengguna korporat maupun residensial.",
      "Direktur Utama NSC menyatakan bahwa fasilitas ini akan mulai beroperasi penuh pada kuartal ketiga tahun ini, membuka peluang baru bagi sektor pendidikan, kesehatan, dan ekonomi digital di pelosok negeri yang selama ini belum terjangkau fiber optik."
    ]
  },
  "cara-optimalkan-latensi-internet-satelit-untuk-gaming": {
    category: "Tech",
    title: "Cara Optimalkan Latensi Internet Satelit untuk Gaming",
    author: "Syal Pratama",
    date: "22 April 2026",
    readTime: "5 Menit",
    image: "/particle8.webp", 
    content: [
      "Bermain game kompetitif menggunakan koneksi satelit dulu dianggap tidak mungkin karena masalah latensi (ping) yang tinggi. Namun, dengan hadirnya konstelasi satelit LEO dari Akastar, pengalaman gaming kini menjadi jauh lebih mulus.",
      "Untuk mendapatkan performa maksimal, pastikan antena atau parabola Anda berada di area terbuka tanpa halangan pohon atau bangunan. Gangguan fisik (obstruction) sekecil apapun dapat menyebabkan packet loss yang berujung pada 'lag spike' saat bermain game.",
      "Selain itu, gunakan router dengan fitur Quality of Service (QoS) untuk memprioritaskan traffic game di atas unduhan atau streaming. Menghubungkan PC atau konsol langsung ke router menggunakan kabel LAN (Ethernet) juga sangat disarankan untuk kestabilan ekstra."
    ]
  },
  "rekap-workshop-digitalisasi-desa-bersama-nsc": {
    category: "Event",
    title: "Rekap Workshop Digitalisasi Desa Bersama NSC",
    author: "Humas NSC",
    date: "21 April 2026",
    readTime: "3 Menit",
    image: "/particle9.webp", 
    content: [
      "Sebagai bagian dari program CSR perusahaan, NSC sukses menggelar workshop 'Desa Go Digital' yang dihadiri oleh puluhan kepala desa dari berbagai provinsi. Acara ini bertujuan mengedukasi perangkat desa mengenai pemanfaatan internet satelit untuk pelayanan publik.",
      "Selama workshop, peserta diajarkan cara mengurus administrasi desa secara online, mempromosikan produk UMKM lokal ke pasar global, hingga menyiapkan infrastruktur internet tahan bencana sebagai jalur komunikasi darurat.",
      "Antusiasme yang tinggi membuktikan bahwa masyarakat pedesaan sangat siap menyambut era digital asalkan didukung dengan infrastruktur konektivitas yang handal dan terjangkau."
    ]
  },

  // Berita dari Sidebar (Berita Terkait)
  "cara-optimalkan-latensi-satelit": {
    category: "Tutorial",
    title: "Cara Optimalkan Latensi Satelit",
    author: "Tim Teknis NSC",
    date: "20 Mei 2026",
    readTime: "4 Menit",
    image: "/game.webp",
    content: [
      "Latensi atau ping sangat krusial bagi koneksi internet satelit, terutama jika Anda menggunakan layanan kami untuk kebutuhan real-time seperti video conference, VoIP, atau operasional mesin jarak jauh.",
      "Langkah pertama yang paling penting adalah memastikan instalasi antena (dish) berada di tempat yang 100% bebas hambatan (clear view of the sky). Halangan sekecil daun atau tiang listrik dapat menyebabkan koneksi terputus sepersekian detik dan meningkatkan latensi.",
      "Kami juga sangat merekomendasikan penggunaan koneksi kabel LAN (Ethernet) dari router NSC ke perangkat kerja Anda daripada menggunakan Wi-Fi, karena hal ini dapat secara drastis mengurangi potensi interferensi gelombang radio di sekitar Anda."
    ]
  },
  "update-firmware-antena-nsc-v2": {
    category: "Update",
    title: "Update Firmware Antena NSC V2",
    author: "Dev Team NSC",
    date: "18 Mei 2026",
    readTime: "2 Menit",
    image: "/beam.webp",
    content: [
      "Nusantara Star Connect baru saja meluncurkan pembaruan sistem operasi (firmware) versi 2.0 untuk seluruh antena pengguna secara Over-The-Air (OTA). Update ini akan diunduh dan dipasang secara otomatis pada jam non-sibuk.",
      "Pembaruan ini membawa algoritma pelacakan satelit LEO yang lebih presisi, yang diklaim mampu meningkatkan kecepatan penguncian sinyal awal (signal lock) hingga 30% lebih cepat ketika perangkat dinyalakan atau setelah terjadi pemadaman listrik.",
      "Selain itu, patch keamanan terbaru juga disertakan untuk menutup celah kerentanan, memastikan komunikasi jaringan korporasi Anda tetap aman dari intervensi pihak luar."
    ]
  },
  "jangkauan-satelit-leo-di-papua": {
    category: "Teknologi",
    title: "Jangkauan Satelit LEO di Papua",
    author: "Humas NSC",
    date: "15 Mei 2026",
    readTime: "6 Menit",
    image: "/kemah.webp",
    content: [
      "Menghadirkan konektivitas di wilayah Indonesia Timur, khususnya di area pegunungan Papua, selalu menjadi tantangan logistik yang luar biasa berat bagi penyedia internet fiber optik konvensional.",
      "Namun, dengan pendekatan konstelasi satelit LEO (Low Earth Orbit), Akastar kini mampu menyediakan akses internet broadband kecepatan tinggi yang stabil langsung ke desa-desa, fasilitas kesehatan, dan sekolah terpencil tanpa perlu membangun menara atau menarik kabel ribuan kilometer.",
      "Inisiatif ini terbukti berhasil meningkatkan taraf edukasi anak-anak daerah serta mempermudah petugas medis dalam mengakses rekam medis elektronik terpusat dengan cepat dan aman."
    ]
  }
};

// const relatedNews = [
//   { id: 1, title: "Cara Optimalkan Latensi Satelit", cat: "Tutorial" },
//   { id: 2, title: "Update Firmware Antena NSC V2", cat: "Update" },
//   { id: 3, title: "Jangkauan Satelit LEO di Papua", cat: "Teknologi" },
// ];

let relatedNews: News[] = [];

export default function NewsDetailDynamic({ params }: { params: Promise<{ slug: string }> }) {

  // Unwrap promise 'params' menggunakan React.use()
  // const resolvedParams = use(params);
  // const slug = resolvedParams.slug;
  const { slug } = use(params);

  const [news, setNews] = useState<News[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [readNews, setReadNews] = useState<News | null>(null);
  const [linesContent, setLinesContent] = useState([]);

  useEffect(() => {
    reloadCategory();
    reloadNews();
  }, []);

  const reloadCategory = async () => {
    const response = await fetch("/api/news/cat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const result = await response.json();
    if (result.success) {
      setCategory(result.result);
    }
  };

  const reloadNews = async () => {
    const response = await fetch("/api/news/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ srcType: "IN" }),
    });

    const result = await response.json();
    if (result.success) {
      setNews(result.result);
      const aNews = result.result.filter(item => item.newsId === parseInt(slug,10));
      setReadNews(aNews[0]);
      hasReadNews(aNews[0].newsId);
      setLinesContent(aNews[0].newsContent.split(/\r?\n|\r/) );
      relatedNews = result.result.filter(item => (item.newsCatId === aNews[0].newsCatId && item.newsId != aNews[0].newsId )).slice(0,3);
    }
    
  };

  const hasReadNews = async (newsId: number) => {
    const response = await fetch("/api/news/read", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newsId: newsId }),
    });

    const result = await response.json();
    
  };
  

  return (
    <main className="relative min-h-screen bg-black text-gray-200 font-sans overflow-visible selection:bg-orange-500/30">
      
      {/* Background Glows (Aksen Orange/Amber) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full" />
        <div className="fixed bottom-[20%] left-[-5%] w-[400px] h-[400px] bg-amber-500/10 blur-[100px] rounded-full" />
      </div>

      <Navbar />
      
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-24 max-w-6xl">
        
        {/* Tombol Kembali */}
        <Link href="/berita" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors mb-8 group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Kembali ke Berita</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative items-start">
          
          {/* --- KOLOM KIRI: KONTEN ARTIKEL --- */}
          <div className="lg:col-span-2">
            <motion.article 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={slug} // Trigger animasi setiap kali slug ganti
              className="space-y-8"
            >
              {/* Header Artikel (Title Dinamis) */}
              <div className="space-y-4">
                <span className="bg-orange-500 px-3 py-1 rounded-md text-[10px] font-black text-black uppercase tracking-widest shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                  {readNews?.newsCatName}
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tighter text-white">
                  {readNews?.newsTitle}
                </h1>
                
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 py-4 border-y border-white/10 text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                      <User size={14} />
                    </div>
                    <span className="text-xs font-bold text-gray-300">{readNews?.authorBy}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <Clock10 size={14} />
                    <span>{(readNews?.createdAt) ? new Date(readNews?.createdAt).toLocaleDateString('UTC', formatDateTime) : 'N/A'}</span>
                  </div>
                  {/* <div className="flex items-center gap-2 text-xs font-medium">
                    <Clock size={14} />
                    <span>{currentArticle.readTime} Baca</span>
                  </div> */}
                </div>
              </div>

              {/* Gambar Utama (Gambar Dinamis) */}
              <div className="relative aspect-video rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
                <Image 
                  src={readNews?.imgUrl || ""} 
                  alt={readNews?.newsTitle || ""} 
                  fill 
                  className="object-cover"
                />
              </div>

              {/* --- KONTEN ARTIKEL (Teks Dinamis) --- */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative p-8 md:p-12 rounded-[40px] bg-[#111111] border border-white/5 backdrop-blur-xl shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[60px] rounded-full -mr-10 -mt-10" />

                <div className="prose prose-invert max-w-none relative z-10">
                  {linesContent.map((paragraph: string, index: number) => (
                    <div key={index}>
                      <p className="text-base md:text-lg leading-relaxed text-gray-300 mb-8 font-small">
                        {paragraph}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Action Buttons (Share/Save) */}
              {/* <div className="flex items-center gap-4 pt-8 border-t border-white/10">
                <button className="flex items-center gap-2 text-gray-400 bg-white/5 hover:bg-orange-500/10 hover:text-orange-500 hover:border-orange-500/30 px-4 py-2 rounded-xl transition-all border border-white/10">
                  <Share2 size={18} />
                  <span className="text-xs font-bold uppercase tracking-widest">Share</span>
                </button>
                <button className="flex items-center gap-2 text-gray-400 bg-white/5 hover:bg-orange-500/10 hover:text-orange-500 hover:border-orange-500/30 px-4 py-2 rounded-xl transition-all border border-white/10">
                  <Bookmark size={18} />
                  <span className="text-xs font-bold uppercase tracking-widest">Save</span>
                </button>
              </div> */}
            </motion.article>
          </div>

          {/* --- KOLOM KANAN: SIDEBAR (Sticky) --- */}
          <div className="space-y-10 lg:sticky lg:top-32 h-fit">
            
            {/* Widget Berita Terkait */}
            <section className="bg-[#111111] p-6 rounded-[32px] border border-white/5 shadow-2xl backdrop-blur-md">
              <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4 mb-6">Berita Terkait</h3>
              <div className="space-y-6">
                {relatedNews.map((news) => (
                  <Link href={`/berita/detail/${news.newsId}`} key={news.newsId} className="block group cursor-pointer">
                    <span className="text-[10px] text-orange-500 uppercase tracking-widest block mb-1">
                      <span>{(news?.createdAt) ? new Date(news?.createdAt).toLocaleDateString('UTC', formatDateTime) : 'N/A'}</span>
                    </span>
                    <h4 className="text-sm font-bold text-gray-300 leading-snug group-hover:text-orange-400 transition-colors">
                      {news.newsTitle}
                    </h4>
                  </Link>
                ))}
              </div>
            </section>

            {/* Newsletter atau Promo Box */}
            <section className="relative overflow-hidden p-8 rounded-[32px] bg-[#0a0a0a] border border-orange-500/30 shadow-[0_0_20px_rgba(249,115,22,0.1)] group cursor-pointer">
              <div className="relative z-10 space-y-4">
                <h3 className="text-xl font-bold leading-tight text-white">Butuh Internet Cepat?</h3>
                <p className="text-sm text-gray-400 font-medium">Dapatkan layanan Enterprise kami dengan instalasi prioritas sekarang.</p>
                <Link href="/hubungi-kami" className="block w-full bg-orange-500 text-black text-center font-black text-[10px] uppercase py-3 rounded-xl hover:bg-orange-400 transition-all tracking-[0.2em] shadow-[0_0_15px_rgba(249,115,22,0.3)] active:scale-95 mt-2">
                  Hubungi Kami
                </Link>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-500/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            </section>

          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}