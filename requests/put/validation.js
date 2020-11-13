const Joi = require('@hapi/joi');

//! Add info validation
const addInfoValidation = data => {
    const schema = {
        name: Joi.string()
            .min(1)
            .max(100),
        surname: Joi.string()
            .min(1)
            .max(100),
        lastName: Joi.string()
            .min(1)
            .max(100),
        age: Joi.string()
            .min(1)
            .max(3),
        bloodGroup: Joi.string()
            .min(2)
            .max(2),
        phoneNumber: Joi.string()
            .min(2)
            .max(50),
        adress1: Joi.string()
            .min(1)
            .max(255),
        medicamentID: Joi.array()
    };
    return Joi.validate(data, schema);
};

//! Add medicament link validation
const linkMedicamentValidation = data => {
    const schema = {
        medicamentID: Joi
        .required(),
    };
    return Joi.validate(data, schema);
};

module.exports.addInfoValidation = addInfoValidation;
module.exports.linkMedicamentValidation = linkMedicamentValidation;