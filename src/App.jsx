import { useState, useEffect } from 'react';

export default function App() {
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('job_applications');
    return saved ? JSON.parse(saved) : [
      { id: 1, company: 'Zoho Corporation', role: 'MERN Stack Developer', location: 'Chennai', status: 'Applied', date: '2026-11-15' }
    ];
  });

  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('Applied');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('job_applications', JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (e) => {
    e.preventDefault();
    if (!company || !role) return;
    const newJob = {
      id: Date.now(),
      company,
      role,
      location: location || 'Coimbatore',
      status,
      date: new Date().toISOString().split('T')[0]
    };
    setJobs([newJob, ...jobs]);
    setCompany('');
    setRole('');
    setLocation('');
  };

  const updateStatus = (id, newStatus) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, status: newStatus } : job));
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const filteredJobs = filter === 'All' ? jobs : jobs.filter(j => j.status === filter);

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', fontFamily: 'sans-serif', background: '#f8fafc', borderRadius: '10px', color: '#1e293b' }}>
      <h1 style={{ textAlign: 'center' }}>Job Application Tracker</h1>

      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0', background: '#fff', padding: '15px', borderRadius: '8px' }}>
        <div><strong>Total:</strong> {jobs.length}</div>
        <div style={{ color: '#2563eb' }}><strong>Applied:</strong> {jobs.filter(j => j.status === 'Applied').length}</div>
        <div style={{ color: '#d97706' }}><strong>Interview:</strong> {jobs.filter(j => j.status === 'Interview').length}</div>
        <div style={{ color: '#16a34a' }}><strong>Offer:</strong> {jobs.filter(j => j.status === 'Offer').length}</div>
      </div>

      <form onSubmit={addJob} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        <input placeholder="Company Name (e.g. TCS)" value={company} onChange={(e) => setCompany(e.target.value)} style={{ padding: '10px' }} required />
        <input placeholder="Job Role (e.g. React Developer)" value={role} onChange={(e) => setRole(e.target.value)} style={{ padding: '10px' }} required />
        <input placeholder="Location (e.g. Coimbatore)" value={location} onChange={(e) => setLocation(e.target.value)} style={{ padding: '10px' }} />
        <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: '10px' }}>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button type="submit" style={{ gridColumn: 'span 2', padding: '10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          + Add Job Application
        </button>
      </form>

      <div style={{ marginBottom: '15px' }}>
        <strong>Filter: </strong>
        {['All', 'Applied', 'Interview', 'Offer', 'Rejected'].map(st => (
          <button key={st} onClick={() => setFilter(st)} style={{ marginRight: '8px', padding: '5px 12px', background: filter === st ? '#1e293b' : '#e2e8f0', color: filter === st ? '#fff' : '#000', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {st}
          </button>
        ))}
      </div>

      <div>
        {filteredJobs.map(job => (
          <div key={job.id} style={{ background: '#fff', padding: '15px', marginBottom: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0' }}>{job.company} — <span style={{ color: '#475569', fontSize: '16px' }}>{job.role}</span></h3>
              <small style={{ color: '#64748b' }}>{job.location} | Applied on: {job.date}</small>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <select value={job.status} onChange={(e) => updateStatus(job.id, e.target.value)} style={{ padding: '5px' }}>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
              <button onClick={() => deleteJob(job.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
