const {Router} = require('express')
const paymentController = require('../../controllers/booking/payment.controller')


const router = Router()

router.get('/payment', paymentController.getAllPayment);
router.post('/payment', paymentController.createPayment);


module.exports = router