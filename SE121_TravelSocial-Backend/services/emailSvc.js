const nodemailer = require('nodemailer');

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

module.exports = {
    transporter,
    approveMail,
}

