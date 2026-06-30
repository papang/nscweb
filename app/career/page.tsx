"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Star, 
  Users, 
  Coffee, 
  Rocket, 
  ArrowRight,
  X,
  CheckCircle2,
  Send
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Data pekerjaan ditambahkan dengan deskripsi dan kualifikasi untuk keperluan Modal
const jobs = [
  {
    title: "Network Engineer (Satellite Specialist)",
    type: "Full-time",
    location: "Jakarta / Remote",
    category: "Technical",
    description: "Bertanggung jawab atas pemantauan, pemeliharaan, dan optimalisasi infrastruktur jaringan satelit LEO. Anda akan memastikan tingkat layanan (SLA) terpenuhi dan melakukan troubleshooting tingkat lanjut untuk klien enterprise di seluruh Indonesia.",
    qualifications: [
      "S1 Teknik Telekomunikasi, Teknik Elektro, atau bidang terkait.",
      "Pengalaman minimal 3 tahun di bidang jaringan telekomunikasi atau VSAT.",
      "Memiliki sertifikasi jaringan (Cisco CCNP / Mikrotik MTCRE) menjadi nilai plus.",
      "Pemahaman kuat tentang protokol routing (BGP, OSPF) dan manajemen bandwidth.",
      "Bersedia bekerja dalam sistem shift untuk memastikan monitoring jaringan 24/7."
    ]
  },
  {
    title: "Account Executive",
    type: "Full-time",
    location: "Surabaya",
    category: "Sales",
    description: "Menjadi ujung tombak perusahaan dalam memperkenalkan solusi internet satelit NSC ke sektor korporasi dan maritim di wilayah Timur. Anda akan membangun relasi B2B jangka panjang dan mencapai target pertumbuhan wilayah secara agresif.",
    qualifications: [
      "Pengalaman minimal 2 tahun dalam B2B Sales, lebih disukai di industri IT/Telco.",
      "Memiliki kemampuan negosiasi dan presentasi yang sangat baik.",
      "Mampu menyusun proposal penawaran teknis dan komersial.",
      "Memiliki jaringan koneksi yang luas di industri pertambangan, maritim, atau logistik.",
      "Berorientasi pada target dan mampu bekerja dengan supervisi minimum."
    ]
  },
  {
    title: "Customer Success Lead",
    type: "Full-time",
    location: "Jakarta",
    category: "Operations",
    description: "Memimpin tim Customer Success untuk memastikan klien mendapatkan nilai maksimal dari layanan internet satelit Akastar. Anda akan berperan sebagai jembatan antara klien dan tim teknis untuk menyelesaikan masalah kritis dengan cepat.",
    qualifications: [
      "Pengalaman 4+ tahun di bidang Customer Success, Account Management, atau Technical Support.",
      "Mampu menerjemahkan masalah teknis (jaringan/internet) ke dalam bahasa yang mudah dipahami klien.",
      "Berpengalaman menggunakan software CRM (Zendesk / Salesforce).",
      "Memiliki kemampuan leadership dan problem-solving yang tajam.",
      "Mampu bekerja di bawah tekanan dengan KPI resolusi keluhan pelanggan."
    ]
  },
];

const benefits = [
  { icon: <Users size={24} />, title: "Kolaborasi Global", desc: "Bekerja dengan ahli telekomunikasi terbaik dunia." },
  { icon: <Coffee size={24} />, title: "Work-Life Balance", desc: "Jam kerja fleksibel dan lingkungan kerja suportif." },
  { icon: <Rocket size={24} />, title: "Inovasi Tanpa Batas", desc: "Akses ke teknologi satelit LEO terbaru." },
  { icon: <Star size={24} />, title: "Pengembangan Karier", desc: "Program pelatihan dan sertifikasi berkala." },
];

export default function CareerPage() {
  // State untuk melacak pekerjaan mana yang diklik
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);

  return (
    <main className="relative flex min-h-screen w-full flex-col bg-black text-gray-200 selection:bg-orange-500/30 overflow-x-hidden font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src="/career-hero.webp"
          alt="Career at NSC"
          fill
          priority
          className="object-cover brightness-[0.35]"
        />
        {/* Gradient overlay disesuaikan agar menyatu dengan latar hitam */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.h4 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-[10px] md:text-[16px] font-black uppercase tracking-[0.5em] text-orange-500 opacity-80"
          >
            Join Our Mission
          </motion.h4>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-4xl font-extrabold uppercase tracking-tighter md:text-6xl lg:text-7xl text-white"
          >
            Bangun Masa Depan <br /> <span className="text-orange-500">Konektivitas</span> Indonesia
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-gray-400 md:text-lg font-medium"
          >
            Kami mencari talenta berbakat yang berani bermimpi besar untuk menghubungkan seluruh pelosok nusantara melalui teknologi satelit terdepan.
          </motion.p>
        </div>
      </section>

      <div className="relative z-10 flex flex-col items-center px-6 py-24 md:px-12 lg:px-24">
        
        {/* Culture/Benefits Section */}
        <div className="mb-32 grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item, idx) => (
            <div key={idx} className="group rounded-2xl border border-white/10 bg-[#111111] p-8 backdrop-blur-md transition-all duration-300 hover:bg-orange-500 hover:border-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]">
              <div className="mb-4 text-orange-500 group-hover:text-black transition-colors">
                {item.icon}
              </div>
              <h3 className="mb-2 font-black uppercase tracking-wider text-sm text-white group-hover:text-black transition-colors">{item.title}</h3>
              <p className="text-xs leading-relaxed text-gray-500 group-hover:text-black/80 transition-colors font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Open Positions Section */}
        <div className="w-full max-w-5xl mb-10">
          <div className="mb-16 flex flex-col items-center text-center">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500/80 mb-2">Opportunities</h4>
            <h2 className="mb-4 text-3xl font-bold uppercase tracking-tight md:text-4xl text-white">Posisi Terbuka</h2>
            <div className="h-1.5 w-20 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)] rounded-full" />
          </div>

          <div className="space-y-4">
            {jobs.map((job, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ x: 12 }}
                onClick={() => setSelectedJob(job)} // Trigger modal di sini
                className="group flex flex-col justify-between rounded-2xl border border-white/5 bg-[#111111] p-8 transition-all hover:bg-[#1a1a1a] hover:border-orange-500/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.1)] md:flex-row md:items-center cursor-pointer"
              >
                <div className="mb-6 md:mb-0">
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 group-hover:text-orange-400 transition-colors">{job.category}</span>
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors mt-1">{job.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-4 text-xs font-medium text-gray-500 group-hover:text-gray-400 transition-colors">
                    <span className="flex items-center gap-2"><MapPin size={14}/> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock size={14}/> {job.type}</span>
                  </div>
                </div>
                <button className="inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/10 px-8 py-4 text-[11px] font-black uppercase tracking-widest text-white transition-all group-hover:bg-orange-500 group-hover:text-black group-hover:border-orange-500 active:scale-95 shadow-lg">
                  Lihat Detail <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* --- MODAL DETAIL PEKERJAAN --- */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Overlay Hitam Blur */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedJob(null)} 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer" 
            />
            
            {/* Kontainer Modal */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#111111] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
            >
              {/* Hiasan Cahaya di Pojok Kanan Atas Modal */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />

              {/* Modal Header */}
              <div className="flex items-start justify-between p-6 md:p-8 border-b border-white/5 relative z-10">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{selectedJob.title}</h2>
                  <div className="flex flex-wrap items-center gap-3 md:gap-5 text-xs font-bold text-gray-400">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5"><Briefcase size={14} className="text-orange-500" /> {selectedJob.category}</span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5"><MapPin size={14} className="text-orange-500" /> {selectedJob.location}</span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5"><Clock size={14} className="text-orange-500" /> {selectedJob.type}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedJob(null)} 
                  className="p-2 rounded-full bg-black/50 text-gray-400 hover:text-orange-500 hover:bg-white/10 transition-all flex-shrink-0"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar relative z-10 flex-grow">
                <div className="mb-8">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-orange-500 mb-4">Job Description</h3>
                  <p className="text-gray-300 leading-relaxed font-medium">
                    {selectedJob.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-orange-500 mb-4">Kualifikasi</h3>
                  <ul className="space-y-3">
                    {selectedJob.qualifications.map((qual, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300 font-medium">
                        <CheckCircle2 size={18} className="text-orange-500 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{qual}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer (Action Button & Email Info) */}
              <div className="p-6 md:p-8 border-t border-white/5 bg-black/20 relative z-10">
                <button className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-orange-500 text-black text-[11px] font-black uppercase tracking-[0.2em] hover:bg-orange-400 transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] active:scale-95">
                  <Send size={16} /> Kirim Lamaran Sekarang
                </button>
                <p className="text-center text-[11px] text-gray-400 mt-5 font-medium leading-relaxed">
                  Atau kirimkan CV dan Portfolio Anda ke <span className="text-orange-500 font-bold">talent@nsc.id</span><br className="hidden sm:block" /> dengan subjek email <span className="text-white font-bold">{selectedJob.title} - [Nama Anda]</span>.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />

      {/* Styling untuk custom scrollbar pada Modal */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(249, 115, 22, 0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(249, 115, 22, 0.6); }
      `}</style>
    </main>
  );
}