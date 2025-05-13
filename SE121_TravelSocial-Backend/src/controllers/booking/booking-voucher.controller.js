const { OK } = require('../../constants/httpStatusCode');
const bookingVoucherService = require('../../services/booking/booking-voucher.service');

/**
 * Áp dụng voucher vào đơn đặt phòng
 */
const applyVoucherToBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { voucherCode } = req.body;
    
    if (!voucherCode) {
        return res.status(400).json({
            isSuccess: false,
            message: 'Vui lòng cung cấp mã voucher'
        });
    }
    
    const data = await bookingVoucherService.applyVoucherToBooking(bookingId, voucherCode);
    
    res.status(OK).json({ 
        isSuccess: true,
        data: data
    });
};

/**
 * Hủy áp dụng voucher
 */
const removeVoucherFromBooking = async (req, res) => {
    const { bookingId } = req.params;
    
    const data = await bookingVoucherService.removeVoucherFromBooking(bookingId);
    
    res.status(OK).json({ 
        isSuccess: true,
        data: data
    });
};

module.exports = {
    applyVoucherToBooking,
    removeVoucherFromBooking
};
