const Joi = require('@hapi/joi');

const schema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(30)
        .required(),
    user: Joi.string()
})

const validate = async (input) => {
    return  schema.validate(input)
}

module.exports = {
    validate
}