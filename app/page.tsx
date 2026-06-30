"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSatellite,
  faTv,
  faRobot,
  faShieldHalved,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

const CoverageMap = dynamic(() => import("@/components/CoverageMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-[#111111] text-orange-500 font-bold animate-pulse">
      Memuat Peta Satelit...
    </div>
  ),
});

const akastarSolutions = [
  {
    icon: faSatellite, // Ikon Satelit untuk Connectivity
    title: "Akastar Connectivity Engine (LEO, GEO & Access Last Mile)",
    desc: "Fondasi konektivitas hibrida cerdas yang memadukan latensi ultra-rendah satelit LEO dan keandalan satelit GEO. Dari langit, data didistribusikan langsung ke titik akhir pengguna melalui solusi Access Last Mile yang adaptif—baik menggunakan media kabel (Wired) maupun nirkabel (Wireless) sesuai kebutuhan lapangan yang menantang.",
  },
  {
    icon: faHouse,
    title: "Akastar Home FTTH Network (High-Speed Fiber Optic)",
    desc: "Menghadirkan keunggulan infrastruktur darat murni melalui teknologi FTTH (Fiber to the Home). Jaringan kabel optik berkecepatan tinggi yang stabil, simetris, dan tahan cuaca untuk memenuhi segala kebutuhan digital keluarga, mulai dari work from home, online streaming, gaming, hingga pemenuhan gaya hidup modern.",
  },
  {
    icon: faTv, // Ikon TV untuk Content
    title: "Akastar Content & Platform (Commercial IPTV & App Bundling)",
    desc: "Kami memastikan infrastruktur bisnis Anda bekerja maksimal. Sebagai bagian dari ekosistem Akastar, kami menyertakan platform IPTV Interaktif komersial, layanan siaran langsung, Video on Demand (VoD), serta aplikasi manajemen operasional yang siap pakai untuk menunjang kebutuhan korporat Anda.",
  },
  {
    icon: faRobot, // Ikon Robot untuk Intelligence
    title: "Akastar Intelligence System (Advanced IoT & Disaster Detection)",
    desc: "Otomatisasi cerdas untuk efisiensi dan keselamatan total. Mengintegrasikan sensor pintar untuk operasional industri hingga sistem IoT deteksi bencana alam dini. Didukung oleh sensor suhu, panas, dan kecepatan angin yang mengirimkan data taktis secara real-time melalui jaringan satelit tangguh Akastar.",
  },
  {
    icon: faShieldHalved, // Ikon Perisai untuk Secure
    title: "Akastar Secure (Comprehensive Cyber Security - Optional Bundling)",
    desc: "Perlindungan mutakhir untuk aset digital Anda. Menyediakan opsi proteksi tambahan (optional bundling) berupa enkripsi berlapis, arsitektur Zero Trust, pertahanan anti-jamming, serta deteksi ancaman real-time guna menjamin kedaulatan data korporat yang membutuhkan keamanan ekstra tinggi",
  },
];

export default function Home() {
  const [showMap, setShowMap] = useState(false);

  return (
    <main className="w-full bg-black">
      {/* --- SECTION 1: HERO --- */}
      <section className="z-0 relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden pt-32 pb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.webp"
            alt="NSC Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>

        <div className="relative z-10 mt-8 flex flex-col items-center px-4 text-center">
          {/* Headline dengan line-height yang lebih lega agar tidak menumpuk */}
          <h1 className="mb-6 text-4xl font-extrabold uppercase leading-tight tracking-tight text-white drop-shadow-xl md:text-5xl lg:text-6xl">
            Melampaui Sebatas Konektivitas Standar. <br />
            Perkenalkan Akastar: <br />
            Solusi Digital Ekosistem Tanpa Batas.
          </h1>

          {/* Paragraf dengan max-width agar teks tidak terlalu lebar dan sulit dibaca */}
          <p className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-gray-100 drop-shadow-md md:text-lg">
            <strong className="text-white">Akastar</strong> hadir sebagai solusi
            total bagi bisnis Anda. Dikembangkan oleh Nusantara Star Connect
            (NSC),
            <strong className="text-white"> Akastar</strong> adalah ekosistem
            digital utuh yang menyatukan jaringan Satelit LEO & GEO dengan
            fleksibilitas
            <em className="italic"> Access Last Mile</em> (Wired & Wireless).
            Kami bukan sekadar infrastruktur, melainkan solusi{" "}
            <em className="font-semibold">end-to-end</em> yang mengintegrasikan
            konten premium IPTV, platform IoT, hingga proteksi{" "}
            <em className="font-semibold">Cyber Security</em> tingkat tinggi
            dalam satu genggaman.
          </p>

          {/* Button Section */}
          <div className="flex flex-row gap-4">
            <button className="rounded-lg bg-white px-8 py-3 font-semibold text-blue-900 transition hover:bg-gray-200">
              Rancang Solusi Bersama
            </button>
            <button className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white hover:text-black">
              Konsultasi Arsitek Jaringan
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-[50px] flex w-full max-w-[1500px] flex-col gap-6 px-6 md:flex-row">
          {/* Card 1: Residensial */}
          {/* Perubahan : takeout dulu blm ada product */}
          {/* <div className="flex flex-1 flex-col justify-between rounded-xl border border-gray-500/50 bg-[#111111]/20 p-8 backdrop-blur-md">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-white uppercase">Residensial</h2>
              <p className="mb-4 text-sm text-gray-300">Dengan Akastar di rumah Anda, nikmati internet super cepat tanpa batasan. Streaming video, bermain game, dan bekerja dari rumah akan menjadi lebih lancar daripada sebelumnya. Jadikan rumah Anda pusat konektivitas yang tak tertandingi.</p>
              <p className="mb-8 text-sm font-bold text-white">Mulai di bawah ini untuk melihat paket dan harga</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-gray-200">
                Mulai
              </button>
              <button className="border border-white bg-transparent px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black">
                Pelajari Selengkapnya
              </button>
            </div>
          </div> */}

          {/* Card 2: Jelajah (Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {akastarSolutions.map((item, index) => (
              <div
                key={index}
                className={`
                group flex flex-col rounded-2xl border border-white/10 
                bg-white/5 p-6 backdrop-blur-xl transition-all duration-300
                hover:border-orange-500/30 hover:bg-white/10
                hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]

                ${index < 3 ? "lg:col-span-2" : "lg:col-span-2"}
                ${index === 3 ? "lg:col-start-2" : ""}
              `}
              >
                <div className="mb-4 flex items-center justify-start w-12 h-12">
                  <div className="text-3xl text-orange-500 transition-transform duration-300 group-hover:scale-110">
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                </div>

                <h2 className="mb-3 text-xl font-bold text-white uppercase tracking-wide">
                  {item.title}
                </h2>

                <p className="text-sm text-gray-300 leading-relaxed font-light">
                  {item.desc}
                </p>

                <div className="mt-6 h-1 w-12 rounded-full bg-orange-500/50 transition-all group-hover:w-20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 2: KONEKTIVITAS --- */}
      <section className="flex w-full flex-col items-center justify-center bg-black px-6 py-32 text-center relative z-10">
        <h2 className="mb-6 max-w-5xl text-3xl font-bold uppercase tracking-tight text-white md:text-5xl lg:text-[44px] leading-tight">
          KONEKTIVITAS CEPAT SAMPAI PELOSOK NEGERI, KAPAN SAJA ANDA BUTUHKAN
        </h2>

        <p className="mb-8 text-xs md:text-sm font-medium uppercase tracking-[0.15em] text-gray-300">
          Tersebar di seluruh wilayah indonesia sampai pelosok negeri
        </p>

        <button
          onClick={() => setShowMap(true)} // Aksi memunculkan peta
          className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-70"
        >
          <span className="border-b border-transparent pb-0.5 group-hover:border-white transition-colors">
            PERIKSA KETERSEDIAAN DAN PAKET DI AREA ANDA
          </span>
          <svg
            className="h-4 w-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </section>

      {/* --- MODAL PETA KETERSEDIAAN --- */}
      <AnimatePresence>
        {showMap && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
            {/* Overlay Gelap Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMap(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Box Modal Peta */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl h-[80vh] flex flex-col bg-[#111111] border border-white/20 rounded-[32px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            >
              {/* Header Modal Peta */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0a0a0a] relative z-10">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Peta Jangkauan NSC
                  </h3>
                  <p className="text-xs text-gray-400 font-medium mt-1">
                    Area dengan sorotan biru menandakan layanan internet satelit
                    LEO aktif.
                  </p>
                </div>
                <button
                  onClick={() => setShowMap(false)}
                  className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-orange-500 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Area Render Leaflet Map */}
              <div className="flex-grow w-full h-full relative z-0 bg-[#0a0a0a]">
                <CoverageMap />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- SECTION 3: Maritim & Lepas Pantai --- */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/maritim3.webp"
            alt="Maritim & Lepas Pantai"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-bl from-black/80 via-black/20 to-transparent"></div>
        </div>

        <div className="relative z-10 flex h-full flex-col items-end justify-start px-8 pt-32 md:px-16 lg:px-24 md:pt-40">
          <div className="max-w-lg text-left">
            <h2 className="mb-6 text-3xl font-bold uppercase leading-tight tracking-tight text-white drop-shadow-md md:text-4xl">
              Maritim & Lepas Pantai (Maritime)
            </h2>
            <p className="text-base leading-relaxed text-gray-200 drop-shadow-md md:text-lg">
              Digital Ekosistem Maritim: Armada Aman, Kru Sejahtera, Data
              Terlindungi Akastar mengamankan komunikasi armada laut lepas
              menggunakan satelit hibrida LEO/GEO, lalu bertransisi mulus ke
              jaringan Access Last Mile lokal saat bersandar. Didistribusikan
              secara Wired & Wireless di atas kapal, Akastar menghadirkan
              platform Marine IPTV untuk hiburan kru, sensor IoT pelacakan
              kapal, serta proteksi Cyber Security maritim melalui sistem
              Akastar Secure yang tangguh
            </p>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: PERTANIAN --- */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/pertanian.webp"
            alt="Pertanian & Perkebunan Digital"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 flex h-full flex-col justify-start px-8 pt-32 md:px-16 md:pt-40 lg:px-24">
          <div className="max-w-xl text-left">
            <h2 className="mb-6 text-3xl font-bold uppercase leading-tight tracking-tight text-white drop-shadow-md md:text-4xl">
              Pertanian & Perkebunan Digital (Agriculture & IoT)
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-200 drop-shadow-md md:text-lg">
              Modernisasi Lahan Blank Spot dengan Ekosistem Cerdas Hubungkan pos
              perkebunan terpencil Anda ke dalam digital ekosistem terpadu
              Akastar. Data dari ribuan sensor IoT tanah, drone pemantau, dan
              mesin otomatis dikumpulkan lewat jaringan Wireless Last Mile jarak
              jauh, lalu ditransmisikan ke pusat data via satelit dengan
              proteksi enkripsi ketat dari Akastar Secure.
            </p>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: Mitigasi Bencana & Lingkungan (Disaster Detection & Environment) --- */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bencana2.webp"
            alt="Mitigasi Bencana & Lingkungan (Disaster Detection & Environment)"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-bl from-black/80 via-black/20 to-transparent"></div>
        </div>

        <div className="relative z-10 flex h-full flex-col items-end justify-start px-8 pt-32 md:px-16 lg:px-24 md:pt-40">
          <div className="max-w-lg text-left">
            <h2 className="mb-6 text-3xl font-bold uppercase leading-tight tracking-tight text-white drop-shadow-md md:text-4xl">
              Mitigasi Bencana & Lingkungan (Disaster Detection & Environment)
            </h2>
            <p className="text-base leading-relaxed text-gray-200 drop-shadow-md md:text-lg">
              Sistem Peringatan Dini Cerdas di Wilayah Ekstrem Menghadirkan
              solusi pemantauan lingkungan terintegrasi untuk mendeteksi bencana
              alam di area terpencil (blank spot). Memanfaatkan sensor pintar
              Akastar untuk membaca fluktuasi suhu ekstrim, indikasi panas api
              (karhutla), hingga perubahan kecepatan angin. Data krisis dikirim
              seketika via satelit LEO/GEO ke pusat komando tanpa bergantung
              pada menara seluler darat yang rentan tumbang saat bencana
            </p>
          </div>
        </div>
      </section>

      {/* --- SECTION 6: Pertahanan & Keamanan Negara (Defense) --- */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/pertahanan.webp"
            alt="Pertahanan & Keamanan Negara (Defense)"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 flex h-full flex-col justify-start px-8 pt-32 md:px-16 md:pt-40 lg:px-24">
          <div className="max-w-xl text-left">
            <h2 className="mb-6 text-3xl font-bold uppercase leading-tight tracking-tight text-white drop-shadow-md md:text-4xl">
              Pertahanan & Keamanan Negara (Defense)
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-200 drop-shadow-md md:text-lg">
              Komunikasi Taktis Berlapis dengan Proteksi Ekstrem Solusi vital
              pos perbatasan dan operasi lapangan. Mengandalkan ketahanan ganda
              satelit LEO & GEO yang disalurkan via perangkat Wireless Last Mile
              taktis Akastar. Seluruh lalu lintas data dalam jaringan militer
              ini dienkripsi secara total menggunakan protokol tingkat tinggi
              dari Akastar Secure yang kebal dari penyadapan.
            </p>
          </div>
        </div>
      </section>

      {/* --- SECTION 7: Akastar Home (Residensial & Hunian Modern) --- */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/rumah-modern.webp"
            alt="Akastar Home (Residensial & Hunian Modern)"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-bl from-black/80 via-black/20 to-transparent"></div>
        </div>

        <div className="relative z-10 flex h-full flex-col items-end justify-start px-8 pt-32 md:px-16 lg:px-24 md:pt-40">
          <div className="max-w-lg text-left">
            <h2 className="mb-6 text-3xl font-bold uppercase leading-tight tracking-tight text-white drop-shadow-md md:text-4xl">
              Akastar Home (Residensial & Hunian Modern)
            </h2>
            <p className="text-base leading-relaxed text-gray-200 drop-shadow-md md:text-lg">
              Internet Rumah Super Cepat dengan Koneksi Murni FTTH Nikmati
              pengalaman internet rumah tanpa batas dengan teknologi FTTH (Fiber
              to the Home) yang stabil, simetris, dan tahan cuaca. Paket Akastar
              Home memberikan jaminan konektivitas serat optik murni
              berkecepatan tinggi yang handal untuk mendukung aktivitas seluruh
              anggota keluarga di rumah tanpa hambatan.
            </p>
          </div>
        </div>
      </section>

      {/* --- SECTION 8: Hiburan, Media & Perhotelan (Entertainment & Hospitality) --- */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/pemukiman.webp"
            alt="Hiburan, Media & Perhotelan (Entertainment & Hospitality)"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 flex h-full flex-col justify-start px-8 pt-32 md:px-16 md:pt-40 lg:px-24">
          <div className="max-w-xl text-left">
            <h2 className="mb-6 text-3xl font-bold uppercase leading-tight tracking-tight text-white drop-shadow-md md:text-4xl">
              Hiburan, Media & Perhotelan (Entertainment & Hospitality)
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-200 drop-shadow-md md:text-lg">
              Hospitality IPTV & Distribusi Media Tanpa Buffering Solusi
              terlengkap untuk industri perhotelan, resort terpencil, hingga
              area pemukiman pelosok. Akastar menangkap konten media digital
              premium via satelit, lalu mendistribusikannya melalui
              infrastruktur Access Last Mile Wired/Wireless lokal, memastikan
              tayangan IPTV interaktif tersaji lancar di setiap layar kamar
              pengguna
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
