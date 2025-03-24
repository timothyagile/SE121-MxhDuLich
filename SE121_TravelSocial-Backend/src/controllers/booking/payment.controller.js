const Payment = require('../../models/booking/payment.model.js')
const paymentSvc = require('../../services/booking/payment.service.js')
const bookingSvc = require('../../services/booking/booking.service.js')
module.exports.createPayment = async (req, res, next) => {
    const {
        //paymentMethodId, 
        amount,
        bookingId,
        //providerSessionId,
    } = req.body
    const paymentData = new Payment({amount, bookingId})
    try {
        const result = await paymentSvc.createPayment(paymentData)
        const amountPayed = await paymentSvc.caculatePayed(bookingId)
        //const updateStatusBooking = await bookingSvc.updateStatusBooking(bookingId, amountPayed)
        res.status(200).json({
            isSuccess: true,
            data: result,
            error: null,
        });
    } catch (error) {
        next(error)
    }
}

module.exports.getAllPayment = async (req, res, next) => {
    
    try {
        const result = await paymentSvc.getAllPayment()
        res.status(200).json({
            isSuccess: true,
            data: result,
            error: null,
        });
    } catch (error) {
        next(error)
    }
}

