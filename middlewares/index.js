const authJwt = require("./authjwt");
const validateIdInParams = require("./paramsVerifier");
const validateUserRequestBodies = require("./validateUserRequestBodies");
const validateTheatreRequestBodies = require("./validateTheatreRequestBodies");
const validateMovieRequestBodies = require("./validateMovieRequestBodies");

module.exports = {
    authJwt,
    validateIdInParams,
    validateUserRequestBodies,
    validateTheatreRequestBodies,
    validateMovieRequestBodies
}