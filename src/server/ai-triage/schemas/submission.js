import Joi from 'joi'

import emailRequired from './email-required.js'

export default Joi.object({
  email: emailRequired,
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
