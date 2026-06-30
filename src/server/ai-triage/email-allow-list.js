import { config } from '../../config/config.js'

const allowedDomains = config
  .get('aiTriage.allowedEmailDomains')
  .map((entry) => entry.trim().toLowerCase())
  .filter(Boolean)

export function isEmailDomainAllowed (email) {
  if (allowedDomains.length === 0) {
    return false
  }

  const domain = email.split('@').pop().toLowerCase()

  return allowedDomains.includes(domain)
}
