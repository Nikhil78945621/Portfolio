"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { usePortfolio } from "@/hooks/usePortfolio";

export default function Admin() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  const portfolio = usePortfolio();

  useEffect(() => {
    const t = Cookies.get("token");
    if (t) setToken(t);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      Cookies.set("token", res.data.token);
      setToken(res.data.token);
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.response) {
        if (err.response.status === 401) {
          alert("Invalid email or password. Please check your credentials.");
        } else {
          alert(`Server error: ${err.response.status}. Please try again later.`);
        }
      } else if (err.request) {
        alert("Cannot reach the server. Please ensure the backend is running on port 5000.");
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setToken(null);
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <form onSubmit={handleLogin} className="bg-slate-900 p-8 rounded-xl shadow-xl border border-slate-800 w-full max-w-md">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
          <div className="mb-4">
            <label className="block text-slate-400 mb-2 text-sm">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-slate-400 mb-2 text-sm">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-emerald-500 text-white font-bold py-3 rounded-lg hover:bg-emerald-600 transition-colors">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-slate-900/50 p-6 rounded-xl border border-slate-800">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-emerald-500">Admin Dashboard</h1>
            <p className="text-slate-400 text-sm">Welcome back, manager.</p>
          </div>
          <div className="flex gap-4">
            {activeSection && (
              <button 
                onClick={() => setActiveSection(null)} 
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded transition-colors text-sm"
              >
                Back to Dashboard
              </button>
            )}
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white rounded transition-colors text-sm font-medium">
              Logout
            </button>
          </div>
        </div>

        {!activeSection ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 'profile', name: 'User Profile', desc: 'Manage your basic info and social links.' },
              { id: 'experience', name: 'Experience', desc: 'Update your work history and roles.' },
              { id: 'projects', name: 'Projects', desc: 'Showcase your latest work.' },
              { id: 'skills', name: 'Skills', desc: 'List your technical capabilities.' },
              { id: 'education', name: 'Education', desc: 'Manage your academic background.' }
            ].map((section: any) => (
              <div 
                key={section.id} 
                onClick={() => setActiveSection(section.id)}
                className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/5 transition-all cursor-pointer group"
              >
                <h2 className="text-xl font-bold mb-2 group-hover:text-emerald-500 transition-colors">{section.name}</h2>
                <p className="text-slate-400 text-sm leading-relaxed">{section.desc}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
             {activeSection === 'profile' && <ProfileEditor data={portfolio.user} onUpdate={portfolio.refresh} />}
             {activeSection === 'projects' && <CrudEditor section="projects" data={portfolio.projects} onUpdate={portfolio.refresh} />}
             {activeSection === 'skills' && <CrudEditor section="skills" data={portfolio.skills} onUpdate={portfolio.refresh} />}
             {activeSection === 'experience' && <CrudEditor section="experience" data={portfolio.experience} onUpdate={portfolio.refresh} />}
             {activeSection === 'education' && <CrudEditor section="education" data={portfolio.education} onUpdate={portfolio.refresh} />}
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileEditor({ data, onUpdate }: { data: any, onUpdate: () => void }) {
  const [formData, setFormData] = useState(data || {});

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put('/profile', formData);
      alert('Profile updated successfully!');
      onUpdate();
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev: any) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
        Edit User Profile
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-slate-400 mb-2 text-sm">Full Name</label>
          <input name="name" value={formData.name || ''} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none" />
        </div>
        <div>
          <label className="block text-slate-400 mb-2 text-sm">Professional Title</label>
          <input name="title" value={formData.title || ''} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-slate-400 mb-2 text-sm">Bio</label>
          <textarea name="bio" value={formData.bio || ''} onChange={handleChange} rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none resize-none" />
        </div>
        <div>
          <label className="block text-slate-400 mb-2 text-sm">Email</label>
          <input name="email" value={formData.email || ''} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none" />
        </div>
        <div>
          <label className="block text-slate-400 mb-2 text-sm">Location</label>
          <input name="location" value={formData.location || ''} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none" />
        </div>
        <div>
          <label className="block text-slate-400 mb-2 text-sm">GitHub URL</label>
          <input name="socialLinks.github" value={formData.socialLinks?.github || ''} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none" />
        </div>
        <div>
          <label className="block text-slate-400 mb-2 text-sm">LinkedIn URL</label>
          <input name="socialLinks.linkedin" value={formData.socialLinks?.linkedin || ''} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-slate-400 mb-2 text-sm">Resume URL (PDF Link)</label>
          <input name="resumeUrl" value={formData.resumeUrl || ''} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none" placeholder="e.g. /resume.pdf or a Google Drive link" />
        </div>
      </div>
      <div className="pt-4">
        <button type="submit" className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors shadow-lg shadow-emerald-500/20">
          Save Profile Changes
        </button>
      </div>
    </form>
  );
}

function CrudEditor({ section, data, onUpdate }: { section: string, data: any[], onUpdate: () => void }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (item: any) => {
    setEditingId(item._id);
    setFormData(item);
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await api.delete(`/${section}/${id}`);
      onUpdate();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isAdding) {
        await api.post(`/${section}`, formData);
      } else {
        await api.put(`/${section}/${editingId}`, formData);
      }
      setEditingId(null);
      setIsAdding(false);
      setFormData({});
      onUpdate();
    } catch (err) {
      alert('Operation failed');
    }
  };

  const fields: any = {
    projects: ['title', 'description', 'techStack', 'githubLink', 'liveLink'],
    skills: ['name', 'level'],
    experience: ['role', 'company', 'duration', 'description'],
    education: ['degree', 'institution', 'year']
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold flex items-center gap-2 capitalize">
          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
          Manage {section}
        </h2>
        {!isAdding && !editingId && (
          <button 
            onClick={() => { setIsAdding(true); setFormData({}); }} 
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded font-medium transition-colors text-sm"
          >
            + Add New {section.slice(0, -1)}
          </button>
        )}
      </div>

      {(isAdding || editingId) ? (
        <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800/30 p-6 rounded-xl border border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields[section].map((field: string) => (
              <div key={field} className={field === 'description' || field === 'techStack' ? 'md:col-span-2' : ''}>
                <label className="block text-slate-400 mb-2 text-sm capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                {field === 'description' ? (
                  <textarea 
                    value={formData[field] || ''} 
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })} 
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none resize-none"
                    rows={3}
                  />
                ) : (
                  <input 
                    value={field === 'techStack' && Array.isArray(formData[field]) ? formData[field].join(', ') : (formData[field] || '')} 
                    onChange={(e) => {
                      const val = field === 'techStack' ? e.target.value.split(',').map((s: string) => s.trim()) : e.target.value;
                      setFormData({ ...formData, [field]: val });
                    }} 
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none" 
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            <button type="submit" className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded transition-colors">
              {isAdding ? 'Create' : 'Update'}
            </button>
            <button 
              type="button" 
              onClick={() => { setEditingId(null); setIsAdding(false); }} 
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {data.map((item: any) => (
            <div key={item._id} className="flex justify-between items-center p-4 bg-slate-800/30 rounded-lg border border-slate-700 hover:bg-slate-800/50 transition-colors">
              <div>
                <h3 className="font-bold">{item.title || item.name || item.role || item.degree}</h3>
                <p className="text-slate-400 text-sm">{item.company || item.institution || item.level}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(item)} 
                  className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded transition-colors"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(item._id)} 
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {data.length === 0 && <p className="text-center text-slate-500 py-10">No items found. Click add to create one.</p>}
        </div>
      )}
    </div>
  );
}
