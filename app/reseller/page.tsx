"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  TrendingUp, 
  Handshake, 
  BarChart3, 
  ChevronRight, 
  Copy, 
  Share2, 
  Users, 
  Wallet,
  CheckCircle2,
  ArrowUpRight
} from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock Data Reseller
const resellerData = {
  name: "Syal Pratama",
  company: "PT Contoh",
  tier: "Gold Partner",
  referralCode: "NSC-BTT-2026",
  stats: {
    totalSales: "Rp 145.000.000",
    activeClients: 24,
    commission: "Rp 12.500.000"
  }
};

export default function ResellerPortal() {
  const [copied, setCopied] = useState(false);
  const referralLink = `https://nsc.id/register?ref=${resellerData.referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col bg-black text-gray-200 selection:bg-orange-500/30 overflow-hidden font-sans">
      <Navbar />
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <Image src="/particle7.webp" alt="bg" fill className="object-cover" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.05),transparent)]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-24 lg:px-12">
        
        {/* --- PARTNER HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h4 className="text-orange-500 text-[10px] md:text-[16px] font-black uppercase tracking-[0.5em] mb-3 opacity-80">Reseller Dashboard</h4>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Welcome, {resellerData.name}!</h1>
            <p className="text-gray-400 mt-3 font-medium">{resellerData.company} — <span className="text-orange-500 font-bold">{resellerData.tier}</span></p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-4 bg-[#111111] border border-white/10 p-4 rounded-2xl backdrop-blur-md shadow-xl"
          >
            <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-[9px] uppercase font-black text-gray-500 tracking-widest leading-none mb-1.5">Earnings Today</p>
              <p className="text-sm font-bold text-white tracking-wide">Rp 1.250.000</p>
            </div>
          </motion.div>
        </div>

        {/* --- KEY STATS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Total Penjualan", val: resellerData.stats.totalSales, icon: <BarChart3 size={20}/> },
            { label: "Klien Aktif", val: resellerData.stats.activeClients, icon: <Users size={20}/> },
            { label: "Komisi Tersedia", val: resellerData.stats.commission, icon: <Wallet size={20}/> },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-[#111111] border border-white/10 shadow-lg backdrop-blur-sm"
            >
              <div className="text-orange-500 mb-3 bg-orange-500/10 w-fit p-2 rounded-xl border border-orange-500/20">{stat.icon}</div>
              <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest">{stat.label}</p>
              <p className="text-xl font-bold mt-1 text-white">{stat.val}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- LEFT: REFERRAL SECTION --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 p-8 md:p-10 rounded-[32px] border border-white/10 bg-[#111111] shadow-2xl relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 shadow-xl">
                  <Share2 size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Bagikan Link Referral</h2>
                  <p className="text-gray-400 text-xs font-medium mt-1">Dapatkan komisi dari setiap klien yang mendaftar melalui link Anda.</p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Your Unique Link</p>
                <div className="flex items-center gap-2 p-2 rounded-2xl bg-[#0a0a0a] border border-white/10">
                  <input 
                    readOnly 
                    value={referralLink}
                    className="flex-grow bg-transparent px-4 py-2 text-sm font-mono text-gray-300 outline-none overflow-hidden text-ellipsis"
                  />
                  <button 
                    onClick={copyToClipboard}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
                      copied ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "bg-orange-500 text-black shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:bg-orange-400"
                    }`}
                  >
                    {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Click Rate</p>
                  <p className="text-lg font-bold text-white">1,240 <span className="text-[10px] text-emerald-400 font-bold ml-1">↑ 12%</span></p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Conversion</p>
                  <p className="text-lg font-bold text-white">8.4% <span className="text-[10px] text-emerald-400 font-bold ml-1">↑ 2%</span></p>
                </div>
              </div>
            </div>
            
            <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 bg-orange-500/10 blur-[80px] rounded-full" />
          </motion.div>

          {/* --- RIGHT: RECENT ACTIVITY / TOOLS --- */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-orange-500/80 ml-2 mb-2">Partner Quick Tools</h3>
            
            {[
              { title: "Manajemen Klien", desc: "Lihat daftar & status layanan klien Anda", icon: <Users size={20}/> },
              { title: "Aset Pemasaran", desc: "Download brosur & banner promosi", icon: <Share2 size={20}/> },
              { title: "Request Pencairan", desc: "Tarik komisi ke rekening bank Anda", icon: <Wallet size={20}/> },
            ].map((tool, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ x: 10 }}
                className="group flex items-center gap-5 p-5 rounded-2xl border border-white/5 bg-[#111111] hover:bg-[#1a1a1a] hover:border-orange-500/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.1)] transition-all cursor-pointer shadow-lg"
              >
                <div className="p-3 rounded-xl border border-white/5 bg-white/5 text-gray-400 group-hover:bg-orange-500/10 group-hover:text-orange-500 group-hover:border-orange-500/20 transition-all">
                  {tool.icon}
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">{tool.title}</h4>
                  <p className="text-[11px] text-gray-500 group-hover:text-gray-400 transition-colors mt-1 font-medium">{tool.desc}</p>
                </div>
                <ChevronRight size={16} className="text-white/20 group-hover:text-orange-500 transition-colors flex-shrink-0" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- BANNER: BECOME EXPERT --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-12 rounded-[40px] border border-orange-500/30 shadow-[0_0_20px_rgba(249,115,22,0.1)] bg-[#0a0a0a] text-center relative overflow-hidden group"
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 uppercase tracking-tighter text-white">Butuh Bantuan Strategi Penjualan?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-sm leading-relaxed font-medium">
              Ikuti webinar eksklusif mitra setiap minggu untuk mendapatkan tips terbaru cara menjual teknologi satelit LEO di area remote Indonesia.
            </p>
            <button className="px-10 py-4 bg-orange-500 text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-orange-400 transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] active:scale-95 flex items-center gap-3 mx-auto">
              Daftar Webinar Partner <ArrowUpRight size={16} />
            </button>
          </div>
          {/* Efek glow di belakang banner */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-orange-500/10 transition-colors duration-700" />
        </motion.div>

      </div>

      <Footer />
    </main>
  );
}