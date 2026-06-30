import Image from "next/image";
import Footer from "@/components/Footer";

export default function Bisnis() {
  return (
    <main className="w-full bg-black">

      {/* --- HERO SECTION BISNIS --- */}
      <section className="relative flex min-h-screen w-full flex-col items-center justify-between pb-16 pt-32 md:pt-40">

        <div className="absolute inset-0 z-0 h-full w-full">
          <Image
            src="/hero_bisnis.webp"
            alt="NSC Business"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>

        <div className="relative z-10 flex w-full flex-col items-center px-4 text-center mt-10 md:mt-0">
          <h1 className="mb-4 text-5xl font-bold uppercase tracking-tight text-white drop-shadow-lg md:text-6xl lg:text-7xl">
            Raih Kesempatan Bersama NSC
          </h1>
          <p className="mb-6 max-w-3xl text-lg font-medium text-white drop-shadow-md md:text-xl">
            Gabung bersama kami untuk mendapatkan kesempatan yang lebih gemilang dan menjadi keluarga baru kami.
          </p>
          <p className="text-base text-white drop-shadow-md">
            <a href="#" className="font-bold underline underline-offset-4 transition-opacity hover:opacity-80">Hubungi tim kami</a> atau lihat <a href="#" className="font-bold underline underline-offset-4 transition-opacity hover:opacity-80">panduan NSC career</a>.
          </p>
        </div>

        <div className="relative z-10 mt-16 flex w-full max-w-6xl flex-col gap-6 px-8 md:flex-row lg:px-12">
          <div className="flex-1 rounded-sm border border-gray-500/50 bg-[#111111]/40 p-8 backdrop-blur-md md:p-10">
            <h2 className="mb-4 text-2xl font-bold uppercase tracking-widest text-white">LOKAL PRIORITAS</h2>
            <p className="mb-8 text-sm font-medium text-gray-300">Konektivitas di seluruh wilayah negara Anda</p>
            <p className="mb-8 text-[13px] font-bold text-white">Mulai Rp647.000/bln untuk layanan</p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white px-8 py-3 text-[11px] font-bold uppercase tracking-widest text-black transition-colors hover:bg-gray-200">MULAI</button>
              <a href="/service-plans" className="border border-white bg-transparent px-8 py-3 text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black">DETAIL LAYANAN</a>
            </div>
          </div>

          <div className="flex-1 rounded-sm border border-gray-500/50 bg-[#111111]/40 p-8 backdrop-blur-md md:p-10">
            <h2 className="mb-4 text-2xl font-bold uppercase tracking-widest text-white">GLOBAL PRIORITAS</h2>
            <p className="mb-8 text-sm font-medium text-gray-300">Konektivitas di darat dan laut di seluruh benua</p>
            <p className="mb-8 text-[13px] font-bold text-white">Mulai Rp4.477.000/bln untuk layanan</p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white px-8 py-3 text-[11px] font-bold uppercase tracking-widest text-black transition-colors hover:bg-gray-200">MULAI</button>
              <a href="/service-plans" className="border border-white bg-transparent px-8 py-3 text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black">DETAIL LAYANAN</a>
            </div>
          </div>
        </div>
      </section>

      <div className="relative w-full bg-black [clip-path:inset(0)]">

        <div className="fixed left-0 top-0 z-0 h-full w-full md:w-1/2 pointer-events-none">
          <Image
            src="/particle1.webp"
            alt="Particle Effect"
            fill
            sizes="100vw"
            className="object-contain object-left"
          />
        </div>

        <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col bg-transparent px-8 py-20 md:px-16 lg:px-12">

          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
              KASUS PENGGUNAAN
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-900 group">
              <Image src="/lokasi-tetap.webp" alt="Lokasi Tetap" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent p-6 md:p-8">
                <h4 className="text-2xl font-bold uppercase text-white md:text-3xl">LOKASI TETAP</h4>
                <p className="mt-1 text-sm text-gray-200 md:text-base">Konektivitas untuk bisnis</p>
              </div>
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-900 grayscale group">
              <Image src="/mobile-darat.webp" alt="Mobile Darat" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent p-6 md:p-8">
                <h4 className="text-2xl font-bold uppercase text-white md:text-3xl">MOBILE DARAT</h4>
                <p className="mt-1 text-sm text-gray-200 md:text-base">Layanan tidak tersedia</p>
              </div>
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-900 group">
              <Image src="/maritim.webp" alt="Maritim" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent p-6 md:p-8">
                <h4 className="text-2xl font-bold uppercase text-white md:text-3xl">MARITIM</h4>
                <p className="mt-1 text-sm text-gray-200 md:text-base">Konektivitas di perairan</p>
              </div>
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-900 group">
              <Image src="/aviasi.webp" alt="Aviasi" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent p-6 md:p-8">
                <h4 className="text-2xl font-bold uppercase text-white md:text-3xl">AVIASI</h4>
                <p className="mt-1 text-sm text-gray-200 md:text-base">Konektivitas di udara</p>
              </div>
            </div>
          </div>

          <div className="mt-40 flex flex-col items-center text-center">
            <h2 className="mb-6 text-3xl font-bold uppercase tracking-tight text-white md:text-4xl lg:text-5xl">
              BUAT BISNIS ANDA TETAP TERHUBUNG
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-gray-300 md:text-base">
              Hubungkan karyawan di seluruh lokasi, pantau perangkat IoT, dan cadangkan jaringan Anda, bahkan di lokasi terpencil di dunia.
            </p>
          </div>

          <div className="mt-32 flex flex-col items-center gap-12 md:flex-row lg:gap-24">
            <div className="flex-1 text-left">
              <h2 className="mb-6 text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
                ONLINE DENGAN MUDAH
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-gray-300 md:text-base">
                Kit NSC hadir dengan semua yang Anda butuhkan untuk online dalam hitungan menit. Anda hanya butuh tempat bebas halangan dan mengarah langsung ke langit.
              </p>
              <p className="mb-10 text-sm leading-relaxed text-gray-300 md:text-base">
                Unduh Aplikasi NSC untuk menentukan lokasi pemasangan terbaik Anda.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <button className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-70">
                  <span className="border-b border-transparent pb-0.5 group-hover:border-white transition-all duration-300">
                    UNDUH UNTUK ANDROID
                  </span>
                  <svg className="h-3 w-3 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-70">
                  <span className="border-b border-transparent pb-0.5 group-hover:border-white transition-all duration-300">
                    UNDUH UNTUK IOS
                  </span>
                  <svg className="h-3 w-3 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="relative aspect-square w-full flex-1 md:aspect-[4/3]">
              <Image src="/online.webp" alt="Pemasangan NSC" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover rounded-sm" />
            </div>
          </div>

          <div className="mt-32 flex flex-col gap-12 md:flex-row lg:gap-24">

            <div className="flex-1 text-left">
              <svg className="mb-6 h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <h3 className="mb-4 text-2xl font-bold uppercase text-white md:text-3xl">
                ALOKASI KUOTA FLEKSIBEL
              </h3>
              <p className="text-sm leading-relaxed text-gray-300">
                Paket Prioritas menawarkan fleksibilitas untuk menyesuaikan kebutuhan kuota Anda. Pilih dari salah satu paket prasetel kami, dan sesuaikan dengan menambahkan blok kuota dalam kelipatan 50 GB atau 500 GB.
              </p>
            </div>

            <div className="flex-1 text-left">
              <svg className="mb-6 h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mb-4 text-2xl font-bold uppercase text-white md:text-3xl">
                LAYANAN PRIORITAS 24/7
              </h3>
              <p className="text-sm leading-relaxed text-gray-300">
                Pelanggan Kuota Prioritas mendapat prioritas jaringan dan menerima kecepatan yang lebih cepat secara konsisten. Pelanggan yang menggunakan Paket Prioritas juga akan mendapatkan dukungan prioritas 24/7, alamat IPv4 yang dapat dirutekan secara publik, dan mencakup Perjanjian Tingkat Layanan.
              </p>
            </div>

          </div>

        </section>
      </div>

      <section className="relative flex min-h-[80vh] w-full items-center justify-end px-8 py-24 md:px-16 lg:px-24">

        <div className="absolute inset-0 z-0 h-full w-full">
          <Image
            src="/sunset.webp"
            alt="Akses Jaringan di Laut"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/60 md:to-black/50"></div>
        </div>

        <div className="relative z-10 flex w-full max-w-xl flex-col items-start text-left md:mr-10 lg:mr-20">
          <h2 className="mb-6 text-4xl font-bold uppercase leading-tight tracking-tight text-white md:text-5xl">
            AKSES JARINGAN SAAT DI LAUT
          </h2>
          <p className="mb-8 text-base leading-relaxed text-white drop-shadow-md md:text-lg">
            Gunakan kuota Global Prioritas saat di laut. Sekarang mencakup kecepatan unduhan hingga 1 Mbps dan kecepatan unggahan hingga 0,5 Mbps setelah alokasi Kuota Prioritas Anda habis.
          </p>
          <button className="rounded-sm border-[1.5px] border-white bg-transparent px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black">
            PELAJARI SELENGKAPNYA
          </button>
        </div>

      </section>

      <section className="relative flex min-h-[90vh] w-full items-start justify-start px-8 py-32 md:px-16 lg:px-24">

        <div className="absolute inset-0 z-0 h-full w-full">
          <Image
            src="/space.webp"
            alt="Dirancang oleh NSC"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent md:w-2/3"></div>
        </div>

        <div className="relative z-10 mt-10 flex w-full max-w-lg flex-col items-start text-left">
          <h2 className="mb-6 text-4xl font-bold uppercase leading-tight tracking-tight text-white md:text-5xl">
            DIRANCANG OLEH NSC
          </h2>
          <p className="mb-8 text-base leading-relaxed text-gray-200 drop-shadow-md">
            Sebagai penyedia layanan peluncuran terkemuka di dunia—dan satu-satunya penyedia dengan roket orbital yang dapat digunakan kembali—NSC sangat berpengalaman dalam hal pesawat ruang angkasa dan operasi di orbit.
          </p>
          <button className="rounded-sm border-[1.5px] border-white bg-transparent px-8 py-3 text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black">
            PELAJARI SELENGKAPNYA
          </button>
        </div>
      </section>

      <div className="relative w-full bg-black [clip-path:inset(0)]">

        <div className="fixed right-0 top-0 z-0 h-full w-full md:w-1/2 pointer-events-none">
          <Image
            src="/particle2.webp"
            alt="Particle Effect 2"
            fill
            className="object-contain object-right"
          />
        </div>

        <section className="relative z-10 flex min-h-[90vh] w-full flex-col items-center justify-center bg-transparent px-8 py-24 text-center md:px-16 lg:px-24">
          <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center">

            <h2 className="mb-4 text-4xl font-bold uppercase leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              UJI COBA 30 HARI
            </h2>
            <p className="mb-12 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
              Jika tidak puas, Anda dapat mengembalikan NSC untuk mendapatkan pengembalian dana penuh.
            </p>

            <div className="flex w-full max-w-2xl flex-col gap-2 text-left">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                ALAMAT LAYANAN
              </label>

              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="KETIK DAN PILIH"
                    className="w-full border border-gray-600 bg-black/60 px-4 py-4 text-sm text-white outline-none transition-colors focus:border-white placeholder:text-gray-500 uppercase"
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
      </div>

      <Footer />
    </main>
  );
}