const mongoose = require('mongoose');

//comaapny schema includes companyName: "",
// logoUrl: "",
// ctc: "",
// baseSalary: "",
// jobDescription: "",
// intake: "",
// aboutCompany: "",
// location: "",
// opportunityType: "",
// stipend: "",
// allowedBranches: [],
const Company = new mongoose.Schema({
    companyName: {
        type: "string",
        required: true
    },
    logoUrl: {
        type: "string",
        required: true
    },
    role: {
        type: "string",
        required: true
    },
    ctc: {
        type: "string",
    },
    baseSalary: {
        type: "string",
    },
    jobDescription: {
        type: "string",
    },
    intake: {
        type: "string",
    },
    aboutCompany: {
        type: "string",
    },
    location: {
        type: "string",
    },
    opportunityType: {
        type: "string",
        required: true
    },
    stipend: {
        type: "string",
    },
    allowedBranches: {
        type: "array",
        required: true
    },
    schedule: {
        type: "string",

    },
    process: {
        type: "string",
    },
    cutOffCgpa: {
        type: "number",
    },
    cutOffXPercentage: {
        type: "number",
    },
    cutOffXiiPercentage: {
        type: "number",
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});


const CompanyModel = mongoose.model('companies', Company);
module.exports = CompanyModel;
