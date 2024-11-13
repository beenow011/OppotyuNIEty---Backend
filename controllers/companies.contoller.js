const appliedCompaniesModels = require("../models/appliedCompanies.models");
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
        const { branch } = req.query;
        const pipeline = [
            {
                $match: {
                    applicationActive: true,
                    ...(branch && { allowedBranches: { $in: [branch] } }) // Check if branch is in allowedBranches
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

        res.status(200).json({ companies });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}



async function getCompanyById(req, res, next) {
    try {
        const { companyId } = req.params;
        const company = await CompanyModel.findById(companyId);
        const count = await appliedCompaniesModels.countDocuments({ companyId });
        res.status(200).json({ company: company, count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function applyToCompany(req, res, next) {
    try {
        const { companyId, eligibilityScore } = req.body;
        const studentId = req.user._id;
        const company = await CompanyModel.findById(companyId);
        if (!company) {
            throw new Error('Company not found');
        }
        const appliedCompany = await appliedCompaniesModels.create({ companyId, studentId, eligibilityScore });
        if (!appliedCompany) {
            throw new Error('Error in applying to company');
        }
        res.status(200).json({ message: 'Applied to company successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function getApplicationStatus(req, res, next) {
    try {
        const studentId = req.user._id;
        const { companyId } = req.query;
        const applications = await appliedCompaniesModels.find({ studentId, companyId });
        console.log(applications);
        if (applications.length > 0)
            res.status(200).json({ applications, applied: true });
        else
            res.status(200).json({ applications, applied: false });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}


async function getAppliedCompanies(req, res, next) {
    try {
        const studentId = req.user._id;
        const applications = await appliedCompaniesModels.find({ studentId }).populate('companyId');
        res.status(200).json({ applications });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function allStudentsApplied(req, res, next) {
    try {
        const { companyId } = req.query;
        const applications = await appliedCompaniesModels.find({ companyId }).populate('studentId');
        res.status(200).json({ applications });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
module.exports = { addCompany, getCompanies, getCompanyById, applyToCompany, getApplicationStatus, getAppliedCompanies, allStudentsApplied }