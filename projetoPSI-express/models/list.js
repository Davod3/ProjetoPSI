const mongoose = require("mongoose");

var ListSchema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 50 },
  content: [{type: mongoose.Schema.Types.ObjectId, ref: "Item"}]
});

// Export model
module.exports = mongoose.model("List", ListSchema);