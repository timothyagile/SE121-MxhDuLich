const vnpayService = require("../../services/booking/vnpay.service");

module.exports.createVnPayPayment = async (req, res) => {
    const { bookingId, clientIp } = req.body;
    const response = await vnpayService.createPayment(bookingId, clientIp);
    res.status(201).json({
        isSuccess: true,
        data: response,
        error: null,
    });
}

module.exports.handleVnpayReturn = async (req, res) => {
    console.log("VNPAY RETURN Query Params:", req.query);
    const result = await vnpayService.processVnpayReturn(req.query);

    // Redirect client đến trang thông báo của frontend
    // Ví dụ: YOUR_FRONTEND_APP_URL/payment-status?bookingId=...&status=...&message=...
    const redirectUrl = `${process.env.FRONTEND_URL}/payment-status?bookingId=${result.bookingId}&vnp_ResponseCode=${result.code}&message=${encodeURIComponent(result.message)}`;
    res.redirect(redirectUrl);
}