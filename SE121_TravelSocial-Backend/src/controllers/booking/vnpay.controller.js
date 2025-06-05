const vnpayService = require("../../services/booking/vnpay.service");

module.exports.createVnPayPayment = async (req, res) => {
    const response = await vnpayService.createPayment();
    res.status(201).json({
        isSuccess: true,
        data: response,
        error: null,
    });
}