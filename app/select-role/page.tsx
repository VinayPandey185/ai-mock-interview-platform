"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SelectRole() {
  const router = useRouter();

  const roles = [
    {
      title: "Python Developer 🐍",
      desc: "Backend logic, APIs, Flask, FastAPI.",
    },
    {
      title: "Frontend Developer 💻",
      desc: "React, Next.js,UI design, JavaScript.",
    },
    {
      title: "Data Analyst 📊",
      desc: "SQL, Excel, Power BI, dashboards.",
    },
    {
      title: "HR Interview 🧑💼",
      desc: "Behavioral rounds, communication.",
    },
    {
      title: "Java Developer 🏗️",
      desc: "OOP, Spring Boot, backend systems.",
    },
    {
      title: "Software Engineer 👨‍💻",
      desc: "DSA, problem solving, system basics.",
    },
  ];

  const startInterview = (role: string) => {
    router.push(`/interview?role=${encodeURIComponent(role)}`);
  };

  return (
    <main className="relative min-h-screen bg-slate-950 text-white p-4 md:p-8">
      <div className="absolute inset-0 opacity-10 bg-[url('/bg-ai.png')] bg-cover bg-center pointer-events-none"></div>
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-10">
          <div>
            <h1 className="text-5xl font-bold">
              Choose Your Role
            </h1>

            <p className="text-slate-400 mt-2 text-lg">
              Select a role and start your AI-powered interview practice.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-3">
            <Link href="/">
              <button className="border border-slate-700 bg-slate-900 hover:bg-blue-500 px-5 py-3 rounded-2xl font-semibold transition">
                Home
              </button>
            </Link>

            <Link href="/history">
              <button className="border border-slate-700 bg-slate-900 hover:bg-blue-500 px-5 py-3 rounded-2xl font-semibold transition">
                History
              </button>
            </Link>
          </div>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-7">
          {roles.map((role, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-7 hover:border-blue-500 hover:-translate-y-1 transition duration-300 shadow-xl"
            >
              <div className="text-4xl">{role.icon}</div>

              <h2 className="text-2xl font-semibold mt-4">
                {role.title}
              </h2>

              <p className="text-slate-400 mt-3 leading-7">
                {role.desc}
              </p>

              <button
                onClick={() => startInterview(role.title)}
                className="mt-6 bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-2xl shadow-lg font-semibold transition w-full"
              >
                Start Interview
              </button>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}