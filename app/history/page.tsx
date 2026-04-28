"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Item = {
  id: number;
  role: string;
  score: string;
  report: string;
  date: string;
};

export default function HistoryPage() {
  const [history, setHistory] = useState<Item[]>([]);
  const [selected, setSelected] = useState("");

  const loadHistory = () => {
    fetch("http://127.0.0.1:8000/history")
      .then((res) => res.json())
      .then((data) => setHistory(data.history));
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

    setSelected("");
    loadHistory();
  };

  return (
    <main className="relative min-h-screen bg-slate-950 text-white p-4 md:p-8">
      <div className="absolute inset-0 opacity-5 bg-[url('/bg-ai.png')] bg-cover bg-center pointer-events-none"></div>
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-10">
          <h1 className="text-4xl font-bold">
            Interview History
          </h1>

          <div className="flex flex-wrap gap-3">
            <Link href="/">
              <button className="border border-slate-700 bg-slate-900 hover:bg-blue-500 px-5 py-3 rounded-2xl font-semibold transition">
                Home
              </button>
            </Link>

            <Link href="/select-role">
              <button className="border border-slate-700 bg-slate-900 hover:bg-blue-500 px-5 py-3 rounded-2xl font-semibold transition">
                New Interview
              </button>
            </Link>
          </div>
        </div>

        {/* Table */}
<div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-xl overflow-x-auto">          <table className="w-full">
            <thead className="bg-slate-800 text-left">
              <tr>
                <th className="p-4">Role</th>
                <th className="p-4">Score</th>
                <th className="p-4">Date</th>
                <th className="p-4">View</th>
                <th className="p-4">Delete</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-800"
                >
                  <td className="p-4">{item.role}</td>

                  <td className="p-4 text-blue-400 font-semibold">
                    {item.score}
                  </td>

                  <td className="p-4 text-slate-400">
                    {item.date}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => setSelected(item.report)}
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
                  <td
                    colSpan={5}
                    className="p-6 text-center text-slate-400"
                  >
                    No interview history found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Report View */}
        {selected && (
          <div className="mt-8 bg-white/5 backdrop-blur-sm p-4 md:p-8 rounded-3xl border border-white/10 shadow-xl whitespace-pre-line leading-8">
            {selected}
          </div>
        )}

      </div>
    </main>
  );
}