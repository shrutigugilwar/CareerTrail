import React, { useEffect, useState } from 'react';
import { getJobs } from '../services/jobService';

function Dashboard({ refresh }) {
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    rejected: 0,
    received: 0
  });

  useEffect(() => {
    loadStats();
  }, [refresh]);

  const loadStats = async () => {
    try {
      const res = await getJobs();
      const jobs = res.data;

      const applied = jobs.filter(j => j.status === 'Applied').length;
      const rejected = jobs.filter(j => j.status === 'Rejected').length;
      const received = jobs.filter(j => j.status === 'Offer Received').length;

      setStats({
        total: jobs.length,
        applied,
        rejected,
        received
      });
    } catch (err) {
      console.error("Error loading stats", err);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-6">
      <div className="bg-blue-100 text-blue-800 p-5 rounded-xl text-center font-semibold shadow-sm">
        Total Jobs<br /><span className="text-2xl">{stats.total}</span>
      </div>
      <div className="bg-green-100 text-green-800 p-5 rounded-xl text-center font-semibold shadow-sm">
        Applied<br /><span className="text-2xl">{stats.applied}</span>
      </div>
      <div className="bg-blue-200 text-blue-900 p-5 rounded-xl text-center font-semibold shadow-sm">
        Offer Received<br /><span className="text-2xl">{stats.received}</span>
      </div>
      <div className="bg-red-100 text-red-800 p-5 rounded-xl text-center font-semibold shadow-sm">
        Rejected<br /><span className="text-2xl">{stats.rejected}</span>
      </div>
    </div>
  );
}

export default Dashboard;
