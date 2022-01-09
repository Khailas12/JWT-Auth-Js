const Joi = require('joi');

const registerValidation = ((user) => {

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
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .min(6)
            .max(100)
            .required(),

        repeatPassword: Joi.string().
            equal(Joi.ref('password')).
            messages({ 'any.only': 'password does not match' })
            .required(),

        accessToken: [
            Joi.string(),
            Joi.number()
        ],

    })
        .xor('password', 'accessToken')
        .with('password', 'repeatPassword');

    return JoiSchema.validate(user)
});


const loginValidation = ((user) => {

    const JoiSchema = Joi.object({

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .min(6)
            .max(100)
            .required(),

        repeatPassword: Joi.ref('password'),

        accessToken: [
            Joi.string(),
            Joi.number()
        ],

    })
        .xor('password', 'accessToken')
        .with('password', 'repeatPassword');
    // schema options


    return JoiSchema.validate(user)
});

module.exports = { registerValidation, loginValidation };