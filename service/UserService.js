const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function createUser(userData) {
  const newUser = new User(userData);
  return await newUser.save();
}

async function updateUser(id,userData) {
  return await User.findByIdAndUpdate(
    id, userData, { new: true });
}

async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}

async function getUsers() {
  return await User.find();
}

async function searchUsersByName(name) {
  return await User.find({ name: { $regex: name, $options: 'i' } });
}
async function followUser (userId, userIdToFollow){
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found.');
      }
  
      await user.follow(userIdToFollow);
      return { success: true, message: 'User followed successfully.' };
    } catch (error) {
      console.error(error);
      throw new Error('Internal server error.');
    }
  };
  
  // Unfollow a user
  async function unfollowUser(userId, userIdToUnfollow){
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found.');
      }
  
      await user.unfollow(userIdToUnfollow);
      return { success: true, message: 'User unfollowed successfully.' };
    } catch (error) {
      console.error(error);
      throw new Error('Internal server error.');
    }
  };

  async function findUser(userData) {
    const { name, mobileNo, email, password } = userData;

    let existingUser = await User.findOne({ $or: [{ mobileNo }, { email }] });
    return existingUser ?? false;
  }

 async function comparePassword (password,candidatePassword) {
    return await bcrypt.compare(candidatePassword, password);
  };
module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  searchUsersByName,
  unfollowUser,
  followUser,
  findUser,
  comparePassword
};
