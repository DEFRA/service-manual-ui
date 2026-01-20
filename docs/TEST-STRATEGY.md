# Test Strategy for Defra Service Manual UI

## Executive Summary

This is a **read-only content site** - not a complex transactional service. Testing should reflect this simplicity: no user authentication, no database, no form submissions, no complex business logic.

---

## Application Risk Profile

| Risk Area                | Level      | Rationale                            |
| ------------------------ | ---------- | ------------------------------------ |
| Content not rendering    | **High**   | Primary purpose of the site          |
| Routes returning 404/500 | **High**   | Broken navigation = unusable service |
| Markdown parsing errors  | **Medium** | Could display malformed content      |
| Accessibility failures   | **Medium** | Legal requirement (WCAG 2.2 AA)      |
| Security vulnerabilities | **Low**    | No user data, no forms, no auth      |
| Performance issues       | **Low**    | Static content, simple reads         |

---

## Current Test Coverage Analysis

### Existing Test Files (22 files, ~140 tests)

| File                                  | Purpose               | Coverage                          |
| ------------------------------------- | --------------------- | --------------------------------- |
| `markdown.test.js`                    | Markdown filter tests | Good - covers govspeak extensions |
| `controller.test.js` (markdown-pages) | Route tests           | **Partial - only 6 of 32 routes** |
| `serve-static-files.test.js`          | Static file serving   | **Flaky - EADDRINUSE issue**      |
| `content-loader.test.js`              | Frontmatter parsing   | Good                              |
| `build-navigation.test.js`            | Navigation building   | Good                              |
| `heading/template.test.js`            | Component rendering   | Good                              |
| Other utility tests                   | Various helpers       | Good                              |

### Current Coverage: ~97%

---

## Immediate Actions Required

### 1. Fix Flaky Test: `serve-static-files.test.js`

**Problem:** Uses `startServer()` which calls `server.start()` and binds to a port, causing EADDRINUSE errors when tests run in parallel.

**File:** `src/server/common/helpers/serve-static-files.test.js`

**Current Code (lines 1-17):**

```javascript
import { startServer } from './start-server.js'
import { statusCodes } from '../constants/status-codes.js'

describe('#serveStaticFiles', () => {
  let server

  describe('When secure context is disabled', () => {
    beforeEach(async () => {
      server = await startServer()
    })

    afterEach(async () => {
      if (server) {
        await server.stop({ timeout: 0 })
      }
    })
```

**Fixed Code:**

```javascript
import { createServer } from '../../server.js'
import { statusCodes } from '../constants/status-codes.js'

describe('#serveStaticFiles', () => {
  let server

  describe('When secure context is disabled', () => {
    beforeEach(async () => {
      server = await createServer()
      await server.initialize()
    })

    afterEach(async () => {
      if (server) {
        await server.stop({ timeout: 0 })
      }
    })
```

**Why:** Using `server.initialize()` instead of `server.start()` doesn't bind to a port - it sets up the server for testing via `server.inject()`. This is the pattern used by all other test files.

---

### 2. Add Coverage Thresholds to `vitest.config.js`

**File:** `vitest.config.js`

**Current Code:**

```javascript
import { defineConfig, configDefaults } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    clearMocks: true,
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      reporter: ['text', 'lcov'],
      include: ['src/**'],
      exclude: [
        ...configDefaults.exclude,
        '.public',
        'coverage',
        'postcss.config.js',
        'stylelint.config.js'
      ]
    }
  }
})
```

**Updated Code:**

```javascript
import { defineConfig, configDefaults } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    clearMocks: true,
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      reporter: ['text', 'lcov'],
      include: ['src/**'],
      exclude: [
        ...configDefaults.exclude,
        '.public',
        'coverage',
        'postcss.config.js',
        'stylelint.config.js'
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  }
})
```

**Why:** Prevents coverage regression by failing the build if coverage drops below 80%.

---

### 3. Add Route Tests for All Markdown Routes

**File:** `src/server/markdown-pages/controller.test.js`

**Current State:** Only tests 6 routes:

- `/architecture-and-software-development`
- `/accessibility`
- `/service-standard`
- `/components`
- `/patterns`
- `/working-with-defra`

**Missing Routes (26 routes not tested):**

```javascript
const untestedRoutes = [
  '/service-assessments',
  '/service-assessments/book-an-assessment',
  '/service-assessments/become-an-assessor',
  '/service-assessments/gov-uk-exemptions',
  '/architecture-and-software-development/core-delivery-platform',
  '/architecture-and-software-development/defra-customer-identity',
  '/architecture-and-software-development/defra-accessible-maps',
  '/architecture-and-software-development/defra-forms',
  '/architecture-and-software-development/defra-integration',
  '/accessibility/manage-accessibility',
  '/accessibility/test-for-accessibility',
  '/design-and-content',
  '/design-and-content/branding',
  '/design-and-content/cookies',
  '/design-and-content/data-visualisation',
  '/sustainability',
  '/sustainability/objectives',
  '/sustainability/process',
  '/sustainability/metrics',
  '/suggest-content',
  '/take-part-in-research',
  '/business-analysis',
  '/business-analysis/ways-of-working',
  '/product-and-delivery',
  '/product-and-delivery/governance',
  '/product-and-delivery/tools-and-access'
]
```

**Recommended Approach - Dynamic Route Testing:**

Add to `controller.test.js`:

```javascript
import { createServer } from '../server.js'
import { statusCodes } from '../common/constants/status-codes.js'

// All markdown routes from src/server/markdown-pages/index.js
const allMarkdownRoutes = [
  '/service-standard',
  '/service-assessments',
  '/service-assessments/book-an-assessment',
  '/service-assessments/become-an-assessor',
  '/service-assessments/gov-uk-exemptions',
  '/architecture-and-software-development',
  '/architecture-and-software-development/core-delivery-platform',
  '/architecture-and-software-development/defra-customer-identity',
  '/architecture-and-software-development/defra-accessible-maps',
  '/architecture-and-software-development/defra-forms',
  '/architecture-and-software-development/defra-integration',
  '/accessibility',
  '/accessibility/manage-accessibility',
  '/accessibility/test-for-accessibility',
  '/components',
  '/design-and-content',
  '/design-and-content/branding',
  '/design-and-content/cookies',
  '/design-and-content/data-visualisation',
  '/patterns',
  '/working-with-defra',
  '/sustainability',
  '/sustainability/objectives',
  '/sustainability/process',
  '/sustainability/metrics',
  '/suggest-content',
  '/take-part-in-research',
  '/business-analysis',
  '/business-analysis/ways-of-working',
  '/product-and-delivery',
  '/product-and-delivery/governance',
  '/product-and-delivery/tools-and-access'
]

describe('#markdownPagesController', () => {
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  describe('All markdown routes return 200', () => {
    test.each(allMarkdownRoutes)('GET %s returns 200', async (route) => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: route
      })

      expect(statusCode).toBe(statusCodes.ok)
    })
  })

  // Keep existing detailed tests for specific routes...
})
```

**Why:** Ensures every route in `markdownRoutes` is tested. If a new route is added without a corresponding markdown file, the test will catch it.

---

### 4. Add Markdown-to-GOV.UK Rendering Tests

**File:** `src/config/nunjucks/filters/markdown.test.js`

**Current Coverage:** Good for govspeak extensions, but missing:

- GOV.UK heading class verification
- GOV.UK link class verification
- GOV.UK body class verification

**Additional Tests to Add:**

```javascript
describe('GOV.UK typography classes', () => {
  test('should render headings with govuk-heading class', () => {
    const result = markdown('## Heading Level 2')
    expect(result).toContain('govuk-heading')
  })

  test('should render paragraphs with govuk-body class', () => {
    const result = markdown('This is a paragraph.')
    expect(result).toContain('govuk-body')
  })

  test('should render links with govuk-link class', () => {
    const result = markdown('[A link](/page)')
    expect(result).toContain('govuk-link')
  })

  test('should render lists with govuk-list class', () => {
    const result = markdown('- Item 1\n- Item 2')
    expect(result).toContain('govuk-list')
  })
})

describe('content rendering smoke tests', () => {
  // These ensure all markdown files render without error
  const contentFiles = [
    'accessibility.md',
    'architecture-and-software-development.md',
    'service-standard.md'
    // Add more as needed
  ]

  test.each(contentFiles)('%s renders without error', async (filename) => {
    const { loadMarkdown } = await import(
      '../../../server/common/helpers/content-loader.js'
    )
    const content = loadMarkdown(filename)
    expect(() => markdown(content.body)).not.toThrow()
  })
})
```

---

## Test Types and Justification

### 1. Route/Integration Tests (MOST IMPORTANT)

**Why for this application:** If routes work and return the right content, the site works.

**What to test:**

- Every markdown route returns 200 status
- Error pages render for invalid routes (404)
- Health check endpoint works

**Coverage target:** Every route in `markdownRoutes` array

### 2. Unit Tests

**Why for this application:** Pure functions that transform data.

**What to test:**

- Nunjucks filters (markdown, date, currency)
- Content loader (frontmatter parsing)
- Navigation building logic
- Search index generation

**Coverage target:** 100% for utility functions

### 3. Component Tests

**Why for this application:** Ensures Defra-branded components output valid HTML.

**What to test:**

- Custom Nunjucks components render correct HTML
- Heading component generates accessible markup

### 4. What NOT to Test

| Test Type              | Why Not Needed                                          |
| ---------------------- | ------------------------------------------------------- |
| **E2E browser tests**  | No complex user journeys, no forms, no multi-step flows |
| **Visual regression**  | GOV.UK Frontend is well-tested, low value for content   |
| **Load testing in CI** | Simple server-rendered pages, static content            |
| **Contract testing**   | No APIs to test                                         |

---

## Test Execution by Stage

### Local Development (Developer Machine)

| Check     | Command                | Time     |
| --------- | ---------------------- | -------- |
| Format    | `npm run format:check` | ~2s      |
| Lint      | `npm run lint`         | ~3s      |
| Tests     | `npm test`             | ~8s      |
| **Total** | Pre-commit hook        | **~15s** |

### Pull Request (CI Pipeline)

| Step             | Purpose                | Time       |
| ---------------- | ---------------------- | ---------- |
| Install + build  | Dependencies + webpack | ~35s       |
| Format + lint    | Code quality           | ~7s        |
| Tests + coverage | Verify functionality   | ~8s        |
| Docker build     | Verify deployable      | ~60s       |
| SonarQube scan   | Quality gates          | ~90s       |
| **Total**        |                        | **~3 min** |

---

## Recommended Environments

**Two environments are sufficient:**

### 1. Staging

**Purpose:**

- Preview content changes before production
- Test new markdown pages render correctly
- Manual accessibility spot-checks

**Deployment:** Automatic on merge to `main`

### 2. Production

**Purpose:**

- Serve live content to users
- Monitor health endpoint

**Deployment:** Manual promotion from staging

### Why NOT More Environments

| Environment | Why Not Needed                             |
| ----------- | ------------------------------------------ |
| QA          | Content can be previewed in staging        |
| UAT         | Internal documentation - no external users |
| Pre-prod    | No database or external services to mirror |

---

## Current Tooling (Keep Using)

| Tool                 | Purpose          | Status    |
| -------------------- | ---------------- | --------- |
| Vitest               | Test runner      | Excellent |
| V8 Coverage          | Code coverage    | Excellent |
| ESLint (neostandard) | Linting          | Good      |
| Prettier             | Formatting       | Good      |
| Husky                | Pre-commit hooks | Essential |
| SonarQube Cloud      | Quality gates    | Good      |

**Not needed:** Playwright, Cypress, Storybook, visual regression tools

---

## Quality Gates

### Pre-Commit

- Format check passes
- Lint passes (0 errors)
- All tests pass

### Pull Request

- All pre-commit checks pass
- Docker image builds
- SonarQube quality gate passes:
  - No new bugs or vulnerabilities
  - Coverage on new code >= 80%

---

## Implementation Checklist

- [ ] Fix `serve-static-files.test.js` - change `startServer()` to `createServer() + initialize()`
- [ ] Add coverage thresholds to `vitest.config.js`
- [ ] Add dynamic route tests for all 32 markdown routes
- [ ] Add GOV.UK typography class tests to `markdown.test.js`
- [ ] Run `npm test` to verify all tests pass
- [ ] Verify coverage still meets thresholds

---

## Summary

| Metric       | Current | Target                     |
| ------------ | ------- | -------------------------- |
| Test files   | 22      | 22                         |
| Tests        | ~140    | ~175 (after route tests)   |
| Coverage     | ~97%    | >=80% (threshold enforced) |
| Test runtime | <10s    | <15s                       |
| Environments | TBD     | 2 (staging + production)   |

**Key principles:**

- Route tests are most valuable
- Unit tests for transformation logic
- Skip browser-based E2E tests
- Two environments sufficient
- Pre-commit hooks catch issues early
- Test suite runs in under 15 seconds

This is a well-tested content site. The existing test strategy is **appropriate and proportionate** to the application's complexity.
