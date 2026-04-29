---
title: Generating requirements
caption: Working with AI
description: How to use AI to draft user stories, PRDs, data models and architecture artefacts. Foundations of the four pillars.
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

- **Purpose and scope.** What are we going to do?
- **User interactions.** How will people use this?
- **Frontend requirements.** Interface elements, user flows, visual design
- **Backend requirements.** Processing logic, data handling, system behaviour
- **Data considerations.** What information will be stored, processed or displayed?
- **Business rules.** Constraints, validations, compliance requirements
- **Integration points.** How this connects with existing systems
- **Performance expectations.** Speed, capacity, reliability
- **Security requirements.** Authentication, authorisation, data protection

Writing with clarity here forces you to think the problem through. The document becomes the basis for everything the AI generates.

## Create visual mockups for user-facing features

For anything users see, develop mockups in Figma, Miro or similar. Annotate them with expected behaviour, user flows and interaction patterns. Include:

- key user journeys and decision points
- error states and edge cases
- responsive behaviour for different screen sizes
- accessibility considerations

You can then ask the AI to convert the mockups into a text description of the interface, which becomes useful context for code generation.

## Generate artefacts with AI

Once your feature description and any mockups are in place, AI can help you draft the supporting artefacts. Pick the ones your work needs.

<div class="govuk-accordion" data-module="govuk-accordion" id="requirements-accordion">

<div class="govuk-accordion__section">
<div class="govuk-accordion__section-header">
<h3 class="govuk-accordion__section-heading">
<span class="govuk-accordion__section-button" id="requirements-accordion-heading-1">Stories and requirements documents</span>
</h3>
</div>
<div id="requirements-accordion-content-1" class="govuk-accordion__section-content">

<h4 class="govuk-heading-s">Generate user stories</h4>
<p class="govuk-body">When your work needs user stories, use a prompt template to expand your feature description into stories with acceptance criteria. Iterate by talking with the model.</p>
<p class="govuk-body">The <a href="/ai-playbook/prompt-library" class="govuk-link">prompt library</a> has reusable prompts for user-story creation, combined requirements and PRD generation.</p>

<h4 class="govuk-heading-s">Generate Product Requirements Documents (PRDs)</h4>
<p class="govuk-body">For larger pieces of work, for example a new epic, use AI to expand the feature description into a full PRD covering requirements, features and user stories together.</p>
<p class="govuk-body">Refine through conversation rather than expecting a perfect document on the first prompt.</p>

<h4 class="govuk-heading-s">Review your requirements</h4>
<p class="govuk-body">Before you start feature development, ask the AI to review the requirements you have generated. It can identify gaps in documentation and surface alternatives you have missed.</p>

</div>
</div>

<div class="govuk-accordion__section">
<div class="govuk-accordion__section-header">
<h3 class="govuk-accordion__section-heading">
<span class="govuk-accordion__section-button" id="requirements-accordion-heading-2">Diagrams and models</span>
</h3>
</div>
<div id="requirements-accordion-content-2" class="govuk-accordion__section-content">

<h4 class="govuk-heading-s">Visualise your architecture</h4>
<p class="govuk-body">Architecture diagrams help the AI understand how components fit together.</p>
<p class="govuk-body">Use a prompt template to generate a high-level architecture diagram from your requirements. Iterate until it accurately represents your system.</p>

<h4 class="govuk-heading-s">Create your data models</h4>
<p class="govuk-body">When your work involves a data model, generate it from your product requirements as context. Iterate until the model accurately represents your domain.</p>

<h4 class="govuk-heading-s">Map system interactions</h4>
<p class="govuk-body">For workflows where multiple components need to communicate, generate a sequence diagram. Refine through conversation.</p>

</div>
</div>

<div class="govuk-accordion__section">
<div class="govuk-accordion__section-header">
<h3 class="govuk-accordion__section-heading">
<span class="govuk-accordion__section-button" id="requirements-accordion-heading-3">Technical artefacts</span>
</h3>
</div>
<div id="requirements-accordion-content-3" class="govuk-accordion__section-content">

<h4 class="govuk-heading-s">Document your API specifications</h4>
<p class="govuk-body">For services that expose APIs, generate API specifications from the requirements. Refine through conversation.</p>

<h4 class="govuk-heading-s">Create architectural decision records (ADRs)</h4>
<p class="govuk-body">Use AI to draft architectural decision records that capture key technical choices and the reasoning behind them. Iterate until the record is sharp enough to share with the team.</p>

</div>
</div>

</div>

## Reusable prompts

Many of these tasks have ready-made prompt templates in the [prompt library](/ai-playbook/prompt-library). Adapt them to your context rather than starting from scratch.
