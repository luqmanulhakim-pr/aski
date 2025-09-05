import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import FloatingChat from "@/components/features/chatbot/FloatingChat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ASKI | Asisten Kesehatan Interaktif",
  description:
    "Asisten Kesehatan Interaktif untuk membantu Anda mengenali berbagai macam penyakit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
        <FloatingChat />
      </body>
    </html>
  );
}
