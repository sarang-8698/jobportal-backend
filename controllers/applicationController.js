import Application from '../models/Application.js';

export async function applyJob(req, res) {
  const { job, resumeLink, coverLetter } = req.body;

  if (!job || !resumeLink || !coverLetter) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const application = await Application.create({
    job,
    user: req.user._id,
    resumeLink,
    coverLetter
  });

  res.status(201).json(application);
}

export async function createApplication(req, res) {
  try {
    console.log('📥 Application body:', req.body);
    console.log('🔐 User:', req.user);

    const { job, resumeLink, coverLetter } = req.body;

    if (!job || !resumeLink || !coverLetter) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const application = await Application.create({
      job,
      user: req.user._id,
      resumeLink,
      coverLetter,
    });

    res.status(201).json(application);
  } catch (error) {
    console.error('❌ Application creation error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
