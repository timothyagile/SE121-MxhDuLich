const EmailSender = require("./sender.email");

class BookingEmailSender extends EmailSender {
    constructor(to, data) {
        super(to, data);
    }

    getSubject() {
        return "Thông tin đơn đặt phòng của bạn";
    }

    generateBody() {
        return `
            <h1>Thông tin đơn đặt phòng</h1>
            <p>Xin chào,</p>
            <p>Cảm ơn bạn đã đặt phòng với chúng tôi. Dưới đây là thông tin chi tiết về đơn đặt phòng của bạn:</p>
            <ul>
                <li>Tên khách hàng: ${this.data.userName}</li>
                <li>Ngày đặt: ${this.data.bookingDate}</li>
                <li>Thời gian nhận phòng: ${this.data.checkinDate}</li>
                <li>Thời gian trả phòng: ${this.data.checkoutDate}</li>
                <li>Giá: ${this.data.price}</li>
            </ul>`;
    }
}

module.exports = BookingEmailSender;