const express = require('express');
const expressApp = express();
const mongoose = require('mongoose');

const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');


require('dotenv').config()
const port = 3000 || process.env.PORT;

// Mongo db connection
const mongo = process.env.MONGO;
mongoose.connect(mongo, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });


// Middleware
expressApp.use(express.json());

expressApp.use('/api/user', authRoute);     // Route middleware
expressApp.use('/api/post', postRoute);

expressApp.listen(port, () => {
    console.log('Server running');
});