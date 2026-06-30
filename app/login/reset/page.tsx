'use client'

import { Suspense, useState, useRef } from 'react';
import { useSearchParams, usePathname, redirect, RedirectType } from 'next/navigation';
// import { useRouter } from 'next/router';
import { UserPlus, Mail, Lock, ShieldCheck, ChevronLeft, EyeOff, Eye, User, Phone, CaseLower, CircleX, Send, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Swal from "sweetalert2";
import { sendmail_reset } from "@/app/lib/sendmail_reset";
import {decryptDataBase64} from "@/app/utils/crypto";

export default function ResetPwdPage() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-black text-gray-200 selection:bg-orange-500/30 overflow-hidden font-sans">

      <Suspense fallback={<div>Loading...</div>}>
        <LupaPage />
      </Suspense>

    </main>
  );
}

export function LupaPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // const router = useRouter();
  // const {step} = router.query;
  const xstep = searchParams.get("step");
  const xhash = searchParams.get("h") || ""; 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const tobj = decryptDataBase64(xhash);


  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirm?: string;
  }>({});

  const clearError = (key: keyof typeof errors) => {
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const hndlSendResetLink = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    const resEmail = await sendmail_reset({
        name: "USER RESET PASSWORD", 
        email: email,
    });

  
    if (resEmail.success) {
      Swal.fire({
        title: "",
        text: "Link verifikasi password telah dikirim melalui email Anda.",
        icon: "success",
        confirmButtonText: "OK"
      }).then((result) => {
        // redirect("/login");
        setEmail("");
      });
    } else {
      alert(resEmail.message);
    }

    
  }


  const hndlResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    // Validasi Password: Min 8, Kapital, Angka
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password = "Min 8 characters, must include uppercase & number";
    }

    // Validasi Password Match
    if (password !== confirmPassword) {
      newErrors.confirm = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      console.log("Password updated successfully");

      const response = await fetch(
        "/api/auth/changepass",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "email" : tobj.email, "password" : password,
          }),
        }
      );

      const result = await response.json();
      
      if(result.success) {
        Swal.fire({
          title: "",
          text: "Password anda telah berhasil di-reset. Silahkan sign-in kembali.",
          icon: "success",
          confirmButtonText: "OK"
        }).then((result) => {
          // alert(tobj.email);
          redirect("/login");
        });
      }

    }
  };
  

  return (
    <>
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0">
        {/* Gradasi pure black / dark gray */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(24,24,27,1),rgba(0,0,0,1))]" />
        
        {/* Animated Mesh Gradient dengan nuansa Orange/Amber */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* --- BACK BUTTON --- */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="absolute top-12 left-8 md:left-12 z-20"
      >
        <Link 
          href="/login" 
          className="group flex items-center gap-2.5 text-xs font-medium tracking-wide text-gray-400 transition-all hover:text-orange-400"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/5 bg-white/5 transition-colors group-hover:bg-orange-500/10 group-hover:border-orange-500/30 group-hover:text-orange-400">
            <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          </div>
          Back to login
        </Link>
      </motion.div>

      {/* --- MAIN CONTENT --- */}
      <section className="relative z-10 w-full max-w-[550px] px-6 mt-16 mb-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >

          {/* Header  */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
              Reset Password
            </h1>
          </div>

            {(() => {              

              switch (xstep) {
                /* Get Email */
                case "1" : 
                  return (
                    <div className="relative">
                      
                      {/* Soft Glow Behind Card dengan aksen Orange */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-[24px] blur-xl opacity-50" />
                      
                      <div className="relative rounded-[24px] border border-white/10 bg-black/60 p-8 backdrop-blur-2xl">
                        <h2 className="text-l font-bold tracking-tight text-gray-400 mb-2">
                          Email Konfirmasi Reset
                        </h2>
                        <form className="space-y-4" ref={formRef} onSubmit={hndlSendResetLink} >

                          {/* Email Field */}
                          <div className="space-y-2">
                            <label className="text-[14px] font-bold text-gray-300 ml-1">Email</label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                              <input 
                                type="email" required={true}
                                placeholder="email@domain.com"
                                value={email}
                                onChange={(e)=>(setEmail(e.target.value))}
                                className="w-full rounded-xl border border-white/5 bg-white/[0.05] py-3.5 pl-12 pr-4 text-sm transition-all focus:border-orange-500/50 focus:bg-white/[0.08] outline-none placeholder:text-gray-600"
                              />
                            </div>
                          </div>

                          {/* Submit Button */}
                          <button type="submit" className="relative mt-4 w-full group overflow-hidden rounded-xl bg-orange-500 px-4 py-3.5 text-sm font-bold text-black transition-all hover:bg-orange-400 active:scale-[0.98] shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                            <div className="flex items-center justify-center gap-2">
                              Kirim Link Reset
                              <Send size={16} className="transition-transform group-hover:translate-x-0.5" />
                            </div>
                          </button>

                        </form>

                      </div>
                    </div>
                  )
                  break;

                case "2" :
                  return (
                    <div className="relative">
                      
                      {/* Soft Glow Behind Card dengan aksen Orange */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-[24px] blur-xl opacity-50" />
                      
                      <div className="relative rounded-[24px] border border-white/10 bg-black/60 p-8 backdrop-blur-2xl">
                        <h2 className="text-l font-bold tracking-tight text-orange-400 mb-2">
                          Email Pemulihan Password
                        </h2>
                        <form className="space-y-4" onSubmit={()=>({})}>

                          {/* Full Name Field */}
                          <div className="space-y-2">
                            <label className="text-[14px] font-bold text-gray-300 ml-1">Nama</label>
                            <div className="relative">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                              <input 
                                type="text" required={true}
                                placeholder=""
                                value="username"
                                onChange={(e)=>(e.target.value)}
                                className="w-full rounded-xl border border-white/5 bg-white/[0.05] py-3.5 pl-12 pr-4 text-sm transition-all focus:border-orange-500/50 focus:bg-white/[0.08] outline-none placeholder:text-gray-600"
                              />
                            </div>
                          </div>

                          {/* Email Field */}
                          <div className="space-y-2">
                            <label className="text-[14px] font-bold text-gray-300 ml-1">Email</label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                              <input 
                                type="email" required={true}
                                placeholder="email@domain.com"
                                value="email"
                                onChange={(e)=>(e.target.value)}
                                className="w-full rounded-xl border border-white/5 bg-white/[0.05] py-3.5 pl-12 pr-4 text-sm transition-all focus:border-orange-500/50 focus:bg-white/[0.08] outline-none placeholder:text-gray-600"
                              />
                            </div>
                          </div>

                          {/* Phone No Field */}
                          <div className="space-y-2">
                            <label className="text-[14px] font-bold text-gray-300 ml-1">Phone No.</label>
                            <div className="relative">
                              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                              <input 
                                type="tel" required={true}
                                placeholder=""
                                value="phoneNo"
                                onChange={(e)=>(e.target.value)}
                                className="w-full rounded-xl border border-white/5 bg-white/[0.05] py-3.5 pl-12 pr-4 text-sm transition-all focus:border-orange-500/50 focus:bg-white/[0.08] outline-none placeholder:text-gray-600"
                              />
                            </div>
                          </div>

                          {/* Password Field */}
                          <div className="space-y-2">
                            <label className="text-[14px] font-bold text-gray-300 ml-1">Password</label>
                            <div className="relative">
                              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                              <input 
                                type="password"
                                placeholder="" required={true}
                                value="password"
                                onChange={(e)=>(e.target.value)}
                                className="w-full rounded-xl border border-white/5 bg-white/[0.05] py-3.5 pl-12 pr-12 text-sm transition-all focus:border-orange-500/50 focus:bg-white/[0.08] outline-none placeholder:text-gray-600"
                              />
                              <button type="button" 
                              onClick={(e)=>({})}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                                  {/* {showPassword ? (
                                    <Eye size={16} />
                                  ) : (
                                    <EyeOff size={16} />
                                  )} */}
                              </button>
                            </div>
                            {/* {state?.errors?.password && (
                              <p className="text-red-500 text-sm mt-1">{state.errors.password[0]}</p>
                            )} */}
                            {/* <p className="text-[11px] font-bold text-gray-500 ml-1">Must be at least 8 characters long.</p> */}
                              
                          </div>

                          {/* Password Confirmation */}
                          <div className="space-y-2">
                            <label className="text-[14px] font-bold text-gray-300 ml-1">Password Confirmation</label>
                            <div className="relative">
                              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                              <input 
                                type="password"
                                placeholder=""
                                value="passwordConfirmed"
                                onChange={(e)=>({})}
                                className="w-full rounded-xl border border-white/5 bg-white/[0.05] py-3.5 pl-12 pr-12 text-sm transition-all focus:border-orange-500/50 focus:bg-white/[0.08] outline-none placeholder:text-gray-600"
                              />
                              <button type="button" 
                                onClick={(e)=>({})}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                                  {/* {showPasswordCnf ? (
                                    <Eye size={16} />
                                  ) : (
                                    <EyeOff size={16} />
                                  )} */}
                              </button>
                            </div>
                            {/* {iserrPasswordCnf ? (
                                <div className="flex items-center gap-2 text-gray-500 text-[12px] font-bold">
                                  <CircleX size={16} className="text-red-500" /><span>Konfirmasi password tidak sesuai</span>
                                </div>
                            ) : ( 
                              <div></div>
                            )} */}
                          </div>

                          {/* Submit Button */}
                          <button type="submit" className="relative mt-4 w-full group overflow-hidden rounded-xl bg-orange-500 px-4 py-3.5 text-sm font-bold text-black transition-all hover:bg-orange-400 active:scale-[0.98] shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                            <div className="flex items-center justify-center gap-2">
                              SIGN UP
                              <UserPlus size={16} className="transition-transform group-hover:translate-x-0.5" />
                            </div>
                          </button>

                        </form>

                      </div>
                    </div>
                  )
                  break;

                case "n" :
                  
                  return (
                    <div className="relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-[24px] blur-xl opacity-50" />
                      <div className="relative rounded-[24px] border border-white/10 bg-black/60 p-8 backdrop-blur-2xl">
                        <h2 className="text-l font-bold tracking-tight text-gray-400 mb-2">
                          Set Password Baru
                        </h2>
                        <form className="space-y-5" onSubmit={hndlResetPassword}>
                          {/* Email */}
                          <div className="space-y-2">
                            <label className="text-[13px] font-bold text-gray-300 ml-1">
                              Email
                            </label>
                            <div className="relative">
                              <Mail
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                                size={18}
                              />
                              <input
                                type="email"
                                value={tobj.email}
                                readOnly
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="w-full rounded-xl border border-white/5 bg-white/[0.05] py-3.5 pl-12 pr-4 text-sm focus:border-orange-500/50 outline-none"
                              />
                            </div>
                            {errors.email && (
                              <p className="text-red-400 text-[11px] font-bold flex items-center gap-1 mt-1 ml-1">
                                <AlertCircle size={12} />
                                {errors.email}
                              </p>
                            )}
                          </div>

                          {/* OTP */}
                          {/* <div className="space-y-2">
                            <label className="text-[13px] font-bold text-gray-300 ml-1">
                              Verification Code
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                maxLength={6}
                                placeholder="000000"
                                className="flex-1 text-center tracking-[0.2em] text-lg rounded-xl border border-white/5 bg-white/[0.05] py-3.5 px-4 focus:border-orange-500/50 outline-none"
                              />
                              <button
                                type="button"
                                onClick={handleSendCode}
                                className="px-4 py-3.5 rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-500 text-[12px] font-bold hover:bg-orange-500 hover:text-black transition-all whitespace-nowrap"
                              >
                                Send Code
                              </button>
                            </div>
                          </div> */}

                          {/* New Password */}
                          <div className="space-y-2">
                            <label className="text-[13px] font-bold text-gray-300 ml-1">Password Baru</label>
                            <div className="relative">
                              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                              <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); clearError("password"); }}
                                placeholder="••••••••"
                                className="w-full rounded-xl border border-white/5 bg-white/[0.05] py-3.5 pl-12 pr-12 text-sm focus:border-orange-500/50 outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-400 transition-colors"
                              >
                                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                              </button>
                            </div>
                            {errors.password && <p className="text-red-400 text-[11px] font-bold flex items-center gap-1 mt-1 ml-1"><AlertCircle size={12} /> {errors.password}</p>}
                          </div>

                          {/* Confirm Password */}
                          <div className="space-y-2">
                            <label className="text-[13px] font-bold text-gray-300 ml-1">Konfirmasi Password</label>
                            <div className="relative">
                              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                              <input
                                type={showConfirm ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => { setConfirmPassword(e.target.value); clearError("confirm"); }}
                                placeholder="••••••••"
                                className="w-full rounded-xl border border-white/5 bg-white/[0.05] py-3.5 pl-12 pr-12 text-sm focus:border-orange-500/50 outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-400 transition-colors"
                              >
                                {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
                              </button>
                            </div>
                            {errors.confirm && <p className="text-red-400 text-[11px] font-bold flex items-center gap-1 mt-1 ml-1"><AlertCircle size={12} /> {errors.confirm}</p>}
                          </div>

                          <button
                            type="submit"
                            className="w-full mt-4 rounded-xl bg-orange-500 py-3.5 text-sm font-bold text-black hover:bg-orange-400 active:scale-[0.98] transition-all"
                          >
                            Reset Password
                          </button>
                        </form>
                      </div>
                    </div>
                  )
                  break;

                default :
                  redirect(pathname + "?step=1");
                  break;
              }
              
            })()}
      
          {/* Footer Info */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-col items-center gap-6"
          >
            
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}