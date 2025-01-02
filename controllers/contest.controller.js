const ContestModel = require("../models/contest.models");
const ContestResultModel = require("../models/contestResult.models");

async function createContest(req, res) {
    try {
        console.log('Body:', req.body);
        console.log('User:', req.user);

        const { contestName, questions, schedule: scheduledTime } = req.body;
        console.log(typeof (scheduledTime));
        if (!contestName || !questions || !scheduledTime) {
            throw new Error('Missing required fields to create a contest');
        }

        const newContest = await ContestModel.create({ contestName, questions, scheduledTime });
        if (!newContest) {
            throw new Error('Failed to create contest');
        }

        return res.status(200).json({ newContest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

//write a function to get all contests
async function getAllActiveContests(req, res) {
    try {
        const contests = await ContestModel.find();
        if (!contests) {
            throw new Error('No contests found');
        }
        return res.status(200).json({ contests, message: "All Active Contests" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function getContestById(req, res) {
    try {
        const { contestId } = req.params;
        const { _id } = req.user;
        const completed = await ContestResultModel.find({ contestId, studentId: _id })
        console.log(completed)

        if (!contestId) {
            throw new Error('Missing required fields to get contest');
        }

        const contest = await ContestModel.findById(contestId);
        if (!contest) {
            throw new Error('No contest found');
        }
        if (completed.length > 0)
            return res.status(200).json({ status: true, contest, previousScore: completed });
        else
            return res.status(200).json({ status: false, contest });


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function submitContest(req, res) {
    try {
        const { contestId, score, timeTaken } = req.body;
        const { _id } = req.user;

        if (!contestId || !score || !timeTaken) {
            throw new Error('Missing required fields to submit contest');
        }

        const contest = await ContestModel.findById(contestId);
        if (!contest) {
            throw new Error('No contest found');
        }




        const newResult = await ContestResultModel.create({ contestId, studentId: _id, score, timeTaken });
        if (!newResult) {
            throw new Error('Failed to submit contest');
        }

        return res.status(200).json({ newResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function getContestResults(req, res) {
    try {
        const { contestId } = req.params;
        const results = await ContestResultModel.find({ contestId })
            .populate('studentId')
            .sort({
                score: -1, // -1 for descending (higher scores first)
                timeTaken: 1 // 1 for ascending (less time first)
            });

        if (!results) {
            throw new Error('No results found');
        }

        return res.status(200).json({ results });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function EndContest(req, res) {
    try {
        const { contestId } = req.params;
        const contest = await ContestModel.findById(contestId);
        if (!contest) {
            throw new Error('No contest found');
        }

        contest.contestStatus = false;
        await contest.save();

        return res.status(200).json({ contest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
module.exports = { createContest, getAllActiveContests, getContestById, submitContest, getContestResults, EndContest }