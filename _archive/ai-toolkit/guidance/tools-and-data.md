---
title: Tools and data
caption: Deliver with AI
description: Which AI tools you can use, and what data you can put into them.
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
      - text: Get approval before you build
        href: /ai-toolkit/guidance/get-approval
      - text: AI in your CI/CD pipeline
        href: /ai-toolkit/guidance/ai-in-pipelines
      - text: Test and assure your AI service
        href: /ai-toolkit/guidance/test-and-assure
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
  - text: Tools and data
supportBox:
  title: Ask AICE about a tool or data
  description: Get advice on a tool that is not yet on the radar, or check a specific data set before you use it.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Tools%20and%20data" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

<p class="govuk-body-l">Before you use AI for Defra work, two things need to check out: the tool, and the data you put into it.</p>

A simple test before you put anything into an AI tool: if you would not hand it to a third party outside Defra, do not hand it to AI. You stay accountable for what comes out, too. See [Ethics](/ai-toolkit/guidance/ethics).

## Tools you can use

Check the [tools radar](/ai-toolkit/tools) before you use any AI tool on Defra work. Each tool on the radar has a status. The status tells you what you can do.

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li><strong>Endorse.</strong> You can use it for Defra work, within the data rules below.</li>
<li><strong>Pilot.</strong> Only allowed in approved pilot work.</li>
<li><strong>Assess.</strong> Experimentation only. Talk to AICE before any production use.</li>
<li><strong>Avoid.</strong> Do not use it on Defra work.</li>
</ul>

Anything not on the radar needs an AICE review before you use it on Defra work.

## Turn on privacy settings

You must turn on privacy settings before using any AI assistant on Defra work.

Privacy settings stop your code and data from being stored on AI providers' servers. They also prevent your data being used to train AI models.

For tool-specific settings, see the page for your assistant in the [tools radar](/ai-toolkit/tools).

## AI is hidden in tools you already use

AI is built into many everyday tools, and it is not always obvious. The same rules apply whenever a tool can see Defra data. Watch for:

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li>Microsoft Copilot, which is on by default in Windows and Office</li>
<li>meeting note-takers in Teams or Zoom, and tools like Granola</li>
<li>AI features in Slack, Miro and Mural</li>
<li>browser extensions and desktop assistants that can read your screen or files</li>
</ul>

If you are not sure whether an integrated AI tool is safe to use with Defra data, check the [tools radar](/ai-toolkit/tools) or ask AICE.

## Data you can put in

What data you can put into an AI tool depends on its classification and the type of tool.

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
      <td class="govuk-table__cell"><strong>Yes</strong></td>
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

Do not put OFFICIAL-SENSITIVE content, personal data or anything above OFFICIAL into a public consumer tool. Use an enterprise tool in the Defra tenant.

OFFICIAL-SENSITIVE and personal data are only allowed with the approvals set out in [Information governance](/ai-toolkit/guidance/information-governance), including a DPIA where personal data is involved.

## If you do not know how your data is classified

Ask your project's information asset owner, or talk to AICE. If you do not know who your information asset owner is, your delivery manager or service owner can tell you. Do not proceed until you know.

## What to do next

For data handling rules in detail, see [Information governance](/ai-toolkit/guidance/information-governance) and [PII and data handling](/ai-toolkit/guidance/pii-and-data-handling).

If you are working with agents in a build pipeline, see [AI in your CI/CD pipeline](/ai-toolkit/guidance/ai-in-pipelines).
