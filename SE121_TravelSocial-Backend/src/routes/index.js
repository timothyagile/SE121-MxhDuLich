const express = require('express')

//Booking route


const roomRoute = require('./booking/room.route')
const bookingRoute = require('./booking/booking.route')
const recommendationRoute = require('./booking/recommendation.route')
const invoiceRoute = require('./booking/invoice.route')
const paymentRoute = require('./booking/payment.route')
const serviceRoute = require('./booking/service.route')
const reviewRoute = require('./booking/review.route')
const VNPayRoute = require('./booking/vnpay.route')

//Social route

const postRoute = require('./social/post.route')

//General

const authRoute = require('./general/auth.route')
const locationRoute = require('./general/location.route')
const businessRoute = require('./general/business.route')
const userCollectionRoute = require('./general/user-collection.route')
const uploadImageRoute = require('./general/upload-image.route')
const conversationRoute = require('./general/conversation.route')
const messageRoute = require('./general//message.route')
const executeCronJobRoute = require('./general/execute-cronjob.route')

const router = express.Router();

router.use('/', roomRoute)
router.use('/', bookingRoute)
router.use('/', recommendationRoute)
router.use('/', invoiceRoute)
router.use('/', paymentRoute)
router.use('/', serviceRoute)
router.use('/', reviewRoute)
router.use('/', VNPayRoute)
router.use('/', postRoute)
router.use('/', authRoute)
router.use('/', locationRoute)
router.use('/', businessRoute)
router.use('/', userCollectionRoute)
router.use('/', uploadImageRoute)
router.use('/', conversationRoute)
router.use('/', messageRoute)
router.use('/', executeCronJobRoute)

module.exports = router

