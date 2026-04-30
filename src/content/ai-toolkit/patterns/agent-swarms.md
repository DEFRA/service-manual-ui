---
title: Agent swarms
caption: Proof of concept
description: A proof of concept from the AI Capability and Enablement team.
layout: section
sectionTitle: Patterns
sectionNav:
  - title: In this section
    items:
      - text: Patterns
        href: /ai-toolkit/patterns
  - title: Proofs of concept
    items:
      - text: Agent swarms
        href: /ai-toolkit/patterns/agent-swarms
      - text: AI assistant
        href: /ai-toolkit/patterns/ai-assistant
      - text: Green summarisation
        href: /ai-toolkit/patterns/green-summarisation
      - text: Token optimisation
        href: /ai-toolkit/patterns/token-optimisation
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
  - text: Patterns
    href: /ai-toolkit/patterns
  - text: Agent swarms
supportBox:
  title: Contribute a pattern
  description: If your team has a reusable approach you want to share, the AI Capability and Enablement team can help you write it up.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Pattern%20contribution" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

## The problem

Complex tasks such as policy analysis need different types of expertise: researching, drafting, fact-checking and review. A single AI agent handles these sequentially, with no way to cross-check its own work or build on separate lines of analysis. The result is often shallow and one-dimensional.

## The hypothesis

A swarm of specialist AI agents, coordinated by a central orchestrator, can produce better analysis than a single agent working alone. By giving each agent a distinct role and letting them build on each other's findings, the swarm creates richer, more thorough output. A human approval step keeps quality under control.

## What we found

We built a managed swarm using Pydantic AI and Amazon Bedrock. An orchestrator directed 3 specialist agents to analyse farming policy documents:

- a **critique agent** evaluated writing clarity, structure and tone
- a **gap analysis agent** identified missing information
- an **ambiguity agent** flagged vague language and unclear requirements

The orchestrator chose which agent to engage based on the discussion, not a fixed sequence. All agents shared the full conversation history, so each could reference and build on what others found.

Adding a 'human-in-the-loop' step let reviewers approve the analysis or send it back for further work. Tool call limits prevented runaway execution.

## Limitations

We only tested 2 Claude model variants. Quality benchmarking metrics are not yet defined. UX patterns for human-supervised agent workflows need further development.

## Project details

- **Duration**: January 2025 to February 2025
- **Status**: Completed
- [View the agent swarms project on GitHub](https://github.com/DEFRA/ai-spike-agent-swarm)
