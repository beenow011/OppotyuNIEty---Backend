const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GEMINI_API_KEY } = require("../config/config");

// xPercentage: "",
// xiiPercentage: "",
// cgpa: "",
// dob: "",
// phone: "",
// email: "",
// coreSkills: [],
async function extraxtInfoFromResume(req, res) {
    try {
        const fileBuffer = req.file.buffer;  // Multer stores the file buffer in `req.file.buffer`
        const base64Resume = fileBuffer.toString('base64');  // Convert the buffer to base64 string

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `The given base64 encoded resume is: ${base64Resume}, extract the information from the resume in the format :{
        name, xPercentage, xiiPercentage, cgpa, dob, phone, email, coreSkills: []}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text(); // Await the text extraction

        return res.status(200).json({ message: "Resume Sent", data: text })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

module.exports = { extraxtInfoFromResume };