const { default: OpenAI } = require("openai");
const { OPENAI_API_KEY } = require("../config/config");

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
})


async function extraxtInfoFromResume(req, res) {
    try {
        const fileBuffer = req.file.buffer;  // Multer stores the file buffer in `req.file.buffer`
        const base64Resume = fileBuffer.toString('base64');  // Convert the buffer to base64 string
        const pdf = require('pdf-parse');
        async function extractTextFromPdf(pdfBuffer) {
            const data = await pdf(pdfBuffer);
            return data.text; // Extracted text content from the PDF
        }

        const text = await extractTextFromPdf(fileBuffer);
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // Correct model name use gpt-4-turbo-2024-04-09 in production
            temperature: 0.1, // Adjust the temperature as needed
            stream: false,
            messages: [
                {
                    role: 'system',
                    content: `The given text from resume is: ${text}, extract the information from the resume in the format :{
        name, xPercentage, xiiPercentage, cgpa, dob, phone, email, coreSkills: []}`
                }
            ]
        });
        const completionResult = response.choices[0].message.content;
        // Await the text extraction

        return res.status(200).json({ message: "Resume Sent", data: completionResult })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

async function checkEligibility(req, res) {
    try {
        const fileBuffer = req.file.buffer;  // Multer stores the file buffer in `req.file.buffer`
        const base64Resume = fileBuffer.toString('base64');  // Convert the buffer to base64 string
        const pdf = require('pdf-parse');
        async function extractTextFromPdf(pdfBuffer) {
            const data = await pdf(pdfBuffer);
            return data.text; // Extracted text content from the PDF
        }

        const text = await extractTextFromPdf(fileBuffer);
        const { jd } = req.body;
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // Correct model name use gpt-4-turbo-2024-04-09 in production
            temperature: 0.1, // Adjust the temperature as needed
            stream: false,
            messages: [
                {
                    role: 'system',
                    content: `The given text from resume is: ${text}, and this is job description: ${jd}, given the extracted information from the resume, check the eligibility of the candidate for that company and role in percentage and a small note under 20 words`
                },

            ]
        });
        const completionResult = response.choices[0].message.content;
        return res.status(200).json({ message: "Resume Sent", data: completionResult })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function answerTheQuestion(req, res) {
    try {
        const { question } = req.body;
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // Correct model name use gpt-4-turbo-2024-04-09 in production
            temperature: 0.1, // Adjust the temperature as needed
            stream: false,
            messages: [
                {
                    role: 'system',
                    content: `If interviewer asks the question: ${question}, provide a detailed answer to the question`
                }
            ]
        });
        const completionResult = response.choices[0].message.content;
        return res.status(200).json({ message: "Answer Sent", data: completionResult })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { extraxtInfoFromResume, checkEligibility, answerTheQuestion };