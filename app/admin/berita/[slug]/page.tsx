"use client";

import { useEffect, useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, X, FileText, Upload, Link as LinkIcon, Globe, Rss } from "lucide-react";
import Swal from "sweetalert2";
import { uploadFileAction } from "@/app/lib/upload_file";
import Image from "next/image";
import {News, Category } from "@/app/lib/structNews";

const formatDateTime: Intl.DateTimeFormatOptions = {
  timeZone: "UTC",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false // Forces 24-hour format
}

export default function KelolaBeritaPage({ params, }: { params: Promise<{ slug: string }>}) {

  const { slug } = use(params);

  useEffect(() => {
    if(slug=='insight') {
      setNewsType('in');
      setTitleMenu("Berita (Insight)");
      setTitleDescription("Berita yang dimuat dan di-publish oleh internal NSC");
    } else {
      setNewsType('ex');
      setTitleMenu("Berita Eksternal");
      setTitleDescription("Berita pilihan dari berbagai sumber eksternal");
    }

    reloadCategory();
    reloadNews();
  }, []);

  const reloadCategory = async () => {
    const response = await fetch("/api/news/cat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const result = await response.json();
    if (result.success) {
      setCategory(result.result);
    }
  };

  const reloadNews = async () => {
    let bodysend = {}
    if (slug=='insight') {
      bodysend = { srcType: "IN" }
    } else {
      bodysend = { srcType: "EX" }
    }
    const response = await fetch("/api/news/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodysend),
    });

    const result = await response.json();
    if (result.success) {
      setNews(result.result);
    }
  };


  const hndlSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // ==== BERITA INSIGHT =====
    if(newsType==="in") {

      // === TAMBAH BERITA ===
      if(modalType==="add") {

        let bodysend = {}
        if(chgFileUpload) {

          const resUpload = await uploadFileAction(formData);
          if (resUpload.success) {
            bodysend = {
              srcType: "IN", newsCatId: fieldNewsCatId, newsTitle: fieldNewsTitle, 
              authorBy: fieldAuthor, newsContent: fieldContent, createdBy: fieldAuthor, 
              imgUrl: resUpload.filepath, isPublished: fieldNewsStatus,
              isHeadline: fieldIsHeadline,
            };
          } 
        } else {
          bodysend = {
            srcType: "IN", newsCatId: fieldNewsCatId, newsTitle: fieldNewsTitle, 
            authorBy: fieldAuthor, newsContent: fieldContent, createdBy: fieldAuthor, 
            isPublished: fieldNewsStatus,
            isHeadline: fieldIsHeadline,
          };
        }
        

        const response = await fetch("/api/news/ins", {
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
              reloadNews();
            });
        }
      }
      
      // === EDIT BERITA ===
      if(modalType==="edit") {
        
        let bodysend = {}
        if(chgFileUpload) {
          
          const resUpload = await uploadFileAction(formData);
          if (resUpload.success) {
            
            bodysend = {
              srcType: "IN", newsId:selectedNews?.newsId, newsCatId: fieldNewsCatId, newsTitle: fieldNewsTitle, 
              authorBy: fieldAuthor, newsContent: fieldContent, updatedBy: fieldAuthor, 
              imgUrl: resUpload.filepath, isPublished: fieldNewsStatus,
              isHeadline: fieldIsHeadline,
            };
          } 
        } else {
          bodysend = {
            srcType: "IN", newsId:selectedNews?.newsId, newsCatId: fieldNewsCatId, newsTitle: fieldNewsTitle, 
            authorBy: fieldAuthor, newsContent: fieldContent, updatedBy: fieldAuthor, 
            isPublished: fieldNewsStatus,
            isHeadline: fieldIsHeadline,
          };
        }

        const response = await fetch("/api/news/upd", {
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
              reloadNews();
            });
        }
      }
      
      setIsModalOpen(false);


    // ====== FEED NEWS ====== //
    } else {

      // === TAMBAH BERITA FEED ===
      if(modalType==="add") {

        let bodysend = {}
        if(chgFileUpload) {

          const resUpload = await uploadFileAction(formData);
          if (resUpload.success) {
            bodysend = {
              srcType: "EX", newsTitle: fieldNewsTitle, newsContent: fieldContent, 
              srcNews: fieldSrcNews, srcUrl: fieldSrcUrl, createdBy: "admin", 
              imgUrl: resUpload.filepath, isPublished: fieldNewsStatus,
            };
          } 
        } else {
          bodysend = {
            srcType: "EX", newsTitle: fieldNewsTitle, newsContent: fieldContent, 
            srcNews: fieldSrcNews, srcUrl: fieldSrcUrl, createdBy: "admin", 
            isPublished: fieldNewsStatus,
          };
        }
        

        const response = await fetch("/api/news/ins", {
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
              reloadNews();
            });
        }
      }
      
      // === EDIT BERITA FEED ===
      if(modalType==="edit") {
        
        let bodysend = {}
        if(chgFileUpload) {
          
          const resUpload = await uploadFileAction(formData);
          if (resUpload.success) {
            bodysend = {
              srcType: "EX", newsId:selectedNews?.newsId, newsTitle: fieldNewsTitle, newsContent: fieldContent, 
              srcNews: fieldSrcNews, srcUrl: fieldSrcUrl, updatedBy: "admin", 
              imgUrl: resUpload.filepath, isPublished: fieldNewsStatus,
            };
          } 
        } else {
          bodysend = {
            srcType: "EX", newsId:selectedNews?.newsId, newsTitle: fieldNewsTitle, newsContent: fieldContent, 
            srcNews: fieldSrcNews, srcUrl: fieldSrcUrl, updatedBy: "admin", 
            isPublished: fieldNewsStatus,
          };
        }

        const response = await fetch("/api/news/upd", {
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
              reloadNews();
            });
        }
      }
      
      setIsModalOpen(false);

    }
  }


  const hndlDelete = async (newstyp:string, newsId: number) => {

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
          const response = await fetch("/api/news/del", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({"newsId": newsId }),
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
              reloadNews();
            });
          }
        }
      })
    
  }
  
  const statusPub = ["Draft", "Published"];
  const sourceNews = ["Kompas.com", "LinkedIn", "TechInAsia", "Detik.com"]

  const [news, setNews] = useState<News[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");

  // State Form
  const [newsType, setNewsType] = useState<"in" | "ex">("in");
  const [titleMenu, setTitleMenu] = useState("");
  const [titleDescription, setTitleDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // State Field
  const [fieldNewsTitle, setNewsTitle] = useState("");
  const [fieldNewsCatId, setNewsCatId] = useState(1);
  const [fieldAuthor, setAuthor] = useState("");
  const [fieldContent, setContent] = useState("");
  const [fieldNewsStatus, setNewsStatus] = useState(1);
  const [chgFileUpload, setChgFileUpload] = useState(false);
  const [fieldSrcNews, setSrcNews] = useState("");
  const [fieldSrcUrl, setSrcUrl] = useState("");
  const [fieldIsHeadline, setIsHeadline] = useState(0);

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto">
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{titleMenu}</h1>
          <p className="text-sm font-medium text-gray-400">{titleDescription}</p>
        </div>
        <button 
          onClick={() => { 
            setModalType("add"); 
            setSelectedNews(null);
            // -- Set field value
            setNewsTitle("");
            setNewsCatId(1);
            setAuthor("");
            setContent("");
            setNewsStatus(1);
            setImagePreview(null);
            setChgFileUpload(false);
            setSrcNews("");
            setSrcUrl("");
            setIsHeadline(0);

            setIsModalOpen(true); 
          }}
          className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-orange-400 transition-all active:scale-95 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
        >
          <Plus size={16} /> Tambah Berita
        </button>
      </div>

      {/* Tabel Data Berita */}
      <div className="w-full overflow-x-auto bg-black border border-white/10 rounded-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0a0a0a] border-b border-white/10 text-xs font-black uppercase tracking-widest text-gray-500">
              <th className="p-5 font-medium w-16">ID</th>
              <th className="p-5 font-medium">Judul Berita</th>
              {newsType==="in" ? (
                <>
                  <th className="p-5 font-medium">Kategori</th>
                  <th className="p-5 font-medium">Penulis</th>
                </>
              ) : (
                <>
                  <th className="p-5 font-medium">Sumber</th>
                </>
              )}
              
              <th className="p-5 font-medium">Tgl dibuat</th>
              <th className="p-5 font-medium">Status</th>
              <th className="p-5 font-medium text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium text-gray-300">
            {news.map((item) => (
              <tr key={item.newsId} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="p-3 text-gray-500">#{item.newsId}</td>
                <td className="p-3 flex items-center gap-3 min-w-[300px]">
                  {item?.srcUrl ? (
                    <a href={item?.srcUrl} target="_blank" className="line-clamp-1 text-blue">{item.newsTitle}</a>
                  ) : (
                    <span className="line-clamp-1 text-white font-bold">{item.newsTitle}</span>
                  ) }
                </td>
                {newsType==="in" ? (
                  <>
                    <td className="p-3">{item.newsCatName}</td>
                    <td className="p-3">{item.authorBy}</td>
                  </>
                ) : (
                  <>
                    <td className="p-3">{item.srcNews}</td>
                  </>
                )}
                <td className="p-3 text-xs">
                  {
                    (item.createdAt) ? new Date(item.createdAt).toLocaleDateString('UTC', formatDateTime) : 'N/A'
                  }
                </td>
                <td className="p-3 text-center">
                  <span className={`px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-md border ${
                    item.isPublished == 1 
                      ? 'bg-green-500/10 border-green-500/20 text-green-500' 
                      : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                  }`}>
                    {statusPub[item.isPublished]}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => { 
                        setModalType("edit"); 
                        // setNewsType(item.type as "Internal" | "External");
                        setSelectedNews(item);
                        // -- Set field value
                        setNewsTitle(item.newsTitle);
                        setNewsCatId(item.newsCatId);
                        setAuthor(item.authorBy);
                        setContent(item.newsContent);
                        setNewsStatus(item.isPublished);
                        setImagePreview(item.imgUrl);
                        setChgFileUpload(false);
                        setSrcNews(item.srcNews);
                        setSrcUrl(item.srcUrl);
                        setIsHeadline(item.isHeadline);

                        setIsModalOpen(true); 
                      }}
                      className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => { 
                        hndlDelete(newsType, item.newsId);
                      }}
                      className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
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

      {/* MODAL FORM BERITA */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-[#111111] border border-white/10 rounded-3xl shadow-2xl p-8">
              <div className="flex justify-between items-center mb-6 sticky top-0 bg-[#111111] z-10 py-2 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white">{modalType === "add" ? "Berita Baru" : "Edit Berita"}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white"><X size={24} /></button>
              </div>

              {/* TODO (Backend): Form Submit Multipart/Form-Data untuk Foto */}
              <form className="space-y-8" onSubmit={hndlSubmit}>
                
                {/* PILIHAN TIPE BERITA */}
                {/* <div className="flex gap-4 p-2 bg-black border border-white/10 rounded-xl">
                  <button 
                    type="button" 
                    onClick={() => setNewsType("in")}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${newsType === "in" ? "bg-orange-500 text-black" : "text-gray-500 hover:text-white"}`}
                  >
                    Berita Internal NSC
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setNewsType("ex")}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${newsType === "ex" ? "bg-orange-500 text-black" : "text-gray-500 hover:text-white"}`}
                  >
                    Industry Feed (Eksternal)
                  </button>
                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* KOLOM KIRI (GAMBAR) */}
                  <div className="md:col-span-1 space-y-6">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Gambar / Thumbnail</label>
                      <div 
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragging(false);
                          const file = e.dataTransfer.files[0];
                          if (file && file.type.startsWith("image/")) {
                            setImagePreview(URL.createObjectURL(file));
                            // setIsDragging(true);
                          }
                        }}
                        className={`relative flex flex-col items-center justify-center w-full h-48 md:h-56 border-2 border-dashed rounded-xl transition-all overflow-hidden bg-black
                          ${isDragging ? 'border-orange-500 bg-orange-500/10' : 'border-white/10 hover:border-orange-500/50 cursor-pointer'}`}
                      >
                        <input 
                          type="file" name="file" accept="image/png, image/jpeg, image/jpg" 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                          onChange={(e) => {
                            setChgFileUpload(true);
                            const file = e.target.files?.[0];
                            if (file) { 
                              setImagePreview(URL.createObjectURL(file));
                            }
                          }}
                        />
                        {imagePreview ? (
                          <>
                            <Image src={imagePreview} alt="Preview" className="absolute fill inset-0 w-full h-full object-cover opacity-70 hover:opacity-90" width={500} height={500} />
                            <div className="absolute inset-0 flex items-center justify-center z-20 hidden">
                              <span className="px-4 py-2 bg-black/80 rounded-lg text-[10px] font-bold text-white border border-white/20 pointer-events-none text-center">Klik / Drag untuk<br/>Ganti Gambar</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center text-gray-500 pointer-events-none p-4 text-center">
                            <Upload size={28} className="mb-2 text-gray-400" />
                            <span className="text-xs font-bold text-gray-300">Drag & Drop Gambar</span>
                            <span className="text-[10px] font-medium mt-1">PNG / JPG</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* KOLOM KANAN (DATA) */}
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Judul Berita</label>
                      <input type="text" 
                        className="w-full bg-black border border-white/10 rounded-xl p-2 text-white text-sm focus:outline-none focus:border-orange-500" 
                        placeholder="" 
                        value={fieldNewsTitle}
                        onChange={ (e)=> setNewsTitle(e.target.value) }
                        required />
                    </div>

                    {/* FIELD KHUSUS INTERNAL NSC */}
                    {newsType === "in" && (
                      <>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Kategori</label>
                            <select className="w-full bg-black border border-white/10 rounded-xl p-2 text-white text-sm focus:outline-none focus:border-orange-500"
                              value={fieldNewsCatId}
                              onChange={ (e)=> setNewsCatId(parseInt(e.target.value)) }
                            >
                              {category.map((cat) => (
                                <option key={cat.newsCatId} value={cat.newsCatId}>{cat.newsCatName}</option>
                              )
                            )}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Penulis</label>
                            <input type="text" 
                              className="w-full bg-black border border-white/10 rounded-xl p-2 text-white text-sm focus:outline-none focus:border-orange-500" 
                              placeholder=""
                              value={fieldAuthor}
                              onChange={ (e)=> setAuthor(e.target.value) }
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Konten Berita</label>
                          <textarea rows={10} 
                            className="w-full bg-black border border-white/10 rounded-xl p-2 text-white text-sm focus:outline-none focus:border-orange-500 resize-none custom-scrollbar" 
                            placeholder="Tulis isi berita..." 
                            value={fieldContent}
                            onChange={ (e)=> setContent(e.target.value) }
                            required />
                        </div>
                      </>
                    )}

                    {/* FIELD KHUSUS EXTERNAL FEED */}
                    {newsType === "ex" && (
                      <>
                        {/* <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Nama Sumber</label>
                            <input type="text" className="w-full bg-black border border-white/10 rounded-xl p-2 text-white focus:outline-none focus:border-orange-500" placeholder="Misal: Kompas, LinkedIn, dll" required />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Link Sumber URL</label>
                            <input type="url" className="w-full bg-black border border-white/10 rounded-xl p-2 text-white focus:outline-none focus:border-orange-500" placeholder="https://..." required />
                            <p className="text-[9px] text-gray-500 mt-1">Logo akan diambil otomatis dari URL (Favicon) di halaman user.</p>
                          </div>
                        </div> */}
                          <div>
                            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Sumber Berita</label>
                            <select 
                              className="w-full bg-black border border-white/10 rounded-xl p-2 text-white text-sm focus:outline-none focus:border-orange-500"
                              value={fieldSrcNews}
                              onChange={ (e)=> setSrcNews(e.target.value) }
                            >
                              <option value="">-- pilih sumber berita --</option>
                              {sourceNews.map((srcn, i) => (
                                <option key={srcn} value={srcn}>{srcn}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Link URL</label>
                            <input type="url" className="w-full bg-black border border-white/10 rounded-xl p-2 text-white text-sm focus:outline-none focus:border-orange-500" 
                              placeholder="http:// or https://..." 
                              value={fieldSrcUrl}
                              onChange={ (e)=> setSrcUrl(e.target.value) }
                              required 
                            />
                          </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Kutipan Isi Berita</label>
                          <textarea rows={8} className="w-full bg-black border border-white/10 rounded-xl p-2 text-white text-sm focus:outline-none focus:border-orange-500 resize-none" 
                            placeholder="Tulis kutipan singkat artikel sumber..." 
                            value={fieldContent}
                            onChange={ (e)=> setContent(e.target.value) }
                            required 
                          />
                        </div>
                      </>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Status</label>
                        <select 
                          className="w-full bg-black border border-white/10 rounded-xl p-2 text-white text-sm focus:outline-none focus:border-orange-500"
                          value={fieldNewsStatus}
                          onChange={ (e)=> setNewsStatus(parseInt(e.target.value)) }
                        >
                          <option value={0}>Draft</option>
                          <option value={1}>Published</option>
                        </select>
                      </div>
                      {newsType === "in" && modalType === "edit" && (
                        <div>
                          <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Jadikan Headline?</label>
                          <select 
                            className="w-full bg-black border border-white/10 rounded-xl p-2 text-white text-sm focus:outline-none focus:border-orange-500"
                            value={fieldIsHeadline}
                            onChange={ (e)=> setIsHeadline(parseInt(e.target.value)) }
                          >
                            <option value={0}>tidak</option>
                            <option value={1}>YA</option>
                          </select>
                        </div>
                      )}
                      {/* <div>
                        <label className="block text-xs font-bold uppercase text-gray-400 mb-2">&nbsp;</label>
                        <input type="text" className="w-full bg-black border border-white/10 rounded-xl p-2 text-white text-xs focus:outline-none focus:border-orange-500" 
                          defaultValue={new Date().toLocaleDateString('id-ID', formatDateTime)}
                          readOnly
                        />
                      </div> */}
                    </div>

                  </div>
                </div>

                <button type="submit" className="w-full py-4 rounded-xl bg-orange-500 text-black text-xs font-black uppercase tracking-widest hover:bg-orange-400 transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                  {modalType === "add" ? "Posting Berita" : "Simpan"}
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