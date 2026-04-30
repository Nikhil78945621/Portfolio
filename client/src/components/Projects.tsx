"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
import { dummyProjects } from "../lib/dummyData";

export default function Projects({ data }: { data?: any[] }) {
  const projects = data && data.length > 0 ? data : dummyProjects;
  
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Some Things I've Built</h2>
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 transition-transform hover:-translate-y-2 flex flex-col h-full"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <ExternalLink size={20} />
                </div>
                <div className="flex gap-4 text-slate-500 dark:text-slate-400">
                  <a href={project.githubLink} target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors">
                    <GithubIcon size={20} />
                  </a>
                  <a href={project.liveLink} target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-500 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 mb-6 flex-1 text-sm leading-relaxed">
                {project.description}
              </p>
              
              <ul className="flex flex-wrap gap-3 font-mono text-xs text-slate-500 dark:text-slate-400 mt-auto">
                {project.techStack.map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
