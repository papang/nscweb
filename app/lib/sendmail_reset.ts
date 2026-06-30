'use server'; 

import { Resend } from 'resend';
import { encryptData } from '@/app/utils/crypto';
import bcrypt from "bcryptjs";
// import { ProxyAgent } from 'proxy-agent';

interface sendmailProps {
  name: string, 
  email: string, 
}

export async function sendmail_reset({name, email}: sendmailProps) {
  const hash = await bcrypt.hash((process.env.SALT_KEY + email),10);

  const now = new Date().toLocaleString();

  const SECRET_KEY = 'NSC-KEY';
  const encmsg = {
    "name": name,
    "email": email,
    "timestamp": Date.now()
  }
  const encryptedVal1 = Buffer.from(JSON.stringify(encmsg)).toString('base64'); 
  const encryptedVal2 = Buffer.from(encryptedVal1 + "{" + SECRET_KEY + "}").toString('base64'); 
  // encryptData(encmsg);
  const strURL = process.env.BASE_URL + "/login/reset?step=n&h=" + encryptedVal2;

  const message = `
    <div style='width: 500px; padding: 10px; margin-top: 10px;'>
      <p>
        Anda telah melakukan permintaan reset password.<br/>
        Untuk melanjutkan proses reset password, silahkan klik tautan dibawah ini.
      </p>
      <div style='border-radius: 3px; width: 200px; height: 50px; background-color: #c3611a; text-align: center; padding-top: 15px; margin-left:100px;'>
        <a href='${strURL}' target='_blank' style='color: #0c0b0a; font-weight:bold;' onmouseover="this.style.font-weight='normal'; this.style.decoration='underline'">Verifikasi</a>
      </div>
    </div>
  `;

  // const proxyUrl = process.env.HTTP_PROXY;

  const resend = new Resend();
  // const resend = new Resend('re_jGBb2qKK_NAWQ13P1ekVBtsdFLahtd9c3');

  const { data, error } = await resend.emails.send({
    from: 'NSC <'+process.env.SMTP_USER+'>',
    to: [email],
    subject: 'NSC - Reset Password',
    html: message,
  });

  if(error) {
    console.error(error);
    return { success: false, message: (JSON.stringify(error) + JSON.stringify(data)) };
  }

  return { success: true, message: 'Email sent successfully!' };

}