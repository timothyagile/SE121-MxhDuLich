const mongoose = require('mongoose');
const { CONV_TYPE } = require('../../enum/chat.enum');
const Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    }
}, { _id: false })

const ConversationSchema = new Schema({
    member: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        require: true,
    },
    type: {
        type: String, 
        enum: CONV_TYPE,
        default: CONV_TYPE.PRIVATE
    },
    name: {
        type: String, 
        default: null
    }, 
    avatar: {
        type: imageSchema, 
        default: null
    }, 
    lastMessage: {
        type: String,
        default: "Hãy gửi lời chào đến bạn bè của bạn"
    }
}, 
{
    collection: 'Conversation',
    timestamps: true
})

const Conversation = mongoose.model('Conversation', ConversationSchema)
module.exports = Conversation