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

    // checks whether the user exists in the db
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
        console.log('User Created');
    }
    catch (error) {
        res.status(400).send(error);
        console.log('user error');
    }
});


router.post('/login', async (req, res) => {

    const { error, value } = loginValidation(req.body, options);

    if (error) {
        return res.status(400)
            .send(error.details[0].message);
    }
    else {
        req.body = value;
    }

    const EmailMatch = await User.findOne({ email: req.body.email });

    if (!EmailMatch) {  // if no matching email
        return res.status(400)
            .send('Email does not exist');
    }

    const myPlaintextPassword = 's0/\/\P4$$w0rD';   
    const validPswd = bcrypt.compare(myPlaintextPassword, req.body.password, User.password);    

    if (!validPswd) {   // no matching pswd
        return res.status(400)
            .send('Invalid Password')
    };

    // const username =await User.findOne(User.firstName);
    // res.send(`Login Succesful, Welcome ${username} `);
    console.log('User Logged in')
});


module.exports = router;