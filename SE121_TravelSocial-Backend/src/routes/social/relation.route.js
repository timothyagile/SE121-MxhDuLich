const express = require('express');
const router = express.Router();
const relationController = require('../../controllers/social/relation.controller');
const { checkUser } = require('../../middleware/auth.middleware');
const { asyncHandler } = require('../../middleware/asyncFunction');

router.post('/friend-request', checkUser, asyncHandler(relationController.sendFriendRequest));

router.post('/respond-request', checkUser, asyncHandler(relationController.respondToRequest));

router.post('/follow', checkUser, asyncHandler(relationController.followUser));

router.delete('/unfollow/:targetId', checkUser, asyncHandler(relationController.unfollow));

router.get('/friends', checkUser, asyncHandler(relationController.getFriends));

router.get('/search', checkUser, asyncHandler(relationController.searchFriends));

router.delete('/unfriend/:targetId', checkUser, asyncHandler(relationController.unfriend));

router.post('/block', checkUser, asyncHandler(relationController.blockUser));

router.delete('/unblock/:targetId', checkUser, asyncHandler(relationController.unblockUser));

router.delete('/cancel-request/:recipientId', checkUser, asyncHandler(relationController.cancelFriendRequest));

module.exports = router;