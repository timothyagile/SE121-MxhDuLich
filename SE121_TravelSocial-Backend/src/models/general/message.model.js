const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mediaSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    }
}, { _id: false })

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
    message: {
        type: String,
        require: true,
    }, 
    images: {
        type: [mediaSchema],
    }, 
    videos: {
        type: [mediaSchema]
    }
}, {collection: 'Message', timestamps: true})

const Message = mongoose.model('Message', MessageSchema)
module.exports = Message