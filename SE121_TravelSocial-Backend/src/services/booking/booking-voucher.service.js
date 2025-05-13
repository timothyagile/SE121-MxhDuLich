const voucherService = require('./voucher.service');
const bookingService = require('./booking.service');

/**
 * Áp dụng voucher vào đơn đặt phòng
 */
const applyVoucherToBooking = async (bookingId, voucherCode) => {
    // Lấy thông tin booking
    const booking = await bookingService.getBookingById(bookingId);
    if (!booking) {
        throw new Error('Không tìm thấy đơn đặt phòng');
    }

    // Kiểm tra nếu booking đã có voucher
    if (booking.voucher && booking.voucher.voucherId) {
        throw new Error('Đơn đặt phòng này đã áp dụng voucher');
    }

    // Áp dụng voucher
    const voucherResult = await voucherService.applyVoucher(voucherCode, {
        userId: booking.userId,
        totalAmount: booking.totalPriceAfterTax,
        locationId: booking.items[0].roomId.locationId, // Lấy locationId của phòng đầu tiên
    });

    // Cập nhật booking với thông tin voucher
    booking.voucher = {
        voucherId: voucherResult.voucher.id,
        code: voucherResult.voucher.code,
        discountAmount: voucherResult.discountAmount
    };

    // Tính toán lại giá cuối cùng
    booking.finalPrice = booking.totalPriceAfterTax - voucherResult.discountAmount;

    // Lưu booking
    await booking.save();

    // Cập nhật số lần sử dụng của voucher
    await voucherService.useVoucher(voucherResult.voucher.id);

    return {
        booking,
        voucherInfo: voucherResult
    };
};

/**
 * Hủy áp dụng voucher
 */
const removeVoucherFromBooking = async (bookingId) => {
    // Lấy thông tin booking
    const booking = await bookingService.getBookingById(bookingId);
    if (!booking) {
        throw new Error('Không tìm thấy đơn đặt phòng');
    }

    // Kiểm tra nếu booking không có voucher
    if (!booking.voucher || !booking.voucher.voucherId) {
        throw new Error('Đơn đặt phòng này chưa áp dụng voucher');
    }

    // Giữ thông tin voucher để trả về
    const removedVoucher = { ...booking.voucher };

    // Xóa voucher khỏi booking
    booking.voucher = {
        voucherId: null,
        code: null,
        discountAmount: 0
    };

    // Tính toán lại giá cuối cùng
    booking.finalPrice = booking.totalPriceAfterTax;

    // Lưu booking
    await booking.save();

    return {
        booking,
        removedVoucher
    };
};

module.exports = {
    applyVoucherToBooking,
    removeVoucherFromBooking
};
