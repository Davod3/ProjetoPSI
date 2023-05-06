const mongoose = require('mongoose').set('debug', true);
const User = require('../models/user');
const List = require('../models/list');
const Item = require('../models/item');

exports.user_list = async (req, res) => {
  try {
    const list_users = await User.find().sort([["name", "ascending"]]);
    let results = [];
    list_users.forEach(function(user) {
      results.push(user);
    });
    res.send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};


exports.user_profile = (req, res, next) =>{
    User.find({_id: req.params.id})
    .then(function(user){
      if (!user || user.length == 0) {
        return res.status(404).send('User not found');
      }
      res.json(user);
    });
 }

 exports.user_by_name = (req, res, next) =>{
  User.find({username: req.params.username})
  .then(function(user){
    res.json(user);
  });
}

exports.update_profile = (req, res, next) =>{
  User.findOneAndUpdate({_id: req.params.id}, { $set: { username: req.body.username ,image: req.body.image}})
  .then(function(user){
    res.json(user);
  });
}

exports.user_lists = (req, res, next) =>{
  User.findById(req.params.id).then(

    function(user) {

      let lists = [];
      
      user.lists.forEach(listid => {

        List.findById(listid).then(function(list) {

          lists.push(list);

        });

      });

      res.json(lists);

    }

  ).catch(err => handleError(err, res));

};

exports.user_library = (req, res, next) =>{
  User.findById(req.params.id).then(

    function(user) {

      let items = [];
      
      user.items.forEach(itemid => {

        Item.findById(itemid).then(function(item) {

          items.push(item);

        });

      });

      res.json(items);

    }

  ).catch(err => handleError(err, res));

};

exports.user_followers = (req, res, next) =>{
  User.findById(req.params.id).then(

    function(user) {

      let followers = [];
      
      user.followers.forEach(followerid => {

        User.findById(followerid).then(function(follower) {

          followers.push(follower);

        });

      });

      res.json(followers);

    }

  ).catch(err => handleError(err, res));

};

exports.user_following = (req, res, next) =>{
  User.findById(req.params.id).then(

    function(user) {

      let followingUsers = [];
      
      user.following.forEach(followingid => {

        User.findById(followingid).then(function(following) {

          followingUsers.push(following);

        });

      });

      res.json(followingUsers);

    }

  ).catch(err => handleError(err, res));

};

exports.addItemToCart = (req, res, next) =>{

  let itemid = req.body.itemid;
  let userid = req.body.userid;

  if(userid) {

    User.findById(userid).then(
      
      function(user) {

        //The find by id is just to check if the item is actually on the db
        Item.findById(itemid).then(

          function(item) {

            //Add item to user cart

            if(user.cart.has(itemid)){

              //User already has item, increase counter
              let nItems = parseInt(user.cart.get(itemid)) + 1;
              user.cart.set(itemid, nItems); 

            } else {

              user.cart.set(itemid, "1");

            }

            user.save();
            res.send(true);

          }

        ).catch(err => handleError(err, res));

      }).catch(err => handleError(err, res));

    } else {

      res.send(false);

    };

  } 

function handleError(err, res) {

  console.log(err);

  res.status(404);
  res.send(err.message);
}
