const jwt = require('jsonwebtoken');
require('dotenv').config()


dotenv.config();
const secret_token = process.env.SECRET_TOKEN;

const auth = ((req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {   // no token
        return res.status(401).send('Access Denied');
    }

    try {
        const verified = jwt.verify(token, secret_token);
        req.user = verified;    // valid token
    }
    catch(err) {
        res.status(400).send('Invalid Token');
    }
});


module.exports = auth;