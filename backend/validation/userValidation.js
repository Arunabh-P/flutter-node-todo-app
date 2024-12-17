import Joi from 'joi'

export const registrationValidation = Joi.object({
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        'string.email': 'Please enter a valid Email ID.',
        'string.empty': 'Email ID cannot be empty.',
        'any.required': 'Email ID is required.',
        'string.base': 'Email must be a string.',
    }),
    password:Joi.string().min(6)
    .max(12)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,12}$'))
    .required()
    .messages({
        'string.min': 'Password must be at least 6 characters long.',
        'string.max': 'Password cannot exceed 12 characters.',
        'string.pattern.base': 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
        'string.empty': 'Password cannot be empty.',
        'any.required': 'Password is required.',
        'string.base': 'Password must be a string.',
    }),
})
export const loginValidation = Joi.object({
    email:Joi.string().required().messages({
        'string.empty': 'Email ID cannot be empty.',
        'any.required': 'Email ID is required.',
        'string.base': 'Email must be a string.',
    }),
    password:Joi.string()
    .required()
    .messages({
        'string.empty': 'Password cannot be empty.',
        'any.required': 'Password is required.',
        'string.base': 'Password must be a string.',
    }),
})