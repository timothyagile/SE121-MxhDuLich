'use strict'

const { CREATED } = require('../../constants/httpStatusCode')
const hashTagService = require('../../services/social/hashtag.service')
const postHashTagService = require('../../services/social/post-hashtag.service')

module.exports.create = async (req, res) => {
    console.log("Create hashtag::", req.body)
    const {postId, hashTags} = req.body

    const result = await Promise.all(hashTags.map(async (tag) => {
        const savedHashTag = await hashTagService.create(tag);
        const savedPostHashTag = 
        await postHashTagService.create({postId, hashTagId: savedHashTag._id})

        return savedHashTag
    }));

    console.log("Saved hashtag::", result)

    res.status(CREATED).json({
        isSuccess: true,
        data: result,
        error: null
    });
}