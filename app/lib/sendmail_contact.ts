'use server'; 

import { Resend } from 'resend';
import bcrypt from "bcryptjs";
import { formatDecimal } from '@/app/utils/format';

interface sendmailProps {
  name: string, 
  email: string, 
  infos: any, 
}

export async function sendmail_contact({name, email, infos}: sendmailProps) {
  const email_sales = process.env.EMAIL_ADDR_SALES || "";
  let message = `
    <div style='width: 800px; padding: 10px; margin-top: 10px;'>
      <p>
        Bapak/Ibu ${infos.name}, 
      </p>
      <p>
        Terima kasih banyak sudah tertarik untuk menghubungi kami! Kami sangat senang bisa berdiskusi lebih lanjut dengan Anda.
        Kami siap membantu memberikan informasi lebih lanjut atau menjawab pertanyaan yang Anda miliki. 
      </p>
    </div>
    <div style='width: 800px; padding: 10px; margin-top: 5px;'> 
    <p>Berikut informasi yang sudah Anda sampaikan melalui kanal <b>Hubungi Kami</b>, </p>
    <table style='width: 800px'>
  `;

    message = message + `<tr><td>Nama </td><td>:</td><td> ${infos.name} </td></tr>`;
    message = message + `<tr><td>Email </td><td>:</td><td> ${infos.email} </td></tr>`;
    message = message + `<tr><td>No. HP </td><td>:</td><td> ${infos.phoneNo} </td></tr>`;
    message = message + `<tr><td>Alamat </td><td>:</td><td> ${infos.address_street} </td></tr>`;
    message = message + `<tr><td></td><td></td><td> ${infos.address_district} <br/> ${infos.postal} </td></tr>`;

  message = message + "</table>";
  message = message + "<p style='margin-top: 10px;'>";
  message = message + "Terima kasih dan semoga hari Anda menyenangkan.";
  message = message + "</p>";
  message = message + "<p style='margin-top: 20px;'>";
  message = message + "Hormat Kami, <br/><br/><br/>";
  message = message + "<b>PT NUSANTARA STAR CONNECT</b>";
  message = message + "</p>";
  message = message + "</div>";

  const resend = new Resend();

  const { data, error } = await resend.emails.send({
    from: 'NSC <'+process.env.SMTP_USER+'>',
    to: [email],
    cc: [email_sales],
    subject: '[NSC] Terimakasih telah menghubungi Kami',
    html: message,
  });

  if(error) {
    console.error(error);
    return { success: false, message: (JSON.stringify(error) + JSON.stringify(data)) };
  }

  return { success: true, message: 'Email sent successfully!' };

}