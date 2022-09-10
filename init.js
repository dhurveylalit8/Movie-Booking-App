const Movie = require("./models/movie.model");
const Theatre = require("./models/theatre.model")
const constants = require("./utils/constant")

module.exports = async () => {
    try{
        await Movie.collection.drop();
        console.log("#### Movie collection dropped ####")
        
        await Theatre.collection.drop();
        console.log("#### Theatre collection dropped ####")

        const theatres = [];
        theatres[0] = {
            name : "Theatre 1",
            description : "Description of Theatre 1",
            city : "Nagpur",
            pincode : 440009,
            showTypes : [constants.theatreShows.morning, constants.theatreShows.noon, constants.theatreShows.evening, constants.theatreShows.night],
            numberOfSeats : 100
        },
        theatres[1] = {
            name : "Theatre 2",
            description : "Description of Theatre 2",
            city : "Mumbai",
            pincode : 400001,
            showTypes : [constants.theatreShows.noon, constants.theatreShows.evening, constants.theatreShows.night],
            numberOfSeats : 100
        },
        theatres[2] = {
            name : "Theatre 3",
            description : "Description of Theatre 3",
            city : "Pune",
            pincode : 411001,
            showTypes : [constants.theatreShows.morning, constants.theatreShows.night],
            numberOfSeats : 100
        }

        const theatresCreated = await Theatre.insertMany(theatres);

        const movies = [];
        movies[0] = {
            name : "Movie 1",
            description : "Description for Movie 1",
            casts : ["SomeOne", "SomeOneElse"],
            trailerUrls : ["TrailerURL"],
            posterUrls : ["PosterURL"],
            languages : ["Hindi, Marathi, English"],
            releaseDate : 2022-10-10,
            releaseStatuses : constants.movieReleaseStatuses.coming_soon,
            imdbRating : 8.5,
            genre : [constants.movieGenre.action]
        }

        movies[1] = {
            name : "Movie 2",
            description : "Description for Movie 2",
            casts : ["SomeOne", "SomeOneElse"],
            trailerUrls : ["TrailerURL"],
            posterUrls : ["PosterURL"],
            languages : ["Hindi, Marathi, English"],
            releaseDate : 2022-09-09,
            releaseStatuses : constants.movieReleaseStatuses.coming_soon,
            imdbRating : 8.5,
            genre : [constants.movieGenre.action]
        }

        movies[2] = {
            name : "Movie 3",
            description : "Description for Movie 3",
            casts : ["SomeOne", "SomeOneElse"],
            trailerUrls : ["TrailerURL"],
            posterUrls : ["PosterURL"],
            languages : ["Hindi, Marathi, English"],
            releaseDate : 2022-12-12,
            releaseStatuses : constants.movieReleaseStatuses.coming_soon,
            imdbRating : 8.5,
            genre : [constants.movieGenre.action]
        }

        moviesCreated = await Movie.insertMany(movies);

        theatresCreated[0].movies.push(moviesCreated[0]._id, moviesCreated[1]._id)
        moviesCreated[0].theatres.push(theatresCreated[0]._id)
        moviesCreated[1].theatres.push(theatresCreated[0]._id)

        theatresCreated[0].save();
        moviesCreated[0].save();
        moviesCreated[1].save();
        
        console.log("#### Seed data intialized ####")
        
    }catch(err){
        console.log("#### Error in seed data initialization ####", err.message);
    }
}