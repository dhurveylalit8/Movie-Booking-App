const Booking = require("../models/booking.model");
const ObjectId = require("mongoose").Types.ObjectId;
const constants = require("../utils/constant");

function isValidObjectId(id){

    if(ObjectId.isValid(id)){
        if(String(new ObjectId) === id)
            return true;
        return false;
    }
    return false;
}


const newPaymentBody = async(req, res, next) => {

    try{

        if(!req.body.bookingId){
            return res.status(400).send({
                message : " Failed ! Bokking id is not provided"
            })
        }else{
            if(!isValidObjectId(req.body.bookingId)){
                return res.status(400).send({
                    message : "Failed ! Invalid bookingId provided"
                })
            }

            const booking = await Booking.findOne({_id : req.body.bookingId})

            if(!booking){
                return res.status(400).send({
                    message : "Failed ! BookingId provided does not exist"
                });
            }else if(booking.status != constants.bookingStatuses.inProgess){
                return res.status(400).send({
                    message : "Failed ! Booking status is not IN_PROGRESS"
                })
            }

            if(req.user._id.valueOf() != booking.userId.valueOf()){
                return res.status(403).send({
                    message : "Failed ! You cannot do the payment for this booking"
                })
            }

            req.booking = booking;
        }

        if(!req.body.amount){
            return res.status(400).send({
                message : "Failed ! Amount is not provided"
            })
        }else{
            if(typeof req.body.amount !== "number"){
                return res.status(400).send({
                    message : "Failed ! Amount provided is not in the correct format (Number)"
                })
            }

            if(req.booking.totalCost != req.body.amount){
                return res.status(400).send({
                    message : "Failed ! Amount does not match with the total cost of booking"
                })
            }
        }

        const paymentStatuses = [constants.paymentStatuses.success, constants.paymentStatuses.failed]

        if(!req.body.status){
            return res.status(400).send({
                message : "Failed ! Payment status is not provided"
            })
        }else if(!paymentStatuses.includes(req.body.status)){
            return res.status(400).send({
                message : "Failed ! Payment status provided is not valid"
            })
        }

        next();

    }catch(err){
        console.log("Error while validating new payment request body", err.message);
        return res.status(500).send({
            message : "Internal server error while new payment body validation"
        })
    }
}

const validatePaymentRequestbody = {
    newPaymentBody
}

module.exports = validatePaymentRequestbody