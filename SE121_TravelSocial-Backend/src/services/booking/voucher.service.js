'use strict'
const Voucher = require('../../models/booking/voucher.model');
const { BadRequest, NotFoundException } = require('../../errors/exception');
const mongoose = require('mongoose');

/**
 * Tạo voucher mới
 */
const createVoucher = async (voucherData) => {
    // Kiểm tra mã voucher đã tồn tại chưa
    const existingVoucher = await Voucher.findOne({ code: voucherData.code.toUpperCase() });
    if (existingVoucher) {
        throw new BadRequest('Mã voucher đã tồn tại');
    }

    // Kiểm tra ngày bắt đầu và ngày kết thúc
    if (new Date(voucherData.startDate) > new Date(voucherData.endDate)) {
        throw new BadRequest('Ngày kết thúc phải sau ngày bắt đầu');
    }

    // Nếu là loại PERCENT, giá trị phải từ 1-100
    if (voucherData.type === 'PERCENT' && (voucherData.value <= 0 || voucherData.value > 100)) {
        throw new BadRequest('Giá trị phần trăm phải nằm trong khoảng 1-100');
    }

    // Nếu là loại AMOUNT, giá trị phải lớn hơn 0
    if (voucherData.type === 'AMOUNT' && voucherData.value <= 0) {
        throw new BadRequest('Giá trị giảm giá phải lớn hơn 0');
    }

    // Tạo voucher mới
    const voucher = new Voucher(voucherData);
    return await voucher.save();
};

/**
 * Lấy danh sách tất cả voucher
 */
const getAllVouchers = async (query = {}) => {
    const { 
        isActive, 
        page = 1, 
        limit = 10, 
        sort = 'createdAt', 
        order = 'desc',
        search = ''
    } = query;

    const filter = {};
    
    // Lọc theo trạng thái active
    if (isActive !== undefined) {
        filter.isActive = isActive === 'true';
    }

    // Tìm kiếm theo tên hoặc mã
    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: 'i' } },
            { code: { $regex: search, $options: 'i' } }
        ];
    }

    // Tính toán skip để phân trang
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Sắp xếp
    const sortOptions = {};
    sortOptions[sort] = order === 'asc' ? 1 : -1;

    // Thực hiện truy vấn với phân trang
    const vouchers = await Voucher.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit))
        .populate('createdBy', 'userName userEmail');

    // Đếm tổng số voucher thỏa mãn điều kiện
    const total = await Voucher.countDocuments(filter);

    return {
        data: vouchers,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            totalPages: Math.ceil(total / parseInt(limit))
        }
    };
};

/**
 * Lấy chi tiết một voucher theo ID
 */
const getVoucherById = async (voucherId) => {
    const voucher = await Voucher.findById(voucherId)
        .populate('createdBy', 'userName userEmail')
        .populate('locationIds', 'name address')
        .populate('userIds', 'userName userEmail');

    if (!voucher) {
        throw new NotFoundException('Không tìm thấy voucher');
    }

    return voucher;
};

/**
 * Lấy voucher theo mã code
 */
const getVoucherByCode = async (code) => {
    const voucher = await Voucher.findOne({ code: code.toUpperCase() });
    if (!voucher) {
        throw new NotFoundException('Không tìm thấy voucher');
    }

    return voucher;
};

/**
 * Cập nhật thông tin voucher
 */
const updateVoucher = async (voucherId, updateData) => {
    // Kiểm tra voucher có tồn tại không
    const voucher = await Voucher.findById(voucherId);
    if (!voucher) {
        throw new NotFoundException('Không tìm thấy voucher');
    }

    // Không cho phép cập nhật một số trường quan trọng
    if (updateData.code && updateData.code !== voucher.code) {
        const existingVoucher = await Voucher.findOne({ code: updateData.code.toUpperCase() });
        if (existingVoucher && !existingVoucher._id.equals(voucherId)) {
            throw new BadRequest('Mã voucher đã tồn tại');
        }
    }

    // Kiểm tra ngày bắt đầu và ngày kết thúc
    if (updateData.startDate && updateData.endDate) {
        if (new Date(updateData.startDate) > new Date(updateData.endDate)) {
            throw new BadRequest('Ngày kết thúc phải sau ngày bắt đầu');
        }
    } else if (updateData.startDate && !updateData.endDate) {
        if (new Date(updateData.startDate) > voucher.endDate) {
            throw new BadRequest('Ngày kết thúc phải sau ngày bắt đầu');
        }
    } else if (!updateData.startDate && updateData.endDate) {
        if (voucher.startDate > new Date(updateData.endDate)) {
            throw new BadRequest('Ngày kết thúc phải sau ngày bắt đầu');
        }
    }

    // Nếu là loại PERCENT, giá trị phải từ 1-100
    if (updateData.type === 'PERCENT' && updateData.value !== undefined) {
        if (updateData.value <= 0 || updateData.value > 100) {
            throw new BadRequest('Giá trị phần trăm phải nằm trong khoảng 1-100');
        }
    } else if (updateData.type === 'AMOUNT' && updateData.value !== undefined) {
        if (updateData.value <= 0) {
            throw new BadRequest('Giá trị giảm giá phải lớn hơn 0');
        }
    }

    // Cập nhật voucher
    const updatedVoucher = await Voucher.findByIdAndUpdate(
        voucherId,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    return updatedVoucher;
};

/**
 * Xóa voucher
 */
const deleteVoucher = async (voucherId) => {
    const result = await Voucher.findByIdAndDelete(voucherId);
    if (!result) {
        throw new NotFoundException('Không tìm thấy voucher');
    }
    return { message: 'Đã xóa voucher thành công' };
};

/**
 * Kiểm tra và áp dụng voucher
 */
const applyVoucher = async (code, data) => {
    const { userId, totalAmount, locationId, itemType } = data;
    
    // Tìm voucher theo mã
    const voucher = await Voucher.findOne({ code: code.toUpperCase() });
    if (!voucher) {
        throw new NotFoundException('Mã voucher không hợp lệ');
    }

    // Kiểm tra voucher có còn hiệu lực không
    if (!voucher.isValid()) {
        throw new BadRequest('Voucher đã hết hạn hoặc đã hết lượt sử dụng');
    }

    // Kiểm tra giá trị đơn hàng tối thiểu
    if (totalAmount < voucher.minOrderValue) {
        throw new BadRequest(`Giá trị đơn hàng phải từ ${voucher.minOrderValue.toLocaleString()} VND trở lên để áp dụng voucher này`);
    }

    // Kiểm tra voucher có áp dụng cho location này không
    if (voucher.locationIds && voucher.locationIds.length > 0) {
        if (!locationId || !voucher.locationIds.some(id => id.toString() === locationId)) {
            throw new BadRequest('Voucher không áp dụng cho địa điểm này');
        }
    }

    // Kiểm tra voucher có áp dụng cho user này không
    if (voucher.userIds && voucher.userIds.length > 0) {
        if (!userId || !voucher.userIds.some(id => id.toString() === userId)) {
            throw new BadRequest('Voucher không áp dụng cho tài khoản của bạn');
        }
    }

    // Kiểm tra loại mục áp dụng
    if (itemType && voucher.applyFor !== 'ALL' && voucher.applyFor !== itemType) {
        throw new BadRequest(`Voucher chỉ áp dụng cho ${voucher.applyFor === 'ROOM' ? 'phòng' : 'dịch vụ'}`);
    }

    // Tính toán giá trị giảm giá
    const discountAmount = voucher.calculateDiscount(totalAmount);

    // Trả về thông tin voucher và giá trị giảm giá
    return {
        voucher: {
            id: voucher._id,
            code: voucher.code,
            name: voucher.name,
            type: voucher.type,
            value: voucher.value,
        },
        originalAmount: totalAmount,
        discountAmount: discountAmount,
        finalAmount: totalAmount - discountAmount
    };
};

/**
 * Cập nhật trạng thái voucher sau khi sử dụng
 */
const useVoucher = async (voucherId) => {
    const voucher = await Voucher.findById(voucherId);
    if (!voucher) {
        throw new NotFoundException('Không tìm thấy voucher');
    }

    // Tăng số lần sử dụng lên 1
    voucher.usageCount += 1;

    // Nếu đã đạt giới hạn sử dụng, cập nhật trạng thái
    if (voucher.usageLimit !== null && voucher.usageCount >= voucher.usageLimit) {
        voucher.isActive = false;
    }

    await voucher.save();
    return voucher;
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
