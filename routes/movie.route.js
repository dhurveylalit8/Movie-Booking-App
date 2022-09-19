const movieController = require("../controllers/movie.controller");
const {authJwt, validateIdInParams, validateMovieRequestBodies} = require("../middlewares")

module.exports = (app) => {
    app.post("/mbs/api/v1/movies", [authJwt.verifyToken, authJwt.isAdmin, validateMovieRequestBodies.newMovieBody], movieController.createNewMovie);

    app.put("/mbs/api/v1/movies/:id", [authJwt.verifyToken, authJwt.isAdmin, validateIdInParams.movieInParams, validateMovieRequestBodies.editMovieBody], movieController.editMovie);

    app.delete("/mbs/api/v1/movies/:id", [authJwt.verifyToken, authJwt.isAdmin, validateIdInParams.movieInParams], movieController.deleteMovie);

    app.get("/mbs/api/v1/movies", [authJwt.verifyToken], movieController.getAllMovies);
    
    app.get("/mbs/api/v1/movies/:id", [authJwt.verifyToken, validateIdInParams.movieInParams], movieController.getSingleMovie)
}