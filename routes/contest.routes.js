const express = require('express');
const { verifyCoordinator, verifyStudentOrCoordinator, verifyStudent } = require('../middleware/auth');
const { createContest, getAllActiveContests, getContestById, submitContest, getContestResults, EndContest } = require('../controllers/contest.controller');
const router = express.Router();

router.post("/contest/create-contest", verifyCoordinator, createContest)
router.get("/contest/get-all-contests", verifyStudentOrCoordinator, getAllActiveContests)
router.get("/contest/get-contest-by-id/:contestId", verifyStudentOrCoordinator, getContestById)
router.post("/contest/add-result", verifyStudent, submitContest)
router.get("/contest/get-result/:contestId", verifyStudentOrCoordinator, getContestResults)
router.patch("/contest/end-contest/:contestId", verifyCoordinator, EndContest)
module.exports = router;