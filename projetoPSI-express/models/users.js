const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({

    username: {type: String, unique: true, required: true},
    password: {type: String, required: true}
});

UserSchema.methods.genJwt() = function() {

    let expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        username: this.username,
        password: this.password,
        expires: parseInt(expirationDate.getTime() / 1000)
    }, 'CASADOSSEGREDOS');

};

// Export model
module.exports = mongoose.model("User", UserSchema);

