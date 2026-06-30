import "./globals.css";
import Navbar from "@/components/Navbar";
import { VercelToolbar } from '@vercel/toolbar/next';

export const metadata = {
  title: "NSC",
  description: "Clone by NSC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="bg-black text-white antialiased" suppressHydrationWarning>
        <Navbar />
        {children}

        <VercelToolbar />
      </body>
    </html>
  );
}