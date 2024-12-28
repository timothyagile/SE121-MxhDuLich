const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const ConversationSchema = new Schema({
    member: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        require: true,
    },
    timestamp: {
        type: Date,
        require: true,
        default: Date.now
    },
}, {collection: 'Conversation'})

const Conversation = mongoose.model('Conversation', ConversationSchema)
module.exports = Conversation