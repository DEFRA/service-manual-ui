---
title: Information governance
caption: Deliver with AI
description: OFFICIAL classification only. How AI tools route data, and what to do if you are unsure.
layout: section
sectionTitle: Deliver with AI
sectionNav:
  - title: In this section
    items:
      - text: Deliver with AI
        href: /ai-toolkit/deliver-with-ai
  - title: Choose tools and use data
    items:
      - text: Choosing a tool
        href: /ai-toolkit/guidance/choosing-a-tool
      - text: Using data with AI
        href: /ai-toolkit/guidance/using-data-with-ai
      - text: Shared team knowledge bases
        href: /ai-toolkit/guidance/team-knowledge-bases
  - title: Build an AI service
    items:
      - text: Get approval before you build
        href: /ai-toolkit/guidance/get-approval
      - text: AI in your CI/CD pipeline
        href: /ai-toolkit/guidance/ai-in-pipelines
      - text: Test and assure your AI service
        href: /ai-toolkit/guidance/test-and-assure
  - title: Use AI responsibly
    items:
      - text: Security
        href: /ai-toolkit/guidance/security
      - text: Ethics
        href: /ai-toolkit/guidance/ethics
      - text: Sustainability
        href: /ai-toolkit/guidance/sustainability
      - text: Information governance
        href: /ai-toolkit/guidance/information-governance
      - text: PII and data handling
        href: /ai-toolkit/guidance/pii-and-data-handling
      - text: Report an AI incident
        href: /ai-toolkit/guidance/report-an-ai-incident
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
  - text: Deliver with AI
    href: /ai-toolkit/deliver-with-ai
  - text: Information governance
supportBox:
  title: Get help with this
  description: Ask the AI Capability and Enablement team for advice or hands-on support.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Information%20governance%20enquiry" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

<p class="govuk-body-l">AI tools introduce new ways for data to leave your control. This page sets out the rules.</p>

## OFFICIAL classification only

The default position is that you only use AI tools on source material classified as **OFFICIAL**.

OFFICIAL-SENSITIVE and personal data are permitted only in specific tools and only with the approvals set out below. The [Using data with AI](/ai-toolkit/guidance/using-data-with-ai) matrix shows exactly what you can put where. Where AI processes personal data, a Data Protection Impact Assessment (DPIA) is required before processing begins. Do not use AI tools with SECRET or TOP SECRET material.

If you are unsure about the classification of your source material, stop and ask your information asset owner before proceeding.

## Where your data goes

Generative AI tools send your prompts and content to models hosted by external providers. Depending on the tool, that data may be routed to:

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li>Anthropic</li>
<li>OpenAI</li>
<li>Microsoft (including Microsoft 365 Copilot and Azure OpenAI)</li>
<li>Google</li>
<li>Amazon (Bedrock)</li>
<li>another provider</li>
</ul>

Some tools can be configured to use approved cloud platforms, for example TAWS Bedrock](/ai-toolkit/tools/aws-bedrock) or TAzure AI Foundry](/ai-toolkit/tools/azure-ai-foundry). These keep data in regions and tenancies that meet UK government requirements.

Always check the Ttools radar](/ai-toolkit/tools) entry for your tool to see how data is routed and what approvals apply at Defra. Consult your team's own information governance policies as well.

## Information governance training

All team members must complete the relevant information governance training before using AI tools on Defra data. Your line manager or your team's information asset owner can point you to the current training.

## Follow your organisation's policies

This guidance does not replace Defra's wider information governance policies. It works alongside them. Where the two appear to conflict, the wider Defra policy takes precedence and you should ask the AI Capability and Enablement team for clarification.

## When in doubt, stop

If you are not certain about classification or data handling, do not proceed. Ask. The cost of a 10-minute pause is much smaller than the cost of mishandled data.
