const CompanyModel = require("../models/companies.models");

async function addCompany(req, res, next) {
    // companyName: "",
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
    // schedule: "",
    // process: "",
    // cutOffCgpa: 0,
    // cutOffXPercentage: 0,
    // cutOffXiiPercentage: 0,
    try {
        const { companyName, logoUrl, ctc, baseSalary, jobDescription, intake, aboutCompany, location, opportunityType, stipend, allowedBranches, schedule, process, cutOffCgpa, role, cutOffXPercentage, cutOffXiiPercentage } = req.body;
        if (!companyName || !logoUrl || !opportunityType || !allowedBranches || !role) {
            throw new Error('Please fill all the required fields');
        }
        const company = await CompanyModel.create({ companyName, logoUrl, role, ctc, baseSalary, jobDescription, intake, aboutCompany, location, opportunityType, stipend, allowedBranches, schedule, process, cutOffCgpa, cutOffXPercentage, cutOffXiiPercentage });
        res.status(200).json({ message: 'Company added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function getCompanies(req, res, next) {
    try {
        const pipeline = [
            {

                $match: {
                    applicationActive: true,
                },
            },
            {
                $project: {
                    _id: 1,             // Include _id field from the output
                    companyName: 1,     // Include companyName
                    role: 1,            // Include role
                    allowedBranches: 1, // Include allowedBranches
                    ctc: 1,             // Include ctc
                    logoUrl: 1,         // Include logoUrl
                },
            },
        ];
        const companies = await CompanyModel.aggregate(pipeline);

        res.status(200).json({ companies: companies });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function getCompanyById(req, res, next) {
    try {
        const { companyId } = req.params;
        const company = await CompanyModel.findById(companyId);
        res.status(200).json({ company: company });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { addCompany, getCompanies, getCompanyById }