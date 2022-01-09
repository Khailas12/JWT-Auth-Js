const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../model/user');
const { registerValidation, loginValidation } = require('../validation');


const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};


router.post('/register', async (req, res) => {

    // data validation
    const { error, value } = registerValidation(req.body, options);

    if (error) {
        return res.status(400)
            .send(error.details[0].message);
    }
    else {
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
    }

    // Hash pswd
    const saltRounds = 10;
    const hashPassword = bcrypt.hashSync(req.body.password, saltRounds);


    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,

        password: hashPassword,
        repeatPassword: hashPassword,
        date: req.body.date,
    });

    // checks user exists in the db already
    const emailExist = await User.findOne({ email: req.body.email });
    
    if (emailExist) {
        return res.status(400)
            .send('Email already Exists');
    }

    try {
        // const savedUser = await user.save();
        // res.send(savedUser);
        await user.save();
        res.send({
            user: user.firstName + ' ' + user.lastName,
            email: user.email,
        });
        console.log('User saved');
    }
    catch (error) {
        res.status(400).send(error);
        console.log('user error');
    }
});


router.post('/login', async (req, res) => {

    const { errror, value } = loginValidation(req.body, options);

    if (errror) {
        return res.status(400)
            .send(errror.details[0].message);
    }
    else {
        req.body = value;
    }

    const noEmailMatch = await User.findOne({ email: req.body.email });

    if (!noEmailMatch) {  // if no matching email
        return res.status(400)
            .send('Email does not exist');
    }

    const validPswd = bcrypt.compare()
});


module.exports = router;