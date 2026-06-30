import { sendEmail } from '@/app/lib/sendEmail';

export default function ContactForm() {
  const handleSubmit = async (formData) => {
    const result = await sendEmail(formData.get("name"), formData.get("email"));
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  return (
    <form action={handleSubmit}>
      <input type="text" name="name" placeholder="Your Name" required />
      <input type="email" name="email" placeholder="Your Email" required />
      <textarea name="message" placeholder="Your Message" required />
      <button type="submit">Send Email</button>
    </form>
  );
}