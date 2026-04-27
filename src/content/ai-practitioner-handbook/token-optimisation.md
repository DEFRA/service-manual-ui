---
title: Token optimisation
caption: Patterns and case studies
hideServiceNavigation: true
headerServiceName: AI practitioner handbook
headerServiceUrl: /ai-practitioner-handbook
breadcrumbItems:
  - text: Digital Defra
    href: /
  - text: AI practitioner handbook
    href: /ai-practitioner-handbook
  - text: Token optimisation
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

Token optimisation reduces prompt sizes to cut costs and latency while keeping output quality high. Every unnecessary token costs money and slows down responses.

## Compress your prompts

Remove redundant words, examples, and context that the model does not need for the specific task. Be direct. Use concise instructions rather than lengthy explanations. A shorter prompt often produces better results because the model focuses on what matters.

## Cache context

If you make repeated calls with similar context, cache the shared parts. Many APIs support system message caching or conversation history management. This avoids resending the same background information with every request.

## Structure requests efficiently

Break large requests into focused steps rather than sending everything at once. Each step should include only the context needed for that specific task. This reduces per-call token counts and makes outputs easier to validate.

## Strip unnecessary formatting

Remove HTML, markdown formatting, and whitespace from input documents before sending them to the model. The model processes every character as tokens, including formatting that adds no value to the task.

## Use output constraints

Tell the model exactly how long and in what format you want the response. Setting explicit length limits and output structures prevents the model from generating more tokens than needed.

## Monitor and measure

Track token usage across your team and projects. Identify which calls consume the most tokens and target those for optimisation. Small improvements on high-frequency calls have the biggest impact on overall costs.

See [choosing models](/ai-practitioner-handbook/choosing-models) for guidance on selecting models that match your task complexity, which is another effective way to reduce token costs.
