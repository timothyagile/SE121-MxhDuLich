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

const MonthlyStatisticsSchema = new Schema({
    month: {
        type: Number, // Tháng (1-12)
        required: true,
    },
    year: {
        type: Number, // Năm
        required: true,
    },
    totalRevenue: {
        type: Number, // Tổng doanh thu của tháng
        required: true,
        default: 0,
    },
    totalBookings: {
        type: Number, // Tổng số lượng booking trong tháng
        required: true,
        default: 0,
    },
});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking

