const Payment = require("../models/payment.model");
const constants = require("../utils/constant");
const sendNotificationReq = require("../utils/sendEmailRequest")

exports.getAllPayments = async(req, res) => {
    try{
        let queryObj = {};

        if(req.user.userType == constants.userType.admin){
            queryObj._id = req.user.myPayments;
        }

        const payments = await Payment.find(queryObj);

        res.status(200).send(payments);

    }catch(err){
        console.log("Error while getting all the payment records", err.message);
        return res.status(500).send({
            message : "Internal server error while getting all the payments record"
        })
    }
}


exports.getOnePayment = async(req, res) => {

    res.status(200).send(req.paymentInParams);

}

exports.createPayment = async(req, res) => {
    try{

        const paymentObj = {
            bookingId : req.body.bookingId,
            amount : req.body.amount,
            status : req.body.status
        }

        const payment = await Payment.create(paymentObj);

        if(payment.status == constants.paymentStatuses.success){
            req.booking.status = constants.bookingStatuses.completed
            sendNotificationReq.successfulTicketPayment(req.user.email, payment)
        }else{
            req.booking.status = constants.bookingStatuses.failed
            sendNotificationReq.failedTicketPayment(req.user.email, payment)
        }
        
        await req.booking.save();

        req.user.myPayments.push(payment._id);
        await req.user.save();

        res.status(200).send(payment);

    }catch(err){
        console.log("Error while creating the payment", err.message);
        return res.status(500).send({
            message : "Internal server error while creating the payment"
        })
    }
}