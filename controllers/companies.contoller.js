const appliedCompaniesModels = require("../models/appliedCompanies.models");
const CompanyModel = require("../models/companies.models");
const resourceModels = require("../models/resource.models");
const { uploadCloudinary } = require("../utils/cloudinary");

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

async function uploadResource(req, res, next) {
    try {
        const { id } = req.params;
        const { title, resourceType } = req.body;

        if (resourceType === 'file') {

            const file = req.file;
            if (!file) {
                throw new Error('Please upload a file');
            }
            const pdf = await uploadCloudinary(file.buffer);
            if (!pdf) {
                throw new Error('Error in uploading file');
            }
            // console.log(url);
            const resource = await resourceModels.create({ title, resourceType, resourceUrl: pdf.secure_url, resourceOf: id });
            return res.status(200).json({ message: 'Resource uploaded successfully', resource });

        } else if (resourceType === 'link') {
            const { resourceUrl } = req.body;
            const resource = await resourceModels.create({ title, resourceType, resourceUrl, resourceOf: id });

            return res.status(200).json({ message: 'Resource uploaded successfully', resource });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function getResouces(req, res, next) {
    try {
        const { id } = req.query;
        const resources = await resourceModels.find({ resourceOf: id });
        res.status(200).json({ resources });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function removeResource(req, res, next) {
    try {
        const { resourceId } = req.params;
        const resource = await resourceModels.findByIdAndDelete(resourceId);
        if (!resource) {
            throw new Error('Resource not found');
        }
        res.status(200).json({ message: 'Resource deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { addCompany, getCompanies, getCompanyById, applyToCompany, getApplicationStatus, getAppliedCompanies, allStudentsApplied, uploadResource, getResouces, removeResource }