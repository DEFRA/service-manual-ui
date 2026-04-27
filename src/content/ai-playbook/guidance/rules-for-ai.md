---
title: Rules for AI in your repo
caption: Working with AI
description: How to give your AI assistant the project context it needs. Conventions for Copilot, Cursor, Claude Code and Windsurf.
layout: section
sectionTitle: Guidance
sectionNav:
  - title: Get started
    items:
      - text: Welcome to AI at Defra
        href: /ai-playbook/guidance/welcome
      - text: Choosing models
        href: /ai-playbook/guidance/choosing-models
      - text: Working mindset
        href: /ai-playbook/guidance/working-mindset
      - text: The four pillars
        href: /ai-playbook/guidance/four-pillars
      - text: Setting up your project
        href: /ai-playbook/guidance/setting-up-your-project
      - text: Training and resources
        href: /ai-playbook/guidance/training-and-resources
  - title: Working with AI
    items:
      - text: The AI development workflow
        href: /ai-playbook/guidance/workflow
      - text: Writing good prompts
        href: /ai-playbook/guidance/writing-good-prompts
      - text: Generating requirements
        href: /ai-playbook/guidance/generating-requirements
      - text: Feature development with AI
        href: /ai-playbook/guidance/feature-development
      - text: Rules for AI in your repo
        href: /ai-playbook/guidance/rules-for-ai
      - text: MCP servers and integrations
        href: /ai-playbook/guidance/mcp-servers
  - title: Responsible AI
    items:
      - text: Ethics
        href: /ai-playbook/guidance/ethics
      - text: Security
        href: /ai-playbook/guidance/security
      - text: Sustainability
        href: /ai-playbook/guidance/sustainability
      - text: Information governance
        href: /ai-playbook/guidance/information-governance
      - text: PII and data handling
        href: /ai-playbook/guidance/pii-and-data-handling
  - title: From the field
    items:
      - text: Case studies
        href: /ai-playbook/case-studies
      - text: Lessons learned
        href: /ai-playbook/lessons-learned
      - text: Cost and tokens
        href: /ai-playbook/guidance/cost-and-tokens
customNav:
  - text: Home
    href: /
  - text: Patterns
    href: /ai-playbook/proofs-of-concept/ai-assistant
  - text: Guidance
    href: /ai-playbook/guidance
  - text: Tools
    href: /ai-playbook/tools
headerServiceName: AI playbook
headerServiceUrl: /ai-playbook
breadcrumbItems:
  - text: Digital Defra
    href: /
  - text: AI playbook
    href: /ai-playbook
  - text: Guidance
    href: /ai-playbook/guidance
  - text: Rules for AI in your repo
supportBox:
  title: Get help with this
  description: Ask the AI Capability and Enablement team for advice or hands-on support.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Help%20with%20rules%20for%20AI" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

Most AI coding assistants let you define project-level rules and instructions that shape how the AI generates code. These define consistent and repeatable standards, patterns and conventions across your codebase.

Each tool uses a different name and file format, but the underlying purpose is the same: give the AI context about your project so it follows your standards, architecture and security requirements.

## What different tools call this

| Tool | Name | Configuration location |
|---|---|---|
| GitHub Copilot | Instructions | `.github/copilot-instructions.md` and `.github/instructions/*.instructions.md` |
| Cursor | Rules | `.cursor/rules/*.mdc` |
| Claude Code | Project instructions | `CLAUDE.md` and `.claude/rules/*.md` |
| Windsurf | Rules | `.windsurf/rules/*.md` |

Rules and instructions are committed to version control alongside your codebase. Every team member and every AI interaction then follows the same standards.

## What to include

Good rules and instructions for AI usually cover:

- **Project overview** — service name, tech stack, directory structure
- **Coding standards** — naming conventions, language rules, linting
- **Architecture patterns** — how the code is organised (route handler then service then view, for example)
- **Security rules** — input validation, CSRF, secrets management, PII logging
- **Testing standards** — framework, coverage targets, naming conventions
- **Accessibility** — WCAG 2.2 AA, GOV.UK Design System
- **Branching and commits** — trunk-based development, conventional commits

## GitHub Copilot example

GitHub Copilot reads instructions from your repository's `.github/` directory. The root file `.github/copilot-instructions.md` is always active. Scoped instruction files in `.github/instructions/` activate only for matching files.

A recommended directory structure:

```
your-repo/
└── .github/
    ├── copilot-instructions.md              # Root instructions (always active)
    ├── agents/
    │   ├── defra-app-developer.agent.md     # Defra-compliant development
    │   ├── code-reviewer.agent.md           # Systematic code review
    │   └── tester.agent.md                  # BDD-focused testing
    ├── instructions/
    │   ├── node-backend.instructions.md     # Node.js / Hapi backend rules
    │   ├── csharp-backend.instructions.md   # C# / ASP.NET Core rules
    │   └── frontend.instructions.md         # Accessibility, GDS patterns
    └── prompts/
        ├── write-adr.prompt.md              # Generate architecture decisions
        ├── write-tests.prompt.md            # Generate test suites
        └── security-review.prompt.md        # Review code for vulnerabilities
```

A scoped instruction file activates only when Copilot is working on matching files. For example, this file would only apply to JavaScript:

```markdown
---
applyTo: "**/*.js,**/*.mjs"
---

# Node.js Backend

## Language rules
- Use vanilla JavaScript. Do not use TypeScript without an approved exception.
- Use JSDoc for type annotations
- Use ES modules (import/export) by default
- Use async/await. Do not use callbacks or raw .then() chains.
- Lint with ESLint and format with Prettier

## Framework
- Use Hapi for all HTTP servers. Do not use Express, Fastify, or Koa.
- Use joi (standalone) for request validation. Do not use the deprecated @hapi/joi.
- Use @hapi/crumb for CSRF protection
- Use @hapi/blankie for Content Security Policy headers
```

## Copy-paste ready files

The Defra [AI SDLC tool guidance](https://defra.github.io/ai-sdlc-tool-guidance/) has copy-paste ready rule files for the main tools:

- Node.js backend rules (Hapi, vanilla JS, MongoDB, REST, Jest)
- Node.js frontend rules (GOV.UK Design System, Nunjucks, Playwright, accessibility)
- Python backend rules (FastAPI, pytest, MongoDB mocking)

You can adapt the same rules between tools — the content is largely the same, only the file location and frontmatter format change.

## Cursor rules

Cursor stores rules in `.cursor/rules`, with each file using the `.mdc` extension and frontmatter to control activation. The official documentation is in the [Cursor rules guide](https://docs.cursor.com/context/rules).

## Claude Code rules

Claude Code reads `CLAUDE.md` at the project root and any markdown files in `.claude/rules/`. You can also use scoped agents in `.claude/agents/` for specific tasks like security review or test generation.

## Windsurf rules

Windsurf reads rules from `.windsurf/rules/`. The format is similar to Cursor — markdown with frontmatter to control when each rule applies.
