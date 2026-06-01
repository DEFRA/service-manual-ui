---
title: Model Context Protocol (MCP)
caption: Tools
description: Open standard for connecting AI assistants to data sources. Under assessment by the AI Capability and Enablement team — only designated pilot projects can use it.
layout: section
sectionTitle: Model Context Protocol (MCP)
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
  - text: Tools radar
    href: /ai-toolkit/tools
  - text: Model Context Protocol
supportBox:
  title: Get help with Model Context Protocol
  description: The AI Capability and Enablement team is evaluating MCP. Talk to us before using it in delivery.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Help%20with%20Model%20Context%20Protocol" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

<p class="app-tool-meta">
  <strong class="govuk-tag govuk-tag--yellow">Assess</strong>
  <span class="app-tool-meta__category">Framework</span>
</p>

<div class="govuk-inset-text">
  <p class="govuk-body"><strong>Status: under review.</strong> Only designated pilot projects can use MCP until further notice. Talk to the AI Capability and Enablement team before using it in delivery.</p>
</div>

Model Context Protocol (MCP) is an open standard from Anthropic that lets AI assistants access approved systems such as Jira, GitHub, Confluence, Azure DevOps and SonarQube in a controlled way.

## What MCP does

MCP is a protocol that lets AI assistants securely fetch context from external systems when responding to your requests. An MCP server exposes those capabilities to the model and can run:

- on your machine (local)
- in the cloud (remote, vendor-hosted)
- in a hybrid model

For Defra, **remote vendor-hosted MCP servers are preferred** because they provide:

- consistent governance and centralised configuration
- stronger security controls and monitoring
- built-in audit logging
- vendor-managed updates and patches

MCP can give AI access to:

- **code context.** Repositories, branches, pull requests, build logs
- **runtime context.** CI/CD pipelines, telemetry, deployment status
- **work management.** Jira issues, Azure DevOps work items, Confluence pages
- **product and user context.** Analytics, support tickets

## Security and data protection

When you configure MCP, treat tool calls as you would any integration between production systems.

The rules:

- **Never auto-approve MCP actions.** Always review tool calls before they run.
- **Use OAuth-based authentication.** Do not use Personal Access Tokens (PATs).
- **Connect only to vendor-provided MCP servers.** Do not point your assistant at community or self-built MCP servers unless they have been approved by the AI Capability and Enablement team.
- **Apply organisation-wide consistency.** Use the same approved connectors and patterns across teams.

Practical steps:

- Exclude sensitive, personal or client-confidential data from prompts and MCP context
- Redact secrets and credentials from any text you send to the assistant
- Keep secret scanning, dependency scanning and other security tooling active in your CI/CD
- Gate merges using Defra security tooling such as SonarQube (SAST) and any approved DAST tools
- Review and test AI-generated code as you would any third-party code
- Document MCP usage and any known exclusions in your team docs
- Be transparent with your team and stakeholders about where and how AI is used

## Key risks and how to mitigate them

**Prompt injection.** Malicious content in tickets, docs or code attempts to override model rules or leak data. Keep a human in the loop, review tool calls and do not follow instructions that conflict with Defra policies.

**Tool poisoning.** Manipulated tools or data sources provide misleading outputs. Use only trusted vendor MCP connectors and monitor data quality.

**Command injection.** Malicious input causes unintended tool calls or actions. Do not auto-approve actions, and restrict tool scopes to the minimum needed.

## When to use or avoid MCP

Use MCP when:

- you access approved external work systems via vendor-hosted connectors (for example Jira, Confluence, GitHub, Azure DevOps, SonarQube)
- you need to pull or create issues, read documentation, query metadata or scan repositories as part of a task
- you use remote MCP servers with OAuth authentication and clearly defined scopes
- you want to improve context for the model while keeping control over data

Do not use MCP when:

- you want to connect unapproved, community or self-built MCP servers
- you handle Official-Sensitive, SEC2/SEC3, personal or client-confidential data
- your project or programme has not explicitly approved AI tool usage

Any exception needs explicit written approval from the relevant Project Architect and the AI Capability and Enablement team.

## Approved MCP servers

These MCP servers are approved for use in Defra. Do not use other MCP servers unless explicitly approved by the AI Capability and Enablement team.

**Cloud providers**

- [Azure MCP](https://github.com/microsoft/mcp/tree/main/servers/Azure.Mcp.Server)
- [AWS MCP](https://github.com/awslabs/mcp)

**Static analysis (SAST)**

- [SonarQube MCP server](https://docs.sonarsource.com/sonarqube-mcp-server)

**Repositories, backlogs and pipelines**

- [Atlassian / Jira](https://www.atlassian.com/platform/remote-mcp-server)
- [GitHub](https://github.com/github/github-mcp-server)
- [Azure DevOps](https://github.com/microsoft/azure-devops-mcp)

## More on MCP

<div class="govuk-accordion" data-module="govuk-accordion" id="mcp-accordion">

<div class="govuk-accordion__section">
<div class="govuk-accordion__section-header">
<h3 class="govuk-accordion__section-heading">
<span class="govuk-accordion__section-button" id="mcp-accordion-heading-1">Why use MCP</span>
</h3>
</div>
<div id="mcp-accordion-content-1" class="govuk-accordion__section-content">

<p class="govuk-body">Use MCP when you need an AI assistant to work with real project data while keeping control of what it can see and do.</p>

<p class="govuk-body">Benefits include:</p>

<ul class="govuk-list govuk-list--bullet">
<li><strong>Improved accuracy.</strong> The AI can see the right tickets, documents and code, so answers are grounded in your project reality</li>
<li><strong>Controlled data sharing.</strong> Only approved data sources and scopes are exposed</li>
<li><strong>Reusable integrations.</strong> Standard connectors work across teams and services</li>
<li><strong>Reduced complexity.</strong> You avoid one-off scripts and bespoke API wrappers</li>
<li><strong>Trust and transparency.</strong> You can trace where information came from and what tools were used</li>
</ul>

</div>
</div>

<div class="govuk-accordion__section">
<div class="govuk-accordion__section-header">
<h3 class="govuk-accordion__section-heading">
<span class="govuk-accordion__section-button" id="mcp-accordion-heading-2">Governance and best practice</span>
</h3>
</div>
<div id="mcp-accordion-content-2" class="govuk-accordion__section-content">

<ul class="govuk-list govuk-list--bullet">
<li>Trust only <strong>vendor-provided</strong> MCP servers that have been assessed by Defra</li>
<li>Prefer <strong>remote</strong> MCP servers, and verify vendor domains and TLS certificates</li>
<li>Pin MCP server versions where possible and maintain a simple change log</li>
<li>Use OAuth2 with least-privilege scopes and rotate tokens regularly</li>
<li>Restrict access to only the repositories, projects and workspaces you need</li>
<li>Do not add personal or confidential data to prompts</li>
<li>Do not share credentials or API keys</li>
<li>Record significant AI usage and decisions in your project documentation</li>
</ul>

</div>
</div>

<div class="govuk-accordion__section">
<div class="govuk-accordion__section-header">
<h3 class="govuk-accordion__section-heading">
<span class="govuk-accordion__section-button" id="mcp-accordion-heading-3">Embedding MCP in delivery</span>
</h3>
</div>
<div id="mcp-accordion-content-3" class="govuk-accordion__section-content">

<p class="govuk-body">MCP should support existing delivery practices, not replace them.</p>

<ul class="govuk-list govuk-list--bullet">
<li>Enable MCP at enterprise level for secure access to approved systems</li>
<li>Configure your IDE or assistant to use only trusted vendor MCP servers</li>
<li>Keep humans in control of tool calls and merging changes</li>
<li>Combine MCP with clear requirements, good prompts, rules and instructions, and a capable model</li>
</ul>

</div>
</div>

<div class="govuk-accordion__section">
<div class="govuk-accordion__section-header">
<h3 class="govuk-accordion__section-heading">
<span class="govuk-accordion__section-button" id="mcp-accordion-heading-4">Quick checklist</span>
</h3>
</div>
<div id="mcp-accordion-content-4" class="govuk-accordion__section-content">

<p class="govuk-body">Use this when configuring or reviewing MCP usage:</p>

<ul class="govuk-list govuk-list--bullet">
<li>use only vendor-provided, remote MCP servers</li>
<li>authenticate via OAuth with least-privilege scopes</li>
<li>exclude sensitive, personal or client data from prompts and context</li>
<li>keep secret scanning and security tooling enabled</li>
<li>maintain human-in-the-loop approval for tool actions</li>
<li>document MCP usage and material AI assistance in project docs</li>
<li>follow Defra AI, security and legal guidelines</li>
</ul>

</div>
</div>

</div>

## Learn more

Read the [Model Context Protocol overview](https://modelcontextprotocol.io/overview) on the official site.
