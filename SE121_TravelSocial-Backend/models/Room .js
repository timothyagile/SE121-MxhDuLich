const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const facilitySchema = new Schema({

    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    icon: { type: String, default: null }, // có thể thay đổi thành type khác nếu cần
    description: { type: String}
})

const roomSchema = new Schema({
    locationId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location', 
        required: true },
    name: { type: String, required: true },
    status: { type: String, required: true, enum: ['available', 'unavailable'] },
    rating: { type: Number, min: 0, max: 5 },
    price: { type: Number, required: true },
    description: { type: String},
    facility: { type: [facilitySchema], default: [] }
    }, 
    {collection: 'Room'}
)

const Room = mongoose.model('Room', roomSchema)
module.exports = Room