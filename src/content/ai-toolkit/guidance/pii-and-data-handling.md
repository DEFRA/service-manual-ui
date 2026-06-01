---
title: PII and data handling
caption: Deliver with AI
description: Personal data must be removed before any AI sees it. Mandatory pre-processing rules and how to verify the output.
layout: section
sectionTitle: Deliver with AI
sectionNav:
  - title: In this section
    items:
      - text: Deliver with AI
        href: /ai-toolkit/deliver-with-ai
  - title: What you can do with AI at Defra
    items:
      - text: Tools and data
        href: /ai-toolkit/guidance/tools-and-data
      - text: Shared team knowledge bases
        href: /ai-toolkit/guidance/team-knowledge-bases
      - text: AI in your CI/CD pipeline
        href: /ai-toolkit/guidance/ai-in-pipelines
  - title: Using AI responsibly
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
  - text: PII and data handling
supportBox:
  title: Get help with this
  description: Ask the AI Capability and Enablement team for advice or hands-on support.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=PII%20and%20data%20handling" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

<p class="govuk-body-l">Personally identifiable information (PII) needs special care when working with AI. The rules on this page are mandatory.</p>

## Remove PII before any AI processing

You must remove all personally identifiable information from any input before it enters an AI tool. This is a non-negotiable step.

That includes:

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li>transcripts of interviews or user research sessions</li>
<li>screenshots and screen recordings</li>
<li>log files and diagnostic data</li>
<li>emails, tickets and free-text fields</li>
<li>test data taken from production</li>
<li>configuration files and connection strings</li>
</ul>

## What counts as PII

PII is any data that could identify a specific individual, alone or in combination with other data. That includes:

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li>names</li>
<li>email addresses, phone numbers and physical addresses</li>
<li>usernames and customer IDs that link to a person</li>
<li>IP addresses and device identifiers</li>
<li>date of birth and other identifiers</li>
<li>photographs of identifiable people</li>
</ul>

Some types of data are sensitive PII (for example, health data, biometric data, financial data) and need extra protection on top of the general rules.

## Image and screenshot handling

If you process screenshots through an AI tool, real names and identifiers visible in the screenshots must be replaced with fake equivalents before the screenshot is shared with the model.

Some AI assistants offer skills or plugins that do this automatically (for example, replacing real names with fake ones in screenshots). Treat these as a best effort. The team is still responsible for verifying that no real PII remains.

## Verification is the team's responsibility

Whichever tool or process you use to remove PII, **someone on the team must verify the output before it enters the pipeline or gets committed to version control**.

Verify that no PII remains in:

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li>curated transcripts</li>
<li>HTML mockups generated from screenshots</li>
<li>test data and fixtures</li>
<li>any file you commit to a public or shared repository</li>
</ul>

## Source code can also contain PII

It is not just transcripts and screenshots. Source code itself can contain PII through:

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li>configuration files with real email addresses or names</li>
<li>connection strings with usernames</li>
<li>test data hard-coded into tests</li>
<li>sample payloads in API documentation</li>
</ul>

Review source code before committing it to a repository the AI will read.

## If you find PII in an output

If PII is discovered in any output:

1. Remove it immediately
2. Re-run the processing step that produced the output
3. Tell your line manager or information asset owner
4. Log the incident as required by your team's policies

Do not commit the affected file to version control until it is clean.
