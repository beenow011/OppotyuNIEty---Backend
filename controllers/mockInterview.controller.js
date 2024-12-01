const interviewQuestionsModels = require("../models/interviewQuestions.models");
const MockInterviewConversationModel = require("../models/mockinterviewConversations.models");
const { default: OpenAI } = require("openai");
const { OPENAI_API_KEY } = require("../config/config");
// import { OpenAIStream, StreamingTextResponse } from 'ai';
const { OpenAIStream, StreamingTextResponse } = require('ai');
const InterviewSessionModel = require("../models/interviewSession.models");

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
        res.status(200).json({ message: 'Interview session created successfully', data: interviewSession });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function getInterviewSession(req, res) {
    try {
        const { id, type } = req.params;
        const studentId = req.user._id;
        const interviewSessions = await InterviewSessionModel.find({ companyId: id, studentId, interviewType: type }).populate('companyId').populate('studentId');
        res.status(200).json({ message: 'Interview sessions fetched successfully', data: interviewSessions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function StartinterviewSession(req, res) {
    try {
        const { sessionId } = req.body;
        const interviewSessions = await InterviewSessionModel.findById(sessionId).populate('companyId').populate('studentId');
        const prevQUestions = await interviewQuestionsModels.find({ company: interviewSessions.companyId._id, round: interviewSessions.interviewType });
        const context = `PREVIOUS QUESTIONS:${prevQUestions.map((question) => question.questions).join("\n")}`;
        // console.log("4")
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0.7, // Adjust the temperature as needed
            messages: [
                {
                    role: 'system',
                    content: `conduct a ${interviewSessions.interviewType} round Interview for the company ${interviewSessions.companyId.companyName}. Based on this job description: ${interviewSessions.companyId.jobDescription} and this skills: ${interviewSessions.skills}, Start the mock interview question tailored to the role. Focus on key skills, experiences, and common industry challenges. (1 QUESTION AT A TIME) response format :question`,

                }, {
                    role: 'user',
                    content: context, // Provide the context here
                },
            ],
        });

        if (response.choices[0].message.content) {
            await MockInterviewConversationModel.create({
                sessionId,
                message: response.choices[0].message.content,
                isUserMsg: false,
            });
            const completionResult = response.choices[0].message.content
            return res.status(200).json({ message: "Interview started", data: completionResult })
        } else {
            throw new Error("No response")
        }




    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}
async function continueInterviewSession(req, res) {
    try {
        const { sessionId, message } = req.body;
        if (!message) {
            throw new Error("Message is required");
        }

        const msg = await MockInterviewConversationModel.create({
            sessionId,
            message,
            isUserMsg: true,
        });
        if (!msg) {
            throw new Error("Error in saving message");
        }
        const session = await InterviewSessionModel.findById(sessionId).populate('companyId');
        if (!session) {
            throw new Error("Session not found");
        }
        const sessionQuestions = await MockInterviewConversationModel.find({ sessionId }).sort({ createdAt: -1 }).limit(10);
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
            messages: [
                {
                    role: 'system',
                    content: `Continue a ${session.interviewType} round Interview for the company ${session.companyId.companyName}.Based on this job description: ${session.companyId.jobDescription} and this skills: ${session.skills}, Continue the mock interview question as per context tailored to the role. Focus on key skills, experiences, and common industry challenges. you also have the context to the prevoius conversation (1 question at a time). response format :question`,

                },
                {
                    role: 'user',
                    content: context, // Provide the context here
                },
                {
                    role: 'user',
                    content: message
                }
            ],
        });
        if (response.choices[0].message.content) {
            await MockInterviewConversationModel.create({
                sessionId,
                message: response.choices[0].message.content,
                isUserMsg: false,
            });
            const completionResult = response.choices[0].message.content
            return res.status(200).json({ message: "Interview started", data: completionResult })
        } else {
            throw new Error("No response")
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}
async function MockInterviewConversation(req, res) {
    try {
        const { sessionId } = req.body;
        console.log("Session ID:", sessionId);

        //sessionId is the _id of the interview session
        // const sessionQuestions = await MockInterviewConversationModel.find({ sessionId }).sort({ createdAt: -1 }).limit(10);
        //why am i getting empty array
        // const sessionQuestions = await MockInterviewConversationModel.find({ sessionId }).sort({ createdAt: -1 });
        const sessionQuestions = await MockInterviewConversationModel.find({ sessionId }).sort({ createdAt: 1 });
        console.log(sessionQuestions)

        return res.status(200).json({ message: "Interview Questions", data: sessionQuestions })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    uploadInterviewQuestions,
    getInterviewQuestions,
    getInterviewQuestionsOfType,
    createInterviewSession,
    StartinterviewSession,
    continueInterviewSession,
    getInterviewSession,
    MockInterviewConversation
}