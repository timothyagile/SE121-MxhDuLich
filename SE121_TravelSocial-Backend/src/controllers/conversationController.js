const Conversation = require('../models/generalModel/Conversation');
const conversationSvc = require('../services/conversationSvc')

module.exports.findConversations = async (req, res, next) => {
    const {firstId, secondId} = req.params
    try {
        const result = await conversationSvc.getAllConversations({firstId, secondId})
        res.status(200).json({
            isSuccess: true,
            data: result,
            error: null,
        });
    }
    catch(error) {
        next(error)
    }
}

module.exports.findUserConversation = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const result = await conversationSvc.getUserConversation(userId)
        res.status(200).json({
            isSuccess: true,
            data: result,
            error: null,
        });
    }
    catch(error) {
        next(error)
    }
}

module.exports.createConversation = async (req, res, next) => {
    try {
        const {firstId, secondId} = req.body
        const conversationData = new Conversation({
            firstId: firstId,
            secondId: secondId
        })
        const result = await conversationSvc.createConversation(conversationData)
        res.status(200).json({
            isSuccess: true,
            data: result,
            error: null,
        });
    }
    catch(error) {
        next(error)
    }
}