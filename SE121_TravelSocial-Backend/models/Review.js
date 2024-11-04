const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const ReviewSchema = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        require: false,
    },
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        require: false,
    },
    date: {
        type: Date,
        require: true,
        default: Date.now
    },
    rating: {
        type: Number,
        require: true,
        min: 0, max: 5
    },
    review: {
        type: String,
        require: true,
    }
}, {collection: 'Review'})

const Review = mongoose.model('Review', ReviewSchema)
module.exports = Review