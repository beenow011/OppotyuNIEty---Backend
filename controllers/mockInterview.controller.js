const interviewQuestionsModels = require("../models/interviewQuestions.models");

async function uploadInterviewQuestions(req, res) {
    try {

        const { questions, round } = req.body;
        const { id } = req.params;

        if (!questions && !round) {
            throw new Error("Questions and Round are required")
        }

        const interviewQuestions = await interviewQuestionsModels.create({ questions, round, company: id });
        if (!interviewQuestions) {
            throw new Error("Questions not uploaded")
        }


        return res.status(200).json({ message: "Interview Questions uploaded", data: interviewQuestions })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

async function getInterviewQuestions(req, res) {
    try {
        const { id } = req.params;

        const interviewQuestions = await interviewQuestionsModels.find({ company: id });
        if (!interviewQuestions) {
            throw new Error("Questions not found")
        }

        return res.status(200).json({ message: "Interview Questions", data: interviewQuestions })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    uploadInterviewQuestions,
    getInterviewQuestions
}