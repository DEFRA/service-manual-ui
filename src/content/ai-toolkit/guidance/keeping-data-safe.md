---
title: Keeping data safe
caption: Deliver with AI
description: "Two things decide whether you can use Defra data with AI: how it is classified, and whether it contains personal data. The rules on personal data are mandatory."
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
  - text: Keeping data safe
supportBox:
  title: Get help with this
  description: Ask the AI Capability and Enablement team for advice or hands-on support.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Keeping%20data%20safe%20with%20AI" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

## Use AI tools on OFFICIAL data only by default

The default position is that you only use AI tools on source material classified as OFFICIAL.

OFFICIAL-SENSITIVE and personal data are permitted only in specific tools, and only with the approvals on this page. The [Using data with AI](/ai-toolkit/guidance/using-data-with-ai) matrix shows exactly what you can put where.

Do not use AI tools with SECRET or TOP SECRET material.

If you are unsure about the classification of your source material, stop and ask your information asset owner before proceeding.

## Where your data goes

Generative AI tools send your prompts and content to models hosted by external providers. Depending on the tool, that data may be routed to:

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li>Anthropic</li>
<li>OpenAI</li>
<li>Microsoft, including Microsoft 365 Copilot and Azure OpenAI</li>
<li>Google</li>
<li>Amazon, through Bedrock</li>
<li>another provider</li>
</ul>

Some tools can be configured to use approved cloud platforms, for example [AWS Bedrock](/ai-toolkit/tools/aws-bedrock) or [Azure AI Foundry](/ai-toolkit/tools/azure-ai-foundry). These keep data in regions and tenancies that meet UK government requirements.

For what you can put into a specific tool, see [Using data with AI](/ai-toolkit/guidance/using-data-with-ai).

## Remove personal data from anything you put in

You must remove all personal data from anything you put into an AI tool to help you work. This is non-negotiable. Personal data is sometimes called personally identifiable information (PII).

That includes:

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li>transcripts of interviews or user research sessions</li>
<li>screenshots and screen recordings</li>
<li>log files and diagnostic data</li>
<li>emails, tickets and free-text fields</li>
<li>test data taken from production</li>
<li>configuration files and connection strings</li>
</ul>

The one exception is a service you are building to process personal data as a designed feature. That needs a Data Protection Impact Assessment (DPIA), completed and signed off before any processing begins.

It is not a shortcut to pasting personal data into an everyday tool.

## What counts as personal data

Personal data is any data that could identify a specific individual, alone or in combination with other data. That includes:

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li>names</li>
<li>email addresses, phone numbers and physical addresses</li>
<li>usernames and customer IDs that link to a person</li>
<li>IP addresses and device identifiers</li>
<li>date of birth and other identifiers</li>
<li>photographs of identifiable people</li>
</ul>

Some types are sensitive personal data, for example health, biometric or financial data, and need extra protection on top of the general rules.

## Removing personal data is your team's responsibility

Whichever tool or process you use to remove personal data, someone on the team must verify the output before it enters the pipeline or gets committed to version control.

If you process screenshots, replace real names and identifiers with fake equivalents before the screenshot is shared with the model.

Some assistants offer plugins that do this automatically. Treat them as a best effort. The team is still responsible for checking that no real personal data remains.

Verify that no personal data remains in:

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li>curated transcripts</li>
<li>HTML mockups generated from screenshots</li>
<li>test data and fixtures</li>
<li>any file you commit to a public or shared repository</li>
</ul>

## Source code can contain personal data too

It is not just transcripts and screenshots. Source code itself can contain personal data through:

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li>configuration files with real email addresses or names</li>
<li>connection strings with usernames</li>
<li>test data hard-coded into tests</li>
<li>sample payloads in API documentation</li>
</ul>

Review source code before committing it to a repository the AI will read.

## If you find personal data in an output

Remove it immediately and do not commit the affected file. Then follow [Report an AI incident](/ai-toolkit/guidance/report-an-ai-incident), which sets out the steps and the deadline for reporting a personal data breach.

## When in doubt, stop

If you are not sure about a classification or how to handle data, do not proceed. Ask the AI Capability and Enablement team (AICE).

Where this guidance and wider Defra policy seem to conflict, Defra policy takes precedence.
