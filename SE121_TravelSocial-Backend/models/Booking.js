const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room', 
        required: true 
    },
    price: {type: Number, required: true}, 
    quantity: 
    {
        type: Number,
        require: true,
        default: 1,
    },
    nights: {type: Number, required: true} 
})

const serviceSchema = new Schema({
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    price: {type: Number, required: true},
    quantity: 
    {
        type: Number,
        require: true,
        default: 1,
    },
})

const BookingSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
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
        type: [roomSchema],
        required: true,
    },
    services: {
        type: [serviceSchema],
        default: []
    },
    totalPrice: {type: Number, required: true},
    status: {
        type: String,
        enum: ['pending', 'complete', 'fail'],
        default: 'pending'
    }
}, {collection: 'Booking'});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking

