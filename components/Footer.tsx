import Link from "next/link";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { sendmail_newsletter_cust, sendmail_newsletter_sales } from "@/app/lib/sendmail_newsletter";
import Swal from "sweetalert2";

export default function Footer() {
  const hndlrRequestNewsLetter = async () => {
    
    const resEmail = await sendmail_newsletter_cust({
      name:"", email:email
    });

    const resEmailSales = await sendmail_newsletter_sales({
      name:"", email:email
    });


    if (resEmail.success) {
      console.log("Email sent successfully:", resEmail.message);
      Swal.fire("Terimakasih!", "Permintaan anda telah dikirim. Tim Kami akan segera menghubungi Anda melalui email.", "success");
    } else {
      console.error("Failed to send email:", resEmail.message);
    }
    
  };

  const [email, setEmail] = useState("");
  return (
    <footer className="w-full bg-black px-8 py-12 md:px-16 lg:px-24 border-t border-white/10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
        
        {/* Top Section: Links & Newsletter */}
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          
          <div className="flex flex-wrap items-center gap-6 text-[13px] font-bold text-white">
            <Link href="/career" className="transition-colors hover:text-orange-500">Karir</Link>
            <Link href="/partner" className="transition-colors hover:text-orange-500">Partner Kami</Link>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
            <span className="text-[13px] font-bold text-white">
              Ingin terus menerima informasi terbaru NSC?
            </span>
            <div className="flex items-end gap-4">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email" 
                className="w-full border-b border-gray-600 bg-transparent pb-1 pt-2 text-[13px] text-white outline-none transition-colors focus:border-orange-500 placeholder:text-gray-600 lg:w-48"
              />
              <button 
                onClick={() => {
                  if (!email) {
                    alert("Silakan masukkan alamat email Anda.");
                    return;
                  }
                  hndlrRequestNewsLetter(); 
                }}
                className="group flex items-center gap-1 text-[12px] font-bold text-white transition-colors hover:text-orange-500"
                >
                DAFTAR
                <svg className="h-3 w-3 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Middle Section: Address */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex items-start gap-3 text-gray-400">
            <MapPin size={16} className="mt-1 flex-shrink-0 text-orange-500" />
            <div className="flex flex-col text-[12px] leading-relaxed">
              <span className="font-bold text-white mb-1">Kantor Pusat</span>
              <p className="max-w-xl font-medium">
                Grand Fatmawati Mas Blok I Nomor 108, Jl. RS Fatmawati Nomor 20, 
                Kelurahan Cilandak Barat, Kecamatan Cilandak, Kota Jakarta Selatan, 
                Provinsi Daerah Khusus Ibukota Jakarta 12430
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 lg:flex-row lg:items-center">

          <div className="flex flex-wrap items-center gap-4 text-[12px] text-gray-400 font-medium">
            <span>© 2026 PT Nusantara Star Connect (NSC)</span>
            <span className="hidden lg:block text-gray-700">|</span>
            <span>
              Internet Cepat Sampai Pelosok Negeri
            </span>
          </div>

          {/* <div className="text-[12px] text-gray-400 font-medium">
            Dengan mengeklik Daftar, Anda menyetujui{" "}
            <a href="#" className="font-bold text-white transition-colors hover:text-orange-500">
              Kebijakan Privasi
            </a>{" "}
            kami
          </div> */}

        </div>
      </div>
    </footer>
  );
}