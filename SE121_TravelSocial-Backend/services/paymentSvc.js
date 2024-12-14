const { default: mongoose } = require('mongoose')
const { ForbiddenError } = require('../errors/exception')
const Payment = require('../models/Payment')

const createPayment = async (paymentData) => {
    const result = await paymentData.save()
    if(result)
        return result
    else
        throw new ForbiddenError('Cannot create')
}

const caculatePayed = async (bookingId) => {
    const id = new mongoose.Types.ObjectId(bookingId) 
    const payment = await Payment.find({bookingId: id})
    console.log(payment)
    const totalAmount = await Payment.aggregate([
        { $match: { bookingId: id} },
        { $group: { _id: null ,total: { $sum: '$amount' } } }
    ]);
    console.log(totalAmount)
    if(totalAmount.length !== 0)
        return result
    else
        throw new ForbiddenError('Cannot caculate')
}

module.exports = {
    createPayment,
    caculatePayed
}