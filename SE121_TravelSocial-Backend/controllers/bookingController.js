const Booking = require('../models/Booking')
const bookingSvc = require('../services/bookingSvc')

module.exports.getAllBooking = async (req, res, next) => {
    try {
        const result = await bookingSvc.getAllBooking()
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
    const bookingId = req.params.id
    try {
        const result = await bookingSvc.getBookingById(bookingId)
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

module.exports.getBookingByUserId = async (req, res, next) => {
    const {userId} = req.params
    try {
        const result = await bookingSvc.getBookingByUserId(userId)
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

module.exports.getBookingByLocationId = async (req, res, next) => {
    const locationId = req.params.locationId;
    try {
        const result = await bookingSvc.getBookingByLocationId(locationId)
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
        const result = await bookingSvc.createBooking(bookingData)
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
        const result = await bookingSvc(bookingId, bookingData)
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
        const result = await bookingSvc.deleteBooking(bookingId)
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