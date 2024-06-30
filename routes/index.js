const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const discussionRoutes = require('./discussionRoutes');
const commentRoutes = require('./commentRoutes');
const authRoutes = require('./authRoutes');

router.use('/api/users', userRoutes);
router.use('/api/discussions', discussionRoutes);
router.use('/api/comment', commentRoutes);
router.use('/api/auth', authRoutes);

module.exports = router;
