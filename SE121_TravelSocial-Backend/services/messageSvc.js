const { NotFoundException, ForbiddenError } = require('../errors/exception')
const Message = require('../models/Message')

const getMessageByConvId = async (conversationId) => {
    const result = await Message.find({conversationId : conversationId})
    if(result.length !== 0)
        return result
    else
        throw new NotFoundException('Not found any message of this user')
}
const createMessage = async (message) => {
    const result = await message.save()
    if(result)
        return result
    else
        throw new ForbiddenError('Can not create message')
}

module.exports = {
    getMessageByConvId,
    createMessage,
}