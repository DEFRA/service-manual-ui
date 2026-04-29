---
title: The four pillars
caption: Getting started
hideServiceNavigation: true
headerServiceName: AI practitioner handbook
headerServiceUrl: /ai-practitioner-handbook
breadcrumbItems:
  - text: Digital Defra
    href: /
  - text: AI practitioner handbook
    href: /ai-practitioner-handbook
  - text: The four pillars
sectionTitle: AI practitioner handbook
layout: section
sectionNav:
  - title: Getting started
    items:
      - text: AI practitioner handbook
        href: /ai-practitioner-handbook
      - text: Workflow
        href: /ai-practitioner-handbook/workflow
      - text: The four pillars
        href: /ai-practitioner-handbook/the-four-pillars
      - text: Choosing models
        href: /ai-practitioner-handbook/choosing-models
      - text: Working mindset
        href: /ai-practitioner-handbook/working-mindset
  - title: Responsible practices
    items:
      - text: Ethics
        href: /ai-practitioner-handbook/ethics
      - text: Security
        href: /ai-practitioner-handbook/security
      - text: Sustainability
        href: /ai-practitioner-handbook/sustainability
  - title: Case studies
    items:
      - text: AI in practice
        href: /ai-practitioner-handbook/case-studies
      - text: NRF Discovery
        href: /ai-practitioner-handbook/nrf-discovery
      - text: IPAFFS replatforming
        href: /ai-practitioner-handbook/ipaffs-replatforming
      - text: PLP cycle time
        href: /ai-practitioner-handbook/plp-cycle-time
      - text: NRF Alpha
        href: /ai-practitioner-handbook/nrf-alpha
  - title: Patterns
    items:
      - text: AI assistant
        href: /ai-practitioner-handbook/ai-assistant
      - text: Green summarisation
        href: /ai-practitioner-handbook/green-summarisation
      - text: Agent swarms
        href: /ai-practitioner-handbook/agent-swarms
      - text: Token optimisation
        href: /ai-practitioner-handbook/token-optimisation
  - title: Lessons learned
    items:
      - text: AI-generated code quality
        href: /ai-practitioner-handbook/ai-code-quality
      - text: Clear governance is essential
        href: /ai-practitioner-handbook/ai-governance
      - text: Always validate AI outputs
        href: /ai-practitioner-handbook/ai-output-validation
  - title: Tools and resources
    items:
      - text: Approved tools
        href: /ai-practitioner-handbook/approved-tools
      - text: Prompt library
        href: /ai-practitioner-handbook/prompt-library
      - text: Tech radar
        href: /ai-practitioner-handbook/tech-radar
supportBox:
  title: Get support
  description: The <strong>AI Capabilities and Enablement team</strong> can help you get started with AI at Defra.
  items:
    - 'Email: <a href="mailto:cctsassurance@defra.gov.uk" class="govuk-link">cctsassurance@defra.gov.uk</a>'
    - '<a href="https://github.com/DEFRA/defra-ai-sdlc" class="govuk-link">AI SDLC Playbook on GitHub</a>'
---

Consistent AI-generated code depends on four elements working together. If any one is weak, the output quality drops.

## Clear requirements

Write detailed functional and technical specifications before prompting any model. The AI needs to know exactly what to build, including inputs, outputs, edge cases, and constraints. Vague requirements produce vague code.

## Good prompts

Each prompt should make a clear, scoped request. Tell the model what you need, what format to use, and what constraints apply. Smaller, focused prompts consistently outperform large, ambiguous ones.

## Rules and instructions

Define consistent standards and patterns for your codebase. This includes coding conventions, file structures, naming rules, and architectural patterns. Feed these to the model so its output fits your project without heavy rework.

## Capable model

Choose the right model for the task at hand. Not every job needs the most powerful option. Match the model's strengths to the complexity of the work. See [choosing models](/ai-practitioner-handbook/choosing-models) for guidance on selecting the right tier.
