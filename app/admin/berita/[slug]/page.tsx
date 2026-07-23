"use client";

import { useEffect, useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, X, FileText, Upload, Link as LinkIcon, Globe, Rss } from "lucide-react";

// TODO (Backend): Fetch data berita dari API
interface News {
  newsId: number,
  newsCatId: number,
  newsTitle: string,
  imgUrl: string,
  authorBy: string,
  newsContent: string,
  isPublished: number,
  createdBy: string,
  createdAt: string,
  updatedBy: string,
  updatedAt: string,
  statVisit: number,
  tags: string[],
}

const initialNews = [
  { 
    id: 1, 
    type: "Internal", // Internal = Berita Resmi NSC
    category: "Update",
    title: "NSC Luncurkan Satelit LEO Terbaru di Orbit Indonesia", 
    date: "23 April 2026", 
    status: "Published", 
    author: "Tim Redaksi NSC",
    readTime: "4 Menit",
    content: "Nusantara Star Connect (NSC) secara resmi mengumumkan...",
    image: "/particle7.webp"
  },
  { 
    id: 2, 
    type: "External", // External = Industry Feed
    sourceName: "Kompas.com",
    sourceUrl: "https://www.kompas.com/tekno",
    title: "Pemerintah Targetkan Seluruh Desa Terkoneksi Internet Satelit di 2027", 
    excerpt: "Kementerian Kominfo menggenjot pemerataan akses internet di daerah 3T...",
    date: "3 Jam lalu", 
    status: "Published", 
    image: "/particle2.webp"
  },
];

const categories = ['Teknologi', 'Satelit', 'Bisnis', 'Tutorial', 'Update', 'Event'];

export default function KelolaBeritaPage({ params, }: { params: Promise<{ slug: string }>}) {

  const { slug } = use(params);

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeZone: "UTC", // Lock the timezone to avoid hydration errors
  });

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

    const reloadNews = async () => {
      const response = await fetch("/api/news/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const result = await response.json();
      if (result.success) {
        setNews(result.result);
      }
    };

    reloadNews();
  }, []);

  

  const [news, setNews] = useState<News[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");

  // State Form
  const [newsType, setNewsType] = useState<"in" | "ex">("in");
  const [titleMenu, setTitleMenu] = useState("");
  const [titleDescription, setTitleDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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
            setImagePreview(null);
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
              <th className="p-5 font-medium">Judul Artikel</th>
              <th className="p-5 font-medium">Author</th>
              <th className="p-5 font-medium">Tanggal</th>
              <th className="p-5 font-medium">Status</th>
              <th className="p-5 font-medium text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium text-gray-300">
            {news.map((item) => (
              <tr key={item.newsId} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="p-5 text-gray-500">#{item.newsId}</td>
                <td className="p-5 text-white font-bold flex items-center gap-3 min-w-[300px]">
                  <div className="w-8 h-8 rounded-lg bg-white/5 text-gray-400 flex items-center justify-center flex-shrink-0">
                    <FileText size={16} />
                  </div>
                  <span className="line-clamp-1">{item.newsTitle}</span>
                </td>
                <td className="p-5">
                  
                    {item.authorBy}
                  
                  {/* {item.type === "Internal" ? ( */}
                    {/* <span className="flex items-center gap-1 text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2 py-1 rounded-md w-max border border-orange-500/20 uppercase tracking-widest">
                      <Globe size={12} /> NSC: {item.newsCatId}
                    </span> */}
                  {/* ) : (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md w-max border border-blue-500/20 uppercase tracking-widest">
                      <Rss size={12} /> {item.sourceName}
                    </span>
                  )} */}
                </td>
                <td className="p-5">{item.createdAt}</td>
                <td className="p-5">
                  <span className={`px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-md border ${
                    item.isPublished == 1 
                      ? 'bg-green-500/10 border-green-500/20 text-green-500' 
                      : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                  }`}>
                    published
                    {/* {item.status} */}
                  </span>
                </td>
                <td className="p-5">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => { 
                        setModalType("edit"); 
                        // setNewsType(item.type as "Internal" | "External");
                        setImagePreview(item.imgUrl);
                        setIsModalOpen(true); 
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
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                
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
                  <div className="md:col-span-1 space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Gambar / Thumbnail</label>
                      <div 
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragging(false);
                          const file = e.dataTransfer.files[0];
                          if (file && file.type.startsWith("image/")) setImagePreview(URL.createObjectURL(file));
                        }}
                        className={`relative flex flex-col items-center justify-center w-full h-48 md:h-56 border-2 border-dashed rounded-xl transition-all overflow-hidden bg-black
                          ${isDragging ? 'border-orange-500 bg-orange-500/10' : 'border-white/10 hover:border-orange-500/50 cursor-pointer'}`}
                      >
                        <input 
                          type="file" accept="image/png, image/jpeg, image/jpg" 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setImagePreview(URL.createObjectURL(file));
                          }}
                        />
                        {imagePreview ? (
                          <>
                            <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                            <div className="absolute inset-0 flex items-center justify-center z-20">
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
                      <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Judul Artikel</label>
                      <input type="text" className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500" placeholder="Ketik judul berita..." required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Tanggal / Waktu</label>
                        <input type="text" className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500" placeholder="Misal: 23 April 2026 atau 3 Jam lalu" required />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Status</label>
                        <select className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500">
                          <option value="draft">Draft</option>
                          <option value="published">Publish</option>
                        </select>
                      </div>
                    </div>

                    {/* FIELD KHUSUS INTERNAL NSC */}
                    {newsType === "in" && (
                      <>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Kategori</label>
                            <select className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500">
                              {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Penulis</label>
                            <input type="text" className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500" placeholder="Misal: Tim Redaksi NSC" />
                          </div>
                          <div className="col-span-2 md:col-span-1">
                            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Waktu Baca</label>
                            <input type="text" className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500" placeholder="Misal: 4 Menit" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Konten Lengkap Berita</label>
                          <textarea rows={6} className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500 resize-none custom-scrollbar" placeholder="Tulis isi berita di sini..." required />
                        </div>
                      </>
                    )}

                    {/* FIELD KHUSUS EXTERNAL FEED */}
                    {newsType === "ex" && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Nama Sumber</label>
                            <input type="text" className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500" placeholder="Misal: Kompas, LinkedIn, dll" required />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Link Sumber URL</label>
                            <input type="url" className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500" placeholder="https://..." required />
                            <p className="text-[9px] text-gray-500 mt-1">Logo akan diambil otomatis dari URL (Favicon) di halaman user.</p>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Kutipan Singkat (Excerpt)</label>
                          <textarea rows={4} className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500 resize-none" placeholder="Tulis kutipan singkat artikel sumber..." required />
                        </div>
                      </>
                    )}

                  </div>
                </div>

                <button type="submit" className="w-full py-4 rounded-xl bg-orange-500 text-black text-xs font-black uppercase tracking-widest hover:bg-orange-400 transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                  {modalType === "add" ? "Posting Berita" : "Simpan Perubahan"}
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