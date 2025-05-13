const { OK, CREATED } = require('../../constants/httpStatusCode');
const voucherService = require('../../services/booking/voucher.service');

/**
 * Tạo voucher mới
 */
const createVoucher = async (req, res) => {
    const voucherData = req.body;
    voucherData.createdBy = res.locals.user._id; // Người tạo là người dùng hiện tại
    
    const data = await voucherService.createVoucher(voucherData);
    
    res.status(CREATED).json({ 
        isSuccess: true,
        data: data
    });
};

/**
 * Lấy danh sách tất cả voucher
 */
const getAllVouchers = async (req, res) => {
    const query = req.query;
    const data = await voucherService.getAllVouchers(query);
    
    res.status(OK).json({ 
        isSuccess: true,
        data: data.data,
        pagination: data.pagination
    });
};

/**
 * Lấy chi tiết một voucher theo ID
 */
const getVoucherById = async (req, res) => {
    const { voucherId } = req.params;
    const data = await voucherService.getVoucherById(voucherId);
    
    res.status(OK).json({ 
        isSuccess: true,
        data: data
    });
};

/**
 * Lấy voucher theo mã code
 */
const getVoucherByCode = async (req, res) => {
    const { code } = req.params;
    const data = await voucherService.getVoucherByCode(code);
    
    res.status(OK).json({ 
        isSuccess: true,
        data: data
    });
};

/**
 * Cập nhật thông tin voucher
 */
const updateVoucher = async (req, res) => {
    const { voucherId } = req.params;
    const updateData = req.body;
    
    const data = await voucherService.updateVoucher(voucherId, updateData);
    
    res.status(OK).json({ 
        isSuccess: true,
        data: data
    });
};

/**
 * Xóa voucher
 */
const deleteVoucher = async (req, res) => {
    const { voucherId } = req.params;
    const data = await voucherService.deleteVoucher(voucherId);
    
    res.status(OK).json({ 
        isSuccess: true,
        message: data.message
    });
};

/**
 * Kiểm tra và áp dụng voucher
 */
const applyVoucher = async (req, res) => {
    const { code } = req.params;
    const voucherData = req.body;
    
    // Thêm userId từ token nếu chưa có
    if (!voucherData.userId) {
        voucherData.userId = res.locals.user._id;
    }
    
    const data = await voucherService.applyVoucher(code, voucherData);
    
    res.status(OK).json({ 
        isSuccess: true,
        data: data
    });
};

/**
 * Cập nhật trạng thái voucher sau khi sử dụng
 */
const useVoucher = async (req, res) => {
    const { voucherId } = req.params;
    const data = await voucherService.useVoucher(voucherId);
    
    res.status(OK).json({ 
        isSuccess: true,
        data: data
    });
};

module.exports = {
    createVoucher,
    getAllVouchers,
    getVoucherById,
    getVoucherByCode,
    updateVoucher,
    deleteVoucher,
    applyVoucher,
    useVoucher
};
