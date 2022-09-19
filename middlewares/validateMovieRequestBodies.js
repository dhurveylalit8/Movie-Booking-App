const constants = require("../utils/constant");

const isDate = (date) =>{
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

const AllowedReleaseStatuses = [constants.movieReleaseStatuses.released, constants.movieReleaseStatuses.coming_soon, constants.movieReleaseStatuses.blocked];
const allowedMovieGenre = [constants.movieGenre.action, constants.movieGenre.comedy, constants.movieGenre.drama, constants.movieGenre.fantasy, constants.movieGenre.horror, constants.movieGenre.mystery, constants.movieGenre.romance, constants.movieGenre.thriller];

function checkGenre (given){
    let temp = true
    given.forEach(e=>{
        if(!allowedMovieGenre.includes(e)){
            temp = false
        }
    })
    return temp;
}

const newMovieBody = (req, res, next) => {
    try{
        if(!req.body.name){
            return res.status(400).send({
                message : "Failed ! Movie name is not provided"
            });
        }


        if(!req.body.description){
            return res.status(400).send({
                message : "Filed ! Movie description is not provided"
            })
        }


        if(!req.body.casts){
            return res.status(400).send({
                message : "Failed ! Movie casts are not provided"
            });
        }else if(!Array.isArray(req.body.casts)){
            return res.status(400).send({
                message : "Failed ! Movie catsts are not in the correcr format (array)"
            })
        }


        if(!req.body.trailerUrls){
            return res.status(400).send({
                message : "Failed ! Movie trailedUrls are not provided"
            });
        }else if(!Array.isArray(req.body.trailerUrls)){
            return res.status(400).send({
                message : "Failed ! Movie trailerUrls are not provided in the correct format (array)"
            })
        }


        if(!req.body.poserUrls){
            return res.status(400).send({
                message : "Failed ! Movie posterUrls are not provided"
            });
        }else if(!Array.isArray(req.body.poserUrls)){
            return res.status(400).send({
                message : "Failed ! Movie posterUrls are not provided in the correct format (array)"
            });
        }


        if(!req.body.languages){
            return res.status(400).send({
                message : "Failed ! Movie languages are not provided"
            })
        }else if(!Array.isArray(req.body.languages)){
            return res.status(400).send({
                message : "Failed ! Movie languages are not provided in the correct format (array)"
            })
        }


        if(req.body.releaseDate && !isDate(req.body.releaseDate)){
            return res.status(400).send({
                message : "Failed ! Movie release date is not in correcr format (Date)"
            })
        }


        if(!req.body.releaseStatus){
            return res.status(400).send({
                message : "Failed ! Movie release status is not provided"
            })
        }else if(!AllowedReleaseStatuses.includes(req.body.releaseStatus)){
            return res.status(400).send({
                message : "Failed ! Invalid movie release status provided"
            });
        }


        if(req.body.imdbRating && typeof req.body.imdbRating !== "number"){
            return res.status(400).send({
                message : "Failed ! Movie IMDB rating is not in the correct format (Number)"
            });
        }


        if(req.body.genre){
            if(!Array.isArray(req.body.genre)){
                return res.status(400).send({
                    message : "Failed ! Movie genre are not in the correct format (Array)"
                })
            }else if(!checkGenre(req.body.genre)){
                return res.status(400).send({
                    message : "Failed ! Invalid movie release genre provided"
                })
            }
        }

        next();
    }catch(err){
        console.log("#### Error while validating new movie request body ####", err.message);
        return res.status(500).send({
            message : "Internal server error while new movie body validation"
        });
    }
}

const editMovieBody = (req, res, next) => {
    try{
        if(req.body.casts && !Array.isArray(req.body.casts)){
            return res.status(400).send({
                message : "Failed ! Movie casts are not in the correcr format (array)"
            });
        }


        if(req.body.trailerUrls && !Array.isArray(req.body.trailerUrls)){
            return res.status(400).send({
                message : "Failed ! Movie trailerUrls are not in the correct format (array)"
            });
        }


        if(req.body.poserUrls && !Array.isArray(req.body.poserUrls)){
            return res.status(400).send({
                message : "Failed ! Movie posterUrls are not provided in the correct format (array)"
            });
        }


        if(req.body.languages && !Array.isArray(req.body.languages)){
            return res.status(400).send({
                message : "Failed ! Movie language are not provided in the correct format (array)"
            });
        }

        
        if(req.body.releaseDate && !isDate(req.body.releaseDate)){
            return res.status(400).send({
                message : " Failed ! Movie releaseDate in not provided in the correct format (Date)"
            });
        }


        if(req.body.releaseStatus && !AllowedReleaseStatuses.includes(req.body.releaseStatus)){
            return res.status(400).send({
                message : "Failed ! Invalid movie release status provided"
            });
        }


        if(req.body.imdbRating && typeof req.body.imdbRating !== "number"){
            return res.status(400).send({
                message : "Failed ! Movie imdb rating is not in the correct format (Number)"
            });
        }


        if(req.body.genre){
            if(!Array.isArray(req.body.genre)){
                return res.status(400).send({
                    message : "Failed ! Movie genre are not in the correct format (Array)"
                });
            }else if(!checkGenre(req.body.genre)){
                return res.status(400).send({
                    message : "Failed ! Invalid movie release genre provided"
                });
            }
        }

        next();
    }catch(err){
        console.log("#### Error while validating edit movie request body ####", err.message);
        res.status(500).send({
            message : "Internal server error while edit movie body validation"
        });
    }
}

const validateMovieRequestBodies = {
    newMovieBody,
    editMovieBody
}

module.exports = validateMovieRequestBodies