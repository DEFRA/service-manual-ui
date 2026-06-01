---
title: Security
caption: Deliver with AI
description: How to keep AI-generated code, secrets, and your development environment secure.
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
  - text: Security
supportBox:
  title: Get help with this
  description: Ask the AI Capability and Enablement team for advice or hands-on support.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Help%20with%20AI%20security" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

<p class="govuk-body-l">AI-generated code can contain security vulnerabilities. Treat all AI output with the same scrutiny you would apply to any third-party contribution.</p>

## Review for known vulnerabilities

AI models may produce code with common security flaws such as injection attacks, insecure deserialisation, or broken access controls. Review generated code against the OWASP Top 10 and other relevant security benchmarks.

## Check for embedded credentials

AI sometimes hardcodes API keys, passwords, or tokens into generated code. Always scan output for secrets before committing. Use secret detection tools as part of your CI pipeline.

## Use static analysis

Run Static Application Security Testing (SAST) tools on all generated code. These catch security issues that manual review might miss. Integrate SAST into your build process so every change is checked automatically.

## Scan dependencies

AI may suggest packages that are outdated or have known vulnerabilities. Use Software Composition Analysis (SCA) tools to check every dependency. Keep libraries up to date and remove unused packages.

## Protect your development environment

Prevent credential leakage by using environment variables and secret management tools. Limit IDE plugins and extensions to trusted vendors. Be cautious with AI tools that require broad access to your codebase or environment.

## Human review remains essential

Automated tools catch a lot but not everything. A human review of AI-generated code remains essential, especially for security-critical paths. Pair on the review when you can.
