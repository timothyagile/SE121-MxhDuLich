'use strict'
const { CREATED, OK, NOT_FOUND } = require('../../constants/httpStatusCode');
const reactModel = require('../../models/social/react.model');
const reactService = require('../../services/social/react.service')

module.exports.create = async (req, res) => {
    const {postId, type} = req.body
    console.log("React Controller::", req.body)
    const userId = res.locals.user._id;

    const reactData = new reactModel({userId, type, postId})

    const result = await reactService.create(reactData);

    res.status(CREATED).json({
        isSuccess: true,
        data: result,    
        error: null
    })
}

module.exports.getByPostId = async (req, res) => {
    console.log("Get by postId::", req.query)
    const {postId, type = null} = req.query
    
    const result = await reactService.getByPostId(postId, type)

    res.status(OK).json({
        isSuccess: true,
        data: result,    
        error: null
    })
} 

module.exports.countReacts = async (req, res) => {
    const {postId} = req.params

    const result = await reactService.countReactionByType(postId)

    res.status(OK).json({
        isSuccess: true,
        data: result,    
        error: null
    })
}

module.exports.checkUserReacted = async (req, res) => {
    const { postId, userId } = req.query;
    
    try {
        const result = await reactService.checkUserReacted(postId, userId);
        
        res.status(OK).json({
            isSuccess: true,
            data: result,
            error: null
        });
    } catch (error) {
        res.status(NOT_FOUND).json({
            isSuccess: false,
            data: null,
            error: error.message
        });
    }
}