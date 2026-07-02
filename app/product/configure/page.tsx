"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { ArrowLeft, ShoppingCart, Calculator, Wallet, Box } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatDecimal } from "@/app/utils/format";

const TYPE_OPTIONS = ["Dedicated", "Lite", "Broadband"];
const CHARGE_OPTIONS = ["MRC", "OTC"];
type TerritoryDict = { [key:string] : string };
const territoryDict: TerritoryDict = { M: "Maritim", L: "Land" };

function useAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .finally(() => setLoading(false));
  }, []);

  return { loading, user, isAuthenticated: !!user };
}

function useProducts() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/prod")
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) setProducts(data.data);
      })
      .catch(console.error);
  }, []);

  return products;
}

function useServices() {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/service")
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) setServices(data.data);
      })
      .catch(console.error);
  }, []);

  return services;
}

function useSKUs() {
  const [skus, setSkus] = useState<any>({});

  useEffect(() => {
    fetch("/api/skusvc")
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) setSkus(data.data);
      })
      .catch(console.error);
  }, []);

  return skus;
}

function ProductConfigureContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service");
  const territory = searchParams.get("territory"); // "M" | "L"

  const { isAuthenticated } = useAuth();
  const services = useServices();
  const SKUs = useSKUs();

  const [activeTab, setActiveTab] = useState<"mrc" | "otc">("mrc");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCharge, setSelectedCharge] = useState<string | null>("MRC");
  const [selectedSKU, setSelectedSKU] = useState<string | null>(null);

  const service = services.find((p) => p.service_id === serviceId);
  const skuItems: any[] = serviceId ? SKUs[serviceId] || [] : [];

  const filteredSKUs = skuItems.filter(
    (s: any) => s.territory_code === territory && (!selectedType || s.service_bw_name === selectedType) && (!selectedCharge || s.charge_type_code === selectedCharge)
  );

  const selectedItem = skuItems.find((s: any) => s.sku_id === selectedSKU);

  // Produk-produk yang masuk ke grup MRC & OTC pada kalkulator.
  // Dibuat sebagai array supaya siap dikembangkan jika nanti ada
  // lebih dari satu produk terpilih per grup.
  const mrcItems = selectedItem ? [selectedItem] : [];
  const otcItems = selectedItem ? [selectedItem] : [];

  const totalMRC = selectedItem ? Number(selectedItem.mrc) : 0;
  const totalOTC = selectedItem ? Number(selectedItem.otc) : 0;
  const totalDueToday = totalMRC + totalOTC;

  const handleConfirmOrder = async () => {
    if (!selectedSKU) return;

    const response = await fetch("/api/order/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sku_select: selectedSKU }),
    });
    const result = await response.json();

    if (result.success) {
      Swal.fire({
        title: "",
        text: "Pilihan Produk Anda telah disimpan.\nIngin memilih produk kembali?",
        icon: "success",
        background: "#111",
        color: "#fff",
        showCancelButton: true,
        confirmButtonColor: "#f97316",
        cancelButtonColor: "#523232",
        confirmButtonText: "Lanjut Pilih Produk",
        cancelButtonText: "Checkout",
      }).then((res) => {
        if (!res.isConfirmed) {
          router.push("/product/checkout");
        } else {
          router.push("/product");
        }
      });
    } else {
      alert(result.message);
    }
  };

  if (!serviceId || !territory) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-6">
        <p className="text-gray-400 font-medium">
          Layanan atau teritori belum dipilih. Silakan kembali ke daftar layanan.
        </p>
        <Link
          href="/product"
          className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors text-sm font-bold"
        >
          <ArrowLeft size={16} /> Kembali ke Layanan
        </Link>
      </div>
    );
  }

  return (
    <div className="relative z-10 container mx-auto px-6 pt-32 pb-24 lg:px-12">
      {/* Header */}
      <div className="mb-10">
        <Link
          href="/product"
          className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors mb-6 text-sm font-bold"
        >
          <ArrowLeft size={16} /> Kembali
        </Link>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            {service?.service_name ?? "Konfigurasi Produk"}
          </h1>
          <p className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-orange-500 mt-2">
            Teritori: {territoryDict[territory as keyof TerritoryDict] || territory}
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* LEFT: Pilihan Tipe + Tab MRC/OTC */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Pilih Tipe */}
          <div className="bg-[#111111] border border-white/10 rounded-[24px] p-6 md:p-8 shadow-2xl">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">
              Tipe Bandwidth
            </h2>
            <div className="flex flex-wrap gap-2">
              {TYPE_OPTIONS.map((ty) => (
                <button
                  key={ty}
                  type="button"
                  onClick={() => {
                    setSelectedType(ty);
                    setSelectedSKU(null);
                  }}
                  className={`px-5 py-2.5 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-widest border transition-all active:scale-95 ${
                    selectedType === ty
                      ? "bg-orange-500 text-black border-orange-500"
                      : "bg-[#0a0a0a] text-gray-400 border-white/10 hover:border-orange-500/50 hover:text-orange-500"
                  }`}
                >
                  {ty}
                </button>
              ))}
            </div>
          </div>

          {/* Tab MRC / OTC (tanpa Mounts) */}
          <div className="bg-[#111111] border border-white/10 rounded-[24px] p-6 md:p-8 shadow-2xl">
            <div className="flex items-center gap-8 border-b border-white/10 mb-6">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("mrc");
                  setSelectedCharge("MRC");
                }}
                className={`relative pb-4 text-xs font-black uppercase tracking-widest transition-colors ${
                  activeTab === "mrc" ? "text-white" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <Wallet size={14} /> Layanan
                </span>
                {activeTab === "mrc" && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-orange-500"
                  />
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("otc");
                  setSelectedCharge("OTC");
                }}
                className={`relative pb-4 text-xs font-black uppercase tracking-widest transition-colors ${
                  activeTab === "otc" ? "text-white" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <Box size={14} /> Perangkat Keras
                </span>
                {activeTab === "otc" && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-orange-500"
                  />
                )}
              </button>
            </div>

            {!selectedType ? (
              <div className="py-16 text-center text-gray-500 font-medium text-sm">
                Silakan pilih tipe terlebih dahulu.
              </div>
            ) : filteredSKUs.length === 0 ? (
              <div className="py-16 text-center text-gray-500 font-medium text-sm">
                Tidak ada produk untuk kombinasi {territoryDict[territory as keyof TerritoryDict] || territory} - {selectedType}.
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  {filteredSKUs.map((item: any) => {
                    const checked = selectedSKU === item.sku_id;
                    const priceLabel = activeTab === "mrc" ? "Harga langganan / bulan" : "1 Kali Pembayaran";
                    // const priceValue = activeTab === "mrc" ? item.mrc : item.otc;
                    const priceValue = item.unit_price; 

                    return (
                      <label
                        key={item.sku_id}
                        className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-5 py-4 rounded-xl border cursor-pointer transition-all ${
                          checked
                            ? "border-orange-500 bg-orange-500/10"
                            : "border-white/10 bg-white/5 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <input
                            type="radio"
                            name="sku_select"
                            value={item.sku_id}
                            checked={checked}
                            onChange={() => setSelectedSKU(item.sku_id)}
                            className="mt-1 h-4 w-4 accent-orange-500"
                          />
                          <div>
                            <span className="block font-bold text-orange-300 text-base md:text-lg">
                              {item.service_name}
                            </span>
                            {(item.charge_type_code === "MRC") && ( 
                              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs md:text-sm">
                              
                                <div className="text-white/80">
                                  <span className="font-medium text-slate-400 text-[10px] uppercase block">Up</span>
                                  {item.spec_attributes.mir_up} 
                                </div>
                                <div className="text-white/80">
                                  <span className="font-medium text-slate-400 text-[10px] uppercase block">Down</span>
                                  {item.spec_attributes.mir_down}
                                </div>
                              
                              </div>
                            )}

                          </div>
                        </div>

                        <div className="md:text-right border-t md:border-t-0 pt-3 md:pt-0 border-white/10">
                          <span className="text-[10px] md:text-xs font-bold text-gray-400 block">
                            {priceLabel}
                          </span>
                          <span className="text-base md:text-lg font-black text-white">
                            Rp {formatDecimal(item.unit_price)} 
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </motion.div>

        {/* RIGHT: Kalkulator */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5"
        >
          <div className="sticky top-32 bg-[#111111] border border-white/10 rounded-[32px] p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg text-orange-500">
                <Calculator size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">Kalkulator Pesanan</h3>
            </div>

            <div className="space-y-6 mb-6 border-b border-white/10 pb-6">
              {/* Grup MRC - berisi produk-produk dengan biaya bulanan */}
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 block mb-3">
                  MRC · Biaya Bulanan
                </span>
                {mrcItems.length > 0 ? (
                  <div className="space-y-2">
                    {mrcItems.map((item) => (
                      <div
                        key={`mrc-${item.sku_id}`}
                        className="flex justify-between items-center gap-4 p-3 rounded-xl bg-white/5"
                      >
                        <div className="min-w-0">
                          <span className="block text-sm text-gray-100 font-bold truncate">
                            {item.sku_name}
                          </span>
                          <span className="block text-[10px] uppercase tracking-widest text-gray-500">
                            {territory}{selectedType ? ` · ${selectedType}` : ""}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-white whitespace-nowrap">
                          Rp {formatDecimal(item.mrc)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-white/5 text-sm text-gray-500 text-center">
                    Belum ada produk dipilih
                  </div>
                )}
              </div>

              {/* Grup OTC - berisi produk-produk dengan biaya sekali bayar */}
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 block mb-3">
                  OTC · Sekali Bayar
                </span>
                {otcItems.length > 0 ? (
                  <div className="space-y-2">
                    {otcItems.map((item) => (
                      <div
                        key={`otc-${item.sku_id}`}
                        className="flex justify-between items-center gap-4 p-3 rounded-xl bg-white/5"
                      >
                        <div className="min-w-0">
                          <span className="block text-sm text-gray-100 font-bold truncate">
                            {item.sku_name}
                          </span>
                          <span className="block text-[10px] uppercase tracking-widest text-gray-500">
                            {territory}{selectedType ? ` · ${selectedType}` : ""}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-white whitespace-nowrap">
                          Rp {formatDecimal(item.otc)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-white/5 text-sm text-gray-500 text-center">
                    Belum ada produk dipilih
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between mb-8">
              <div className="text-[12px] font-black tracking-widest text-orange-500 mb-1">
                <p className="uppercase">Total Bayar Pertama</p>
                <p className="text-gray-400 font-normal">{`*) Harga sebelum pajak`}</p>
              </div>
              <div className="text-2xl font-black text-white">Rp {formatDecimal(totalDueToday)}</div>
            </div>

            <button
              type="button"
              disabled={!selectedSKU}
              onClick={handleConfirmOrder}
              className="w-full flex items-center justify-center gap-2 py-4 bg-orange-500 text-black text-[12px] font-black
                uppercase tracking-[0.2em] rounded-xl hover:bg-orange-400 transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)]
                active:scale-95 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={16} /> Tambahkan Pesanan
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ProductConfigurePage() {
  return (
    <main className="relative flex min-h-screen w-full flex-col bg-black text-gray-200 selection:bg-orange-500/30 overflow-x-hidden font-sans">
      <Navbar />

      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <Image src="/earth.webp" alt="bg" fill className="object-cover" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.05),transparent)]" />
      </div>

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-orange-500 font-bold">Memuat konfigurasi produk...</p>
          </div>
        }
      >
        <ProductConfigureContent />
      </Suspense>

      <Footer />
    </main>
  );
}