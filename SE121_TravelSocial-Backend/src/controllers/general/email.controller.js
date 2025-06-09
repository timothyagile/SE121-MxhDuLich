const BookingEmailSender = require("../../components/template-method/booking.email");

module.exports.sendBookingEmail = async (req, res) => {
    const { to, body } = req.body;
    const { userName, bookingDate, checkinDate, checkoutDate, price} = body;
    const email = new BookingEmailSender(to, body);
    await email.send();
    res.status(200).json({
        isSuccess: true,
        data: "Email sent successfully",
        error: null,
    });
}