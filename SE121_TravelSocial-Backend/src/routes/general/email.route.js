const Router = require('express')
const emailController = require('../../controllers/general/email.controller')
const router = new Router()

router.post('/emails', emailController.sendBookingEmail)

module.exports = router