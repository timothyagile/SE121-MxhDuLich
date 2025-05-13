const Router = require('express')
const bookingController = require('../../controllers/booking/booking.controller')
const bookingVoucherController = require('../../controllers/booking/booking-voucher.controller')
const { requireAuth, checkUser } = require('../../middleware/auth.middleware')
const { asyncHandler } = require('../../middleware/asyncFunction')
const router = new Router()

router.get('/booking/getall', bookingController.getAllBooking)
router.get('/booking/getbyid/:id', bookingController.getBookingById)
router.get('/booking/getbyuserid/:userId', bookingController.getBookingByUserId)
router.get('/booking/getbylocationid/:locationId', bookingController.getBookingByLocationId)
router.get('/booking/getbybusinessid/:businessId', bookingController.getBookingByBusinessId)
router.post('/booking/createbooking', bookingController.createBooking)
router.put('/booking/update/:id', bookingController.updateBooking)
router.put('/booking/addservice/:id', bookingController.addServices)
router.delete('/booking/delete/:id', bookingController.deleteBooking)
router.get('/bookings/revenue', bookingController.getRevenueByMonth)
router.get('/bookings/revenue/:businessId', bookingController.getBookingRevenue)

// Endpoints liên quan đến voucher cho booking
router.post('/booking/:bookingId/apply-voucher', checkUser, asyncHandler(bookingVoucherController.applyVoucherToBooking))
router.post('/booking/:bookingId/remove-voucher', checkUser, asyncHandler(bookingVoucherController.removeVoucherFromBooking))

module.exports = router