const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user');

exports.register = function(req, res, next) {

    const validPassword = new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$');
    const validUsername = new RegExp('^[a-zA-Z0-9]+$');
    var user = new User();

    user.username = req.body.username;
    user.password = req.body.password;

    var errorMessage = "";
    var isValid = true;

    if(user.username.length < 3) {
        isValid = false;
        errorMessage+="Username must have more than 3 characters!";
        errorMessage+="\n";
    }

    if(user.password.length < 8) {
        isValid = false;
        errorMessage+="Password must have more than 8 characters!";
        errorMessage+="\n";
    }

    if(!validPassword.test(user.password)) {
        isValid = false;
        errorMessage+="Password must contain at least one Upper case letter, one Lower case letter and one number!";
        errorMessage+="\n";
    }

    if(!validUsername.test(user.username)) {
        isValid = false;
        errorMessage+="Username must contain only alphanumeric characters!";
        errorMessage+="\n";
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
            errorMessage+="Username already exists!";
            errorMessage+="\n";
            
            res.status(200);
            res.json({
                "err": errorMessage
            });
        });

    } else {

        res.status(200);
        res.json({
            "err" : errorMessage
        });

    }

} 
