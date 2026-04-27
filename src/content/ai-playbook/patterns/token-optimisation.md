---
title: Token optimisation
caption: Proof of concept
description: A proof of concept from the AI Capability and Enablement team.
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
    href: /ai-playbook/patterns
  - text: Token optimisation
supportBox:
  title: Contribute a pattern
  description: If your team has a reusable approach you want to share, the AI Capability and Enablement team can help you write it up.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Pattern%20contribution" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

## The problem

LLM API providers charge per token. As AI applications scale, input token costs grow with them. Large prompts also increase latency and consume more of the available context window. Reducing token usage without losing output quality would cut costs, speed up responses and lower energy consumption.

## The hypothesis

Prompt compression can reduce input tokens by 20 to 60% while preserving output quality. We tested 2 approaches: caveman compression (removing stopwords such as articles and prepositions) and LLMLingua-2 (a transformer model that identifies and removes non-essential tokens). We also tested an "Oreo" structure that protects system instructions and queries while compressing only the middle content.

## What we found

Caveman compression retained higher output quality than LLMLingua-2, scoring 0.54 on METEOR and 0.88 on BERTScore compared to 0.47 and 0.87. LLMLingua-2 achieved slightly more compression but at a greater quality cost.

The Oreo structure consistently improved results for both methods. Protecting instructions and queries while compressing content gave the best balance of token savings and quality.

An unexpected finding: LLMs produced longer responses when given compressed prompts. This partially offset the input savings. The models appear to compensate for less clear input with more verbose output.

## Limitations

We tested only 10 prompts on a single model (GPT-4). Quality metrics measured textual similarity but not factual accuracy or task completion. A cost-benefit analysis comparing token savings against quality loss was not performed.

## Project details

- **Duration**: January 2025 to February 2025
- **Status**: Completed
- [View the token optimisation project on GitHub](https://github.com/DEFRA/ai-spike-token-optimisation)
