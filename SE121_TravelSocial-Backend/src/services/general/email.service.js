const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const htmlFilePath = path.join(__dirname, '../../utils', 'confirmBookingEmail.html');
const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'nguyenphucthinh123pro@gmail.com',
        pass: 'ncvxppwdeeirtfmr'
    }
});

const approveMail = (from, email) => {
  return {
        from: 'nguyenphucthinh123pro@gmail.com',
        to: '22521415@gm.uit.edu.vn',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    }
};

const confirmBookingEmail = (from, email) => {
    return {
        from: 'nguyenphucthinh123pro@gmail.com',
        to: '22521415@gm.uit.edu.vn',
        subject: 'Đơn đặt phòng của bạn đã được xác nhận',
        html: htmlContent
    }
}

module.exports = {
    transporter,
    approveMail,
    confirmBookingEmail
}

