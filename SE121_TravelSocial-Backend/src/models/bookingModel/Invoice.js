const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const invoiceItemSchema = new Schema({
    itemName: {type: String, required: true},
    quantity: {type: Number, default: 1},
    price: {type: Number, required: true},
    totalPrice: {type: Number, required: true}
})

const invoiceSchema = new Schema({
    bookingId: {type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true},
    invoiceDate: {type: Date, required: true},
    tax: {type: Number, required: true},
    invoiceItem: {type: [invoiceItemSchema], required: true},
    totalPrice: {type: Number, required: true},
    totalPriceAfterTax: {type: Number, required: true},
    status: {type: String, enum: ['pending', 'failed', 'completed'], default: 'pending'}
}, {collection: 'Invoice'})

const Invoice = mongoose.model('Invoice', invoiceSchema)
const InvoiceItem = mongoose.model('ItemItem', invoiceItemSchema)
module.exports = {Invoice, InvoiceItem}