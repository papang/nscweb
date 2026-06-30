"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, ShieldCheck, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import provincesData from "@/data/provinces.json";
import regenciesData from "@/data/regencies.json";
import districtsData from "@/data/districts.json";
import villagesData from "@/data/villages.json";
import { sendmail_contact } from "../lib/sendmail_contact";
import Swal from "sweetalert2";
import { redirect } from "next/navigation";

const contactInfo = [
  {
    icon: <Phone size={20} />,
    title: "Telepon",
    detail: "+62 8138 9955 512",
    desc: "Senin - Jumat, 09:00 - 18:00",
  },
  {
    icon: <Mail size={20} />,
    title: "Email",
    detail: "sales@nsc.id",
    desc: "Kami balas dalam 24 jam",
  },
  {
    icon: <MapPin size={20} />,
    title: "Kantor Pusat",
    detail: "Jakarta Selatan, Indonesia",
    desc: "Grand Fatmawati Mas Blok I No 108, Jl. RS Fatmawati No 20, Cilandak",
  },
];

export default function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [streetAddr, setStreetAddr] = useState("");
  const [postalCode, setPostalCode] = useState("");
  
  const [prov, setProv] = useState("");
  const [city, setCity] = useState("");
  const [dist, setDist] = useState("");
  const [vill, setVill] = useState("");

  const [provName, setProvName] = useState("");
  const [cityName, setCityName] = useState("");
  const [distName, setDistName] = useState("");
  const [villName, setVillName] = useState("");

  // Filter logika
  // const provinces = provincesData;
  const cities = (regenciesData as any[]).filter((r) => r.province_id === prov);
  const districts = (districtsData as any[]).filter(
    (d) => d.regency_id === city
  );
  const villages = (villagesData as any[]).filter(
    (v) => v.district_id === dist
  );


  const hndlrKontak = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    
    const resEmail = await sendmail_contact({
        "name": firstName, 
        "email": email,
        "infos": {
          "name": firstName + " " + lastName,
          "email": email,
          "phoneNo": phoneNo,
          "address_street" : streetAddr,
          "address_district": (villName + ", " + distName + ", " + cityName + ", " + provName),
          "postal": postalCode,
        },
    });

    if(resEmail.success) {
      Swal.fire({
        title: "",
        text: "Terimakasih atas kepercayaan Anda. Tim kami akan segera menindaklanjuti.",
        icon: "success"
      });
      redirect("/hubungi-kami");
    }

  }

  return (
    <main className="relative flex min-h-screen w-full flex-col bg-black text-gray-200 selection:bg-orange-500/30 font-sans overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <Image
          src="/career-hero.webp"
          alt="Contact NSC"
          fill
          priority
          className="object-cover brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-[10px] md:text-[16px] font-black uppercase tracking-[0.5em] text-orange-500 opacity-80"
          >
            Get In Touch
          </motion.h4>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-4xl font-extrabold uppercase tracking-tighter md:text-6xl text-white"
          >
            Hubungi <span className="text-orange-500">Kami</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-gray-400 md:text-lg font-medium"
          >
            Siap untuk transformasi digital? Tim ahli kami siap membantu solusi
            konektivitas satelit untuk bisnis Anda.
          </motion.p>
        </div>
      </section>

      <div className="relative z-10 flex flex-col items-center px-6 py-12 md:px-12 lg:px-24">
        <div className="grid w-full max-w-7xl grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Left Side: Contact Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold uppercase tracking-tight text-white">
                Informasi Kontak
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">
                Punya pertanyaan spesifik tentang layanan Starlink atau
                integrasi infrastruktur? Jangan ragu untuk menghubungi kami
                melalui saluran berikut.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, idx) => (
                <div
                  key={idx}
                  className="group flex items-start gap-4 p-6 rounded-2xl border border-white/5 bg-[#111111] transition-all hover:bg-[#1a1a1a] hover:border-orange-500/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.1)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 group-hover:text-orange-500/80 transition-colors">
                      {info.title}
                    </h4>
                    <p className="text-lg font-bold text-white leading-tight mb-1 group-hover:text-orange-500 transition-colors">
                      {info.detail}
                    </p>
                    <p className="text-[11px] text-gray-500 font-medium">
                      {info.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badge */}
            <div className="p-6 rounded-2xl border border-orange-500/20 bg-orange-500/5 flex items-center gap-4">
              <ShieldCheck
                className="text-orange-500 flex-shrink-0"
                size={32}
              />
              <p className="text-[11px] text-gray-400 leading-tight font-medium">
                Data Anda aman bersama kami. Kami mematuhi standar privasi data
                global untuk memastikan kerahasiaan informasi Anda.
              </p>
            </div>
          </div>

          {/* Right Side: Advanced Contact Form */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative rounded-[32px] border border-white/10 bg-[#111111] p-8 md:p-12 shadow-2xl overflow-hidden"
            >
              {/* Decorative background glow */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />

              <form
                className="relative z-10 space-y-6"
                onSubmit={hndlrKontak}
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                      Nama Depan *
                    </label>
                    <input
                      type="text" required={true}
                      value={firstName} onChange={(e) => { setFirstName(e.target.value); }}
                      placeholder="Masukkan Nama Depan..."
                      className="w-full rounded-xl border border-white/5 bg-white/[0.03] py-4 px-5 text-sm text-white outline-none transition-all focus:border-orange-500 focus:bg-white/[0.08] placeholder:text-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                      Nama Belakang *
                    </label>
                    <input
                      type="text" required={true}
                      value={lastName} onChange={(e) => { setLastName(e.target.value); }}
                      placeholder="Masukkan Nama Belakang..."
                      className="w-full rounded-xl border border-white/5 bg-white/[0.03] py-4 px-5 text-sm text-white outline-none transition-all focus:border-orange-500 focus:bg-white/[0.08] placeholder:text-gray-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                        size={16}
                      />
                      <input
                        type="email" required={true}
                        value={email} onChange={(e) => { setEmail(e.target.value); }}
                        placeholder="Masukkan Email..."
                        className="w-full rounded-xl border border-white/5 bg-white/[0.03] py-4 pl-12 pr-5 text-sm text-white outline-none transition-all focus:border-orange-500 focus:bg-white/[0.08] placeholder:text-gray-600"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                      Nomor Handphone*
                    </label>
                    <div className="relative">
                      <Phone
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                        size={16}
                      />
                      <input
                        type="text" required={true}
                        value={phoneNo} onChange={(e) => { setPhoneNo(e.target.value); }}
                        placeholder="+62..."
                        className="w-full rounded-xl border border-white/5 bg-white/[0.03] py-4 pl-12 pr-5 text-sm text-white outline-none transition-all focus:border-orange-500 focus:bg-white/[0.08] placeholder:text-gray-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                    Alamat Lengkap *
                  </label>
                  <textarea
                    rows={3}  required={true}
                    value={streetAddr} onChange={(e) => { setStreetAddr(e.target.value); }}
                    placeholder="Masukkan Alamat Lengkap..."
                    className="w-full rounded-xl border border-white/5 bg-white/[0.03] py-4 px-5 text-sm text-white outline-none transition-all focus:border-orange-500 focus:bg-white/[0.08] placeholder:text-gray-600 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                      Provinsi *
                    </label>
                    <select
                      value={prov} required={true}
                      onChange={(e) => {
                        setProv(e.target.value);
                        setProvName(e.target.options[e.target.selectedIndex].text);
                        setCity("");
                        setDist("");
                        setVill("");
                      }}
                      className="w-full appearance-none rounded-xl border border-white/5 bg-white/[0.03] py-4 px-5 text-sm text-gray-400 outline-none transition-all focus:border-orange-500 focus:text-white cursor-pointer"
                    >
                      <option value="">Pilih Provinsi...</option>
                      {provincesData.map((p) => (
                        <option
                          key={p.id}
                          value={p.id}
                          className="bg-[#111111]"
                        >
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                      Kabupaten/Kota *
                    </label>
                    <select
                      value={city} required={true}
                      disabled={!prov}
                      onChange={(e) => {
                        setCity(e.target.value);
                        setCityName(e.target.options[e.target.selectedIndex].text);
                        setDist("");
                        setVill("");
                      }}
                      className="w-full appearance-none rounded-xl border border-white/5 bg-white/[0.03] py-4 px-5 text-sm text-gray-400 outline-none transition-all focus:border-orange-500 focus:text-white cursor-pointer disabled:opacity-50"
                    >
                      <option value="">Pilih Kota...</option>
                      {cities.map((c) => (
                        <option
                          key={c.id}
                          value={c.id}
                          className="bg-[#111111]"
                        >
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                      Kecamatan *
                    </label>
                    <select
                      value={dist} required={true}
                      disabled={!city}
                      onChange={(e) => {
                        setDist(e.target.value);
                        setDistName(e.target.options[e.target.selectedIndex].text);
                        setVill("");
                      }}
                      className="w-full appearance-none rounded-xl border border-white/5 bg-white/[0.03] py-4 px-5 text-sm text-gray-400 outline-none transition-all focus:border-orange-500 focus:text-white cursor-pointer disabled:opacity-50"
                    >
                      <option value="">Pilih Kecamatan...</option>
                      {districts.map((d) => (
                        <option
                          key={d.id}
                          value={d.id}
                          className="bg-[#111111]"
                        >
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                      Kelurahan/Desa *
                    </label>
                    <select
                      value={vill} required={true}
                      disabled={!dist}
                      onChange={(e) => {
                          setVill(e.target.value);
                          setVillName(e.target.options[e.target.selectedIndex].text);
                        }
                      }
                      className="w-full appearance-none rounded-xl border border-white/5 bg-white/[0.03] py-4 px-5 text-sm text-gray-400 outline-none transition-all focus:border-orange-500 focus:text-white cursor-pointer disabled:opacity-50"
                    >
                      <option value="">Pilih Kelurahan...</option>
                      {villages.map((v) => (
                        <option
                          key={v.id}
                          value={v.id}
                          className="bg-[#111111]"
                        >
                          {v.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                      Kode Pos
                    </label>
                    <input
                      type="text" maxLength={5}
                      value={postalCode} onChange={(e) => { setPostalCode(e.target.value); }}
                      placeholder="Kode Pos..."
                      className="w-full rounded-xl border border-white/5 bg-white/[0.03] py-4 px-5 text-sm text-white outline-none transition-all focus:border-orange-500 focus:bg-white/[0.08] placeholder:text-gray-600"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 py-2">
                  <input
                    type="checkbox" required={true}
                    id="agree"
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-orange-500 focus:ring-orange-500/50 cursor-pointer"
                  />
                  <label
                    htmlFor="agree"
                    className="text-xs text-gray-400 leading-normal font-medium cursor-pointer select-none"
                  >
                    Dengan menyetujui artinya Anda bersedia untuk mendapatkan
                    informasi terbaru tentang NSC dan kebijakan privasi kami.
                  </label>
                </div>

                <button className="group relative w-full overflow-hidden rounded-xl bg-orange-500 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-orange-400 active:scale-[0.98] shadow-[0_0_15px_rgba(249,115,22,0.3)] mt-2 "
                  type="submit"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Kirim Pesan Sekarang{" "}
                    <Send
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Global Presence */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="w-full rounded-[40px] border border-white/10 bg-[#111111] p-12 text-center backdrop-blur-md shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.05),transparent)] pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100" />
          <Globe
            className="mx-auto mb-6 text-orange-500 opacity-80 group-hover:scale-110 transition-transform duration-500"
            size={48}
          />
          <h2 className="mb-4 text-2xl font-bold uppercase tracking-tight text-white relative z-10">
            Konektivitas Tanpa Batas
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400 text-sm font-medium leading-relaxed relative z-10">
            NSC menghadirkan solusi satelit Starlink ke seluruh wilayah
            Indonesia. Di mana pun bisnis Anda berada, kami punya cara untuk
            menghubungkannya.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
