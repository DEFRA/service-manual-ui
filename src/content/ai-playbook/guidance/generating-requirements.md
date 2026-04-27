---
title: Generating requirements
caption: Working with AI
description: How to use AI to draft user stories, PRDs, data models and architecture artefacts. Foundations of the four pillars.
layout: section
sectionTitle: Guidance
sectionNav:
  - title: Get started
    items:
      - text: Welcome to AI at Defra
        href: /ai-playbook/guidance/welcome
      - text: Choosing models
        href: /ai-playbook/guidance/choosing-models
      - text: Working mindset
        href: /ai-playbook/guidance/working-mindset
      - text: The four pillars
        href: /ai-playbook/guidance/four-pillars
      - text: Setting up your project
        href: /ai-playbook/guidance/setting-up-your-project
      - text: Training and resources
        href: /ai-playbook/guidance/training-and-resources
  - title: Working with AI
    items:
      - text: The AI development workflow
        href: /ai-playbook/guidance/workflow
      - text: Writing good prompts
        href: /ai-playbook/guidance/writing-good-prompts
      - text: Generating requirements
        href: /ai-playbook/guidance/generating-requirements
      - text: Feature development with AI
        href: /ai-playbook/guidance/feature-development
      - text: Rules for AI in your repo
        href: /ai-playbook/guidance/rules-for-ai
      - text: MCP servers and integrations
        href: /ai-playbook/guidance/mcp-servers
  - title: Responsible AI
    items:
      - text: Ethics
        href: /ai-playbook/guidance/ethics
      - text: Security
        href: /ai-playbook/guidance/security
      - text: Sustainability
        href: /ai-playbook/guidance/sustainability
      - text: Information governance
        href: /ai-playbook/guidance/information-governance
      - text: PII and data handling
        href: /ai-playbook/guidance/pii-and-data-handling
  - title: From the field
    items:
      - text: Case studies
        href: /ai-playbook/case-studies
      - text: Lessons learned
        href: /ai-playbook/lessons-learned
      - text: Cost and tokens
        href: /ai-playbook/guidance/cost-and-tokens
customNav:
  - text: Home
    href: /
  - text: Patterns
    href: /ai-playbook/proofs-of-concept/ai-assistant
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
  - text: Guidance
    href: /ai-playbook/guidance
  - text: Generating requirements
supportBox:
  title: Get help with this
  description: Ask the AI Capability and Enablement team for advice or hands-on support.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Help%20with%20generating%20requirements" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

Detailed product and technical requirements are the foundation of high-quality AI-generated code. Without them, the AI guesses at the wrong thing.

These are flexible techniques. Adapt them to your situation rather than following them as a fixed workflow.

## Start with a feature description

Before you prompt the model, articulate what you want to build in your own words.

Write a comprehensive markdown document covering, where relevant:

- **Purpose and scope** — what are we going to do?
- **User interactions** — how will people use this?
- **Frontend requirements** — interface elements, user flows, visual design
- **Backend requirements** — processing logic, data handling, system behaviour
- **Data considerations** — what information will be stored, processed or displayed?
- **Business rules** — constraints, validations, compliance requirements
- **Integration points** — how this connects with existing systems
- **Performance expectations** — speed, capacity, reliability
- **Security requirements** — authentication, authorisation, data protection

Writing with clarity here forces you to think the problem through. The document becomes the basis for everything the AI generates.

## Create visual mockups for user-facing features

For anything users see, develop mockups in Figma, Miro or similar. Annotate them with expected behaviour, user flows and interaction patterns. Include:

- key user journeys and decision points
- error states and edge cases
- responsive behaviour for different screen sizes
- accessibility considerations

You can then ask the AI to convert the mockups into a text description of the interface, which becomes useful context for code generation.

## Generate user stories with AI

When your work needs user stories, use a prompt template to expand your feature description into stories with acceptance criteria. Iterate by talking with the model.

The [SDLC prompt library](https://defra.github.io/defra-ai-sdlc/) has reusable prompts for user-story creation, combined requirements and PRD generation.

## Generate Product Requirements Documents (PRDs) with AI

For larger pieces of work — for example, a new epic — use AI to expand the feature description into a full PRD covering requirements, features and user stories together.

Refine through conversation rather than expecting a perfect document on the first prompt.

## Visualise your architecture with AI

Architecture diagrams help the AI understand how components fit together.

Use a prompt template to generate a high-level architecture diagram from your requirements. Iterate until it accurately represents your system.

## Create your data models with AI

When your work involves a data model, generate it from your product requirements as context. Iterate until the model accurately represents your domain.

## Map system interactions with AI

For workflows where multiple components need to communicate, generate a sequence diagram. Refine through conversation.

## Document your API specifications with AI

For services that expose APIs, generate API specifications from the requirements. Refine through conversation.

## Create architectural decision records (ADRs) with AI

Use AI to draft architectural decision records that capture key technical choices and the reasoning behind them. Iterate until the record is sharp enough to share with the team.

## Review your requirements with AI

Before you start feature development, ask the AI to review the requirements you have generated. It can identify gaps in documentation and surface alternatives you have missed.

## Reusable prompts

Many of these tasks have ready-made prompt templates in the [SDLC prompt library](https://defra.github.io/defra-ai-sdlc/). Adapt them to your context rather than starting from scratch.
