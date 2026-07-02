"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ChevronDown,
  ShoppingCart,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TerritoryModal from "@/components/TerritoryModal";
import Link from "next/link";

export function listServiceCategory() {
  const [listServiceCat, setListServiceCat] = useState(["Semua"]);

  useEffect(() => {
    fetch("/api/service-cat").then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          let serviceCategories = Object.keys(data.data).map(key => data.data[key].cat_name);
          setListServiceCat(["Semua", ...serviceCategories]);
        }
      })
      .catch(console.error);
  }, []);

  return listServiceCat;
}

export function listServices() {
  const [listServices, setListServices] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/service").then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          let services = data.data;
          setListServices(services);
        }
      })
      .catch(console.error);
  }, []);

  return listServices;
}

export function listSKU() {
  const [listSKU, setListSKU] = useState<any>({});

  useEffect(() => {
    fetch("/api/sku").then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          let SKU = data.data;
          setListSKU(SKU);
        }
      })
      .catch(console.error);
  }, []);

  return listSKU;
}

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
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState("Semua");
  const [activeId, setActiveId] = useState<string | null>(null);

  // State untuk modal pemilihan teritori
  const [territoryModalOpen, setTerritoryModalOpen] = useState(false);
  const [orderingProductId, setOrderingProductId] = useState<string | null>(null);
  const [orderingProductName, setOrderingProductName] = useState<string | null>(null);

  const serviceCategories = listServiceCategory();
  const services = listServices();
  console.log
  const SKUs = listSKU();

  const filteredServices = activeCategory === "Semua"
    ? services
    : services.filter((p) => p.cat_name === activeCategory);

  const { loading, isAuthenticated, user } = useAuth();

  // Buka modal pemilihan teritori untuk produk yang dipilih
  const startOrdering = (productId: string, productName: string) => {
    setOrderingProductId(productId);
    setOrderingProductName(productName);
    setTerritoryModalOpen(true);
  };

  const closeTerritoryModal = () => {
    setTerritoryModalOpen(false);
    setOrderingProductId(null);
    setOrderingProductName(null);
  };

  // Setelah teritori dipilih, arahkan ke halaman konfigurasi produk baru
  const handleTerritorySelect = (territory: "M" | "L") => {
    if (!orderingProductId) return;
    const productId = orderingProductId;
    setTerritoryModalOpen(false);
    setOrderingProductId(null);
    setOrderingProductName(null);
    router.push(
      `/product/configure?service=${encodeURIComponent(productId)}&territory=${encodeURIComponent(territory)}`
    );
  };

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
          {serviceCategories.map((category) => (
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

      {/* --- ACCORDION LAYOUT --- */}
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
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => {
                const isOpen = activeId === service.service_id;

                return (
                  <div
                    key={service.service_id}
                    className={`group flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 shadow-lg
                      ${isOpen
                        ? 'bg-[#111111] border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.15)]'
                        : 'bg-[#0a0a0a] border-white/10 hover:border-white/30 hover:bg-[#151515]'}
                    `}
                  >
                    <div
                      onClick={() => setActiveId(isOpen ? null : service.service_id)}
                      className="flex items-center justify-between p-4 md:p-6 w-full cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`transition-colors duration-300 ${isOpen ? 'text-orange-500' : 'text-gray-400'}`}
                          dangerouslySetInnerHTML={{ __html: service.service_icon }}
                        />
                        <h3 className={`text-sm md:text-base font-black uppercase tracking-[0.1em] transition-colors
                          ${isOpen ? 'text-orange-500' : 'text-gray-200'}
                        `}>
                          {service.service_name}
                        </h3>
                      </div>

                      <div className={`flex items-center justify-center transition-transform duration-500 ${isOpen ? 'rotate-180 text-orange-500' : 'text-gray-500'}`}>
                        <ChevronDown size={24} />
                      </div>
                    </div>

                    <div
                      className={`w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden
                        ${isOpen ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'}
                      `}
                    >
                      <div className="flex flex-col p-6 md:p-8 border-t border-white/10 w-full items-center text-center">

                        <div className="relative w-full max-w-2xl h-48 md:h-72 rounded-xl overflow-hidden mb-6 border border-white/10 shadow-inner">
                          <Image
                            src={service.service_img}
                            alt={service.service_name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-transparent" />
                        </div>

                        <p className="text-sm md:text-base leading-relaxed text-gray-300 font-medium mb-6 max-w-3xl">
                          {service.service_desc}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl mb-8 text-left">
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-[10px] font-black uppercase text-orange-500 tracking-[0.2em] mb-2">Fitur Utama</p>
                            <p className="text-xs md:text-sm leading-relaxed text-gray-300">
                              {service.spec_attributes.feature}
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-[10px] font-black uppercase text-orange-500 tracking-[0.2em] mb-2">Ideal Untuk</p>
                            <p className="text-xs md:text-sm leading-relaxed text-gray-300">
                              {service.spec_attributes.segment}
                            </p>
                          </div>
                        </div>

                        <div className="w-full max-w-3xl text-left mb-8">
                          <p className="text-[10px] font-black uppercase text-orange-500 tracking-[0.2em] mb-4">Spesifikasi Teknis</p>
                          <div className="space-y-3">
                            {service.spec_attributes.specs.map((specificationText: string, i: number) => (
                              <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-300">
                                <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                                <span>{specificationText}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tombol "Pilih Produk" -> buka modal teritori -> redirect ke halaman configure */}
                        {isAuthenticated ? (
                          (!SKUs[service.service_id] || SKUs[service.service_id].length === 0) ? (
                            <div className="w-full max-w-3xl text-left mb-8">
                              <Link href="/hubungi-kami" className="block w-full bg-slate-500 text-black text-center font-black text-[10px] uppercase py-3 rounded-xl hover:bg-slate-400 transition-all tracking-[0.2em] shadow-[0_0_15px_rgba(249,115,22,0.3)] active:scale-95 mt-2">
                                Kontak Sales untuk informasi produk
                              </Link>
                            </div>
                          ) : (
                            <div className="w-full max-w-3xl text-left mb-8">
                              <button
                                type="button"
                                onClick={() => startOrdering(service.service_id, service.service_name)}
                                className="w-full rounded-xl bg-orange-500 py-4 text-xs font-black uppercase tracking-widest text-black shadow-[0_0_15px_rgba(249,115,22,0.3)] flex items-center justify-center gap-2 hover:bg-orange-400 transition-all active:scale-95"
                              >
                                <ShoppingCart size={16} /> Pilih Layanan
                              </button>
                            </div>
                          )
                        ) : (
                          <p className="text-center text-[15px] text-gray-400 mt-5 font-medium leading-relaxed">
                            Silahkan <a href="/login"><span className="text-orange-500 font-bold">sign-in</span></a> untuk mendapat simulasi harga<br className="hidden sm:block" />
                          </p>
                        )}

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

      <TerritoryModal
        isOpen={territoryModalOpen}
        productName={orderingProductName ?? undefined}
        onClose={closeTerritoryModal}
        onSelect={handleTerritorySelect}
      />

      <Footer />
    </main>
  );
}