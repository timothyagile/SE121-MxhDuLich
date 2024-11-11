const Booking = require('../models/Booking')
const bookingSvc = require('../services/bookingSvc')

module.exports.getAllBooking = async (req, res, next) => {
    try {
        const result = bookingSvc.getAllBooking()
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
module.exports.getBookingById = async (req, res, next) => {
    const bookingId = req.params
    try {
        const result = bookingSvc.getBookingById(bookingId)
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
module.exports.createBooking = async (req, res, next) => {
    const {
        dateBooking,
        checkinDate,
        checkoutDate,
        items,
        status,
    } = req.body
    const bookingData = new Booking({
        dateBooking,
        checkinDate,
        checkoutDate,
        items,
        status,       
    })
    try {
        const result = bookingSvc.createBooking(bookingData)
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
module.exports.updateBooking = async (req, res, next) => {
    const bookingData = req.body
    const {bookingId} = req.params
    try {
        const result = bookingSvc(bookingId, bookingData)
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
module.exports.deleteBooking = async (req, res, next) => {
    const {bookingId} = req.params
    try {
        const result = bookingSvc.deleteBooking(bookingId)
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