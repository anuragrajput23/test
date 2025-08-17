import { useEffect, useState } from 'react';
import axios from 'axios';

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      const res = await axios.get('http://localhost:5000/api/jobs');
      setJobs(res.data);
    }
    fetchJobs();
  }, []);

  return (
    <div>
      <h2>Tracked Applications</h2>
      {jobs.map((job, idx) => (
        <div key={idx} className="job-card">
          <strong>{job.companyName}</strong> - {job.role}
          <div>Status: {job.status}</div>
          <div>Date: {new Date(job.applicationDate).toLocaleDateString()}</div>
        </div>
      ))}
    </div>
  );
}
