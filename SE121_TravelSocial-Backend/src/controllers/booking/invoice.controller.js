const invoiceSvc = require('../../services/booking/invoice.service')
const bookingSvc = require('../../services/booking/booking.service')
const Invoice = require('../../models/booking/booking.model').Invoice
const Service = require('../../models/booking/service.model')
const { NotFoundException, ForbiddenError } = require('../../errors/exception')

module.exports.createInvoice = async (req, res, next) => {
    const {bookingId} = req.body
    try {
        const booking = await bookingSvc.getBookingById(bookingId)
        if(!bookingId)
            throw new NotFoundException('Cannot found booking to export invoice')
        if(booking.status !== 'complete')
            throw new ForbiddenError('Cannot export invoice because payment has not been completed')
        const items = booking.items
        const services = booking.services
        const invoiceItem = await invoiceSvc.createInvoiceItem(items, services)
        const invoiceData = new Invoice({
            bookingId,
            invoiceDate: Date.now(),
            invoiceItem: invoiceItem,
            tax: booking.tax,
            totalPrice: booking.totalPrice,
            totalPriceAfterTax: booking.totalPriceAfterTax,
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