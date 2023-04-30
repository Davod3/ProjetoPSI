const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require("../models/user");

passport.use(new LocalStrategy(function(userid, password, done) {

    User.findOne({username: userid})
    .then(function(user) {
        if (!user) {
            return done(null, false, {
                message: 'User not found'
            });
        }
        if (!user.validatePwd(password)) {
            return done(null, false, {
                message: 'Incorrect password'
            });
        }
            return done(null, user);
    })
    .catch(function(err) {
        return done(err);
    });

}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
