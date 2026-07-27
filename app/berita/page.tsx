"use client";

import { useState, useEffect, ChangeEvent} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Search, 
  Clock, 
  ChevronRight, 
  ExternalLink, 
  Rss, 
  Globe, 
  Briefcase, 
  Newspaper 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
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

const categoryNews = [
  { id: 10, cat: "Teknologi", title: "Implementasi AI dalam Monitoring Jaringan Satelit", time: "2 Hari" },
  { id: 11, cat: "Satelit", title: "Peluncuran Terminal Flat-Panel Generasi Kedua", time: "3 Hari" },
  { id: 12, cat: "Bisnis", title: "NSC Jalin Kerja Sama Strategis dengan Provider Lokal", time: "4 Hari" },
  { id: 13, cat: "Tutorial", title: "Cara Setting Router NSC untuk Kecepatan Maksimal", time: "5 Hari" },
];

const getDomainLogo = (url: string) => {
  if (!url || url === "#") return null;
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch (error) {
    return null;
  }
};

export default function SimpleNews() {
  // State untuk Tab Navigasi & Kategori Internal
  const [activeTab, setActiveTab] = useState<"nsc" | "feed">("nsc");
  const [activeCategory, setActiveCategory] = useState("");

  const [category, setCategory] = useState<Category[]>([]);
  const [newsInsight, setNewsInsight] = useState<News[]>([]);
  const [newsFeed, setNewsFeed] = useState<News[]>([]);
  const [latestNews, setLatestNews] = useState<News[]>([]);
  const [headlineNews, setHeadlineNews] = useState<News | null>(null);
  const [sortedNews, setSortedNews] = useState<News[] | null>(null);
  const [linesContent, setLinesContent] = useState([]);

  const filteredNews = newsInsight.filter(item => item.newsCatName === activeCategory).slice(0,5);

  useEffect(() => {
    reloadCategory();
    reloadNewsInsight();
    reloadNewsFeed();
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
      setActiveCategory(result.result[0]?.newsCatName);
    }
  };

  const reloadNewsInsight = async () => {
    const response = await fetch("/api/news/insight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ srcType: "IN" }),
    });

    const result = await response.json();
    if (result.success) {
      setNewsInsight(result.result);
      const aNews = result.result.filter(item => item.isHeadline === 1);
      setHeadlineNews(aNews[0]);
      const bNews = result.result.filter(item => item.isHeadline === 0).slice(0,5);
      setLatestNews(bNews);
      // setLinesContent(aNews[0].newsContent.split(/\r?\n|\r/) );

      const sNews = result.result.toSorted((a, b) => {
        return b.statVisit - a.statVisit;
      });

      setSortedNews(sNews.slice(0,3));
    }
    
  };

  const reloadNewsFeed = async () => {
    const response = await fetch("/api/news/feed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ srcType: "EX" }),
    });

    const result = await response.json();
    if (result.success) {
      setNewsFeed(result.result);
    }
    
  };

  const hndlSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const filteredData = newsInsight.filter((item) => (
        item.newsContent.toLowerCase().includes(e.target.value.toLowerCase()) || 
        item.newsTitle.toLowerCase().includes(e.target.value.toLowerCase())
      )
    )
    .slice(0,5);
    setLatestNews(filteredData);
  };


  return (
    <main className="relative min-h-screen bg-black text-gray-200 selection:bg-orange-500/30 overflow-hidden font-sans">
      
      {/* Efek Pendaran Cahaya (Glow Effects) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] bg-amber-500/10 blur-[100px] rounded-full" />
        <div className="absolute top-[40%] left-[30%] w-[600px] h-[600px] bg-orange-500/5 blur-[150px] rounded-full" />
      </div>

      <Navbar />
      
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20 max-w-6xl">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <h1 className="text-4xl font-bold tracking-tight text-white">Berita & <span className="text-orange-500">Insight</span></h1>
          
          {activeTab === "nsc" && (
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Cari berita..." 
                onChange={hndlSearch}
                className="w-full bg-[#111111] border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm outline-none focus:border-orange-500 focus:bg-[#1a1a1a] transition-all text-white placeholder-gray-500"
              />
            </div>
          )}
          
        </div>

        {/* --- TAB SWITCHER (NSC vs FEED) --- */}
        <div className="flex mb-12 p-1.5 bg-[#111111] border border-white/10 rounded-2xl w-fit backdrop-blur-xl shadow-lg">
          <button 
            onClick={() => setActiveTab("nsc")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === "nsc" ? "bg-orange-500 text-black shadow-[0_0_10px_rgba(249,115,22,0.3)]" : "text-gray-500 hover:text-white"}`}
          >
            Berita
          </button>
          <button 
            onClick={() => setActiveTab("feed")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === "feed" ? "bg-orange-500 text-black shadow-[0_0_10px_rgba(249,115,22,0.3)]" : "text-gray-500 hover:text-white"}`}
          >
            <Rss size={14} className={activeTab === "feed" ? "text-black" : "text-gray-500"} />Feed
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "nsc" ? (
            /* =========================================
               TAB 1: BERITA RESMI INTERNAL NSC
               ========================================= */
            <motion.div
              key="nsc-news"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-12"
            >
              {/* KOLOM KIRI (Berita Utama & List) */}
              <div className="lg:col-span-2 space-y-8">
                <Link href={`/berita/detail/${headlineNews?.newsId}`} className="block">
                  <motion.div className="group cursor-pointer">
                    <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 border border-white/10 shadow-2xl">
                      <Image 
                        src={headlineNews?.imgUrl || ""} 
                        alt={headlineNews?.newsTitle || ""} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <span className="bg-orange-500 px-3 py-1 rounded-md text-[10px] font-black text-black uppercase mb-3 inline-block shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                          Sorotan
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold leading-tight text-white group-hover:text-orange-400 transition-colors">
                          {headlineNews?.newsTitle || ""} 
                        </h2>
                      </div>
                    </div>
                  </motion.div>
                </Link>

                <div className="space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-gray-500 border-b border-white/10 pb-2">Update Terkini</h3>
                  {latestNews.map((item) => (
                    <Link 
                      key={item.newsId} 
                      href={`/berita/detail/${item.newsId}`}
                      className="block"
                    >
                      <div className="flex gap-5 p-3 rounded-2xl bg-[#111111]/80 border border-white/5 hover:bg-[#1a1a1a] hover:border-orange-500/50 transition-all cursor-pointer group items-center backdrop-blur-sm">
                        <div className="relative h-20 w-20 md:h-24 md:w-32 flex-shrink-0 overflow-hidden rounded-xl border border-white/10">
                          <Image src={item.imgUrl} alt={item.newsTitle} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-orange-500 text-[10px] font-bold uppercase tracking-wider">{item.newsCatName}</span>
                            <span className="text-gray-500 text-[10px] flex items-center gap-1 font-medium"><Clock size={10}/> {(item?.createdAt) ? new Date(item?.createdAt).toLocaleDateString('UTC', formatDateTime) : 'N/A'}</span>
                          </div>
                          <h3 className="font-bold text-base md:text-lg leading-tight text-gray-200 group-hover:text-orange-400 transition-colors">{item.newsTitle}</h3>
                        </div>
                        <ChevronRight className="hidden md:block text-gray-600 group-hover:text-orange-500 transition-colors mr-2" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* KOLOM KANAN (Kategori & Populer) */}
              <div className="space-y-12">
                <section className="bg-[#111111] p-6 rounded-[32px] border border-white/10 shadow-2xl backdrop-blur-md">
                  <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4 mb-6">Berita Populer</h3>
                  <div className="space-y-6">
                    {sortedNews?.map((sortedItem, i) => (
                      <Link 
                        key={i} 
                        href={`/berita/detail/${sortedItem?.newsId}`}
                        className="block"
                      >
                        <div className="flex gap-4 cursor-pointer group">
                          <span className="text-2xl font-black text-gray-700 group-hover:text-orange-500 transition-colors">0{i+1}</span>
                          <p className="text-sm font-medium leading-snug text-gray-400 group-hover:text-orange-400 transition-colors">
                            {sortedItem?.newsTitle}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>

                <section className="bg-[#111111] p-6 rounded-[32px] border border-white/10 shadow-2xl backdrop-blur-md">
                  <h3 className="text-lg font-bold text-white mb-6">Kategori</h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {category.map((cat) => (
                      <button 
                        key={cat.newsCatId}
                        onClick={() => setActiveCategory(cat.newsCatName)}
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                          activeCategory === cat.newsCatName 
                          ? "bg-orange-500 text-black border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]" 
                          : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        {cat.newsCatName}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        {filteredNews.map((item) => (
                          <div key={item.newsId} className="group cursor-pointer pb-3 border-b border-white/10 last:border-0 hover:pl-1 transition-all">
                            <p className="text-gray-500 font-medium text-[10px] mb-1">{(item?.createdAt) ? new Date(item?.createdAt).toLocaleDateString('UTC', formatDateTime) : 'N/A'}</p>
                            <Link 
                              href={`/berita/detail/${item.newsId}`}
                              className="block"
                            >
                              <h4 className="text-sm font-bold text-gray-300 leading-tight group-hover:text-orange-400 transition-colors">
                                {item.newsTitle}
                              </h4>
                            </Link>
                          </div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </section>
              </div>
            </motion.div>
          ) : (
            /* =========================================
               TAB 2: INDUSTRY NEWS FEED (EXTERNAL)
               ========================================= */
          <motion.div
            key="feed-news"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {newsFeed.map((feed) => {
              // Memanggil fungsi penarik logo otomatis
              const logoUrl = getDomainLogo(feed.srcUrl);

              return (
                <a 
                  key={feed.newsId} 
                  href={feed.srcUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex flex-col bg-[#111111] border border-white/10 rounded-[32px] overflow-hidden hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] transition-all duration-300 cursor-pointer"
                >
                  {/* Foto Feed (Jika ada) */}
                  {feed.imgUrl && (
                    <div className="relative h-48 w-full border-b border-white/10 overflow-hidden">
                      <Image src={feed.imgUrl} alt={feed.srcNews} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-grow">
                    {/* Source & Time */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-orange-500 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-lg">
                        {/* LOGO OTOMATIS */}
                        {logoUrl ? (
                          <div className="relative w-4 h-4 bg-white rounded-full overflow-hidden flex items-center justify-center p-0.5">
                            <img src={logoUrl} alt={feed.srcNews} className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <Globe size={14} /> // Fallback icon jika gagal
                        )}
                        <span className="text-[10px] font-black uppercase tracking-widest">{feed.srcNews}</span>
                      </div>
                      <span className="text-gray-500 text-[10px] font-medium flex items-center gap-1">
                        <Clock size={10} /> {(feed?.createdAt) ? new Date(feed?.createdAt).toLocaleDateString('UTC', formatDateTime) : 'N/A'}
                      </span>
                    </div>

                    {/* Title & Excerpt */}
                    <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-orange-400 transition-colors">
                      {feed.newsTitle}
                    </h3>
                    <p className="text-sm text-gray-400 font-medium leading-relaxed mb-6 line-clamp-3">
                      {feed.newsContent}
                    </p>

                    {/* External Link Indicator */}
                    <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between text-gray-500 group-hover:text-orange-500 transition-colors">
                      <span className="text-[11px] font-bold uppercase tracking-widest">Baca Sumber</span>
                      <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                </a>
              );
            })}
          </motion.div>
          )}
        </AnimatePresence>

      </div>
      <Footer />
    </main>
  );
}