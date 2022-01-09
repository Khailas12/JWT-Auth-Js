const router = require('express').Router();
const User = require('../model/user');
const { registerValidation, loginValidation } = require('../validation');


router.post('/register', async (req, res) => {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    
    // data validation
    const { error, value } = registerValidation(req.body, options);

    if (error) {
        return res.status(400)
            .send(error.details[0].message);
    } else {
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
    }


    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        repeatPassword: req.body.password,
        date: req.body.date,
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
        console.log('User saved');
    }
    catch (error) {
        res.status(400).send(error);
        console.log('user errror');
    }
});


router.post('/login');


module.exports = router;