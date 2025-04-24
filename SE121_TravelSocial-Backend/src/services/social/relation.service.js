'use strict'
const Relation = require('../../models/social/relation.models');
const User = require('../../models/general/user.model');
const { NotFoundException, BadRequest } = require('../../errors/exception');
const { RELATION_TYPE } = require('../../enum/relation.enum');



const sendFriendRequest = async (userId, recipientId) => {
    if (userId.toString() === recipientId.toString()) {
        throw new BadRequest("Không thể gửi lời mời cho chính mình");
    }
    
    const existing = await Relation.findOne({
        $or: [
          { requestId: userId, recipientId },
          { requestId: recipientId, recipientId: userId }
        ],
        //type: { $in: [RELATION_TYPE.ACCEPTED, RELATION_TYPE.PENDING] }
    });
	
	let savedRelation
	if (existing) {
		if(existing.type === RELATION_TYPE.BLOCKED) {
			throw new BadRequest("This user has been blocked")
		} else if(existing.type === RELATION_TYPE.FOLLOWING) {
			existing.type = RELATION_TYPE.PENDING
			savedRelation = await existing.save()
			return savedRelation
		} else if (existing.type === RELATION_TYPE.ACCEPTED || existing.type === RELATION_TYPE.PENDING) {
			throw new BadRequest("Đã tồn tại mối quan hệ hoặc lời mời");
		}
	}
	
    savedRelation = await Relation.create(
		{ requestId: userId, recipientId, type: RELATION_TYPE.PENDING }
	);
    return savedRelation;
}

const respondToRequest = async (requestId, recipientId, accept) => {
	const relation = await Relation.findOne({
		requestId,
		recipientId,
		type: RELATION_TYPE.PENDING
	});
	if (!relation) {
		throw new NotFoundException('Friend request not found');
	}

    let savedRelation

	if (accept) {
		relation.type = RELATION_TYPE.ACCEPTED;
		savedRelation = await relation.save();
	} else {
		savedRelation = await relation.deleteOne();
	}
    return savedRelation
};

const followUser = async (userId, targetId) => {
	const targetUser = await User.findById(targetId);
	if (!targetUser) {
		throw new NotFoundException('Target user not found');
	}

	const existingFollow = await Relation.findOne({
		requestId: userId,
		recipientId: targetId,
		type: RELATION_TYPE.FOLLOWING
	});
	if (existingFollow) {
		throw new BadRequest('Already following this user');
	}

	const relation = new Relation({
		requestId: userId,
		recipientId: targetId,
		type: RELATION_TYPE.FOLLOWING
	});
	const savedRelation = await relation.save();

	return savedRelation
};

const unfollow = async (userId, targetId) => {
	const targetUser = await User.findById(targetId);
	if (!targetUser) {
		throw new NotFoundException('Target user not found');
	}

	const existingFollow = await Relation.findOne({
		requestId: userId,
		recipientId: targetId,
		type: RELATION_TYPE.FOLLOWING
	});
	if (!existingFollow) {
		throw new NotFoundException('Can not found relation');
	}

	await existingFollow.deleteOne()

	return "Unfollow successfully"
}

const getFriends = async (userId, type) => {
	const friends = await Relation.find({
		$or: [
			{ requestId: userId, type: type },
			{ recipientId: userId, type: type }
		]
	})
		.populate('requestId', 'userName userAvatar')
		.populate('recipientId', 'userName userAvatar');

	if (!friends || friends.length === 0) {
		throw new NotFoundException('No friends found');
	}

	return friends.map((relation) => {
		const friend = relation.requestId._id.toString() === userId.toString()
			? relation.recipientId
			: relation.requestId;
		return { userId: friend._id, userName: friend.userName, userAvatar: friend.userAvatar };
	});
};

const unfriend = async (userId, targetId) => {
	const relation = await Relation.findOne({
		$or: [
			{ requestId: userId, recipientId: targetId, type: RELATION_TYPE.ACCEPTED },
			{ recipientId: userId, requestId: targetId, type: RELATION_TYPE.ACCEPTED }
		]
	});
	if (!relation) {
		throw new NotFoundException('Friendship not found');
	}

	await relation.deleteOne();

	return 'Unfriended successfully'
};

const blockUser = async (userId, targetId) => {
	const target = await User.findById(targetId);
	if (!target) {
		throw new NotFoundException('User to block not found');
	}

	const relation = await Relation.findOne({
		requestId: userId,
		recipientId: targetId,
	});
	let savedRelation;
	if (relation) {
		relation.type = RELATION_TYPE.BLOCKED
		savedRelation = await relation.save()
	}
	else {
		const relation = new Relation({
			requestId: userId,
			recipientId: targetId,
			type: RELATION_TYPE.BLOCKED
		});
		savedRelation = await relation.save();
	}

	return savedRelation
};

const unblockUser = async (userId, targetId) => {
	const relation = await Relation.findOne({
		requestId: userId,
		recipientId: targetId,
		type: RELATION_TYPE.BLOCKED
	});
	if (!relation) {
		throw new NotFoundException('Block relation not found');
	}

	await relation.deleteOne();

	return { message: 'User unblocked successfully' };
};

module.exports = {
	sendFriendRequest,
	respondToRequest,
	followUser,
	unfollow,
	getFriends,
	unfriend,
	blockUser,
	unblockUser
};
