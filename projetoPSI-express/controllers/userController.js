const mongoose = require('mongoose');
const User = require('../models/item')

exports.user_profile = (req, res, next) =>{
    res.send("HERE");
    // User.findById(req.params.id)
    // .then(function(user){
    //   res.json(user);
    // })
    // .catch(function(err){
    //   if(err)
    //     return (err);
    // });
  };