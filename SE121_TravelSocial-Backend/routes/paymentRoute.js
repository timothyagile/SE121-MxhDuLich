const {Router} = require('express')
const paymentController = require('../controllers/paymentController.js')


const router = Router()

router.post('/payment', paymentController.createPayment);


module.exports = router