"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Ship, Building2 } from "lucide-react";

interface TerritoryModalProps {
  isOpen: boolean;
  productName?: string;
  onClose: () => void;
  onSelect: (territory: "M" | "L") => void;
}

/**
 * Modal pemilihan teritori (Maritim / Land).
 * Dipanggil dari halaman /product saat user menekan tombol "Pilih Produk".
 * Setelah user memilih salah satu, halaman akan diarahkan (redirect)
 * ke halaman baru /product/configure dengan query product & territory.
 */
export default function TerritoryModal({
  isOpen,
  productName,
  onClose,
  onSelect,
}: TerritoryModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-[24px] border border-white/10 bg-[#111111] p-8 shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 text-gray-500 hover:text-orange-500 transition-colors"
              aria-label="Tutup"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-black uppercase tracking-widest text-white mb-1">
              Pilih Teritori
            </h3>
            <p className="text-xs md:text-sm font-black uppercase tracking-[0.1em] transition-colors text-orange-500">
              {productName ?? ""}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              <button
                type="button"
                onClick={() => onSelect("M")}
                className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-6 hover:border-orange-500/60 hover:bg-orange-500/10 transition-all active:scale-95"
              >
                <Ship size={28} className="text-orange-500" />
                <span className="text-xs uppercase tracking-widest text-white">
                  Maritim
                </span>
              </button>
              <button
                type="button"
                onClick={() => onSelect("L")}
                className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-6 hover:border-orange-500/60 hover:bg-orange-500/10 transition-all active:scale-95"
              >
                <Building2 size={28} className="text-orange-500" />
                <span className="text-xs uppercase tracking-widest text-white">
                  Land
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}