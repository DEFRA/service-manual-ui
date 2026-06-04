---
title: Rules for AI in your repo
caption: Working with AI
description: How to give your AI assistant the project context it needs. Conventions for Copilot, Cursor, Claude Code and Windsurf.
layout: section
sectionTitle: Deliver with AI
sectionNav:
  - title: In this section
    items:
      - text: Deliver with AI
        href: /ai-toolkit/deliver-with-ai
  - title: Common questions
    items:
      - text: Using AI tools
        href: /ai-toolkit/guidance/using-ai-tools
      - text: Putting data into AI tools
        href: /ai-toolkit/guidance/data-in-ai-tools
      - text: Shared team knowledge bases
        href: /ai-toolkit/guidance/team-knowledge-bases
      - text: AI in your CI/CD pipeline
        href: /ai-toolkit/guidance/ai-in-pipelines
  - title: Set yourself up
    items:
      - text: Setting up your project
        href: /ai-toolkit/guidance/setting-up-your-project
      - text: Rules for AI in your repo
        href: /ai-toolkit/guidance/rules-for-ai
customNav:
  - text: Home
    href: /
  - text: Deliver with AI
    href: /ai-toolkit/deliver-with-ai
  - text: Find a tool
    href: /ai-toolkit/tools
  - text: Use AI responsibly
    href: /ai-toolkit/build-responsibly
  - text: Learn from others
    href: /ai-toolkit/projects
headerServiceName: AI digital toolkit
headerServiceUrl: /ai-toolkit
breadcrumbItems:
  - text: Digital Defra
    href: /
  - text: AI digital toolkit
    href: /ai-toolkit
  - text: Deliver with AI
    href: /ai-toolkit/deliver-with-ai
  - text: Rules for AI in your repo
supportBox:
  title: Get help with this
  description: Ask the AI Capability and Enablement team for advice or hands-on support.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Help%20with%20rules%20for%20AI" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

<p class="govuk-body-l">Most AI coding assistants let you define rules and instructions that shape how they generate code in your project. These give the assistant your standards, patterns and architecture so it produces code that fits your codebase.</p>

Commit your rules to version control alongside the code itself. Every developer and every AI session then follows the same standards.

## What each tool calls them

<table class="govuk-table">
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Tool</th>
      <th scope="col" class="govuk-table__header">Name</th>
      <th scope="col" class="govuk-table__header">Where they live</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header"><a href="/ai-toolkit/tools/github-copilot" class="govuk-link">GitHub Copilot</a></th>
      <td class="govuk-table__cell">Instructions</td>
      <td class="govuk-table__cell"><code>.github/copilot-instructions.md</code> and <code>.github/instructions/*.instructions.md</code></td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">Cursor</th>
      <td class="govuk-table__cell">Rules</td>
      <td class="govuk-table__cell"><code>.cursor/rules/*.mdc</code></td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">Claude Code</th>
      <td class="govuk-table__cell">Project instructions</td>
      <td class="govuk-table__cell"><code>CLAUDE.md</code> and <code>.claude/rules/*.md</code></td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">Windsurf</th>
      <td class="govuk-table__cell">Rules</td>
      <td class="govuk-table__cell"><code>.windsurf/rules/*.md</code></td>
    </tr>
  </tbody>
</table>

## What to put in them

Good rules cover seven things:

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li><strong>Project overview.</strong> Service name, tech stack, top-level directory structure</li>
<li><strong>Coding standards.</strong> Naming conventions, language rules, linting</li>
<li><strong>Architecture patterns.</strong> How the code is organised, for example route handler then service then view</li>
<li><strong>Security rules.</strong> Input validation, CSRF, secret management, PII logging</li>
<li><strong>Testing standards.</strong> Framework, coverage targets, naming conventions</li>
<li><strong>Accessibility.</strong> WCAG 2.2 AA, GOV.UK Design System</li>
<li><strong>Branching and commits.</strong> Trunk-based development, conventional commits</li>
</ul>

## GitHub Copilot setup

[GitHub Copilot](/ai-toolkit/tools/github-copilot) reads everything in your repository's `.github/` directory. The file `.github/copilot-instructions.md` is always active. Files in `.github/instructions/` activate only for matching paths.

The recommended layout splits rules by audience:

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li><code>.github/copilot-instructions.md</code>. Root instructions, always active</li>
<li><code>.github/agents/</code>. Agent definitions for specific tasks
<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li><code>defra-app-developer.agent.md</code> for Defra-compliant development</li>
<li><code>code-reviewer.agent.md</code> for systematic code review</li>
<li><code>tester.agent.md</code> for BDD-focused testing</li>
</ul>
</li>
<li><code>.github/instructions/</code>. Scoped rules that activate based on file paths
<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li><code>node-backend.instructions.md</code> for Node.js and Hapi backend code</li>
<li><code>csharp-backend.instructions.md</code> for C# and ASP.NET Core code</li>
<li><code>frontend.instructions.md</code> for accessibility and GDS patterns</li>
</ul>
</li>
<li><code>.github/prompts/</code>. Reusable prompts your team runs often
<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li><code>write-adr.prompt.md</code> to generate architecture decision records</li>
<li><code>write-tests.prompt.md</code> to generate test suites</li>
<li><code>security-review.prompt.md</code> to review code for vulnerabilities</li>
</ul>
</li>
</ul>

A scoped instruction file activates only when Copilot is working on matching files. For example, this file would only apply to JavaScript files:

```markdown
---
applyTo: '**/*.js,**/*.mjs'
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
