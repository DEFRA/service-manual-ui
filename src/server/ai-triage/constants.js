/**
 * Reference generation constants for AI triage submissions
 */

// Character set excludes O, 0, I, 1 to avoid transcription errors
export const REFERENCE_CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

// Length of random suffix in reference code
export const REFERENCE_SUFFIX_LENGTH = 6

// Number of year digits to include in reference (last 2 digits)
export const REFERENCE_YEAR_SLICE = -2

// Maximum length for free-text triage answer fields (defence-in-depth bound)
export const MAX_TEXT_LENGTH = 1200

// Route payload cap for triage form POSTs (8 KB in bytes)
// 1200 chars URL-encoded (~3 bytes/char worst case) + field overhead
export const MAX_PAYLOAD_BYTES = 8192
