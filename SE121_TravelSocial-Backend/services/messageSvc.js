const { NotFoundException, ForbiddenError } = require('../errors/exception')
const Message = require('../models/Message')

const getAllMessage = async () => {
    const result = await Message.find()
    if(result.length !== 0)
        return result
    else
        throw new NotFoundException('Not found any message')
}

const getMessageByUserId = async (userId) => {
    const result = await Message.findById({userId : userId})
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
const updateMessage = async (messageId, messageData) => {
    const result = await Message.findByIdAndUpdate(messageId, messageData, {new: true, runValidators: true})
    if(result)
        return result
    else
        throw new ForbiddenError('Can not update message')
}
const deleteMessage = async (messageId) => {
    const result = await Message.findByIdAndUpdate(messageId)
    if(result)
        return result
    else
        throw new ForbiddenError('Can not delete message')
}

module.exports = {
    getAllMessage,
    getMessageByUserId,
    createMessage,
    updateMessage,
    deleteMessage,
}