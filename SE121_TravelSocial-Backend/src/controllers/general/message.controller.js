const messageSvc = require('../../services/general/message.service')

module.exports.getMessageByConvId = async (req, res, next) => {
    const conversationId = req.params.conversationId
    try {
        const result = await messageSvc.getMessageByConvId(conversationId)
        res.status(201).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports.createMessage = async (req, res, next) => {
    const {conversationId, senderId, message} = req.body
    try {
        const messageData = new Message({
            conversationId: conversationId,
            senderId: senderId,
            message: message
        })
        const result = await messageSvc.createMessage(messageData)
        res.status(201).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}