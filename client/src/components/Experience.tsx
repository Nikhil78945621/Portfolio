"use client";

import { motion } from "framer-motion";
import { dummyExperience } from "../lib/dummyData";

export default function Experience({ data }: { data?: any[] }) {
  const experiences = data && data.length > 0 ? data : dummyExperience;
  
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Where I've Worked</h2>
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:grid md:grid-cols-4 md:gap-8 items-baseline border-l border-emerald-500/30 md:border-none ml-2 md:ml-0">
                <div className="hidden md:block text-slate-500 dark:text-slate-400 font-mono text-sm">
                  {exp.duration}
                </div>
                
                <div className="md:col-span-3 relative">
                  <div className="absolute w-3 h-3 bg-emerald-500 rounded-full mt-1.5 -left-[41px] md:-left-4 border-4 border-white dark:border-[#0a0a0a]"></div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    {exp.role} <span className="text-emerald-500">@ {exp.company}</span>
                  </h3>
                  <div className="md:hidden text-slate-500 dark:text-slate-400 font-mono text-xs mb-4">
                    {exp.duration}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
