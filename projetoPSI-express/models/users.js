const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({

    username: {type: String, unique: true, required: true},
    password: {type: String, required: true}
});

// Export model
module.exports = mongoose.model("User", UserSchema);