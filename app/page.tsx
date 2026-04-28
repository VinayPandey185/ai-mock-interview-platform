import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      
{/* Navbar */}
<nav className="flex justify-between items-center px-8 py-5 border-b border-slate-800">
  <Link href="/">
    <h1 className="text-2xl font-bold text-blue-400 cursor-pointer">
      AI Mock Interview
    </h1>
  </Link>
</nav>

      {/* Hero */}
<section className="relative overflow-hidden max-w-6xl mx-auto px-8 py-28 text-center">

  {/* Background Image */}
  <div className="absolute inset-0 opacity-15 bg-[url('/bg-ai.png')] bg-center bg-no-repeat bg-cover pointer-events-none"></div>

  {/* Content */}
  <div className="relative z-10">

    <p className="text-blue-400 font-semibold tracking-widest uppercase mb-4">
      AI Powered Career Practice
    </p>

    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-5xl mx-auto">
      Crack Interviews With
      <span className="text-blue-400"> Smart AI Coaching</span>
    </h2>

    <p className="text-slate-400 text-lg md:text-xl mt-8 max-w-3xl mx-auto leading-8">
      Practice real interview rounds, receive instant AI feedback,
      improve confidence, and get job-ready faster.
    </p>

    <div className="mt-12 flex justify-center gap-5 flex-wrap">
      <Link href="/select-role">
        <button className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg transition shadow-lg">
          Start Free Interview
        </button>
      </Link>

      <Link href="/history">
        <button className="border border-slate-700 bg-slate-900 hover:bg-blue-500 px-8 py-4 rounded-2xl font-semibold text-lg transition">
          View History
        </button>
      </Link>
    </div>

  </div>

</section>


      {/* Features */}
      <section className="max-w-6xl mx-auto px-8 pb-24 grid md:grid-cols-3 gap-7">

  <div className="bg-white/5 backdrop-blur-sm p-7 rounded-3xl border border-white/10">
    <h3 className="text-xl font-semibold">AI Feedback</h3>
    <p className="text-slate-400 mt-3 leading-7">
      Instant scoring, strengths, and personalized suggestions.
    </p>
  </div>

  <div className="bg-white/5 backdrop-blur-sm p-7 rounded-3xl border border-white/10">
    <h3 className="text-xl font-semibold">Role Based Practice</h3>
    <p className="text-slate-400 mt-3 leading-7">
      Python, Frontend, Analyst, HR and more roles.
    </p>
  </div>

  <div className="bg-white/5 backdrop-blur-sm p-7 rounded-3xl border border-white/10">
    <h3 className="text-xl font-semibold">Real Experience</h3>
    <p className="text-slate-400 mt-3 leading-7">
      Multi-round mock interview simulation experience.
    </p>
  </div>

</section>
   </main>
  );
}