const Theatre = require("../models/theatre.model");
const Movie = require("../models/movie.model")
const constants = require("../utils/constant")

exports.createNewTheatre = async (req, res) => {
    try{
        const data = {
            name : req.body.name,
            description : req.body.description,
            city : req.body.city,
            pincode : req.body.location,
            showTypes : req.body.showTypes,
            numberOfSeats : req.body.numberOfSeats,
        }
        const theatre = await Theatre.create(data);

        console.log(`#### New theatre ${theatre.name} created ####`);
        res.status(201).send(theatre);

    }catch(err){
        console.log("#### Error while creating a theatre ####", err.message)
        res.status(500).send({
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
        res.status(500).send({
            message : "Internal server error while updating the theatre"
        });
    }
}

exports.deleteTheatre = async (req, res) => {
    try{
        const theatre = await Theatre.findOne({_id : req.params.id});

        await theatre.remove();

        console.log("#### Theatre deleted successfully ####")
        res.status(200).send({message : "Theatre deleted"})

    }catch(err){
        console.log("#### Error while deleting the theatre ####", err.message)
        res.status(500).send({
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
        res.status(500).send({
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
        res.status(500).send({
            message : "Internal server error while getting the single theatre"
        });
    }
}

exports.getMoviesInTheatre = async (req, res) => {
    try{
        const theatre = await Theatre.findOne({_id : req.params.id});

        const movies = await Movie.find({_id : theatre.movies})

        res.status(200).send(movies)

    }catch(err){
        console.log("#### Error while getting the movies in theatre ####", err.message);
        res.status(500).send({
            message : "Internal server error while getting the movies in theatre"
        })
    }
}

exports.editMoviesInTheatre = async (req, res) => {
    try{
        const theatre = await Theatre.findOne({_id : req.params.id});

        if(req.body.addMovies){
            req.body.addMovies.forEach(movie => {
                theatre.movies.push(movie)
            })
            req.body.addMovies.forEach(async (movie) => {
                let temp = await Movie.findOne({_id : movie})
                temp.theatres.push(theatre.id);
                await temp.save();
            })
    }

        if(req.body.removeMovies){
            req.body.removeMovies.forEach(async (movie) => {
                await theatre.movies.remove(movie)
            })
            req.body.removeMovies.forEach(async (movie) => {
                let temp = await Movie.findOne({_id : movie})
                await temp .theatres.remove(theatre._id);
                await temp.save();
            })
    }

        await theatre.save();
        res.status(200).send({message : "Updated movies in theatre"})

    
    }catch(err){
        console.log("#### Error while updating the movies in theatre ####", err.message);
        res.status(500).send({
            message : "Internal server error while updating the movies in theatre"
        })
    }
}

