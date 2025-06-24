import React, { useState } from 'react';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import Dashboard from './components/Dashboard';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleRefresh = () => {
    setRefresh(!refresh);
    setSelectedJob(null);
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">💼 Job Tracker</h1>

      {/* ✅ Dashboard goes here */}
      <Dashboard refresh={refresh} />

      {/* ✅ Job Form and List */}
      <JobForm onJobAdded={handleRefresh} jobToEdit={selectedJob} />
      <JobList refresh={refresh} onEdit={handleEdit} />
    </div>
  );
}

export default App;
