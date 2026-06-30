'use server'; 

import nodemailer from 'nodemailer';
import bcrypt from "bcryptjs";

export async function sendEmail(name, email) {
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

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    proxy: process.env.HTTP_PROXY,
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email, 
      replyTo: email,
      subject: 'Registrasi Akun NSC',
      html: message,
    });
    return { success: true, message: 'Email sent successfully!' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to send email.' };
  }
}