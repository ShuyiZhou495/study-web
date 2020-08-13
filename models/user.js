const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    }
});

var Users = mongoose.model('User', userSchema);

module.exports = Users;