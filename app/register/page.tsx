"use client";

import React, { useState, useActionState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { UserPlus, Mail, Lock, ShieldCheck, ChevronLeft, EyeOff, Eye, User, Phone, CaseLower, CircleX, 
  Building, Briefcase, IdCard
 } from "lucide-react";
import Modal from "@/components/Modal";
import DialogInfo from "@/components/DialogInfo";
import PrivacyInfo from "@/components/PrivacyInfo";
// import { sendEmail } from '@/app/lib/sendEmail';
import { sendmail } from "@/app/lib/sendmail";
import ModalPrivacy from "@/components/ModalPrivacy";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
  </svg>
);

const initialState = {
  success: false, errors: {},
};

export default function RegisterPage() {
  // const [accountType, setAccountType] = useState("customer");
  //  const [state, formAction, isPending] = useActionState(registerUser, initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalPrivacyOpen, setIsModalPrivacyOpen] = useState(false);

  // const router = useRouter();
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCnf, setShowPasswordCnf] = useState(false);
  const [iserrPasswordCnf, setIserrPasswordCnf] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [profession, setProfession] = useState("");
  
  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleVisibilityCnf = () => {
    // setIsModalOpen(true);
    setShowPasswordCnf((prev) => !prev);
  };

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    // /* Check Form */ //
    if (password != passwordConfirmed) {
        setIserrPasswordCnf(true);
    } else  {

        const response = await fetch(
          "/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username, email, phoneNo, password, companyName, jobTitle, profession
            }),
          }
        );

        const resEmail = await sendmail({
          name:username, email:email
        });
        // if (resEmail.success) {
        //   alert(resEmail.message);
        // } else {
        //   alert(resEmail.message);
        // }

        const result = await response.json();

        if (resEmail.success && result.success) {
          setIsModalOpen(true);
          // window.location.href="/login";
        } else {
          setIsModalOpen2(true);
        }

    }

    
  };

  const confirmPassword = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirmed(e.target.value);
    
    // if (passwordConfirmed.length > 3) {
    //   if (password != passwordConfirmed) {
    //     alert("tidak sama");
    //   }
    // }
    
  };


  const termsHandler = async() => {
    setIsModalPrivacyOpen(true);
  }

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-black text-gray-200 selection:bg-orange-500/30 overflow-hidden font-sans">
      
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
      <section className="relative z-10 w-full max-w-[440px] px-6 mt-16 mb-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 mb-6 backdrop-blur-sm shadow-xl">
               <img src="nsclogo.svg" alt="Logo" className="h-10 w-10 brightness-0 invert" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
              Create an account
            </h1>
          </div>

          {/* Register Card */}
          <div className="relative">
            {/* Soft Glow Behind Card dengan aksen Orange */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-[24px] blur-xl opacity-50" />
            
            <div className="relative rounded-[24px] border border-white/10 bg-black/60 p-8 backdrop-blur-2xl">
              <form className="space-y-4" onSubmit={handleRegister}>

                {/* Full Name Field */}
                <div className="space-y-2">
                  <label className="text-[14px] font-bold text-gray-300 ml-1">Nama</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input 
                      type="text" required={true}
                      placeholder=""
                      value={username}
                      onChange={(e)=>
                        setUsername(e.target.value)
                      }
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
                      value={email}
                      onChange={(e)=>
                        setEmail(e.target.value)
                      }
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
                      value={phoneNo}
                      onChange={(e)=>
                        setPhoneNo(e.target.value)
                      }
                      className="w-full rounded-xl border border-white/5 bg-white/[0.05] py-3.5 pl-12 pr-4 text-sm transition-all focus:border-orange-500/50 focus:bg-white/[0.08] outline-none placeholder:text-gray-600"
                    />
                  </div>
                </div>

                {/* Company Name Field */}
                <div className="space-y-2">
                  <label className="text-[14px] font-bold text-gray-300 ml-1">Nama Perusahaan</label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input 
                      type="text" required={true}
                      placeholder=""
                      value={companyName}
                      onChange={(e)=>
                        setCompanyName(e.target.value)
                      }
                      className="w-full rounded-xl border border-white/5 bg-white/[0.05] py-3.5 pl-12 pr-4 text-sm transition-all focus:border-orange-500/50 focus:bg-white/[0.08] outline-none placeholder:text-gray-600"
                    />
                  </div>
                </div>

                {/* Job Title Field */}
                <div className="space-y-2">
                  <label className="text-[14px] font-bold text-gray-300 ml-1">Jabatan</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input 
                      type="text" required={true}
                      placeholder=""
                      value={jobTitle}
                      onChange={(e)=>
                        setJobTitle(e.target.value)
                      }
                      className="w-full rounded-xl border border-white/5 bg-white/[0.05] py-3.5 pl-12 pr-4 text-sm transition-all focus:border-orange-500/50 focus:bg-white/[0.08] outline-none placeholder:text-gray-600"
                    />
                  </div>
                </div>

                {/* Profession Field */}
                <div className="space-y-2">
                  <label className="text-[14px] font-bold text-gray-300 ml-1">Profesi</label>
                  <div className="relative">
                    <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input 
                      type="text" required={true}
                      placeholder=""
                      value={profession}
                      onChange={(e)=>
                        setProfession(e.target.value)
                      }
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
                      type={showPassword ? "text" : "password"}
                      placeholder="" required={true}
                      value={password}
                      onChange={(e)=>
                        setPassword(e.target.value)
                      }
                      className="w-full rounded-xl border border-white/5 bg-white/[0.05] py-3.5 pl-12 pr-12 text-sm transition-all focus:border-orange-500/50 focus:bg-white/[0.08] outline-none placeholder:text-gray-600"
                    />
                    <button type="button" 
                    onClick={toggleVisibility}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                        {showPassword ? (
                          <Eye size={16} />
                        ) : (
                          <EyeOff size={16} />
                        )}
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
                      type={showPasswordCnf ? "text" : "password"}
                      placeholder=""
                      value={passwordConfirmed}
                      onChange={confirmPassword}
                      className="w-full rounded-xl border border-white/5 bg-white/[0.05] py-3.5 pl-12 pr-12 text-sm transition-all focus:border-orange-500/50 focus:bg-white/[0.08] outline-none placeholder:text-gray-600"
                    />
                    <button type="button" 
                    onClick={toggleVisibilityCnf}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                        {showPasswordCnf ? (
                          <Eye size={16} />
                        ) : (
                          <EyeOff size={16} />
                        )}
                    </button>
                  </div>
                  {iserrPasswordCnf ? (
                      <div className="flex items-center gap-2 text-gray-500 text-[12px] font-bold">
                        <CircleX size={16} className="text-red-500" /><span>Konfirmasi password tidak sesuai</span>
                      </div>
                  ) : ( 
                    <div></div>
                  )}
                </div>

                {/* Terms and Condition */}
                <div className="space-y-2 text-[12px] text-gray-300 ml-1">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" required={true} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    &nbsp;Saya menyetujui&nbsp;<span className="ml-3 hover:text-orange-400 font-medium" onClick={termsHandler}>Kebijakan Privasi</span>&nbsp;yang berlaku
                  </label>
                </div>

                {/* Submit Button */}
                <button type="submit" className="relative mt-4 w-full group overflow-hidden rounded-xl bg-orange-500 px-4 py-3.5 text-sm font-bold text-black transition-all hover:bg-orange-400 active:scale-[0.98] shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                  <div className="flex items-center justify-center gap-2">
                    SIGN UP
                    <UserPlus size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </div>
                </button>

              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-400">
                  Already have an account? {" "}
                  <Link href="/login" className="text-orange-500 hover:text-orange-400 hover:underline underline-offset-4 font-bold transition-colors">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>


          {/* <div>
            <h1>Contact Us</h1>
            <ContactForm />
          </div> */}

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <DialogInfo title="" caption={`Registrasi telah berhasil. Silahkan cek email Anda ( ${email} ) untuk melakukan verifikasi.`} onSuccess={() => {window.location.href='/'}} />
          </Modal>

          <Modal isOpen={isModalOpen2} onClose={() => setIsModalOpen2(false)}>
            <DialogInfo title="" caption="Registrasi Anda gagal. User telah terdaftar." onSuccess={() => {window.location.href='/register'}} />
          </Modal>

          <ModalPrivacy isOpen={isModalPrivacyOpen} onClose={() => setIsModalPrivacyOpen(false)}>
            <PrivacyInfo title="" onSuccess={() => setIsModalPrivacyOpen(false)} />
          </ModalPrivacy>

          {/* Footer Info */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-col items-center gap-6"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md">
              <ShieldCheck size={14} className="text-orange-500" />
              <span className="text-[11px] font-bold text-gray-400 tracking-tight">Your data is protected</span>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}