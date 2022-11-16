const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required:false
    },
    email: {
        type: String,
        required:false
    }
});

module.exports = mongoose.model("Users", userSchema);