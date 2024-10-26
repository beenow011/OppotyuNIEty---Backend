const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "philip68@ethereal.email",
        pass: "e1JGbyS8KVeABjd1Cr",
    },
});

module.exports = { transporter };