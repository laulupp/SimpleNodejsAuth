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
        required: true
    },
    level: {
        type: Number,
        required: true,
        default: 0
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