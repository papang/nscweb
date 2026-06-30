"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { data } from "framer-motion/client";
import { Sign } from "crypto";
import { LogOut } from "lucide-react";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch("/api/auth/me").then((res) =>
        res.json()
      )
      .then((data) => {
        setUser(data.user);
        setUsername(data.user.username);
      })
      .finally(() =>
        setLoading(false)
      );
  }, []);

  return {
    loading,
    user,
    isAuthenticated:
      !!user,
    username,
  };
}

export default function Navbar() {

  const listMenu = [
    { name: "Berita", href: "/berita" },
    { name: "Produk", href: "/product" },
    { name: "Our Gallery", href: "/gallery" },
    // { name: "Portal Customer", href: "/customer" },
    // { name: "Portal Reseller", href: "/reseller" },
    { name: "Tentang Kami", href: "/tentang-kami" },
    { name: "Karir", href: "/career" },
    { name: "Hubungi Kami", href: "/hubungi-kami" },
    // { name: "Formulir", href: "/formulir" },
  ]

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pathname = usePathname();

    if (pathname.startsWith("/admin")) {
    return null; 
  }

  const isHome = pathname === "/";
  const isLokasiTetap = pathname === "/lokasi-tetap";
  const isMaritim = pathname === "/maritim";
  const isAviasi = pathname === "/aviasi";
  const isMobile = pathname === "/mobile";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSidebarOpen]);

  const {
    loading,
    isAuthenticated,
    user,
    username,
  } = useAuth();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    window.location.href = "/";
  };


  if (!isAuthenticated) {
    return (
      <>
        {/* isHome && (
          <div
            className={`fixed left-0 top-0 z-[60] flex h-[46px] w-full items-center justify-center bg-orange-500 px-4 transition-transform duration-500 ease-in-out shadow-[0_0_15px_rgba(249,115,22,0.3)] ${
              isScrolled ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <p className="text-center text-[9px] font-bold text-black sm:text-[10px] md:text-xs">
              Rp3.800.000 <span className="font-medium line-through opacity-70">Rp4.750.000</span> untuk Kit Mini dan Rp4.720.000 <span className="font-medium line-through opacity-70">Rp5.900.000</span> untuk Kit Standar. Pesan sebelum 23/4.
            </p>
          </div>
        ) */}

        {/* --- NAVBAR UTAMA --- */}
        <nav
          className={`fixed z-40 flex w-full items-center justify-between px-8 py-4 transition-all duration-500 ${
            isScrolled 
              ? "bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 shadow-lg" 
              : "bg-transparent"
          } "top-0"`}
        >
          {/* ${isScrolled && isHome ? "top-[46px]" : "top-0"} */}
          <div className="flex items-center gap-10">
            <Link href="/" className="tracking-[0.2em] flex items-center outline-none">
              <img 
                src="/nsclogo.svg" 
                alt="NSC Logo" 
                className={`h-5 w-auto md:h-6 lg:h-7 transition-all duration-300 ${
                  !isScrolled ? "brightness-0 invert" : ""
                }`}
              />
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="text-white hover:text-orange-500 transition-colors outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>

        {/* --- SIDEBAR --- */}
        <div 
          className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        ></div>

        <div
          className={`fixed right-0 top-0 z-50 h-screen w-full bg-[#111111] p-8 text-white transition-transform duration-500 ease-in-out sm:w-[320px] shadow-[-10px_0_30px_rgba(0,0,0,0.5)] ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } overflow-y-auto border-l border-white/10`}
        >
          <div className="mb-10 flex justify-end">
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-500 transition-colors hover:text-orange-500 outline-none"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col">
            {/* Language & Auth Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              {/* Language Selector */}
              <button className="flex items-center gap-2 text-[12px] font-bold tracking-widest text-gray-400 transition-colors hover:text-orange-500 outline-none">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
                ID
              </button>

              {/* Masuk | Daftar Section */}
              <div className="flex items-center gap-3 text-[13px] font-bold uppercase tracking-widest">
                <Link 
                  href="/login" 
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-white transition-colors hover:text-orange-500 outline-none"
                >
                  Masuk
                </Link>
                <span className="h-3 w-[1px] bg-gray-700"></span>
                <Link 
                  href="/register" 
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-orange-500 transition-colors hover:text-orange-400 outline-none"
                >
                  Daftar
                </Link>
              </div>
            </div>

            {/* Main Navigation Links */}
            {listMenu.map((item) => (
              <div key={item.name} className="flex flex-col border-b border-white/5 py-6">
                <Link 
                  href={item.href} 
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-[14px] font-bold uppercase tracking-[0.2em] text-gray-300 transition-all hover:translate-x-2 hover:text-orange-500 outline-none"
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </>
    );

  } else {

    // const cookieStore = await cookies();
    // const token = cookieStore.get("token")?.value;
    

    return (
        <>
          {/* --- NAVBAR UTAMA --- */}
          <nav
            className={`fixed z-40 flex w-full items-center justify-between px-8 py-4 transition-all duration-500 ${
              isScrolled 
                ? "bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 shadow-lg" 
                : "bg-transparent"
            } "top-0"`}
          >
            {/* ${isScrolled && isHome ? "top-[46px]" : "top-0"} */}
            <div className="flex items-center gap-10">
              <Link href="/" className="tracking-[0.2em] flex items-center outline-none">
                <img 
                  src="/nsclogo.svg" 
                  alt="NSC Logo" 
                  className={`h-5 w-auto md:h-6 lg:h-7 transition-all duration-300 ${
                    !isScrolled ? "brightness-0 invert" : ""
                  }`}
                />
              </Link>
            </div>

            <div className="flex items-center gap-6">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="text-white hover:text-orange-500 transition-colors outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </nav>

          {/* --- SIDEBAR --- */}
          <div 
            className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${
              isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          <div
            className={`fixed right-0 top-0 z-50 h-screen w-full bg-[#111111] p-8 text-white transition-transform duration-500 ease-in-out sm:w-[320px] shadow-[-10px_0_30px_rgba(0,0,0,0.5)] ${
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            } overflow-y-auto border-l border-white/10`}
          >
            <div className="mb-10 flex justify-end">
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-500 transition-colors hover:text-orange-500 outline-none"
              >
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col">
              {/* Language & Auth Header */}
              <div className="flex items-center justify-end border-b border-white/10 pb-6">
                {/* Language Selector */}
                {/* <button className="flex items-center gap-2 text-[12px] font-bold tracking-widest text-gray-400 transition-colors hover:text-orange-500 outline-none">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                  </svg>
                  ID
                </button> */}

                {/* Masuk | Daftar Section */}
                <div className="flex items-center gap-3 text-[13px] font-bold tracking-widest">
                  <span className="float-left">
                    Selamat Datang, { username }
                    {/* {user?.username} */}
                  </span>
                  <span className="h-3 w-[1px] bg-gray-700"></span>
                  <Link 
                    href="" 
                    onClick={handleLogout}
                    className="text-orange-500 transition-colors hover:text-orange-400 outline-none uppercase w-fit float-right"
                  >
                    <LogOut />
                  </Link>
                </div>
              </div>

              {/* Main Navigation Links */}
              {listMenu.map((item) => (
                <div key={item.name} className="flex flex-col border-b border-white/5 py-6">
                  <Link 
                    href={item.href} 
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-[14px] font-bold uppercase tracking-[0.2em] text-gray-300 transition-all hover:translate-x-2 hover:text-orange-500 outline-none"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      );

  }



}