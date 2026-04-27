---
title: Retrieval-augmented generation (RAG)
caption: Tools
description: Combining a model with retrieved documents to ground its answers. Under assessment by the AI Capability and Enablement team.
layout: section
sectionTitle: Retrieval-augmented generation (RAG)
sectionNav:
  - title: Endorsed
    items:
      - text: GitHub Copilot
        href: /ai-playbook/tools/github-copilot
  - title: In pilot
    items:
      - text: AWS Bedrock
        href: /ai-playbook/tools/aws-bedrock
      - text: Azure AI Foundry
        href: /ai-playbook/tools/azure-ai-foundry
  - title: Assess
    items:
      - text: Model Context Protocol
        href: /ai-playbook/tools/model-context-protocol
      - text: Agent-to-Agent
        href: /ai-playbook/tools/agent-to-agent
      - text: LangGraph
        href: /ai-playbook/tools/langgraph
      - text: Retrieval-augmented generation
        href: /ai-playbook/tools/retrieval-augmented-generation
      - text: Langfuse
        href: /ai-playbook/tools/langfuse
      - text: AWS Bedrock AgentCore
        href: /ai-playbook/tools/aws-bedrock-agentcore
      - text: Claude Code plugin marketplace
        href: /ai-playbook/tools/claude-code-marketplace
      - text: Git AI
        href: /ai-playbook/tools/git-ai
  - title: All tools
    items:
      - text: Back to tools radar
        href: /ai-playbook/tools
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
  - text: Tools radar
    href: /ai-playbook/tools
  - text: Retrieval-augmented generation
supportBox:
  title: Get help with RAG
  description: The AI Capability and Enablement team is evaluating RAG patterns. Talk to us before using them in delivery.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Help%20with%20RAG" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

<p class="app-tool-meta">
  <strong class="govuk-tag govuk-tag--yellow">Assess</strong>
  <span class="app-tool-meta__category">Framework</span>
</p>

Retrieval-augmented generation (RAG) is a pattern that combines a language model with a search step. The model retrieves relevant documents first, then uses them to ground its answer.

## What assess means here

The AI Capability and Enablement team is evaluating RAG patterns. They are not yet ready for general use in Defra delivery without prior consultation.

## Why it matters

RAG can reduce hallucination and let teams use models on internal Defra knowledge that is not in the model's training data. The trade-offs sit in retrieval quality, document permissions and evaluation.

## Before you start

Do not use RAG in delivery without talking to the AI Capability and Enablement team. They can advise on retrieval strategy, evaluation and access controls.
