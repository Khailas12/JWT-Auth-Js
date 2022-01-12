const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();
const secret_token = process.env.SECRET_TOKEN;

const auth = ((req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {   // no token. this denies the access to the post
        return res.status(401).send('Access Denied');
    }

    try {   // lets to access the post 
        const verified = jwt.verify(token, secret_token);
        req.user = verified;    // valid token
        next();
    }
    catch (err) {
        res.status(400).send('Invalid Token');
    }
});

module.exports = auth;