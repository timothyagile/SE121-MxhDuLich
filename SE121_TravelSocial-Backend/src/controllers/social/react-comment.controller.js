'use strict'

const reactCommentService = require('../../services/social/react-comment.service')


module.exports.reactToComment = async (req, res) => {
    console.log("Create react comment::" + req.body)
    const {commentId, type} = req.body
    const userId = res.locals.user._id;
    const reactData = {commentId, userId, type}
    const result = await reactCommentService.createOrToggle(reactData);
    res.status(200).json({
        isSuccess: true,
        data: result,
        error: null
    });
};

//Chưa check
module.exports.getByCommentId = async (req, res) => {
    const commentId = req.params
    console.log("Get react by id::" + commentId)
    const result = await reactCommentService.getReactsByCommentId(commentId);
    res.status(200).json({
        isSuccess: true,
        data: result,
        error: null
    });
};

