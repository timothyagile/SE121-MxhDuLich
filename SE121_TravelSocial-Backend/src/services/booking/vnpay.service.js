require('dotenv').config();
const moment = require('moment');
const qs = require('qs');
const crypto = require('crypto');

const {VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat} = require('vnpay');

const createPayment = async () => {
    console.log("Key: ", process.env.VNP_TMN_CODE, process.env.VNP_SECRET_KEY);
    const vnpay =  new VNPay({
        tmnCode: "35NVNR07",
        secureSecret: "OTODG22EESNVE8GKX7VV21GKOR8IFCQT",
        vnpayHost: "https://sandbox.vnpayment.vn",
        testMode: true, // Set to false for production
        hashAlgorithm: "SHA512", // Use SHA512 for hashing
        loggerFn: ignoreLogger, // Use ignoreLogger to disable logging
    })

    console.log("VNPAY Instance Created::", vnpay);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Set expiration date to tomorrow

    const vnpayResponse = await vnpay.buildPaymentUrl({
        vnp_Amount: 10000, // Amount in VND
        vnp_IpAddr: "127.0.0.1",
        vnp_TxnRef: "123456", // Unique transaction reference
        vnp_OrderInfo: "123456",
        vnp_OrderType: ProductCode.Other,
        vnp_ReturnUrl: "http://localhost:3000/vnpay_return",
        vnp_Locale: VnpLocale.VN, // Locale for the payment page
        vnp_CreateDate: dateFormat(new Date()),
        vnp_ExpireDate: dateFormat(tomorrow)
    })

    console.log("VNPAY Payment URL Created::", vnpayResponse);

    return vnpayResponse;
}

// const createPayment = async () => {
//     const vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
//     const ipAddr = "127.0.0.1";
//     const tmnCode = "35NVNR07";
//     const secretKey = "KGLW2VK4VPMRG0ICZCGUEYKHLYJ40VNG";
//     const vnp_ReturnUrl = "http://localhost:3000/vnpay_return";

//     const vnp_Params = {
//         vnp_Version: "2.1.0",
//         vnp_Command: "pay",
//         vnp_TmnCode: tmnCode,
//         vnp_Locale: "vn",
//         vnp_CurrCode: "VND",
//         vnp_TxnRef: Date.now().toString(),
//         vnp_OrderInfo: "Thanh toan don hang",
//         vnp_OrderType: "other",
//         vnp_Amount: 100000 * 100,
//         vnp_ReturnUrl: vnp_ReturnUrl,
//         vnp_IpAddr: ipAddr,
//         vnp_CreateDate: moment().format("YYYYMMDDHHmmss"),
//     };

//     // ✅ Sắp xếp đúng thứ tự alphabet của keys
//     const sortedParams = {};
//     Object.keys(vnp_Params).sort().forEach((key) => {
//         sortedParams[key] = vnp_Params[key];
//     });

//     // ✅ Tạo chuỗi ký không encode
//     const signData = qs.stringify(sortedParams, { encode: false });

//     // ✅ Tạo chữ ký
//     const hmac = crypto.createHmac("sha512", secretKey);
//     const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

//     // ✅ Gắn chữ ký vào URL
//     sortedParams.vnp_SecureHash = signed;

//     const paymentUrl = `${vnp_Url}?${qs.stringify(sortedParams, { encode: true })}`;
//     return paymentUrl;
// };



module.exports = {
    createPayment
};