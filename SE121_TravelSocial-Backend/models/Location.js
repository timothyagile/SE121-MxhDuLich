const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const imageSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    }
})

const locationSchema = new Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Nếu bạn có model User liên quan
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        //required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    image: {
        type: [imageSchema],
        default: []
    },
    address: {
        type: String,
        required: true,
    },
    category: {
        id: {
            type: String,
            //required: true,
        },
        cateName: {
            type: String,
            //required: true,
        },
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    latitude: Number,
    longtitude: Number,
},  
{ collection: 'Location' }
);

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;