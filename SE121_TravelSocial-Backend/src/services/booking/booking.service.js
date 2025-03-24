const Booking = require('../../models/booking/booking.model').Booking
const ServiceBooked = require('../../models/booking/booking.model').ServiceBooked
const Location = require('../../models/general/location.model')
const Service = require('../../models/booking/service.model')
const Room = require('../../models/booking/room.model')
const {NotFoundException, ForbiddenError} = require('../../errors/exception')
const { default: mongoose } = require('mongoose')

const updateStatusBooking = async (bookingId, amountPayed) => {
    const booking = await Booking.findById(bookingId);
    if(!booking)
        throw new NotFoundException('Cannot found booking to calculate')
    booking.amountPaid = amountPayed
    await booking.save()
}

const getAllBooking = async () => {
    const result = await Booking.find()
    if(result.length !== 0)
        return result
    else
        throw new NotFoundException('Not found')
    
}
const getBookingById = async (id) => {
    console.log('id: ', id);    
    const result = await Booking.findById(id)
    .populate({
        path: 'items.roomId',
        select: 'name'
    })
    .populate({
        path: 'services.serviceId',
        select: 'name'
    }) 
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
    for (let item of bookingData.items) {
        const room = await Room.findById(item.roomId, 'pricePerNight');
        console.log('room: ', room);
        item.price = room.pricePerNight;
    }
    
    for (let service of bookingData.services) {
        const service = await Service.findById(service.serviceId);
        service.price = service.price;
    }
    console.log('before: ', bookingData);
    const result = await bookingData.save();
    console.log('after: ',result);
    if(result)
        return result
    else
        throw new ForbiddenError('Not allow to create')
}

const updateBooking = async (bookingId, bookingData) => {
    console.log('booking: ', await Booking.findById(bookingId));
    const result = await Booking.findByIdAndUpdate(bookingId, bookingData, {new: true, runValidators: true})
    if(result)
        return result
    else
        throw new NotFoundException('Not allow to update')
}

const addServices = async (bookingId, serviceId) => {
    const booking = await Booking.findById(bookingId)
    if(!booking)
        throw new NotFoundException('Not found booking to add service')
    const service = await Service.findById(serviceId)
    if(!service)
        throw new NotFoundException('Not found service')
    const newService = new ServiceBooked({
        serviceId: service.id,
        price: service.price
    })
    booking.services.push(newService)
    const result = await booking.save()
    if(result)
        return result
    else
        throw new ForbiddenError('Cannot add service')
}

const deleteBooking = async (bookingId) => {
    const result = Booking.findByIdAndDelete(bookingId)
    if(result)
        return result
    else
        throw new NotFoundException('Not allow to delete')
}

const getBookingByBusinessId = async (businessId) => {
    const locations = await Location.find({ ownerId: businessId });
    console.log('locations: ',locations)
    const locationIds = locations.map(location => location._id);
    const rooms = await Room.find({ locationId: { $in: locationIds } });
    console.log('rooms: ', rooms);
    const roomIds = rooms.map(room => room._id);
    console.log('roomId: ',roomIds);
    const bookings = await Booking.find({
        items: {
            $elemMatch: {
                roomId: { $in: roomIds }, 
            },
        },
    });
    return bookings;
};

const getRevenueByMonth = async (month, year) => {
    const startDate = new Date(year, month - 1, 1); // Ngày đầu tiên của tháng
    const endDate = new Date(year, month, 1); // Ngày đầu tiên của tháng tiếp theo

    const result = await Booking.aggregate([
        {
            $match: {
                dateBooking: {
                    $gte: startDate,
                    $lt: endDate,
                },
            },
        },
        {
            $group: {
                _id: null, 
                totalRevenue: { $sum: "$totalPriceAfterTax" }, 
                totalBookings: { $sum: 1 }, 
            },
        },
    ]);

    if (result.length > 0) {
        return {
            totalRevenue: result[0].totalRevenue,
            totalBookings: result[0].totalBookings,
        };
    } else {
        return {
            totalRevenue: 0,
            totalBookings: 0,
        };
    }
};

const getBookingRevenueByMonthForBusiness = async (businessId, month, year) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    console.log('business ID: ', businessId);
  
    try {
      // Bước 1: Tìm tất cả các Room thuộc businessId qua Location
      const locations = await Location.find({ ownerId: businessId });
      console.log('Locations:', locations); // Kiểm tra nếu không có location
  
      const locationIds = locations.map(location => location._id);
      console.log('Location IDs:', locationIds);
  
      const rooms = await Room.find({ locationId: { $in: locationIds } });
      console.log('Rooms:', rooms); // Kiểm tra xem có phòng không
  
      const roomIds = rooms.map(room => room._id);
      console.log('Room IDs:', roomIds);
  
      // Bước 2: Tìm tất cả các Booking cho các Room của businessId trong tháng
      const bookings = await Booking.aggregate([
        { 
          $match: {
            dateBooking: {
              $gte: startDate,
              $lt: endDate,
            },
            "items.roomId": { $in: roomIds },
          }
        },
        {
            $unwind: "$items", 
        },
        {
            $match: {
                "items.roomId": { $in: roomIds }, 
            },
        },

        {
          $group: {
            _id: null,  
            totalRevenue: { $sum: "$totalPriceAfterTax" },
            totalBookings: { $sum: 1 },
          }
        }
      ]);
  
      console.log('Bookings Result:', bookings); 
  
      if (bookings.length > 0) {
        return {
          totalRevenue: bookings[0].totalRevenue,
          totalBookings: bookings[0].totalBookings,
        };
      } else {
        return {
          totalRevenue: 0,
          totalBookings: 0,
        };
      }
    } catch (error) {
      console.log('Error:', error);
      throw new Error("Error retrieving revenue data: " + error.message);
    }
};
  
module.exports = {
    updateStatusBooking,
    getAllBooking,
    getBookingById,
    getBookingByUserId,
    getBookingByLocationId,
    getBookingByBusinessId,
    createBooking,
    updateBooking,
    addServices,
    deleteBooking,
    getRevenueByMonth,
    getBookingRevenueByMonthForBusiness,
}