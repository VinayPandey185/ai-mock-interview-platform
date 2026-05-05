"use client";

import { useSearchParams } from "next/navigation";

export default function Dashboard() {
  const params = useSearchParams();

  const role = params.get("role") || "Interview";
  const date = params.get("date") || "";
  const result = params.get("result") || "";

  const parseReport = (report: string) => {
    const scoreMatch = report.match(/Score:\s*(.*)/i);
    const score = scoreMatch
      ? scoreMatch[1].replace(/\*\*/g, "").trim()
      : "AI Rated";

    const feedbackMatch = report.match(/Feedback:\s*([\s\S]*?)Suggestions:/i);
    const feedback = feedbackMatch
      ? feedbackMatch[1].split("\n").filter((l) => l.trim())
      : [];

    const suggestionsMatch = report.match(/Suggestions:\s*([\s\S]*)/i);
    const suggestions = suggestionsMatch
      ? suggestionsMatch[1].split("\n").filter((l) => l.trim())
      : [];

    return { score, feedback, suggestions };
  };

  const { score, feedback, suggestions } = parseReport(result);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8">

      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">Interview Report</h1>
          <p className="text-slate-400">Your AI evaluation summary</p>
        </div>

        {/* Header (Role + Date) */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{role}</h2>
          <p className="text-slate-400">{date}</p>
        </div>

        {/* Score Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-slate-400 text-sm">Final Score</p>
            <h3 className="text-4xl font-bold text-blue-400 mt-2">
              {score}
            </h3>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-slate-400 text-sm">Questions</p>
            <h3 className="text-4xl font-bold mt-2">5</h3>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-slate-400 text-sm">Status</p>
            <h3 className="text-green-400 font-bold mt-2">Completed</h3>
          </div>

        </div>

        {/* Feedback */}
        <div className="space-y-6">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-green-400 font-semibold mb-3">Feedback</h3>
            {feedback.map((f, i) => (
              <p key={i}>• {f}</p>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-yellow-400 font-semibold mb-3">Suggestions</h3>
            {suggestions.map((s, i) => (
              <p key={i}>• {s}</p>
            ))}
          </div>

        </div>

      </div>
    </main>
  );
}