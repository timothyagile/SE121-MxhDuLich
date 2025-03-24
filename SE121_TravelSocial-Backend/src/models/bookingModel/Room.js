const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const facilitySchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number, default: 1},
    icon: { type: String, default: null }, // có thể thay đổi thành type khác nếu cần
    description: { type: String}
})

const bedSchema = new Schema({
    category: { type: String, required: true , enum: ['single', 'double']}, //enum
    quantity: { type: Number, required: true ,},
    icon: { type: String, default: null }, // có thể thay đổi thành type khác nếu cần
})

const roomSchema = new Schema({
    locationId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location', 
        required: true },
    name: { type: String, required: true },
    quantity: {type: String, required: true, min: 0},
    rating: { type: Number, min: 0, max: 5 },
    pricePerNight: { type: Number, required: true },
    capacity: {type: Number, required: true},
    description: { type: String},
    facility: { type: [facilitySchema], default: [] },
    bed: {type: [bedSchema], default: []},
    image: { type: [String], default: []},
    area: {type: Number, required: true}
    }, 
    {collection: 'Room'}
)

const Room = mongoose.model('Room', roomSchema)
module.exports = Room