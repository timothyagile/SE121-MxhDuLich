const Booking = require('../models/Booking')
const {NotFoundException, ForbiddenError} = require('../errors/exception')

const getAllBooking = async () => {
    const result = await Booking.find()
    if(result.length !== 0)
        return result
    else
        throw new NotFoundException('Not found')
    
}
const getBookingById = async (id) => {
    const result = await Booking.findById(id)
    if(result)
        return result
    else
        throw new NotFoundException('Not found specific booking')

}
const createBooking = async (bookingData) => {
    const result = bookingData.save()
    if(result)
        return result
    else
        throw new ForbiddenError('Not allow to create')

}
const updateBooking = async (bookingId, bookingData) => {
    const result = Booking.findByIdAndUpdate(bookingId, bookingData, {new: true, runValidators: true})
    if(result)
        return result
    else
        throw new NotFoundException('Not allow to update')

}
const deleteBooking = async (bookingId) => {
    const result = Booking.findByIdAndDelete(bookingId)
    if(result)
        return result
    else
        throw new NotFoundException('Not allow to delete')

}

module.exports = {
    getAllBooking,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking,
}