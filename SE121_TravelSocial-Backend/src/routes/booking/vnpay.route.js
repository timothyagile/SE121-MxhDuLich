let express = require('express');
let router = express.Router();
const {asyncHandler} = require('../../middleware/asyncFunction')
const vnpayController = require('../../controllers/booking/vnpay.controller');


router.post('/create_payment_url', asyncHandler(vnpayController.createVnPayPayment))

router.get('/vnpay_return', async (req, res) => {
    console.log("VNPAY RETURN", req.query);
})

 

module.exports = router;