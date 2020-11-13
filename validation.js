const Joi = require('@hapi/joi');

//! Register validation
const registerValidation = data => {
    const schema = {
        email: Joi.string().
            min(6).
            required().
            email(),
        password: Joi.string().
            min(8).
            required(),
    };
    return Joi.validate(data, schema);
};

//! Login validation
const loginValidation = data => {
    const schema = {
        email: Joi.string().
            min(6).
            required().
            email(),
        password: Joi.string().
            min(8).
            required(),
        role: Joi.string().
            min(4).
            max(5).
            required(),
    };
    return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
