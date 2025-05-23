const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { COLLECTION_LIST } = require('../../enum/collection.enum');
const {VOUCHER_STATUS, DISCOUNT_TYPE, VOUCHER_SOURCE} = require('../../enum/voucher.enum');

const COLLECTION_NAME = 'Vouchers';
const DOCUMENT_NAME = 'Voucher'

const voucherSchema = new Schema({
    source: {type: String, enum: VOUCHER_SOURCE, required: true},
    locationId: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_LIST.LOCATION
    },
    description: {
        type: String,
        required: true
    },
    discount: { // Loại khuyến mãi: theo % hoặc trừ trực tiếp
        amount: {type: Number, required: true},
        type: {type: String, enum: DISCOUNT_TYPE}
    },
    maxDiscount: { // Giá tiền tối đa có thể được khuyến mãi
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    maxUse: {
        type: Number,
        required: true
    },
    usesCount: {
        type: Number,
        default: 0
    },
    maxUsePerUser: {
        type: Number
    },
    minOderValue: {
        type: Number
    },
    productApplied: { 
        type: [Schema.Types.ObjectId],
        default: []
    },
    status: {
        type: String,
        enum: VOUCHER_STATUS
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});

module.exports = mongoose.model(DOCUMENT_NAME, voucherSchema);
