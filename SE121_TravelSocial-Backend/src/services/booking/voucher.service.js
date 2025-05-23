const Voucher = require('../../models/booking/voucher.model')
const Location = require('../../models/general/location.model')
const Room = require('../../models/booking/room.model')
const {NotFoundException, ForbiddenError} = require('../../errors/exception')
const { default: mongoose } = require('mongoose')
const { VOUCHER_SOURCE } = require('../../enum/voucher.enum')

const getAllVouchers = async (skip, limit) => {
    const vouchers = await Voucher.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    
    if(vouchers.length !== 0)
        return vouchers
    else
        throw new NotFoundException('Không tìm thấy voucher nào')
}

const getVoucherById = async (voucherId) => {
    const result = await Voucher.findById(voucherId)
    if(result)
        return result
    else
        throw new NotFoundException('Không tìm thấy voucher')
}
//TODO: Lấy voucher của hệ thống

const getVoucherByLocationId = async (locationId) => {
    const result = await Voucher.find({ locationId: locationId })
    if(result.length !== 0)
        return result
    else
        throw new NotFoundException('Địa điểm này chưa có voucher nào')
}

const getVoucherByCode = async (code) => {
    const result = await Voucher.findOne({ code: code })
    if(result)
        return result
    else
        throw new NotFoundException('Không tìm thấy mã voucher')
}

const createVoucher = async (voucher, userId) => {
    const {
        source, locationId,description, discount, maxDiscount,
        code,startDate,endDate,maxUse,maxUsePerUser,
        minOderValue,productApplied,status
    } = voucher

    // Kiểm tra mã voucher đã tồn tại chưa
    const existingVoucher = await Voucher.find({code: code})
    if(existingVoucher.length !== 0) {
        throw new ForbiddenError('Mã voucher đã tồn tại')
    }
        
    // Kiểm tra xem locationId có tồn tại không
    const locationIdObj = new mongoose.Types.ObjectId(locationId)
    if(source !== VOUCHER_SOURCE.SYSTEM) {
        const location = Location.findById(locationId)
        if(!location)
            throw new NotFoundException('Không tìm thấy địa điểm')

        if(location.ownerId !== userId) 
            throw new ForbiddenError('Bạn không có quyền tạo voucher cho địa điểm này')
    }
    // Kiểm tra xem productApplied có tồn tại không
    if(productApplied && productApplied.length > 0) {
        const products = await Room.find({ _id: { $in: productApplied } })
        if(products.length !== productApplied.length)
            throw new NotFoundException('Một hoặc nhiều sản phẩm không tồn tại')
    }
    const voucherData = new Voucher(voucher)
    const savedVoucher = await voucherData.save()
    if(savedVoucher)
        return savedVoucher
    else
        throw new ForbiddenError('Tạo voucher thất bại')
}

const updateVoucher = async (voucherId, voucherData) => {
    const result = await Voucher.findByIdAndUpdate(voucherId, voucherData, {new: true, runValidators: true})
    if(result)
        return result
    else
        throw new ForbiddenError('Cập nhật thất bại')
}

const deleteVoucher = async (voucherId) => {
    const result = await Voucher.findByIdAndDelete(voucherId)
    if(result)
        return result
    else
        throw new ForbiddenError('Xóa thất bại')
}

const useVoucher = async (code, userId) => {
    const voucher = await Voucher.findOne({ code: code })
    
    if(!voucher)
        throw new NotFoundException('Không tìm thấy mã voucher')
    
    // Kiểm tra thời hạn voucher
    const currentDate = new Date()
    if(currentDate < voucher.startDate || currentDate > voucher.endDate)
        throw new ForbiddenError('Mã voucher không hợp lệ trong thời gian này')
    
    // Kiểm tra đã đạt giới hạn sử dụng chưa
    if(voucher.usesCount >= voucher.maxUse)
        throw new ForbiddenError('Mã voucher đã đạt giới hạn sử dụng')
    
    //TODO: Check bill có đạt điều kiện sử dụng hay chưa
    
    // Tăng số lần sử dụng
    voucher.usesCount += 1
    const result = await voucher.save()
    
    if(result)
        return result
    else
        throw new ForbiddenError('Không thể sử dụng voucher')
}

module.exports = {
    getAllVouchers,
    getVoucherById,
    getVoucherByLocationId,
    getVoucherByCode,
    createVoucher,
    updateVoucher,
    deleteVoucher,
    useVoucher
}