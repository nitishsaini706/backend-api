const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
  text: String,
  image: String,
  userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  hashtags: [String],
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs who liked this discussion
  comments: [{
    text: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Array of user IDs who liked this comment
  }],
  deleted:{type:Boolean,default:false}
});

// Virtual property to get total likes count
discussionSchema.virtual('likesCount').get(function() {
  return this.likes.length;
});

// Virtual property to get total comments count
discussionSchema.virtual('commentsCount').get(function() {
  return this.comments.length;
});

// Instance method to add a comment
discussionSchema.methods.addComment = function(comment) {
  this.comments.push(comment);
  return this.save();
};

// Instance method to update a comment
discussionSchema.methods.updateComment = function(commentId, updatedText) {
  const comment = this.comments.id(commentId);
  if (!comment) return Promise.reject(new Error('Comment not found.'));
  comment.text = updatedText;
  return this.save();
};

// Instance method to delete a comment
discussionSchema.methods.deleteComment = function(commentId) {
  this.comments.pull(commentId);
  return this.save();
};

// Static method to find discussions by hashtag
discussionSchema.statics.findByHashtag = function(hashtag) {
  return this.find({ hashtags: hashtag });
};

module.exports = mongoose.model('Discussion', discussionSchema);
