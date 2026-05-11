// Default-on for tests: AI content visible. Tests that exercise the gated
// state (e.g. controller-gated.test.js) override this in their own beforeAll.
process.env.ENABLE_AI_CONTENT = 'true'
process.env.AI_TOOLKIT_NOTIFY_KEY = process.env.AI_TOOLKIT_NOTIFY_KEY || 'dummy-api-key-for-tests'
process.env.AI_TOOLKIT_TRIAGE_TEMPLATE_ID = process.env.AI_TOOLKIT_TRIAGE_TEMPLATE_ID || 'dummy-template-id-for-tests'
process.env.AICE_SHARED_MAILBOX_EMAIL = process.env.AICE_SHARED_MAILBOX_EMAIL || "dummy-mailbox-email-for-tests@example.com"
process.env.SESSION_COOKIE_PASSWORD = 'dummy-session-cookie-password-12'

// Default to lockdown mode for all tests in project
process.env.NOCK_MODE = process.env.NOCK_MODE || 'lockdown'
