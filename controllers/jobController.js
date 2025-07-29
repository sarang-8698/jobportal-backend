// controllers/jobController.js
import Job from '../models/Job.js';

export async function createJob(req, res, next) {
  try {
    console.log('🔐 User:', req.user); // Add this line
    console.log('📄 Job body:', req.body); // Add this line

    const job = await Job.create({ ...req.body, postedBy: req.user._id });
    res.status(201).json(job);
  } catch (error) {
    console.error('❌ Error in createJob:', error); // Add this line
    res.status(500).json({ message: 'Failed to post job' });
  }
}

export async function updateJob(req, res) {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(job);
}

export async function deleteJob(req, res) {
  const job = await Job.findByIdAndDelete(req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json({ message: 'Job deleted' });
}

export async function getJobs(req, res) {
  const {
    location,
    type,
    keyword,
    minSalary,
    maxSalary,
    page = 1,
    limit = 10
  } = req.query;

  const query = {};

  // 📍 Location filter (case-insensitive)
  if (location) {
    query.location = new RegExp(location, 'i');
  }

  // 💼 Type filter (Full-time, Part-time, Internship) — case-insensitive
  if (type) {
    query.type = new RegExp(type, 'i');
  }

  // 🔎 Keyword filter (title or description)
  if (keyword) {
    query.$or = [
      { title: new RegExp(keyword, 'i') },
      { description: new RegExp(keyword, 'i') }
    ];
  }

  // 💰 Salary filter
  if (minSalary || maxSalary) {
    query['salaryRange.min'] = { $gte: minSalary || 0 };
    query['salaryRange.max'] = { $lte: maxSalary || Infinity };
  }

  try {
    const jobs = await Job.find(query)
      .sort({ postedDate: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(jobs);
  } catch (error) {
    console.error('❌ Error fetching jobs:', error);
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
}
