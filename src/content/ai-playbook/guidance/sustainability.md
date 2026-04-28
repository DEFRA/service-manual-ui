---
title: Sustainability
caption: Responsible AI
description: AI has environmental cost. How to use it in proportion to the task.
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
  - text: Sustainability
supportBox:
  title: Get help with this
  description: Ask the AI Capability and Enablement team for advice or hands-on support.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Help%20with%20AI%20sustainability" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

AI has environmental costs. Every model call uses energy. Balance the benefits of AI with the need to reduce carbon emissions.

## Use the smallest model that meets your needs

Larger models consume significantly more energy per request. If a lightweight model can do the job, use it. See [Choosing models](/ai-playbook/guidance/choosing-models) for guidance on matching tasks to the right tier.

## Deploy AI only when it is genuinely the best option

Not every problem needs an AI solution. If a rule-based approach or simple script works, use that instead. Reserve AI for tasks where it adds clear value over simpler alternatives.

## Write precise prompts

Vague prompts lead to multiple iterations, each consuming tokens and energy. Invest time upfront in crafting clear, specific prompts. Fewer iterations means lower environmental impact.

## Cache results

If you make repeated similar requests, cache the responses. This avoids unnecessary duplicate calls to the model and reduces both cost and energy consumption.

## Schedule intensive work wisely

Where possible, run batch AI processing during periods when the electricity grid has a higher proportion of renewable energy. This reduces the carbon intensity of your workloads.

## Share models across teams

Avoid every team running their own large-model jobs in parallel. Coordinate at the service level so a single model run can serve multiple teams' needs.
