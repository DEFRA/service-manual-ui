import Joi from 'joi'

import { MAX_TEXT_LENGTH } from '../constants.js'

export default Joi.string()
  .trim()
  .min(1)
  .max(MAX_TEXT_LENGTH)
  .required()
  .messages({
    'string.empty': 'Enter an answer',
    'any.required': 'Enter an answer',
    'string.max': `Answer must be ${MAX_TEXT_LENGTH} characters or fewer`
  })
