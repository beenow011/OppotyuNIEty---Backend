const { application } = require("express");
const mongoose = require("mongoose");

const appliedCompaniesModel = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "students",
        required: true,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "companies",
        required: true,
    },
    appliedOn: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending'
    },
    eligibilityScore: {
        type: Number,
        required: false
    },

});

module.exports = mongoose.model("appliedCompanies", appliedCompaniesModel);