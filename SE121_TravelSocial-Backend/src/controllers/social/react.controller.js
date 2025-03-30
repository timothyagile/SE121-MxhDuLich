'use strict'
const { CREATED } = require('../../constants/httpStatusCode');
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