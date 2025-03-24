const mongoose = require('mongoose')
const Location = require('../general/location.model')
const Schema = mongoose.Schema;


const ReviewSchema = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
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

const reCaculateRating = async (oldRating, numberOfRating, newRating) => {
    return (oldRating * numberOfRating + newRating)  / (numberOfRating + 1);
}

ReviewSchema.pre('save', async function(next) {
    const location = await Location.findById(this.locationId)
    if(!location)
        throw new Error('Location not found')
    const rate = await reCaculateRating(location.rating, location.numberOfRating, this.rating)
    location.rating = rate
    location.numberOfRating += 1
    await location.save()
    next()
})

const Review = mongoose.model('Review', ReviewSchema)
module.exports = Review