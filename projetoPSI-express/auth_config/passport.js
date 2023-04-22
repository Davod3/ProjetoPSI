const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require("../models/user");

passport.use(new LocalStrategy(function(userid, password, done) {

    User.findOne({username: userid}, function(err, user){

        if(err){
            return done(err);
        }

        if(!user) {

            return done(null, false, {
                message: 'User not found'
            });
        }

        if(!user.validatePwd(password)) {
            return done(null, false, {
                message: 'Incorrect password'
            });
        }

        return done(null, user);
    });

}));
