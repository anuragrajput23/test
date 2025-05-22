import express from 'express';
import Job from '../models/Job.js';

const router = express.Router();

// Add new job application
router.post('/', async (req, res) => {
  try {
    const { companyName, role, status, applicationDate } = req.body;
    const newJob = new Job({ companyName, role, status, applicationDate });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all job applications
router.get('/', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

export default router;
