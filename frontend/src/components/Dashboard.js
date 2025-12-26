import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [newJob, setNewJob] = useState({ title: '', description: '', location: '', employment_type: 'full-time' });

  useEffect(() => {
    if (user) {
      if (user.role === 'employer') {
        fetchEmployerJobs();
        fetchEmployerApplications();
      } else {
        fetchSeekerApplications();
      }
    }
  }, [user]);

  const fetchEmployerJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/jobs/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchEmployerApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/applications/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const fetchSeekerApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/applications/my/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8000/api/jobs/', newJob, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setNewJob({ title: '', description: '', location: '', employment_type: 'full-time' });
      fetchEmployerJobs();
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:8000/api/applications/${id}/`, { status }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchEmployerApplications();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (!user) {
    return <p>Please login to access dashboard.</p>;
  }

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Welcome, {user.name} ({user.role})</p>
      <button onClick={logout}>Logout</button>

      {user.role === 'employer' && (
        <>
          <h3>Post New Job</h3>
          <form onSubmit={handleJobSubmit}>
            <input type="text" placeholder="Title" value={newJob.title} onChange={(e) => setNewJob({...newJob, title: e.target.value})} required />
            <textarea placeholder="Description" value={newJob.description} onChange={(e) => setNewJob({...newJob, description: e.target.value})} required />
            <input type="text" placeholder="Location" value={newJob.location} onChange={(e) => setNewJob({...newJob, location: e.target.value})} required />
            <select value={newJob.employment_type} onChange={(e) => setNewJob({...newJob, employment_type: e.target.value})}>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </select>
            <button type="submit">Post Job</button>
          </form>

          <h3>Your Jobs</h3>
          <ul>
            {jobs.map(job => (
              <li key={job.id}>
                <Link to={`/jobs/${job.id}`}>{job.title}</Link>
              </li>
            ))}
          </ul>

          <h3>Applications</h3>
          <ul>
            {applications.map(app => (
              <li key={app.id}>
                {app.full_name} - {app.job.title} - Status: {app.status}
                <select onChange={(e) => updateApplicationStatus(app.id, e.target.value)} value={app.status}>
                  <option value="new">New</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="rejected">Rejected</option>
                  <option value="accepted">Accepted</option>
                </select>
              </li>
            ))}
          </ul>
        </>
      )}

      {user.role === 'seeker' && (
        <>
          <h3>Your Applications</h3>
          <ul>
            {applications.map(app => (
              <li key={app.id}>
                {app.job.title} - Status: {app.status}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Dashboard;
