---
title: Shared team knowledge bases
caption: Deliver with AI
description: Approved patterns for letting your team query a shared knowledge base with AI.
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
      - text: Keeping data safe
        href: /ai-toolkit/guidance/keeping-data-safe
      - text: Shared team knowledge bases
        href: /ai-toolkit/guidance/team-knowledge-bases
      - text: Working with AI agents
        href: /ai-toolkit/guidance/working-with-agents
  - title: Use AI responsibly
    items:
      - text: Security
        href: /ai-toolkit/guidance/security
      - text: Ethics
        href: /ai-toolkit/guidance/ethics
      - text: Sustainability
        href: /ai-toolkit/guidance/sustainability
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
  - text: Shared team knowledge bases
supportBox:
  title: Ask AICE about a knowledge base
  description: Get advice on what's possible for your team, or scope a custom retrieval setup.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Team%20knowledge%20base" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

<p class="govuk-body-l">Your team can have a shared knowledge base that AI can search. Two patterns are approved, and both depend on getting your SharePoint permissions right first.</p>

## M365 Copilot grounded on a SharePoint site

Copilot only surfaces content the user already has permission to see.

Audit your SharePoint sharing before you publish. Anything over-shared today becomes an AI-readable leak tomorrow.

## A Copilot Studio agent over the same SharePoint site

Use this when you need a named team assistant. Build it in the Defra M365 tenant, not a personal or trial environment, and agree an owner who is accountable for what it returns. Your information asset owner should sign off before you point an agent at a site holding anything above OFFICIAL.

## Including OFFICIAL-SENSITIVE content

You can only include OFFICIAL-SENSITIVE content if SharePoint access is restricted to the cleared team. eestrict the site to a named security group rather than relying on link sharing, and review the membership before you publish.

## Anything beyond Copilot

For a custom retrieval setup over Defra-controlled data, talk to AICE.

## What to do next

Read [Using data with AI](/ai-toolkit/guidance/using-data-with-ai) for the data classification rules that apply.
