const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    roomId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room', 
        required: true 
    }, 
    quantity: 
    {
        type: Number,
        require: true,
        default: 1,
    } 
})

const BookingSchema = new Schema({
    dateBooking: {
        type: Date,
        require: true
    },
    checkinDate: {
        type: Date,
        require: true
    },
    checkoutDate: {
        type: Date,
        require: true
    },
    items: {
        type: [ItemSchema],
        default: []
    },
    status: {
        type: String,
        enum: ['pending', 'complete', 'fail'],
        default: 'pending'
    }
}, {collection: 'Booking'});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking

