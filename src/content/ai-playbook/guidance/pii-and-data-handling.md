---
title: PII and data handling
caption: Responsible AI
description: Personal data must be removed before any AI sees it. Mandatory pre-processing rules and how to verify the output.
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
  - text: PII and data handling
supportBox:
  title: Get help with this
  description: Ask the AI Capability and Enablement team for advice or hands-on support.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=PII%20and%20data%20handling" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

Personally identifiable information (PII) needs special care when working with AI. The rules on this page are mandatory.

## Remove PII before any AI processing

You must remove all personally identifiable information from any input before it enters an AI tool. This is a non-negotiable step.

That includes:

- transcripts of interviews or user research sessions
- screenshots and screen recordings
- log files and diagnostic data
- emails, tickets and free-text fields
- test data taken from production
- configuration files and connection strings

## What counts as PII

PII is any data that could identify a specific individual, alone or in combination with other data. That includes:

- names
- email addresses, phone numbers and physical addresses
- usernames and customer IDs that link to a person
- IP addresses and device identifiers
- date of birth and other identifiers
- photographs of identifiable people

Some types of data are sensitive PII (for example, health data, biometric data, financial data) and need extra protection on top of the general rules.

## Image and screenshot handling

If you process screenshots through an AI tool, real names and identifiers visible in the screenshots must be replaced with fake equivalents before the screenshot is shared with the model.

Some AI assistants offer skills or plugins that do this automatically (for example, replacing real names with fake ones in screenshots). Treat these as a best effort. The team is still responsible for verifying that no real PII remains.

## Verification is the team's responsibility

Whichever tool or process you use to remove PII, **someone on the team must verify the output before it enters the pipeline or gets committed to version control**.

Verify that no PII remains in:

- curated transcripts
- HTML mockups generated from screenshots
- test data and fixtures
- any file you commit to a public or shared repository

## Source code can also contain PII

It is not just transcripts and screenshots. Source code itself can contain PII through:

- configuration files with real email addresses or names
- connection strings with usernames
- test data hard-coded into tests
- sample payloads in API documentation

Review source code before committing it to a repository the AI will read.

## If you find PII in an output

If PII is discovered in any output:

1. Remove it immediately
2. Re-run the processing step that produced the output
3. Tell your line manager or information asset owner
4. Log the incident as required by your team's policies

Do not commit the affected file to version control until it is clean.
