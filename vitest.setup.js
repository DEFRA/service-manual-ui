// Default-on for tests: AI content visible. Tests that exercise the gated
// state (e.g. controller-gated.test.js) override this in their own beforeAll.
process.env.ENABLE_AI_CONTENT = 'true'
process.env.AI_TOOLKIT_NOTIFY_KEY =
  process.env.AI_TOOLKIT_NOTIFY_KEY || 'dummy-api-key-for-tests'
process.env.AI_TOOLKIT_TRIAGE_TEMPLATE_ID =
  process.env.AI_TOOLKIT_TRIAGE_TEMPLATE_ID ||
  '494e750c-007a-4982-8465-6cb4447023c1'
process.env.AI_TOOLKIT_CONFIRMATION_TEMPLATE_ID =
  process.env.AI_TOOLKIT_CONFIRMATION_TEMPLATE_ID ||
  'b72e125f-7179-429d-a1bf-76cee401dadd'
process.env.AICE_SHARED_MAILBOX_EMAIL =
  process.env.AICE_SHARED_MAILBOX_EMAIL ||
  'dummy-mailbox-email-for-tests@example.com'
process.env.SESSION_COOKIE_PASSWORD = 'dummy-session-cookie-password-12'

// Default to lockdown mode for all tests in project
process.env.NOCK_MODE = process.env.NOCK_MODE || 'lockdown'
