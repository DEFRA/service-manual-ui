---
title: Cost and tokens
caption: Working with AI
description: Real cost ranges from Defra teams using AI in delivery. How tokens work, what affects the bill, and how to keep it under control.
layout: section
sectionTitle: Guidance
sectionNav:
  - title: In this section
    items:
      - text: Guidance
        href: /ai-toolkit/guidance
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
  - title: Working with AI
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
      - text: MCP servers and integrations
        href: /ai-toolkit/guidance/mcp-servers
      - text: Cost and tokens
        href: /ai-toolkit/guidance/cost-and-tokens
  - title: Responsible AI
    items:
      - text: Ethics
        href: /ai-toolkit/guidance/ethics
      - text: Security
        href: /ai-toolkit/guidance/security
      - text: Sustainability
        href: /ai-toolkit/guidance/sustainability
      - text: Information governance
        href: /ai-toolkit/guidance/information-governance
      - text: PII and data handling
        href: /ai-toolkit/guidance/pii-and-data-handling
customNav:
  - text: Home
    href: /
  - text: Guidance
    href: /ai-toolkit/guidance
  - text: Tools
    href: /ai-toolkit/tools
  - text: Patterns
    href: /ai-toolkit/patterns
  - text: From the field
    href: /ai-toolkit/from-the-field
headerServiceName: AI digital toolkit
headerServiceUrl: /ai-toolkit
breadcrumbItems:
  - text: Digital Defra
    href: /
  - text: AI digital toolkit
    href: /ai-toolkit
  - text: Guidance
    href: /ai-toolkit/guidance
  - text: Cost and tokens
supportBox:
  title: Get help with this
  description: Ask the AI Capability and Enablement team for advice or hands-on support.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Cost%20and%20tokens" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

AI tools charge by tokens. A token is roughly a word or part of a word. The more you send and receive, the more it costs.

## What affects cost

Cost varies with the volume of input material and the model you choose. The main drivers:

- **Number and size of images.** Each image-to-text or image-to-HTML conversion is a separate model call
- **Length of input documents.** Longer transcripts or codebases use more tokens
- **Size of the source codebase.** Larger codebases need more tokens for analysis steps
- **Model choice.** More capable models cost more per token. See [Choosing models](/ai-toolkit/guidance/choosing-models)

## What real Defra projects spend

A typical reverse-engineering project from the modernisation pilot (around 20 to 40 screenshots, 2 to 3 interview transcripts and a medium-sized codebase) costs in the region of **tens of dollars** for the full pipeline.

Day-to-day coding assistance (using endorsed tools like [GitHub Copilot](/ai-toolkit/tools/github-copilot) Business) sits inside the seat-based subscription, so cost-per-call is not usually a worry for normal feature work.

Where costs grow is in:

- batch processing of large document sets
- agentic workflows that loop and retry
- using advanced models for routine tasks

## How to manage cost

**Start with a mid-range model.** Move to advanced only if the result is not good enough. See [Choosing models](/ai-toolkit/guidance/choosing-models).

**Process incrementally.** During development and testing, work on small samples rather than running a full pipeline repeatedly.

**Review intermediate outputs first.** Before kicking off a long, expensive run, check that the input quality is good. Bad inputs lead to bad outputs and wasted tokens.

**Cache results.** If you make repeated similar requests, cache the responses. This avoids duplicate calls.

**Use rules and instructions for AI.** Standing context that the model reads on every prompt is cheaper than re-explaining your project conventions in each prompt.

## Talking about cost with your finance team

If you need to budget for AI work:

- ask the AI Capability and Enablement team for benchmarks from similar projects
- separate one-off ingestion costs from ongoing inference costs
- note that costs trend down over time as model providers compete and our internal patterns mature
- include a small contingency for experimentation
