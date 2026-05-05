import Joi from 'joi'

export default Joi.string().trim().email().required().messages({
  'string.email': 'Enter a valid email address',
  'string.empty': 'Enter an email address',
  'any.required': 'Enter an email address'
})
