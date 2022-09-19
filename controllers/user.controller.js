const User = require("../models/user.model");
const objectConverter = require("../utils/objectConverter");
const bcrypt = require("bcryptjs");
const constants = require("../utils/constant");
// const { userStatus, userType } = require("../utils/constant");

exports.findAll = async (req, res) =>{

    const queryObj = {};
    const userTypeQP = req.query.userType;
    const userStatusQP = req.query.userStatus;

    if(userTypeQP){
        queryObj.userType = userTypeQP
    }
    if(userStatusQP){
        queryObj.userStatus = userStatusQP
    }

    try{
        const users = await User.find(queryObj);

        res.status(200).send(objectConverter.multipleUserResponse(users));

    }catch(err){
        console.log("#### Error while fetching all users data ####", err.message);
        res.status(500).send({
            message : "Internal server error while fetching all users data"
        })
    }
}

exports.findByUserId = async (req, res) => {
    try{
        const user = req.userInParams;
        
        res.status(200).send(objectConverter.singleUserResponse(user));

    }catch(err){
        console.log("#### Error while searching for the user ####", err.message);
        res.status(500).send({
            message : "Internal server error while fetching data"
        })
    }
}

exports.updateUser = async (req, res) => {
    try{

        const user = req.userInParams;

        user.name = req.body.name ? req.body.name : user.name
        user.password = req.body.password ? bcrypt.hashSync(req.body.password, 8) : user.password
        user.email = req.body.email ? req.body.email : user.email

        if(req.user.userType == constants.userType.admin){
            user.userStatus = req.body.userStatus != undefined ? req.body.userStatus : userStatus
            user.userType = req.body.userType != undefined ? req.body.userType : user.userType 
        }

        const updatedUser = await user.save();

        console.log(`#### ${updatedUser.userType} ${updatedUser.name} data updated ####`);
        res.status(200).send(objectConverter.singleUserResponse(updatedUser));

    }catch(err){
        console.log("#### Error while updating user data ####", err.message);
        res.status(500).send({
            message : "Internal error while updating user data"
        })
    }
}