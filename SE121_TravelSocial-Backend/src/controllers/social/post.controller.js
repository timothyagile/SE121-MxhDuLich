const { CREATED, OK } = require("../../constants/httpStatusCode");
const { POST_TYPE } = require("../../enum/post.enum");
const Post = require('../../models/social/post.model')
const postService = require('../../services/social/post.service')


module.exports.createPost = async (req, res, next) => {
    try {
        const {content, images, videos, 
            locationId, privacyLevel, tripType, 
            travelSeason, userTagIds, bannedUsers, hashTags } = req.body;
        
        const authorId = res.locals.user._id;
        
        //Embbeding author, location, userTag
        const postData = {
            authorId, content, locationId, 
            images, videos, tripType, 
            travelSeason, privacyLevel, 
            userTagIds, bannedUsers, hashTags}

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

module.exports.getByHashTag = async (req, res) => {
    const hashtag = req.params.hashtag
    const posts = await postService.getByHashTag(hashtag);

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

module.exports.sharePostController = async (req, res) => {
    console.log("Share post::" + req.body) 

    const userId = res.locals.user._id;
    const { originalPostId, content, userTagIds, shareTo } = req.body;

    const type = POST_TYPE.SHARED
    const sharedPost = await postService.sharePost({
        originalPostId,
        userId,
        content,
        userTagIds,
        shareTo,
        type
    });

    return res.status(CREATED).json({
        isSuccess: true,
        data: sharedPost,
        error: null
    });
}