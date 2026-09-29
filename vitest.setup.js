process.env.PORT = process.env.PORT || '3098'
process.env.AI_TOOLKIT_NOTIFY_KEY =
  process.env.AI_TOOLKIT_NOTIFY_KEY || 'dummy-api-key-for-tests'
process.env.AI_TOOLKIT_TRIAGE_TEMPLATE_ID =
  process.env.AI_TOOLKIT_TRIAGE_TEMPLATE_ID ||
  '89ee0b57-0fc3-47f5-b833-98f7a7ff2826'
process.env.AI_TOOLKIT_CONFIRMATION_TEMPLATE_ID =
  process.env.AI_TOOLKIT_CONFIRMATION_TEMPLATE_ID ||
  'b91e6fbc-565f-48ab-955f-b3ef040f6125'
process.env.AI_TOOLKIT_ASK_REPORT_TEMPLATE_ID =
  process.env.AI_TOOLKIT_ASK_REPORT_TEMPLATE_ID ||
  '6a1c2d3e-4f50-4a61-8b72-9c8d0e1f2a3b'
process.env.VERIFICATION_CODE_EMAIL_TEMPLATE_ID =
  process.env.VERIFICATION_CODE_EMAIL_TEMPLATE_ID ||
  '4f5f6a8c-6f5a-4a3b-9c1a-2e6f0f5f3a1b'
process.env.AICE_SHARED_MAILBOX_EMAIL =
  process.env.AICE_SHARED_MAILBOX_EMAIL ||
  'dummy-mailbox-email-for-tests@example.com'
process.env.SESSION_COOKIE_PASSWORD = 'dummy-session-cookie-password-12'
process.env.AI_TOOLKIT_ALLOWED_EMAIL_DOMAINS =
  process.env.AI_TOOLKIT_ALLOWED_EMAIL_DOMAINS || 'example.com,defra.gov.uk'

// Default to lockdown mode for all tests in project
process.env.NOCK_MODE = process.env.NOCK_MODE || 'lockdown'
