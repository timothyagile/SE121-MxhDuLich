const { default: mongoose } = require("mongoose");
const commentModel = require("../models/social/comment.model");

const getCommentsWithReacts = async (postId) => {

    console.log(postId)
    const comments = await commentModel.aggregate([
        {
            $match: {
                postId: new mongoose.Schema.Types.ObjectId(postId)
            }
        },
        // {
        //     $sort: { createdAt: -1 }
        // },
        // {
        //     $lookup: {
        //         from: 'users',
        //         localField: 'userId',
        //         foreignField: '_id',
        //         as: 'user'
        //     }
        // },
        // { $unwind: '$user' },
        // {
        //     $lookup: {
        //         from: 'users',
        //         localField: 'mention',
        //         foreignField: '_id',
        //         as: 'mentionedUsers'
        //     }
        // },
        // {
        //     $project: {
        //         content: 1,
        //         createdAt: 1,
        //         images: 1,
        //         videos: 1,
        //         parentId: 1,
        //         'user._id': 1,
        //         'user.userName': 1,
        //         'user.userAvatar': 1,
        //         mentionedUsers: {
        //             _id: 1,
        //             userName: 1
        //         }
        //     }
        // }
    ]);

    return comments;
};

module.exports = {
    getCommentsWithReacts
}