import Joi from 'joi'

import { isEmailDomainAllowed } from '../email-allow-list.js'

export default Joi.string()
  .trim()
  .email()
  .required()
  .custom((value, helpers) =>
    isEmailDomainAllowed(value) ? value : helpers.error('any.invalid')
  )
  .messages({
    'string.email': 'Enter a valid email address',
    'string.empty': 'Enter an email address',
    'any.required': 'Enter an email address',
    'any.invalid': 'Enter an email address from an approved organisation'
  })
