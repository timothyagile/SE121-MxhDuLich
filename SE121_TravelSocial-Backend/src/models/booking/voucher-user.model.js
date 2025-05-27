const mongoose = require('mongoose'); // Erase if already required
const { VOUCHER_USER } = require('../../enum/voucher.enum');

COLLECTION_NAME = 'Voucher_users'
DOCUMENT_NAME = 'Voucher_user'
// Declare the Schema of the Mongo model
var voucherUserSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true,
        index:true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    status: {
        type: String,
        enum: VOUCHER_USER,
        default: VOUCHER_USER.SAVED,
    }
}, {
    timestamps: true, 
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, voucherUserSchema);