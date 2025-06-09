let express = require('express');
let router = express.Router();
const {asyncHandler} = require('../../middleware/asyncFunction')
const vnpayController = require('../../controllers/booking/vnpay.controller');


router.post('/create_payment_url', asyncHandler(vnpayController.createVnPayPayment))

router.get('/vnpay_return', asyncHandler(vnpayController.handleVnpayReturn))

 

module.exports = router;