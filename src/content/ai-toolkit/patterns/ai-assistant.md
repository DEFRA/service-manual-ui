---
title: AI assistant
caption: Proof of concept
description: A proof of concept from the AI Capability and Enablement team.
layout: section
sectionTitle: Use AI patterns
sectionNav:
  - title: In this section
    items:
      - text: Use AI patterns
        href: /ai-toolkit/patterns
  - title: Proofs of concept
    items:
      - text: AI assistant
        href: /ai-toolkit/patterns/ai-assistant
      - text: Green summarisation
        href: /ai-toolkit/patterns/green-summarisation
      - text: Agent swarms
        href: /ai-toolkit/patterns/agent-swarms
      - text: Token optimisation
        href: /ai-toolkit/patterns/token-optimisation
      - text: Interaction designer plugin
        href: /ai-toolkit/patterns/interaction-designer-plugin
customNav:
  - text: Home
    href: /
  - text: Deliver with AI
    href: /ai-toolkit/deliver-with-ai
  - text: Find a tool
    href: /ai-toolkit/tools
  - text: Use AI patterns
    href: /ai-toolkit/patterns
  - text: Learn from others
    href: /ai-toolkit/projects
headerServiceName: AI digital toolkit
headerServiceUrl: /ai-toolkit
breadcrumbItems:
  - text: Digital Defra
    href: /
  - text: AI digital toolkit
    href: /ai-toolkit
  - text: Use AI patterns
    href: /ai-toolkit/patterns
  - text: AI assistant
supportBox:
  title: Contribute a pattern
  description: If your team has a reusable approach you want to share, the AI Capability and Enablement team can help you write it up.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Pattern%20contribution" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

## The problem

Getting AI tools into people's hands at Defra is slow and expensive.

Procurement takes time, subscription costs add up, and teams risk being locked into a single vendor. Each tool has different strengths, weaknesses and security controls, and the [tools radar](/ai-toolkit/tools) shows how few are cleared for sensitive work.

It is not always clear whether staff can safely upload OFFICIAL files to a given service. The defaults are set out in [Using data with AI](/ai-toolkit/guidance/using-data-with-ai).

Many people across Defra want to use AI but cannot reach the most capable tools when they need them.

## The hypothesis

A Defra-hosted AI stack could give teams one platform that swaps between leading providers such as Anthropic, OpenAI and Microsoft, alongside locally hosted models.

Hosting it ourselves keeps data in approved tenancies and regions, which matters for OFFICIAL information that public consumer tools cannot take.

It would also give us one place to monitor usage, apply guardrails and enforce safe practice as Defra's use of AI grows.

This is a hypothesis we are testing, not a platform you can use yet.

## What we found

Getting this type of tool through governance is new for Defra, and that is the hard part, not the engineering.

The service must assume sensitive information could be submitted at any time, because we cannot fully control what users type in.

There is no fast route to the data access permissions and assurance an open-ended assistant needs, including a DPIA.

See [Keeping data safe](/ai-toolkit/guidance/keeping-data-safe) and [Security](/ai-toolkit/guidance/security), and talk to AICE early.

We are still working out how to support this safely. We are also evaluating off-the-shelf options such as Open WebUI, to see whether an existing tool gets Defra there faster than a bespoke build.

## Project details

- **Duration**: October 2025 to present
- **Status**: In progress
- [View the AI assistant project on GitHub](https://github.com/DEFRA/ai-defra-search-frontend)
