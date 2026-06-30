"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Globe, 
  Zap, 
  Satellite, 
  ChevronRight, 
  ChevronDown,
  MonitorCheck, 
  ShoppingCart, 
  ShieldCheck,
  Cpu,
  Wifi,
  LogInIcon
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const products = [
  {
    id: "connectivity-l2",
    name: "Akastar Connectivity: Layer 2",
    category: "Connectivity",
    price: "5.500.000",
    description: "Solusi interkoneksi privat berbasis satelit LEO (Starlink Enterprise) yang bertindak sebagai virtual leased line aman untuk menghubungkan remote site langsung ke Data Center/HQ tanpa terekspos internet publik.",
    mainFeatures: "Isolasi trafik end-to-end, transparansi protokol jaringan, kompatibel penuh dengan arsitektur SD-WAN korporat, dan dukungan VLAN Stacking (QinQ).",
    targetMarket: "Sektor finansial/perbankan, instansi militer, kantor pemerintahan, dan Industri sensitif data.",
    image: "/darurat.webp",
    features: [
      "L2VPN Encapsulation",
      "Latensi ultra-rendah <40ms",
      "Bandwidth terkelola & SLA ketersediaan jaringan hingga 99%"
    ],
    icon: <Satellite className="w-6 h-6" />,
  },
  {
    id: "connectivity-l3",
    name: "Akastar Connectivity: Internet (Layer 3)",
    category: "Connectivity",
    price: "3.500.000",
    description: "Layanan akses internet publik premium berkecepatan tinggi berbasis satelit LEO untuk operasional bisnis di wilayah blankspot.",
    mainFeatures: "Opsi IP Publik Statis, optimalisasi jalur routing internasional murni, instalasi plug-and-play, dan dashboard monitoring penggunaan bandwidth.",
    targetMarket: "Mess perkebunan, site konstruksi baru, wilayah rural, dan kantor cabang pembantu di pelosok daerah.",
    image: "/hero4.webp",
    features: [
      "IPv4/IPv6 Public Routing",
      "Broadband download up to 220 Mbps, upload up to 25 Mbps",
      "Interkoneksi langsung ke global internet backbone"
    ],
    icon: <Globe className="w-6 h-6" />,
  },
  {
    id: "secure",
    name: "Akastar Secure",
    category: "SOC",
    price: "2.200.000",
    description: "Proteksi tambahan berlapis pada jaringan internet satelit Akastar untuk menangkal serangan siber dari lapisan luar hingga dalam.",
    mainFeatures: "Gateway Network Detection, Edge Network Detection, End Point Detection Response (EDR) / Next Generation Anti Virus (AV) berbasis cloud & On Premise, enkripsi trafik ujung-ke-ujung, content filtering, dan sistem pencegahan intrusi (IPS).",
    targetMarket: "Perusahaan skala Enterprise, retail di area terpencil yang memproses transaksi digital, dan infrastruktur kritikal.",
    image: "/hero3.webp",
    features: [
      "Cloud-based security gateway",
      "Monitoring keamanan siber proaktif",
      "Enkripsi AES-256 & pelaporan ancaman mingguan otomatis"
    ],
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    id: "iptv",
    name: "IPTV",
    category: "Bundling",
    price: "1.200.000",
    description: "Paket bundling terintegrasi yang menggabungkan konektivitas internet satelit LEO dengan platform hiburan TV interaktif untuk meningkatkan kesejahteraan karyawan atau pelanggan di lapangan.",
    mainFeatures: "Akses ke 60+ channel lokal dan premium internasional, dan optimasi bandwidth lokal.",
    targetMarket: "Kapal maritim (Kapal Transport/Kargo/Tanker), mess karyawan pertambangan, dan Hotel/resor pulau terpencil.",
    image: "/streaming.webp",
    features: [
      "Headend kompresi video HD/4K",
      "Set-Top Box (STB) IPTV Android",
      "Sistem manajemen konten terpusat"
    ],
    icon: <MonitorCheck className="w-6 h-6" />,
  },
  {
    id: "private-lte",
    name: "Akastar Bundling Solution: Private LTE",
    category: "Bundling",
    price: "12.500.000",
    description: "Penyediaan jaringan seluler privat mandiri (4G/5G) lokal di area terpencil yang dihubungkan ke jaringan pusat via backhaul satelit Akastar.",
    mainFeatures: "Sinyal seluler lokal yang andal, kartu SIM lokal khusus korporasi, panggilan suara (VoLTE), dan transfer data lokal tanpa kuota internet.",
    targetMarket: "Area konsesi pertambangan besar, kilang minyak pedalaman, dan kompleks perkebunan multinasional.",
    image: "/image2.webp",
    features: [
      "Infrastruktur eNodeB/gNodeB Femtocell kompak",
      "Core Network lokal & interkoneksi backhaul satelit terenkripsi",
      "Sistem manajemen konten terpusat"
    ],
    icon: <Wifi className="w-6 h-6" />,
  },
  {
    id: "iot-agriculture",
    name: "IoT - Agriculture",
    category: "Bundling",
    price: "4.500.000",
    description: "Ekosistem pertanian pintar berbasis IoT dengan transmisi data data sensor real-time via jaringan satelit LEO untuk optimalisasi hasil panen di area rural.",
    mainFeatures: "Sensor kelembapan tanah & cuaca mikro, otomatisasi sistem irigasi, dashboard analisis kesuburan, dan notifikasi anomali via aplikasi.",
    targetMarket: "Perusahaan perkebunan kelapa sawit, karet, tebu, dan pertanian skala industri (agribisnis).",
    image: "/NSC-mini.webp",
    features: [
      "Protokol sensor nirkabel (LoRaWAN/MQTT)",
      "Perangkat bersertifikasi IP67 (tahan cuaca)",
      "Visualisasi data berbasis cloud & integrasi API"
    ],
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    id: "iot-vessel",
    name: "IoT - Vessel Management",
    category: "Bundling",
    price: "6.800.000",
    description: "Solusi pelacakan, pemantauan aset, dan efisiensi manajemen operasional kapal laut secara real-time via konektivitas satelit.",
    mainFeatures: "Pelacakan posisi kapal (Vessel Tracking), monitoring konsumsi bahan bakar (fuel level sensor), telemetri mesin kapal, dan alarm darurat siber.",
    targetMarket: "Perusahaan logistik laut, kapal tanker minyak/gas, Industri perikanan komersial, dan kapal tunda (tugboat).",
    image: "/kapal.webp",
    features: [
      "Integrasi GPS presisi tinggi",
      "Sensor ultrasonik / aliran bahan bakar (Flow Meter)",
      "Transmisi data terjadwal otomatis & dashboard maritim khusus"
    ],
    icon: <Satellite className="w-6 h-6" />,
  },
  {
    id: "iot-environment",
    name: "IoT Environment",
    category: "Bundling",
    price: "5.200.000",
    description: "Solusi otomatisasi pemantauan parameter lingkungan hidup di sekitar wilayah operasional industri untuk pemenuhan regulasi dan pencegahan bencana.",
    mainFeatures: "Sensor kualitas udara (Particulate Matter), deteksi dini kebakaran hutan (wildfire early detection), dan alarm polusi otomatis.",
    targetMarket: "Industri manufaktur hulu, pembangkit listrik (PLTU/PLTA), dan area konservasi kehutanan.",
    image: "/konstruksi.webp",
    features: [
      "Sensor emisi gas & tingkat kedalaman air",
      "Integrasi platform pelaporan lingkungan hidup",
      "Operasi mandiri berbasis tenaga surya (solar panel powered)"
    ],
    icon: <Globe className="w-6 h-6" />,
  },
  {
    id: "soc",
    name: "Security Operation Center",
    category: "SOC",
    price: "15.000.000",
    description: "Layanan Security Operation Center (SOC) terkelola untuk memantau, mendeteksi, dan memitigasi ancaman siber pada seluruh infrastruktur jaringan bisnis secara real-time 24/7.",
    mainFeatures: "Monitoring keamanan siber 24/7/365, deteksi ancaman, manajemen insiden kilat, dan tim ahli siber (Cybersecurity Analyst) tersertifikasi.",
    targetMarket: "Kantor pusat korporasi, entitas perbankan, penyedia layanan publik, dan operasional industri strategis (B2B/B2G).",
    image: "/padang.webp",
    features: [
      "Arsitektur SIEM (Security Information and Event Management)",
      "Koordinasi respons insiden siber cepat",
      "Pelaporan kepatuhan regulasi data & sistem mitigasi otomatis"
    ],
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    id: "home-ftth",
    name: "Akastar Home: Area Bekasi (FTTH)",
    category: "FTTH",
    price: "450.000",
    description: "Layanan internet broadband berbasis kabel serat optik (FTTH) berkecepatan tinggi dan stabil untuk memenuhi kebutuhan digital rumah tangga, profesional, keluarga, dan pekerja Remote / WFH yang berdomisili di Area Bekasi.",
    mainFeatures: "Koneksi internet rumah berkecepatan tinggi, jaringan stabil berbasis fiber optik penuh tanpa terpengaruh cuaca, dan harga langganan bulanan kompetitif.",
    targetMarket: "Segmen konsumen residensial, keluarga, dan pekerja Remote / WFH yang berdomisili di Area Bekasi.",
    image: "/residential.webp",
    features: [
      "Infrastruktur jaringan kabel FTTH murni",
      "Bandwidth internet unlimited tanpa FUP ketat",
      "Modem Wi-Fi rumah terbundel standar"
    ],
    icon: <Zap className="w-6 h-6" />,
  }
];

const productCategories = ["Semua", "Connectivity", "Bundling", "SOC", "FTTH"];


export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/auth/me").then((res) =>
        res.json()
      )
      .then((data) => {
        setUser(data.user);
      })
      .finally(() =>
        setLoading(false)
      );
  }, []);

  return {
    loading,
    user,
    isAuthenticated:
      !!user,
  };
}

export default function ProductPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [activeId, setActiveId] = useState<string | null>(null);

  // Filter produk berdasarkan kategori
  const filteredProducts = activeCategory === "Semua"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const {
      loading,
      isAuthenticated,
      user,
    } = useAuth();

  return (
    <main className="relative flex min-h-screen w-full flex-col bg-black text-gray-200 selection:bg-orange-500/30 overflow-x-hidden font-sans">
      <Navbar />

      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <Image src="/earth.webp" alt="bg" fill className="object-cover" />
      </div>

      <section className="relative z-10 flex flex-col items-center justify-center px-6 pt-24 pb-8 text-center md:pt-48">
        <h1 className="mb-6 text-4xl font-extrabold uppercase tracking-tighter md:text-6xl text-white">
          Akastar <span className="text-orange-500">Series</span>
        </h1>
        <h4 className="mb-4 text-[10px] md:text-[16px] font-black uppercase tracking-[0.2em] md:tracking-[0.5em] text-orange-500 opacity-80 leading-relaxed max-w-[90%] md:max-w-none mx-auto">
          Tingkatkan koneksi dengan jangkauan dari orbit, <br className="hidden md:block" /> kami menjaga anda tetap terhubung.
        </h4>
      </section>

      {/* --- FILTER KATEGORI --- */}
      <section className="relative z-10 px-6 mb-8 flex justify-center">
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-4xl">
          {productCategories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setActiveId(null);
              }}
              className={`px-5 py-2.5 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all border active:scale-95 ${
                activeCategory === category
                  ? "bg-orange-500 text-black border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                  : "bg-[#111111] text-gray-400 border-white/10 hover:border-orange-500/50 hover:text-orange-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* --- ACCORDION LAYOUT (SESUAI ILUSTRASI) --- */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 py-8 flex flex-col items-center mb-20 w-full min-h-[50vh]">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-4xl flex flex-col gap-4"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const isOpen = activeId === product.id;

                return (
                  <div 
                    key={product.id}
                    className={`group flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 shadow-lg
                      ${isOpen 
                        ? 'bg-[#111111] border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.15)]' 
                        : 'bg-[#0a0a0a] border-white/10 hover:border-white/30 hover:bg-[#151515]'}
                    `}
                  >
                    {/* --- HEADER (BAR SEBELUM DI KLIK) --- */}
                    <div 
                      onClick={() => setActiveId(isOpen ? null : product.id)}
                      className="flex items-center justify-between p-4 md:p-6 w-full cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`transition-colors duration-300 ${isOpen ? 'text-orange-500' : 'text-gray-400'}`}>
                          {product.icon}
                        </div>
                        <h3 className={`text-sm md:text-base font-black uppercase tracking-[0.1em] transition-colors
                          ${isOpen ? 'text-orange-500' : 'text-gray-200'}
                        `}>
                          {product.name}
                        </h3>
                      </div>
                      
                      <div className={`flex items-center justify-center transition-transform duration-500 ${isOpen ? 'rotate-180 text-orange-500' : 'text-gray-500'}`}>
                        {/* Memilih chevron kanan/bawah sesuai wireframe. Di wireframe menggunakan > yang berubah jadi v */}
                        <ChevronDown size={24} />
                      </div>
                    </div>

                    {/* --- DETAIL PANEL (SETELAH DI KLIK) --- */}
                    <div 
                      className={`w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden
                        ${isOpen ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'}
                      `}
                    >
                      <div className="flex flex-col p-6 md:p-8 border-t border-white/10 w-full items-center text-center">
                        
                        {/* Gambar Produk (Tengah) */}
                        <div className="relative w-full max-w-2xl h-48 md:h-72 rounded-xl overflow-hidden mb-6 border border-white/10 shadow-inner">
                          <Image 
                            src={product.image} 
                            alt={product.name} 
                            fill 
                            className="object-cover" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-transparent" />
                        </div>

                        {/* Harga */}
                        <div className="mb-4">
                          <span className="text-2xl md:text-3xl font-black tracking-tighter text-white">
                            
                              {product.id === "home-ftth" ? "" : `${isAuthenticated ? "Rp ":""}` }{isAuthenticated ? product.price : ""}
                              {product.id === "home-ftth" ? `${isAuthenticated ? " / Bulan":""}` : ""}   
                          </span>
                        </div>

                        {/* Deskripsi */}
                        <p className="text-sm md:text-base leading-relaxed text-gray-300 font-medium mb-6 max-w-3xl">
                          {product.description}
                        </p>

                        {/* Fitur Utama & Target Pasar Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl mb-8 text-left">
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-[10px] font-black uppercase text-orange-500 tracking-[0.2em] mb-2">Fitur Utama</p>
                            <p className="text-xs md:text-sm leading-relaxed text-gray-300">
                              {product.mainFeatures}
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-[10px] font-black uppercase text-orange-500 tracking-[0.2em] mb-2">Ideal Untuk</p>
                            <p className="text-xs md:text-sm leading-relaxed text-gray-300">
                              {product.targetMarket}
                            </p>
                          </div>
                        </div>

                        {/* Spesifikasi Teknis List */}
                        <div className="w-full max-w-3xl text-left mb-8">
                          <p className="text-[10px] font-black uppercase text-orange-500 tracking-[0.2em] mb-4">Spesifikasi Teknis</p>
                          <div className="space-y-3">
                            {product.features.map((featureText, i) => (
                              <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-300">
                                <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                                <span>{featureText}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tombol Pesan */}
                        { (isAuthenticated) ? (
                          <a 
                            href="/product/checkout" 
                            className={`w-full max-w-xs rounded-xl bg-orange-500 py-4 text-xs font-black 
                            uppercase tracking-widest text-black shadow-[0_0_15px_rgba(249,115,22,0.3)] 
                            flex items-center justify-center gap-2 hover:bg-orange-400 transition-all active:scale-95 cursor-pointer
                            ${!isAuthenticated ? "hidden": ""}`}
                          >
                            <ShoppingCart size={16} /> Berlangganan
                          </a>
                      ) : (
                          <p className="text-center text-[15px] text-gray-400 mt-5 font-medium leading-relaxed">
                            Silahkan <a href="/login"><span className="text-orange-500 font-bold">sign-in</span></a> untuk mendapat simulasi harga<br className="hidden sm:block" />
                          </p>
                      ) }

                      </div>
                    </div>

                  </div>
                );
              })
            ) : (
              <div className="w-full py-20 text-center text-gray-500 font-medium">
                Belum ada produk untuk kategori ini.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      <Footer />
    </main>
  );
}