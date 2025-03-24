const { CREATED, OK } = require("../constants/httpStatusCode");
const Post = require('../models/socialModel/Post')
const postService = require('../services/postService')


module.exports.createPost = async (req, res, next) => {
    try {
        const {content, images, videos, locationId, privacyLevel, tripType, travelSeason, userTagIds, bannedUsers } = req.body;
        
        const authorId = res.locals.user._id;
        
        //Embbeding author, location, userTag
        const postData = {authorId, content, locationId, images, videos, tripType, travelSeason, privacyLevel, userTagIds, bannedUsers}

        console.log("Post data::", postData);

        const result = await postService.create(postData);

        res.status(CREATED).json({
            isSuccess: true,
            data: result,
            error: null
        });

    }
    catch(error) {
        next(error)
    }
}

module.exports.getAll = async (req, res) => {
    const posts = await postService.getAll();

    res.status(OK).json({
        isSuccess: true,
        data: posts,
        error: null
    })
}

module.exports.getById = async (req, res) => {
    const id = req.params.id
    const posts = await postService.getById(id);

    res.status(OK).json({
        isSuccess: true,
        data: posts,
        error: null
    })
}

module.exports.getByLocationId = async (req, res) => {
    const locationId = req.params.locationId
    const posts = await postService.getByLocationId(locationId);

    res.status(OK).json({
        isSuccess: true,
        data: posts,
        error: null
    })
}

module.exports.getByAuthorId = async (req, res) => {
    const authorId = req.params.authorId
    const posts = await postService.getByAuthorId(authorId);

    res.status(OK).json({
        isSuccess: true,
        data: posts,    
        error: null
    })
}

module.exports.updatePost = async (req, res) => {
    const id = req.params.id
    const post = req.body;
    const posts = await postService.update(id, post);

    res.status(OK).json({
        isSuccess: true,
        data: posts,
        error: null
    })
}

module.exports.deletePost = async (req, res) => {
    const id = req.params.id
    await postService.deletePost(id)
    res.status(OK).json({
        isSuccess: true,
        data: "Delete successfully",
        error: null
    })
}

