---
title: Green summarisation
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
  - text: Green summarisation
supportBox:
  title: Contribute a pattern
  description: If your team has a reusable approach you want to share, the AI Capability and Enablement team can help you write it up.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Pattern%20contribution" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

## The problem

Previous proofs of concept showed that large language models (LLMs) produce high-quality text summaries. However, LLMs run on cloud infrastructure and consume significant energy. We wanted to find out whether smaller, local models could do the same job more sustainably.

## The hypothesis

Non-LLM transformer models can summarise documents and meeting transcripts to a comparable standard, while using fewer resources and running locally.

We set out to answer 3 questions:

- can smaller, local models match LLM summarisation quality?
- how do we measure summary quality objectively?
- what are the cost and speed trade-offs between local models and cloud-based LLMs?

## What we found

Smaller transformer models can summarise text, but quality depends on expectations.

For concise summaries, the tested models produced shorter output that was semantically similar to the LLM baseline. They captured the core meaning.

For longer, more detailed summaries, the transformer models could not match LLMs. Their output length limits made detailed summaries impractical.

Before this approach can progress further, we need a clear validation and evaluation strategy for summary quality.

## Limitations

We only tested 2 models due to time constraints. Local inference ran on CPU only. GPU processing would improve performance significantly. The evaluation metrics we used (ROUGE, BERTScore) may not fully capture what makes a summary useful in practice.

## Project details

- **Duration**: 8 January 2025 to 14 February 2025
- **Status**: Completed
- [View the green summarisation project on GitHub](https://github.com/DEFRA/ai-spike-green-summarisation)
