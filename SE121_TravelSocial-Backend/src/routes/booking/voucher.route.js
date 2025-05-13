const express = require('express');
const router = express.Router();
const voucherController = require('../../controllers/booking/voucher.controller');
const { checkUser, checkAdmin } = require('../../middleware/auth.middleware');
const { asyncHandler } = require('../../middleware/asyncFunction');

// Route cho người dùng - sử dụng voucher
router.get('/voucher/code/:code', checkUser, asyncHandler(voucherController.getVoucherByCode));
router.post('/voucher/apply/:code', checkUser, asyncHandler(voucherController.applyVoucher));
router.post('/voucher/use/:voucherId', checkUser, asyncHandler(voucherController.useVoucher));

// Route dành cho admin - quản lý voucher
router.post('/voucher', checkUser, checkAdmin, asyncHandler(voucherController.createVoucher));
router.get('/vouchers', checkUser, asyncHandler(voucherController.getAllVouchers));
router.get('/voucher/:voucherId', checkUser, asyncHandler(voucherController.getVoucherById));
router.put('/voucher/:voucherId', checkUser, checkAdmin, asyncHandler(voucherController.updateVoucher));
router.delete('/voucher/:voucherId', checkUser, checkAdmin, asyncHandler(voucherController.deleteVoucher));

module.exports = router;
