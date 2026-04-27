---
title: MCP servers and integrations
caption: Working with AI
description: How to use Model Context Protocol safely. What is approved at Defra, what is not, and how to integrate it with your work.
layout: section
sectionTitle: Guidance
sectionNav:
  - title: Get started
    items:
      - text: Welcome to AI at Defra
        href: /ai-playbook/guidance/welcome
      - text: Choosing models
        href: /ai-playbook/guidance/choosing-models
      - text: Working mindset
        href: /ai-playbook/guidance/working-mindset
      - text: The four pillars
        href: /ai-playbook/guidance/four-pillars
      - text: Setting up your project
        href: /ai-playbook/guidance/setting-up-your-project
      - text: Training and resources
        href: /ai-playbook/guidance/training-and-resources
  - title: Working with AI
    items:
      - text: The AI development workflow
        href: /ai-playbook/guidance/workflow
      - text: Writing good prompts
        href: /ai-playbook/guidance/writing-good-prompts
      - text: Generating requirements
        href: /ai-playbook/guidance/generating-requirements
      - text: Feature development with AI
        href: /ai-playbook/guidance/feature-development
      - text: Rules for AI in your repo
        href: /ai-playbook/guidance/rules-for-ai
      - text: MCP servers and integrations
        href: /ai-playbook/guidance/mcp-servers
  - title: Responsible AI
    items:
      - text: Ethics
        href: /ai-playbook/guidance/ethics
      - text: Security
        href: /ai-playbook/guidance/security
      - text: Sustainability
        href: /ai-playbook/guidance/sustainability
      - text: Information governance
        href: /ai-playbook/guidance/information-governance
      - text: PII and data handling
        href: /ai-playbook/guidance/pii-and-data-handling
  - title: From the field
    items:
      - text: Case studies
        href: /ai-playbook/case-studies
      - text: Lessons learned
        href: /ai-playbook/lessons-learned
      - text: Cost and tokens
        href: /ai-playbook/guidance/cost-and-tokens
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
  - text: Guidance
    href: /ai-playbook/guidance
  - text: MCP servers and integrations
supportBox:
  title: Get help with this
  description: Ask the AI Capability and Enablement team for advice or hands-on support.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Help%20with%20MCP%20servers" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

**Status:** MCP is currently under review at Defra. Only designated pilot projects can use MCP until further notice.

[Model Context Protocol](/ai-playbook/tools/model-context-protocol) (MCP) lets an AI assistant access approved systems such as Jira, GitHub, Confluence, Azure DevOps and SonarQube in a controlled way. This page explains how to use MCP safely within Defra and how it fits with the rest of this guidance.

## What is MCP?

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

## When to consider MCP

Use MCP when you need an AI assistant to work with real project data while keeping control of what it can see and do.

Benefits include:

- **Improved accuracy.** The AI can see the right tickets, documents and code, so answers are grounded in your project reality
- **Controlled data sharing.** Only approved data sources and scopes are exposed
- **Reusable integrations.** Standard connectors work across teams and services
- **Reduced complexity.** You avoid one-off scripts and bespoke API wrappers
- **Trust and transparency.** You can trace where information came from and what tools were used

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

## Governance and best practice

- Trust only **vendor-provided** MCP servers that have been assessed by Defra
- Prefer **remote** MCP servers, and verify vendor domains and TLS certificates
- Pin MCP server versions where possible and maintain a simple change log
- Use OAuth2 with least-privilege scopes and rotate tokens regularly
- Restrict access to only the repositories, projects and workspaces you need
- Do not add personal or confidential data to prompts
- Do not share credentials or API keys
- Record significant AI usage and decisions in your project documentation

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

## Embedding MCP in delivery

MCP should support existing delivery practices, not replace them.

- Enable MCP at enterprise level for secure access to approved systems
- Configure your IDE or assistant to use only trusted vendor MCP servers
- Keep humans in control of tool calls and merging changes
- Combine MCP with the [four pillars](/ai-playbook/guidance/four-pillars): clear requirements, good prompts, rules and instructions, capable model

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

## Summary checklist

Use this checklist when configuring or reviewing MCP usage:

- use only vendor-provided, remote MCP servers
- authenticate via OAuth with least-privilege scopes
- exclude sensitive, personal or client data from prompts and context
- keep secret scanning and security tooling enabled
- maintain human-in-the-loop approval for tool actions
- document MCP usage and material AI assistance in project docs
- follow Defra AI, security and legal guidelines
