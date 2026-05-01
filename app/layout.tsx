import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Mock Interview",
  description: "Practice interviews with AI feedback and improve confidence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-white">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1">{children}</main>

      {/* Footer */}       

    <footer className="px-6 md:px-8 py-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs md:text-sm text-slate-400">
        <p>© {new Date().getFullYear()} AI Mock Interview</p>
        <p className="hidden md:block text-center">
        Practice smarter. Get hired faster.
        </p>
        <p className="text-center">
        Built with Next.js + FastAPI + AI
        </p>
      </div>
    </footer>

      </body>
    </html>
  );
}