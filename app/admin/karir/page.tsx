"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, X, PackageOpen, Globe, Zap, Satellite, MonitorCheck, ShieldCheck, Cpu, Wifi, Upload } from "lucide-react";
import Swal from "sweetalert2";

// Data Type
interface JobType {
  typeId: number, typeName: string, description: string
}

// TODO (Backend): Fetch data produk dari API
const initialProducts = [
  {
    id: "connectivity-l2",
    name: "Akastar Connectivity: Layer 2",
    category: "Connectivity",
    price: "5.500.000",
    description: "Solusi interkoneksi privat berbasis satelit LEO...",
    mainFeatures: "Isolasi trafik end-to-end, transparansi protokol...",
    targetMarket: "Sektor finansial/perbankan, instansi militer...",
    image: "/darurat.webp",
    features: ["L2VPN Encapsulation", "Latensi ultra-rendah <40ms", "Bandwidth terkelola"],
    iconName: "Satellite",
  }
];

// Pilihan Icon sesuai dengan halaman User
const ICON_OPTIONS = [
  { name: "Satellite", component: <Satellite className="w-7 h-7" /> },
  { name: "Globe", component: <Globe className="w-7 h-7" /> },
  { name: "ShieldCheck", component: <ShieldCheck className="w-7 h-7" /> },
  { name: "MonitorCheck", component: <MonitorCheck className="w-7 h-7" /> },
  { name: "Wifi", component: <Wifi className="w-7 h-7" /> },
  { name: "Cpu", component: <Cpu className="w-7 h-7" /> },
  { name: "Zap", component: <Zap className="w-7 h-7" /> },
];

// Mapping Icon untuk preview di tabel
const ICON_MAP: Record<string, React.ReactNode> = {
  Satellite: <Satellite size={16} />,
  Globe: <Globe size={16} />,
  ShieldCheck: <ShieldCheck size={16} />,
  MonitorCheck: <MonitorCheck size={16} />,
  Wifi: <Wifi size={16} />,
  Cpu: <Cpu size={16} />,
  Zap: <Zap size={16} />,
};

export default function KelolaKarirPage() {

  useEffect(() => {
      reloadJobType();
    }, []);

  const reloadJobType = async () => {
    const response = await fetch("/api/career/type/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const result = await response.json();
    if (result.success) {
      setJobType(result.result);
    }
  };

  const [jobType, setJobType] = useState<JobType[]>([]);
  const [selJobType, setSelJobType] = useState<JobType | null>(null);
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [catModalType, setCatModalType] = useState<"add" | "edit">("add");

  const [products, setProducts] = useState(initialProducts);
  const [isProdModalOpen, setIsProdModalOpen] = useState(false);
  const [prodModalType, setProdModalType] = useState<"add" | "edit">("add");

  // State Form Dinamis
  const [specs, setSpecs] = useState<string[]>([""]);
  const [selectedIcon, setSelectedIcon] = useState<string>("Satellite");
  
  // State Drag & Drop Gambar
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Helper Spesifikasi Dinamis
  const handleAddSpec = () => setSpecs([...specs, ""]);
  const handleRemoveSpec = (index: number) => setSpecs(specs.filter((_, i) => i !== index));
  const handleSpecChange = (index: number, value: string) => {
    const newSpecs = [...specs];
    newSpecs[index] = value;
    setSpecs(newSpecs);
  };

  const hndlSubmitType = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // === TAMBAH TIPE JOB ===
    if(catModalType==="add") {

      let maxTypeId = 0;
      if(jobType.length > 0)
        maxTypeId = Math.max(...jobType.map(item => item.typeId));

      const response = await fetch("/api/career/type/ins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          typeId: (maxTypeId + 1), 
          typeName: formData.get("type_name"), 
        }),
      });

      const result = await response.json();
      if (result.success) {
          Swal.fire({
            title: "",
            text: "Data Anda telah berhasil diinput",
            icon: "success",
            background: "#111",
            color: "#fff",
            confirmButtonColor: "#f97316",
          }).then(() => {
            reloadJobType();
          });
      }
    }
    
    // === EDIT KATEGORI ===
    if(catModalType==="edit") {

      const response = await fetch("/api/career/type/upd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          typeId: selJobType?.typeId, 
          typeName: formData.get("type_name"), 
        }),
      });

      const result = await response.json();
      if (result.success) {
          Swal.fire({
            title: "",
            text: "Data Anda telah diperbarui",
            icon: "success",
            background: "#111",
            color: "#fff",
            confirmButtonColor: "#f97316",
          }).then(() => {
            reloadJobType();
          });
      }
    }
    
    setIsTypeModalOpen(false);

  }

  const hndlDeleteType = async (typeId: number) => {
      Swal.fire({
        title: "",
        text: "Anda yakin ingin menghapus?",
        icon: "question",
        background: "#111",
        color: "#fff",
        showCancelButton: true,
        confirmButtonColor: "#f97316",
        cancelButtonColor: "#523232",
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const response = await fetch("/api/career/type/del", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({"typeId": typeId }),
          });

          const resultw = await response.json();
          if (resultw.success) {
            Swal.fire({
              title: "",
              text: "Data Anda telah dihapus",
              icon: "success",
              background: "#111",
              color: "#fff",
              confirmButtonColor: "#f97316",
            }).then(() => {
              reloadJobType();
            });
          }
        }
      })
    
  }


  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12">
      
      {/* ===================== SECTION JOB TYPE ===================== */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Kategori Job</h2>
            <p className="text-sm font-medium text-gray-400">Pengaturan Kategori Job pada halaman Karir.</p>
          </div>
          <button 
            onClick={() => { setCatModalType("add"); setIsTypeModalOpen(true); setSelJobType(null); }}
            className="flex items-center gap-2 px-4 py-2 bg-[#111111] border border-white/10 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:border-orange-500 hover:text-orange-500 transition-all active:scale-95"
          >
            <Plus size={16} /> Tambah Kategori
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {jobType.map((pitem) => (
            <div key={pitem?.typeId} className="flex items-center gap-3 px-4 py-2 bg-[#0a0a0a] border border-white/30 rounded-xl hover:border-orange-500/70 cursor-pointer">
              
              <div className="flex items-center gap-1 border-l border-white/30 pl-3 cursor-pointer">
                <button 
                  onClick={() => { 
                    setSelJobType(pitem);
                    setCatModalType("edit"); setIsTypeModalOpen(true); 
                  }}
                >
                  <span className="text-sm font-bold text-gray-300 pr-3 cursor-pointer">{pitem?.typeName}</span>
                  {/* <Edit2 size={14} /> */}
                </button>
                <button 
                  className="text-red-500 hover:text-orange-300 transition-colors" 
                  onClick={() => { setCatModalType("edit"); hndlDeleteType(pitem?.typeId)}}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-white/5" />

      {/* ===================== SECTION KARIR ===================== */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Job</h1>
            <p className="text-sm font-medium text-gray-400">Pengaturan daftar Job yang ditampilkan pada web.</p>
          </div>
          <button 
            onClick={() => { 
              setProdModalType("add"); 
              setSpecs([""]);
              setSelectedIcon("Satellite");
              setImagePreview(null);
              setIsProdModalOpen(true); 
            }}
            className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-orange-400 transition-all active:scale-95 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
          >
            <Plus size={16} /> Tambah Job
          </button>
        </div>

        <div className="w-full overflow-x-auto bg-black border border-white/10 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0a0a0a] border-b border-white/10 text-xs font-black uppercase tracking-widest text-gray-500">
                <th className="p-5 font-medium min-w-[250px]">Produk</th>
                <th className="p-5 font-medium">Kategori</th>
                <th className="p-5 font-medium">Harga</th>
                <th className="p-5 font-medium text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-gray-300">
              {products.map((prod) => (
                <tr key={prod.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-5 text-white font-bold flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center border border-orange-500/20">
                      {ICON_MAP[prod.iconName] || <PackageOpen size={16} />}
                    </div>
                    <div>
                      <p>{prod.name}</p>
                      <p className="text-[10px] text-gray-500 font-normal mt-0.5 line-clamp-1">{prod.description}</p>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-md bg-white/5 border border-white/10">
                      {prod.category}
                    </span>
                  </td>
                  <td className="p-5">Rp {prod.price}</td>
                  <td className="p-5">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => { 
                          setProdModalType("edit"); 
                          setSpecs(prod.features);
                          setSelectedIcon(prod.iconName);
                          setImagePreview(prod.image);
                          setIsProdModalOpen(true); 
                        }}
                        className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>



      {/* ===================== MODAL KATEGORI ===================== */}
      <AnimatePresence>
        {isTypeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsTypeModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-sm bg-[#111111] border border-white/10 rounded-3xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">{catModalType === "add" ? "Tambah Kategori" : "Edit Kategori"}</h2>
                <button onClick={() => setIsTypeModalOpen(false)} className="text-gray-500 hover:text-white"><X size={20} /></button>
              </div>
              {/* TODO (Backend): Integrasi API POST/PUT Kategori */}
              <form onSubmit={hndlSubmitType}>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Kategori Job</label>
                <input 
                  type="text" name="type_name"
                  defaultValue={selJobType?.typeName}
                  className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500" placeholder="" 
                  required 
                />
                <button type="submit" className="w-full mt-6 py-3 rounded-xl bg-orange-500 text-black text-xs font-black uppercase tracking-widest hover:bg-orange-400 transition-all">Simpan</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===================== MODAL PRODUK ===================== */}
      <AnimatePresence>
        {isProdModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsProdModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-[#111111] border border-white/10 rounded-3xl p-8">
              <div className="flex justify-between items-center mb-6 sticky top-0 bg-[#111111] z-10 py-2 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white">{prodModalType === "add" ? "Tambah Produk" : "Edit Produk"}</h2>
                <button onClick={() => setIsProdModalOpen(false)} className="text-gray-500 hover:text-white"><X size={24} /></button>
              </div>

              {/* TODO (Backend): Integrasi POST/PUT Produk multipart/form-data untuk file gambar */}
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsProdModalOpen(false); }}>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Nama Produk</label>
                    <input type="text" className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500" placeholder="Misal: Akastar Secure" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Kategori</label>
                    <select className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500" required>
                      <option value="">Pilih Kategori...</option>
                      {
                        jobType.map((cat) => (<option key={cat?.typeId} value={cat.typeId}>{cat.typeName}</option>)
                      )}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Pilih Icon</label>
                    <div className="flex flex-wrap gap-2">
                      {ICON_OPTIONS.map((iconOpt) => (
                        <button
                          key={iconOpt.name}
                          type="button"
                          onClick={() => setSelectedIcon(iconOpt.name)}
                          className={`p-3 rounded-xl border flex items-center justify-center transition-all 
                            ${selectedIcon === iconOpt.name 
                              ? "bg-orange-500/10 border-orange-500 text-orange-500" 
                              : "bg-black border-white/10 text-gray-500 hover:border-orange-500/50 hover:text-orange-500"}`}
                        >
                          {iconOpt.component}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Harga (Rp)</label>
                    <input type="text" className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500" placeholder="Misal: 5.500.000" required />
                  </div>
                </div>

                {/* --- DRAG & DROP IMAGE UPLOAD --- */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Gambar Produk (PNG, JPG, JPEG)</label>
                  <div 
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      const file = e.dataTransfer.files[0];
                      // TODO (Backend): Simpan `file` ke state untuk dikirim ke API via FormData
                      if (file && file.type.startsWith("image/")) {
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }}
                    className={`relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl transition-all overflow-hidden bg-black
                      ${isDragging ? 'border-orange-500 bg-orange-500/10' : 'border-white/10 hover:border-orange-500/50 cursor-pointer'}`}
                  >
                    {/* Input file disembunyikan tapi bisa di-klik di seluruh area div */}
                    <input 
                      type="file" 
                      accept="image/png, image/jpeg, image/jpg" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        // TODO (Backend): Simpan `file` ke state
                        if (file) setImagePreview(URL.createObjectURL(file));
                      }}
                    />
                    
                    {imagePreview ? (
                      <>
                        <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                          <span className="px-4 py-2 bg-black/80 rounded-lg text-xs font-bold text-white border border-white/20 pointer-events-none">
                            Klik / Drag untuk Upload Gambar
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center text-gray-500 pointer-events-none">
                        <Upload size={32} className="mb-3 text-gray-400" />
                        <span className="text-sm font-bold text-gray-300">Drag & Drop file ke sini</span>
                        <span className="text-xs font-medium mt-1">atau klik untuk upload (PNG / JPG)</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Deskripsi Produk</label>
                  <textarea rows={3} className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500" placeholder="Tulis deskripsi..." required></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Fitur Utama</label>
                    <textarea rows={3} className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500" placeholder="Pisahkan dengan koma atau deskripsikan..." required></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Ideal Untuk</label>
                    <textarea rows={3} className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500" placeholder="Sektor industri, dll..." required></textarea>
                  </div>
                </div>

                {/* --- BAGIAN SPESIFIKASI TEKNIS DINAMIS --- */}
                <div className="p-4 rounded-xl border border-white/10 bg-[#0a0a0a]">
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-xs font-bold uppercase text-gray-400">Spesifikasi Teknis</label>
                    <button type="button" onClick={handleAddSpec} className="text-[10px] uppercase font-bold text-orange-500 flex items-center gap-1 hover:text-orange-400">
                      <Plus size={12} /> Tambah Spesifikasi
                    </button>
                  </div>
                  <div className="space-y-3">
                    {specs.map((spec, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                        <input 
                          type="text" 
                          value={spec}
                          onChange={(e) => handleSpecChange(index, e.target.value)}
                          className="w-full bg-black border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-orange-500" 
                          placeholder={`Spesifikasi ${index + 1}...`} 
                          required 
                        />
                        {specs.length > 1 && (
                          <button type="button" onClick={() => handleRemoveSpec(index)} className="text-red-500 hover:text-red-400 p-2">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <button type="submit" className="w-full py-4 rounded-xl bg-orange-500 text-black text-xs font-black uppercase tracking-widest hover:bg-orange-400 transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                  Simpan Produk
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(249, 115, 22, 0.5); border-radius: 10px; }
      `}</style>
    </div>
  );
}