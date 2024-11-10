// import Jwt from "jsonwebtoken";
// import { ApiError } from "../utils/ApiError.js";
// import { User } from "../models/user.models.js";
// import { asyncHandler } from "../utils/asyncHandler.js";

const Jwt = require("jsonwebtoken");
const CoordinatorModel = require("../models/coordinator.models");
const StudentModel = require("../models/students.models");


const verifyCoordinator = async (req, res, next) => {

    try {

        // console.log(req.cookies)

        const { address } = req.query;
        const user = await CoordinatorModel.findOne({ userAddress: address.toLowerCase() });



        if (!user) {
            throw new Error("Invalid Access Token")
        }

        if (!user.approvedStatus) {
            throw new Error("You are not authorized to access this route")
        }

        req.user = user;
        next()
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }

}

const verifyStudent = async (req, res, next) => {

    try {

        // console.log(req.cookies)

        const { address } = req.query;
        const user = await StudentModel.findOne({ userAddress: address.toLowerCase() });



        if (!user) {
            throw new Error("Invalid Access Token")
        }

        if (!user.documentsCollected) {
            throw new Error("Complete your profile to access this route")
        }

        req.user = user;
        next()
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }

}

const verifyStudentOrCoordinator = async (req, res, next) => {

    try {

        // console.log(req.cookies)

        const { address } = req.query;
        const student = await StudentModel.findOne({ userAddress: address.toLowerCase() });
        const coordinator = await CoordinatorModel.findOne({ userAddress: address.toLowerCase() });
        if (!student && !coordinator) {
            throw new Error("Invalid Access Token")
        }
        if (student) {
            if (!student.documentsCollected) {
                throw new Error("Complete your profile to access this route")
            }
            req.user = student;
        } else {
            if (!coordinator.approvedStatus) {
                throw new Error("You are not authorized to access this route")
            }
            req.user = coordinator;
        }
        next()
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }

}


module.exports = { verifyCoordinator, verifyStudent, verifyStudentOrCoordinator };