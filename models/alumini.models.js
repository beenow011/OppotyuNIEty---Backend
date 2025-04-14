const mongoose = require("mongoose");

const Alumini = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userAddress: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    yearOfPassing: {
        type: String,
        required: true
    }
});

const AluminiModel = mongoose.model("alumini", Alumini);
module.exports = AluminiModel;