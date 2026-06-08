---
title: Using data with AI
caption: Deliver with AI
description: What data you can put into an AI tool depends on its classification and the type of tool.
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
  - text: Using data with AI
supportBox:
  title: Ask AICE about data
  description: Check a specific data set, or get advice when a row in the table does not fit your situation.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Using%20data%20with%20AI" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

## How to read this table

This table shows the default position for each combination of data and tool type. It is a starting point, not a substitute for judgement.

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li>A <strong>Yes</strong> means allowed, sometimes only when a condition is met. Read the condition.</li>
<li>A <strong>No</strong> means do not do it.</li>
<li>Some cells carry a condition, like privacy settings or a Data Protection Impact Assessment (DPIA). The conditions are explained below the table.</li>
<li>If your situation does not fit a row, or you are unsure, stop and check before you proceed.</li>
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
<li><strong>With privacy settings on.</strong> Model training and chat history are turned off. See <a href="/ai-toolkit/guidance/choosing-a-tool" class="govuk-link">Choosing a tool</a>.</li>
<li><strong>DPIA required.</strong> The assessment must be completed and signed off before any processing begins. <a href="https://forms.office.com/pages/responsepage.aspx?id=UCQKdycCYkyQx044U38RAjG4bU8jIdlOvpH2L94GfqZUQUFDOTMwWk00WEtWU1RUNlNPRjRMVk01OSQlQCN0PWcu&amp;route=shorturl" class="govuk-link">Start the AI DPIA screening</a>.</li>
<li><strong>The defaults can move.</strong> A specific data set or use case may need more or fewer controls.</li>
</ul>

For personal data, the DPIA route is for a service you are building to process it, not a way to paste it into an everyday tool. For everyday use, remove personal data first.

## What the tool types mean

The type of tool decides what data you can use with it. Check which type you are using.

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li><strong>Public consumer tool.</strong> A tool anyone can use over the internet on a free or personal account, like the free tier of ChatGPT. Your data may leave the UK and train the model unless you turn that off.</li>
<li><strong>Enterprise tool in the Defra tenant.</strong> A tool you use through your Defra account in Microsoft 365, like M365 Copilot. Defra's data boundary and security controls apply.</li>
<li><strong>Defra-hosted.</strong> A model running on infrastructure Defra controls, like Azure OpenAI or Bedrock in a Defra tenancy. It is not self-serve for OFFICIAL-SENSITIVE or personal data, so talk to the AI Capability and Enablement team (AICE) first.</li>
</ul>

## Which device you can use

Your device matters as much as the tool. The rules here assume a Defra-managed device, such as a Defra laptop or virtual desktop.

On a personal or business device that Defra does not manage, sometimes called bring your own device or BYOD:

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li>you can use approved AI tooling with public or OFFICIAL information</li>
<li>you must never put OFFICIAL-SENSITIVE content or personal data into an AI tool</li>
</ul>

OFFICIAL-SENSITIVE content and personal data are only allowed on a Defra laptop or virtual desktop, through Microsoft 365 Copilot in the Defra environment.

If you are unsure what your device allows, stop and ask AICE.

## If you do not know how your data is classified

Ask your project's information asset owner, or talk to AICE. If you do not know who your information asset owner is, your delivery manager or service owner can tell you. Do not proceed until you know.

## What to do next

For data handling rules in detail, see [Keeping data safe](/ai-toolkit/guidance/keeping-data-safe).
