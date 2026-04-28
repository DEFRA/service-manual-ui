---
title: Information governance
caption: Responsible AI
description: OFFICIAL classification only. How AI tools route data, and what to do if you are unsure.
layout: section
sectionTitle: Guidance
sectionNav:
  - title: In this section
    items:
      - text: Guidance
        href: /ai-playbook/guidance
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
      - text: Cost and tokens
        href: /ai-playbook/guidance/cost-and-tokens
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
customNav:
  - text: Home
    href: /
  - text: Guidance
    href: /ai-playbook/guidance
  - text: Tools
    href: /ai-playbook/tools
  - text: Patterns
    href: /ai-playbook/patterns
  - text: From the field
    href: /ai-playbook/from-the-field
headerServiceName: AI digital toolkit
headerServiceUrl: /ai-playbook
breadcrumbItems:
  - text: Digital Defra
    href: /
  - text: AI digital toolkit
    href: /ai-playbook
  - text: Guidance
    href: /ai-playbook/guidance
  - text: Information governance
supportBox:
  title: Get help with this
  description: Ask the AI Capability and Enablement team for advice or hands-on support.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Information%20governance%20enquiry" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

AI tools introduce new ways for data to leave your control. This page sets out the rules.

## OFFICIAL classification only

You must only use AI tools on source material classified as **OFFICIAL**.

Do not use AI tools with material at any higher classification (OFFICIAL-SENSITIVE, SECRET, TOP SECRET) without explicit written approval and a documented risk assessment.

If you are unsure about the classification of your source material, stop and ask your information asset owner before proceeding.

## Where your data goes

Generative AI tools send your prompts and content to models hosted by external providers. Depending on the tool, that data may be routed to:

- Anthropic
- OpenAI
- Microsoft (including Microsoft 365 Copilot and Azure OpenAI)
- Google
- Amazon (Bedrock)
- another provider

Some tools can be configured to use approved cloud platforms. For example [AWS Bedrock](/ai-playbook/tools/aws-bedrock) or [Azure AI Foundry](/ai-playbook/tools/azure-ai-foundry). That keep data in regions and tenancies that meet UK government requirements.

Always check the [tools radar](/ai-playbook/tools) entry for your tool to see how data is routed and what approvals apply at Defra. Consult your team's own information governance policies as well.

## Information governance training

All team members should complete the relevant information governance training before using AI tools on Defra data. Your line manager or your team's information asset owner can point you to the current training.

## Follow your organisation's policies

This guidance does not replace Defra's wider information governance policies. It works alongside them. Where the two appear to conflict, the wider Defra policy takes precedence and you should ask the AI Capability and Enablement team for clarification.

## When in doubt, stop

If you are not certain about classification or data handling, do not proceed. Ask. The cost of a 10-minute pause is much smaller than the cost of mishandled data.
