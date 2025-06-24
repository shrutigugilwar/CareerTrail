import React, { useEffect, useState } from 'react';
import { getJobs, deleteJob } from '../services/jobService';

function JobList({ refresh, onEdit }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, [refresh]);

  const fetchJobs = async () => {
    try {
      const res = await getJobs();
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      fetchJobs();
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 Job List</h2>
      <table className="w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-blue-100 text-left">
            <th className="border p-2">Title</th>
            <th className="border p-2">Company</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Resume</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="hover:bg-gray-50">
              <td className="border p-2">{job.jobTitle}</td>
              <td className="border p-2">{job.companyName}</td>
              <td className="border p-2">{job.appliedDate}</td>
              <td className="border p-2">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  job.status === 'Applied' ? 'bg-green-100 text-green-800' :
                  job.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                  job.status === 'Offer Received' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {job.status}
                </span>
              </td>
              <td className="border p-2">
                <a href={job.resumeLink} className="text-blue-600 underline" target="_blank" rel="noreferrer">
                  View
                </a>
              </td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => onEdit(job)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobList;
