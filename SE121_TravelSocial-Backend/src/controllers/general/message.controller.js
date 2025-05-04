const messageSvc = require('../../services/general/message.service')
const socketChatService = require('../../socket/handlers/chat.handler')
module.exports.ping = async (req, res, next) => {
    // io = req.io
    //messageSvc.sendMessage(req.io)
    req.io.emit('ping', 'ping')
    res.status(200).json({"mess": "success"})
}

module.exports.getMessageByConvId = async (req, res, next) => {
    const conversationId = req.params.conversationId
    try {
        const result = await messageSvc.getMessageByConvId(conversationId)
        res.status(200).json({
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
    const {conversationId, message, videos, images,} = req.body
    try {
        const messageData = {
            conversationId,
            senderId: res.locals.user._id,
            message,
            videos,
            images,
        }
        // Saved database
        const result = await messageSvc.createMessage(messageData)
        // Emit to user room
        await socketChatService.emitMessageToUserRoomHandler(messageData, req.io)
        // Emit to conv room 
        await socketChatService.emitMessageToConversationRoomHandler(messageData, req.io)

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