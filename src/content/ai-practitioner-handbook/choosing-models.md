---
title: Choosing models
caption: Getting started
hideServiceNavigation: true
headerServiceName: AI practitioner handbook
headerServiceUrl: /ai-practitioner-handbook
breadcrumbItems:
  - text: Digital Defra
    href: /
  - text: AI practitioner handbook
    href: /ai-practitioner-handbook
  - text: Choosing models
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

Not every task needs the most powerful model. Picking the right tier saves money, reduces latency, and cuts energy use.

Model recommendations date quickly. Check with the AI Capabilities and Enablement team for the latest approved options.

## Lightweight models

Best for autocomplete, boilerplate generation, and simple formatting tasks. Examples include Claude Haiku and GPT-4o mini. These are fast and cheap, making them ideal for high-volume, low-complexity work.

## Mid-range models

Suitable for writing functions, generating tests, creating documentation, and standard refactoring. Examples include Claude Sonnet and GPT-4o. These balance capability with cost for most everyday development tasks.

## Advanced models

Use for architectural design, complex debugging, multi-step reasoning, and generating detailed requirements. Examples include Claude Opus and OpenAI Codex. Reserve these for work that genuinely needs deep reasoning.

## Matching tasks to tiers

| Task                          | Recommended tier |
| ----------------------------- | ---------------- |
| Code autocomplete             | Lightweight      |
| Boilerplate scaffolding       | Lightweight      |
| Writing unit tests            | Mid-range        |
| Generating documentation      | Mid-range        |
| Building functions from specs | Mid-range        |
| Architectural planning        | Advanced         |
| Complex debugging             | Advanced         |
| Requirements generation       | Advanced         |

## Be aware of costs

Every token costs money and energy. Monitor your usage. Use lighter models where they meet the need. Avoid sending unnecessary context in prompts. See [token optimisation](/ai-practitioner-handbook/token-optimisation) for techniques to reduce prompt sizes.
