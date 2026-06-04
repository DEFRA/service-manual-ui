---
title: The four pillars
caption: Get started
description: Four elements you need in place to get consistent AI-generated results. Miss one and quality drops.
layout: section
sectionTitle: Deliver with AI
sectionNav:
  - title: In this section
    items:
      - text: Deliver with AI
        href: /ai-toolkit/deliver-with-ai
  - title: Get started
    items:
      - text: Welcome to AI at Defra
        href: /ai-toolkit/guidance/welcome
      - text: Choosing models
        href: /ai-toolkit/guidance/choosing-models
      - text: Working mindset
        href: /ai-toolkit/guidance/working-mindset
      - text: The four pillars
        href: /ai-toolkit/guidance/four-pillars
      - text: Setting up your project
        href: /ai-toolkit/guidance/setting-up-your-project
      - text: Training and resources
        href: /ai-toolkit/guidance/training-and-resources
  - title: Delivery guidance
    items:
      - text: The AI development workflow
        href: /ai-toolkit/guidance/workflow
      - text: Writing good prompts
        href: /ai-toolkit/guidance/writing-good-prompts
      - text: Generating requirements
        href: /ai-toolkit/guidance/generating-requirements
      - text: Feature development with AI
        href: /ai-toolkit/guidance/feature-development
      - text: Rules for AI in your repo
        href: /ai-toolkit/guidance/rules-for-ai
      - text: Cost and tokens
        href: /ai-toolkit/guidance/cost-and-tokens
  - title: Patterns
    items:
      - text: All patterns
        href: /ai-toolkit/patterns
  - title: Agentic
    items:
      - text: MCP servers and integrations
        href: /ai-toolkit/guidance/mcp-servers
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
  - text: The four pillars
supportBox:
  title: Get help with this
  description: Ask the AI Capability and Enablement team for advice or hands-on support.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Help%20with%20the%20four%20pillars" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

Consistent AI-generated code depends on four elements working together. If any one is weak, the output quality drops.

## Clear requirements

Write detailed functional and technical specifications before prompting any model. The AI needs to know exactly what to build, including inputs, outputs, edge cases, and constraints. Vague requirements produce vague code. See [Generating requirements](/ai-toolkit/guidance/generating-requirements).

## Good prompts

Each prompt should make a clear, scoped request. Tell the model what you need, what format to use, and what constraints apply. Smaller, focused prompts consistently outperform large, ambiguous ones. See [Writing good prompts](/ai-toolkit/guidance/writing-good-prompts).

## Rules and instructions

Define consistent standards and patterns for your codebase. This includes coding conventions, file structures, naming rules, and architectural patterns. Feed these to the model so its output fits your project without heavy rework. See [Rules for AI in your repo](/ai-toolkit/guidance/rules-for-ai).

## Capable model

Choose the right model for the task. Not every job needs the most powerful option. Match the model's strengths to the complexity of the work. See [Choosing models](/ai-toolkit/guidance/choosing-models).

## Why all four matter

Skip one and the others lose value:

- Without **clear requirements**, even the best model with the best rules will guess at the wrong thing
- Without **good prompts**, the model cannot focus on the part of the work that matters
- Without **rules and instructions**, output drifts from your codebase conventions and needs heavy rework
- Without a **capable model**, the work might not be possible at all

The four pillars compound. Get them all in place and you get consistent, useful results. Miss one and you spend more time fixing AI output than writing it yourself.
