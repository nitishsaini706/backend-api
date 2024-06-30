const UserService = require('../service/UserService');

const createUser=async(req, res)=> {
  try {
    const newUser = await UserService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const updateUser=async(req, res)=> {
  try {
    let {id}=req.params
    const updatedUser = await UserService.updateUser(id,req.body);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const deleteUser=async(req, res)=> {
  try {
    const { id } = req.params;
    await UserService.deleteUser(id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const getUsers=async(req, res)=> {
  try {
    const users = await UserService.getUsers();
    let usr=[];
    for(let us of users){
      let userCopy = { }; // Shallow copy
      userCopy.id=us.id;
      userCopy.name = us.name;
      userCopy.email = us.email;
      userCopy.mobileNo = us.mobileNo;
      userCopy.followers = us.followers;
      userCopy.following = us.following;
  usr.push(userCopy);
    }
    res.json(usr);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const searchUsersByName=async(req, res)=> {
  try {
    const { name } = req.query;
    const users = await UserService.searchUsersByName(name);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const followUser = async (req, res, next) => {
    const { userId, userIdToFollow } = req.body;

  try {
    const result = await UserService.followUser(userId, userIdToFollow);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
  };
  
  // Unfollow a user
  const unfollowUser = async (req, res, next) => {
    const { userId, userIdToUnfollow } = req.body;

  try {
    const result = await UserService.unfollowUser(userId, userIdToUnfollow);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
  };
module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  searchUsersByName,
  unfollowUser,
  followUser
};
