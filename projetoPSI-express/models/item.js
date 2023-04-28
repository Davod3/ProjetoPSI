const mongoose = require("mongoose");

var ItemSchema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 50 },
  type: { type: String, required: true, maxLength: 10 },
  description : { type: String, maxLength: 1000 },
  platforms : { type: [String], required: true},
  languages : { type: [String], required: true},
  price : {type: Number, required: true, min: 0},
  rating: {type: Number, required: true, min: 0},
  reviews: { type: [String]},
  image: {type: String, required: true}
});

// Export model
module.exports = mongoose.model("Item", ItemSchema);
