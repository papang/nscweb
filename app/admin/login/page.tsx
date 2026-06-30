"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  
  // SIMULASI FRONTEND (Nanti dihapus saat integrasi Backend)
  // Membuat cookie bohongan agar Middleware membiarkan kita masuk
  document.cookie = "admin_token=dummy_token_123; path=/";
  
  router.push("/admin"); 
};

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-black px-6 selection:bg-orange-500/30 font-sans">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md p-8 md:p-10 bg-[#111111] border border-white/10 rounded-[32px] shadow-2xl"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">
            NSC <span className="text-orange-500">ADMIN</span>
          </h1>
          <p className="text-sm font-medium text-gray-400">
            Masuk ke sistem manajemen konten (CMS)
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="email" 
                placeholder="admin@nsc.id"
                required
                className="w-full bg-black border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="password" 
                placeholder="••••••••"
                required
                className="w-full bg-black border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full mt-4 py-4 rounded-xl bg-orange-500 text-black text-[11px] font-black uppercase tracking-[0.2em] hover:bg-orange-400 transition-all active:scale-95 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
          >
            Masuk Sistem
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-orange-500 transition-colors">
            <ArrowLeft size={14} /> Kembali ke Beranda
          </Link>
        </div>
      </motion.div>
    </main>
  );
}