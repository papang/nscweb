'use server'; 

import { Resend } from 'resend';
import bcrypt from "bcryptjs";
// import { ProxyAgent } from 'proxy-agent';

interface sendmailProps {
  name: string, 
  email: string, 
}

export async function sendmail({name, email}: sendmailProps) {
  const hash = await bcrypt.hash((process.env.SALT_KEY + email),10);
  const strURL = process.env.BASE_URL + "/api/auth/verify?u=" + email + "&h=" + hash;

  const message = `
    <div style='border-radius: 10px; width: 500px; height: 80px; background-color: #cddeef; text-align: center; padding-top:25px;'>
      <h2>Registrasi Sukses</h2>
    </div>
    <div style='width: 500px; padding: 10px; margin-top: 10px;'>
      <p>
        Halo, <b>${name}</b>
      </p>
      <p>
        Terima kasih telah melakukan registrasi ke <b>Website Portal NSC</b>.
        Untuk melanjutkan proses sign-in, silahkan klik tautan verifikasi dibawah ini.
      </p>
      <div style='border-radius: 3px; width: 200px; height: 50px; background-color: #043260; text-align: center; padding-top: 15px; margin-left:150px;'>
        <a href='${strURL}' target='_blank' style='color:#dd9716; font-weight:bold;' onmouseover="this.style.font-weight='normal'; this.style.decoration='underline'">Verifikasi</a>
      </div>
    </div>
  `;

  // const proxyUrl = process.env.HTTP_PROXY;

  const resend = new Resend();
  // const resend = new Resend('re_jGBb2qKK_NAWQ13P1ekVBtsdFLahtd9c3');

  const { data, error } = await resend.emails.send({
    from: 'NSC <'+process.env.SMTP_USER+'>',
    to: [email],
    subject: 'Registrasi Akun NSC',
    html: message,
  });

  if(error) {
    console.error(error);
    return { success: false, message: (JSON.stringify(error) + JSON.stringify(data)) };
  }

  return { success: true, message: 'Email sent successfully!' };

}