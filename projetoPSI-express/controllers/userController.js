const mongoose = require('mongoose').set('debug', true);
const User = require('../models/user');
const passport = require('passport');

exports.user_profile = (req, res, next) =>{
    User.find({_id: req.params.id})
    .then(function(user){
      res.json(user);
    });
}

exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { 
      return next(err); 
    }
    if (!user) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }
    req.logIn(user, function(err) {
      if (err) { 
        return next(err); 
      }
      return res.redirect('/profile/' + req.user._id);
    });
  })(req, res, next);
};