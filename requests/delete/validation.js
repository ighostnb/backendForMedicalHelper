const Joi = require('@hapi/joi');

//! Delete medicament validation
const deleteMedicamentValidation = data => {
    const schema = {
        name: Joi.string()
            .min(1)
            .max(100),
    };
    return Joi.validate(data, schema);
};

module.exports.deleteMedicamentValidation = deleteMedicamentValidation;