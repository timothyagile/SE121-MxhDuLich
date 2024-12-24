const Booking = require('../models/Booking').Booking
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

module.exports.getBookingByBusinessId = async (req, res, next) => {
    const {businessId} = req.params;
    try {
        const result = await bookingSvc.getBookingByBusinessId(businessId)
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
        services,
        status,
        totalPrice
    } = req.body
    
    try {
        const bookingData = new Booking({
            dateBooking,
            checkinDate,
            checkoutDate,
            items,
            services,
            totalPrice,
            status,       
        })
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

module.exports.addServices = async (req, res, next) => {
    const bookingId = req.params.id
    const {serviceId} = req.body
    try {
        const result = await bookingSvc.addServices(bookingId, serviceId)
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

module.exports.getRevenueByMonth = async (req, res, next) => {
    const { month, year } = req.query; // Lấy month, year từ query params
    try {
        if (!month || !year) {
            throw new Error('Month and year are required.');
        }

        const result = await bookingSvc.getRevenueByMonth(parseInt(month), parseInt(year));
        res.status(200).json({
            isSuccess: true,
            data: result,
            error: null,
        });
    } catch (error) {
        next(error); // Xử lý lỗi thông qua middleware
    }
};

module.exports.getBookingRevenue = async (req, res, next) => {
    const { businessId } = req.params;
    try {
        
        if (!businessId) {
            return res.status(400).json({ isSuccess: false, error: 'Business ID is required', data: null });
        }
        const { month, year } = req.query;

        const result = await bookingSvc.getBookingRevenueByMonthForBusiness(
            businessId,
            parseInt(month),
            parseInt(year)
        );

        res.status(200).json({
            isSuccess: true,
            data: result,
            error: null,
        });
    } catch (error) {
        next(error);
    }
};
