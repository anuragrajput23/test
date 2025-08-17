import { useState } from 'react';
import axios from 'axios';

export default function JobForm() {
  const [form, setForm] = useState({
    companyName: '',
    role: '',
    status: 'Applied',
    applicationDate: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/jobs', form);
      setMessage('Application added successfully!');
      setForm({ companyName: '', role: '', status: 'Applied', applicationDate: '' });
    } catch (err) {
      setMessage('Failed to add application.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="companyName"
        placeholder="Company Name"
        value={form.companyName}
        onChange={handleChange}
        required
      />
      <input
        name="role"
        placeholder="Role"
        value={form.role}
        onChange={handleChange}
        required
      />
      <select name="status" value={form.status} onChange={handleChange}>
        <option>Applied</option>
        <option>Interviewing</option>
        <option>Rejected</option>
        <option>Offer</option>
      </select>
      <input
        name="applicationDate"
        type="date"
        value={form.applicationDate}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Application</button>
      <div className="message">{message}</div>
    </form>
  );
}
