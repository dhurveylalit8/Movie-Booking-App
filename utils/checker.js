const Booking = require("../models/booking.model");
const constants = require("./constant");
const sendNotificationReq = require("../utils/sendEmailRequest");

exports.checkBookingStatus = (bookingId) => {

    setTimeout(async () => {
        const bookingData = await Booking.findOne({_id : bookingId});

        if(bookingData.bookingStatus != constants.bookingStatuses.completed){
            bookingData.bookingStatus = constants.bookingStatuses.cancelled;
            await bookingData.save();
            sendNotificationReq.bookingPaymentTimedOut(user.email)
        }
    }, 120000);
}