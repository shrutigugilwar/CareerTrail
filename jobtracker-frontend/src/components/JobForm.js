import React, { useState, useEffect } from 'react';
import { addJob, updateJob } from '../services/jobService';

function JobForm({ onJobAdded, jobToEdit }) {
  const [job, setJob] = useState({
    jobTitle: '',
    companyName: '',
    appliedDate: '',
    status: '',
    resumeLink: ''
  });

  useEffect(() => {
    if (jobToEdit) {
      setJob(jobToEdit);
    }
  }, [jobToEdit]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (job.id) {
      await updateJob(job.id, job);
    } else {
      await addJob(job);
    }
    setJob({ jobTitle: '', companyName: '', appliedDate: '', status: '', resumeLink: '' });
    onJobAdded();
  };

  return (
    <form
      className="bg-white border-2 border-blue-200 p-8 rounded-2xl shadow-xl max-w-3xl mx-auto mb-10"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        {job.id ? '✏️ Update Job' : '➕ Add Job'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input
            className="w-full border-2 border-blue-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            name="jobTitle"
            placeholder="e.g. Backend Developer"
            value={job.jobTitle}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
          <input
            className="w-full border-2 border-blue-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            name="companyName"
            placeholder="e.g. Infosys"
            value={job.companyName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Applied Date</label>
          <input
            type="date"
            className="w-full border-2 border-blue-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            name="appliedDate"
            value={job.appliedDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            className="w-full border-2 border-blue-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            name="status"
            value={job.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="Applied">Applied</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Offer Received">Offer Received</option>
            <option value="Rejected">Rejected</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Resume Link</label>
          <input
            className="w-full border-2 border-blue-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            name="resumeLink"
            placeholder="https://drive.google.com/..."
            value={job.resumeLink}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
      >
        {job.id ? 'Update Job' : 'Add Job'}
      </button>
    </form>
  );
}

export default JobForm;
