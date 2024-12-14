const invoiceSvc = require('../services/invoiceSvc')
const bookingSvc = require('../services/bookingSvc')
const Invoice = require('../models/Invoice')

module.exports.createInvoice = async (req, res, next) => {
    const {bookingId} = req.body
    try {
        const booking = await bookingSvc.getBookingById(bookingId)
        const item = booking.services
        const invoiceItem = await invoiceSvc.createInvoiceItem(item)
        const invoiceData = new Invoice({
            bookingId,
            invoiceItem: invoiceItem,
            tax: booking.totalPrice * 0.8,
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