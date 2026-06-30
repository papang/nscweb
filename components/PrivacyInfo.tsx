// components/Form.tsx
"use client";


interface PrivacyInfoProps {
  title: string;
  onSuccess: () => void;
}

export default function PrivacyInfo(
  { title, onSuccess }: PrivacyInfoProps
) {
  async function handleSubmit(formData: FormData) {
    // const email = formData.get("email");
    
    // Simulate API call or trigger your Server Action
    // console.log("Submitting:", email);
    
    onSuccess(); // Close modal on success
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4 border-orange-500 w-128">
      <h2 className="text-xl font-bold text-gray-400 ml-3">{title}</h2>
      
      <div className="h-64 overflow-y-auto">
        <h2><b>KEBIJAKAN PRIVASI</b></h2><br/>
        <h3><b>1. Pendahuluan</b></h3>
        <p>
          Kami ("PT NUSANTARA STAR CONNECT") menghormati dan melindungi data pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, 
          menggunakan, mengungkapkan, dan melindungi data pribadi Anda saat Anda menggunakan layanan kami. Kebijakan ini disusun berdasarkan ketentuan &nbsp;
          <b>Undang-Undang Nomor 27 Tahun 2022</b> tentang Pelindungan Data Pribadi (UU PDP).
        </p><br/>
        <h3><b>2. Perekaman Data Pribadi</b></h3>
        <p>
          Kami dapat mengumpulkan data pribadi Anda yang bersifat umum maupun spesifik, meliputi:<br/>
          <b>Data Umum</b>: Nama lengkap, alamat, tanggal lahir, nomor telepon, dan alamat email.<br/>
          <b>Data Teknis</b>: Alamat IP, data cookies, informasi perangkat, dan riwayat penelusuran.<br/>
          <b>Data Spesifik</b> (Jika diperlukan layanan tertentu): Data keuangan pribadi, informasi kesehatan, atau biometrik, 
          dengan persetujuan eksplisit Anda.
        </p><br/>
        <h3><b>3. Tujuan Pemrosesan Data Pribadi</b></h3>
        <p>
          Kami mengumpulkan dan memproses data pribadi Anda untuk tujuan berikut:<br/>
          Memproses pendaftaran dan menyediakan layanan/produk yang Anda minta.<br/>
          Memverifikasi identitas Anda.Mengirimkan pembaruan, informasi promosi, atau notifikasi terkait layanan.<br/>
          Menganalisis penggunaan layanan untuk meningkatkan kualitas produk kami.
        </p><br/>
        <h3><b>4. Dasar Hukum Pemrosesan Data</b></h3>
        <p>
          Kami memproses data pribadi Anda berdasarkan:<br/>
          <b>Persetujuan</b>: Anda telah memberikan persetujuan eksplisit yang sah untuk satu atau beberapa tujuan tertentu.<br/>
          <b>Pemenuhan Kewajiban Hukum</b>: Pemrosesan diperlukan untuk mematuhi kewajiban hukum kami.<br/>
          <b>Pelaksanaan Kontrak</b>: Diperlukan untuk melaksanakan perjanjian antara Anda dan kami.<br/>
        </p><br/>
        <h3><b>5. Pengungkapan dan Transfer Data Pribadi</b></h3>
        <p>
          Kami tidak akan membagikan, menjual, atau mengungkapkan data pribadi Anda kepada pihak ketiga mana pun, kecuali:<br/>
          -Kepada mitra atau penyedia layanan yang membantu operasional kami (dengan kewajiban kerahasiaan yang ketat).<br/>
          -Untuk mematuhi hukum atau perintah pengadilan yang sah.
        </p><br/>
        <h3><b>6. Hak Subjek Data Pribadi</b></h3>
        <p>
          Berdasarkan UU PDP, Anda memiliki hak untuk: <br/>
          1. Mendapatkan informasi tentang kejelasan identitas dan tujuan pemrosesan Data Pribadi Anda. <br/>
          2. Mengakses dan meminta salinan Data Pribadi Anda.<br/>
          3. Memperbaiki atau melengkapi kesalahan dalam Data Pribadi Anda.<br/>
          4. Menarik kembali persetujuan pemrosesan Data Pribadi Anda.<br/>
          5. Meminta penghapusan atau pemusnahan Data Pribadi Anda jika tidak lagi diperlukan.<br/>
          6. Mengajukan keberatan atas tindakan pengambilan keputusan yang murni otomatis.<br/>
        </p><br/>
        <h3><b>7. Keamanan Data Pribadi</b></h3>
        <p>
          Kami menerapkan langkah-langkah pengamanan teknis dan administratif yang sesuai untuk melindungi data pribadi Anda dari akses, 
          pengungkapan, perubahan, atau penghancuran yang tidak sah.
        </p><br/>
        <h3><b>8. Perubahan Kebijakan Privasi</b></h3>
        <p>
          Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Pembaruan akan berlaku segera setelah dipublikasikan pada platform kami. 
          Kami menyarankan Anda untuk meninjau halaman ini secara berkala.
        </p><br/>
      </div>

      <div className="flex flex-col gap-1 items-center">
        <button type="submit" className="font-semibold rounded-lg px-5 py-2 text-orange-500 hover:text-white" >OK</button>
      </div>
      
    </form>
  );
}
