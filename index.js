const express = require('express');
const expressApp = express();
const authRoute = require('./routes/auth');
const mongoose = require('mongoose');


const port = 3000 || process.env.PORT;

// Mongo db connection
require('dotenv').config()
const mongo = process.env.MONGO;
mongoose.connect(mongo, { useNewUrlParser: true }, () => {
    console.log('Connected to DB')
})


expressApp.use('/api/user', authRoute);     // Route middleware

expressApp.listen(port, () => {
    console.log('Server running');
});