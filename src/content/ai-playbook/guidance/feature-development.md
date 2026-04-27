---
title: Feature development with AI
caption: Working with AI
description: Agent-mode workflow, test-driven development, refactoring and review for AI-assisted feature work.
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
  - text: Feature development with AI
supportBox:
  title: Get help with this
  description: Ask the AI Capability and Enablement team for advice or hands-on support.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Help%20with%20feature%20development" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

This page covers how to develop a feature using an AI coding assistant. It assumes you have set up your project as in [Setting up your project](/ai-playbook/guidance/setting-up-your-project) and have generated requirements as in [Generating requirements](/ai-playbook/guidance/generating-requirements).

## Prerequisites

Before you start a feature:

1. **Clear requirements** with defined scope. See [Generating requirements](/ai-playbook/guidance/generating-requirements).
2. **Rules and instructions for AI** in your repository. See [Rules for AI in your repo](/ai-playbook/guidance/rules-for-ai).
3. **A capable model** for the task. See [Choosing models](/ai-playbook/guidance/choosing-models).

These are the four pillars in practice.

## Standard workflow

### 1. Create a new git branch

Start a branch for the feature. Keep it focused.

### 2. Prompt the coding assistant in agent mode

Reference your requirements files directly so the assistant can read them. Use a reusable prompt where one fits.

Generate the initial code. Review it in the git diff before accepting.

### 3. Test and iterate manually

Run the feature manually to confirm it works. When you find errors, paste them back into the assistant for quick fixes. Once it works, review the code carefully against your expectations.

### 4. Generate automated tests

Start a new agent conversation. Use a testing prompt template to generate tests from the requirements (not from the code). Review the tests in the git diff and refine until they meet your expectations.

### 5. Refactor

Review and refactor while keeping tests green. Small, deliberate refactors are safer than large rewrites.

### 6. Follow up

- create a merge request for peer review
- update documentation using a documentation prompt
- update your AI rules and prompt library based on what you learned

## Test-driven development with AI

For test-first work, run the RED-GREEN-REFACTOR cycle through the assistant:

### 1. RED: write failing tests

Reference your requirements directly. The assistant writes failing tests. Review and refine them before moving on.

### 2. GREEN: minimal code to pass

Ask the assistant for the minimum implementation that makes the tests pass. Review and refine the code generated.

### 3. REFACTOR: improve while keeping tests green

Refactor for clarity, performance or maintainability. Tests must stay green. Review every change.

The [SDLC prompt library](https://defra.github.io/defra-ai-sdlc/) has TDD-specific prompts for each step.

## Guidelines

**Use an appropriate model.** A weaker model will produce weaker code. Match the model to the work. See [Choosing models](/ai-playbook/guidance/choosing-models).

**Get consistent results.** Combine rules and instructions for AI, prompt templates and clear requirements. The four pillars compound.

**Review everything generated.** You are responsible for what you ship. Read every diff.

**Debug with logs.** Generate code that logs detailed information during development. When errors come up, paste them back into the assistant for faster fixes.

**Avoid the "doom loop".** If you need many iterations, your prompt was unclear. Roll back, refine the prompt, and try again. See [Writing good prompts](/ai-playbook/guidance/writing-good-prompts).

**Match scope to complexity.** As the codebase grows, give the AI more specific tasks rather than letting it reason across more and more code.
