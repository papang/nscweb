"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Tambahkan useRouter
import { Package, Newspaper, LogOut, LayoutDashboard } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/admin" },
    { name: "Kelola Produk", icon: <Package size={18} />, path: "/admin/produk" },
    { name: "Kelola Berita", icon: <Newspaper size={18} />, path: "/admin/berita" },
  ];

  // --- FUNGSI LOGOUT ---
  const handleLogout = () => {
    // 1. Hapus cookie
    document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // 2. Arahkan kembali ke halaman login
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-black text-gray-200 font-sans selection:bg-orange-500/30">
      
      {/* Sidebar Kiri */}
      <aside className="w-64 flex-shrink-0 bg-[#0a0a0a] border-r border-white/5 flex flex-col hidden md:flex">
        <div className="h-20 flex items-center px-8 border-b border-white/5">
          <h1 className="text-xl font-black text-white tracking-tight">
            NSC <span className="text-orange-500">CMS</span>
          </h1>
        </div>
        
        <nav className="flex-grow py-6 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.name} 
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive 
                    ? "bg-orange-500/10 text-orange-500 border border-orange-500/20" 
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {item.icon} {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          {/* Ubah Link menjadi button dan panggil handleLogout */}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all cursor-pointer outline-none"
          >
            <LogOut size={18} /> Keluar
          </button>
        </div>
      </aside>

      {/* Area Konten Kanan */}
      <main className="flex-grow relative h-screen overflow-y-auto bg-[#111111]">
        {children}
      </main>

    </div>
  );
}