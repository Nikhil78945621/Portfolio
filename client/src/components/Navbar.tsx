"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-emerald-500 font-bold text-xl tracking-tighter">
          &lt;Nikhil /&gt;
        </div>

        <div className="hidden md:flex items-center gap-8 font-mono text-sm text-slate-600 dark:text-slate-300">
          <a href="#experience" className="hover:text-emerald-500 transition-colors">
            Experience
          </a>
          <a href="#projects" className="hover:text-emerald-500 transition-colors">
            Projects
          </a>
          <a href="#skills" className="hover:text-emerald-500 transition-colors">
            Skills
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
