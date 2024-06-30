const express = require('express');
const router = express.Router();
const multer = require('multer');
const DiscussionController = require('../controller/DiscussionController');

// Multer configuration for handling file uploads (images)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), DiscussionController.createDiscussion);
router.put('/:id', DiscussionController.updateDiscussion);
router.delete('/:id', DiscussionController.deleteDiscussion);
router.get('/tags', DiscussionController.getDiscussionsByTags);
router.get('/search', DiscussionController.searchDiscussionsByText);

module.exports = router;
