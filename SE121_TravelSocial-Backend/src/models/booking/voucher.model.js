const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoucherSchema = new Schema({
    code: { 
        type: String, 
        required: true,
        unique: true,
        uppercase: true
    },
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String,
        default: ''
    },
    type: {
        type: String,
        enum: ['PERCENT', 'AMOUNT'], // PERCENT: giảm theo %, AMOUNT: giảm theo số tiền cố định
        required: true
    },
    value: {
        type: Number,
        required: true // Giá trị giảm (% hoặc số tiền)
    },
    maxDiscount: {
        type: Number, // Giảm giá tối đa (áp dụng cho loại PERCENT)
        default: null
    },
    minOrderValue: {
        type: Number, // Giá trị đơn hàng tối thiểu để áp dụng voucher
        default: 0
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    usageLimit: {
        type: Number, // Số lần sử dụng tối đa, null là không giới hạn
        default: null
    },
    usageCount: {
        type: Number, // Số lần đã sử dụng
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    applyFor: {
        type: String,
        enum: ['ALL', 'ROOM', 'SERVICE'], // Áp dụng cho tất cả, chỉ phòng, hoặc chỉ dịch vụ
        default: 'ALL'
    },
    locationIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    }], // Danh sách location được áp dụng voucher, nếu rỗng thì áp dụng cho tất cả
    userIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }], // Danh sách user được áp dụng voucher, nếu rỗng thì áp dụng cho tất cả
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { collection: 'Voucher' });

// Middleware để cập nhật thời gian updatedAt trước khi lưu
VoucherSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Phương thức kiểm tra voucher có hợp lệ không
VoucherSchema.methods.isValid = function() {
    const now = new Date();
    return (
        this.isActive &&
        now >= this.startDate &&
        now <= this.endDate &&
        (this.usageLimit === null || this.usageCount < this.usageLimit)
    );
};

// Phương thức tính toán giá trị giảm giá
VoucherSchema.methods.calculateDiscount = function(totalAmount) {
    // Nếu tổng đơn hàng không đạt giá trị tối thiểu
    if (totalAmount < this.minOrderValue) {
        return 0;
    }

    let discount = 0;
    if (this.type === 'PERCENT') {
        discount = totalAmount * this.value / 100;
        // Kiểm tra giới hạn giảm giá tối đa
        if (this.maxDiscount !== null && discount > this.maxDiscount) {
            discount = this.maxDiscount;
        }
    } else { // AMOUNT
        discount = this.value;
    }

    return discount;
};

const Voucher = mongoose.model('Voucher', VoucherSchema);

module.exports = Voucher;
