const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs who follow this user
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Array of user IDs whom this user follows
});

// Virtual property to get total followers count
userSchema.virtual('followersCount').get(function() {
    return this.followers.length;
  });
  
  // Virtual property to get total following count
  userSchema.virtual('followingCount').get(function() {
    return this.following.length;
  });

// Hash password before saving user to database
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});


// Method to follow another user
userSchema.methods.follow = function(userIdToFollow) {
    if (!this.following.includes(userIdToFollow)) {
      this.following.push(userIdToFollow);
    }
    return this.save();
  };
  
  // Method to unfollow a user
  userSchema.methods.unfollow = function(userIdToUnfollow) {
    this.following.pull(userIdToUnfollow);
    return this.save();
  };
  
module.exports = mongoose.model('User', userSchema);
