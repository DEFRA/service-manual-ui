---
title: Model Context Protocol (MCP)
description: Open standard for connecting AI assistants to data sources.
layout: tool
toolSlug: model-context-protocol
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

Model Context Protocol (MCP) is an open standard from Anthropic that lets AI assistants access approved systems such as Jira, GitHub, Confluence, Azure DevOps and SonarQube in a controlled way.

An MCP server exposes those systems to the model. For Defra, remote vendor-hosted servers are preferred, because they give consistent governance, stronger security controls and built-in audit logging.

## What data you can use with it

<div class="govuk-inset-text">
  <p class="govuk-body">What you can expose through MCP depends on your data's classification. Check <a class="govuk-link" href="/ai-toolkit/guidance/using-data-with-ai">Using data with AI</a> before you connect anything.</p>
  <p class="govuk-body govuk-!-margin-bottom-0">Exclude sensitive, personal or confidential data from prompts and MCP context, and redact secrets and credentials.</p>
</div>

## Why we are exploring it

The AI Capability and Enablement team is evaluating MCP. It is not yet a recommendation for general use.

Only designated projects use it at the moment, and only after talking to the team.

Talk to the team before using it in delivery. Any exception needs written approval from the relevant Project Architect and the team.

## Using MCP safely

If you use MCP, follow these rules:

- connect only to vendor-provided MCP servers that Defra has approved, not community or self-built servers
- use OAuth-based authentication with least-privilege scopes, not Personal Access Tokens
- never auto-approve actions: keep a human in the loop and review tool calls before they run
- restrict access to only the repositories, projects and workspaces you need

## Approved MCP servers

These MCP servers are approved for use in Defra. Do not use others unless the AI Capability and Enablement team has approved them.

- Cloud providers: [Azure MCP](https://github.com/microsoft/mcp/tree/main/servers/Azure.Mcp.Server) and [AWS MCP](https://github.com/awslabs/mcp)
- Static analysis: [SonarQube MCP server](https://docs.sonarsource.com/sonarqube-mcp-server)
- Repositories, backlogs and pipelines: [Atlassian and Jira](https://www.atlassian.com/platform/remote-mcp-server), [GitHub](https://github.com/github/github-mcp-server) and [Azure DevOps](https://github.com/microsoft/azure-devops-mcp)

## More information

For how Defra handles AI security and data, see [Security](/ai-toolkit/guidance/security) and [Keeping data safe](/ai-toolkit/guidance/keeping-data-safe).
