const express = require('express');
const routes = require('./routes/index.js');
const mongoose = require('mongoose');
require('dotenv').config();

const server = express();

const startServer = (app) => {
    const port = process.env.PORT;

    app.use(express.json());

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

const connectDB = () => {
    const dbURL = process.env.DB_URL;

    mongoose.connect(dbURL)
        .then(() => {
            console.log("Connected to the database succesfully!");
        })
        .catch(() => {
            console.log("Connection to the database was not successful");
        });
};

connectDB();
routes(server);
startServer(server);

module.exports = server;