const { application } = require("express");
const mongoose = require("mongoose");

const resourceModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    resourceType: {
        type: String,
        enum: ['file', 'link'],
        default: 'file'
    },
    resourceUrl: {
        type: String,
        required: true
    },
    resourceOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "companies",
        required: true
    }
});

module.exports = mongoose.model("resources", resourceModel);