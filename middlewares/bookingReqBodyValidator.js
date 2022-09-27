const Theatre = require("../models/theatre.model");
const Movie = require("../models/movie.model");
const {constants, ObjectIdChecker} = require("../utils");

const validateBookingBody = async (req, res, next) => {

    try{

        if(!req.bookingInParams){

            if(!req.body.movieId){

                return res.status(400).send({
                    message : "Please provide movie id"
                }) 
            }

            if(!req.body.theatreId){

                return res.status(400).send({
                    message : "Please provide theatre id"
                })
            }

            if(!req.body.noOfSeats){

                return res.status(400).send({
                    message : "Please provide no. of seats"
                })
            }
        }

        let theatre;
        let movie;

        if(req.body.theatreId){

            if(!ObjectIdChecker.isValidObjectId(req.body.theatreId)){
                return res.status(400).send({
                    message : "Invalid theatreId provided"
                })
            }
            theatre = await Theatre.findOne({_id : req.body.theatreId});

            if(!theatre){
                return res.status(400).send({
                    message : "TheatreId provided does not exist"
                })
            }

            if(req.body.bookingInParams && !req.body.movieId){

                if(theatre.movies.includes(req.bookingInParams.movieId)){
                    return res.status(400).send({
                        message : "The current movieId is not present in the new theatre"
                    })                }
            }

            req.bookedTheatre = theatre;
        }else if(req.bookingInParams){

            req.bookedTheatre = req.bookingInParams.theatreId;
        }

        if(req.body.movieId){
            if(!ObjectIdChecker.isValidObjectId(req.body.movieId)){

                return res.status(400).send({

                    message : "Invalid movieId provided"

                })

            }else{

                movie = await Movie.findOne({_id : req.body.movieId});

                if(!movie){

                    return res.status(400).send({

                        message : "MovieId provided does not exists in the given theatre"

                    })
                }else if(!theatre.movies.includes(movie._id)){
                    return res.status(400).send({
                        message : "MovieId provided does not exists in the given theatre"
                    })
                }

                req.bookedMovie = movie;

            }
        }

        if(req.body.noOfSeats){
            if(typeof req.body.noOfSeats !== "number"){

                return res.status(400).send({

                    message : "no. of seats given is not in the correct format"
                })
            }else if(req.body.noOfSeats > theatre.numberOfSeats || req.body.noOfSeats < 1){
                return res.status(400).send({
                    message : `Please select no. of seats in between 1 - ${theatre.numberOfSeats}`
                })
            }

        }else if(req.bookingInParams && theatre){

            if(req.bookingInParams.noOfSeats > theatre.numberOfSeats){

                return res.status(400).send({

                    message : `Only ${theatre.numberOfSeats} seats are available`

                })
            }
        }

        next();

    }catch(err){
        
        console.log("Error while validating the booking Req Body", err.message);
        res.status(500).send({
            messager : "Internal server error while validating the booking Req body"
        })
    }
}


const validateUpdateBookingReqBody = async (req, res, next) => {

    try{

        if(req.body.bookingStatus){

            const statusesAllowed = Object.values(constants.bookingStatuses)

            if(req.user.userType == constants.userType.customer){

                if(req.body.bookingStatus == constants.bookingStatuses.cancelled){

                    if(req.bookingInParams.bookingStatus == constants.bookingStatuses.failed){

                        return res.status(400).send({
                            message : "You can't change the status of the booking which is already failed"
                        })
                    }
                }else{

                    return res.status(400).send({

                        message : "Only ADMIN can perform this action"
                    })
                }
            }

            if(!statusesAllowed.includes(req.body.bookingStatus)){

                return res.status(400).send({

                    message : "booking status provided is invalid"

                })
            }
        }
        next();
    }catch(err){
        console.log("Error while validating the update booking req body", err.message);

        res.status(500).send({
            message : "Interanl server error while updating booking req body"
        })
    }
}

verifyBooking = {
    validateBookingBody,
    validateUpdateBookingReqBody
}

module.exports = verifyBooking;