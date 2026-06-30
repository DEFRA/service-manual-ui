import Joi from 'joi'

import emailRequired from './email-required.js'
import textRequired from './text-required.js'

export default Joi.object({
  email: emailRequired,
  problem: textRequired.messages({
    'string.empty': 'Enter a description of the problem',
    'any.required': 'Enter a description of the problem'
  }),
  users: textRequired.messages({
    'string.empty': 'Enter a description of the users',
    'any.required': 'Enter a description of the users'
  }),
  benefits: textRequired.messages({
    'string.empty': 'Enter a description of the benefits',
    'any.required': 'Enter a description of the benefits'
  }),
  solutionAttempts: textRequired.messages({
    'string.empty': 'Enter a description of the solution attempts',
    'any.required': 'Enter a description of the solution attempts'
  })
})
