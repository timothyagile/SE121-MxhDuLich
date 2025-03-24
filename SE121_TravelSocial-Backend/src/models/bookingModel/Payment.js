const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PaymentSchema = new Schema({
    paymentMethodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaymentMethod',
        require: true,
    },
    amount: {type: Number, require: true},
    status:  {type: String, enum: ['pending', 'failed', 'completed'], default: 'pending'},
    providerSessionId:  {type: String, require: true}, //ID tu ngan hang/vi dien tu tra ve
    bookingId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        require: 'true',
    },

}, {collection: 'Payment'});

const Payment = mongoose.model('Payment', PaymentSchema);
module.exports = Payment

