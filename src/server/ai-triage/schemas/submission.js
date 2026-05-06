import Joi from 'joi'

export default Joi.object({
  email: Joi.string().trim().email().required().messages({
    'string.email': 'Enter a valid email address',
    'string.empty': 'Enter an email address',
    'any.required': 'Enter an email address'
  }),
  problem: Joi.string().trim().min(1).required().messages({
    'string.empty': 'Enter a description of the problem',
    'any.required': 'Enter a description of the problem'
  }),
  users: Joi.string().trim().min(1).required().messages({
    'string.empty': 'Enter a description of the users',
    'any.required': 'Enter a description of the users'
  }),
  benefits: Joi.string().trim().min(1).required().messages({
    'string.empty': 'Enter a description of the benefits',
    'any.required': 'Enter a description of the benefits'
  }),
  solutionAttempts: Joi.string().trim().min(1).required().messages({
    'string.empty': 'Enter a description of the solution attempts',
    'any.required': 'Enter a description of the solution attempts'
  })
})
