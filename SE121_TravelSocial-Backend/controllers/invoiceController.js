const invoiceSvc = require('../services/invoiceSvc')
const bookingSvc = require('../services/bookingSvc')
const Invoice = require('../models/Invoice').Invoice
const Service = require('../models/Service')

module.exports.createInvoice = async (req, res, next) => {
    const {bookingId} = req.body
    try {
        const booking = await bookingSvc.getBookingById(bookingId)
        const items = booking.items
        const services = booking.services
        const invoiceItem = await invoiceSvc.createInvoiceItem(items, services)
        const invoiceData = new Invoice({
            bookingId,
            invoiceDate: Date.now(),
            invoiceItem: invoiceItem,
            tax: booking.totalPrice * 0.08,
            totalPrice: booking.totalPrice,
            invoiceItem
        })
        const result = await invoiceSvc.createInvoice(invoiceData)
        res.status(201).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}