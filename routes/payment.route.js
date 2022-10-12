const paymentController = require("../controllers/payment.controller");
const {authJwt, validateIdInParams, validatePaymentRequestbody} = require("../middlewares");

module.exports = (app) => {

    app.post("/mba/api/v1/payments", [authJwt.verifyToken, validatePaymentRequestbody.newPaymentBody], paymentController.createPayment);

    app.get("/mba/api/v1/payments/:id", [authJwt.verifyToken, validateIdInParams.paymentInParams ,authJwt.isAdminOrOwnerOfPayment], paymentController.getOnePayment);

    app.get("/mba/api/v1/payment", [authJwt.verifyToken], paymentController.getAllPayments);

}