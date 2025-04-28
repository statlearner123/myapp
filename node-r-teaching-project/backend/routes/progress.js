const express = require('express');
const { createProgress, updateProgress, getProgressByUser } = require('../models/progress');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret'; // Replace with env variable in production

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.get('/', authenticateToken, async (req, res) => {
  try {
    const progress = await getProgressByUser(req.user.userId);
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  const { sectionId, subsectionId, status } = req.body;
  try {
    // Check if progress exists for user-section-subsection
    const existingProgress = await getProgressByUser(req.user.userId);
    const found = existingProgress.find(p => p.section_id === sectionId && p.subsection_id === subsectionId);
    let progress;
    if (found) {
      progress = await updateProgress(req.user.userId, sectionId, subsectionId, status);
    } else {
      progress = await createProgress(req.user.userId, sectionId, subsectionId, status);
    }
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
