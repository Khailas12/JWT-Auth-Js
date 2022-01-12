const router = require('express').Router();


router.get('/', (req, res) => {
    res.json({
        posts: {
            title: 'Hello World',
            description: 'Login access only',
        }
    });
});


module.exports = router;