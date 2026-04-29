---
title: Security
caption: Responsible practices
hideServiceNavigation: true
headerServiceName: AI practitioner handbook
headerServiceUrl: /ai-practitioner-handbook
breadcrumbItems:
  - text: Digital Defra
    href: /
  - text: AI practitioner handbook
    href: /ai-practitioner-handbook
  - text: Security
sectionTitle: AI practitioner handbook
layout: section
sectionNav:
  - title: Getting started
    items:
      - text: AI practitioner handbook
        href: /ai-practitioner-handbook
      - text: Workflow
        href: /ai-practitioner-handbook/workflow
      - text: The four pillars
        href: /ai-practitioner-handbook/the-four-pillars
      - text: Choosing models
        href: /ai-practitioner-handbook/choosing-models
      - text: Working mindset
        href: /ai-practitioner-handbook/working-mindset
  - title: Responsible practices
    items:
      - text: Ethics
        href: /ai-practitioner-handbook/ethics
      - text: Security
        href: /ai-practitioner-handbook/security
      - text: Sustainability
        href: /ai-practitioner-handbook/sustainability
  - title: Case studies
    items:
      - text: AI in practice
        href: /ai-practitioner-handbook/case-studies
      - text: NRF Discovery
        href: /ai-practitioner-handbook/nrf-discovery
      - text: IPAFFS replatforming
        href: /ai-practitioner-handbook/ipaffs-replatforming
      - text: PLP cycle time
        href: /ai-practitioner-handbook/plp-cycle-time
      - text: NRF Alpha
        href: /ai-practitioner-handbook/nrf-alpha
  - title: Patterns
    items:
      - text: AI assistant
        href: /ai-practitioner-handbook/ai-assistant
      - text: Green summarisation
        href: /ai-practitioner-handbook/green-summarisation
      - text: Agent swarms
        href: /ai-practitioner-handbook/agent-swarms
      - text: Token optimisation
        href: /ai-practitioner-handbook/token-optimisation
  - title: Lessons learned
    items:
      - text: AI-generated code quality
        href: /ai-practitioner-handbook/ai-code-quality
      - text: Clear governance is essential
        href: /ai-practitioner-handbook/ai-governance
      - text: Always validate AI outputs
        href: /ai-practitioner-handbook/ai-output-validation
  - title: Tools and resources
    items:
      - text: Approved tools
        href: /ai-practitioner-handbook/approved-tools
      - text: Prompt library
        href: /ai-practitioner-handbook/prompt-library
      - text: Tech radar
        href: /ai-practitioner-handbook/tech-radar
supportBox:
  title: Get support
  description: The <strong>AI Capabilities and Enablement team</strong> can help you get started with AI at Defra.
  items:
    - 'Email: <a href="mailto:cctsassurance@defra.gov.uk" class="govuk-link">cctsassurance@defra.gov.uk</a>'
    - '<a href="https://github.com/DEFRA/defra-ai-sdlc" class="govuk-link">AI SDLC Playbook on GitHub</a>'
---

AI-generated code can contain security vulnerabilities. Treat all AI output with the same scrutiny you would apply to any third-party contribution.

## Review for known vulnerabilities

AI models may produce code with common security flaws such as injection attacks, insecure deserialization, or broken access controls. Review generated code against the OWASP Top 10 and other relevant security benchmarks.

## Check for embedded credentials

AI sometimes hardcodes API keys, passwords, or tokens into generated code. Always scan output for secrets before committing. Use secret detection tools as part of your CI pipeline.

## Use static analysis

Run Static Application Security Testing (SAST) tools on all generated code. These catch security issues that manual review might miss. Integrate SAST into your build process so every change is checked automatically.

## Scan dependencies

AI may suggest packages that are outdated or have known vulnerabilities. Use Software Composition Analysis (SCA) tools to check every dependency. Keep libraries up to date and remove unused packages.

## Protect your development environment

Prevent credential leakage by using environment variables and secret management tools. Limit IDE plugins and extensions to trusted vendors. Be cautious with AI tools that require broad access to your codebase or environment.

## Human review remains essential

Automated scanning catches many issues but not all. A human reviewer with security awareness is your last line of defence. Make security review a standard part of every code review, not an optional extra.
