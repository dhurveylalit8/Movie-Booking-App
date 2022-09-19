const theatreController = require("../controllers/theatre.controller");
const {authJwt, validateIdInParams, validateTheatreRequestBodies} = require("../middlewares")

module.exports = (app) => {
    app.post("/mbs/api/v1/theatres", [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin, validateTheatreRequestBodies.newTheatreBody], theatreController.createNewTheatre);

    app.put("/mbs/api/v1/theatres/:id", [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin, validateIdInParams.theatreInParams, authJwt.isValidTheatreOwner, validateTheatreRequestBodies.editTheatreBody], theatreController.editTheatre);

    app.delete("/mbs/api/v1/theatres/:id", [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin, authJwt.isValidTheatreOwner, validateIdInParams.theatreInParams], theatreController.deleteTheatre);

    app.get("/mbs/api/v1/theatres", [authJwt.verifyToken], theatreController.getAllTheatres);
    
    app.get("/mbs/api/v1/theatres/:id", [authJwt.verifyToken, validateIdInParams.theatreInParams], theatreController.getSingleTheatre)


    app.get("/mbs/api/v1/theatres/:id/movies", [authJwt.verifyToken, validateIdInParams.theatreInParams], theatreController.getMoviesInTheatre)

    app.put("/mbs/api/v1/theatres/:id/movies", [authJwt.verifyToken, authJwt.isTheatreOwnerOrAdmin, validateIdInParams.theatreInParams, authJwt.isValidTheatreOwner, validateTheatreRequestBodies.editMoviesInTheatreBody], theatreController.editMoviesInTheatre)
}