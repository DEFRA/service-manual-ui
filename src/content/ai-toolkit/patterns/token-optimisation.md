---
title: Token optimisation
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
  - text: Token optimisation
supportBox:
  title: Contribute a pattern
  description: If your team has a reusable approach you want to share, the AI Capability and Enablement team can help you write it up.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Pattern%20contribution" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

## The problem

LLM API providers charge per token, including the models Defra reaches through Amazon Bedrock. As an AI application scales across the department, input token costs scale with it.

Large prompts also add latency and use up the available context window. Cutting token usage without losing output quality would lower running costs and energy use, which is one of the levers in [Sustainability](/ai-toolkit/guidance/sustainability).

## The hypothesis

Prompt compression can reduce input tokens by 20 to 60% while preserving output quality.

We tested 2 approaches: caveman compression (removing stopwords such as articles and prepositions) and LLMLingua-2 (a transformer model that identifies and removes non-essential tokens). We also tested an "Oreo" structure that protects system instructions and queries while compressing only the middle content.

## What we found

Caveman compression retained higher output quality than LLMLingua-2, scoring 0.54 on METEOR and 0.88 on BERTScore compared to 0.47 and 0.87. LLMLingua-2 achieved slightly more compression but at a greater quality cost.

The Oreo structure consistently improved results for both methods. Protecting instructions and queries while compressing content gave the best balance of token savings and quality.

One finding cut against the goal. The models produced longer responses when given compressed prompts, which partially offset the input savings.

They appear to compensate for less clear input with more verbose output. So measure total tokens, input and output together, not just the input you saved.

## Limitations

This was a small test: 10 prompts on a single model, GPT-4.

The quality metrics measured textual similarity, not factual accuracy or whether the task was actually completed, so the savings could come at a cost we did not measure.

We did not run a cost-benefit analysis weighing token savings against quality loss. Before relying on compression in a real service, treat output quality as the thing to prove.

## Project details

- **Duration**: January 2025 to February 2025
- **Status**: Completed
- [View the token optimisation project on GitHub](https://github.com/DEFRA/ai-spike-token-optimisation)
