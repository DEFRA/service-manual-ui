---
title: Security
caption: Responsible AI
description: How to keep AI-generated code, secrets, and your development environment secure.
layout: section
sectionTitle: Guidance
sectionNav:
  - title: In this section
    items:
      - text: Guidance
        href: /ai-toolkit/guidance
  - title: Get started
    items:
      - text: Welcome to AI at Defra
        href: /ai-toolkit/guidance/welcome
      - text: Choosing models
        href: /ai-toolkit/guidance/choosing-models
      - text: Working mindset
        href: /ai-toolkit/guidance/working-mindset
      - text: The four pillars
        href: /ai-toolkit/guidance/four-pillars
      - text: Setting up your project
        href: /ai-toolkit/guidance/setting-up-your-project
      - text: Training and resources
        href: /ai-toolkit/guidance/training-and-resources
  - title: Working with AI
    items:
      - text: The AI development workflow
        href: /ai-toolkit/guidance/workflow
      - text: Writing good prompts
        href: /ai-toolkit/guidance/writing-good-prompts
      - text: Generating requirements
        href: /ai-toolkit/guidance/generating-requirements
      - text: Feature development with AI
        href: /ai-toolkit/guidance/feature-development
      - text: Rules for AI in your repo
        href: /ai-toolkit/guidance/rules-for-ai
      - text: MCP servers and integrations
        href: /ai-toolkit/guidance/mcp-servers
      - text: Cost and tokens
        href: /ai-toolkit/guidance/cost-and-tokens
  - title: Responsible AI
    items:
      - text: Ethics
        href: /ai-toolkit/guidance/ethics
      - text: Security
        href: /ai-toolkit/guidance/security
      - text: Sustainability
        href: /ai-toolkit/guidance/sustainability
      - text: Information governance
        href: /ai-toolkit/guidance/information-governance
      - text: PII and data handling
        href: /ai-toolkit/guidance/pii-and-data-handling
customNav:
  - text: Home
    href: /
  - text: Guidance
    href: /ai-toolkit/guidance
  - text: Tools
    href: /ai-toolkit/tools
  - text: Patterns
    href: /ai-toolkit/patterns
  - text: From the field
    href: /ai-toolkit/from-the-field
headerServiceName: AI digital toolkit
headerServiceUrl: /ai-toolkit
breadcrumbItems:
  - text: Digital Defra
    href: /
  - text: AI digital toolkit
    href: /ai-toolkit
  - text: Guidance
    href: /ai-toolkit/guidance
  - text: Security
supportBox:
  title: Get help with this
  description: Ask the AI Capability and Enablement team for advice or hands-on support.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Help%20with%20AI%20security" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

AI-generated code can contain security vulnerabilities. Treat all AI output with the same scrutiny you would apply to any third-party contribution.

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
