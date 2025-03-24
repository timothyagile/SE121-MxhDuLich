const Router = require('express')
const bookingController = require('../controllers/bookingController')
const { requireAuth } = require('../middleware/authMiddleware')
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

module.exports = router