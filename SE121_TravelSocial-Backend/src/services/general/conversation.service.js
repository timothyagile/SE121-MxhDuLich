const { ForbiddenError, NotFoundException } = require('../../errors/exception');
const Conversation = require('../../models/general/conversation.model');

const getAllConversations = async ({firstId, secondId}) => {
    const result = await Conversation.find({member: {$all: [firstId, secondId]}})
    if(result.length !== 0) {
        return result
    }
    throw new NotFoundException('Conversation not found')
}
const getUserConversation = async (userId) => {
    const result = await Conversation.find({member: {$in: [userId]}}).populate('member', 'userName')
    if (result.length !== 0) {
        return result
    }    
    throw new NotFoundException('Conversation not found')
}
const createConversation = async (conversationData) => {
    const conversation = await Conversation.findOne({member: {$all : [conversationData.firstId, conversationData.secondId]}})
    if (conversation) {
        return conversation
    }
    const result = await conversationData.save()
    if (result) {
        return result
    }
    else {
        throw new ForbiddenError('Failed to create conversation')
    }
}

module.exports = {
    getAllConversations,
    getUserConversation,
    createConversation
}