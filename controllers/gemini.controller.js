const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GEMINI_API_KEY } = require("../config/config");

// xPercentage: "",
// xiiPercentage: "",
// cgpa: "",
// dob: "",
// phone: "",
// email: "",
// coreSkills: [],

const pdf = require("pdf-parse");

async function checkEligibility(req, res) {
    try {
        const fileBuffer = req.file.buffer;  // Multer stores the file buffer in `req.file.buffer`
        const base64Resume = fileBuffer.toString("base64");  // Convert the buffer to a base64 string

        async function extractTextFromPdf(pdfBuffer) {
            const data = await pdf(pdfBuffer);
            return data.text; // Extracted text content from the PDF
        }

        const text = await extractTextFromPdf(fileBuffer);
        const { jd } = req.body;

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `The given text from resume is: ${text}, and this is the job description: ${jd}. Based on the extracted information from the resume, check the eligibility of the candidate in percentage and provide a small note.`;

        const result = await model.generateContent(prompt);
        console.log(result?.response?.text);

        const eligibility = result?.response?.text || "Eligibility information could not be generated";
        console.log(eligibility);

        return res.status(200).json({ message: "Eligibility Sent", eligibility });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function answerTheQuestion(req, res) {
    try {
        const { question } = req.body;
        // console.log(question);
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `If interviewer asks the question: ${question}. Provide a detailed answer to the question.`;

        const result = await model.generateContent(prompt);
        console.log(result?.response?.text);

        const answer = result?.response?.text || "Answer could not be generated";
        console.log(answer);

        return res.status(200).json({ message: "Answer Sent", answer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { checkEligibility, answerTheQuestion };