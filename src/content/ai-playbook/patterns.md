---
title: Patterns
description: Reusable approaches Defra teams are exploring with AI. Early today, more coming as proofs of concept mature.
layout: section
sectionTitle: Patterns
sectionNav:
  - title: Proofs of concept
    items:
      - text: Agent swarms
        href: /ai-playbook/patterns/agent-swarms
      - text: AI assistant
        href: /ai-playbook/patterns/ai-assistant
      - text: Green summarisation
        href: /ai-playbook/patterns/green-summarisation
      - text: Token optimisation
        href: /ai-playbook/patterns/token-optimisation
  - title: Want to contribute?
    items:
      - text: Email the team
        href: 'mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Pattern%20contribution'
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
  - text: Patterns
supportBox:
  title: Contribute a pattern
  description: If your team has a reusable approach you want to share, the AI Capability and Enablement team can help you write it up.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Pattern%20contribution" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

A pattern is a reusable approach to a recurring problem. When one team works out how to do something well, a pattern turns that solution into the starting point for the next team.

## Patterns at Defra are early

Most of the AI work across Defra is still in the pilot phase. The patterns on this page are **proofs of concept**: things we have tried, often successfully, but not yet hardened into approaches every team should use.

Each one has a clear problem, a stated hypothesis, what we found, and the limitations of what we did. Treat them as evidence, not yet as recipes.

As proofs of concept mature into proven, reusable patterns, they will move out of this section and become full patterns with worked examples and templates. As other teams document what they have built, more will be added.

## Proofs of concept today

### Agent swarms

Multiple specialist AI agents collaborate on a single task. Tested on policy document analysis. Showed that a coordinated swarm can produce richer output than a single agent working alone, with a human-in-the-loop step keeping quality under control.

[Read the agent swarms proof of concept](/ai-playbook/patterns/agent-swarms).

### AI assistant

A Defra-hosted AI stack that swaps between leading providers (Anthropic, OpenAI, Microsoft) and local models. Aims to give teams a flexible, sovereign platform with consistent guardrails and monitoring. In progress.

[Read the AI assistant proof of concept](/ai-playbook/patterns/ai-assistant).

### Green summarisation

Smaller, local transformer models tested against cloud-based LLMs for document summarisation. Showed that local models can match LLMs for short summaries but fall short on longer, more detailed ones.

[Read the green summarisation proof of concept](/ai-playbook/patterns/green-summarisation).

### Token optimisation

Compressing prompts to reduce token cost and latency without losing output quality. Tested two compression methods on a single model, with mixed results.

[Read the token optimisation proof of concept](/ai-playbook/patterns/token-optimisation).

## Help us build the next pattern

If your team has worked out a reusable approach, we want to write it up. The team can pair with you on documentation, or just help you frame what you have done so other teams can adopt it.
