"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  Wallet, 
  Building2,
  CheckCircle2,
  Compass,
  Ship,
  Zap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Data Dummy Dinamis Berdasarkan Paket
const planDetails = {
  mobile: {
    name: "Akastar Mobile (Roam)",
    desc: "Konektivitas satelit portabel tanpa batas di mana saja.",
    price: "2.500.000",
    hardware: "7.500.000",
    tax: "275.000",
    total: "10.275.000",
    icon: <Compass size={24} />,
  },
  maritime: {
    name: "Akastar Maritime",
    desc: "Internet stabil di lautan lepas untuk armada kapal.",
    price: "6.800.000",
    hardware: "45.000.000",
    tax: "748.000",
    total: "52.548.000",
    icon: <Ship size={24} />,
  },
  default: {
    name: "Akastar Net",
    desc: "Paket Internet Satelit LEO Standar.",
    price: "3.500.000",
    hardware: "1.000.000",
    tax: "495.000",
    total: "4.995.000",
    icon: <Zap size={24} />,
  }
};

function CheckoutForm() {
  const [paymentMethod, setPaymentMethod] = useState("transfer");
  const searchParams = useSearchParams();
  const planQuery = searchParams.get("plan");
  
  // Menentukan data yang dirender berdasarkan parameter URL
  const selectedPlan = planQuery === "mobile" 
    ? planDetails.mobile 
    : planQuery === "maritime" 
    ? planDetails.maritime 
    : planDetails.default;

  return (
    <div className="relative z-10 container mx-auto px-6 pt-32 pb-24 lg:px-12">
      
      {/* Navigation & Header */}
      <div className="mb-12">
        <Link href="/" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors mb-6 text-sm font-bold">
          <ArrowLeft size={16} /> Kembali
        </Link>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h4 className="text-orange-500 text-[10px] md:text-[16px] font-black uppercase tracking-[0.5em] mb-3 opacity-80">Secure Checkout</h4>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Selesaikan Pesanan</h1>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        
        {/* LEFT: Formulir Checkout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-7 space-y-8"
        >
          {/* Form Informasi Pribadi */}
          <div className="bg-[#111111] border border-white/10 rounded-[24px] p-6 md:p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg text-orange-500">
                <User size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">Informasi Pelanggan</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Nama Lengkap</label>
                <input type="text" placeholder="Masukkan nama Anda" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Nomor Telepon / WA</label>
                <input type="tel" placeholder="0812xxxxxx" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                <input type="email" placeholder="email@contoh.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all" />
              </div>
            </div>
          </div>

          {/* Form Alamat Pemasangan */}
          <div className="bg-[#111111] border border-white/10 rounded-[24px] p-6 md:p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg text-orange-500">
                <MapPin size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">Alamat Pengiriman / Pemasangan</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Alamat Lengkap</label>
                <textarea rows={3} placeholder="Nama jalan, gedung, nomor rumah..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all resize-none"></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Kota / Kabupaten</label>
                  <input type="text" placeholder="Pilih Kota" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Kode Pos</label>
                  <input type="text" placeholder="12345" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all" />
                </div>
              </div>
            </div>
          </div>

          {/* Metode Pembayaran */}
          <div className="bg-[#111111] border border-white/10 rounded-[24px] p-6 md:p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg text-orange-500">
                <ShieldCheck size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">Metode Pembayaran</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => setPaymentMethod('transfer')}
                className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all ${paymentMethod === 'transfer' ? 'bg-orange-500/10 border-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.2)]' : 'bg-white/5 border-white/10 hover:border-white/30'}`}
              >
                <Building2 size={24} className={paymentMethod === 'transfer' ? 'text-orange-500' : 'text-gray-500'} />
                <span className="text-[11px] font-bold uppercase tracking-widest text-white">Bank Transfer</span>
              </button>
              <button 
                onClick={() => setPaymentMethod('card')}
                className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all ${paymentMethod === 'card' ? 'bg-orange-500/10 border-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.2)]' : 'bg-white/5 border-white/10 hover:border-white/30'}`}
              >
                <CreditCard size={24} className={paymentMethod === 'card' ? 'text-orange-500' : 'text-gray-500'} />
                <span className="text-[11px] font-bold uppercase tracking-widest text-white">Kartu Kredit</span>
              </button>
              <button 
                onClick={() => setPaymentMethod('ewallet')}
                className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all ${paymentMethod === 'ewallet' ? 'bg-orange-500/10 border-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.2)]' : 'bg-white/5 border-white/10 hover:border-white/30'}`}
              >
                <Wallet size={24} className={paymentMethod === 'ewallet' ? 'text-orange-500' : 'text-gray-500'} />
                <span className="text-[11px] font-bold uppercase tracking-widest text-white">E-Wallet</span>
              </button>
            </div>
          </div>

        </motion.div>

        {/* RIGHT: Ringkasan Pesanan */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5"
        >
          <div className="sticky top-32 bg-[#111111] border border-white/10 rounded-[32px] p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Ringkasan Pesanan</h3>
            
            {/* Product Card Selected - Diisi Dinamis */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
              <div className="p-3 bg-orange-500/20 border border-orange-500/30 rounded-xl text-orange-500">
                 {selectedPlan.icon}
              </div>
              <div>
                <h4 className="text-base font-bold text-white">{selectedPlan.name}</h4>
                <p className="text-[11px] text-gray-400 font-medium">{selectedPlan.desc}</p>
              </div>
            </div>

            <div className="space-y-4 mb-6 border-b border-white/10 pb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Harga Paket (Bulan Pertama)</span>
                <span className="font-bold text-white">Rp {selectedPlan.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Biaya Perangkat & Instalasi</span>
                <span className="font-bold text-white">Rp {selectedPlan.hardware}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Pajak (PPN 11%)</span>
                <span className="font-bold text-white">Rp {selectedPlan.tax}</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-1">Total Pembayaran</p>
                <p className="text-3xl font-black text-white">Rp {selectedPlan.total}</p>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-4 bg-orange-500 text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-orange-400 transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] active:scale-95">
              <CheckCircle2 size={16} /> Bayar Sekarang
            </button>

            <p className="text-center text-[10px] text-gray-500 mt-6 flex items-center justify-center gap-1 font-medium">
              <ShieldCheck size={12} className="text-orange-500/70" /> Transaksi Anda dilindungi enkripsi SSL 256-bit
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <main className="relative flex min-h-screen w-full flex-col bg-black text-gray-200 selection:bg-orange-500/30 overflow-x-hidden font-sans">
      <Navbar />

      {/* Background Decor */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <Image src="/earth.webp" alt="bg" fill className="object-cover" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.05),transparent)]" />
      </div>

      {/* Membungkus form di dalam Suspense karena menggunakan hook useSearchParams */}
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-orange-500 font-bold">Memuat pesanan...</p></div>}>
        <CheckoutForm />
      </Suspense>

      <Footer />
    </main>
  );
}