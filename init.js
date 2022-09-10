const Movie = require("./models/movie.model");
const constants = require("./utils/constant")

module.exports = async () => {
    try{
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

        await Movie.insertMany(movies);
        
    }catch(err){
        console.log("#### Error in seed data initialization ####", err.message);
    }
}