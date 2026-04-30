"use client";

import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Navbar from "@/components/Navbar";
import { usePortfolio } from "@/hooks/usePortfolio";

export default function Home() {
  const { user, projects, skills, experience, loading, error } = usePortfolio();

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-emerald-500 font-mono animate-pulse">Loading experience...</div>
    </div>
  );

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-slate-400 selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />
      <Hero data={user} />
      <Experience data={experience} />
      <Projects data={projects} />
      <Skills data={skills} />
      
      <footer className="py-8 text-center text-sm font-mono mt-20">
        <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors">
          Built with Next.js, Tailwind CSS & Framer Motion
        </a>
      </footer>
    </main>
  );
}

