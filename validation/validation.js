// Joi package that does validation for you with simple shortcuts //
const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        firstname: Joi.string().min(4).required(),
        lastname: Joi.string().min(4).required(),
        username: Joi.string().min(6).required(),
        password: Joi.string().min(10).required()
    });

    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(10).required()
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;