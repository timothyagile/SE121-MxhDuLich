const User = require('../../models/general/user.model'); 
const jwt = require('jsonwebtoken');
const cookie = require('cookies');
const { NotFoundException } = require('../../errors/exception');
const Relation = require('../../models/social/relation.models');
const { RELATION_TYPE } = require('../../enum/relation.enum');

const createUser = async (user) => {
    const savedUser = await user.save()
    if(savedUser)
        return savedUser
    else
        throw Error;
};

const getAllUser = async () => {
    const users = await User.find()
    if(users.length !== 0)
        return users
    else
        throw new NotFoundException('Not found any user');
};

const getUserById = async (id) => {
    const result = await User.findById(id)
    if(result)
        return result
    else
        throw new NotFoundException('Not found specific user');
};

const getByUserRole = async (role) => {
    const users = await User.find({ userRole: role });
    if (users.length !== 0) {
        return users;
    } else {
        throw new NotFoundException('No users found with this role');
    }
};

const updateUser = async (id, userData) => {
    const result = await User.findByIdAndUpdate(id, userData, {new: true, runValidators: true})
    if(result)
        return result
    else
        throw new NotFoundException('Can not update specific user');
};

const updateAvata = async (id, userAvatar) => {
    const result = await User.findByIdAndUpdate(
        id, 
        userAvatar,
        {new: true, runValidators: true})

    if(result)
        return result
    else
        throw new NotFoundException('Can not update specific user');
}

const deleteUser = async (id) => {
    const result = await User.findByIdAndDelete(id)
    if(result)
        return result
    else
    throw new NotFoundException('Can not delete specific user');
};

const searchUsers = async (userId, searchTerm) => {
    try {
        if (!searchTerm || searchTerm.trim() === '') {
            return [];
        }

        // Tìm kiếm người dùng theo tên, ngoại trừ người dùng hiện tại
        const users = await User.find({
            _id: { $ne: userId },
            userName: { $regex: searchTerm, $options: 'i' }
        }).select('_id userName userAvatar');

        if (!users || users.length === 0) {
            return [];
        }

        // Lấy tất cả mối quan hệ của người dùng hiện tại
        const relations = await Relation.find({
            $or: [
                { requestId: userId },
                { recipientId: userId }
            ]
        });

        // Thêm thông tin về mối quan hệ vào kết quả tìm kiếm
        const usersWithRelationStatus = users.map(user => {
            const userObject = user.toObject();
            
            // Tìm mối quan hệ với người dùng này
            const relation = relations.find(rel => 
                (rel.requestId.toString() === userId.toString() && rel.recipientId.toString() === user._id.toString()) || 
                (rel.requestId.toString() === user._id.toString() && rel.recipientId.toString() === userId.toString())
            );

            // Xác định trạng thái mối quan hệ
            let relationStatus = 'none'; // Mặc định: chưa có mối quan hệ
            let relationId = null;

            if (relation) {
                relationId = relation._id;
                
                if (relation.type === RELATION_TYPE.ACCEPTED) {
                    relationStatus = 'friend';
                } else if (relation.type === RELATION_TYPE.PENDING) {
                    // Kiểm tra xem ai là người gửi lời mời
                    if (relation.requestId.toString() === userId.toString()) {
                        relationStatus = 'sent_request';
                    } else {
                        relationStatus = 'received_request';
                    }
                } else if (relation.type === RELATION_TYPE.FOLLOWING) {
                    relationStatus = 'following';
                } else if (relation.type === RELATION_TYPE.BLOCKED) {
                    relationStatus = 'blocked';
                }
            }

            return {
                ...userObject,
                relationStatus,
                relationId
            };
        });

        return usersWithRelationStatus;
    } catch (error) {
        console.error('Error in searchUsers:', error);
        throw error;
    }
};

module.exports = {
    createUser,
    getAllUser,
    getUserById,
    getByUserRole,
    updateUser,
    deleteUser,
    updateAvata,
    searchUsers
};