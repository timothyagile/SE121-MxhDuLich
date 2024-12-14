const Booking = require('../models/Booking')
const {NotFoundException, ForbiddenError} = require('../errors/exception')
const { default: mongoose } = require('mongoose')



const updateStatusBooking = async (bookingId, amountPayed) => {
    const booking = await Booking.findById(bookingId);
    console.log(amountPayed)
    console.log(booking.totalPrice)
    if (booking.totalPrice === amountPayed) {
        booking.status = 'complete'
        booking.save()
    }
    else {
        throw new ForbiddenError('Cannot update status')
    }
}

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

const getBookingByUserId = async (userId) => {
    const result = await Booking.find({userId : userId})
    if(result.length !== 0)
        return result
    else
        throw new NotFoundException('Not found')
}

//TODO: 
const getBookingByLocationId = async (locationId) => {
    console.log(locationId)
    const result = await Booking.aggregate([
        { $unwind: "$items" },

        {$lookup: {
            from: "Room",
            localField: "items.roomId",
            foreignField: "_id",
            as: "BookedRoom"
        }},

        { $unwind: "$BookedRoom"},
            // Lọc các tài liệu chỉ chứa roomId tương ứng
        { $match: { "BookedRoom.locationId": new mongoose.Types.ObjectId(locationId) } },
        {
            $group: {
                _id: "$_id", // Group theo booking ID
                userId: { $first: "$userId" },
                dateBooking: { $first: "$dateBooking" },
                checkinDate: { $first: "$checkinDate" },
                checkoutDate: { $first: "$checkoutDate" },
                totalPrice: { $first: "$totalPrice" },
                status: { $first: "$status" },
                items: {
                    $push: {
                        roomId: "$items.roomId",
                        quantity: "$items.quantity",
                        roomDetails: {
                            name: "$BookedRoom.name",
                            pricePerNight: "$BookedRoom.pricePerNight",
                        },
                    },
                },
            },
        },
    ]);
    if(result.length !== 0)
        return result
    else
        throw new NotFoundException('Not found')
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
    updateStatusBooking,
    getAllBooking,
    getBookingById,
    getBookingByUserId,
    getBookingByLocationId,
    createBooking,
    updateBooking,
    deleteBooking,
}