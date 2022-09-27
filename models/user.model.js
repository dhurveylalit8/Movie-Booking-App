const mongoose = require("mongoose");
const constants = require("../utils/constant");

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        minLength : 8,
        unique : true
    },
    userType : {
        type : String,
        required : true,
        default : constants.userType.customer,
        enum : [constants.userType.customer, constants.userType.admin, constants.userType.theatre_owner]
    },
    userStatus : {
        type : String,
        required : true,
        default : constants.userStatus.approved,
        enum : [constants.userStatus.approved, constants.userStatus.pending, constants.userStatus.rejected]
    },
    theatreOwned : {
        type : [mongoose.SchemaTypes.ObjectId],
        default : [],
        ref : "Theatre"
    },
    myBookings : {
        type : [mongoose.SchemaTypes.ObjectId],
        default : [],
        ref : "Booking",
    },
    myPayments : {
        type : [mongoose.SchemaTypes.ObjectId],
        default : [],
        ref : "Payment"
    }
},{
    timestamps : true,
    versionKey : false
});

module.exports = mongoose.model("user", userSchema);