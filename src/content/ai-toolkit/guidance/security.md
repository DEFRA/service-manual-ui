---
title: Security
caption: Deliver with AI
description: AI-generated code can contain security vulnerabilities. Treat all AI output with the same scrutiny you would apply to any third-party contribution.
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
  - text: Security
supportBox:
  title: Get help with this
  description: Ask the AI Capability and Enablement team for advice or hands-on support.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Help%20with%20AI%20security" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

AI-authored code is held to the same standard as anything else you ship. It must clear the same Defra security gates as hand-written code, and an AI feature still faces a service assessment.

## Review for known vulnerabilities

AI models may produce code with common security flaws such as injection attacks, insecure deserialisation, or broken access controls. Review generated code against the OWASP Top 10 and other relevant security benchmarks.

## Check for embedded credentials

AI sometimes hardcodes API keys, passwords, or tokens into generated code. Always scan output for secrets before committing. Keep the secret scanning in your Core Delivery Platform (CDP) pipeline switched on so this is caught automatically.

## Stop AI coding tools reading secrets

AI coding assistants index your whole project directory, which means they can read `.env` files, credentials and config. Add an ignore file so the assistant skips anything sensitive:

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li>GitHub Copilot: <code>.github/copilot-ignore</code></li>
</ul>

The same applies to any tool that can read your files or terminal, not just chat windows where you paste text.

## Use static analysis

Run SonarQube, Defra's static analysis gate, on all AI-generated code. It catches security issues that manual review might miss. AI-authored code must pass it before merge.

## Scan dependencies

AI may suggest packages that are outdated or have known vulnerabilities. Use Software Composition Analysis (SCA) tools to check every dependency. Keep libraries up to date and remove unused packages.

## Protect your development environment

Prevent credential leakage by using environment variables and secret management tools. Limit IDE plugins and extensions to trusted vendors. Limit AI tools that require broad access to your codebase or environment.

## Treat AI output as untrusted input

Prompt injection, where hidden instructions are buried in the content an AI reads, cannot be fully fixed. The National Cyber Security Centre advises reducing its impact rather than relying on a mitigation that solves it.

Never let raw AI output trigger a privileged action on its own. Keep a human approval step between the model and anything that writes to a database, runs a command, or merges code.

## Human review remains essential

Automated tools catch a lot but not everything. A human review of AI-generated code remains essential. For security-critical paths, a second reviewer is required.
