const Comment = require('../models/Comment');

// Create a new comment
const createComment = async (req, res, next) => {
  try {
    const { userId, discussionId, text } = req.body;

    const newComment = new Comment({
      userId,
      discussionId,
      text
    });

    await newComment.save();
    res.status(201).json({ message: 'Comment created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a comment
const updateComment = async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const { text } = req.body;
  
      const comment = await Comment.findByIdAndUpdate(commentId, {
        text
      }, { new: true });
  
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found.' });
      }
  
      res.status(200).json({ message: 'Comment updated successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Delete a comment
  const deleteComment = async (req, res, next) => {
    try {
      const { commentId } = req.params;
  
      const comment = await Comment.findByIdAndDelete(commentId);
  
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found.' });
      }
  
      res.status(200).json({ message: 'Comment deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const findDiscussionsByHashtag = async (hashtag) => {
    try {
      const discussions = await Discussion.findByHashtag(hashtag);
      return discussions;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  module.exports={
    deleteComment,
    updateComment,
    createComment,
    findDiscussionsByHashtag
  }