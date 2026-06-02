---
title: Putting data into AI tools
caption: Deliver with AI
description: What data you can put into different types of AI tool, by data classification.
layout: section
sectionTitle: Deliver with AI
sectionNav:
  - title: In this section
    items:
      - text: Deliver with AI
        href: /ai-toolkit/deliver-with-ai
  - title: Common questions
    items:
      - text: Using AI tools
        href: /ai-toolkit/guidance/using-ai-tools
      - text: Putting data into AI tools
        href: /ai-toolkit/guidance/data-in-ai-tools
      - text: Shared team knowledge bases
        href: /ai-toolkit/guidance/team-knowledge-bases
      - text: AI in your CI/CD pipeline
        href: /ai-toolkit/guidance/ai-in-pipelines
  - title: Set yourself up
    items:
      - text: Setting up your project
        href: /ai-toolkit/guidance/setting-up-your-project
      - text: Rules for AI in your repo
        href: /ai-toolkit/guidance/rules-for-ai
customNav:
  - text: Home
    href: /
  - text: Deliver with AI
    href: /ai-toolkit/deliver-with-ai
  - text: Find a tool
    href: /ai-toolkit/tools
  - text: Use AI responsibly
    href: /ai-toolkit/build-responsibly
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
  - text: Putting data into AI tools
supportBox:
  title: Ask AICE about data
  description: Check a specific data set, or get advice when a row in the table does not fit your situation.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Data%20in%20AI%20tools" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

<p class="govuk-body-l">What data you can put into an AI tool depends on its classification and the type of tool.</p>

<table class="govuk-table">
  <caption class="govuk-table__caption govuk-visually-hidden">What data you can put into different types of AI tool</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Your data</th>
      <th scope="col" class="govuk-table__header">Public consumer tool<br><span class="govuk-body-s">for example, free ChatGPT</span></th>
      <th scope="col" class="govuk-table__header">Enterprise tool in Defra tenant<br><span class="govuk-body-s">for example, M365 Copilot</span></th>
      <th scope="col" class="govuk-table__header">Defra-hosted<br><span class="govuk-body-s">for example, Azure OpenAI in our tenant</span></th>
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
      <td class="govuk-table__cell"><strong>Yes</strong>, with a DPIA and restricted access</td>
      <td class="govuk-table__cell"><strong>Yes</strong>, with a DPIA</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">Personal data</th>
      <td class="govuk-table__cell"><strong>No</strong></td>
      <td class="govuk-table__cell"><strong>DPIA required</strong> before use</td>
      <td class="govuk-table__cell"><strong>DPIA required</strong> before use</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">SECRET (SEC2 or SEC3)</th>
      <td class="govuk-table__cell"><strong>No</strong></td>
      <td class="govuk-table__cell"><strong>No</strong></td>
      <td class="govuk-table__cell"><strong>No</strong></td>
    </tr>
  </tbody>
</table>

## The hard rule

Do not put OFFICIAL-SENSITIVE content, personal data or anything above OFFICIAL into a public consumer tool. Use an enterprise tool in the Defra tenant with a DPIA in place.

## If you do not know how your data is classified

Ask your project's information asset owner, or talk to AICE.

## What to do next

Once you know your data fits the tool, read [Setting up your project](/ai-toolkit/guidance/setting-up-your-project) to get your project ready.

For data handling rules in detail, see [Information governance](/ai-toolkit/guidance/information-governance) and [PII and data handling](/ai-toolkit/guidance/pii-and-data-handling).
