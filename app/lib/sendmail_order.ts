'use server'; 

import { Resend } from 'resend';
import bcrypt from "bcryptjs";
import { formatDecimal } from '@/app/utils/format';

interface sendmailProps {
  name: string, 
  email: string, 
  orders: any, 
}

export async function sendmail_order({name, email, orders}: sendmailProps) {
  const email_sales = process.env.EMAIL_ADDR_SALES || "";
  let message = `
    <div style='border-radius: 10px; width: 800px; height: 50px; background-color: #cddeef; text-align: center; padding-top:5px;'>
      <h2>Konfirmasi Pesanan</h2>
    </div>
    <div style='width: 800px; padding: 10px; margin-top: 10px;'>
      <p>
        Bapak/Ibu ${name}, 
      </p>
      <p>
        Terima kasih telah melakukan pemesananan melalui <b>Website Portal NSC</b>.
        Pesanan Anda telah tercatat dan Tim Sales kami akan menindaklanjuti. 
      </p>
    </div>

    <div style='width: 800px; padding: 10px; margin-top: 10px;'> 
    <p>Berikut rincian pesanan Anda : </p>
    <table style='width: 800px'>
    <tr style='background-color: #f2f2f2;'><th>Produk</th><th>Detail Spesifikasi</th><th>Harga</th></tr>
  `;

  let total =0;
  for (const key in orders) {
    const item = orders[key];
    total = total + Number(item.sales_price);
    message = message + "<tr style='border-bottom: 1px solid #333'>";
    message = message + "<td><b style='font-size:14px'>" + item.net_service_name + "</b><br /><b>" + item.sku_name + "</b></td>";
    message = message + "<td>" + item.territory_name + " - " + item.service_bw_name + "<br />";
    if(item.charge_type_code == "MRC") {
      message = message + "UP: " + item.spec_attributes.mir_up + " - DOWN: " + item.spec_attributes.mir_down ;
    }
    message = message + "</td>";
    message = message + "<td align='right'><b>Rp " + formatDecimal(item.sales_price) + "</b></td></tr>";
  }

  message = message + "<tr style='background-color: #939190;'><td colspan='2' align='center'><b>Total</b></td><td align='right'><b>Rp " + formatDecimal(total) + "</b></td></tr>";

  message = message + "</table>";
  message = message + "</div>";

  const resend = new Resend();

  const { data, error } = await resend.emails.send({
    from: 'NSC <'+process.env.SMTP_USER+'>',
    to: [email],
    cc: [email_sales],
    subject: '[NSC] Konfirmasi Pesanan',
    html: message,
  });

  if(error) {
    console.error(error);
    return { success: false, message: (JSON.stringify(error) + JSON.stringify(data)) };
  }

  return { success: true, message: 'Email sent successfully!' };

}