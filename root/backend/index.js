const express = require('express');
const mongoose = require('mongoose');
const { BusinessController } = require('./controllers/BusinessController');

const app = express();

app.listen(3000, () => {
    console.log('Server running on port 3000')
});

app.get('/', (req, res) => {
    res.send('Hello from ShineTrack API server');
});

//app.get('/businesses', BusinessController);
app.post('new-business', BusinessController.registerBusiness);

const dbURL = "mongodb+srv://admin:HiVoINwaGWmgf41s@shinetrack.8vcos.mongodb.net/CMS?retryWrites=true&w=majority&appName=shinetrack";

mongoose.connect(dbURL)
    .then(() => {
        console.log("Connected to the database succesfully!");
    })
    .catch(() => {
        console.log("Connection to the database was not successful");
    });

