'use server'; 

import { Resend } from 'resend';
import bcrypt from "bcryptjs";
import { formatDecimal } from '@/app/utils/format';

interface sendmailProps {
  name: string, 
  email: string, 
}

export async function sendmail_newsletter_cust({name, email}: sendmailProps) {
  const email_sales = process.env.EMAIL_ADDR_SALES || "";
  let message = `
    <div style='width: 800px; padding: 10px; margin-top: 10px;'>
      <p>
        Bapak/Ibu ${name} Yang Terhormat, 
      </p>
      <p>
        Terima kasih sudah berminat untuk tetap update dengan berlangganan newsletter kami.<br/>
        Nantikan informasi terbaru dari NSC. 
      </p>
    </div>
    <div style='width: 800px; padding: 10px; margin-top: 5px;'> 
  `;

  message = message + "<p style='margin-top: 20px;'>";
  message = message + "Hormat Kami, <br/><br/><br/>";
  message = message + "<b>PT NUSANTARA STAR CONNECT</b>";
  message = message + "</p>";
  message = message + "</div>";

  const resend = new Resend();

  const { data, error } = await resend.emails.send({
    from: 'NSC <'+process.env.SMTP_USER+'>',
    to: [email],
    subject: 'Terimakasih telah berlangganan newsletter NSC',
    html: message,
  });

  if(error) {
    console.error(error);
    return { success: false, message: (JSON.stringify(error) + JSON.stringify(data)) };
  }

  return { success: true, message: 'Email sent successfully!' };

}

export async function sendmail_newsletter_sales({name, email}: sendmailProps) {
  const email_sales = process.env.EMAIL_ADDR_SALES || "";
  let message = `
    <div style='width: 800px; padding: 10px; margin-top: 10px;'>
      <p>
        Dear Sales Team, 
      </p>
      <p>
        Terdapat Calon Pelanggan Baru yang berminat Berlangganan Newsletter dengam informasi sebagai berikut :
      </p>
      <p>
        Email : <b> ${email} </b>
      </p>
      <br/>
      <p>
        Mohon tindak lanjut untuk menghubungi calon pelanggan tersebut.
      </p>
    </div>
    <div style='width: 800px; padding: 10px; margin-top: 5px;'> 
  `;

  message = message + "<p style='margin-top: 20px;'>";
  message = message + "Terimakasih, <br/><br/><br/>";
  message = message + "<b>PT NUSANTARA STAR CONNECT</b>";
  message = message + "</p>";
  message = message + "</div>";

  const resend = new Resend();

  const { data, error } = await resend.emails.send({
    from: 'NSC <'+process.env.SMTP_USER+'>',
    to: [email_sales],
    subject: '[Newsletter] Terdapat Calon Pelanggan Baru yang Berlangganan Newsletter - ' + email,
    html: message,
  });

  if(error) {
    console.error(error);
    return { success: false, message: (JSON.stringify(error) + JSON.stringify(data)) };
  }

  return { success: true, message: 'Email sent successfully!' };

}