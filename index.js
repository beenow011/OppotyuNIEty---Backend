const express = require('express');

const app = express();
const bodyParser = require('body-parser');

//router
const coodinatorAuth = require('./routes/coordinator.auth.routes.js');
const companies = require('./routes/companies.routes.js');
const studentAuth = require('./routes/students.routes.js');
const geminiAssist = require('./routes/gemini.routes.js');
const openaiAssist = require('./routes/openai.routes.js');
const mockInterview = require('./routes/mockInterview.routes.js');




const cors = require('cors');
const { port, MONGODB_URL } = require('./config/config.js');
const { connectDB } = require('./db/connect');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '100mb' })); // Set the limit to 50MB or as needed
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/api', coodinatorAuth);
app.use('/api', companies)

app.use('/api', studentAuth)
app.use('/api', geminiAssist)
app.use('/api', openaiAssist)
app.use('/api', mockInterview)




async function serverStart() {

    try {
        await connectDB(MONGODB_URL);
        console.log("Database connected successfully");

        app.listen(port, () => {
            console.log('Server is running on port ' + port);

        });
    }
    catch (error) {
        console.error(error);
    }

}

serverStart()