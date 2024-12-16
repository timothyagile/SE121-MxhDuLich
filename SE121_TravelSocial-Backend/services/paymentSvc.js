const { default: mongoose } = require('mongoose')
const { ForbiddenError } = require('../errors/exception')
const Payment = require('../models/Payment')
const Booking = require('../models/Booking').Booking



const getAllPayment = async (paymentData) => {
    const result = await Payment.find()
    if(result)
        return result
    else
        throw new ForbiddenError('Cannot create')
}

const createPayment = async (paymentData) => {
    const result = await paymentData.save()
    const booking = await Booking.findById(paymentData.bookingId)
    booking.amountPaid += paymentData.amount
    await booking.save()
    if(result)
        return result
    else
        throw new ForbiddenError('Cannot create')
}

const caculatePayed = async (bookingId) => {
    const id = new mongoose.Types.ObjectId(bookingId) 
    const payments = await Payment.find({bookingId: id})
    const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
    if(totalAmount.length !== 0)
        return totalAmount  
    else
        throw new ForbiddenError('Cannot caculate')
}

module.exports = {
    getAllPayment,
    createPayment,
    caculatePayed
}