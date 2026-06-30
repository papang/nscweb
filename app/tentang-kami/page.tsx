"use client";

import Image from "next/image";
import {
    ShieldCheck,
    Globe,
    Zap,
    Users,
    Heart,
    CheckCircle2,
    Settings,
    Signal,
    Gauge,
    Headphones,
    Award,
    Wrench,
    Anchor,
    Building2,
    Flame,
    Star,
    Briefcase,
    FileText,
    MapPin,
    Phone,
    Hash,
    CalendarDays,
    User,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Data ────────────────────────────────────────────────────────────────────

const starValues = [
    {
        code: "S",
        title: "Service Oriented",
        desc: "Berorientasi pada kepuasan dan kebutuhan pelanggan",
        icon: <Users className="w-5 h-5" />,
    },
    {
        code: "T",
        title: "Trust Worthy",
        desc: "Membangun kepercayaan melalui integritas di setiap layanan",
        icon: <ShieldCheck className="w-5 h-5" />,
    },
    {
        code: "A",
        title: "Accountable",
        desc: "Bertanggung jawab penuh atas setiap komitmen yang diberikan",
        icon: <CheckCircle2 className="w-5 h-5" />,
    },
    {
        code: "R",
        title: "Respectful",
        desc: "Menghargai setiap mitra, pelanggan, dan pemangku kepentingan",
        icon: <Heart className="w-5 h-5" />,
    },
];

const rpmValues = [
    {
        code: "R",
        title: "Reliable",
        desc: "Layanan yang dapat diandalkan kapan pun dan di mana pun",
        icon: <Signal className="w-5 h-5" />,
    },
    {
        code: "P",
        title: "Proactive",
        desc: "Sigap mengantisipasi kebutuhan sebelum masalah muncul",
        icon: <Zap className="w-5 h-5" />,
    },
    {
        code: "M",
        title: "Manageability Solution",
        desc: "Solusi yang mudah dikelola dan disesuaikan",
        icon: <Settings className="w-5 h-5" />,
    },
];

const whyNsc = [
    {
        icon: <Star className="w-5 h-5" />,
        title: "Priority Access",
        desc: "Akses prioritas pada jaringan satelit Starlink",
    },
    {
        icon: <Gauge className="w-5 h-5" />,
        title: "Bandwidth Guarantee",
        desc: "Garansi bandwidth untuk setiap paket layanan",
    },
    {
        icon: <Headphones className="w-5 h-5" />,
        title: "24×7×365 Support",
        desc: "Dukungan NOC responsif tanpa henti sepanjang tahun",
    },
    {
        icon: <Award className="w-5 h-5" />,
        title: "Official Distributor",
        desc: "Distributor resmi dan terpercaya Starlink di Indonesia",
    },
    {
        icon: <Users className="w-5 h-5" />,
        title: "Direct Sales",
        desc: "Tim penjualan langsung yang tersebar di seluruh Indonesia",
    },
    {
        icon: <Wrench className="w-5 h-5" />,
        title: "Managed Service",
        desc: "Solusi managed service yang komprehensif",
    },
    {
        icon: <Globe className="w-5 h-5" />,
        title: "Gateway Indonesia",
        desc: "Menggunakan gateway dan domain Indonesia sesuai regulasi Kominfo",
    },
];

const projects = [
    {
        icon: <Flame className="w-6 h-6" />,
        sector: "Energi & Pertambangan",
        desc: "Implementasi jaringan VSAT komprehensif untuk PetroChina, memungkinkan pertukaran data real-time di lokasi operasi tambang terpencil.",
    },
    {
        icon: <Anchor className="w-6 h-6" />,
        sector: "Industri Maritim",
        desc: "Penyediaan layanan VSAT maritim berkecepatan tinggi untuk armada kapal PT Pelni, menjamin konektivitas tanpa gangguan di tengah laut.",
    },
    {
        icon: <Building2 className="w-6 h-6" />,
        sector: "Proyek Pemerintah",
        desc: "Pembangunan infrastruktur komunikasi satelit untuk program di Sorong, mendukung inisiatif e-government dan konektivitas pedesaan.",
    },
];

const boardOfDirectors = [
    {
        name: "Rian Rahadian",
        title: "President Commissioner",
        photo: "/team/rian-rahadian.png",
    },
    {
        name: "Sugeng Jadmoko",
        title: "President Director",
        photo: "/team/sugeng-jadmoko.png",
    },
    {
        name: "Nurul Kowim",
        title: "Commissioner",
        photo: "/team/nurul-kowim.png",
    },
    {
        name: "Panji Nugraha Abdillah",
        title: "Plt Commercial Director",
        photo: "/team/panji-nugraha.png",
    },
    {
        name: "Johan Wahyudi",
        title: "Finance & Administration Director",
        photo: "/team/johan-wahyudi.png",
    },
];

const legalData = [
    {
        icon: <FileText className="w-5 h-5" />,
        label: "Nama Perusahaan",
        value: "PT Nusantara Star Connect",
    },
    {
        icon: <Building2 className="w-5 h-5" />,
        label: "Status Perusahaan",
        value: "Pusat",
    },
    {
        icon: <MapPin className="w-5 h-5" />,
        label: "Alamat Perusahaan",
        value: "Grand Fatmawati Mas Blok I No. 108, Jl. RS Fatmawati No. 20, Cilandak Barat, Cilandak, Jakarta Selatan 12430",
    },
    {
        icon: <Phone className="w-5 h-5" />,
        label: "Telepon",
        value: "021-39524438",
    },
    {
        icon: <Hash className="w-5 h-5" />,
        label: "No. Akta",
        value: "1223",
    },
    {
        icon: <CalendarDays className="w-5 h-5" />,
        label: "Tanggal Akta",
        value: "26 Mei 2023",
    },
    {
        icon: <Briefcase className="w-5 h-5" />,
        label: "Nama Notaris",
        value: "Aska Laksamana Putera",
    },
    {
        icon: <Hash className="w-5 h-5" />,
        label: "NIB",
        value: "0606230036475",
    },
];

// ── Component ────────────────────────────────────────────────────────────────

export default function TentangKami() {
    return (
        <main className="relative flex min-h-screen w-full flex-col bg-black text-gray-200 selection:bg-orange-500/30">
            <Navbar />

            {/* Background Pattern */}
            <div className="fixed inset-0 z-0 h-full w-full pointer-events-none opacity-20">
                <Image
                    src="/particle2.webp"
                    alt="Background Pattern"
                    fill
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.08),transparent)]" />
            </div>

            <div className="relative z-10 flex flex-1 w-full flex-col items-center px-6 pt-32 pb-24 md:px-12 lg:px-24 md:pt-40">

                {/* ── 1. HERO ─────────────────────────────────────────────── */}
                <div className="max-w-4xl text-center mb-20">
                    <h4 className="mb-4 text-[14px] md:text-[18px] font-black uppercase tracking-[0.4em] text-orange-500 opacity-80">
                        Profil Perusahaan
                    </h4>
                    <h1 className="mb-4 text-3xl font-bold uppercase tracking-tight md:text-5xl lg:text-[56px] leading-tight text-white">
                        PT Nusantara Star Connect (NSC)
                    </h1>
                    <p className="mb-6 text-base md:text-base text-gray-500 italic font-medium">
                        "Empowering connectivity, bridging the gap, and bringing high-speed internet to every corner."
                    </p>
                    <div className="h-1.5 w-24 bg-orange-500 mx-auto mb-8 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
                    <p className="text-base md:text-xl text-gray-400 leading-relaxed font-medium mb-4">
                        PT Nusantara Star Connect (NSC) adalah penyedia solusi layanan satelit terkemuka di Indonesia dan
                        merupakan <b className="text-white">Starlink Virtual Network Operator (VNO) resmi</b>. NSC menghadirkan
                        layanan konektivitas melalui sistem komunikasi satelit{" "}
                        <b className="text-white">Low Earth Orbit (LEO)</b> yang menjangkau seluruh pelosok Indonesia,
                        dari perkotaan hingga daerah{" "}
                        <b className="text-white">3T (Terdepan, Terluar, Tertinggal)</b>.
                    </p>
                    <p className="text-sm md:text-lg text-gray-500 leading-relaxed font-medium">
                        NSC melayani berbagai industri: Oil &amp; Gas, Mining, Perkebunan, Manufaktur, Layanan Publik,
                        Transportasi &amp; Logistik, Maritim, Ekosistem IoT, Broadcaster, ISP, dan masih banyak lagi.
                    </p>
                </div>

                {/* ── 2. CORE VALUES ──────────────────────────────────────── */}
                <div className="w-full max-w-6xl">
                    <div className="text-center mb-12">
                        <h4 className="mb-3 text-[14px] md:text-[16px] font-black uppercase tracking-[0.4em] text-orange-500 opacity-80">
                            Nilai Perusahaan
                        </h4>
                        <h2 className="text-2xl font-black uppercase tracking-tight md:text-3xl text-white">
                            Core Values
                        </h2>
                    </div>

                    {/* STAR Group */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="inline-flex items-center rounded-lg bg-orange-500 px-4 py-1.5 text-[14px] font-black uppercase tracking-[0.3em] text-black shadow-[0_0_12px_rgba(249,115,22,0.35)]">
                                ★ STAR Values
                            </span>
                            <span className="text-[14px] text-gray-600 uppercase tracking-wider font-semibold">
                                Nilai Karakter
                            </span>
                        </div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                            {starValues.map((item) => (
                                <div
                                    key={item.code}
                                    className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-[#111111] p-6 backdrop-blur-md transition-all duration-300 hover:bg-orange-500 hover:border-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] cursor-default"
                                >
                                    {/* Large letter accent */}
                                    <span className="flex-shrink-0 text-5xl font-black text-orange-500/20 group-hover:text-black/20 transition-colors leading-none select-none">
                                        {item.code}
                                    </span>
                                    <div className="flex flex-col min-w-0">
                                        <div className="mb-1.5 text-orange-500 group-hover:text-black transition-colors">
                                            {item.icon}
                                        </div>
                                        <h3 className="mb-1 text-md font-black uppercase tracking-wider text-white group-hover:text-black transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-[14px] text-gray-500 leading-relaxed font-medium group-hover:text-black/80 transition-colors">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RPM Group */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="inline-flex items-center rounded-lg border border-orange-500/50 px-4 py-1.5 text-[14px] font-black uppercase tracking-[0.3em] text-orange-500">
                                ⚙ RPM Values
                            </span>
                            <span className="text-[14px] text-gray-600 uppercase tracking-wider font-semibold">
                                Nilai Operasional
                            </span>
                        </div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                            {rpmValues.map((item) => (
                                <div
                                    key={item.code}
                                    className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-[#111111] p-6 backdrop-blur-md transition-all duration-300 hover:bg-orange-500 hover:border-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] cursor-default"
                                >
                                    <span className="flex-shrink-0 text-5xl font-black text-orange-500/20 group-hover:text-black/20 transition-colors leading-none select-none">
                                        {item.code}
                                    </span>
                                    <div className="flex flex-col min-w-0">
                                        <div className="mb-1.5 text-orange-500 group-hover:text-black transition-colors">
                                            {item.icon}
                                        </div>
                                        <h3 className="mb-1 text-md font-black uppercase tracking-wider text-white group-hover:text-black transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-[14px] text-gray-500 leading-relaxed font-medium group-hover:text-black/80 transition-colors">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── 3. MENGAPA MEMILIH NSC? ─────────────────────────────── */}
                <div className="mt-24 w-full max-w-6xl">
                    <div className="text-center mb-12">
                        <h4 className="mb-3 text-[14px] md:text-[16px] font-black uppercase tracking-[0.4em] text-orange-500 opacity-80">
                            Keunggulan Kami
                        </h4>
                        <h2 className="text-2xl font-black uppercase tracking-tight md:text-3xl text-white">
                            Mengapa Memilih NSC?
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {whyNsc.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center rounded-2xl border border-white/10 bg-[#111111] p-5 md:p-7 text-center backdrop-blur-md transition-all duration-300 hover:bg-orange-500 hover:border-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] group cursor-default"
                            >
                                <div className="mb-3 text-orange-500 group-hover:text-black transition-colors">
                                    {item.icon}
                                </div>
                                <h3 className="mb-2 text-[14px] md:text-md font-black uppercase tracking-wider text-white group-hover:text-black transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-[14px] text-gray-500 leading-relaxed font-medium group-hover:text-black/80 transition-colors">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── 4. VISI & MISI ──────────────────────────────────────── */}
                <div className="mt-24 grid w-full max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Visi */}
                    <div className="flex flex-col rounded-[32px] border border-white/10 bg-[#111111] p-8 shadow-2xl backdrop-blur-md lg:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[50px] rounded-full pointer-events-none" />
                        <h2 className="mb-6 text-2xl font-black uppercase tracking-tight md:text-3xl text-orange-500 relative z-10">
                            VISI
                        </h2>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium italic relative z-10">
                            "Merevolusi industri penyedia layanan satelit di Indonesia dengan menghadirkan teknologi
                            mutakhir dan solusi inovatif untuk menjembatani kesenjangan digital."
                        </p>
                    </div>

                    {/* Misi */}
                    <div className="flex flex-col rounded-[32px] border border-white/10 bg-[#111111] p-8 shadow-2xl backdrop-blur-md lg:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[50px] rounded-full pointer-events-none" />
                        <h2 className="mb-6 text-2xl font-black uppercase tracking-tight md:text-3xl text-orange-500 relative z-10">
                            MISI
                        </h2>
                        <ol className="space-y-5 relative z-10">
                            <li className="flex items-start gap-4">
                                <span className="flex-shrink-0 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/20 text-[11px] font-black text-orange-500">
                                    1
                                </span>
                                <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium">
                                    Memberikan layanan berkualitas tinggi dan solusi tepat sasaran untuk mengatasi
                                    kesenjangan digital di Indonesia.
                                </p>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="flex-shrink-0 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/20 text-[11px] font-black text-orange-500">
                                    2
                                </span>
                                <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium">
                                    Memberikan nilai terbaik kepada seluruh pemangku kepentingan secara terhormat dan
                                    bertanggung jawab.
                                </p>
                            </li>
                        </ol>
                    </div>
                </div>

                {/* ── 5. PROYEK & PENCAPAIAN ──────────────────────────────── */}
                <div className="mt-24 w-full max-w-6xl">
                    <div className="text-center mb-12">
                        <h4 className="mb-3 text-[14px] md:text-[16px] font-black uppercase tracking-[0.4em] text-orange-500 opacity-80">
                            Track Record
                        </h4>
                        <h2 className="text-2xl font-black uppercase tracking-tight md:text-3xl text-white">
                            Proyek &amp; Pencapaian
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {projects.map((item, idx) => (
                            <div
                                key={idx}
                                className="group flex flex-col rounded-[28px] border border-white/10 bg-[#111111] p-8 backdrop-blur-md transition-all duration-300 hover:border-orange-500/40 hover:shadow-[0_0_30px_rgba(249,115,22,0.12)] relative overflow-hidden cursor-default"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 blur-[40px] rounded-full pointer-events-none group-hover:bg-orange-500/10 transition-all" />
                                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 group-hover:bg-orange-500/20 transition-colors">
                                    {item.icon}
                                </div>
                                <h3 className="mb-3 text-md font-black uppercase tracking-wider text-white">
                                    {item.sector}
                                </h3>
                                <p className="text-[14px] text-gray-500 leading-relaxed font-medium">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── 6. BOARD OF DIRECTORS ──────────────────────────────── */}
                <div className="mt-24 w-full max-w-6xl">
                    <div className="text-center mb-12">
                        <h4 className="mb-3 text-[14px] md:text-[16px] font-black uppercase tracking-[0.4em] text-orange-500 opacity-80">
                            Manajemen
                        </h4>
                        <h2 className="text-2xl font-black uppercase tracking-tight md:text-3xl text-white">
                            Board of Directors
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {boardOfDirectors.map((person, idx) => (
                            <div
                                key={idx}
                                className="group flex flex-col items-center rounded-2xl border border-white/10 bg-[#111111] p-6 text-center backdrop-blur-md transition-all duration-300 hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] cursor-default"
                            >
                                {/* Photo */}
                                <div className="mb-4 h-20 w-20 rounded-full border-2 border-white/10 group-hover:border-orange-500/30 transition-colors overflow-hidden">
                                    <Image
                                        src={person.photo}
                                        alt={person.name}
                                        width={80}
                                        height={80}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <h3 className="mb-1 text-md font-black text-white leading-tight">
                                    {person.name}
                                </h3>
                                <p className="text-[12px] text-orange-500/80 font-semibold uppercase tracking-wider leading-tight">
                                    {person.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── 8. KLIEN & MITRA ────────────────────────────────────── */}
                <div className="mt-24 w-full max-w-6xl">
                    <div className="text-center mb-12">
                        <h4 className="mb-3 text-[10px] md:text-[14px] font-black uppercase tracking-[0.4em] text-orange-500 opacity-80">
                            Ekosistem Bisnis
                        </h4>
                        <h2 className="text-2xl font-black uppercase tracking-tight md:text-3xl text-white">
                            Klien &amp; Mitra Kami
                        </h2>
                        <p className="mt-4 text-sm text-gray-500 font-medium max-w-xl mx-auto">
                            Dipercaya oleh perusahaan-perusahaan terkemuka dari berbagai sektor industri di Indonesia.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

                        {/* Our Partnership */}
                        <div className="rounded-[28px] border border-white/10 bg-[#111111] p-6 lg:p-10">
                            <p className="text-center text-[11px] font-black uppercase tracking-[0.3em] text-gray-600 mb-6">
                                Our Partnership
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {[
                                    { name: "Telkomsat",                file: "telkomsat" },
                                    { name: "MTM",                      file: "mtm" },
                                    { name: "MikroTik",                 file: "mikrotik" },
                                    { name: "Terang Sinergi Nusantara", file: "tsn" },
                                    { name: "RBN",                      file: "rbn" },
                                    { name: "APJII",                    file: "apjii" },
                                    { name: "Peplink",                  file: "peplink" },
                                    { name: "HSP",                      file: "hsp" },
                                    { name: "Mastersystem",             file: "mastersystem" },
                                    { name: "Arthanet",                 file: "arthanet" },
                                    { name: "Matrix",                   file: "matrix" },
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="group flex items-center justify-center rounded-2xl bg-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:ring-2 hover:ring-orange-500/50 p-3 aspect-[3/2]"
                                    >
                                        <Image
                                            src={`/partners/${item.file}.png`}
                                            alt={item.name}
                                            width={120}
                                            height={60}
                                            className="object-contain w-full h-full"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Our Clients */}
                        <div className="rounded-[28px] border border-white/10 bg-[#111111] p-6 lg:p-10">
                            <p className="text-center text-[11px] font-black uppercase tracking-[0.3em] text-gray-600 mb-6">
                                Our Clients
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { name: "Telkomsel", file: "telkomsel" },
                                    { name: "PT Pelni",  file: "pelni" },
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="group flex items-center justify-center rounded-2xl bg-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:ring-2 hover:ring-orange-500/50 p-5 aspect-[3/2]"
                                    >
                                        <Image
                                            src={`/partners/${item.file}.png`}
                                            alt={item.name}
                                            width={180}
                                            height={90}
                                            className="object-contain w-full h-full"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* ── 9. CALL TO ACTION ───────────────────────────────────── */}
                <div className="mt-24 text-center">
                    <h3 className="mb-8 text-[11px] font-black uppercase tracking-[0.3em] text-gray-500">
                        Siap Terhubung Dengan Kami?
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="rounded-xl border border-orange-500/50 px-10 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-orange-500 transition-all hover:bg-orange-500/10 hover:border-orange-500 active:scale-95">
                            Lihat Paket
                        </button>
                        <button className="rounded-xl bg-orange-500 px-10 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-orange-400 active:scale-95 shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                            Hubungi Kami
                        </button>
                    </div>
                </div>

            </div>

            <Footer />
        </main>
    );
}