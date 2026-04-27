---
title: GitHub Copilot
caption: Tools
description: AI pair programmer that suggests code as you type. Endorsed for use across Defra delivery teams.
layout: section
sectionTitle: GitHub Copilot
sectionNav:
  - title: Endorsed
    items:
      - text: GitHub Copilot
        href: /ai-playbook/tools/github-copilot
  - title: In pilot
    items:
      - text: AWS Bedrock
        href: /ai-playbook/tools/aws-bedrock
      - text: Azure AI Foundry
        href: /ai-playbook/tools/azure-ai-foundry
  - title: Assess
    items:
      - text: Model Context Protocol
        href: /ai-playbook/tools/model-context-protocol
      - text: Agent-to-Agent
        href: /ai-playbook/tools/agent-to-agent
      - text: LangGraph
        href: /ai-playbook/tools/langgraph
      - text: Retrieval-augmented generation
        href: /ai-playbook/tools/retrieval-augmented-generation
      - text: Langfuse
        href: /ai-playbook/tools/langfuse
      - text: AWS Bedrock AgentCore
        href: /ai-playbook/tools/aws-bedrock-agentcore
      - text: Claude Code plugin marketplace
        href: /ai-playbook/tools/claude-code-marketplace
      - text: Git AI
        href: /ai-playbook/tools/git-ai
  - title: All tools
    items:
      - text: Back to tools radar
        href: /ai-playbook/tools
customNav:
  - text: Home
    href: /
  - text: Patterns
    href: /ai-playbook/patterns
  - text: Guidance
    href: /ai-playbook/guidance
  - text: Tools
    href: /ai-playbook/tools
headerServiceName: AI playbook
headerServiceUrl: /ai-playbook
breadcrumbItems:
  - text: Digital Defra
    href: /
  - text: AI playbook
    href: /ai-playbook
  - text: Tools radar
    href: /ai-playbook/tools
  - text: GitHub Copilot
supportBox:
  title: Get help with GitHub Copilot
  description: Ask the AI Capability and Enablement team about setup, security or how to get the most out of it.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Help%20with%20GitHub%20Copilot" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

<p class="app-tool-meta">
<strong class="govuk-tag govuk-tag--green">Endorse</strong>
<span class="app-tool-meta__category">Tool</span>
</p>

GitHub Copilot for Business is an AI-powered coding assistant that works in common code editors and on GitHub. It predicts and suggests code based on natural language prompts and the surrounding context. The Business tier adds seat-based licensing, central admin controls and enterprise-grade privacy safeguards.

It works in VS Code, Visual Studio, JetBrains IDEs, Neovim and the GitHub CLI.

## When to use it

Copilot suits day-to-day development tasks where you want to move faster:

- writing boilerplate, helper functions or unit tests
- exploring an unfamiliar API or library
- translating code between languages
- generating documentation or commit messages

## When not to use it

Treat Copilot as a junior pair programmer, not an expert:

- always review suggestions before accepting them
- do not paste classified or sensitive data into prompts
- check security-critical logic by hand and through automated testing
- do not commit suggestions you do not understand

Copilot is not yet suitable for OFFICIAL-SENSITIVE or above unless your team has completed a departmental risk assessment.

## Detail

<div class="govuk-accordion" data-module="govuk-accordion" id="copilot-accordion">
<div class="govuk-accordion__section">
<div class="govuk-accordion__section-header">
<h3 class="govuk-accordion__section-heading">
<span class="govuk-accordion__section-button" id="copilot-accordion-heading-1">Privacy and data handling</span>
</h3>
</div>
<div id="copilot-accordion-content-1" class="govuk-accordion__section-content">
<h4 class="govuk-heading-s">Privacy controls</h4>
<p class="govuk-body">The Business plan turns off data collection for model training by default. Available controls include:</p>
<ul class="govuk-list govuk-list--bullet">
<li><strong>Public code filtering</strong>. Stops suggestions that closely match public GitHub code</li>
<li><strong>Content exclusions</strong>. Admins can exclude specific paths so they are never referenced in prompts or suggestions</li>
<li><strong>No retention of prompts or completions</strong>. Prompts and completions are not used for training</li>
<li><strong>Choice of AI model</strong>. Organisations can turn off third-party models so all processing stays on Microsoft and GitHub infrastructure</li>
<li><strong>Organisation-wide enforcement</strong>. Privacy settings are set once and cannot be overridden by individual users</li>
</ul>
<h4 class="govuk-heading-s">Terms and data ownership</h4>
<p class="govuk-body">GitHub's Terms for Copilot and the GitHub Privacy Statement apply. The Business plan contractually confirms that:</p>
<ul class="govuk-list govuk-list--bullet">
<li>customer code, prompts and completions are not used for model training</li>
<li>data protection is provided under the Microsoft Online Services Data Protection Addendum</li>
<li>international transfers rely on the EU-US Data Privacy Framework and Standard Contractual Clauses</li>
</ul>
<h4 class="govuk-heading-s">Where your data goes</h4>
<p class="govuk-body"><strong>Processing locations.</strong> Inference requests are routed through Microsoft-owned infrastructure. Primary processing happens in EU and US Azure regions. UK-only processing cannot yet be mandated.</p>
<p class="govuk-body"><strong>In transit.</strong> All traffic uses TLS 1.2 or higher. Requests are proxied through GitHub so developer IPs are not exposed downstream.</p>
<p class="govuk-body"><strong>At rest.</strong> Minimal telemetry (time-stamped hashes, seat identifiers) is stored in encrypted Azure SQL and Log Analytics. Source code, prompts and completions are discarded once the response is returned.</p>
<h4 class="govuk-heading-s">Data retention</h4>
<p class="govuk-body">For normal usage in an IDE or plugin, Copilot does not retain prompts or suggestions. They are processed in memory and discarded once the suggestion is delivered.</p>
<p class="govuk-body">If you use Copilot Chat on GitHub.com, Copilot CLI, or Copilot in GitHub Mobile, prompts and responses are retained for up to 28 days to maintain conversation state.</p>
<p class="govuk-body">User engagement and usage logs are retained for 2 years.</p>
</div>
</div>
<div class="govuk-accordion__section">
<div class="govuk-accordion__section-header">
<h3 class="govuk-accordion__section-heading">
<span class="govuk-accordion__section-button" id="copilot-accordion-heading-2">Audit and access</span>
</h3>
</div>
<div id="copilot-accordion-content-2" class="govuk-accordion__section-content">
<h4 class="govuk-heading-s">Audit logs</h4>
<p class="govuk-body">Operational logs are kept for 7 to 30 days. They contain telemetry, never raw code. The organisation audit log records:</p>
<ul class="govuk-list govuk-list--bullet">
<li>policy and settings changes (including the public-code-suggestion toggle and content-exclusion rules)</li>
<li>seat assignment events such as <code>copilot.cfb_seat_assignment_created</code></li>
</ul>
<p class="govuk-body">Audit data is retained for at least 180 days. Admins can export aggregated usage reports through the GitHub REST API. The contents of code suggestions and prompts are not logged.</p>
<h4 class="govuk-heading-s">Access controls</h4>
<ul class="govuk-list govuk-list--bullet">
<li>GitHub SSO and SAML 2.0 integration with conditional access</li>
<li>Role-based access (organisation owner, security manager, billing manager)</li>
<li>Just-in-time privileged access for GitHub staff with full audit trail</li>
</ul>
</div>
</div>
<div class="govuk-accordion__section">
<div class="govuk-accordion__section-header">
<h3 class="govuk-accordion__section-heading">
<span class="govuk-accordion__section-button" id="copilot-accordion-heading-3">Compliance and certifications</span>
</h3>
</div>
<div id="copilot-accordion-content-3" class="govuk-accordion__section-content">
<ul class="govuk-list govuk-list--bullet">
<li>SOC 2 Type II, ISO 27001 and ISO 27018, and CSA STAR certifications cover the underlying GitHub platform</li>
<li>Aligns with GDPR principles and UK GDPR</li>
<li>Microsoft's cloud meets FIPS 140-2 encryption standards for both transit and storage, satisfying the NCSC Cloud Security Principle for protecting data in transit</li>
</ul>
</div>
</div>
<div class="govuk-accordion__section">
<div class="govuk-accordion__section-header">
<h3 class="govuk-accordion__section-heading">
<span class="govuk-accordion__section-button" id="copilot-accordion-heading-4">Setup and licensing</span>
</h3>
</div>
<div id="copilot-accordion-content-4" class="govuk-accordion__section-content">
<p class="govuk-body">Copilot for Business is provisioned per-user as a "seat". Organisation owners or admins assign seats to individual developers or teams. Only users with an assigned seat can use Copilot under the organisation's subscription. Removing the seat immediately revokes access.</p>
<p class="govuk-body">The official site: <a class="govuk-link" href="https://github.com/features/copilot">github.com/features/copilot</a>.</p>
</div>
</div>
</div>
