"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  MapPin,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CreditCard } from "lucide-react";
import { Receipt } from "lucide-react";

export default function NewFormPage() {
  const [formData, setFormData] = useState({
    customerType: "perorangan",
    serviceType: "akastarnet",
    idType: "ktp",
  });
  const [ownership, setOwnership] = useState("milik");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedCard, setSelectedCard] = useState("");

  return (
    <main className="min-h-screen bg-black text-gray-200 selection:bg-orange-500/30">
      <Navbar />

      <div className="container mx-auto px-6 pt-32 pb-24 lg:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors mb-6 text-sm font-bold"
        >
          <ArrowLeft size={16} /> Kembali
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Header */}
          <div className="mb-8 space-y-1">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              FORMULIR BERLANGGANAN / SUBSCRIPTION FORM
            </h1>

            <p className="text-gray-400 text-sm">
              Harap isi detail di bawah ini dengan lengkap dan benar. /
              <span className="italic">
                {" "}
                Please fill in the details below completely and correctly.
              </span>
            </p>

            <p className="text-gray-400 text-sm">
              Isi dengan huruf cetak /{" "}
              <span className="italic">Fill in with capital letters.</span>
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-[#111111] border border-white/10 rounded-[24px] p-6 md:p-8 shadow-2xl space-y-8">
            {/* Bagian Jenis Layanan */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-6">
              <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                <ClipboardList size={20} />
              </div>
              <h2 className="text-xl font-bold text-white uppercase">
                Jenis Layanan / Service Type
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Jenis Pelanggan */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase text-gray-400">
                  Jenis Pelanggan / Customer Type
                </label>
                <select className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all appearance-none cursor-pointer">
                  <option
                    className="bg-[#1a1a1a] text-white py-2"
                    value="perorangan"
                  >
                    Perorangan (Personal)
                  </option>
                  <option
                    className="bg-[#1a1a1a] text-white py-2"
                    value="perusahaan"
                  >
                    Perusahaan (Corporate/Business)
                  </option>
                </select>
              </div>

              {/* Jenis Layanan */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase text-gray-400">
                  JENIS LAYANAN / SERVICE TYPE
                </label>
                <select className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all appearance-none cursor-pointer">
                  <option
                    className="bg-[#1a1a1a] text-white py-2"
                    value="akastarnet"
                  >
                    Akastarnet
                  </option>
                  <option
                    className="bg-[#1a1a1a] text-white py-2"
                    value="akastarlink"
                  >
                    Akastarlink
                  </option>
                  <option
                    className="bg-[#1a1a1a] text-white py-2"
                    value="lainnya"
                  >
                    Lainnya
                  </option>
                </select>
              </div>
            </div>

            {/* Bagian Data Diri & Identitas */}
            <div className="flex items-center gap-3 border-b border-white/10 pt-4 pb-6">
              <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                <User size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">
                PELANGGAN PERUSAHAAN / CORPORATE CUSTOMER
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nama Lengkap */}
              <input
                type="text"
                placeholder="Nama / Name"
                className="col-span-1 md:col-span-2 w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-orange-500 outline-none"
              />

              {/* Tempat & Tanggal Lahir */}
              <div className="grid grid-cols-2 gap-4">
                {/* Tempat Lahir */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400">
                    Tempat Lahir / Place
                  </label>
                  <input
                    type="text"
                    placeholder="TEMPAT LAHIR"
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-orange-500 outline-none uppercase"
                  />
                </div>

                {/* Tanggal Lahir */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400">
                    Tanggal Lahir / Date of Birth
                  </label>
                  <input
                    type="date"
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-orange-500 outline-none [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Jenis Kelamin */}
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] uppercase text-gray-400 font-bold">
                  Gender
                </label>
                <div className="flex gap-6 pt-1">
                  <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="pria"
                      className="accent-orange-500"
                    />{" "}
                    Pria
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="wanita"
                      className="accent-orange-500"
                    />{" "}
                    Wanita
                  </label>
                </div>
              </div>

              {/* Telepon */}
              <input
                type="tel"
                placeholder="Telepon Seluler / Cellular Phone"
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-orange-500 outline-none"
              />
              {/* Telepon PSTN dengan Kode Area */}
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="tel"
                  placeholder="Kode Area"
                  className="col-span-1 w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-orange-500 outline-none"
                />
                <input
                  type="tel"
                  placeholder="Telepon PSTN / Phone PSTN"
                  className="col-span-2 w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-orange-500 outline-none"
                />
              </div>

              {/* Identitas */}
              <select className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-orange-500 outline-none">
                <option value="ktp">KTP</option>
                <option value="sim">SIM</option>
                <option value="paspor">Paspor</option>
                <option value="lainnya">Lainnya</option>
              </select>
              <input
                type="text"
                placeholder="Kartu Identitas / ID Card"
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-orange-500 outline-none"
              />

              {/* Masa Berlaku */}
              <div className="flex items-center gap-4 bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3">
                <div className="flex items-center gap-3 bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 focus-within:border-orange-500 transition-colors">
                  <input
                    type="date"
                    className="flex-1 bg-transparent text-sm text-white focus:outline-none [color-scheme:dark]"
                  />
                </div>
                <label className="flex items-center gap-2 text-xs text-gray-400 whitespace-nowrap">
                  <input type="checkbox" className="accent-orange-500" /> Seumur
                  Hidup
                </label>
              </div>

              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-orange-500 outline-none"
              />

              {/* Alamat Sesuai Identitas */}
              <textarea
                placeholder="Alamat Sesuai Identitas"
                className="col-span-1 md:col-span-2 w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-orange-500 outline-none"
                rows={2}
              ></textarea>
            </div>

            {/* Bagian Alamat Instalasi */}
            <div className="flex items-center gap-3 border-b border-white/10 pt-4 pb-6">
              <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                <MapPin size={20} />
              </div>
              <h2 className="text-xl font-bold text-white uppercase">
                Alamat Instalasi / Address of Installation
              </h2>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nama Perumahan/Apartemen/Gedung / House/Apartement/Building Name"
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
              />
              <textarea
                rows={2}
                placeholder="Alamat Instalasi / Address of Installation"
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
              ></textarea>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Kota / City"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none"
                />
                <input
                  type="text"
                  placeholder="Provinsi / Province"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none"
                />
                <input
                  type="text"
                  placeholder="Kode Pos / Postal Code"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none"
                />
              </div>

              {/* Status Kepemilikan & Agen */}
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-gray-400">
                    Status Kepemilikan
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex items-center gap-2 text-sm bg-[#1a1a1a] p-3 rounded-xl border border-white/10 cursor-pointer">
                      <input
                        type="radio"
                        name="own"
                        value="milik"
                        onChange={(e) => setOwnership(e.target.value)}
                        className="accent-orange-500"
                      />{" "}
                      Milik / Owner
                    </label>
                    <label className="flex items-center gap-2 text-sm bg-[#1a1a1a] p-3 rounded-xl border border-white/10 cursor-pointer">
                      <input
                        type="radio"
                        name="own"
                        value="sewa"
                        onChange={(e) => setOwnership(e.target.value)}
                        className="accent-orange-500"
                      />{" "}
                      Sewa / Rent
                    </label>
                    <label className="flex items-center gap-2 text-sm bg-[#1a1a1a] p-3 rounded-xl border border-white/10 cursor-pointer">
                      <input
                        type="radio"
                        name="own"
                        value="agent"
                        onChange={(e) => setOwnership(e.target.value)}
                        className="accent-orange-500"
                      />{" "}
                      Agen Properti / Property Agent
                    </label>
                  </div>
                </div>

                {/* Input Sisa Periode Sewa hanya muncul jika status adalah 'sewa' */}
                {ownership === "sewa" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="grid grid-cols-1 gap-4"
                  >
                    <input
                      type="number"
                      placeholder="Sisa Periode Sewa (Bulan)"
                      className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
                    />
                  </motion.div>
                )}
              </div>

              {/* Jangka Waktu & Jadwal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-gray-400">
                    Jangka Waktu Berlangganan / Terms of Subscription
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-20 bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none"
                    />
                    <select className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none">
                      <option value="bulan">Bulan / Month</option>
                      <option value="tahun">Tahun / Year</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-gray-400">
                    Tanggal Instalasi /{" "}
                    <span className="italic">Installation Date</span>
                  </label>

                  {/* Kontainer dengan border agar ikon selalu terlihat */}
                  <div className="flex items-center gap-3 bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 focus-within:border-orange-500 transition-colors">
                    <input
                      type="date"
                      className="flex-1 bg-transparent text-sm text-white outline-none [color-scheme:dark]"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-[10px] font-bold uppercase text-gray-400">
                  Waktu Instalasi / Installation Time
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="accent-orange-500" />{" "}
                    09:00 - 13:00
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="accent-orange-500" />{" "}
                    13:00 - 20:00
                  </label>
                </div>
              </div>

              {/* Bagian Penanggung Jawab Pembayaran */}
              <div className="flex items-center gap-3 border-b border-white/10 pt-8 pb-6">
                <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                  <CreditCard size={20} />
                </div>
                <h2 className="text-xl font-bold text-white uppercase">
                  Penanggung Jawab Pembayaran
                </h2>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nama / Name"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
                />
                <input
                  type="text"
                  placeholder="Alamat Tagihan / Billing Address"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
                />
                <input
                  type="tel"
                  placeholder="Telepon / Phone"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
                />

                {/* Metode Pembayaran */}
                <div className="pt-2">
                  <label className="text-[10px] font-bold uppercase text-gray-400 block mb-2">
                    Cara Pembayaran / Payment method
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label
                      className={`flex items-center gap-2 text-sm p-3 rounded-xl border cursor-pointer ${
                        paymentMethod === "transfer"
                          ? "bg-orange-500/10 border-orange-500"
                          : "bg-[#1a1a1a] border-white/10"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="transfer"
                        className="accent-orange-500"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      Transfer
                    </label>
                    <label
                      className={`flex items-center gap-2 text-sm p-3 rounded-xl border cursor-pointer ${
                        paymentMethod === "kartu"
                          ? "bg-orange-500/10 border-orange-500"
                          : "bg-[#1a1a1a] border-white/10"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="kartu"
                        className="accent-orange-500"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      Kartu Kredit / Credit Card
                    </label>
                  </div>
                </div>

                {/* Input Tambahan hanya muncul jika metode Kartu Kredit dipilih */}
                {paymentMethod === "kartu" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-4 mt-4 p-4 bg-[#222] rounded-xl border border-white/5"
                  >
                    <input
                      type="text"
                      placeholder="Atas Nama / Cardholder Name"
                      className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
                    />

                    <input
                      type="text"
                      placeholder="No. Kartu Identitas / ID Card Number"
                      className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
                    />

                    <input
                      type="text"
                      placeholder="Nomor Kartu Kredit / Credit Card Number"
                      className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
                    />

                    {/* Jenis Kartu sebagai Checkbox Group */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-gray-400">
                        Jenis Kartu / Card Type
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {["VISA", "MASTER", "AMEX", "JCB"].map((card) => (
                          <label
                            key={card}
                            className={`flex items-center justify-center text-xs p-2 rounded-lg border cursor-pointer ${
                              selectedCard === card
                                ? "bg-orange-500 text-white border-orange-500"
                                : "bg-[#1a1a1a] border-white/10 text-gray-400"
                            }`}
                          >
                            <input
                              type="radio"
                              name="cardType"
                              value={card}
                              className="hidden"
                              onChange={() => setSelectedCard(card)}
                            />
                            {card}
                          </label>
                        ))}
                      </div>
                    </div>

                    <input
                      type="text"
                      placeholder="Masa Berlaku / Expiry Date (MM/YY)"
                      className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
                    />
                  </motion.div>
                )}
              </div>

              {/* Bagian Biaya / Charges */}
              <div className="flex items-center gap-3 border-b border-white/10 pt-8 pb-6">
                <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                  <Receipt size={20} />
                </div>
                <h2 className="text-xl font-bold text-white">
                  Biaya / Charges
                </h2>
              </div>

              <div className="space-y-4 pt-4">
                {/* Biaya Fee dengan Opsi Bulan/Sekali Bayar */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-gray-400">
                    Biaya Fee
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm text-white">
                      <input
                        type="radio"
                        name="feeType"
                        className="accent-orange-500"
                      />{" "}
                      Bulan / Month
                    </label>
                    <label className="flex items-center gap-2 text-sm text-white">
                      <input
                        type="radio"
                        name="feeType"
                        className="accent-orange-500"
                      />{" "}
                      Sekali Bayar / One Time Payment
                    </label>
                    <input
                      type="text"
                      placeholder="Nominal"
                      className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Input List Biaya Lainnya */}
                {[
                  {
                    label: "Biaya Lainnya / Others Charge",
                    placeholder: "Others Charge",
                  },
                  {
                    label: "Instalasi / Installation",
                    placeholder: "Installation",
                  },
                  {
                    label: "Pengiriman / Delivery",
                    placeholder: "Delivery Fee",
                  },
                  {
                    label: "Sewa Perangkat / Device Rental",
                    placeholder: "Device Rental",
                  },
                  { label: "Lainnya / Others", placeholder: "Others" },
                  { label: "Sub Total", placeholder: "Sub Total" },
                  { label: "TAX/VAT", placeholder: "TAX/VAT" },
                  { label: "Total", placeholder: "Total Amount" },
                  {
                    label: "Masa Berlaku / Validity",
                    placeholder: "Validity Period",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-4 items-center gap-4"
                  >
                    <label className="text-sm text-gray-300 font-medium md:col-span-1">
                      {item.label}
                    </label>
                    <input
                      type="text"
                      placeholder={item.placeholder}
                      className="md:col-span-3 w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-orange-500"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-6">
                {/* Daftar Persyaratan */}
                <div className="space-y-2">
                  <ul className="text-sm text-gray-400 space-y-1 list-disc pl-4">
                    <li>
                      Fotokopi Kartu Identitas /{" "}
                      <span className="italic">Copy ID Card</span>
                    </li>
                    <li>
                      Materai / <span className="italic">Duty Stamp</span>
                    </li>
                    <li>
                      Fotokopi NPWP /{" "}
                      <span className="italic">
                        Copy of Tax Registered Number (for Corporate)
                      </span>
                    </li>
                    <li>Lainnya</li>
                  </ul>
                </div>

                {/* Form Diisi Oleh */}
                <div className="p-4 border border-white/10 rounded-xl bg-[#222]">
                  <p className="text-[10px] font-bold uppercase text-gray-400 mb-4">
                    Diisi oleh / <span className="italic">Filled by</span>
                  </p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <label className="text-sm text-white">
                        Tanda Tangan / <span className="italic">Signature</span>
                      </label>
                      <input
                        type="text"
                        className="md:col-span-3 bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <label className="text-sm text-white">Sales Person</label>
                      <input
                        type="text"
                        className="md:col-span-3 bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <label className="text-sm text-white">
                        Tanggal / <span className="italic">Date</span>
                      </label>

                      <div className="md:col-span-3 flex items-center gap-3 bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 focus-within:border-orange-500 transition-colors">
                        <input
                          type="date"
                          className="flex-1 bg-transparent text-sm text-white outline-none [color-scheme:dark]"
                        />
                      </div>
                    </div>

                    {/* Checkbox Pelanggan Baru */}
                    <div className="pt-2 border-t border-white/5 mt-2 space-y-4">
                      <p className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded inline-block mb-2">
                        HANYA UNTUK PELANGGAN BARU
                      </p>

                      {/* Upload KTP/Paspor */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-gray-400">
                          Upload KTP/Paspor
                        </label>
                        <div className="border-2 border-dashed border-white/10 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-colors bg-[#1a1a1a]">
                          <input
                            type="file"
                            className="hidden"
                            id="upload-ktp"
                          />
                          <label
                            htmlFor="upload-ktp"
                            className="text-sm text-gray-400 cursor-pointer"
                          >
                            Upload KTP/Paspor
                          </label>
                        </div>
                      </div>

                      {/* Upload NPWP */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-gray-400">
                          Upload NPWP
                        </label>
                        <div className="border-2 border-dashed border-white/10 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-colors bg-[#1a1a1a]">
                          <input
                            type="file"
                            className="hidden"
                            id="upload-npwp"
                          />
                          <label
                            htmlFor="upload-npwp"
                            className="text-sm text-gray-400 cursor-pointer"
                          >
                            Klik untuk pilih file NPWP
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Catatan / Notes */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-gray-400">
                    Catatan / <span className="italic">Notes</span>
                  </label>
                  <textarea
                    rows={3}
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none"
                  ></textarea>
                </div>
              </div>

              {/* Disclaimer & Persetujuan */}
              <div className="mt-8 space-y-4">
                <hr className="border-white/10" />

                {/* Pernyataan Kebenaran Data */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" className="mt-1 accent-orange-500" />
                  <div className="space-y-3">
                    <p className="text-[10px] text-white leading-relaxed">
                      Dengan ini kami menyatakan bahwa data-data dan informasi
                      yang kami berikan di atas adalah benar adanya. Kami telah
                      membaca dan memahami ketentuan-ketentuan dan Syarat-syarat
                      Berlangganan ini, berikut lampiran-lampirannya yang
                      merupakan satu kesatuan yang tak terpisah dengan Formulir
                      Berlangganan ini. Dengan menandatangani Formulir
                      Berlangganan ini maka dengan ini pula kami menyatakan
                      menerima dan menyetujui pemberlakukan Ketentuan-ketentuan
                      dan Syarat-syarat Berlangganan Layanan ini dimaksud tanpa
                      kecuali.
                    </p>
                    <div className="my-3 border-t border-white/20"></div>
                    <p className="text-[10px] text-white leading-relaxed italic">
                      We hereby declare that the data and information provided
                      above are true. We have read and understood the terms and
                      conditions of this Subscription, including its attachments
                      which are an inseparable part of this Subscription Form.
                      By signing this Subscription Form, we hereby declare to
                      accept and agree to the enforcement of the terms and
                      conditions of this Service Subscription without exception.
                    </p>
                  </div>
                </label>

                {/* Otorisasi Debet Kartu Kredit */}
                <label className="flex items-start gap-3 cursor-pointer group pt-4">
                  <input type="checkbox" className="mt-1 accent-orange-500" />
                  <div className="space-y-3">
                    <p className="text-[10px] text-white italic leading-relaxed">
                      Dengan ini memberikan kuasa kepada NSC untuk melakukan
                      pendebetan Kartu Kredit. Jika terjadi kegagalan pada saat
                      proses pendebetan, saya setuju terhadap benefit promo yang
                      saya ikuti akan hilang dan akan tetap melakukan pembayaran
                      dengan metode pembayaran lainnya.
                    </p>
                    <div className="my-3 border-t border-white/20"></div>
                    <p className="text-[10px] text-white italic leading-relaxed">
                      I hereby authorize NSC to debit my Credit Card in the
                      amount of the bill listed on the monthly bill, if any
                      failure during the credit card debiting process. I agree
                      that the promo benefits that I participated in will be
                      lost and will continue to make payments with other payment
                      methods.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-full flex items-center justify-center gap-2 py-4 bg-orange-500 text-black font-black uppercase tracking-[0.2em] rounded-xl hover:bg-orange-400 transition-all">
              <ShieldCheck size={18} /> Kirim Formulir
            </button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
