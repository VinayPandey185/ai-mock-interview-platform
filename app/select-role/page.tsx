"use client";

import { useRouter } from "next/navigation";

export default function SelectRole() {
  const router = useRouter();

  const roles = [
    {
      title: "Python Developer 🐍",
      desc: "Backend logic, APIs, Flask, FastAPI.",
    },
    {
      title: "Frontend Developer 💻",
      desc: "React, Next.js, UI design, JavaScript.",
    },
    {
      title: "Data Analyst 📊",
      desc: "SQL, Excel, Power BI, dashboards.",
    },
    {
      title: "HR Interview 🧑‍💼",
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
    <main className="relative min-h-screen bg-slate-950 text-white px-4 py-10 md:px-8">

      {/* Background */}
      <div className="absolute inset-0 opacity-10 bg-[url('/bg-ai.png')] bg-cover bg-center pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Choose Your Role
          </h1>

          <p className="text-slate-400 mt-3 text-lg max-w-2xl mx-auto leading-7">
            Choose a role and begin your personalized AI interview experience.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {roles.map((role, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 flex flex-col justify-between hover:border-blue-500 hover:-translate-y-1 transition duration-300 shadow-xl"
            >

              <div>
                <h2 className="text-xl md:text-2xl font-semibold">
                  {role.title}
                </h2>

                <p className="text-slate-400 mt-3 leading-7 text-sm md:text-base">
                  {role.desc}
                </p>
              </div>

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