import { useState, useEffect } from 'react';
import api from '@/services/api';

export function usePortfolio() {
  const [data, setData] = useState<any>({
    user: null,
    projects: [],
    skills: [],
    experience: [],
    education: [],
    loading: true,
    error: null
  });

  const fetchData = async () => {
    try {
      const [userRes, projectsRes, skillsRes, experienceRes, educationRes] = await Promise.all([
        api.get('/profile'),
        api.get('/projects'),
        api.get('/skills'),
        api.get('/experience'),
        api.get('/education')
      ]);

      setData({
        user: userRes.data,
        projects: projectsRes.data,
        skills: skillsRes.data,
        experience: experienceRes.data,
        education: educationRes.data,
        loading: false,
        error: null
      });
    } catch (err: any) {
      setData((prev: any) => ({ ...prev, loading: false, error: err.message }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { ...data, refresh: fetchData };
}
