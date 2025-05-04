const { NotFoundException, ForbiddenError } = require('../../errors/exception')
const Conversation = require('../../models/general/conversation.model')
const Message = require('../../models/general/message.model')

const getMessageByConvId = async (conversationId) => {
    const result = await Message
    .find({conversationId : conversationId})
    .sort({createdAt: 1})

    if(result.length !== 0)
        return result
    else
        throw new NotFoundException('Not found any message of this user')
}
const createMessage = async (messageData) => {
    const { conversationId, senderId, message, images, videos } = messageData
    const conv = await Conversation.findById(messageData.conversationId)
    if(!conv) throw new NotFoundException();

    const messageObj = new Message({ conversationId, senderId, message, images, videos })
    
    const result = await messageObj.save()
    conv.lastMessage = message
    await conv.save()

    if(result)
        return result
    else
        throw new ForbiddenError('Can not create message')
}
const sendMessage = async (messageData, io) => {
    io.emit('ping', {
        message: 'hello',
        conversationId: 'asdasdas'
    })
}

module.exports = {
    getMessageByConvId,
    createMessage,
    sendMessage
}