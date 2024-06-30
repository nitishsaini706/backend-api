const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');

// Create a new comment
router.post('/comments', commentController.createComment);
router.put('/comments', commentController.updateComment);
router.delete('/comments', commentController.deleteComment);
router.get('/commentsByHashtag', commentController.findDiscussionsByHashtag);

module.exports = router;
