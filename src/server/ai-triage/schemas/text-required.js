import Joi from 'joi'

export default Joi.string().trim().min(1).required().messages({
  'string.empty': 'Enter an answer',
  'any.required': 'Enter an answer'
})
