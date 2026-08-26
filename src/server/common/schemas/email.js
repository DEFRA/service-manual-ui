import Joi from 'joi'

import { isEmailDomainAllowed } from './email-allow-list.js'

/**
 * Shared email address schema. Trims and validates the address, then
 * gates it against the approved organisation domain allow-list. Reused by
 * any feature that needs to collect an email address (e.g. AI triage,
 * verification code verify) so the allow-list is enforced consistently everywhere.
 */
export const emailSchema = Joi.string()
  .trim()
  .email()
  .custom((value, helpers) =>
    isEmailDomainAllowed(value) ? value : helpers.error('any.invalid')
  )
  .messages({
    'string.email': 'Enter a valid email address',
    'string.empty': 'Enter an email address',
    'any.required': 'Enter an email address',
    'any.invalid': 'Enter an email address from an approved organisation'
  })
