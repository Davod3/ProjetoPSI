const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user');

exports.register = function(req, res, next) {

    const validPassword = new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/);
    const validUsername = new RegExp(/^[a-zA-Z0-9]+$/);
    var user = new User();

    user.username = req.body.username;
    user.password = req.body.password;

    var errorMessages = [];
    var isValid = true;

    if(user.username.length < 3) {
        isValid = false;
        errorMessages.push("Username must have more than 3 characters!");
    }

    if(user.password.length < 8) {
        isValid = false;
        errorMessages.push("Password must have more than 8 characters!");
    }

    if(!validPassword.test(user.password)) {
        isValid = false;
        errorMessages.push("Password must contain at least one Upper case letter, one Lower case letter and one number!");
    }

    if(!validUsername.test(user.username)) {
        isValid = false;
        errorMessages.push("Username must contain only alphanumeric characters!");
    }

    if(isValid) {


        user.save().then(function(user){
            var token;
            token = user.genJwt();
            res.status(200);
            res.json({
                "token": token  
            });
        }).catch(function(err){

            //Error codes: 11000 - Username already exists
            errorMessages.push("Username already exists!");
            
            res.status(200);
            res.json({
                "err": errorMessages
            });
        });

    } else {

        res.status(200);
        res.json({
            "err" : errorMessages
        });

    }

} 
