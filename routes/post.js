const router = require('express').Router();
const verify = require('./tokenVerification');


router.get('/', verify, (req, res) => {
    res.json({
        posts: {
            title: 'Hello World',
            description: 'Login access only',
        }
    });
    // res.send(req.user);  // user details. 
});


module.exports = router;