import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/jobs/${id}/`);
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job:', error);
    }
  };

  return (
    <div className="job-detail">
      {job ? (
        <>
          <h2>{job.title}</h2>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Type:</strong> {job.employment_type}</p>
          <p><strong>Description:</strong> {job.description}</p>
          <p><strong>Posted:</strong> {new Date(job.created_at).toLocaleDateString()}</p>
          {user && user.role === 'seeker' && <Link to={`/apply/${id}`}>Apply Now</Link>}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default JobDetail;
