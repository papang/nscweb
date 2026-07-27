"use client";

import { motion } from "framer-motion";
import { Package, Newspaper, TrendingUp, Activity } from "lucide-react";
import Link from "next/link";


export default function AdminDashboard() {


  const stats = [
    { title: "Total Produk", count: "12", icon: <Package size={24} />, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { title: "Total Berita", count: "48", icon: <Newspaper size={24} />, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
    { title: "Berita Draft", count: "3", icon: <Activity size={24} />, color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
  ];

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Overview</h1>
        <p className="text-sm font-medium text-gray-400">Selamat datang kembali, Admin NSC.</p>
      </div>
    </div>
  )

  // return (
  //   <div className="p-8 md:p-12 max-w-7xl mx-auto">
  //     <div className="mb-10">
  //       <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
  //       <p className="text-sm font-medium text-gray-400">Selamat datang kembali, Admin NSC.</p>
  //     </div>

  //     {/* Statistik Cards */}
  //     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
  //       {stats.map((stat, idx) => (
  //         <motion.div 
  //           key={idx}
  //           initial={{ opacity: 0, y: 20 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ delay: idx * 0.1 }}
  //           className={`p-6 rounded-3xl bg-black border ${stat.border} flex items-center justify-between`}
  //         >
  //           <div>
  //             <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">{stat.title}</p>
  //             <h3 className="text-4xl font-black text-white">{stat.count}</h3>
  //           </div>
  //           <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
  //             {stat.icon}
  //           </div>
  //         </motion.div>
  //       ))}
  //     </div>

  //     {/* Quick Actions / Aktivitas Terbaru */}
  //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  //       <div className="bg-black border border-white/5 rounded-3xl p-8">
  //         <div className="flex items-center justify-between mb-6">
  //           <h3 className="text-lg font-bold text-white">Akses Cepat</h3>
  //         </div>
  //         <div className="space-y-4">
  //           <Link href="/admin/produk" className="flex items-center justify-between p-4 rounded-xl bg-[#111111] border border-white/5 hover:border-orange-500/30 transition-all group">
  //             <div className="flex items-center gap-4">
  //               <div className="p-3 rounded-lg bg-orange-500/10 text-orange-500"><Package size={18} /></div>
  //               <span className="font-medium text-gray-300 group-hover:text-white transition-colors">Kelola Katalog Produk</span>
  //             </div>
  //           </Link>
  //           <Link href="/admin/berita" className="flex items-center justify-between p-4 rounded-xl bg-[#111111] border border-white/5 hover:border-orange-500/30 transition-all group">
  //             <div className="flex items-center gap-4">
  //               <div className="p-3 rounded-lg bg-orange-500/10 text-orange-500"><Newspaper size={18} /></div>
  //               <span className="font-medium text-gray-300 group-hover:text-white transition-colors">Tulis Berita Baru</span>
  //             </div>
  //           </Link>
  //         </div>
  //       </div>

  //       <div className="bg-black border border-white/5 rounded-3xl p-8">
  //         <div className="flex items-center justify-between mb-6">
  //           <h3 className="text-lg font-bold text-white">Status Sistem</h3>
  //         </div>
  //         <div className="flex items-center gap-4 p-4 rounded-xl bg-green-500/5 border border-green-500/10">
  //           <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
  //           <p className="text-sm font-medium text-green-500">Semua layanan CMS berjalan normal</p>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}