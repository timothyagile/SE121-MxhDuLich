const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceUsageSchema = new Schema({
    serviceId: {type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true},
    bookingId: {type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true},
    quantity: {type: Number, required: true},
    totalPrice: {type: Number, required :true}
}, {collection: 'ServiceUsage'});

const ServiceUsage = mongoose.model('ServiceUsage', serviceUsageSchema);
module.exports = ServiceUsage

