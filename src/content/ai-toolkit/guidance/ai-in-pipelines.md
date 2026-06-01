---
title: AI in your CI/CD pipeline
caption: Deliver with AI
description: When you can use AI agents in build, test and deploy pipelines, and what needs sign-off.
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
  - text: AI in your CI/CD pipeline
supportBox:
  title: Ask AICE about pipelines
  description: Talk to us before you start any agent-in-CI work.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=AI%20in%20pipelines" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

<p class="govuk-body-l">This is an emerging area and our position will evolve. Talk to AICE before you start any agent-in-CI work.</p>

## In non-production pipelines

<p class="govuk-body">You can use AI agents in non-production pipelines when you have:</p>

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li>least-privilege scoped tokens</li>
<li>no access to production secrets</li>
<li>egress controls in place, such as Harden-Runner</li>
<li>a human approval gate before any merge to main or any deploy step, the same accountable change control the Service Standard expects</li>
<li>full audit logging of all agent actions</li>
</ul>

Agent-authored changes must pass the same Core Delivery Platform (CDP) pipeline gates as any other change, including SonarQube. AI does not get a shortcut through the quality gates.

## In production pipelines

You cannot use AI agents in pipelines that touch production without a written exception approved by AICE.

## What to do next

Email AICE before you start.

If your pipeline uses MCP to connect AI to external services, see [Model Context Protocol](/ai-toolkit/tools/model-context-protocol).
