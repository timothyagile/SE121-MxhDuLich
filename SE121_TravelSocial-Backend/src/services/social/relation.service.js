'use strict'
const Relation = require('../../models/social/relation.models');
const User = require('../../models/general/user.model');
const { NotFoundException, BadRequest } = require('../../errors/exception');
const { RELATION_TYPE } = require('../../enum/relation.enum');
const notificationService = require('../general/notification.service');

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
			
			// Tạo thông báo cho người nhận lời mời kết bạn
			await notificationService.createFriendRequestNotification(userId, recipientId);
			
			return savedRelation
		} else if (existing.type === RELATION_TYPE.ACCEPTED || existing.type === RELATION_TYPE.PENDING) {
			throw new BadRequest("Đã tồn tại mối quan hệ hoặc lời mời");
		}
	}
	
    savedRelation = await Relation.create(
		{ requestId: userId, recipientId, type: RELATION_TYPE.PENDING }
	);
	
	// Tạo thông báo cho người nhận lời mời kết bạn
	await notificationService.createFriendRequestNotification(userId, recipientId);
	
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
		
		// Tìm và cập nhật thông báo lời mời kết bạn thành accepted
		try {
			const notifications = await notificationService.getNotificationsByUserId(recipientId);
			const friendRequestNotification = notifications.find(
				n => n.type === 'FRIEND_REQUEST' && 
				n.sender._id.toString() === requestId.toString() && 
				n.status === 'pending'
			);
			
			if (friendRequestNotification) {
				await notificationService.updateFriendRequestNotification(
					friendRequestNotification._id, 
					'accepted'
				);
			}
		} catch (error) {
			console.error('Error updating notification status:', error);
			// Không throw error vì việc cập nhật thông báo không quan trọng bằng cập nhật mối quan hệ
		}
		
	} else {
		savedRelation = await relation.deleteOne();
		
		// Tìm và cập nhật thông báo lời mời kết bạn thành rejected
		try {
			const notifications = await notificationService.getNotificationsByUserId(recipientId);
			const friendRequestNotification = notifications.find(
				n => n.type === 'FRIEND_REQUEST' && 
				n.sender._id.toString() === requestId.toString() && 
				n.status === 'pending'
			);
			
			if (friendRequestNotification) {
				await notificationService.updateFriendRequestNotification(
					friendRequestNotification._id, 
					'rejected'
				);
			}
		} catch (error) {
			console.error('Error updating notification status:', error);
			// Không throw error vì việc cập nhật thông báo không quan trọng bằng cập nhật mối quan hệ
		}
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
	
	// Tạo thông báo follow cho người được theo dõi
	await notificationService.createFollowNotification(userId, targetId);

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

const searchFriends = async (userId, searchTerm) => {
	// Tìm tất cả mối quan hệ bạn bè của người dùng
	const friends = await Relation.find({
		$or: [
			{ requestId: userId, type: RELATION_TYPE.ACCEPTED },
			{ recipientId: userId, type: RELATION_TYPE.ACCEPTED }
		]
	})
		.populate('requestId', 'userName userAvatar')
		.populate('recipientId', 'userName userAvatar');

	if (!friends || friends.length === 0) {
		return []; // Trả về mảng rỗng nếu không có bạn bè
	}

	// Lọc bạn bè theo tên
	const searchResults = friends
		.map((relation) => {
			const friend = relation.requestId._id.toString() === userId.toString()
				? relation.recipientId
				: relation.requestId;
			return { userId: friend._id, userName: friend.userName, userAvatar: friend.userAvatar };
		})
		.filter(friend => friend.userName.toLowerCase().includes(searchTerm.toLowerCase()));

	return searchResults;
};

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

const cancelFriendRequest = async (requestId, recipientId) => {
	const relation = await Relation.findOne({
		requestId,
		recipientId,
		type: RELATION_TYPE.PENDING
	});
	if (!relation) {
		throw new NotFoundException('Friend request not found');
	}

	await relation.deleteOne();
	
	// Xóa thông báo lời mời kết bạn khi hủy lời mời
	await notificationService.deleteFriendRequestNotification(requestId, recipientId);
	
	return { message: 'Friend request cancelled successfully' };
};

module.exports = {
	sendFriendRequest,
	respondToRequest,
	followUser,
	unfollow,
	searchFriends,
	getFriends,
	unfriend,
	blockUser,
	unblockUser,
	cancelFriendRequest
};
