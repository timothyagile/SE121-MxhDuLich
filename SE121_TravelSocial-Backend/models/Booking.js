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
    tax: {type: Number, required: 0},
    totalPriceAfterTax: {type: Number, default: 0},
    amountPaid: {type: Number, default: 0},
    status: {
        type: String,
        enum: ['pending', 'confirm' ,'complete', 'canceled'],
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
//Recalculate totalPrice

const calculateTotalRoomPrice = (rooms) => {
    return rooms.reduce((total, room) => {
      return total + (room.price * room.nights * room.quantity);
    }, 0);
  };
  
const calculateTotalServicePrice = (services) => {
    return services.reduce((total, service) => {
        return total + (service.price * service.quantity);
    }, 0);
};
  
//Hook
BookingSchema.pre('save', async function (next) {
    const totalRoomPrice = calculateTotalRoomPrice(this.items);
    const totalServicePrice = calculateTotalServicePrice(this.services);
    this.totalPrice = totalRoomPrice + totalServicePrice
    this.tax = this.totalPrice * 0.08
    this.totalPriceAfterTax = this.totalPrice + this.tax
    console.log(this.totalPrice)

    if(this.totalPriceAfterTax > this.amountPaid)
        this.status = 'confirm'
    if(this.totalPriceAfterTax === this.amountPaid)
        this.status = 'complete'
    next()
})

const Booking = mongoose.model('Booking', BookingSchema);
const ServiceBooked = mongoose.model('ServiceBooked', serviceSchema);
module.exports = {
    Booking, 
    ServiceBooked
}

