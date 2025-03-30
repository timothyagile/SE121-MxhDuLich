const { NotFoundException } = require('../errors/exception');
const { find } = require('../models/social/post.model');
const React = require('../models/social/react.model');
const BaseRepository = require('./base.repository');
const mongoose = require('mongoose')

class ReactRepository extends BaseRepository{

    constructor() {
        super(React)
    }

    async findOneReact(postId, userId) {
        const react = await React.findOne({
            postId: postId,
            userId: userId
        })

        return react
    }

    async getByPostId(postId, type) {
        const query = {postId}

        if(type !== null) {
            query.type = type
        }

        const reacts = await React
        .find(query)
        .populate({
            path: "userId",
            select: "userName userAvatar"
        })
        .exec()

        if(reacts.length === 0) {throw new NotFoundException()}

        return reacts
    }

    async countReactionByType(postId) {
        const id = new mongoose.Types.ObjectId(postId);

        const countReacts = await React.aggregate([
            { $match: {postId : id}},
            { $group: { _id: "$type", count: { $sum: 1 } } }
        ])

        if(countReacts.length === 0) { throw new NotFoundException() }

        return countReacts
    }
}

module.exports = new ReactRepository();
