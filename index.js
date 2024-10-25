const express = require('express');

const app = express();
const coodinatorAuth = require('./routes/coordinator.auth.routes.js');
const cors = require('cors');
const { port, MONGODB_URL } = require('./config/config.js');
const { connectDB } = require('./db/connect');
app.use(cors());
app.use(express.json());
app.use('/api', coodinatorAuth);


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