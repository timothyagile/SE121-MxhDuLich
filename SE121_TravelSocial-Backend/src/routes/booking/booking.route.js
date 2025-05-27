const Router = require('express')
const bookingController = require('../../controllers/booking/booking.controller')
const { requireAuth, checkUser } = require('../../middleware/auth.middleware')
const router = new Router()

router.get('/booking/getall', bookingController.getAllBooking)
router.get('/booking/getbyid/:id', bookingController.getBookingById)
router.get('/booking/getbyuserid/:userId', bookingController.getBookingByUserId)
router.get('/booking/getbylocationid/:locationId', bookingController.getBookingByLocationId)
router.get('/booking/getbybusinessid/:businessId', bookingController.getBookingByBusinessId)
router.post('/booking/createbooking', checkUser ,bookingController.createBooking)
router.put('/booking/update/:id', bookingController.updateBooking)
router.put('/booking/addservice/:id', bookingController.addServices)
router.delete('/booking/delete/:id', bookingController.deleteBooking)
router.get('/bookings/revenue', bookingController.getRevenueByMonth)
router.get('/bookings/revenue/:businessId', bookingController.getBookingRevenue)
router.post('/bookings/calculate', bookingController.calculateTotalEstimatedPrice)

router.post('/booking/preview', checkUser, bookingController.createPreviewBooking)
router.get('/booking/preview/:previewId', checkUser, bookingController.getPreviewBooking)

module.exports = router