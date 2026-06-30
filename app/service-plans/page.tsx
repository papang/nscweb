"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PaketLayanan() {
    const [activeTab, setActiveTab] = useState<"PERSONAL" | "BISNIS">("PERSONAL");

    return (
        <main className="relative flex min-h-screen w-full flex-col bg-black text-white">
            <Navbar />

            <div className="fixed inset-0 z-0 h-full w-full pointer-events-none opacity-30">
                <Image
                    src="/particle2.webp"
                    alt="Background Pattern"
                    fill
                    className="object-cover object-center"
                />
            </div>

            <div className="relative z-10 flex flex-1 w-full flex-col items-center px-6 pt-32 pb-24 md:px-12 lg:px-24 md:pt-40">

                <h1 className="mb-8 text-center text-4xl font-bold uppercase tracking-tight md:text-5xl lg:text-[56px]">
                    PAKET LAYANAN
                </h1>

                <div className="mb-16 flex items-center justify-center rounded-full border border-gray-700 bg-transparent p-1">
                    <button
                        onClick={() => setActiveTab("PERSONAL")}
                        className={`rounded-full px-8 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 ${activeTab === "PERSONAL" ? "bg-[#333333] text-white" : "text-gray-400 hover:text-white"
                            }`}
                    >
                        PERSONAL
                    </button>
                    <button
                        onClick={() => setActiveTab("BISNIS")}
                        className={`rounded-full px-8 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 ${activeTab === "BISNIS" ? "bg-[#333333] text-white" : "text-gray-400 hover:text-white"
                            }`}
                    >
                        BISNIS
                    </button>
                </div>

                {/* ============================================== */}
                {/* KONTEN TAB: PERSONAL */}
                {/* ============================================== */}
                {activeTab === "PERSONAL" && (
                    <div className="grid w-full max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">

                        <div className="flex flex-col">
                            <div className="flex flex-col rounded-xl border border-gray-800 bg-[#0a0a0a]/90 p-8 shadow-2xl backdrop-blur-sm lg:p-12">
                                <h2 className="mb-2 text-center text-2xl font-bold uppercase tracking-tight md:text-3xl">
                                    RESIDENSIAL
                                </h2>
                                <p className="mb-10 text-center text-[13px] text-gray-400">
                                    Cocok untuk rumah tangga
                                </p>

                                <h4 className="mb-6 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
                                    FITUR UTAMA
                                </h4>
                                <ul className="mb-12 flex flex-col gap-3 text-center text-[14px] font-bold text-white">
                                    <li>Penyiapan Plug & Play</li>
                                    <li>Uptime {">"}99,9%</li>
                                    <li>Tahan Cuaca</li>
                                    <li>Kuota Tanpa Batas</li>
                                    <li>Uji Coba 30 Hari</li>
                                </ul>

                                <h4 className="mb-6 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
                                    PAKET LAYANAN BULANAN
                                </h4>
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                                        <span className="text-[13px] font-bold uppercase text-white">RESIDENSIAL LITE</span>
                                        <div className="text-right">
                                            <span className="text-2xl font-bold text-white tracking-tight">RP479.000</span>
                                            <span className="text-[11px] text-gray-500">/BLN</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                                        <span className="text-[13px] font-bold uppercase text-white">RESIDENSIAL</span>
                                        <div className="text-right">
                                            <span className="text-2xl font-bold text-white tracking-tight">RP750.000</span>
                                            <span className="text-[11px] text-gray-500">/BLN</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 space-y-4 text-center text-[11px] leading-relaxed text-gray-500">
                                    <p>
                                        Pengguna paket Residensial Lite akan mendapatkan kecepatan yang lebih lambat selama jam sibuk. Paket Residensial Lite hanya tersedia di area tertentu. Lihat ketersediaan <span className="font-bold text-white cursor-pointer hover:underline">di sini</span>.
                                    </p>
                                    <p className="font-bold text-white">
                                        Mulai di bawah ini untuk melihat paket, kecepatan, dan penawaran promosi yang tersedia di wilayah Anda
                                    </p>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-center">
                                <button className="rounded-sm bg-white px-14 py-4 text-[11px] font-bold uppercase tracking-widest text-black transition-colors hover:bg-gray-200">
                                    MULAI
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className="flex h-full flex-col rounded-xl border border-gray-800 bg-[#0a0a0a]/90 p-8 shadow-2xl backdrop-blur-sm lg:p-12">
                                <h2 className="mb-2 text-center text-2xl font-bold uppercase tracking-tight md:text-3xl">
                                    JELAJAH
                                </h2>
                                <p className="mb-10 text-center text-[13px] text-gray-400">
                                    Cocok untuk RV, nomad, dan karavan, dan bekerja saat singgah
                                </p>

                                <h4 className="mb-6 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
                                    FITUR UTAMA
                                </h4>
                                <ul className="mb-12 flex flex-col gap-3 text-center text-[14px] font-bold text-white">
                                    <li>Penyiapan Plug & Play</li>
                                    <li>Bisa Digunakan di 150+ Negara & Wilayah</li>
                                    <li>Jeda Kapan Saja dengan Mode Standby</li>
                                    <li>Uji Coba 30 Hari</li>
                                </ul>

                                <h4 className="mb-6 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
                                    PAKET LAYANAN BULANAN
                                </h4>
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                                        <span className="text-[13px] font-bold uppercase text-white">JELAJAH TANPA BATAS</span>
                                        <div className="text-right">
                                            <span className="text-2xl font-bold text-white tracking-tight">RP1.639.000</span>
                                            <span className="text-[11px] text-gray-500">/BLN</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 space-y-4 text-center text-[11px] leading-relaxed text-gray-500">
                                    <p>
                                        Untuk batasan perjalanan internasional, jangkauan pesisir dan penggunaan saat bepergian, lihat PERTANYAAN UMUM <span className="font-bold text-white cursor-pointer hover:underline">di sini</span>
                                    </p>
                                    <br className="hidden lg:block" />
                                    <br className="hidden lg:block" />
                                    <p className="font-bold text-white">
                                        Mulai di bawah ini untuk melihat kecepatan dan penawaran promosi di wilayah Anda
                                    </p>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-center">
                                <button className="rounded-sm bg-white px-14 py-4 text-[11px] font-bold uppercase tracking-widest text-black transition-colors hover:bg-gray-200">
                                    MULAI
                                </button>
                            </div>
                        </div>

                    </div>
                )}


                {/* ============================================== */}
                {/* KONTEN TAB: BISNIS */}
                {/* ============================================== */}
                {activeTab === "BISNIS" && (
                    <div className="grid w-full max-w-[1400px] grid-cols-1 gap-12 xl:grid-cols-2">

                        <div className="flex flex-col">
                            <div className="flex flex-col rounded-xl border border-gray-800 bg-[#0a0a0a]/90 p-8 shadow-2xl backdrop-blur-sm lg:p-12">
                                <h2 className="mb-2 text-center text-2xl font-bold uppercase tracking-tight md:text-3xl">
                                    LOKAL PRIORITAS
                                </h2>
                                <p className="mb-10 text-center text-[13px] text-gray-400">
                                    Cocok untuk bisnis tetap di darat
                                </p>

                                <h4 className="mb-6 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
                                    FITUR UTAMA
                                </h4>
                                <ul className="mb-12 flex flex-col gap-3 text-center text-[13px] font-bold text-white">
                                    <li>Penggunaan Darat di Satu Negara dan Perjalanan Regional</li>
                                    <li>Prioritas Jaringan</li>
                                    <li>IP Publik & Dasbor</li>
                                </ul>

                                <h4 className="mb-6 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
                                    PAKET LAYANAN BULANAN
                                </h4>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                                        <span className="text-[13px] font-bold uppercase text-white">LOKAL PRIORITAS - 50 GB</span>
                                        <div className="text-right"><span className="text-[22px] font-bold text-white tracking-tight">RP647.000</span><span className="text-[10px] text-gray-500">/BLN</span></div>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                                        <span className="text-[13px] font-bold uppercase text-white">LOKAL PRIORITAS - 500 GB</span>
                                        <div className="text-right"><span className="text-[22px] font-bold text-white tracking-tight">RP1.643.000</span><span className="text-[10px] text-gray-500">/BLN</span></div>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                                        <span className="text-[13px] font-bold uppercase text-white">LOKAL PRIORITAS - 1 TB</span>
                                        <div className="text-right"><span className="text-[22px] font-bold text-white tracking-tight">RP2.888.000</span><span className="text-[10px] text-gray-500">/BLN</span></div>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                                        <span className="text-[13px] font-bold uppercase text-white">LOKAL PRIORITAS - 2 TB</span>
                                        <div className="text-right"><span className="text-[22px] font-bold text-white tracking-tight">RP5.378.000</span><span className="text-[10px] text-gray-500">/BLN</span></div>
                                    </div>
                                </div>

                                <div className="mt-8 text-center text-[11px] leading-relaxed text-gray-500">
                                    <p className="mb-4">Kuota Tanpa Batas dengan kecepatan unduh hingga 1 Mbps dan kecepatan unggah hingga 0,5 Mbps | Termasuk perjanjian tingkat layanan</p>
                                    <p className="mb-6 font-bold text-white text-[13px]">Mulai dengan salah satu paket prasetel kami di atas, dan sesuaikan dengan menambahkan blok kuota di akun pengguna.</p>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between pb-2">
                                        <span className="text-[13px] font-bold uppercase text-white">+50 GB</span>
                                        <div className="text-right"><span className="text-[16px] font-bold text-white tracking-tight">+RP249.000</span><span className="text-[10px] text-gray-500">/BLN</span></div>
                                    </div>
                                    <div className="flex items-center justify-between pb-2">
                                        <span className="text-[13px] font-bold uppercase text-white">+500 GB</span>
                                        <div className="text-right"><span className="text-[16px] font-bold text-white tracking-tight">+RP1.245.000</span><span className="text-[10px] text-gray-500">/BLN</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-center">
                                <button className="rounded-sm bg-white px-14 py-4 text-[11px] font-bold uppercase tracking-widest text-black transition-colors hover:bg-gray-200">
                                    MULAI
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className="flex h-full flex-col rounded-xl border border-gray-800 bg-[#0a0a0a]/90 p-8 shadow-2xl backdrop-blur-sm lg:p-12">
                                <h2 className="mb-2 text-center text-2xl font-bold uppercase tracking-tight md:text-3xl">
                                    GLOBAL PRIORITAS
                                </h2>
                                <p className="mb-10 text-center text-[13px] text-gray-400">
                                    Cocok untuk konektivitas maritim dan global
                                </p>

                                <h4 className="mb-6 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
                                    FITUR UTAMA
                                </h4>
                                <ul className="mb-12 flex flex-col gap-3 text-center text-[13px] font-bold text-white">
                                    <li>Penggunaan Global di Laut & Darat</li>
                                    <li>Prioritas Jaringan</li>
                                    <li>Andal untuk Penggunaan Tetap & Saat Bepergian</li>
                                    <li>IP Publik & Dasbor</li>
                                </ul>

                                <h4 className="mb-6 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
                                    PAKET LAYANAN BULANAN
                                </h4>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                                        <span className="text-[13px] font-bold uppercase text-white">GLOBAL PRIORITAS - 50 GB</span>
                                        <div className="text-right"><span className="text-[22px] font-bold text-white tracking-tight">RP4.477.000</span><span className="text-[10px] text-gray-500">/BLN</span></div>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                                        <span className="text-[13px] font-bold uppercase text-white">GLOBAL PRIORITAS - 500 GB</span>
                                        <div className="text-right"><span className="text-[22px] font-bold text-white tracking-tight">RP11.641.000</span><span className="text-[10px] text-gray-500">/BLN</span></div>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                                        <span className="text-[13px] font-bold uppercase text-white">GLOBAL PRIORITAS - 1 TB</span>
                                        <div className="text-right"><span className="text-[22px] font-bold text-white tracking-tight">RP20.596.000</span><span className="text-[10px] text-gray-500">/BLN</span></div>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                                        <span className="text-[13px] font-bold uppercase text-white">GLOBAL PRIORITAS - 2 TB</span>
                                        <div className="text-right"><span className="text-[22px] font-bold text-white tracking-tight">RP38.506.000</span><span className="text-[10px] text-gray-500">/BLN</span></div>
                                    </div>
                                </div>

                                <div className="mt-8 text-center text-[11px] leading-relaxed text-gray-500">
                                    <p className="mb-4">Kuota Tanpa Batas dengan kecepatan unduh hingga 1 Mbps dan kecepatan unggah hingga 0,5 Mbps | Termasuk perjanjian tingkat layanan</p>
                                    <p className="mb-6 font-bold text-white text-[13px]">Mulai dengan salah satu paket prasetel kami di atas, dan sesuaikan dengan menambahkan blok kuota di akun pengguna.</p>
                                </div>

                                <div className="flex flex-col gap-4 mt-auto">
                                    <div className="flex items-center justify-between pb-2">
                                        <span className="text-[13px] font-bold uppercase text-white">+50 GB</span>
                                        <div className="text-right"><span className="text-[16px] font-bold text-white tracking-tight">+RP1.791.000</span><span className="text-[10px] text-gray-500">/BLN</span></div>
                                    </div>
                                    <div className="flex items-center justify-between pb-2">
                                        <span className="text-[13px] font-bold uppercase text-white">+500 GB</span>
                                        <div className="text-right"><span className="text-[16px] font-bold text-white tracking-tight">+RP8.955.000</span><span className="text-[10px] text-gray-500">/BLN</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-center">
                                <button className="rounded-sm bg-white px-14 py-4 text-[11px] font-bold uppercase tracking-widest text-black transition-colors hover:bg-gray-200">
                                    MULAI
                                </button>
                            </div>
                        </div>

                    </div>
                )}

            </div>

            <Footer />
        </main>
    );
}