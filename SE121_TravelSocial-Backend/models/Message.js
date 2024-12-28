const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const MessageSchema = new Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        require: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    }, 
    date: {
        type: Date,
        require: true,
        default: Date.now
    },
    message: {
        type: String,
        require: true,
    }
}, {collection: 'Message'})

const Message = mongoose.model('Message', MessageSchema)
module.exports = Message