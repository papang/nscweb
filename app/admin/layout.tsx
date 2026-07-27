"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {redirect} from "next/navigation";
import { usePathname, useRouter, useSearchParams } from "next/navigation"; // Tambahkan useRouter
import { Package, Newspaper, LogOut, BriefcaseBusiness, Images, LayoutDashboard } from "lucide-react";

interface SessionInfo {
  userId, userName, roleId, iat, exp
};

interface Menu {
  id, name, icon, path, sub
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {

  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);

  useEffect(() => {
    useAuth();
  }, []);

  const useAuth = async() => {
    const response = await fetch( "/api/auth/me",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roleType: "ADMIN", 
        }),
      }
    );

    const result = await response.json();
    if(result) {
      
      if(!(result.authenticated)) 
        redirect("/admin/login");

      setSessionInfo(result?.data);
    }
    
  }


  const pathname = usePathname();
  // const searchParams = useSearchParams();
  const router = useRouter();

  const toggleSubMenu = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const elId = event.currentTarget.id; 
    const submenu = document.getElementById("sub_" + elId);
    if(submenu) {
      submenu?.classList.toggle('hidden');
    }
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  let menuItems: Menu[] = [];
  if(sessionInfo?.roleId==="ADM") {
    menuItems = [
      // { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/admin" },
      { id: "m_news", name: "Berita", icon: <Newspaper size={18} />, path: "", sub: [
        { id: "m_news_insight", name: "Berita (Insight)", icon: "", path: "/admin/berita/insight" },
        { id: "m_news_ekstern", name: "Berita Eksternal", icon: "", path: "/admin/berita/ekstern" },
      ]},
      { id: "m_karir", name: "Karir", icon: <BriefcaseBusiness size={18} />, path: "/admin/karir", sub: null },
      { id: "m_galeri", name: "Galeri", icon: <Images size={18} />, path: "/admin/galeri", sub: null },
      // { id: "m_produk", name: "Produk", icon: <Package size={18} />, path: "/admin/produk", sub: null },
      
    ];
  } 
  
  if(sessionInfo?.roleId==="SAL") {
    menuItems = [
      { id: "m_dash", name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/admin", sub: null },
      { id: "m_produk", name: "Produk", icon: <Package size={18} />, path: "/admin/produk", sub: null },
    ];
  } 

  // --- FUNGSI LOGOUT ---
  const handleLogout = async () => {
    // 1. Hapus cookie
    // document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    await fetch("/api/auth/logout", {
      method: "POST",
    });

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
              <div key={item?.name}>
                <Link
                  id={item?.id} onClick={(e)=> void toggleSubMenu(e)}
                  href={item?.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive 
                      ? "bg-orange-500/10 text-orange-500 border border-orange-500/20" 
                      : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {item?.icon} {item?.name}
                </Link>
                  {(item?.sub) ? (
                    <div className="" id={`sub_${item?.id}`}>
                    { item?.sub.map((subitem) => {
                        const isActive = pathname === subitem.path;
                        return (
                          <Link 
                            key={subitem.name} 
                            href={subitem.path}
                            className={`flex items-center gap-3 ml-7 px-2 py-3 rounded-xl text-sm font-bold transition-all ${
                              isActive 
                                ? "bg-orange-500/10 text-orange-500 border border-orange-500/20" 
                                : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                            }`}
                          >
                            {subitem.icon} {subitem.name}
                          </Link>
                        )
                      })
                    }
                    </div>
                  ) : "" 
                  }
              </div>
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