const User = require("../models/user.model");
const Movie = require("../models/movie.model");

const ObjectId = require("mongoose").Types.ObjectId;
const constants = require("../utils/constant");

const allowedShowTypes = [constants.theatreShows.morning, constants.theatreShows.noon, constants.theatreShows.evening, constants.theatreShows.night]

function isValidObjectId(id){

    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

function checkShows(given){
    let temp = true;
    for(e of given){
        if(!allowedShowTypes.includes(e)){
            temp = false;
        }
    }
    return temp;
}

async function checkValidObjectsIds(array){
    let temp = {validIds : true, moviesExist : true};
    for(e of array){
        if(!isValidObjectId(e)){
            temp.validIds = false;
        }else{
            const movie = await Movie.findOne({_id : e});
            if(!movie){
                temp.moviesExist = false;
            }
        }
    }
    return temp;
}


const newTheatreBody = async(req, res, next) => {
    try{

        if(req.user.userType == constants.userType.admin && !req.body.ownedId){
            return res.status(400).send({
                message : "Failed ! Theatre ownerId is not provided "
            })
        }

        if(req.body.ownedId){
            if(!isValidObjectId(req.body.ownedId)){
                return res.status(400).send({
                    message : "Failed ! invalid theatre owner Id provided"
                })
            }else{
                const owner = await User.findOne({_id : req.body.ownedId})
                if(!owner){
                    return res.status(400).send({
                        message : "Failed ! Theatre owner id provided does not exist"
                    })
                }else if(owner.userType != constants.userType.theatre_owner){
                    return res.status(400).send({
                        message : "Failed ! Owner id provided is not a theatre owner"
                    });
                }
            }
        }

        if(!req.body.name){
            return res.status(400).send({
                message : "Failed ! Theatre title is not provided"
            });
        }

        if(!req.body.description){
            return res.status(400).send({
                message : "Failed ! Theatre description is not provided"
            });
        }

        if(!req.body.city){
            return res.status(400).send({
                message : "Failed ! Theatre city is not provided"
            })
        }

        if(!req.body.pincode){
            return res.status(400).send({
                message : "Failed ! Theatre pincode is not provided"
            })
        }else if(typeof req.body.pincode !== "number"){
            return res.status(400).send({
                message : "Failed ! Theatre pincode is not provided in the correcr format (Number)"
            })
        }

        if(!req.body.showTypes){
            res.status(400).send({
                message : "Failed ! Movie casts are not provided "
            });
        }else{
            if(!Array.isArray(req.body.showTypes)){
                return res.status(400).send({
                    message : "Failed ! Movie show types are not in correcr format(Array)"
                });
            }else if(!checkShows(req.body.showTypes)){
                return res.status(400).send({
                    message : "Invalid show type provided"
                })
            }
        }

        if(!req.body.numberOfSeats){
            return res.status(400).send({
                message : "Failed ! Theatre number of seats is not provided"
            });
        }else if(typeof req.body.numberOfSeats !== "number"){
            return res.status(400).send({
                message : "Failed ! Number of seats is not in correct format (Number)"
            });
        }

        next();
    }catch(err){
        console.log("#### Error while validating new theatre request body ####", err.message);
        res.status(500).send({
            message : "Internal server error while new theatre body validation"
        });
    }
}


const editTheatreBody = (req, res, next) => {
    try{

        if(req.body.pincode && typeof req.body.pincode !== "number"){
            return res.status(400).send({
                message : "Failed ! Theatre pincode is not in the correct format(Number)"
            });
        }

        if(req.body.showTypes){
            if(!Array.isArray(req.body.showTypes)){
                return res.status(400).send({
                    message : "Failed ! Movie show types are not in the correct format(array)"
                })
            }else if(!checkShows(req.body.showTypes)){
                return res.status(400).send({
                    message : "Failed ! Invalid show type provided"
                })
            }
        }

        if(req.body.numberOfSeats && typeof req.body.numberOfSeats !== "number"){
            return res.status(400).send({
                message : "Failed ! Number of seats is not in the correct format (Number)"
            })
        }

        next();

    }catch(err){
        console.log("#### Error while validating edit theatre request body ####", err.message);
        res.status(500).send({
            message : "Internal server error while edit theatre body validation"
        });
    }
}

const editMoviesInTheatreBody = async (req, res, next) => {
    try{

        const moviesInTheatre = req.theatreInParams.movies.map(e=>e.toString());

        if(req.body.addMovies){

            req.body.addMovies = req.body.addMovies.filter(movieId => !moviesInTheatre.includes(movieId));

            if(!Array.isArray(req.body.addMovies)){
                return res.status(400).send({
                    message : "Failed ! Movie ids in addMovies are not in the correct format (Array) "
                })
            }

            const checker = await checkValidObjectsIds(req.body.addMovies)

            if(!checker.validIds){
                return res.status(400).send({
                    message : "Failed ! Invalid movie id provided in addMovies"
                })
            }else if(!checker.moviesExist){
                return res.status(400).send({
                    message : "Failed ! Movie id provided in addMovies does not exist"
                });
            }
        }

        if(req.body.removeMovies){
            req.body.removeMovies = req.body.removeMovies.filter(movieId => moviesInTheatre.includes(movieId));

            if(!Array.isArray(req.body.removeMovies)){
                return res.status(400).send({
                    message : "Failed ! Movie ids in removeMovies are not in the correct format(array)"
                });
            }
        }

        const checker = await checkValidObjectsIds(req.body.removeMovies)

        if(!checker.validIds){
            return res.status(400).send({
                message : "Failed ! Invalid movieid is provided in removeMovies"
            });
        }else if(!checker.moviesExist){
            return res.status(400).send({
                message : "Failed ! Movie id provided in removieMovies does not exist"
            })
        }
        next();

    }catch(err){
        console.log("#### Error while validating edit movie in theatre body ####", err.message);
        res.status(500).send({
            message : "Internal server error while edit movie in theatre body validation"
        })
    }
}



const validateTheatreRequestBodies = {
    newTheatreBody,
    editTheatreBody,
    editMoviesInTheatreBody
}

module.exports = validateTheatreRequestBodies;