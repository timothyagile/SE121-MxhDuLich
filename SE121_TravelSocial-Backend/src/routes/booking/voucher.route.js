const Router = require('express')
const voucherController = require('../../controllers/booking/voucher.controller')
const {asyncHandler} = require('../../middleware/asyncFunction')
const {checkUser, checkLocationOwner, checkAdmin} = require('../../middleware/auth.middleware')
const router = new Router()

// Lấy tất cả voucher
router.get('/voucher/getall', voucherController.getAllVouchers)

// Lấy voucher theo ID
router.get('/voucher/getbyid/:voucherId', voucherController.getVoucherById)

// Lấy voucher theo địa điểm
router.get('/voucher/getbylocationid/:locationId', voucherController.getVoucherByLocationId)

// Lấy voucher theo userId


// Lấy voucher theo mã code
router.get('/voucher/getbycode/:code', voucherController.getVoucherByCode)

// Tạo location voucher mới
router.post('/voucher/create', checkLocationOwner ,voucherController.createVoucher)

// Tạo system voucher mới
//router.post('/voucher/system/create', checkAdmin, voucherController.createVoucher)

// Cập nhật voucher
router.put('/voucher/update/:voucherId', voucherController.updateVoucher)

// Xóa voucher
router.delete('/voucher/delete/:voucherId', voucherController.deleteVoucher)

// Sử dụng voucher
router.put('/voucher/use/:code', voucherController.useVoucher)

module.exports = router