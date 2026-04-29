"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function InterviewPage() {
  const router = useRouter();
  const params = useSearchParams();

  const role = params.get("role") || "Software Engineer";

  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>(Array(5).fill(""));
  const [count, setCount] = useState(0);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const progress = ((count + 1) / 5) * 100;

  const loadQuestions = async () => {
    const res = await fetch(
      `http://127.0.0.1:8000/question?role=${encodeURIComponent(role)}`
    );

    const data = await res.json();
    setQuestions(data.questions);
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    setAnswer(answers[count] || "");
  }, [count]);

  const submitAnswer = async () => {
    if (!answer.trim()) {
      alert("Please type answer");
      return;
    }

    const updatedAnswers = [...answers];
    updatedAnswers[count] = answer;
    setAnswers(updatedAnswers);

    if (count < 4) {
      setCount(count + 1);
      return;
    }

    setLoading(true);

    const fullInterview = questions
      .map((q, i) => {
        return `Question: ${q}\nAnswer: ${updatedAnswers[i]}`;
      })
      .join("\n\n");

    const res = await fetch("http://127.0.0.1:8000/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer: fullInterview,
        role: role,
      }),
    });

    const data = await res.json();

    router.push(
      `/dashboard?result=${encodeURIComponent(data.result)}`
    );
  };

  const goBack = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[count] = answer;
    setAnswers(updatedAnswers);

    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header... */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-8">
          <div>
            <h1 className="text-4xl font-bold">{role}</h1>

            <p className="text-slate-400 mt-2">
              Question {count + 1} of 5
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

            <Link href="/select-role">
              <button className="border border-slate-700 bg-slate-900 hover:bg-blue-500 px-5 py-3 rounded-2xl font-semibold transition">
                Change Role
              </button>
            </Link>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-3 mb-8">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-xl">
          <p className="text-blue-400 font-semibold uppercase text-sm tracking-wide">
            Interview Question
          </p>

          <p className="mt-4 text-xl md:text-2xl leading-9">
            {questions[count] || "Loading..."}
          </p>

          <textarea
            rows={7}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your professional answer here..."
            className="w-full mt-8 p-5 rounded-2xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-3 mt-6 flex-wrap">
            {count > 0 && (
              <button
                onClick={goBack}
              className="bg-blue-500 hover:bg-blue-600 px-7 py-3 rounded-2xl shadow-lg font-semibold transition"
              >
                Back
              </button>
            )}

            <button
              onClick={submitAnswer}
              className="bg-blue-500 hover:bg-blue-600 px-7 py-3 rounded-2xl shadow-lg font-semibold transition"
            >
              {count < 4
                ? "Next Question"
                : loading
                ? "Evaluating..."
                : "Finish Interview"}
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}