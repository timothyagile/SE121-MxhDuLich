const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TransactionSchema = new Schema({
    paymentMethodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaymentMethod',
        require: true,
    },
    amount: {type: String, require: true},
    status:  {type: String, enum: ['pending', 'failed', 'completed'], default: 'pending'},
    transactionId:  {type: String, require: true}, //ID tu ngan hang/vi dien tu tra ve
    bookingId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        require: 'true',
    }
}, {collection: 'Transaction'});

const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction

