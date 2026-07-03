// Default-on for tests: AI content visible. Tests that exercise the gated
// state (e.g. controller-gated.test.js) override this in their own beforeAll.
process.env.ENABLE_AI_CONTENT = 'true'
process.env.AI_TOOLKIT_NOTIFY_KEY =
  process.env.AI_TOOLKIT_NOTIFY_KEY || 'dummy-api-key-for-tests'
process.env.AI_TOOLKIT_TRIAGE_TEMPLATE_ID =
  process.env.AI_TOOLKIT_TRIAGE_TEMPLATE_ID ||
  '89ee0b57-0fc3-47f5-b833-98f7a7ff2826'
process.env.AI_TOOLKIT_CONFIRMATION_TEMPLATE_ID =
  process.env.AI_TOOLKIT_CONFIRMATION_TEMPLATE_ID ||
  'b91e6fbc-565f-48ab-955f-b3ef040f6125'
process.env.AICE_SHARED_MAILBOX_EMAIL =
  process.env.AICE_SHARED_MAILBOX_EMAIL ||
  'dummy-mailbox-email-for-tests@example.com'
process.env.SESSION_COOKIE_PASSWORD = 'dummy-session-cookie-password-12'
process.env.AI_TOOLKIT_ALLOWED_EMAIL_DOMAINS =
  process.env.AI_TOOLKIT_ALLOWED_EMAIL_DOMAINS || 'example.com,defra.gov.uk'

// Default to lockdown mode for all tests in project
process.env.NOCK_MODE = process.env.NOCK_MODE || 'lockdown'
