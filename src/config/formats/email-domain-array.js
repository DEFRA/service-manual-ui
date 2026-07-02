function coerce (val) {
  if (typeof val !== 'string') {
    return val
  }

  return val
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
}

function validate (val) {
  if (!Array.isArray(val)) {
    throw new TypeError('must be an array')
  }

  const dotted = val.filter((domain) => domain.startsWith('.'))

  if (dotted.length) {
    throw new TypeError(`email domains must not start with a dot: ${dotted.join(', ')}`)
  }
}

export default {
  name: 'email-domain-array',
  coerce,
  validate
}
