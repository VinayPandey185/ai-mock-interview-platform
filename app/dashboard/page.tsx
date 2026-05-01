"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const params = useSearchParams();

  const result = params.get("result") || "No result found";

  const scoreMatch = result.match(/Score:\s*(.*)/i);
  const score = scoreMatch ? scoreMatch[1] : "AI Rated";

  return (
    <main className="relative min-h-screen bg-slate-950 text-white p-4 md:p-8">

      <div className="absolute inset-0 opacity-10 bg-[url('/bg-ai.png')] bg-cover bg-center pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold">
            Interview Report
          </h1>
        <p className="text-slate-400 mt-2">
          Your AI evaluation summary
        </p>
      </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 shadow-xl">
            <p className="text-slate-400">Final Score</p>
            <h2 className="text-3xl md:text-5xl font-bold text-blue-400 mt-3">
              {score}
            </h2>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 shadow-xl">
            <p className="text-slate-400">Questions</p>
            <h2 className="text-3xl md:text-5xl font-bold mt-3">5</h2>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 shadow-xl">
            <p className="text-slate-400">Status</p>
            <h2 className="text-3xl font-bold text-green-400 mt-4">
              Completed
            </h2>
          </div>

        </div>

        {/* AI Full Result */}
        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-xl whitespace-pre-line leading-8 text-slate-200">
          {result}
        </div>

      </div>
    </main>
  );
}