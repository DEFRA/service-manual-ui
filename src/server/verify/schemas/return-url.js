import Joi from 'joi'

/**
 * Return URL schema for the verify form's hidden `returnUrl` field. Accepts
 * any string (including empty) - the open-redirect and relative-path checks
 * are enforced later by session.resolveReturnUrl, which falls back to the
 * default return URL for anything invalid rather than rejecting the request.
 */
export const returnUrlSchema = Joi.string().optional().allow('')
