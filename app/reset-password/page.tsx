"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Mail,
  Lock,
  KeyRound,
  ChevronLeft,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirm?: string;
  }>({});

  const clearError = (key: keyof typeof errors) => {
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSendCode = () => {
    if (!email.trim()) {
      setErrors((prev) => ({
        ...prev,
        email: "Email is required to send code",
      }));
    } else {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
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
    }
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-black text-gray-200 selection:bg-orange-500/30 overflow-hidden font-sans">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(24,24,27,1),rgba(0,0,0,1))]" />
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-600/20 blur-[120px] rounded-full animate-pulse" />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-600/10 blur-[120px] rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="absolute top-12 left-8 md:left-12 z-20">
        <Link
          href="/login"
          className="group flex items-center gap-2.5 text-xs font-medium tracking-wide text-gray-400 transition-all hover:text-orange-400"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/5 bg-white/5 transition-colors group-hover:bg-orange-500/10 group-hover:border-orange-500/30 group-hover:text-orange-400">
            <ChevronLeft size={16} />
          </div>
          Back to login
        </Link>
      </div>

      <section className="relative z-10 w-full max-w-[420px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-10 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
              <KeyRound className="text-orange-500" size={24} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
              Set New Password
            </h1>
            <p className="text-gray-400 text-sm">
              Please verify your identity and set a new password.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-[24px] blur-xl opacity-50" />
            <div className="relative rounded-[24px] border border-white/10 bg-black/60 p-8 backdrop-blur-2xl">
              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-300 ml-1">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                      size={18}
                    />
                    <input
                      type="email"
                      value={email}
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
                <div className="space-y-2">
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
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-300 ml-1">New Password</label>
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
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-[11px] font-bold flex items-center gap-1 mt-1 ml-1"><AlertCircle size={12} /> {errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-300 ml-1">Confirm Password</label>
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
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
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

          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md">
              <ShieldCheck size={14} className="text-orange-500" />
              <span className="text-[11px] font-medium text-gray-400">
                Secure encrypted reset
              </span>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
