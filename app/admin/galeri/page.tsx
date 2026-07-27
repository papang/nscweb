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
interface GalleryGroup {
  groupId: number, groupName: string, description: string, ordNum: number
}
interface Gallery {
  galId: number, groupId: number, groupName: string, galTitle: string, galType: string, 
  srcUrl: string, thumbnailUrl: string, createdBy: string, updatedBy: string, createdAt: string, updatedAt: string
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

export default function KelolaGaleriPage() {

  useEffect(() => {
      reloadGroup();
      reloadData();
    }, []);

  const reloadGroup = async () => {
    const response = await fetch("/api/gallery/group/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const result = await response.json();
    if (result.success) {
      setGroups(result.result);
    }
  };

  const reloadData = async () => {
    const response = await fetch("/api/gallery/list", {
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

  const [groups, setGroups] = useState<GalleryGroup[]>([]);
  const [selGroup, setSelGroup] = useState<GalleryGroup | null>(null);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [groupModalType, setGroupModalType] = useState<"add" | "edit">("add");

  const [products, setProducts] = useState<Gallery[]>([]);
  const [isProdModalOpen, setIsProdModalOpen] = useState(false);
  const [prodModalType, setProdModalType] = useState<"add" | "edit">("add");
  const typegallery = ["video", "image"];
  
  // State Drag & Drop Gambar
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);


  const hndlSubmitGroup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // === TAMBAH KATEGORI ===
    if(groupModalType==="add") {

      let maxGroupId = 0;
      if(groups.length > 0)
        maxGroupId = Math.max(...groups.map(item => item.groupId));

      const response = await fetch("/api/gallery/group/ins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupId: (maxGroupId + 1), 
          groupName: formData.get("group_name"), 
          ordNum: formData.get("ord_num"), 
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
            reloadGroup();
          });
      }
    }
    
    // === EDIT KATEGORI ===
    if(groupModalType==="edit") {

      const response = await fetch("/api/gallery/group/upd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupId: selGroup?.groupId, 
          groupName: formData.get("group_name"), 
          ordNum: formData.get("ord_num"), 
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
            reloadGroup();
          });
      }
    }
    
    setIsGroupModalOpen(false);

  }

  const hndlDeleteGroup = async (groupId: number) => {
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
          const response = await fetch("/api/gallery/group/del", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({"groupId": groupId }),
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
              reloadGroup();
            });
          }
        }
      })
    
  }


  const hndlDeleteData = async (galId: number) => {
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
          const response = await fetch("/api/gallery/del", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({"galId": galId }),
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


  const hndlSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let bodysend = {}

    if(prodModalType==="add") {
    
      // if(chgFileUpload) {

      //   const resUpload = await uploadFileAction(formData);
      //   if (resUpload.success) {
      //     bodysend = {
      //       srcType: "IN", newsCatId: fieldNewsCatId, newsTitle: fieldNewsTitle, 
      //       authorBy: fieldAuthor, newsContent: fieldContent, createdBy: fieldAuthor, 
      //       imgUrl: resUpload.filepath, isPublished: fieldNewsStatus,
      //       isHeadline: fieldIsHeadline,
      //     };
      //   } 
      // } else {
        bodysend = {
          
        };
      // }
      

      const response = await fetch("/api/gallery/ins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodysend),
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

    if(prodModalType==="edit") {
            
      // if(chgFileUpload) {
        
      //   const resUpload = await uploadFileAction(formData);
      //   if (resUpload.success) {
          
      //     bodysend = {
      //       srcType: "IN", newsId:selectedNews?.newsId, newsCatId: fieldNewsCatId, newsTitle: fieldNewsTitle, 
      //       authorBy: fieldAuthor, newsContent: fieldContent, updatedBy: fieldAuthor, 
      //       imgUrl: resUpload.filepath, isPublished: fieldNewsStatus,
      //       isHeadline: fieldIsHeadline,
      //     };
      //   } 
      // } else {
        bodysend = {
          
        };
      // }

      const response = await fetch("/api/gallery/upd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodysend),
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


  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12">
      
      {/* ===================== SECTION KATEGORI ===================== */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Kelompok</h2>
            <p className="text-sm font-medium text-gray-400">Pengaturan kelompok Gallery pada etalase web.</p>
          </div>
          <button 
            onClick={() => { setGroupModalType("add"); setIsGroupModalOpen(true); setSelGroup(null); }}
            className="flex items-center gap-2 px-4 py-2 bg-[#111111] border border-white/10 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:border-orange-500 hover:text-orange-500 transition-all active:scale-95"
          >
            <Plus size={16} /> Tambah Kelompok
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {groups.map((gitem) => (
            <div key={gitem?.groupId} className="flex items-center gap-3 px-4 py-2 bg-[#0a0a0a] border border-white/30 rounded-xl hover:border-orange-500/70 cursor-pointer">
              
              <div className="flex items-center gap-1 border-l border-white/30 pl-3 cursor-pointer">
                <button 
                  onClick={() => { 
                    setSelGroup(gitem);
                    setGroupModalType("edit"); setIsGroupModalOpen(true); 
                  }}
                >
                  <span className="text-sm font-bold text-gray-300 pr-3 cursor-pointer">{gitem?.groupName}</span>
                  {/* <Edit2 size={14} /> */}
                </button>
                {gitem?.groupId > 5 && (
                  <button 
                    className="text-red-500 hover:text-orange-300 transition-colors" 
                    onClick={() => { setGroupModalType("edit"); hndlDeleteGroup(gitem?.groupId)}}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-white/5" />

      {/* ===================== SECTION GALLERY ===================== */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Galeri</h1>
            <p className="text-sm font-medium text-gray-400">Pengaturan Gallery yang ditampilkan pada etalase web.</p>
          </div>
          <button 
            onClick={() => { 
              setProdModalType("add"); 
              setImagePreview(null);
              setIsProdModalOpen(true); 
            }}
            className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-orange-400 transition-all active:scale-95 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
          >
            <Plus size={16} /> Tambah Galeri
          </button>
        </div>

        <div className="w-full overflow-x-auto bg-black border border-white/10 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0a0a0a] border-b border-white/10 text-xs font-black uppercase tracking-widest text-gray-500">
                <th className="p-5 font-medium min-w-[250px]">Deskripsi</th>
                <th className="p-5 font-medium">Kelompok</th>
                <th className="p-5 font-medium">Tipe</th>
                <th className="p-5 font-medium">Tgl Dibuat</th>
                <th className="p-5 font-medium text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-gray-300">
              {products.map((prod) => (
                <tr key={prod.galId} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-5 text-white font-bold flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center border border-orange-500/20">
                      <PackageOpen size={16} />
                    </div>
                    <div>
                      <p>{prod.galTitle}</p>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-md bg-white/5 border border-white/10">
                      {prod.groupName}
                    </span>
                  </td>
                  <td className="p-5">{prod.galType}</td>
                  <td className="p-5 text-xs">
                    {(prod.createdAt) ? new Date(prod.createdAt).toLocaleDateString('UTC', formatDateTime) : 'N/A'}
                  </td>
                  <td className="p-5">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => { 
                          setProdModalType("edit"); 
                          // setSelectedIcon(prod.iconName);
                          setImagePreview(prod.srcUrl);
                          setIsProdModalOpen(true); 
                        }}
                        className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                        onClick={() => { hndlDeleteData(prod.galId)}}
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
        {isGroupModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsGroupModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-sm bg-[#111111] border border-white/10 rounded-3xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">{groupModalType === "add" ? "Tambah Kelompok" : "Edit Kelompok"}</h2>
                <button onClick={() => setIsGroupModalOpen(false)} className="text-gray-500 hover:text-white"><X size={20} /></button>
              </div>
              {/* TODO (Backend): Integrasi API POST/PUT Kategori */}
              <form onSubmit={hndlSubmitGroup}>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Nama Kelompok</label>
                <input 
                  type="text" name="group_name"
                  defaultValue={selGroup?.groupName}
                  className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500" placeholder="group" 
                  required 
                />
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Urutan</label>
                <select 
                  name="ord_num"
                  className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500" 
                  defaultValue={selGroup?.ordNum}
                  required
                >
                  <option value={0}>--pilih urutan--</option>
                  {
                    [1,2,3,4,5,6,7,8,9,10].map((i) => (<option key={i} value={i}>{i}</option>)
                  )}
                </select>
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
                <h2 className="text-2xl font-bold text-white">{prodModalType === "add" ? "Tambah Galeri" : "Edit Galeri"}</h2>
                <button onClick={() => setIsProdModalOpen(false)} className="text-gray-500 hover:text-white"><X size={24} /></button>
              </div>

              {/* TODO (Backend): Integrasi POST/PUT Produk multipart/form-data untuk file gambar */}
              <form className="space-y-6" onSubmit={hndlSubmit}>
                
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Deskripsi</label>
                  <input type="text" 
                    name="gal_title"
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500" 
                    placeholder="Tulis deskripsi..." 
                    required></input>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Kelompok</label>
                    <select 
                      name="group_id"
                      className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500" 
                      required
                    >
                      <option value="">Pilih Kelompok...</option>
                      {
                        groups.map((group) => (<option key={group?.groupId} value={group.groupId}>{group.groupName}</option>)
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Tipe</label>
                    <select 
                      name="gal_type"
                      className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500" 
                      required
                    >
                      <option value="">Pilih Tipe...</option>
                      {
                        typegallery.map((tipe) => (<option key={tipe} value={tipe}>{tipe}</option>)
                      )}
                    </select>
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

                <button type="submit" className="w-full py-4 rounded-xl bg-orange-500 text-black text-xs font-black uppercase tracking-widest hover:bg-orange-400 transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                  Simpan Galeri
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