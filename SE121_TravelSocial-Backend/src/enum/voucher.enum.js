'use strict'

const VOUCHER_TYPE = {
    PERCENT: 'PERCENT',  // Giảm theo phần trăm
    AMOUNT: 'AMOUNT',    // Giảm theo số tiền cố định
};

const APPLY_FOR = {
    ALL: 'ALL',         // Áp dụng cho tất cả
    ROOM: 'ROOM',       // Chỉ áp dụng cho phòng
    SERVICE: 'SERVICE', // Chỉ áp dụng cho dịch vụ
};

module.exports = {
    VOUCHER_TYPE,
    APPLY_FOR
}
