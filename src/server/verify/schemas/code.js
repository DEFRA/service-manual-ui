import Joi from 'joi'

/**
 * Challenge code schema for the verification code verify form. Codes are always
 * exactly 6 digits.
 */
export const codeSchema = Joi.string()
  .trim()
  .pattern(/^\d{6}$/)
  .required()
  .messages({
    'string.empty': 'Enter the code from your email',
    'string.pattern.base': `Enter the 6-digit code from your email`,
    'any.required': 'Enter the code from your email'
  })
