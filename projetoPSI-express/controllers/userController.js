const mongoose = require('mongoose').set('debug', true);
const User = require('../models/user');

exports.user_profile = (req, res, next) =>{
    User.find({_id: req.params.id})
    .then(function(user){
      res.json(user);
    });
}

