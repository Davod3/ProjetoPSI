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

  User.findById(req.params.id)
  .then(function (user) {
    const listPromises = user.lists.map((listid) =>
      List.findById(listid)
    );
    Promise.all(listPromises).then((lists) => {
      res.json(lists);
    });
  })
  .catch((err) => handleError(err, res));

};

exports.user_library = (req, res, next) => {
  User.findById(req.params.id).then(function(user) {
    let itemIds = Array.from(user.items.keys()); // Extract the item IDs from the map keys
    let itemPromises = itemIds.map(itemId => Item.findById(itemId));
    Promise.all(itemPromises).then(items => {
      // Combine the items with their corresponding dates from the user's items map
      let itemsWithDates = items.map((item, index) => ({
        item: item,
        date: user.items.get(itemIds[index])
      }));
      // console.log(itemsWithDates) já fizemos e o problema não é aqui
      res.json(itemsWithDates);
    }).catch(err => handleError(err, res));
  }).catch(err => handleError(err, res));
};

exports.user_followers = (req, res, next) => {
  User.findById(req.params.id)
    .then(function (user) {
      const followerPromises = user.followers.map((followerid) =>
        User.findById(followerid)
      );
      Promise.all(followerPromises).then((followers) => {
        res.json(followers);
      });
    })
    .catch((err) => handleError(err, res));
};

exports.user_wishlist = (req,res,next) => {

  User.findById(req.params.id).then(

    function(user) {

      const itemPromises = user.wishlist.map((itemid) => Item.findById(itemid));

      Promise.all(itemPromises).then((items) => {

        res.json(items);

      });

    }

  ).catch((err) => handleError(err, res));

};

exports.user_following = (req, res, next) => {
  User.findById(req.params.id)
    .then(function (user) {
      let promises = user.following.map((followingid) => {
        return User.findById(followingid);
      });
      return Promise.all(promises).then((followingUsers) => {
        res.json(followingUsers);
      });
    })
    .catch((err) => handleError(err, res));
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

    }

  }; 

  exports.removeItemFromCart = (req, res, next) => {
    const itemId = req.params.itemId;
    const userId = req.params.userId;
  
    if (userId) {
      User.findById(userId)
        .then((user) => {
          if (user.cart.has(itemId)) {
            user.cart.delete(itemId);
            user.save();
            res.send(true);
          } else {
            res.send(false);
          }
        })
        .catch((err) => handleError(err, res));
    } else {
      res.send(false);
    }
  };

  exports.clearCart = (req, res, next) => {
    const userId = req.params.userId;
    
    console.log(userId);

    if (userId) {
      User.findById(userId)
        .then((user) => {

          console.log("Helloooo!!!");

          user.cart.clear();
          user.save();
          res.send(true);
        })
        .catch((err) => handleError(err, res));
    } else {
      res.send(false);
    }
  };

  exports.incrementItemQuantity = (req, res, next) => {
    const itemId = req.body.itemId;
    const userId = req.params.userId;
  
    if (userId) {
      User.findById(userId)
        .then((user) => {
          if (user.cart.has(itemId)) {
            let nItems = parseInt(user.cart.get(itemId)) + 1;
            user.cart.set(itemId, nItems);
            user.save();
            res.send(true);
          } else {
            res.send(false);
          }
        })
        .catch((err) => handleError(err, res));
    } else {
      res.send(false);
    }
  };

  exports.decrementItemQuantity = (req, res, next) => {
    const itemId = req.body.itemId;
    const userId = req.params.userId;
  
    if (userId) {
      User.findById(userId)
        .then((user) => {
          if (user.cart.has(itemId)) {
            let nItems = parseInt(user.cart.get(itemId)) - 1;
            if (nItems <= 0) {
              user.cart.delete(itemId);
            } else {
              user.cart.set(itemId, nItems);
            }
            user.save();
            res.send(true);
          } else {
            res.send(false);
          }
        })
        .catch((err) => handleError(err, res));
    } else {
      res.send(false);
    }
  };

  exports.addFollowing = (req, res, next) => {
    const userId = req.params.id;
    const followingUserId = req.body.followingUserId;
  
    User.findById(userId)
      .then(user => {
        if (!user) {
          throw new Error('User not found');
        }
  
        User.findById(followingUserId)
          .then(followingUser => {
            if (!followingUser) {
              throw new Error('Followed user not found');
            }
  
            if (!user.following.includes(followingUserId)) {
              user.following.push(followingUserId);
            }
            if (!followingUser.followers.includes(userId)) {
              followingUser.followers.push(userId);
            }
  
            user.save()
              .then(() => {
                followingUser.save()
                  .then(() => {
                    res.json(user);
                  })
                  .catch(err => next(err));
              })
              .catch(err => next(err));
          })
          .catch(err => next(err));
      })
      .catch(err => next(err));
  };

  exports.getUserCart = (req, res, next) => {

    const userId = req.params.userId;
  
    if(userId) {
  
      User.findById(userId).then((user) => {
  
        res.json(user.cart);
  
      }).catch((err) => handleError(err, res));
  
    } else {
      res.send(false);
    }
  
  }

  function handleError(err, res) {

    console.log(err);

    res.status(404);

    if(err){
      console.log("1");
      res.send(err.message);
    } else {
      console.log("2");
      res.send("Something went very wrong!");
    }
  }

    exports.checkout = (req, res, next) =>{

      let userId = req.params.id;

      let random = Math.floor(Math.random() * 2);

      console.log(random);


      if (random === 1) {

        User.findById(userId).then((user) => {

          let itemsToAdd = [];

          //Efetuar o checkout
          console.log(user.cart);
          for (let [itemId, nItems] of user.cart) {

            itemsToAdd.push(itemId);
            user.cart.delete(itemId);
            console.log(user.wishlist);
            user.wishlist = user.wishlist.filter(id => id != itemId);
            console.log(user.wishlist);
          }

          itemsToAdd.forEach((itemId) => {
              if (!user.items.has(itemId)) {
                let date = new Date();
                user.items.set(itemId, date.toLocaleString());
              }
            });
          user.save();
          res.send(true);
        }).catch(err => handleError(err, res));

      } else {
        res.send(false);
      }
    };