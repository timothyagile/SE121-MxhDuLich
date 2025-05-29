const nodemailer = require("nodemailer");
// email/EmailSender.js
class EmailSender {
    constructor(to, data) {
        this.to = to;
        this.data = data;
    }
  
    async send() {
        const subject = this.getSubject();
        const html = this.generateBody();
        const mailOptions = {
            from: '"YourApp" <no-reply@yourapp.com>',
            to: this.to,
            subject,
            html,
        };
    
        await this.sendEmail(mailOptions);
    }
  
    // Template methods – subclasses must override
    getSubject() {
        throw new Error("Subclass must implement getSubject()");
    }
  
    generateBody() {
        throw new Error("Subclass must implement generateBody()");
    }
  
    // Shared logic – all subclasses use this
    async sendEmail(mailOptions) {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: 'nguyenphucthinh123pro@gmail.com',
                pass: 'ncvxppwdeeirtfmr'
            }
        });
        await transporter.sendMail(mailOptions);
    }
  }
  
  module.exports = EmailSender;
  