const router = require('express').Router();
const User = require('../model/user');


// User Validation
const Joi = require('@hapi/joi');


const JoiSchema = Joi.object({

    firstName: Joi.string()
        .min(3)
        .max(100)
        .required(),

    lastName: Joi.string()
        .min(3)
        .max(100)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(6)
        .max(100)
        .required(),

});


router.post('/register', async (req, res) => {

    // data validation
    const { error } = JoiSchema.validate(req.body);

    if (error) {
        return res.status(400)
        .send(error.details[0].message);
    }

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