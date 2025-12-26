import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import JobList from './components/JobList';
import JobDetail from './components/JobDetail';
import ApplyForm from './components/ApplyForm';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/apply/:id" element={<ApplyForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<JobList />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
