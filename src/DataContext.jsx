import React, { createContext, useContext, useState, useEffect } from 'react';
import projectsData from './data/projects.json';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

// Rate limiting implementation
let requestCount = 0;
const requestLimit = 100;
const timeWindow = 60000; // 1 minute

setInterval(() => {
  requestCount = 0;
}, timeWindow);

export const rateLimit = () => {
  if (requestCount >= requestLimit) {
    throw new Error('Too many requests. Please try again later.');
  }
  requestCount++;
};

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async data loading
    const loadData = async () => {
      try {
        // Simulate a small delay to mimic API behavior
        await new Promise(resolve => setTimeout(resolve, 100));
        setProjects(projectsData.projects);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getProjects = async () => {
    rateLimit();
    return {
      data: projects,
      error: null
    };
  };

  const value = {
    getProjects,
    projects,
    loading
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

