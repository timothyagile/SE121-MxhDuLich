const Router = require('express')
const bookingController = require('../controllers/bookingController')
const { requireAuth } = require('../middleware/authMiddleware')
const router = new Router()

router.get('/booking/getall', bookingController.getAllBooking)
router.get('/booking/getbyid/:id', bookingController.getBookingById)
router.get('/booking/getbyuserid/:userId', bookingController.getBookingByUserId)
router.get('/booking/getbylocationid/:locationId', bookingController.getBookingByLocationId)
router.post('/booking/createbooking', bookingController.createBooking)
router.put('/booking/update/:id', bookingController.updateBooking)
router.delete('/booking/delete/:id', bookingController.deleteBooking)

module.exports = router