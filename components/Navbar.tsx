"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isInterview = pathname.startsWith("/interview");
  const isDashboard = pathname.startsWith("/dashboard");
  const isHistory = pathname === "/history";

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b border-slate-800 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50">

      {/* Logo */}
      <Link href="/" className="text-xl md:text-2xl font-bold tracking-tight">
        <span className="text-blue-400">AI</span>{" "}
        <span className="text-white">Mock Interview</span>
      </Link>

      {/* Right Side */}
      <div className="flex gap-3 items-center">

        {/* HOME PAGE */}
        {!isHome && !isInterview && !isDashboard && !isHistory && (
          <>
            <Link href="/">
              <button className="border border-slate-700 bg-slate-900 hover:bg-blue-500 px-4 py-2 rounded-xl transition">
                Home
              </button>
            </Link>

            <Link href="/history">
              <button className="border border-slate-700 bg-slate-900 hover:bg-blue-500 px-4 py-2 rounded-xl transition">
                History
              </button>
            </Link>
          </>
        )}

        {/* HISTORY PAGE */}
        {isHistory && (
          <>
            <Link href="/">
              <button className="border border-slate-700 bg-slate-900 hover:bg-blue-500 px-4 py-2 rounded-xl transition">
                Home
              </button>
            </Link>

            <Link href="/select-role">
              <button className="border border-slate-700 bg-slate-900 hover:bg-blue-500 px-4 py-2 rounded-xl transition">
                New Interview
              </button>
            </Link>
          </>
        )}

        {/* INTERVIEW PAGE */}
        {isInterview && (
          <>
            <Link href="/">
              <button className="border border-slate-700 bg-slate-900 hover:bg-blue-500 px-4 py-2 rounded-xl transition">
                Home
              </button>
            </Link>

            <Link href="/history">
              <button className="border border-slate-700 bg-slate-900 hover:bg-blue-500 px-4 py-2 rounded-xl transition">
                History
              </button>
            </Link>

            <Link href="/select-role">
              <button className="border border-slate-700 bg-slate-900 hover:bg-blue-500 px-4 py-2 rounded-xl transition">
                Change Role
              </button>
            </Link>
          </>
        )}

        {/* DASHBOARD PAGE */}
        {isDashboard && (
          <>
            <Link href="/">
              <button className="border border-slate-700 bg-slate-900 hover:bg-blue-500 px-4 py-2 rounded-xl transition">
                Home
              </button>
            </Link>

            <Link href="/history">
              <button className="border border-slate-700 bg-slate-900 hover:bg-blue-500 px-4 py-2 rounded-xl transition">
                History
              </button>
            </Link>

            <Link href="/select-role">
              <button className="border border-slate-700 bg-slate-900 hover:bg-blue-500 px-4 py-2 rounded-xl transition">
                New Interview
              </button>
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}