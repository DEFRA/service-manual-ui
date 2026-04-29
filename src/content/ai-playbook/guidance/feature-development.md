---
title: Feature development with AI
caption: Working with AI
description: Agent-mode workflow, test-driven development, refactoring and review for AI-assisted feature work.
layout: section
sectionTitle: Guidance
sectionNav:
  - title: In this section
    items:
      - text: Guidance
        href: /ai-playbook/guidance
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
      - text: Cost and tokens
        href: /ai-playbook/guidance/cost-and-tokens
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
customNav:
  - text: Home
    href: /
  - text: Guidance
    href: /ai-playbook/guidance
  - text: Tools
    href: /ai-playbook/tools
  - text: Patterns
    href: /ai-playbook/patterns
  - text: From the field
    href: /ai-playbook/from-the-field
headerServiceName: AI digital toolkit
headerServiceUrl: /ai-playbook
breadcrumbItems:
  - text: Digital Defra
    href: /
  - text: AI digital toolkit
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

A good default for most feature work. Use this unless you have a specific reason to follow the test-driven approach below.

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

## More approaches

<div class="govuk-accordion" data-module="govuk-accordion" id="feature-accordion">

<div class="govuk-accordion__section">
<div class="govuk-accordion__section-header">
<h3 class="govuk-accordion__section-heading">
<span class="govuk-accordion__section-button" id="feature-accordion-heading-1">Test-driven development</span>
</h3>
</div>
<div id="feature-accordion-content-1" class="govuk-accordion__section-content">

<p class="govuk-body">For test-first work, run the RED-GREEN-REFACTOR cycle through the assistant.</p>

<h4 class="govuk-heading-s">1. RED: write failing tests</h4>
<p class="govuk-body">Reference your requirements directly. The assistant writes failing tests. Review and refine them before moving on.</p>

<h4 class="govuk-heading-s">2. GREEN: minimal code to pass</h4>
<p class="govuk-body">Ask the assistant for the minimum implementation that makes the tests pass. Review and refine the code generated.</p>

<h4 class="govuk-heading-s">3. REFACTOR: improve while keeping tests green</h4>
<p class="govuk-body">Refactor for clarity, performance or maintainability. Tests must stay green. Review every change.</p>

<p class="govuk-body">The <a href="/ai-playbook/prompt-library" class="govuk-link">prompt library</a> has TDD-specific prompts for each step.</p>

</div>
</div>

<div class="govuk-accordion__section">
<div class="govuk-accordion__section-header">
<h3 class="govuk-accordion__section-heading">
<span class="govuk-accordion__section-button" id="feature-accordion-heading-2">Guidelines for any AI-assisted work</span>
</h3>
</div>
<div id="feature-accordion-content-2" class="govuk-accordion__section-content">

<p class="govuk-body"><strong>Use an appropriate model.</strong> A weaker model will produce weaker code. Match the model to the work. See <a href="/ai-playbook/guidance/choosing-models" class="govuk-link">Choosing models</a>.</p>

<p class="govuk-body"><strong>Get consistent results.</strong> Combine rules and instructions for AI, prompt templates and clear requirements. The four pillars compound.</p>

<p class="govuk-body"><strong>Review everything generated.</strong> You are responsible for what you ship. Read every diff.</p>

<p class="govuk-body"><strong>Debug with logs.</strong> Generate code that logs detailed information during development. When errors come up, paste them back into the assistant for faster fixes.</p>

<p class="govuk-body"><strong>Avoid the "doom loop".</strong> If you need many iterations, your prompt was unclear. Roll back, refine the prompt, and try again. See <a href="/ai-playbook/guidance/writing-good-prompts" class="govuk-link">Writing good prompts</a>.</p>

<p class="govuk-body"><strong>Match scope to complexity.</strong> As the codebase grows, give the AI more specific tasks rather than letting it reason across more and more code.</p>

</div>
</div>

</div>
