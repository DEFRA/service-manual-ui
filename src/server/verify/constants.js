/**
 * Constants for the verification code verify flow
 */

// Maximum number of incorrect code attempts before the pending verify is
// invalidated and the user must request a new code
export const MAX_CODE_ATTEMPTS = 5

// Number of digits in a generated verification code, e.g. "048213"
export const VERIFICATION_CODE_LENGTH = 6

// yar session keys
export const PENDING_VERIFY_SESSION_KEY = 'pending-verify'

// yar flash message key for a one-time verify error to show on /verify
// after a redirect (e.g. an expired or locked-out code)
export const VERIFY_ERROR_FLASH_KEY = 'verify-error'

// Default redirect destination once a user has successfully verified
// their email and code. 
export const DEFAULT_RETURN_URL = '/'

// Default routes for the code-entry step - callers that skip straight to
// the code step (e.g. ai-triage) can override these per pending verify so
// the form posts back into their own flow instead.
export const DEFAULT_CODE_SUBMIT_PATH = '/verify/code'
export const DEFAULT_CHANGE_EMAIL_PATH = '/verify'

export const ENTER_EMAIL_TEMPLATE = 'verify/enter-email'
export const ENTER_CODE_TEMPLATE = 'verify/enter-code'

export const codeResults = {
  EXPIRED: 'expired',
  INCORRECT: 'incorrect',
  LOCKED_OUT: 'locked-out',
  VERIFIED: 'verified'
}

export const codeErrors = {
  [codeResults.EXPIRED]: 'Your code has expired. Enter your email to get a new one.',
  [codeResults.LOCKED_OUT]: 'Too many incorrect attempts. Enter your email to get a new code.'
}
