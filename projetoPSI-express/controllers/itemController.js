const mongoose = require('mongoose');
const Item = require('../models/item')

exports.item_list = (req, res) => {
    Item.find()
    .sort([["name", "ascending"]])
    .exec(function (err, list_items) {
      if (err) {
        return (err);
      }
      let results = [];
      list_items.forEach(function(item) {
        results.push(item);
      });
      res.send(results);
    });
  };

  exports.item_detail = (req, res, next) =>{
    Item.find({_id: req.params.id})
    .then(function(item){
      res.json(item);
    })
    .catch(function(err){
      if(err)
        return (err);
    });
  };
