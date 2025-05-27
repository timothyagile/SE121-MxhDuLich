const VoucherUser = require('../../models/booking/voucher-user.model');

const addVoucherUsage = async (userId, code, session = null) => {
    const usage = await VoucherUser.create([{
        userId,
        code,
        status: 'used'  // hoặc dùng enum như VOUCHER_USER.USED
    }], { session });

    return usage[0];
};

module.exports = {
    addVoucherUsage
};
