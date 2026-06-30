"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  CreditCard, 
  Activity, 
  LifeBuoy, 
  Settings, 
  ChevronRight, 
  CheckCircle2, 
  ArrowUpRight,
  Wifi,
  Calendar,
  User as UserIcon,
  ShoppingCart,
  LayoutDashboard,
  ShieldCheck,
  FileText,
  Edit3,
  Save,
  X,
  Upload
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Menggabungkan data bawaan Anda dengan data tambahan untuk fitur Profile
const initialUserData = {
  name: "Syal Pratama",
  email: "syal@nsc.id",
  memberSince: "Oktober 2025",
  company: "PT. Nusantara Star Connect",
  phone: "+62 812-3456-7890",
  isVerified: true,
  activePlan: {
    name: "Starlink Enterprise LEO",
    speed: "Up to 350 Mbps",
    status: "Active",
    expiryDate: "12 Mei 2026",
  },
  docs: [
    { id: "ktp", label: "KTP Penanggung Jawab", fileName: "ktp_pic_terverifikasi.pdf" },
    { id: "npwp", label: "NPWP Perusahaan", fileName: "npwp_perusahaan.pdf" },
    { id: "nib", label: "NIB (Izin Berusaha)", fileName: "nib_legalitas_nsc.pdf" }
  ]
};

const customerServices = [
  { 
    icon: <CreditCard className="w-6 h-6" />, 
    title: "Billing & Pembayaran", 
    desc: "Cek tagihan, riwayat transaksi, dan bayar aman.",
    href: "/customer/pembayaran" 
  },
  { 
    icon: <Settings className="w-6 h-6" />, 
    title: "Kelola Layanan", 
    desc: "Upgrade paket dan konfigurasi perangkat Anda.",
    href: "/customer/layanan"
  },
  { 
    icon: <LifeBuoy className="w-6 h-6" />, 
    title: "Pusat Bantuan", 
    desc: "Buka tiket keluhan atau hubungi teknisi 24/7.",
    href: "/customer/bantuan"
  },
];

export default function CustomerPortal() {
  // State untuk Tab dan Edit Profile
  const [activeTab, setActiveTab] = useState<"dashboard" | "profile">("dashboard");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  // Fungsi untuk handle ganti file saat edit dokumen
  const handleFileChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFileName = e.target.files[0].name;
      setUserData(prev => ({
        ...prev,
        docs: prev.docs.map(doc => doc.id === id ? { ...doc, fileName: newFileName } : doc)
      }));
    }
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col bg-black text-gray-200 selection:bg-orange-500/30 overflow-hidden font-sans">
      
      {/* Background Decor (Glow Aksen Oranye) */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <Image src="/particle7.webp" alt="bg" fill className="object-cover" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.05),transparent)]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-24 lg:px-12">
        
        {/* --- WELCOME HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h4 className="text-orange-500 text-[10px] md:text-[16px] font-black uppercase tracking-[0.5em] mb-3 opacity-80">Workspace Portal</h4>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Hello, {userData.name}!</h1>
            <p className="text-gray-400 mt-3 font-medium">Selamat datang kembali di pusat kendali Nusantara Star Connect.</p>
          </motion.div>

          {/* Wrapper untuk Tombol Berlangganan & Status Akun */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col sm:flex-row items-stretch gap-4"
          >
            {/* Tombol Berlangganan */}
            <Link href="/customer/berlangganan" className="flex">
              <button className="w-full sm:w-auto px-8 py-4 bg-orange-500 text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-orange-400 transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] active:scale-95 flex items-center justify-center gap-3 group">
                <ShoppingCart size={18} className="group-hover:-rotate-6 transition-transform" />
                Berlangganan
              </button>
            </Link>

            {/* Status Akun */}
            <div className="flex items-center gap-4 bg-[#111111] border border-white/10 p-4 rounded-2xl backdrop-blur-md shadow-2xl">
              <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
                <UserIcon size={24} />
              </div>
              <div>
                <p className="text-[9px] uppercase font-black text-gray-500 tracking-widest leading-none mb-1.5">Status Akun</p>
                <p className="text-sm font-bold text-white tracking-wide">Verified Member</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- TAB NAVIGATION --- */}
        <div className="flex mb-12 p-1.5 bg-[#111111] border border-white/10 rounded-2xl w-fit backdrop-blur-xl shadow-lg">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "dashboard" ? "bg-orange-500 text-black shadow-[0_0_10px_rgba(249,115,22,0.3)]" : "text-gray-500 hover:text-white"}`}
          >
            <LayoutDashboard size={16} /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "profile" ? "bg-orange-500 text-black shadow-[0_0_10px_rgba(249,115,22,0.3)]" : "text-gray-500 hover:text-white"}`}
          >
            <UserIcon size={16} /> Profil Bisnis
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "dashboard" ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* --- MAIN DASHBOARD CONTENT --- */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT: Active Subscription Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-8 group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#111111] p-8 md:p-10 shadow-2xl"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="p-3.5 bg-orange-500/10 border border-orange-500/20 rounded-2xl text-orange-500 shadow-xl">
                          <Wifi size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-extrabold text-white">{userData.activePlan.name}</h2>
                          <p className="text-orange-500/80 text-[10px] font-black uppercase tracking-widest mt-1">Active Subscription</p>
                        </div>
                      </div>
                      <div className="hidden md:block px-4 py-2 bg-emerald-400/10 border border-emerald-400/20 rounded-full">
                        <span className="text-emerald-400 text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> {userData.activePlan.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-white/10">
                      <div className="space-y-1">
                        <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Bandwidth Speed</p>
                        <p className="text-xl font-bold text-white leading-none">{userData.activePlan.speed}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Expiry Date</p>
                        <div className="flex items-center gap-2">
                          <Calendar size={18} className="text-orange-500/80" />
                          <p className="text-xl font-bold text-white leading-none">{userData.activePlan.expiryDate}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                      <button className="px-8 py-4 bg-orange-500 text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-orange-400 transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] active:scale-95">
                        Upgrade Plan
                      </button>
                      <button className="px-8 py-4 bg-white/5 border border-white/10 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white/10 transition-all active:scale-95">
                        Billing Details
                      </button>
                    </div>
                  </div>
                  
                  {/* Background Decorative Glow (Aksen Orange) */}
                  <div className="absolute top-0 right-0 -mt-24 -mr-24 h-64 w-64 bg-orange-500/10 blur-[80px] rounded-full" />
                </motion.div>

                {/* RIGHT: Quick Action Services */}
                <div className="lg:col-span-4 grid grid-cols-1 gap-4">
                  {customerServices.map((service, idx) => (
                    <Link href={service.href || "#"} key={idx} className="block">
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="group flex items-center gap-5 p-5 rounded-2xl border border-white/5 bg-[#111111] hover:bg-[#1a1a1a] hover:border-orange-500/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.1)] transition-all cursor-pointer active:scale-[0.98]"
                      >
                        <div className="p-3 rounded-xl border border-white/5 bg-white/5 text-gray-400 group-hover:bg-orange-500/10 group-hover:text-orange-500 group-hover:border-orange-500/20 transition-all">
                          {service.icon}
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">{service.title}</h3>
                          <p className="text-[11px] text-gray-500 group-hover:text-gray-400 transition-colors leading-tight mt-1.5 font-medium">{service.desc}</p>
                        </div>
                        <ChevronRight size={16} className="text-white/20 group-hover:text-orange-500 transition-colors flex-shrink-0" />
                      </motion.div>
                    </Link>
                  ))}
                </div>

              </div>

              {/* --- INFO SECTION --- */}
              <motion.section 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mt-28 grid grid-cols-1 lg:grid-cols-2 items-center gap-20"
              >
                <div className="relative aspect-video rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
                  <Image src="/particle9.webp" alt="Satellite" fill className="object-cover opacity-30" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent opacity-80" />
                </div>
                <div>
                  <h2 className="text-4xl font-extrabold uppercase text-white mb-8 tracking-tighter leading-none">Optimalkan <br /> Konektivitas <span className="text-orange-500">NSC</span></h2>
                  <div className="space-y-6">
                    {[
                      "Pantau Latensi Dibawah 50ms",
                      "Update Firmware Perangkat Otomatis",
                      "Layanan Support Prioritas 24/7",
                      "Jaminan Uptime 99.9%"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="h-6 w-6 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
                          <CheckCircle2 size={14} />
                        </div>
                        <span className="text-gray-300 font-medium tracking-wide text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <button className="mt-14 group flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] border-b-2 border-orange-500 pb-3 hover:text-orange-500 transition-all text-white">
                    Lihat Analisis Mendalam <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </motion.section>
            </motion.div>
          ) : (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8 max-w-5xl"
            >
              {/* --- BAGIAN PROFILE & DOKUMEN --- */}
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold tracking-tight text-white">Profil Bisnis & Dokumen</h3>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all shadow-lg ${isEditing ? 'bg-orange-500 text-black border-orange-500' : 'bg-transparent text-white border-white/20 hover:border-white hover:bg-white/5'}`}
                >
                  {isEditing ? <><X size={14} /> Batal Edit</> : <><Edit3 size={14} /> Edit Data</>}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form Data Bisnis */}
                <div className="grid grid-cols-1 gap-5">
                  {[
                    { label: "Nama Lengkap PIC", value: userData.name, key: "name" },
                    { label: "Nama Perusahaan", value: userData.company, key: "company" },
                    { label: "Email Bisnis", value: userData.email, key: "email" },
                    { label: "Nomor Telepon", value: userData.phone, key: "phone" },
                  ].map((field) => (
                    <div key={field.key} className="p-6 bg-[#111111] border border-white/10 rounded-3xl backdrop-blur-md">
                      <label className="text-[10px] uppercase font-black text-gray-500 block mb-2 tracking-[0.15em]">{field.label}</label>
                      {isEditing ? (
                        <input type="text" defaultValue={field.value} className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors" />
                      ) : (
                        <p className="text-base font-bold text-white">{field.value}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Dokumen Upload & Edit */}
                <div className="bg-[#111111] border border-white/10 rounded-[32px] p-8 shadow-2xl">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-3 text-orange-500">
                    <FileText size={18} /> Legalitas Terlampir
                  </h4>
                  <div className="space-y-4">
                    {userData.docs.map((doc) => (
                      <div 
                        key={doc.id} 
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${isEditing ? 'bg-white/5 border-orange-500/50 cursor-pointer hover:bg-white/10' : 'bg-white/5 border-white/5'}`}
                        onClick={() => isEditing && fileInputRefs.current[doc.id]?.click()}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg border ${isEditing ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' : 'bg-white/5 border-transparent text-gray-500'}`}>
                            <FileText size={20} />
                          </div>
                          <div>
                            <p className="text-[12px] font-bold text-gray-200">{doc.label}</p>
                            <p className="text-[10px] text-gray-500 truncate max-w-[180px] mt-0.5">{doc.fileName}</p>
                          </div>
                        </div>
                        
                        {/* Input File Hidden */}
                        <input 
                          type="file" 
                          className="hidden" 
                          ref={el => { fileInputRefs.current[doc.id] = el; }}
                          onChange={(e) => handleFileChange(doc.id, e)}
                        />

                        {isEditing ? (
                          <div className="p-2 bg-orange-500 rounded-xl text-black shadow-[0_0_10px_rgba(249,115,22,0.3)]">
                            <Upload size={16} />
                          </div>
                        ) : (
                          <CheckCircle2 size={18} className="text-emerald-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tombol Simpan Perubahan */}
              <AnimatePresence>
                {isEditing && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="flex justify-end pt-4"
                  >
                    <button 
                      onClick={() => setIsEditing(false)} 
                      className="flex items-center gap-3 px-10 py-4 bg-orange-500 text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-orange-400 transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] active:scale-95"
                    >
                      <Save size={18} /> Simpan Perubahan
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <Footer />
    </main>
  );
}