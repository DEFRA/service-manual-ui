// Default-on for tests: AI content visible. Tests that exercise the gated
// state (e.g. controller-gated.test.js) override this in their own beforeAll.
process.env.ENABLE_AI_CONTENT = 'true'
process.env.SESSION_COOKIE_PASSWORD = 'dummy-session-cookie-password-12'
