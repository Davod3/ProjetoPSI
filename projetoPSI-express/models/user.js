const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true, maxLenght: 10},
    password: {type: String, required: true},
    items: [{type: mongoose.Schema.Types.ObjectId, ref: "Item"}],
    cart: [{type: Map, of: "String"}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    lists: [{type: mongoose.Schema.Types.ObjectId, ref: "List"}],
    image: {type: String, required: true}
});

UserSchema.methods.validatePwd = function(password) {
    return this.password===password;
};

UserSchema.methods.genJwt = function() {

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

