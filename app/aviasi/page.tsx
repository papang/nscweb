"use client";

import Image from "next/image";
import Footer from "@/components/Footer";
import { useRef, useState } from "react";

export default function Aviasi() {
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

    return (
        <main className="w-full bg-black">

            {/* --- HERO SECTION JELAJAH --- */}
            <section className="relative flex min-h-screen w-full flex-col items-center justify-center pb-20">
                <div className="absolute inset-0 z-0 h-full w-full">
                    <Image
                        src="/aviasihero.webp"
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
                        NSC UNTUK AVIASI
                    </h1>
                    <div className="mb-8 text-base text-white drop-shadow-md md:text-lg leading-relaxed">
                        <p>
                            Kini tersedia untuk <span className="font-bold">kerangka pesawat Anda.</span>
                        </p>
                    </div>
                    <button className="rounded-sm bg-white px-12 py-3.5 text-[11px] font-bold uppercase tracking-widest text-black transition-colors hover:bg-gray-200">
                        HUBUNGI KAMI
                    </button>
                </div>
            </section>

            {/* --- WRAPPER SECTION: HARGA & PAKET AVIASI --- */}
            <div className="relative w-full bg-black [clip-path:inset(0)]">

                <div className="relative z-10 flex w-full flex-col items-center justify-center px-6 pt-24 md:px-12 lg:px-24">
                    <h2 className="mb-12 text-center text-3xl font-bold uppercase tracking-tight text-white md:text-[34px]">
                        INTERNET BERKECEPATAN TINGGI DALAM PENERBANGAN
                    </h2>

                    {/* Grid 4 Kartu Harga */}
                    <div className="mb-12 flex w-full max-w-7xl flex-col items-center justify-center gap-6 lg:flex-row lg:items-stretch">

                        {/* Card 1 */}
                        <div className="flex w-full flex-col items-center rounded-xl border border-gray-700 bg-black/20 p-8 text-center backdrop-blur-sm lg:flex-1">
                            <h3 className="mb-6 h-[50px] text-[22px] font-bold uppercase leading-tight text-white">General Aviation Local<br />50GB</h3>
                            <div className="mb-6 flex items-baseline justify-center gap-1">
                                <span className="text-4xl font-bold text-white md:text-[46px] tracking-tight">$200</span>
                                <span className="text-[13px] text-gray-500 uppercase tracking-widest">/ MO</span>
                            </div>
                            <p className="mb-6 text-[13px] font-bold leading-relaxed text-white">
                                $25/50GB Additional Data. Supports speeds up to 480 km/h (300 MPH).
                            </p>
                            <div className="mt-auto w-full pt-4">
                                <p className="text-[11px] leading-relaxed text-gray-500">
                                    Coverage over land, territorial waters, and within 22 km (12 nautical miles) of the coast. Installation can affect performance. Prices listed in USD exclusive of any applicable taxes. Prices may vary outside the United States.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="flex w-full flex-col items-center rounded-xl border border-gray-700 bg-black/20 p-8 text-center backdrop-blur-sm lg:flex-1">
                            <h3 className="mb-6 h-[50px] text-[22px] font-bold uppercase leading-tight text-white">General Aviation Global<br />50GB</h3>
                            <div className="mb-6 flex items-baseline justify-center gap-1">
                                <span className="text-4xl font-bold text-white md:text-[46px] tracking-tight">$1,000</span>
                                <span className="text-[13px] text-gray-500 uppercase tracking-widest">/ MO</span>
                            </div>
                            <p className="mb-6 text-[13px] font-bold leading-relaxed text-white">
                                $100/50GB Additional Data. Supports speeds up to 720 km/h (450 MPH).
                            </p>
                            <div className="mt-auto w-full pt-4">
                                <p className="text-[11px] leading-relaxed text-gray-500">
                                    Includes land and ocean coverage. Installation can affect performance. Prices listed in USD exclusive of any applicable taxes.
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="flex w-full flex-col items-center rounded-xl border border-gray-700 bg-black/20 p-8 text-center backdrop-blur-sm lg:flex-1">
                            <h3 className="mb-6 h-[50px] text-[22px] font-bold uppercase leading-tight text-white">Aviation Jet<br />20GB</h3>
                            <div className="mb-6 flex items-baseline justify-center gap-1">
                                <span className="text-4xl font-bold text-white md:text-[46px] tracking-tight">$2,000</span>
                                <span className="text-[13px] text-gray-500 uppercase tracking-widest">/ MO</span>
                            </div>
                            <p className="mb-6 text-[13px] font-bold leading-relaxed text-white">
                                $100/GB Additional Data
                            </p>
                            <div className="mt-auto w-full pt-4">
                                <p className="text-[11px] leading-relaxed text-gray-500">
                                    Includes land and ocean coverage. Installation can affect performance. Prices listed in USD exclusive of any applicable taxes.
                                </p>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="flex w-full flex-col items-center rounded-xl border border-gray-700 bg-black/20 p-8 text-center backdrop-blur-sm lg:flex-1">
                            <h3 className="mb-6 h-[50px] text-[22px] font-bold uppercase leading-tight text-white">Aviation Jet<br />Unlimited</h3>
                            <div className="mb-6 flex items-baseline justify-center gap-1">
                                <span className="text-4xl font-bold text-white md:text-[46px] tracking-tight">$10,000</span>
                                <span className="text-[13px] text-gray-500 uppercase tracking-widest">/ MO</span>
                            </div>
                            <div className="mt-auto w-full pt-4">
                                <p className="text-[11px] leading-relaxed text-gray-500">
                                    Includes land and ocean coverage. Installation can affect performance. Prices listed in USD exclusive of any applicable taxes.
                                </p>
                            </div>
                        </div>

                    </div>

                    <button className="rounded-sm bg-white px-10 py-3.5 text-[11px] font-bold uppercase tracking-widest text-black transition-colors hover:bg-gray-200">
                        HUBUNGI KAMI
                    </button>
                </div>

                {/* 2. BAGIAN "FOR YOUR FLEET" */}
                <div className="relative z-10 flex w-full flex-col items-center justify-center px-6 py-32 md:px-12 lg:px-24">
                    <h2 className="mb-12 text-center text-3xl font-bold uppercase tracking-tight text-white md:text-[34px]">
                        FOR YOUR FLEET
                    </h2>

                    {/* Grid 2 Kartu */}
                    <div className="mb-12 flex w-full max-w-4xl flex-col items-center justify-center gap-6 md:flex-row md:items-stretch">

                        {/* Fleet Card 1 */}
                        <div className="flex w-full flex-col items-center rounded-xl border border-gray-700 bg-black/20 p-10 text-center backdrop-blur-sm md:flex-1">
                            <h3 className="mb-8 text-2xl font-bold uppercase leading-snug text-white">Commercial<br />Unlimited</h3>

                            <p className="mb-8 text-[15px] font-medium leading-relaxed text-white">
                                Contact us for details and pricing
                            </p>

                            <p className="mb-8 text-[13px] leading-relaxed text-white">
                                Enhanced speeds support streaming for every passenger
                            </p>

                            <div className="mt-auto w-full pt-6">
                                <p className="text-[11px] text-gray-500">Includes BBJ/ACJ airframes</p>
                            </div>
                        </div>

                        {/* Fleet Card 2 */}
                        <div className="flex w-full flex-col items-center rounded-xl border border-gray-700 bg-black/20 p-10 text-center backdrop-blur-sm md:flex-1">
                            <h3 className="mb-8 text-2xl font-bold uppercase leading-snug text-white">Government<br />Unlimited</h3>

                            <p className="mb-8 text-[15px] font-medium leading-relaxed text-white">
                                Contact us for details and pricing
                            </p>

                            <p className="text-[13px] leading-relaxed text-white">
                                Enhanced capabilities support a range of Government aircraft and Special Missions
                            </p>
                        </div>

                    </div>

                    <button className="rounded-sm bg-white px-10 py-3.5 text-[11px] font-bold uppercase tracking-widest text-black transition-colors hover:bg-gray-200">
                        CONTACT US
                    </button>
                </div>

            </div>

            {/* ========================================================================= */}
            {/* MEGA WRAPPER UNTUK STICKY NAVBAR AGAR MENEMPEL SAMPAI AKHIR HALAMAN */}
            {/* ========================================================================= */}
            <div className="relative w-full">

                <div className="sticky top-0 z-[60] flex w-full items-center justify-between bg-[#111111]/80 backdrop-blur-md py-4 shadow-xl md:px-16 lg:px-24">
                    <div className="text-xl font-bold uppercase tracking-widest text-white">
                        Aviasi
                    </div>
                    <div className="hidden items-center gap-8 md:flex">
                        <a href="#" className="text-[11px] font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-70">
                            Pertanyaan Umum
                        </a>
                        <button className="rounded-sm bg-white px-8 py-2.5 text-[10px] font-bold uppercase tracking-widest text-black transition-colors hover:bg-gray-200">
                            HUBUNGI KAMI
                        </button>
                    </div>
                </div>

                {/* ========================================= */}
                {/* SECTION SLIDER AVIASI                     */}
                {/* ========================================= */}
                <div className="relative z-10 flex w-full flex-col items-center justify-center bg-black pt-10 pb-24 md:px-12 lg:px-24">

                    <div className="relative mt-16 w-full max-w-[1400px] group">

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
                                { id: 1, title: "PRODUSEN PESAWAT", img: "/aviasi1.webp", desc: "Dari pesawat supersonik hingga helikopter dan VTOL, NSC memiliki perangkat keras..." },
                                { id: 2, title: "MASKAPAI PENERBANGAN", img: "/aviasi2.webp", desc: "Dengan lebih dari 30.000 penerbangan di Terminal Aero kami yang memiliki keandalan tinggi..." },
                                { id: 3, title: "OPERATOR PESAWAT CHARTER", img: "/aviasi3.webp", desc: "Hubungi kami untuk mempelajari cara kami mentransformasi pengalaman Pesawat charter..." },
                                { id: 4, title: "PUSAT LAYANAN & DEALER", img: "/aviasi4.webp", desc: "Bermitralah dengan NSC dalam Jaringan Dealer NSC untuk mendapatkan manfaat..." }
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

                {/* ========================================= */}
                {/* SECTION JANGKAUAN GLOBAL                  */}
                {/* ========================================= */}
                <section className="relative flex min-h-[80vh] w-full flex-col items-center justify-center bg-black px-6 py-32 md:px-12 lg:px-24">

                    <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
                        <Image
                            src="/global.webp"
                            alt="Jangkauan Global NSC"
                            fill
                            className="object-cover object-center opacity-70"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black"></div>
                    </div>

                    {/* Content Wrapper */}
                    <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">

                        <h2 className="mb-6 text-3xl font-bold uppercase tracking-tight text-white md:text-4xl lg:text-[42px]">
                            JANGKAUAN GLOBAL
                        </h2>

                        <p className="mb-24 max-w-4xl text-[13px] leading-relaxed text-gray-200 md:text-[15px]">
                            NSC telah menyediakan internet berkecepatan tinggi dan latensi rendah pada puluhan ribu penerbangan dan terus bertambah, memungkinkan penumpang tetap terhubung sejak mereka di pesawat dan sepanjang perjalanan di seluruh benua. Lihat <span className="font-bold text-white cursor-pointer hover:underline">PERTANYAAN UMUM</span> kami untuk mempelajari selengkapnya tentang tempat NSC diizinkan untuk penggunaan aviasi saat bepergian.
                        </p>

                        {/* Stats Grid */}
                        <div className="flex w-full flex-col items-center justify-between gap-16 md:flex-row md:gap-4 md:px-10">

                            {/* Stat 1 */}
                            <div className="flex flex-col items-center">
                                <span className="mb-3 text-[13px] uppercase tracking-widest text-gray-300">
                                    PENERBANGAN
                                </span>
                                <span className="text-4xl font-bold text-white md:text-[42px]">
                                    200 RB+
                                </span>
                            </div>

                            {/* Stat 2 */}
                            <div className="flex flex-col items-center">
                                <span className="mb-3 text-[13px] uppercase tracking-widest text-gray-300">
                                    JAM PENERBANGAN
                                </span>
                                <span className="text-4xl font-bold text-white md:text-[42px]">
                                    540 RB+
                                </span>
                            </div>

                            {/* Stat 3 */}
                            <div className="flex flex-col items-center">
                                <span className="mb-3 text-[13px] uppercase tracking-widest text-gray-300">
                                    MIL
                                </span>
                                <span className="text-4xl font-bold text-white md:text-[42px]">
                                    270 JT+
                                </span>
                            </div>

                        </div>
                    </div>
                </section>

                {/* ========================================= */}
                {/* SECTION DUKUNGAN AVIASI KHUSUS            */}
                {/* ========================================= */}
                <section className="relative flex min-h-[80vh] w-full flex-col md:flex-row bg-black">

                    <div className="flex flex-1 flex-col justify-center px-8 py-16 md:px-16 lg:px-24">
                        <div className="max-w-xl text-left">
                            <h2 className="mb-8 text-3xl font-bold uppercase leading-tight tracking-tight text-white md:text-4xl lg:text-[42px]">
                                DUKUNGAN AVIASI KHUSUS
                            </h2>
                            <div className="space-y-6 text-[13px] leading-relaxed text-gray-300 md:text-[15px]">
                                <p>
                                    Tim Aviasi 24/7 kami menyediakan bantuan via telepon, manajemen akun khusus, dan tim keandalan penerbangan.
                                </p>
                                <p>
                                    Tim Teknik kami berkomitmen menyediakan konektivitas yang andal menggunakan telemetri real-time dan pemantauan performa dengan akurasi tinggi.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-[50vh] w-full md:h-auto md:flex-1">
                        <Image
                            src="/statis.webp"
                            alt="Dukungan Aviasi Khusus"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-center"
                        />
                    </div>
                </section>

                {/* ========================================= */}
                {/* SECTION JARINGAN MESH LASER               */}
                {/* ========================================= */}
                <section className="relative flex min-h-[80vh] w-full flex-col md:flex-row bg-black">

                    <div className="relative h-[50vh] w-full md:h-auto md:flex-1">
                        <Image
                            src="/laser.webp"
                            alt="Jaringan Mesh Laser"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-center"
                        />
                    </div>

                    <div className="flex flex-1 flex-col justify-center px-8 py-16 md:px-16 lg:px-24">
                        <div className="max-w-xl text-left">
                            <h2 className="mb-8 text-3xl font-bold uppercase leading-tight tracking-tight text-white md:text-4xl lg:text-[42px]">
                                JARINGAN MESH LASER
                            </h2>
                            <div className="space-y-6 text-[13px] leading-relaxed text-gray-300 md:text-[15px]">
                                <p>
                                    Laser ruang optik NSC mentransmisikan data di seluruh konstelasi NSC, memberikan layanan berkelanjutan di wilayah yang jauh dari stasiun NSC di Bumi—memberikan jangkauan untuk penerbangan di laut lepas dan wilayah kutub.
                                </p>
                                <p>
                                    Dengan 9.000+ laser di konstelasinya, NSC mampu mentransmisikan lebih dari 10+ PB traffic data setiap hari. Laser ini dapat mempertahankan koneksi 100 Gbps per link, dapat menghubungkan hingga 3.300 mil (5.300+ km), dan mempertahankan jaringan mesh dengan uptime 99,99%.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- WRAPPER SECTION 8 & 9 --- */}
                <div className="relative w-full bg-black [clip-path:inset(0)]">
                    <div className="fixed left-0 top-0 z-0 h-full w-full md:w-1/2 pointer-events-none">
                        <Image
                            src="/particle1.webp"
                            alt="Particle Effect 4"
                            fill
                            sizes="100vw"
                            className="object-contain object-left"
                        />
                    </div>

                    <section className="relative z-10 flex min-h-[70vh] w-full flex-col items-center justify-center px-8 py-24 text-center md:px-16 lg:px-24">
                        <h2 className="mb-6 text-4xl font-bold uppercase tracking-tight text-white md:text-5xl">
                            Tetap Terhubung dalam Penerbangan
                        </h2>
                        <p className="mb-10 max-w-2xl text-base leading-relaxed text-gray-200 md:text-lg">
                            Lengkapi formulir untuk menjadwalkan konsultasi dengan penjualan.
                        </p>
                        <button className="rounded-sm bg-white px-12 py-3.5 text-[11px] font-bold uppercase tracking-widest text-black transition-colors hover:bg-gray-200">
                            HUBUNGI KAMI
                        </button>
                    </section>

                    <section className="relative z-10 flex w-full flex-col justify-center px-8 py-32 md:px-16 lg:px-24">
                        <div className="relative z-10 mx-auto w-full max-w-7xl">
                            <div className="flex w-full snap-x snap-mandatory gap-8 overflow-x-auto pb-8 scrollbar-hide md:grid md:grid-cols-3 md:gap-10 md:overflow-visible md:pb-0">
                                <div className="flex min-w-[85vw] snap-start flex-col border-l-[3px] border-white pl-6 sm:min-w-[300px] md:min-w-0">
                                    <h4 className="mb-4 text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
                                        Andal
                                    </h4>
                                    <p className="mb-8 text-[13px] leading-relaxed text-gray-300 md:text-sm">
                                        "NSC cepat sekali. Di pesawat, kecepatannya 200 Mbps. Bahkan lebih cepat dari banyak internet perumahan di Amerika Utara. Ini seperti online di rumah atau di kantor. Produk rancangan NSC ini sangat andal dan cepat."
                                    </p>
                                    <p className="mt-auto text-[13px] text-gray-400">
                                        - Alex Wilcox, Rekan Pendiri dan CEO JSX
                                    </p>
                                </div>
                                <div className="flex min-w-[85vw] snap-start flex-col border-l border-gray-700 pl-6 sm:min-w-[300px] md:min-w-0">
                                    <h4 className="mb-4 text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
                                        Teknologi Signifikan
                                    </h4>
                                    <p className="mb-8 text-[13px] leading-relaxed text-gray-300 md:text-sm">
                                        "Melalui NSC, NSC telah menciptakan kemajuan teknologi paling signifikan untuk perjalanan jet pribadi yang pernah ada dalam 2 dekade terakhir. Konektivitas yang andal sangat penting bagi Pemilik kami, dan untuk pertama kalinya, teknologi tersebut hadir untuk memenuhi harapan ini."
                                    </p>
                                    <p className="mt-auto text-[13px] text-gray-400">
                                        - Jay Heublein, Wakil Presiden Senior Pemeliharaan FlexJet
                                    </p>
                                </div>
                                <div className="flex min-w-[85vw] snap-start flex-col border-l border-gray-700 pl-6 sm:min-w-[300px] md:min-w-0">
                                    <h4 className="mb-4 text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
                                        Jangkauan Global
                                    </h4>
                                    <p className="mb-8 text-[13px] leading-relaxed text-gray-300 md:text-sm">
                                        "NSC benar-benar memecahkan tantangan, secara harfiah, dalam hal teknologi, untuk dapat menyediakan bandwidth besar dengan konektivitas berkualitas sangat tinggi di pesawat terbang dengan jangkauan global."
                                    </p>
                                    <p className="mt-auto text-[13px] text-gray-400">
                                        - Peter Ingram, CEO Hawaiian Airlines
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </div>

            <Footer />
        </main>
    );
}