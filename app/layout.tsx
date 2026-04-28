import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        <main className="flex-1">{children}</main>

        <footer className="border-t border-slate-800 text-slate-400 text-center py-6">
          Built with Next.js + FastAPI + Groq AI
        </footer>
      </body>
    </html>
  );
}