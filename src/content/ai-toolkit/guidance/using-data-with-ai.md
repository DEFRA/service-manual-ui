---
title: Using data with AI
caption: Deliver with AI
description: What data you can put into different types of AI tool, by data classification. How to read the table and what the conditions mean.
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
  - text: Using data with AI
supportBox:
  title: Ask AICE about data
  description: Check a specific data set, or get advice when a row in the table does not fit your situation.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Using%20data%20with%20AI" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

<p class="govuk-body-l">What data you can put into an AI tool depends on its classification and the type of tool.</p>

A simple test before you put anything in: if you would not hand it to a third party outside Defra, do not hand it to AI. You stay accountable for what comes out, too. See [Ethics](/ai-toolkit/guidance/ethics).

## How to read this table

This table shows the default position for each combination of data and tool type. It is a starting point, not a substitute for judgement.

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li>A <strong>Yes</strong> means allowed, sometimes only when a condition is met. Read the condition.</li>
<li>A <strong>No</strong> means do not do it.</li>
<li>If your situation does not fit a row, or you are unsure, stop and ask your information asset owner or AICE.</li>
</ul>

## What the tool types mean

The columns are not interchangeable. Check which one your tool actually is before you read across.

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li><strong>Public consumer tool.</strong> A tool you reach over the public internet on a standard or personal account, for example the free tier of ChatGPT. Your data may be processed outside the UK and used to improve the model unless you turn that off.</li>
<li><strong>Enterprise tool in the Defra tenant.</strong> A tool you reach through a Defra-managed account inside Defra's own Microsoft 365 environment, for example M365 Copilot. It is governed by Defra's data boundary and security controls.</li>
<li><strong>Defra-hosted.</strong> A model running in infrastructure Defra controls, for example Azure OpenAI or Bedrock configured in a Defra tenancy, where data stays in approved regions and tenancies. It is not a self-serve option for OFFICIAL-SENSITIVE or personal data, so talk to AICE first.</li>
</ul>

## What you can put where

<table class="govuk-table">
  <caption class="govuk-table__caption govuk-visually-hidden">What data you can put into different types of AI tool</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Your data</th>
      <th scope="col" class="govuk-table__header">Public consumer tool</th>
      <th scope="col" class="govuk-table__header">Enterprise tool in Defra tenant</th>
      <th scope="col" class="govuk-table__header">Defra-hosted</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">Public or open</th>
      <td class="govuk-table__cell"><strong>Yes</strong></td>
      <td class="govuk-table__cell"><strong>Yes</strong></td>
      <td class="govuk-table__cell"><strong>Yes</strong></td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">OFFICIAL</th>
      <td class="govuk-table__cell"><strong>Yes</strong>, with privacy settings on</td>
      <td class="govuk-table__cell"><strong>Yes</strong></td>
      <td class="govuk-table__cell"><strong>Yes</strong></td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">OFFICIAL-SENSITIVE</th>
      <td class="govuk-table__cell"><strong>No</strong></td>
      <td class="govuk-table__cell"><strong>Yes</strong></td>
      <td class="govuk-table__cell"><strong>No</strong></td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">Personal data</th>
      <td class="govuk-table__cell"><strong>No</strong></td>
      <td class="govuk-table__cell"><strong>DPIA required</strong> before use</td>
      <td class="govuk-table__cell"><strong>No</strong></td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">SECRET (SEC2 or SEC3)</th>
      <td class="govuk-table__cell"><strong>No</strong></td>
      <td class="govuk-table__cell"><strong>No</strong></td>
      <td class="govuk-table__cell"><strong>No</strong></td>
    </tr>
  </tbody>
</table>

## What the conditions mean

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li><strong>With privacy settings on.</strong> Model training and chat history are turned off. See [Choosing a tool](/ai-toolkit/guidance/choosing-a-tool).</li>
<li><strong>DPIA required.</strong> A Data Protection Impact Assessment must be completed and signed off before any processing begins.</li>
<li><strong>The defaults can move.</strong> A specific data set or use case may need more or fewer controls. Your information asset owner or AICE can confirm.</li>
</ul>

## The hard rule

Do not put OFFICIAL-SENSITIVE content, personal data or anything above OFFICIAL into a public consumer tool. Use an enterprise tool in the Defra tenant.

OFFICIAL-SENSITIVE and personal data are only allowed with the approvals set out in [Keeping data safe](/ai-toolkit/guidance/keeping-data-safe), including a DPIA where personal data is involved.

## If you do not know how your data is classified

Ask your project's information asset owner, or talk to AICE. If you do not know who your information asset owner is, your delivery manager or service owner can tell you. Do not proceed until you know.

## What to do next

For data handling rules in detail, see [Keeping data safe](/ai-toolkit/guidance/keeping-data-safe).
