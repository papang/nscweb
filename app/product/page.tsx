"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  ChevronDown,
  ShoppingCart, 
  LogInIcon
} from "lucide-react";
import Swal from "sweetalert2";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatDecimal } from '@/app/utils/format';
import { getListSKUProduct } from "@/app/services/product.service";


export function listProductCategory() {
  const [listProductCat, setListProductCat] = useState(["Semua"]);

  useEffect(() => {
    fetch("/api/prod-cat").then((res) => res.json())
      .then((data) => {
        let productCategories = Object.keys(data.data).map(key => data.data[key].category_name);
        setListProductCat(productCategories);
      });
  }, []);

  return listProductCat;
}

export function listProducts() {
  const [listProducts, setListProducts] = useState(Object);

  useEffect(() => {
    fetch("/api/prod").then((res) => res.json())
      .then((data) => {
        let products = data.data;
        setListProducts(products);
      });
  }, []);

  return listProducts;
}

export function listSKU() {
  const [listSKU, setListSKU] = useState(Object);

  useEffect(() => {
    fetch("/api/sku").then((res) => res.json())
      .then((data) => {
        let SKU = data.data;
        setListSKU(SKU);
      });
  }, []);

  return listSKU;
}


const hndlrChooseProduct = async (
    e: FormEvent<HTMLFormElement> 
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget); 
    const skuSelect = formData.get("sku_select");
    // alert(skuSelect);

    const response = await fetch(
      "/api/order/new",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "sku_select" : skuSelect,
        }),
      }
    );

    

    const result = await response.json();
    if(result.success) {

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
      }).then((result) => {
        if (!result.isConfirmed) {
          window.location.href="/product/checkout";
        } 
      });

    } else {
      alert(result.message);
    }

  };


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

  const productCategories = listProductCategory();
  const products = listProducts();
  const SKUs = listSKU();

  const filteredProducts = activeCategory === "Semua"
    ? products
    : products.filter((p) => p.category_name === activeCategory);

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
                const isOpen = activeId === product.product_id;

                return (
                  <div 
                    key={product.product_id}
                    className={`group flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 shadow-lg
                      ${isOpen 
                        ? 'bg-[#111111] border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.15)]' 
                        : 'bg-[#0a0a0a] border-white/10 hover:border-white/30 hover:bg-[#151515]'}
                    `}
                  >
                    {/* --- HEADER (BAR SEBELUM DI KLIK) --- */}
                    <div 
                      onClick={() => setActiveId(isOpen ? null : product.product_id)}
                      className="flex items-center justify-between p-4 md:p-6 w-full cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`transition-colors duration-300 ${isOpen ? 'text-orange-500' : 'text-gray-400'}`} 
                          dangerouslySetInnerHTML={{ __html: product.product_icon }}
                        >
                          {/* {product.product_icon} */}
                        </div>
                        <h3 className={`text-sm md:text-base font-black uppercase tracking-[0.1em] transition-colors
                          ${isOpen ? 'text-orange-500' : 'text-gray-200'}
                        `}>
                          {product.product_name}
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
                            src={product.product_image} 
                            alt={product.product_name} 
                            fill 
                            className="object-cover" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-transparent" />
                        </div>

                        {/* Harga */}
                        {/* <div className="mb-4">
                          <span className="text-2xl md:text-3xl font-black tracking-tighter text-white">
                            
                              {product.product_id === "home-ftth" ? "" : `${isAuthenticated ? "Rp ":""}` }{isAuthenticated ? formatDecimal(product.product_price) : ""}
                              {product.product_id === "home-ftth" ? `${isAuthenticated ? " / Bulan":""}` : ""}   
                          </span>
                        </div> */}

                        {/* Deskripsi */}
                        <p className="text-sm md:text-base leading-relaxed text-gray-300 font-medium mb-6 max-w-3xl">
                          {product.product_desc}
                        </p>

                        {/* Fitur Utama & Target Pasar Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl mb-8 text-left">
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-[10px] font-black uppercase text-orange-500 tracking-[0.2em] mb-2">Fitur Utama</p>
                            <p className="text-xs md:text-sm leading-relaxed text-gray-300">
                              {product.features}
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-[10px] font-black uppercase text-orange-500 tracking-[0.2em] mb-2">Ideal Untuk</p>
                            <p className="text-xs md:text-sm leading-relaxed text-gray-300">
                              {product.segment_desc}
                            </p>
                          </div>
                        </div>

                        {/* Spesifikasi Teknis List */}
                        <div className="w-full max-w-3xl text-left mb-8">
                          <p className="text-[10px] font-black uppercase text-orange-500 tracking-[0.2em] mb-4">Spesifikasi Teknis</p>
                          <div className="space-y-3">
                            {product.specification.map((specificationText, i) => (
                              <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-300">
                                <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                                <span>{specificationText}</span>
                              </div>
                            ))}
                          </div>
                        </div>


                        {/* Pilihan SKU */}

                        { (isAuthenticated) ? (
                          (!SKUs[product.product_id]) ? (
                            <div className="w-full max-w-3xl text-left mb-8">
                              <p className="text-[10px] font-black uppercase text-orange-500 tracking-[0.2em] mb-4 font-italic">Tidak terdapat pilihan produk</p>
                            </div>
                          ) : (

                          <div className="w-full max-w-3xl text-left mb-8">
                            <p className="text-[10px] font-black uppercase text-orange-500 tracking-[0.2em] mb-4">Pilih Produk</p>

                            <form className="space-y-5 items-center" onSubmit={hndlrChooseProduct}>
                              <div className="grid grid-cols-1 gap-3 overflow-y-auto h-128">
                                
                                  {/* SKU Product 0 */}
                                  { SKUs[product.product_id]?.map((itemsku) => (
                                    <label
                                      key={itemsku.sku_id}
                                      className={`relative flex flex-col md:flex-row md:items-center md:justify-between px-5 py-2 
                                      rounded-xl border-1 border-white/20 cursor-pointer transition-all 
                                      ${(itemsku.prodstream_name == 'MRC Maritim') ? "bg-[#00A8B5]/20" : "bg-[#C2B280]/20" }
                                      `}
                                    >
                                      <div className="flex items-start gap-4">
                                        {/* Input Radio */}
                                        <input
                                          type="radio"
                                          name="sku_select"
                                          value={itemsku.sku_id}
                                          checked={true}
                                          onChange={() => {}}
                                          className="mt-1 h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                                        />
                                        
                                        {/* Detail Spesifikasi */}
                                        <div>
                                          <span className="block font-bold text-orange-300 text-lg">{itemsku.sku_name}</span>
                                          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-slate-600">
                                            <div className="text-white/80"><span className="font-medium text-slate-400 text-xs uppercase block">
                                              {((itemsku.spec_mir_up) ? "Up" : "")}</span> {itemsku.spec_mir_up}</div>
                                            <div className="text-white/80"><span className="font-medium text-slate-400 text-xs uppercase block">
                                              {((itemsku.spec_mir_down) ? "Down" : "")}</span> {itemsku.spec_mir_down}</div>
                                            <div className="col-span-2 mt-1">
                                              <span className="font-medium text-slate-400 text-xs uppercase block">{itemsku.prodstream_name} - {itemsku.prodtype_name}</span> 
                                              {/* <span className="text-blue-700 font-medium">plan.terminal</span> */}
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Harga */}
                                      <div className="mt-4 md:mt-0 md:text-right border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                                        <span className="text-xs md:text-sm leading-relaxed text-gray-300 block">Harga</span>
                                        <span className="text-md font-bold text-white">
                                          Rp {formatDecimal(itemsku.unit_price)}
                                        </span>
                                      </div>
                                    </label>
                                  ))}

                                
                              </div>

                              <div className="flex justify-between items-center w-full">
                                <button type="submit" 
                                  className={`w-full max-w-xs rounded-xl bg-orange-500 py-4 text-xs font-black 
                                  uppercase tracking-widest text-black shadow-[0_0_15px_rgba(249,115,22,0.3)] 
                                  flex items-center justify-center gap-2 hover:bg-orange-400 transition-all active:scale-95 cursor-pointer
                                  ${!isAuthenticated ? "hidden": ""}`}
                                >
                                  <ShoppingCart size={16} /> Tambahkan Pesanan
                                  {/* Berlangganan */}
                                </button>
                              </div>

                            </form>

                          </div>

                        )) : (
                          <>
                          </>
                        ) }
                        


                        {/* Tombol Pesan */}
                        { (isAuthenticated) ? (
                              <></>
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