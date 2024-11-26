const interviewQuestionsModels = require("../models/interviewQuestions.models");
const MockInterviewConversationModel = require("../models/mockinterviewConversations.models");
const { default: OpenAI } = require("openai");
const { OPENAI_API_KEY } = require("../config/config");
const { OpenAIStream } = require("ai");

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
})

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

async function getInterviewQuestionsOfType(req, res) {
    try {
        const { id, type } = req.params;

        const interviewQuestions = await interviewQuestionsModels.find({ company: id, round: type });
        if (!interviewQuestions) {
            throw new Error("Questions not found")
        }

        return res.status(200).json({ message: "Interview Questions", data: interviewQuestions })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}


async function createInterviewSession(req, res) {
    try {
        const { companyId, skills, interviewType } = req.body;
        const studentId = req.user._id;
        const interviewSession = await InterviewSessionModel.create({ companyId, studentId, skills, interviewType });
        if (!interviewSession) {
            throw new Error('Error in creating interview session');
        }
        res.status(200).json({ message: 'Interview session created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function interviewSession(req, res) {
    try {
        const { companyId } = req.query;
        const studentId = req.user._id;
        const interviewSessions = await InterviewSessionModel.find({ companyId, studentId }).populate('companyId').populate('studentId');
        const interviewQuestions = await interviewQuestionsModels.find({ company: companyId, type: interviewSessions.interviewType });
        const sessionQuestions = await MockInterviewConversationModel.find({ companyId, studentId }).sort({ createdAt: -1 }).limit(10);

        const formattedPrevMessages = sessionQuestions.map((msg) => ({
            role: msg.isUserMsg ? 'user' : 'assistant',
            content: msg.message,
        }));


        const context = `PREVIOUS CONVERSATION:${formattedPrevMessages.map((msg) => {
            if (msg.role === 'user') return `User:${msg.content}\n`;
            return `Assistant:${msg.content}\n`;
        })}`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0.7, // Adjust the temperature as needed
            stream: true,
            messages: [
                {
                    role: 'system',
                    content: `Based on this job description: ${interviewSessions.companyId.jobDescription} and this skills: ${interviewSessions.skills}, generate a mock interview question tailored to the role. Focus on key skills, experiences, and common industry challenges. you also have the context to the prevoius conversation`,

                },
                {
                    role: 'user',
                    content: context, // Provide the context here
                },
            ],
        });
        if (response.choices[0].message.type === 'completion') {
            await MockInterviewConversationModel.create({
                companyId,
                studentId,
                message: completion.choices[0].message.content,
                isUserMsg: false,
            });
        }
        const completionResult = response.choices[0].message.content;

        return res.status(200).json({ message: "Resume Sent", data: completionResult })

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}
module.exports = {
    uploadInterviewQuestions,
    getInterviewQuestions,
    getInterviewQuestionsOfType,
    createInterviewSession,
    interviewSession
}