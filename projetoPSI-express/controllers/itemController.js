const mongoose = require('mongoose');
const Item = require('../models/item')

exports.item_list = async (req, res) => {
  try {
    const list_items = await Item.find().sort([["name", "ascending"]]);
    let results = [];
    list_items.forEach(function(item) {
      results.push(item);
    });
    res.send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

  exports.item_detail = (req, res, next) =>{
    Item.findById(req.params.id)
    .then(function(item){
      res.json(item);
    })
    .catch(function(err){
      if(err)
        return (err);
    });
  };
