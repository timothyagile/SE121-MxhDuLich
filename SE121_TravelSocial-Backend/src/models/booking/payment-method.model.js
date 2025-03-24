const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PMethodSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true 
    },
    methodType: {type: String, require: true},
    providerName: {type: String, require: true},
    numberAccount: {type: String, reuqire: true}
}, {collection: 'PaymentMethod'});

const  PaymentMethod = mongoose.model('PaymentMethod', PMethodSchema);
module.exports = PaymentMethod

