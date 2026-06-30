"use client";

import Image from "next/image";
import Footer from "@/components/Footer";
import { useRef, useState } from "react";

export default function Residensial() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => setIsDragging(false);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Kecepatan geser
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const maxScroll = scrollWidth - clientWidth;
            if (maxScroll <= 0) return;
            const scrollPercentage = scrollLeft / maxScroll;
            const newIndex = Math.round(scrollPercentage * 3);
            if (newIndex !== activeIndex) setActiveIndex(newIndex);
        }
    };

    const scrollTo = (index: number) => {
        if (scrollRef.current) {
            const { scrollWidth, clientWidth } = scrollRef.current;
            const maxScroll = scrollWidth - clientWidth;
            const targetLeft = (maxScroll / 3) * index;
            scrollRef.current.scrollTo({ left: targetLeft, behavior: "auto" });
            setActiveIndex(index);
        }
    };

    const scrollRef2 = useRef<HTMLDivElement>(null);
    const [isDragging2, setIsDragging2] = useState(false);
    const [startX2, setStartX2] = useState(0);
    const [scrollLeft2, setScrollLeft2] = useState(0);

    const handleMouseDown2 = (e: React.MouseEvent) => {
        if (!scrollRef2.current) return;
        setIsDragging2(true);
        setStartX2(e.pageX - scrollRef2.current.offsetLeft);
        setScrollLeft2(scrollRef2.current.scrollLeft);
    };

    const handleMouseLeave2 = () => setIsDragging2(false);
    const handleMouseUp2 = () => setIsDragging2(false);

    const handleMouseMove2 = (e: React.MouseEvent) => {
        if (!isDragging2 || !scrollRef2.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef2.current.offsetLeft;
        const walk = (x - startX2) * 2; // Kecepatan geser
        scrollRef2.current.scrollLeft = scrollLeft2 - walk;
    };
    return (
        <main className="w-full bg-black">

            {/* --- HERO SECTION JELAJAH --- */}
            <section className="relative flex min-h-screen w-full flex-col items-center justify-center pb-20">

                <div className="absolute inset-0 z-0 h-full w-full">
                    <Image
                        src="/residential.webp"
                        alt="Menjelajah Bersama NSC"
                        fill
                        sizes="100vw"
                        className="object-cover object-center"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-black via-black/70 to-transparent"></div>
                </div>

                <div className="relative z-10 flex w-full flex-col items-center px-4 text-center mt-10">
                    <h1 className="mb-6 text-4xl font-bold uppercase tracking-tight text-white drop-shadow-lg md:text-5xl lg:text-6xl">
                        NSC UNTUK RUMAH
                    </h1>
                    <div className="mb-8 text-base font-bold text-white drop-shadow-md md:text-lg leading-relaxed">
                        <p>
                            Rp3.800.000 <span className="font-normal line-through">Rp4.750.000</span> untuk Mini Kit<br />
                            Rp4.720.000 <span className="font-normal line-through">Rp5.900.000</span> untuk Standard Kit
                        </p>
                    </div>
                    <div className="mb-10 text-sm font-medium text-white drop-shadow-md md:text-[15px] leading-relaxed">
                        <p>
                            Pesan sebelum 23/4 | NSCindonesia@NSC.com | 007 803 6 219 919 (Telepon)<br />
                            +62 823 1001 0006 (WhatsApp)
                        </p>
                    </div>
                    <div className="flex w-full max-w-2xl flex-col gap-2 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                            ALAMAT LAYANAN
                        </label>

                        <div className="flex flex-col gap-4 sm:flex-row">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="KETIK DAN PILIH"
                                    className="w-full border border-gray-600 bg-gray/80 backdrop-blur-md px-4 py-4 text-sm text-white outline-none transition-colors focus:border-white placeholder:text-gray-500 uppercase"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                        <circle cx="12" cy="12" r="6" strokeDasharray="2 2" />
                                    </svg>
                                </div>
                            </div>

                            <button className="w-full bg-white px-10 py-4 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-gray-200 sm:w-auto min-w-[140px]">
                                MULAI
                            </button>
                        </div>

                        <div className="mt-8 flex w-full justify-center">
                            <button className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-70">
                                <span className="border-b border-transparent pb-0.5 group-hover:border-white transition-all duration-300">
                                    LIHAT PETA KETERSEDIAAN & KECEPATAN
                                </span>
                                <svg className="h-3 w-3 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- WRAPPER SECTION 2 --- */}
            <div className="relative w-full bg-black [clip-path:inset(0)]">

                <div className="fixed left-0 top-0 z-0 h-full w-full opacity-40 pointer-events-none">
                    <Image
                        src="/particle2.webp"
                        alt="Particle Effect"
                        fill
                        sizes="100vw"
                        className="object-cover object-center"
                    />
                </div>

                <div className="relative z-10 flex w-full flex-col items-center justify-center px-6 py-24 md:px-12 lg:px-24">

                    <h2 className="mb-12 text-center text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
                        STREAMING FILM, PANGGILAN VIDEO, GAMING & LAINNYA
                    </h2>

                    <div className="mb-12 flex w-full max-w-4xl flex-col items-center justify-center gap-6 md:flex-row md:items-stretch">

                        {/* Card 1 */}
                        <div className="flex w-full max-w-[300px] flex-col items-center rounded-xl border border-gray-600 bg-[#0a0a0a]/80 p-8 text-center backdrop-blur-sm">
                            <h3 className="mb-4 text-lg font-bold uppercase text-white">RESIDENSIAL LITE</h3>
                            <p className="mb-8 text-[13px] leading-relaxed text-gray-300">
                                Internet yang cepat dan andal untuk penggunaan rumah sehari-hari
                            </p>

                            <div className="mb-4 flex items-baseline justify-center gap-1">
                                <span className="text-4xl font-bold text-white md:text-[42px] tracking-tight">Rp479.000</span>
                                <span className="text-sm text-gray-400">/ BLN</span>
                            </div>

                            <div className="mt-auto w-full border-t border-gray-700 pt-6">
                                <p className="text-[13px] text-gray-400">Kuota Tanpa Batas</p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="flex w-full max-w-[300px] flex-col items-center rounded-xl border border-gray-600 bg-[#0a0a0a]/80 p-8 text-center backdrop-blur-sm">
                            <h3 className="mb-4 text-lg font-bold uppercase text-white">RESIDENSIAL</h3>
                            <p className="mb-8 text-[13px] leading-relaxed text-gray-300">
                                Layanan internet rumah terbaik kami dengan kecepatan maksimal yang tersedia
                            </p>

                            <div className="mb-4 flex items-baseline justify-center gap-1">
                                <span className="text-4xl font-bold text-white md:text-[42px] tracking-tight">Rp750.000</span>
                                <span className="text-sm text-gray-400">/ BLN</span>
                            </div>

                            <div className="mt-auto w-full border-t border-gray-700 pt-6">
                                <p className="text-[13px] text-gray-400">Kuota Tanpa Batas</p>
                            </div>
                        </div>

                    </div>

                    <div className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[13px] text-white max-w-4xl">
                        <div className="flex items-center gap-2">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            <span>Penyiapan Plug & Play</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            <span>Uptime 99,9%</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            <span>Tahan Cuaca</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            <span>Kuota Tanpa Batas</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            <span>Uji Coba 30 Hari</span>
                        </div>
                    </div>

                    <p className="mb-8 text-center text-sm font-bold text-white">
                        Mulai di bawah ini untuk melihat paket, kecepatan, dan penawaran promosi yang tersedia di wilayah Anda
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <a href="/service-plans" className="rounded-sm border border-gray-400 bg-transparent px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white hover:text-black">
                            LIHAT SEMUA PAKET
                        </a>
                        <button className="rounded-sm bg-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-black transition-colors hover:bg-gray-200">
                            MULAI
                        </button>
                    </div>

                    <div className="mt-40 mb-10 flex w-full flex-col items-center text-center">
                        <h2 className="mb-4 text-3xl font-bold uppercase tracking-tight text-white md:text-5xl">
                            TERIMA PEMBARUAN EMAIL NSC
                        </h2>
                        <p className="mb-10 text-lg text-white">Daftar di bawah ini</p>
                        <div className="flex w-full max-w-lg flex-col gap-4 sm:flex-row sm:gap-2">
                            <input
                                type="email"
                                placeholder="EMAIL"
                                className="w-full flex-1 rounded-sm border border-gray-600 bg-transparent px-4 py-3 text-xs text-white outline-none focus:border-white placeholder:text-gray-400 uppercase"
                            />
                            <button className="w-full rounded-sm bg-[#222222] px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 transition-colors hover:bg-gray-800 hover:text-white sm:w-auto">
                                DAFTAR
                            </button>
                        </div>
                        <p className="mt-6 text-[10px] text-gray-400">
                            Dengan mengeklik Daftar, Anda menyetujui <span className="font-bold text-white transition-opacity hover:opacity-70 cursor-pointer">Kebijakan Privasi</span> kami
                        </p>
                    </div>

                    {/* ========================================= */}
                    {/* SECTION SLIDER (LOKASI TETAP)               */}
                    {/* ========================================= */}
                    <div className="relative z-10 flex w-full flex-col items-center justify-center bg-transparent pt-10 pb-24 md:px-12 lg:px-24">

                        <div className="relative mt-16 w-full max-w-[1400px] group">

                            <button
                                onClick={() => {
                                    if (scrollRef.current) scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
                                }}
                                className="absolute left-4 top-[40%] z-20 -translate-y-1/2 text-white/50 opacity-0 transition-all duration-300 hover:text-white group-hover:opacity-100 hidden md:block"
                            >
                                <svg className="h-8 w-8 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <div
                                ref={scrollRef}
                                onScroll={handleScroll}
                                onMouseDown={handleMouseDown}
                                onMouseLeave={handleMouseLeave}
                                onMouseUp={handleMouseUp}
                                onMouseMove={handleMouseMove}
                                className={`flex w-full gap-6 overflow-x-auto px-4 pb-10 md:gap-8 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDragging ? "cursor-grabbing" : "cursor-grab snap-x snap-mandatory"
                                    }`}
                                style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
                            >
                                {[
                                    {
                                        id: 1,
                                        title: "STREAMING LANCAR",
                                        img: "/streaming.webp",
                                        desc: "Nikmati kecepatan tinggi untuk menonton platform streaming, film, dan acara live favorit Anda dalam high-definition dan 4K."
                                    },
                                    {
                                        id: 2,
                                        title: "BEKERJA DARI RUMAH",
                                        img: "/wfh.webp",
                                        desc: "Bekerja dari rumah dengan internet berkecepatan tinggi NSC untuk panggilan video frekuen dengan audio jernih, video tajam, dan percakapan tanpa gangguan."
                                    },
                                    {
                                        id: 3,
                                        title: "BERMAIN GAME DENGAN LATENSI RENDAH",
                                        img: "/game.webp",
                                        desc: "Bermain game di rumah atau saat bepergian dengan jaringan latensi rendah NSC."
                                    },
                                    {
                                        id: 4,
                                        title: "PANGGILAN VIDEO YANG LANCAR",
                                        img: "/vc.webp",
                                        desc: "Tetap terhubung dengan teman, keluarga, dan komunitas Anda tanpa lag atau buffering."
                                    }
                                ].map((card) => (
                                    <div key={card.id} className="flex min-w-[85vw] flex-col snap-start md:min-w-[380px] lg:min-w-[420px] flex-1 select-none">
                                        <div className="relative mb-6 aspect-video w-full overflow-hidden bg-[#111111] pointer-events-none">
                                            <Image src={card.img} alt={card.title} fill className="object-cover" />
                                        </div>
                                        <h4 className="mb-4 text-[17px] uppercase tracking-wide text-white font-normal">{card.title}</h4>
                                        <p className="text-[14px] leading-relaxed text-gray-300 pr-4">{card.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => {
                                    if (scrollRef.current) scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
                                }}
                                className="absolute right-4 top-[40%] z-20 -translate-y-1/2 text-white/50 opacity-0 transition-all duration-300 hover:text-white group-hover:opacity-100 hidden md:block"
                            >
                                <svg className="h-8 w-8 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                        </div>

                        <div className="mt-8 flex w-full max-w-[1400px] items-center gap-2 px-4 md:px-0">
                            {[0, 1, 2, 3].map((index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollTo(index)}
                                    className={`h-1.5 rounded-full ${activeIndex === index
                                        ? "w-full max-w-[280px] bg-[#888888]"
                                        : "w-1.5 bg-[#333333]"
                                        }`}
                                />
                            ))}
                        </div>

                    </div>

                </div>
            </div>

            {/* ========================================================================= */}
            {/* MEGA WRAPPER UNTUK STICKY NAVBAR AGAR MENEMPEL SAMPAI AKHIR HALAMAN */}
            {/* ========================================================================= */}
            <div className="relative w-full">

                <div className="sticky top-0 z-[60] flex w-full items-center justify-between bg-[#111111]/80 backdrop-blur-md px-8 py-4 shadow-xl md:px-16 lg:px-24">
                    <div className="text-xl font-bold uppercase tracking-widest text-white">
                        Residensial
                    </div>
                    <div className="hidden items-center gap-8 md:flex">
                        <a href="#" className="text-[11px] font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-70">
                            Paket Layanan
                        </a>
                        <a href="#" className="text-[11px] font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-70">
                            Spesifikasi
                        </a>
                        <a href="#" className="text-[11px] font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-70">
                            Pertanyaan Umum
                        </a>
                        <button className="rounded-sm bg-white px-8 py-2.5 text-[10px] font-bold uppercase tracking-widest text-black transition-colors hover:bg-gray-200">
                            MULAI
                        </button>
                    </div>
                </div>

                {/* --- SECTION 3 --- */}
                <section className="relative flex h-screen w-full items-start justify-end overflow-hidden pt-25">
                    <div className="absolute inset-0 z-0 h-full w-full">
                        <Image
                            src="/NSC.webp"
                            alt="NSC Mini"
                            fill
                            sizes="100vw"
                            className="object-cover object-start"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent w-full md:w-2/3"></div>
                    </div>
                    <div className="relative z-10 flex w-full max-w-2xl flex-col items-start px-8 text-left md:px-16 lg:px-24">
                        <h2 className="mb-6 text-4xl font-bold uppercase leading-tight tracking-tight text-white drop-shadow-md md:text-5xl lg:text-[42px]">
                            NSC MINI
                        </h2>
                        <p className="mb-6 text-sm leading-relaxed text-gray-200 drop-shadow-md md:text-[15px]">
                            NSC Mini adalah kit portabel yang ringkas dan dapat dengan mudah dimasukkan ke dalam ransel, dirancang untuk menyediakan internet berkecepatan tinggi dan latensi rendah saat singgah.
                        </p>
                        <p className="mb-10 text-sm leading-relaxed text-gray-200 drop-shadow-md md:text-[15px]">
                            Kit mencakup router Wi-Fi bawaan, konsumsi daya yang lebih rendah, input daya DC, dan <span className="font-bold text-white">kecepatan unduhan maksimal lebih dari 200 Mbps.</span>
                        </p>
                        <button className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-70">
                            <span className="border-b border-transparent pb-0.5 group-hover:border-white transition-all duration-300">
                                LIHAT SPESIFIKASI
                            </span>
                            <svg className="h-3 w-3 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </section>

                {/* --- SECTION 4 --- */}
                <section className="relative flex h-screen w-full items-start justify-start overflow-hidden px-8 py-24 md:px-16 lg:px-24">
                    <div className="absolute inset-0 z-0 h-full w-full">
                        <Image
                            src="/sun.webp"
                            alt="Bekerja dan Bermain di Lokasi Terpencil"
                            fill
                            sizes="100vw"
                            className="object-cover object-center"
                        />
                        <div className="absolute inset-0 right-0 ml-auto w-full bg-gradient-to-l from-black/90 via-black/40 to-transparent md:w-3/4"></div>
                    </div>
                    <div className="relative z-10 flex w-full max-w-[60vh] flex-col items-start text-left">
                        <h2 className="mb-6 text-4xl font-bold uppercase leading-tight tracking-tight text-white drop-shadow-md md:text-5xl lg:text-[42px]">
                            INTERNET BERKECEPATAN TINGGI SETERPENCIL APA PUN
                        </h2>
                        <p className="mb-6 text-sm leading-relaxed text-gray-200 drop-shadow-md md:text-[15px]">
                            Lakukan aktivitas yang sebelumnya tidak mungkin dilakukan dengan internet satelit. Tersedia melalui konstelasi satelit canggih terbesar di dunia yang beroperasi di orbit rendah yang mengelilingi Bumi.
                        </p>
                    </div>
                </section>

                {/* --- SECTION 3: ANDAL & TANGGUH --- */}
                <section className="relative h-screen w-full overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/hero2.webp"
                            alt="Andal dan Tangguh"
                            fill
                            className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-bl from-black/80 via-black/20 to-transparent"></div>
                    </div>

                    <div className="relative z-10 flex h-full flex-col items-end justify-start px-8 pt-32 md:px-16 lg:px-24 md:pt-40">
                        <div className="max-w-lg text-left">
                            <h2 className="mb-6 text-3xl font-bold uppercase leading-tight tracking-tight text-white drop-shadow-md md:text-4xl">
                                Andal & tangguh
                            </h2>
                            <p className="text-base leading-relaxed text-gray-200 drop-shadow-md md:text-lg">
                                NSC menyediakan internet berkecepatan tinggi dan latensi rendah dengan uptime rata-rata lebih dari 99,9%, dan konektivitas yang andal di seluruh benua. Dirancang untuk tahan cuaca ekstrem - Kit NSC dapat mencairkan salju dan tahan hujan es, hujan lebat, serta angin kencang.{" "}
                                <a href="#" className="font-bold text-white underline decoration-white underline-offset-4 transition-opacity hover:opacity-70">
                                    Pelajari selengkapnya di sini.
                                </a>
                            </p>
                        </div>
                    </div>
                </section>

                {/* --- SECTION 4: INTERNET YANG DIRANCANG UNTUK SETIAP KEBUTUHAN --- */}
                <section className="relative h-screen w-full overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/hero3.webp"
                            alt="Internet untuk setiap kebutuhan"
                            fill
                            className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent"></div>
                    </div>

                    <div className="relative z-10 flex h-full flex-col justify-start px-8 pt-32 md:px-16 md:pt-40 lg:px-24">
                        <div className="max-w-xl text-left">
                            <h2 className="mb-6 text-3xl font-bold uppercase leading-tight tracking-tight text-white drop-shadow-md md:text-4xl">
                                Internet yang dirancang untuk setiap kebutuhan
                            </h2>
                            <p className="mb-6 text-base leading-relaxed text-gray-200 drop-shadow-md md:text-lg">
                                NSC menghadirkan kecepatan hingga 400+ Mbps di sebagian besar tempat di seluruh benua, jadi Anda bebas menikmati streaming 4K di beberapa perangkat sekaligus, bekerja dari rumah secara efektif, bermain game online, menjelajahi media sosial, dan banyak lagi.
                            </p>
                            <p className="text-base leading-relaxed text-gray-200 drop-shadow-md md:text-lg">
                                Periksa kecepatannya di wilayah Anda{" "}
                                <a href="#" className="font-bold text-white underline decoration-white underline-offset-4 transition-opacity hover:opacity-70">
                                    di sini.
                                </a>
                            </p>
                        </div>
                    </div>
                </section>

                {/* --- WRAPPER SECTION 5 & 6 --- */}
                <div className="relative w-full bg-black [clip-path:inset(0)]">

                    <div className="fixed right-0 top-0 z-0 h-full w-full md:w-1/2 pointer-events-none">
                        <Image
                            src="/particle3.webp"
                            alt="Particle Effect"
                            fill
                            className="object-contain object-right"
                        />
                    </div>

                    {/* --- SECTION 5: ONLINE DALAM HITUNGAN MENIT --- */}
                    <section className="relative z-10 flex min-h-screen w-full items-center justify-center bg-transparent px-8 py-20 md:px-16 lg:px-24">
                        <div className="relative z-10 flex w-full max-w-7xl flex-col items-center justify-between gap-12 md:flex-row">

                            <div className="relative flex flex-1 justify-center">
                                <div className="relative aspect-square w-full max-w-[600px]">
                                    <Image
                                        src="/orbit.webp"
                                        alt="NSC Setup"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 text-left">
                                <h2 className="mb-6 text-4xl font-bold uppercase leading-tight tracking-tight text-white md:text-5xl">
                                    Leo Sat<br />Educational<br />Heading
                                </h2>
                                <p className="mb-12 text-base text-gray-200 md:text-lg">
                                    Berdedikasi untuk memberikan konektivitas di seluruh wilayah Indonesia, kami memberikan edukasi yang mendalam tentang Orbit satelit. Ada dua kategori orbit yang perlu dipahami, mulai dari GEO (Geostationary Earth Orbit) dan LEO (Low Earth Orbit). Kedua kategori orbit satelit ini memiliki karakteristik serta kegunaan yang unik dan kegunaan yang berbeda. Namun persamaannya adalah keduanya memiliki peran yang penting dalam infrastruktur satelit global untuk dapat memenuhi berbagai kebutuhan komunikasi dan penelitian.
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <button className="flex h-12 items-center justify-center rounded-md border border-gray-600 bg-transparent px-6 transition-colors hover:border-white">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-white">Selengkapnya</span>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </section>

                    {/* --- SECTION 6: PAKET LAYANAN FLEKSIBEL --- */}
                    <section className="relative z-10 flex min-h-screen w-full items-center justify-center bg-transparent px-8 py-20 md:px-16 lg:px-24">
                        <div className="relative z-10 flex w-full max-w-7xl flex-col items-center justify-between gap-12 md:flex-row">

                            <div className="flex-1 text-left">
                                <h2 className="mb-8 text-3xl font-bold uppercase leading-tight tracking-tight text-white md:text-5xl lg:text-4xl">
                                    Paket Layanan Fleksibel
                                </h2>
                                <p className="max-w-xl text-base leading-relaxed text-gray-300 md:text-lg">
                                    NSC menawarkan paket layanan fleksibel di seluruh wilayah.
                                </p>
                            </div>

                            <div className="relative flex flex-1 justify-center">
                                <div className="relative aspect-video w-full max-w-[650px] md:aspect-square">
                                    <Image
                                        src="/image2.webp"
                                        alt="NSC Service"
                                        fill
                                        className="object-contain object-center md:object-right"
                                    />
                                </div>
                            </div>

                        </div>
                    </section>

                </div>

                {/* ========================================= */}
                {/* SECTION: ISI KOTAK STANDAR (LOKASI TETAP) */}
                {/* ========================================= */}
                <section className="relative w-full overflow-hidden bg-black py-24 md:py-32">

                    <div className="relative z-20 mx-auto mb-16 w-full max-w-7xl px-8 text-left md:px-16 lg:px-24">
                        <h2 className="mb-4 text-4xl font-bold uppercase tracking-tight text-white md:text-5xl lg:text-[56px]">
                            ISI KOTAK STANDAR
                        </h2>
                        <p className="mb-8 text-[13px] leading-relaxed text-gray-300 md:text-sm max-w-lg">
                            Kit NSC hadir dengan semua yang Anda butuhkan untuk online dalam hitungan menit.
                        </p>
                        <button className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-70">
                            <span className="border-b border-transparent pb-0.5 transition-all duration-300 group-hover:border-white">
                                LIHAT SPESIFIKASI
                            </span>
                            <svg className="h-3 w-3 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    <div className="relative mx-auto w-full max-w-[1100px] py-10">

                        <div className="absolute inset-0 z-0 bottom-40 flex items-center justify-center pointer-events-none opacity-80 mt-10 md:mt-0">
                            <div className="relative w-full max-w-5xl aspect-[21/18] md:aspect-[31/21]">
                                <Image
                                    src="/kotak.webp"
                                    alt="Isi Kotak Background"
                                    fill
                                    className="object-contain object-center"
                                />
                            </div>
                        </div>

                        <div className="relative z-10 w-full group">

                            <button
                                onClick={() => {
                                    if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
                                }}
                                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 text-white/50 transition-colors hover:text-white md:left-12"
                            >
                                <svg className="h-8 w-8 drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <div
                                ref={scrollRef}
                                onMouseDown={handleMouseDown}
                                onMouseLeave={handleMouseLeave}
                                onMouseUp={handleMouseUp}
                                onMouseMove={handleMouseMove}
                                className={`flex w-full items-end gap-10 overflow-x-auto px-16 pb-8 pt-20 md:gap-14 md:px-32 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDragging ? "cursor-grabbing" : "cursor-grab"
                                    }`}
                            >
                                {/* Item 1 */}
                                <div className="flex min-w-[180px] flex-col items-center justify-end md:min-w-[220px] select-none">
                                    <div className="relative mb-6 h-36 w-full md:h-48 pointer-events-none">
                                        <Image src="/NSCkotak.webp" alt="NSC" fill className="object-contain object-bottom" />
                                    </div>
                                    <h4 className="text-center text-[14px] font-normal uppercase tracking-wider text-white">
                                        NSC
                                    </h4>
                                </div>

                                {/* Item 2 */}
                                <div className="flex min-w-[180px] flex-col items-center justify-end md:min-w-[220px] select-none">
                                    <div className="relative mb-6 h-36 w-full md:h-48 pointer-events-none">
                                        <Image src="/kick.webp" alt="Kickstand" fill className="object-contain object-bottom" />
                                    </div>
                                    <h4 className="text-center text-[14px] font-normal uppercase tracking-wider text-white">
                                        KICKSTAND
                                    </h4>
                                </div>

                                {/* Item 3 */}
                                <div className="flex min-w-[180px] flex-col items-center justify-end md:min-w-[220px] select-none">
                                    <div className="relative mb-6 h-36 w-full md:h-48 pointer-events-none">
                                        <Image src="/router3.webp" alt="Router 3" fill className="object-contain object-bottom" />
                                    </div>
                                    <h4 className="text-center text-[14px] font-normal uppercase tracking-wider text-white">
                                        ROUTER 3
                                    </h4>
                                </div>

                                {/* Item 4 */}
                                <div className="flex min-w-[180px] flex-col items-center justify-end md:min-w-[220px] select-none">
                                    <div className="relative mb-6 h-36 w-full md:h-48 pointer-events-none">
                                        <Image src="/kabelNSC.webp" alt="Kabel NSC" fill className="object-contain object-bottom" />
                                    </div>
                                    <h4 className="text-center text-[14px] font-normal uppercase tracking-wider text-white">
                                        KABEL NSC
                                    </h4>
                                </div>

                                {/* Item 5 */}
                                <div className="flex min-w-[180px] flex-col items-center justify-end md:min-w-[220px] select-none">
                                    <div className="relative mb-6 h-36 w-full md:h-48 pointer-events-none">
                                        <Image src="/kabelac.webp" alt="Kabel AC" fill className="object-contain object-bottom" />
                                    </div>
                                    <h4 className="text-center text-[14px] font-normal uppercase tracking-wider text-white">
                                        KABEL AC
                                    </h4>
                                </div>

                                {/* Item 6 */}
                                <div className="flex min-w-[180px] flex-col items-center justify-end md:min-w-[220px] select-none">
                                    <div className="relative mb-6 h-36 w-full md:h-48 pointer-events-none">
                                        <Image src="/catudaya.webp" alt="Catu Daya" fill className="object-contain object-bottom" />
                                    </div>
                                    <h4 className="text-center text-[14px] font-normal uppercase tracking-wider text-white">
                                        CATU DAYA
                                    </h4>
                                </div>

                                {/* Item 7 */}
                                <div className="flex min-w-[180px] flex-col items-center justify-end md:min-w-[220px] select-none">
                                    <div className="relative mb-6 h-36 w-full md:h-48 pointer-events-none">
                                        <Image src="/kabelethernet.webp" alt="Kabel Ethernet" fill className="object-contain object-bottom" />
                                    </div>
                                    <h4 className="text-center text-[14px] font-normal uppercase tracking-wider text-white">
                                        KABEL ETHERNET
                                    </h4>
                                </div>

                            </div>

                            <button
                                onClick={() => {
                                    if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
                                }}
                                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 text-white/50 transition-colors hover:text-white md:right-12"
                            >
                                <svg className="h-8 w-8 drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                        </div>
                    </div>
                </section>

                <div className="relative w-full bg-black [clip-path:inset(0)]">
                    <div className="fixed right-0 top-0 z-0 h-full w-full md:w-1/2 pointer-events-none">
                        <Image
                            src="/particle4.webp"
                            alt="Particle Effect 4"
                            fill
                            sizes="100vw"
                            className="object-contain object-right"
                        />
                    </div>

                    {/* ========================================= */}
                    {/* SECTION AKSESORI & DUDUKAN                */}
                    {/* ========================================= */}
                    <section className="relative flex w-full flex-col overflow-hidden bg-black px-8 py-32 md:px-16 lg:px-24">
                        <div className="relative z-10 w-full max-w-7xl mx-auto">

                            <div className="mb-12 text-left">
                                <h2 className="mb-3 text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
                                    AKSESORI & DUDUKAN
                                </h2>
                                <p className="text-[13px] font-medium text-gray-500">
                                    Tersedia di NSC Shop setelah pembelian
                                </p>
                            </div>

                            <div className="relative w-full group">

                                <button
                                    onClick={() => {
                                        if (scrollRef2.current) scrollRef2.current.scrollBy({ left: -350, behavior: "smooth" });
                                    }}
                                    className="absolute left-4 top-[40%] z-20 -translate-y-1/2 text-gray-400 opacity-0 transition-all duration-300 hover:text-white group-hover:opacity-100 hidden md:block"
                                >
                                    <svg className="h-8 w-8 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <div
                                    ref={scrollRef2}
                                    onMouseDown={handleMouseDown2}
                                    onMouseLeave={handleMouseLeave2}
                                    onMouseUp={handleMouseUp2}
                                    onMouseMove={handleMouseMove2}
                                    className={`flex w-full gap-6 overflow-x-auto pb-8 md:gap-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDragging2 ? "cursor-grabbing" : "cursor-grab snap-x snap-mandatory"
                                        }`}
                                    style={{ scrollBehavior: isDragging2 ? 'auto' : 'smooth' }}
                                >

                                    {/* Card 1 */}
                                    <div className="flex min-w-[280px] flex-col snap-start items-center md:min-w-[300px] flex-1 select-none">
                                        <div className="relative mb-6 aspect-square w-full overflow-hidden bg-[#111111] pointer-events-none">
                                            <Image src="/pipe.webp" fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition-transform duration-700 hover:scale-105" alt="Dudukan Pipe Adapter" />
                                        </div>
                                        <h4 className="text-[13px] font-bold uppercase tracking-widest text-gray-300">
                                            DUDUKAN PIPE ADAPTER
                                        </h4>
                                    </div>

                                    {/* Card 2 */}
                                    <div className="flex min-w-[280px] flex-col snap-start items-center md:min-w-[300px] flex-1 select-none">
                                        <div className="relative mb-6 aspect-square w-full overflow-hidden bg-[#111111] pointer-events-none">
                                            <Image src="/wall.webp" fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition-transform duration-700 hover:scale-105" alt="Dudukan Wall" />
                                        </div>
                                        <h4 className="text-[13px] font-bold uppercase tracking-widest text-gray-300">
                                            DUDUKAN WALL
                                        </h4>
                                    </div>

                                    {/* Card 3 */}
                                    <div className="flex min-w-[280px] flex-col snap-start items-center md:min-w-[300px] flex-1 select-none">
                                        <div className="relative mb-6 aspect-square w-full overflow-hidden bg-[#111111] pointer-events-none">
                                            <Image src="/pivot.webp" fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition-transform duration-700 hover:scale-105" alt="Dudukan Pivot" />
                                        </div>
                                        <h4 className="text-[13px] font-bold uppercase tracking-widest text-gray-300">
                                            DUDUKAN PIVOT
                                        </h4>
                                    </div>

                                    {/* Card 4 */}
                                    <div className="flex min-w-[280px] flex-col snap-start items-center md:min-w-[300px] flex-1 select-none">
                                        <div className="relative mb-6 aspect-square w-full overflow-hidden bg-[#1a1a1a] pointer-events-none">
                                            <Image src="/router.webp" fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover object-center transition-transform duration-700 hover:scale-105" alt="Router 3" />
                                        </div>
                                        <h4 className="text-[13px] font-bold uppercase tracking-widest text-gray-300">
                                            ROUTER 3
                                        </h4>
                                    </div>

                                </div>

                                <button
                                    onClick={() => {
                                        if (scrollRef2.current) scrollRef2.current.scrollBy({ left: 350, behavior: "smooth" });
                                    }}
                                    className="absolute right-4 top-[40%] z-20 -translate-y-1/2 text-white opacity-0 transition-all duration-300 hover:opacity-70 group-hover:opacity-100 hidden md:block"
                                >
                                    <svg className="h-8 w-8 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                            </div>
                        </div>
                    </section>

                    {/* --- SECTION 9: KATA PELANGGAN KAMI --- */}

                    <section className="relative z-10 flex w-full flex-col justify-center px-8 py-32 md:px-16 lg:px-24">
                        <div className="relative z-10 mx-auto w-full max-w-7xl">
                            <h3 className="mb-16 text-xs font-bold uppercase tracking-[0.2em] text-white">
                                KATA PELANGGAN KAMI
                            </h3>
                            <div className="flex w-full snap-x snap-mandatory gap-8 overflow-x-auto pb-8 scrollbar-hide md:grid md:grid-cols-3 md:gap-10 md:overflow-visible md:pb-0">
                                <div className="flex min-w-[85vw] snap-start flex-col border-l-[3px] border-white pl-6 sm:min-w-[300px] md:min-w-0">
                                    <h4 className="mb-4 text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
                                        BEKERJA DARI MANA SAJA
                                    </h4>
                                    <p className="mb-8 text-[13px] leading-relaxed text-gray-300 md:text-sm">
                                        "NSC adalah item yang wajib dimiliki jika Anda harus bekerja jarak jauh atau suka bepergian ke tempat tanpa listrik, tapi tetap ingin terhubung ke internet! Sangat efektif!"
                                    </p>
                                    <p className="mt-auto text-[13px] text-gray-400">
                                        - Hoyung dari Amerika Serikat
                                    </p>
                                </div>
                                <div className="flex min-w-[85vw] snap-start flex-col border-l border-gray-700 pl-6 sm:min-w-[300px] md:min-w-0">
                                    <h4 className="mb-4 text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
                                        COCOK UNTUK RV
                                    </h4>
                                    <p className="mb-8 text-[13px] leading-relaxed text-gray-300 md:text-sm">
                                        "Sebagai pelanggan yang tinggal di RV, NSC sangat cocok untuk kami. Kami memiliki akses internet terbaik di mana pun kami berada."
                                    </p>
                                    <p className="mt-auto text-[13px] text-gray-400">
                                        - Walter dari Amerika Serikat
                                    </p>
                                </div>
                                <div className="flex min-w-[85vw] snap-start flex-col border-l border-gray-700 pl-6 sm:min-w-[300px] md:min-w-0">
                                    <h4 className="mb-4 text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
                                        ANDAL DAN JARAK JAUH
                                    </h4>
                                    <p className="mb-8 text-[13px] leading-relaxed text-gray-300 md:text-sm">
                                        "NSC mendukung pekerjaan online saya, memungkinkan saya pergi ke berbagai tempat dengan sumber internet satelit yang andal dan membantu saya memutuskan untuk segera pindah dan tinggal di pedesaan."
                                    </p>
                                    <p className="mt-auto text-[13px] text-gray-400">
                                        - Jeeve dari Filipina
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="relative z-10 flex min-h-[70vh] w-full flex-col items-center justify-center px-8 py-24 text-center md:px-16 lg:px-24">
                        <h2 className="mb-6 text-4xl font-bold uppercase tracking-tight text-white md:text-5xl">
                            UJI COBA 30 HARI
                        </h2>
                        <p className="mb-10 max-w-2xl text-base leading-relaxed text-gray-200 md:text-lg">
                            Coba NSC selama 30 hari. Jika tidak puas, Anda bisa mendapatkan pengembalian dana penuh.
                        </p>
                        <button className="rounded-sm bg-white px-12 py-3.5 text-[11px] font-bold uppercase tracking-widest text-black transition-colors hover:bg-gray-200">
                            MULAI
                        </button>
                    </section>
                </div>

            </div>

            <Footer />
        </main>
    );
}