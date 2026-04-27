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
    href: /ai-playbook/patterns
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

Most AI coding assistants let you define rules and instructions that shape how they generate code in your project. These give the assistant your standards, patterns and architecture so it produces code that fits your codebase.

Commit your rules to version control alongside the code itself. Every developer and every AI session then follows the same standards.

## What each tool calls them

| Tool | Name | Where they live |
|---|---|---|
| [GitHub Copilot](/ai-playbook/tools/github-copilot) | Instructions | `.github/copilot-instructions.md` and `.github/instructions/*.instructions.md` |
| Cursor | Rules | `.cursor/rules/*.mdc` |
| Claude Code | Project instructions | `CLAUDE.md` and `.claude/rules/*.md` |
| Windsurf | Rules | `.windsurf/rules/*.md` |

## What to put in them

Good rules cover seven things:

- **Project overview.** Service name, tech stack, top-level directory structure
- **Coding standards.** Naming conventions, language rules, linting
- **Architecture patterns.** How the code is organised, for example route handler then service then view
- **Security rules.** Input validation, CSRF, secret management, PII logging
- **Testing standards.** Framework, coverage targets, naming conventions
- **Accessibility.** WCAG 2.2 AA, GOV.UK Design System
- **Branching and commits.** Trunk-based development, conventional commits

## GitHub Copilot setup

[GitHub Copilot](/ai-playbook/tools/github-copilot) reads everything in your repository's `.github/` directory. The file `.github/copilot-instructions.md` is always active. Files in `.github/instructions/` activate only for matching paths.

The recommended layout splits rules by audience:

- `.github/copilot-instructions.md`. Root instructions, always active
- `.github/agents/`. Agent definitions for specific tasks
  - `defra-app-developer.agent.md` for Defra-compliant development
  - `code-reviewer.agent.md` for systematic code review
  - `tester.agent.md` for BDD-focused testing
- `.github/instructions/`. Scoped rules that activate based on file paths
  - `node-backend.instructions.md` for Node.js and Hapi backend code
  - `csharp-backend.instructions.md` for C# and ASP.NET Core code
  - `frontend.instructions.md` for accessibility and GDS patterns
- `.github/prompts/`. Reusable prompts your team runs often
  - `write-adr.prompt.md` to generate architecture decision records
  - `write-tests.prompt.md` to generate test suites
  - `security-review.prompt.md` to review code for vulnerabilities

A scoped instruction file activates only when Copilot is working on matching files. For example, this file would only apply to JavaScript files:

```markdown
---
applyTo: "**/*.js,**/*.mjs"
---

# Node.js backend

## Language rules
- Use vanilla JavaScript. Do not use TypeScript without an approved exception.
- Use JSDoc for type annotations.
- Use ES modules (import/export) by default.
- Use async/await. Do not use callbacks or raw .then() chains.
- Lint with ESLint and format with Prettier.

## Framework
- Use Hapi for all HTTP servers. Do not use Express, Fastify, or Koa.
- Use joi (standalone) for request validation. Do not use the deprecated @hapi/joi.
- Use @hapi/crumb for CSRF protection.
- Use @hapi/blankie for Content Security Policy headers.
```

## Other tools

**Cursor** stores rules in `.cursor/rules` as `.mdc` files with frontmatter that controls when each rule activates. See the [Cursor rules guide](https://docs.cursor.com/context/rules).

**Claude Code** reads `CLAUDE.md` at the project root and any markdown files in `.claude/rules/`. Use `.claude/agents/` for scoped agents handling specific tasks like security review or test generation.

**Windsurf** reads rules from `.windsurf/rules/`. The format is similar to Cursor: markdown with frontmatter to control when each rule applies.

## Adapting rules between tools

Once you have a rule for one tool, the content adapts easily to others. The actual rules (use Hapi, lint with ESLint, follow GOV.UK Design System) are the same. Only the file location and the frontmatter format change.

If your team has good rules for one tool and someone joins using a different one, port the content rather than rewriting from scratch.

## Get hands-on help

If you want a starting set of rules for your stack, ask the AI Capability and Enablement team. They have copy-paste-ready files for Node.js backend (Hapi), Node.js frontend (GOV.UK Design System) and Python (FastAPI).
