---
title: The AI development workflow
caption: Working with AI
description: From idea to deployed code, with AI in the loop. A structured workflow that keeps quality high.
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
  - text: The AI development workflow
supportBox:
  title: Get help with this
  description: Ask the AI Capability and Enablement team for advice or hands-on support.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Help%20with%20the%20AI%20workflow" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

AI-assisted development follows a structured workflow. Each step builds on the last, keeping quality high and progress visible.

## Start with a product idea

Identify the problem you want to solve and the outcome you need. Write this down clearly before touching any code. See [Generating requirements](/ai-playbook/guidance/generating-requirements) for how to use AI to expand a feature description into a full specification.

## Generate requirements

Use a thinking model to draft detailed functional and technical requirements. These become the foundation for everything that follows.

## Create a branch

Use git branching to isolate your work. This keeps the main codebase stable while you experiment and build.

## Generate code

Write prompts based on your requirements and let the AI produce code. Keep each prompt focused on a single function or component. See [Feature development with AI](/ai-playbook/guidance/feature-development).

## Generate tests

Create tests from the requirements, not from the code. This ensures tests verify intended behaviour rather than just matching what was written. Generate tests independently so they act as a genuine check.

## Refactor

Once tests pass, ask the AI to refactor for clarity. Keep tests green throughout. Small, deliberate refactors are safer than large rewrites.

## Update documentation

Use AI to draft updated documentation as you go. Capture decisions in architecture decision records so the next person on the codebase can follow your reasoning.

## Code review

Use AI as a first reviewer. Ask it to look for bugs, security issues, and clarity problems before you involve a human reviewer. Then ship for human review as you would for any change.

## Merge and deploy

Treat AI-assisted code as you would any other code. The same merge gates, the same deployment process. AI changes how you write code, not how you ship it.
