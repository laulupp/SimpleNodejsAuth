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
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        required: false
    },
});

module.exports = mongoose.model("User", userSchema);