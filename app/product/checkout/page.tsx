"use client";

import { useState, Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
// import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Blocks,
  Send,
  Calculator
} from "lucide-react";
import Navbar from "@/components/Navbar";
import DeleteButton from "@/components/DeleteButton";
import Footer from "@/components/Footer";
import { formatDecimal } from '@/app/utils/format';
import Modal from "@/components/Modal";
import DialogInfo from "@/components/DialogInfo";
import { sendmail_order } from "@/app/lib/sendmail_order";

let userid = 34;

export function listSKUOrder() {
  const [totalNum, setTotalNum] = useState(0);
  const [listSKU, setListSKU] = useState(Object);
  const [productSum, setProductSum] = useState(Object);

  useEffect(() => {
    fetch("/api/order").then((res) => res.json())
      .then((data) => {
        // console.log("ini data");
        // console.log(data.data);
        setListSKU(data.data);
        setProductSum(data.summary.byproduct);
        setTotalNum(data.summary.all);
      });
  }, []);

  return { listSKU, productSum, totalNum };
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


export default function CheckoutPage() {
  // const [paymentMethod, setPaymentMethod] = useState("transfer");
  // const searchParams = useSearchParams();
  // const planQuery = searchParams.get("plan");

  const { loading, isAuthenticated, user } = useAuth();
  // console.log(user);

  const { listSKU, productSum, totalNum } = listSKUOrder();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hndlrCheckout = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const response = await fetch(
      "/api/order/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

        }),
      }
    );
    const result = await response.json();

    // alert(JSON.stringify(result.data));

    if (result.data) {
      const resEmail = await sendmail_order({
        name: result.data.person.username,
        email: result.data.person.email,
        orders: result.data.orders,
      });


      if (resEmail.success) {
        setIsModalOpen(true);
      } else {
        alert(resEmail.message);
      }
    }

  };



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


        <div className="relative z-10 container mx-auto px-6 pt-32 pb-24 lg:px-12">

          {/* Navigation & Header */}
          <div className="mb-12">
            <Link href="/product" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors mb-6 text-sm font-bold">
              <ArrowLeft size={16} /> Kembali
            </Link>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-4xl md:text-3xl font-bold tracking-tight text-white">Daftar Pesanan</h1>
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
                    <Blocks size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-white">Rincian</h2>
                </div>


                {/* Product yg dipilih 0*/}

                {
                  (isAuthenticated && listSKU.length > 0) ? (
                    listSKU.map((items) => (
                      <div>
                        <label
                          key={items.sku_id}
                          className={`relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 
                              mb-5 px-5 py-2 rounded-xl transition-all 
                              ${(items.prodstream_name == 'MRC Maritim') ? "bg-[#00A8B5]/20" : "bg-[#C2B280]/20"}
                              `}
                        >
                          <div className="flex items-center gap-4">
                            <DeleteButton onClick={() => alert("Fitur hapus order akan segera diimplementasikan")} />

                            {/* Detail Spesifikasi */}
                            <div>
                              <span className="block font-bold text-orange-300 text-lg">{items.sku_name}</span>
                              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-slate-600">
                                <div className="text-white/80"><span className="font-medium text-slate-400 text-xs uppercase block">Up</span> {items.spec_mir_up}</div>
                                <div className="text-white/80"><span className="font-medium text-slate-400 text-xs uppercase block">Down</span> {items.spec_mir_down}</div>
                                <div className="col-span-2 mt-1">
                                  <span className="font-medium text-slate-400 text-xs uppercase block">{items.prodstream_name} - {items.prodtype_name}</span>
                                  {/* <span className="text-blue-700 font-medium">plan.terminal</span> */}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Harga */}
                          <div className="mt-4 md:mt-0 md:text-right border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                            <span className="text-xs md:text-sm leading-relaxed text-gray-300 block">Harga</span>
                            <span className="text-md font-bold text-white">
                              Rp {formatDecimal(items.unit_price)}
                            </span>
                          </div>
                        </label>

                      </div>
                    ))
                  ) : (
                    <></>
                  )
                }



              </div>

            </motion.div>

            {/* RIGHT: Ringkasan Pesanan */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-5"
            >
              {
                (isAuthenticated) ? (


                  <div className="sticky top-32 bg-[#111111] border border-white/10 rounded-[32px] p-8 shadow-2xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg text-orange-500">
                        <Calculator size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-white">Kalkulator Pesanan</h3>
                    </div>

                    {/* Product Card Selected - Diisi Dinamis */}
                    {
                      (productSum.length > 0) ?
                        productSum.map((items: any, index: number) => (
                          <div key={index} className="flex justify-between gap-4 p-4 rounded-2xl bg-white/5 mb-2">
                            <div className="flex justify-start items-center gap-3">
                              <div className="text-gray-400 w-10"
                                dangerouslySetInnerHTML={{ __html: items.product_icon }}
                              />
                              <h4 className="text-base text-white">{items.product_name}</h4>
                            </div>
                            <div className="flex items-end">
                              <span className="text-md font-bold text-white">Rp {formatDecimal(items.total_price)}</span>
                            </div>
                          </div>
                        )) : (
                          <></>
                        )
                    }


                    {/* Summary Harga  */}
                    <div className="space-y-4 mb-6 border-b border-white/10 pb-6 p-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400 font-bold">Total Harga</span>
                        <span className="font-bold text-white text-md">Rp {formatDecimal(totalNum)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400 font-bold">Diskon</span>
                        <span className="text-white">-</span>
                      </div>
                      {/* <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Pajak (PPN 12%)</span>
                          <span className="text-white">-</span>
                        </div> */}
                    </div>

                    <div className="flex justify-between mb-8">
                      <div className="text-[12px] font-black tracking-widest text-orange-500 mb-1 justify-between items-start">
                        <p className="uppercase items-start">Total</p>
                        <p className="text-gray-400 items-start font-normal">{`*) Harga sebelum pajak`}</p>
                      </div>
                      <div className="text-2xl font-black text-white items-end">Rp {formatDecimal(totalNum)}</div>
                    </div>

                    <button
                      className="w-full flex items-center justify-center gap-2 py-4 bg-orange-500 text-black text-[12px] font-black 
                        uppercase tracking-[0.2em] rounded-xl hover:bg-orange-400 transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] 
                        active:scale-95 cursor-pointer"
                      onClick={hndlrCheckout}
                    >
                      <Send size={16} /> Kontak Sales
                    </button>

                  </div>

                ) : (<></>)
              }


            </motion.div>

          </div>
        </div>


      </Suspense>



      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogInfo title="Pesanan" caption="Pesanan Anda telah kami terima, tim Sales kami akan contact segera. Anda dapat cek konfirmasi pesanan melalui email yang sudah di register. Terima kasih"
          onSuccess={() => { window.location.href = '/product' }}
        />
      </Modal>

      <Footer />
    </main>
  );
}