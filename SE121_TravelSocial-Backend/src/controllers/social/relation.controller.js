const { OK } = require('../../constants/httpStatusCode');
const relationService = require('../../services/social/relation.service');

const sendFriendRequest = async (req, res) => {
	console.log("Add friend::" + req.body)

	const userId = res.locals.user._id;
	const { recipientId } = req.body;
	
	const data = await relationService.sendFriendRequest(userId, recipientId);
	
	res.status(OK).json({ 
        isSuccess: true,
        data: data
    });
};

const respondToRequest = async (req, res) => {
	console.log("Add friend::" + req.body)

	const recipientId = res.locals.user._id;
	const { requestId, accept } = req.body;

	const data = await relationService.respondToRequest(requestId, recipientId, accept);
	res.status(OK).json({ 
        isSuccess: true, 
        data: data 
    });
};

const followUser = async (req, res) => {
	console.log("Follow::" + req.body)

	const userId = res.locals.user._id;
	const { targetId } = req.body

	const data = await relationService.followUser(userId, targetId);

	res.status(OK).json({ 
        isSuccess: true, 
        data: data 
    });
};

const unfollow = async (req, res) => {
	console.log("Unfollow::" + req.params)

	const userId = res.locals.user._id;
	const { targetId } = req.params;

	const data = await relationService.unfollow(userId, targetId);

	res.status(OK).json({ 
        isSuccess: true,
        data: data 
    });
};

const getFriends = async (req, res) => {
	const userId = res.locals.user._id;
	const { type } = req.query
	const data = await relationService.getFriends(userId, type);
	res.status(OK).json({ 
        isSuccess: true, 
        data: data 
    });
};

const unfriend = async (req, res) => {
	console.log("Unfriend::" + req.params)

	const userId = res.locals.user._id;
	const { targetId } = req.params;

	const data = await relationService.unfriend(userId, targetId);

	res.status(OK).json({ 
        isSuccess: true,
        data: data 
    });
};

const blockUser = async (req, res) => {
	console.log("Block::" + req.body)

	const userId = res.locals.user._id;
	const { targetId } = req.body;

	const data = await relationService.blockUser(userId, targetId);

	res.status(200).json({ isSuccess: true, data: data });
};

const unblockUser = async (req, res) => {
	console.log("Block::" + req.params)

	const userId = res.locals.user._id;
	const { targetId } = req.params;
	
	const data = await relationService.unblockUser(userId, targetId);
	
	res.status(200).json({ isSuccess: true, data: data });
};


module.exports = {
	sendFriendRequest,
	respondToRequest,
	followUser,
	getFriends,
	unfriend,
	unfollow,
	blockUser, 
	unblockUser
};