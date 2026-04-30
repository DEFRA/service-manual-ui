---
title: Azure AI Foundry
caption: Tools
description: Microsoft's platform for building and deploying AI applications. Currently in pilot at Defra.
layout: section
sectionTitle: Azure AI Foundry
sectionNav:
  - title: In this section
    items:
      - text: Tools radar
        href: /ai-toolkit/tools
  - title: Endorse
    items:
      - text: GitHub Copilot
        href: /ai-toolkit/tools/github-copilot
  - title: Pilot
    items:
      - text: AWS Bedrock
        href: /ai-toolkit/tools/aws-bedrock
      - text: Azure AI Foundry
        href: /ai-toolkit/tools/azure-ai-foundry
  - title: Assess
    items:
      - text: Model Context Protocol
        href: /ai-toolkit/tools/model-context-protocol
      - text: Agent-to-Agent
        href: /ai-toolkit/tools/agent-to-agent
      - text: LangGraph
        href: /ai-toolkit/tools/langgraph
      - text: Retrieval-augmented generation
        href: /ai-toolkit/tools/retrieval-augmented-generation
      - text: Langfuse
        href: /ai-toolkit/tools/langfuse
      - text: AWS Bedrock AgentCore
        href: /ai-toolkit/tools/aws-bedrock-agentcore
      - text: Claude Code plugin marketplace
        href: /ai-toolkit/tools/claude-code-marketplace
      - text: Git AI
        href: /ai-toolkit/tools/git-ai
  - title: All tools
    items:
      - text: Back to tools radar
        href: /ai-toolkit/tools
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
  - text: Tools radar
    href: /ai-toolkit/tools
  - text: Azure AI Foundry
supportBox:
  title: Get help with Azure AI Foundry
  description: Talk to the AI Capability and Enablement team before using Foundry in delivery.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Help%20with%20Azure%20AI%20Foundry" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

<p class="app-tool-meta">
<strong class="govuk-tag govuk-tag--blue">Pilot</strong>
<span class="app-tool-meta__category">Platform</span>
</p>

Azure AI Foundry is Microsoft's unified platform for enterprise AI operations, launched in November 2024. It consolidates model deployment, fine-tuning and agent development into a single managed service.

The platform provides:

- access to over 100 AI models from Microsoft, OpenAI, Meta and other providers
- a web-based portal at [ai.azure.com](https://ai.azure.com/) and an SDK for development
- project-based isolation for security boundaries
- retrieval-augmented generation (RAG) capabilities
- built-in content safety features

Government departments can use Foundry for document processing, business automation, conversational AI and data analysis while maintaining OFFICIAL data classification requirements.

## What pilot means here

A small number of Defra teams are using Foundry in real delivery, with support from the AI Capability and Enablement team. The team is collecting evidence on cost, performance and integration before recommending wider use.

## Before you start

Do not use Foundry in delivery without talking to the AI Capability and Enablement team. They can advise on tenancy, model choice and the controls you need in place.

## When to consider it

Foundry may be a good fit if you need:

- access to OpenAI and other models through Azure
- to build and evaluate AI agents with managed tooling
- to keep data inside Azure where your service already runs

## Detail

<div class="govuk-accordion" data-module="govuk-accordion" id="foundry-accordion">
<div class="govuk-accordion__section">
<div class="govuk-accordion__section-header">
<h3 class="govuk-accordion__section-heading">
<span class="govuk-accordion__section-button" id="foundry-accordion-heading-1">Privacy and data handling</span>
</h3>
</div>
<div id="foundry-accordion-content-1" class="govuk-accordion__section-content">
<h4 class="govuk-heading-s">Privacy settings</h4>
<ul class="govuk-list govuk-list--bullet">
<li><strong>Network isolation</strong>. Configure private endpoints and restrict internet exposure with "Allow Only Approved Outbound" traffic controls</li>
<li><strong>Virtual network integration</strong>. Connect securely with existing government infrastructure without public internet exposure</li>
<li><strong>Customer-managed encryption keys</strong>. Maintain control through Azure Key Vault with system-assigned or user-assigned managed identities</li>
<li><strong>Project-level isolation</strong>. Separate file storage, thread storage and search indexes between departments and projects</li>
<li><strong>Abuse monitoring opt-out</strong>. Disable data logging for content filtering on sensitive workloads (requires Microsoft approval)</li>
<li><strong>Role-based access control</strong>. Integrate with Microsoft Entra ID, supporting conditional access and multi-factor authentication</li>
<li><strong>IP network rules</strong>. Configure up to 200 specific address ranges for additional access restrictions</li>
</ul>
<h4 class="govuk-heading-s">Terms and data ownership</h4>
<p class="govuk-body">Government organisations engage through the Microsoft Customer Agreement (for direct subscriptions), Enterprise Agreements (for volume licensing), and the Data Protection Addendum (which establishes Microsoft as data processor with GDPR compliance).</p>
<p class="govuk-body">Microsoft commits that:</p>
<ul class="govuk-list govuk-list--bullet">
<li>customer data remains under government control</li>
<li>it will not be used for advertising or model improvement without explicit consent</li>
<li>government data requests will be notified promptly unless legally prohibited</li>
<li>data is processed within customer-designated geographies</li>
</ul>
<p class="govuk-body">The Copilot Copyright Commitment provides indemnification against copyright claims when you use the recommended guardrails.</p>
<h4 class="govuk-heading-s">Where your data goes</h4>
<p class="govuk-body"><strong>Multi-regional processing.</strong> Azure operates two UK data centres certified to ISO 27001, SOC 2 and PCI DSS. UK South in London and UK West in Cardiff. Geography-based storage controls keep customer data within UK borders. Data at rest stays within the UK geography, with Microsoft only replicating between UK regions for redundancy. Single region residency is available when absolute data locality is required.</p>
<p class="govuk-body">The service is approved for UK OFFICIAL data through G-Cloud certification. SECRET and TOP SECRET classifications require additional secure networks beyond standard offerings.</p>
<p class="govuk-body"><strong>In transit.</strong> HTTPS with minimum TLS 1.2 and Perfect Forward Secrecy. 2048-bit RSA or 256-bit ECC keys for key exchange. MACsec encryption (IEEE 802.1AE) between Azure data centres. SHA-384 message authentication and AES-256 data encryption. These exceed NCSC Principle 1 requirements for data in transit.</p>
<p class="govuk-body"><strong>At rest.</strong> FIPS 140-2 compliant 256-bit AES encryption for all data, transparent to applications. Customer-managed keys are available through Hardware Security Modules in Azure Key Vault. Double encryption is available for additional protection layers.</p>
<h4 class="govuk-heading-s">Data retention</h4>
<p class="govuk-body">Foundry holds no default retention for prompts and completions in the base service. They are processed in real time without storage. Deleted resources enter a 48-hour recovery window before permanent purging.</p>
<p class="govuk-body">Customer-controlled retention policies let departments configure storage lifecycle from days to years. Log Analytics retention defaults to 30 days and extends up to 12 years for compliance needs.</p>
<p class="govuk-body">Fine-tuning data stays under your control until you delete it, and is never used for model improvement without consent. Cryptographic erasure through customer-managed key revocation immediately renders encrypted data unrecoverable, supporting data subject requests.</p>
</div>
</div>
<div class="govuk-accordion__section">
<div class="govuk-accordion__section-header">
<h3 class="govuk-accordion__section-heading">
<span class="govuk-accordion__section-button" id="foundry-accordion-heading-2">Audit and access</span>
</h3>
</div>
<div id="foundry-accordion-content-2" class="govuk-accordion__section-content">
<h4 class="govuk-heading-s">Auditing</h4>
<p class="govuk-body">Azure Monitor provides comprehensive audit logging:</p>
<ul class="govuk-list govuk-list--bullet">
<li>three log categories. Control and management operations, data plane interactions, and security alerts from Microsoft Defender</li>
<li>90-day default retention, extending up to 12 years through Log Analytics</li>
<li>export in CSV, JSON and other formats via PowerShell, Azure CLI and REST APIs</li>
<li>real-time streaming to SIEM systems through Azure Event Hubs</li>
<li>immutability features. System-generated logs cannot be modified, and WORM blob storage is available for archives</li>
</ul>
<p class="govuk-body">The platform meets NCSC audit requirements (Principle 13) and integrates natively with Microsoft Sentinel and other government SIEM platforms such as Splunk and QRadar.</p>
<h4 class="govuk-heading-s">Access controls</h4>
<p class="govuk-body"><strong>Authentication:</strong></p>
<ul class="govuk-list govuk-list--bullet">
<li>single sign-on across government Microsoft 365 estates</li>
<li>multi-factor authentication (mobile apps, SMS, voice calls, smart cards)</li>
<li>managed identities with automatic credential rotation</li>
<li>service principals with certificate and secret-based options</li>
</ul>
<p class="govuk-body"><strong>Role-based access control:</strong></p>
<ul class="govuk-list govuk-list--bullet">
<li>five dedicated AI service roles (User, Developer, Project Manager, Account Owner, Administrator)</li>
<li>integration with 65+ built-in Azure roles</li>
<li>Privileged Identity Management for just-in-time access</li>
<li>approval workflows and time-bound assignments</li>
</ul>
<p class="govuk-body"><strong>Zero-trust architecture:</strong> continuous verification, least-privilege access, device compliance checking and network micro-segmentation. SAML 2.0 and OpenID Connect support integration with existing government identity providers.</p>
</div>
</div>
<div class="govuk-accordion__section">
<div class="govuk-accordion__section-header">
<h3 class="govuk-accordion__section-heading">
<span class="govuk-accordion__section-button" id="foundry-accordion-heading-3">Compliance and certifications</span>
</h3>
</div>
<div id="foundry-accordion-content-3" class="govuk-accordion__section-content">
<p class="govuk-body"><strong>International:</strong> ISO/IEC 27001:2022, ISO/IEC 42001:2023 (AI management systems, achieved 2024), SOC 1, 2 and 3 reports.</p>
<p class="govuk-body"><strong>UK:</strong> Cyber Essentials Plus with annual third-party validation, G-Cloud Framework listing for UK OFFICIAL data, NCSC 14 Cloud Security Principles compliance through annual attestation, GDPR and UK Data Protection Act 2018 compliance.</p>
<p class="govuk-body"><strong>Sector:</strong> UK NHS Azure Policy initiatives, PCI DSS for payment processing, FCA alignment for financial services. Over 90 compliance offerings are accessible through the Microsoft Service Trust Portal.</p>
<p class="govuk-body">Foundry is technically suitable for UK government adoption for OFFICIAL data workloads, contingent on appropriate configuration of privacy settings, implementation of recommended security controls, and adherence to government AI regulatory principles. Departments handling SECRET or TOP SECRET classifications need additional security arrangements beyond the standard offering.</p>
</div>
</div>
</div>
