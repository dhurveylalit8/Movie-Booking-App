const Booking = require("../models/booking.model");
const constants = require("../utils/constant");
const checker = require("../utils/checker");
const sendNotificationReq = require("../utils/sendEmailRequest")

exports.getAllBookings = async(req, res) => {

    let queryObj = {};

    if(req.user.userType != constants.userType.admin){
        queryObj.userId = req.user._id;
    }

    const bookings = await Booking.find({queryObj});

    res.status(200).send(bookings);
}


exports.getSingleBooking = async(req, res) => {
    try{
        const booking = await Booking.findOne({_id : req.params.id});

        res.status(200).send(booking);

    }catch(err){
        console.log("Error while getting single booking record", err.message);
        return res.status(500).send({
            message : "Internal server error while getting single booking record"
        })
    }
}


exports.initiateBooking = async(req, res) => {

    try{
        const bookingObj = {
            userId : req.user._id,
            theatreId : req.body.theatreId,
            movieId : req.body.movieId,
            noOfSeats : req.body.noOfSeats,
            ticketBookedTime : Date.now(),
            totalCost : req.bookedTheatre.ticketPrice * req.body.noOfSeats
        }

        const booking = await Booking.create(bookingObj);
        req.user.myBookings.push(booking._id);
        await req.user.save();

        req.bookedMovie.bookings.push(booking._id);
        await req.bookedMovie.save();

        res.status(201).send(booking);

        checker.checkBookingStatus(booking._id);

    }catch(err){
        console.log("Error while initiating the booking", err.message);

        return res.status(500).send({
            message : "Internal error while initiating the booking"
        })
    }
}


exports.updateTheBookingDetails = async (req, res) => {

    try{
        req.bookingInParams.theatreId = req.body.theatreId != undefined ? req.body.theatreId : req.bookingInParams.theatreId;
        req.bookingInParams.movieId = req.body.movieId != undefined ? req.body.movieId : req.bookingInParams.movieId;
        req.bookingInParams.noOfSeats = req.body.noOfSeats != undefined ? req.body.noOfSeats : req.bookingInParams.noOfSeats;
        req.bookingInParams.status = req.body.status != undefined ? req.body.status : req.bookingInParams.status;
        req.bookingInParams.totalCost = req.body.totalCost != undefined ? (req.bookedTheatre.ticketPrice * req.body.noOfSeats) : req.bookingInParams.totalCost;

        const updateBookingObject = await req.bookingInParams.save();
        if(updateBookingObject.status == constants.bookingStatuses.cancelled){
            sendNotificationReq.bookingCancelled(req.user.email)
        }

        return res.status(200).send(updateBookingObject);

    }catch(err){
        console.log("Error while updating booking details", err.message);
        res.status(500).send({
            message : "Internal server error while updating the booking details"
        })
    }
}