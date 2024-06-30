const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');
const auth = require("../utils/auth");

router.post('/', auth,UserController.createUser);
router.post('/:id',auth ,UserController.updateUser);
router.delete('/:id', auth,UserController.deleteUser);
router.get('/',auth ,UserController.getUsers);
router.get('/search', auth,UserController.searchUsersByName);
router.post('/follow',auth ,UserController.followUser);
router.post('/unfollow',auth ,UserController.unfollowUser);

module.exports = router;
