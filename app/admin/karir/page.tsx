"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, X, PackageOpen, Globe, Zap, Satellite, MonitorCheck, ShieldCheck, Cpu, Wifi, Upload } from "lucide-react";
import Swal from "sweetalert2";

const formatDateTime: Intl.DateTimeFormatOptions = {
  timeZone: "UTC",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false // Forces 24-hour format
}

// Data Type
interface JobType {
  typeId: number, typeName: string, description: string
}
interface Job {
  jobId: number, jobTitle: string, category: string, typeId: number, typeName: string,
  location: string,  jobDesc: string, qualifications: string[],
  createdBy: string, updatedBy: string, isPublished: number,
  createdAt: string, updatedAt: string,
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
      reloadData();
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

  const reloadData = async () => {
    const response = await fetch("/api/career/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const result = await response.json();
    if (result.success) {
      setProducts(result.result);
    }
  };

  const timeType = ["Full-time", "Part-time"];

  const [jobType, setJobType] = useState<JobType[]>([]);
  const [selJobType, setSelJobType] = useState<JobType | null>(null);
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [catModalType, setCatModalType] = useState<"add" | "edit">("add");

  const [products, setProducts] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
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

  const hndlSubmitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // === TAMBAH JOB ===
    if(prodModalType==="add") {

      const response = await fetch("/api/career/ins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobTitle: formData.get("job_title"), 
          category: formData.get("job_cat"), 
          typeId: formData.get("job_type_id"), 
          location: formData.get("location"),  
          jobDesc: formData.get("job_desc"),
          qualifications: specs,
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
            reloadData();
          });
      }
    }
    
    // === EDIT JOB ===
    if(prodModalType==="edit") {

      const response = await fetch("/api/career/upd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId: selectedJob?.jobId, 
          jobTitle: formData.get("job_title"), 
          category: formData.get("job_cat"), 
          typeId: formData.get("job_type_id"), 
          location: formData.get("location"),  
          jobDesc: formData.get("job_desc"),
          qualifications: specs,
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
            reloadData();
          });
      }
    }
    
    setIsProdModalOpen(false);

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


  const hndlDeleteData = async (jobId: number) => {
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
        const response = await fetch("/api/career/del", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({"jobId": jobId }),
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
            reloadData();
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
            <h1 className="text-3xl font-bold text-white mb-2">Karir</h1>
            <p className="text-sm font-medium text-gray-400">Pengaturan daftar kesempatan Karir yang ditampilkan pada web.</p>
          </div>
          <button 
            onClick={() => { 
              setProdModalType("add"); 
              setSelectedJob(null);
              setSpecs([""]);
              setSelectedIcon("Satellite");
              setImagePreview(null);
              setIsProdModalOpen(true); 
            }}
            className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-orange-400 transition-all active:scale-95 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
          >
            <Plus size={16} /> Tambah Karir
          </button>
        </div>

        <div className="w-full overflow-x-auto bg-black border border-white/10 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0a0a0a] border-b border-white/10 text-xs font-black uppercase tracking-widest text-gray-500">
                <th className="p-5 font-medium min-w-[250px]">Posisi Karir</th>
                <th className="p-5 font-medium">Kategori</th>
                <th className="p-5 font-medium">Tipe</th>
                <th className="p-5 font-medium">Lokasi</th>
                <th className="p-5 font-medium">Tgl Dibuat</th>
                <th className="p-5 font-medium text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-gray-300">
              {products.map((prod) => (
                <tr key={prod.jobId} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-5 text-white font-bold flex items-center gap-3">
                    <div>
                      <p>{prod.jobTitle}</p>
                      <p className="text-[10px] text-gray-500 font-normal mt-0.5 line-clamp-1 w-[500px]">{prod.jobDesc}</p>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-md bg-white/5 border border-white/10">
                      {prod.typeName}
                    </span>
                  </td>
                  <td className="p-5 w-[100px]">{prod.category}</td>
                  <td className="p-5">{prod.location}</td>
                  <td className="p-5 text-xs">
                    {(prod.createdAt) ? new Date(prod.createdAt).toLocaleDateString('UTC', formatDateTime) : 'N/A'}
                  </td>
                  <td className="p-5">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => { 
                          setProdModalType("edit");
                          setSelectedJob(prod);
                          setSpecs(prod?.qualifications);
                          // setSelectedIcon(prod.iconName);
                          // setImagePreview(prod.image);
                          setIsProdModalOpen(true); 
                        }}
                        className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                        onClick={() => { hndlDeleteData(prod.jobId)}}
                      >
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
                <h2 className="text-2xl font-bold text-white">{prodModalType === "add" ? "Tambah Karir" : "Edit Karir"}</h2>
                <button onClick={() => setIsProdModalOpen(false)} className="text-gray-500 hover:text-white"><X size={24} /></button>
              </div>

              {/* TODO (Backend): Integrasi POST/PUT Produk multipart/form-data untuk file gambar */}
              <form className="space-y-6" onSubmit={hndlSubmitData}>
                
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Posisi Karir</label>
                  <input type="text" name="job_title" 
                    defaultValue={selectedJob?.jobTitle}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500" 
                    placeholder="Posisi karir yang dibuka" 
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Kategori</label>
                    <select name="job_type_id"
                      defaultValue={selectedJob?.typeId}
                      className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500" 
                      required
                    >
                      <option value="">pilih kategori...</option>
                      {
                        jobType.map((cat) => (<option key={cat?.typeId} value={cat.typeId}>{cat.typeName}</option>)
                      )}
                    </select>
                  </div>
                  <div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Tipe</label>
                    <select name="job_cat"
                      defaultValue={selectedJob?.category}
                      className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500" 
                      required
                    >
                      {
                        timeType.map((typ, i) => (<option key={i} value={typ}>{typ}</option>)
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Lokasi</label>
                    <input type="text" name="location"
                      defaultValue={selectedJob?.location}
                      className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500" 
                      placeholder="Lokasi penempatan" 
                      required />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Deskripsi Pekerjaan</label>
                  <textarea 
                    rows={3} name="job_desc"
                    defaultValue={selectedJob?.jobDesc}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500" 
                    placeholder="Tulis deskripsi..." 
                    required
                  ></textarea>
                </div>

                {/* --- BAGIAN SPESIFIKASI TEKNIS DINAMIS --- */}
                <div className="p-4 rounded-xl border border-white/10 bg-[#0a0a0a]">
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-xs font-bold uppercase text-gray-400">Kualifikasi</label>
                    <button type="button" onClick={handleAddSpec} className="text-[10px] uppercase font-bold text-orange-500 flex items-center gap-1 hover:text-orange-400">
                      <Plus size={12} /> Tambah Kualifikasi
                    </button>
                  </div>
                  <div className="space-y-3">
                    {(specs?.length > 0) && specs.map((spec, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                        <input 
                          type="text" 
                          value={spec}
                          onChange={(e) => handleSpecChange(index, e.target.value)}
                          className="w-full bg-black border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-orange-500" 
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
                  Simpan
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