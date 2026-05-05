"use client";

import { useEffect, useState } from "react";

type Item = {
  id: number;
  role: string;
  score: string;
  report: string;
  date: string;
};

export default function HistoryPage() {
  const [history, setHistory] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState<{
    role: string;
    date: string;
    report: string;
  } | null>(null);

  const loadHistory = () => {
    setLoading(true);

    fetch("http://127.0.0.1:8000/history")
      .then((res) => res.json())
      .then((data) => {
        setHistory(data.history);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const deleteRow = async (id: number) => {
    const confirmDelete = confirm("Delete this interview history?");
    if (!confirmDelete) return;

    await fetch(`http://127.0.0.1:8000/history/${id}`, {
      method: "DELETE",
    });

    setSelected(null);
    loadHistory();
  };

  const parseReport = (report: string) => {
    const scoreMatch = report.match(/Score:\s*(.*)/i);
    const score = scoreMatch ? scoreMatch[1] : "N/A";

    const feedbackMatch = report.match(/Feedback:\s*([\s\S]*?)Suggestions:/i);
    const feedback = feedbackMatch
      ? feedbackMatch[1]
          .split("\n")
          .filter((line) => line.trim() !== "")
      : [];

    const suggestionsMatch = report.match(/Suggestions:\s*([\s\S]*)/i);
    const suggestions = suggestionsMatch
      ? suggestionsMatch[1]
          .split("\n")
          .filter((line) => line.trim() !== "")
      : [];

    return { score, feedback, suggestions };
  };

  return (
    <main className="relative min-h-screen bg-slate-950 text-white p-4 md:p-8">
      <div className="absolute inset-0 opacity-5 bg-[url('/bg-ai.png')] bg-cover bg-center pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">
            Interview History
          </h1>
          <p className="text-slate-400 mt-2">
            Review your past interviews and track your progress
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <p className="text-center text-slate-400 mb-6">
            Loading history...
          </p>
        ) : (
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-xl overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800 text-left">
                <tr>
                  <th className="p-4">#</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Score</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">View</th>
                  <th className="p-4">Delete</th>
                </tr>
              </thead>

              <tbody>
                {history.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-t border-slate-800 hover:bg-white/5 transition"
                  >
                    <td className="p-4 text-slate-400">
                      #{index + 1}
                    </td>

                    <td className="p-4">{item.role}</td>

                    <td className="p-4 text-blue-400 font-semibold">
                      {item.score}
                    </td>

                    <td className="p-4 text-slate-400">
                      {item.date}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          setSelected({
                            role: item.role,
                            date: item.date,
                            report: item.report,
                          })
                        }
                        className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl font-semibold transition"
                      >
                        View
                      </button>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => deleteRow(item.id)}
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-semibold transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {history.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-400">
                      No interview history found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {selected && (() => {
          const { score, feedback, suggestions } = parseReport(selected.report);

          return (
            <div className="mt-8 space-y-6">

              {/* Header */}
              <div>
                <h2 className="text-2xl font-bold">{selected.role}</h2>
                <p className="text-slate-400">{selected.date}</p>
              </div>

              {/* Score */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-slate-400 text-sm">Final Score</p>
                <h3 className="text-4xl font-bold text-blue-400 mt-2">
                  {score}
                </h3>
              </div>

              {/* Feedback */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-green-400">
                  Feedback
                </h3>
                <ul className="space-y-2">
                  {feedback.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* Suggestions */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-yellow-400">
                  Suggestions
                </h3>
                <ul className="space-y-2">
                  {suggestions.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
              {/* Close Button */}
              <div className="text-right">
                <button
                  onClick={() => setSelected(null)}
                  className="bg-slate-600 hover:bg-slate-700 px-4 py-2 rounded-xl font-semibold transition"
                >
                  Close
                </button>
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 my-6"></div> 
            </div>
          );
        })()}
      </div>
    </main>
  );
}