const express = require('express');
const expressApp = express();
const authRoute = require('./routes/auth');


const port = 3000 || process.env.PORT;

expressApp.use('/api/user', authRoute);


expressApp.listen(port, () => {
    console.log('Server running');
});

