const mongoose = require("mongoose");
const constants = require("../utils/constant");

const paymentSchema = new mongoose.Schema({

    bookingId : {
        type : mongoose.SchemaTypes.ObjectId,
        required : true,
        ref : "Booking"
    },
    amount : {
        type : Number,
        required : true,
    },
    status : {
        type : String,
        required : true,
        enum : [constants.paymentStatuses.failed, constants.paymentStatuses.success]
    }
}, {
    timestamps : true, versionKey : false
});

module.exports = mongoose.model("Payment", paymentSchema)