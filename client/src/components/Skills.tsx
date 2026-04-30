"use client";

import { motion } from "framer-motion";
import { dummySkills } from "../lib/dummyData";

export default function Skills({ data }: { data?: any[] }) {
  const skills = data && data.length > 0 ? data : dummySkills;
  
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Skills & Technologies</h2>
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-center group hover:border-emerald-500 transition-colors"
            >
              <h3 className="font-medium text-slate-900 dark:text-white mb-1 group-hover:text-emerald-500 transition-colors">
                {skill.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {skill.level}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
