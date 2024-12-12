const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PaymentSchema = new Schema({
    paymentMethodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaymentMethod',
        require: true,
    },
    amount: {type: String, require: true},
    status:  {type: String, enum: ['pending', 'failed', 'completed'], default: 'pending'},
    providerSessionId:  {type: String, require: true}, //ID tu ngan hang/vi dien tu tra ve
    invoiceId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice',
        require: 'true',
    },

}, {collection: 'Payment'});

const Payment = mongoose.model('Payment', PaymentSchemaSchema);
module.exports = Payment

