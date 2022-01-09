const router = require('express').Router();
const User = require('../model/user');


router.post('/register', async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        date: req.body.date,
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
        console.log('User saved');
    }
    catch(error) {
        res.status(400).send(error);
        console.log('user errror');
    }
});

router.post('/login');


module.exports = router;