const Joi = require('@hapi/joi');

//! Medicament validation
const medicamentValidation = data => {
    const schema = {
        name: Joi.string()
            .min(1)
            .max(100)
            .required(),
        time: Joi.array()
            .required(),
    };
    return Joi.validate(data, schema);
};

module.exports.medicamentValidation = medicamentValidation;