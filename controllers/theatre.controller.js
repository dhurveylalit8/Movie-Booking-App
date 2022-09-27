const Theatre = require("../models/theatre.model");
const Movie = require("../models/movie.model");
const User = require("../models/user.model")
const constants = require("../utils/constant");

exports.createNewTheatre = async (req, res) => {
    try{
        const data = {
            onwerId : req.user.userType == constants.userType.admin ? req.body.onwerId : req.user._id,
            name : req.body.name,
            description : req.body.description,
            city : req.body.city,
            pincode : req.body.location,
            showTypes : req.body.showTypes,
            numberOfSeats : req.body.numberOfSeats,
        }
        const theatre = await Theatre.create(data);
        const theatreOwner = await User.findOne({_id : theatre.ownerId});
        theatreOwner.theatreOwned.push(theatre._id);
        await theatreOwner.save();

        console.log(`#### New theatre ${theatre.name} created ####`);
        res.status(201).send(theatre);

    }catch(err){
        console.log("#### Error while creating a theatre ####", err.message)
        return res.status(500).send({
            message : "Internal server error while creating a new theatre"
        });
    }
}

exports.editTheatre = async (req, res) => {
    try{
        const theatre = await Theatre.findOne({_id : req.params._id})

        theatre.name = req.body.name ? req.body.name : theatre.name,
        theatre.description = req.body.description ? req.body.description : theatre.description,
        theatre.city = req.body.city ? req.body.city : theatre.city,
        theatre.pincode = req.body.pincode ? req.body.pincode : theatre.pincode,
        theatre.showTypes = req.body.showTypes ? req.body.showTypes : theatre.showTypes,
        theatre.numberOfSeats = req.body.numberOfSeats ? req.body.numberOfSeats : theatre.numberOfSeats

        const updateTheatre = await theatre.save();

        console.log("#### Theatre updated successfully ####");
        res.status(200).send(updateTheatre)

    }catch(err){
        console.log("#### Error while updating theatre ####", err.message)
        return res.status(500).send({
            message : "Internal server error while updating the theatre"
        });
    }
}

exports.deleteTheatre = async (req, res) => {
    try{
        const theatre = req.theatreInParams;
        const theatreOwner = await User.findOne({_id : theatre.onwerId});
        await theatreOwner.theatreOwned.remove(theatre._id);
        await theatreOwner.save();

        await theatre.remove();

        console.log("#### Theatre deleted successfully ####")
        res.status(200).send({message : "Theatre deleted"})

    }catch(err){
        console.log("#### Error while deleting the theatre ####", err.message)
        return res.status(500).send({
            message : "Internal server error while deleting the theatre"
        })
    }
}

exports.getAllTheatres = async (req, res) => {
    try{
        const theatres = await Theatre.find();

        res.status(200).send(theatres);

    }catch(err){
        console.log("#### Error while getting all the theatres ####", err.message)
        return res.status(500).send({
            message : "Internal server error while getting all the theatres"
        })
    }
}

exports.getSingleTheatre = async (req, res) => {
    try{
        const theatre = await Theatre.findOne({_id : req.params.id});

        res.status(200).send(theatre);

    }catch(err){
        console.log("#### Error while getting the single theatre ####", err.message);
        return res.status(500).send({
            message : "Internal server error while getting the single theatre"
        });
    }
}

exports.getMoviesInTheatre = async (req, res) => {
    try{

        const movies = await Movie.find({_id : req.theatreInParams.movies});

        res.status(200).send(movies)

    }catch(err){
        console.log("#### Error while getting the movies in theatre ####", err.message);
        return res.status(500).send({
            message : "Internal server error while getting the movies in theatre"
        })
    }
}

exports.editMoviesInTheatre = async (req, res) => {
    try{
        const theatre = req.theatreInParams;

        if(req.body.addMovies){
            for(e of req.body.addMovies){
                theatre.movies.push(e);
                let temp = await Movie.findOne({_id : e})
                temp.theatres.push(theatre._id);
                await temp.save();
            }
        }

        if(req.body.removeMovies){
            for(e of req.body.removeMovies){
                await theatre.movies.remove(e);
                let temp = await Movie.findOne({_id : e})
                await temp.theatres.remove(theatre._id);
                await temp.save();
            }
        }

        await theatre.save();
        res.status(200).send({message : "Updated movies in theatre"});

    }catch(err){
        console.log("#### Error while updating the movies in theatre ####");
        res.status(500).send({
            message : "Internal server error while updating the movies in theatre"
        })
    }
}

