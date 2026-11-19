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
  - text: See our projects
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
  description: The AI Capability and Enablement team is trialling MCP. If you are not sure whether your use of an approved server follows this guidance, ask us.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Help%20with%20Model%20Context%20Protocol" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

Model Context Protocol (MCP) is an open standard from Anthropic that lets AI assistants connect to other tools and systems in a controlled way. An MCP server exposes a tool or system to the model.

We are still trialling MCP. While the trial continues, you can use a small set of low-risk MCP servers that have been approved.

<div class="govuk-warning-text">
  <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
  <strong class="govuk-warning-text__text">
    <span class="govuk-visually-hidden">Warning</span>
    Only use the approved MCP servers listed on this page.
  </strong>
</div>

## What data you can use with it

<div class="govuk-inset-text">
  <p class="govuk-body">What you can expose through MCP depends on your data's classification. Check <a class="govuk-link" href="/ai-toolkit/guidance/using-data-with-ai">Using data with AI</a> before you connect anything.</p>
  <p class="govuk-body govuk-!-margin-bottom-0">Exclude sensitive, personal or confidential data from prompts and MCP context, and redact secrets and credentials.</p>
</div>

## Approved MCP servers

You can use:

- [SonarQube MCP server](https://docs.sonarsource.com/sonarqube-mcp-server)
- [Playwright MCP server](https://github.com/microsoft/playwright-mcp)

Do not use any other MCP server.

## Setting up an approved server

Run approved servers locally by default. Use the configuration from the server's official documentation.

Before you use a server, turn off telemetry and usage-data collection in its configuration.

You can use a hosted version of an approved server if it follows all the guidance on this page. For example, you must be able to turn off telemetry and usage-data collection.

If you are not sure about the safest way to set up or use an approved server, [email the AI Capability and Enablement team](mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Setting%20up%20an%20approved%20MCP%20server).

If you are using a Defra-provisioned GitHub Copilot licence, follow the [MCP setup instructions for Visual Studio Code and Copilot CLI](/ai-toolkit/tools/github-copilot#adding-an-approved-mcp-server).

## Pinning the server version

A local server runs from a package or container on your machine. If your configuration always starts the latest version, a new release can change what the server does without you knowing.

Pin each server to a specific version. Do not use `latest` or leave the version out. For example:

- npm (`npx`): use `npx -y PACKAGE-NAME@1.2.3`, not `npx -y PACKAGE-NAME@latest` or `npx -y PACKAGE-NAME`
- Python (`uvx`): use `uvx PACKAGE-NAME@1.2.3`, not `uvx PACKAGE-NAME`
- Python (`pipx`): use `pipx run --spec PACKAGE-NAME==1.2.3 PACKAGE-NAME`, not `pipx run PACKAGE-NAME`
- Docker: use `IMAGE-NAME:1.2.3`, not `IMAGE-NAME:latest` or `IMAGE-NAME`. For a stricter pin, use the image digest, such as `IMAGE-NAME@sha256:DIGEST`

Before you move to a new version, read its release notes. Then update the version in your configuration.

## Using MCP safely

Never auto-approve actions: keep a human in the loop and review tool calls before they run. Do not use options that approve every tool call automatically.

Restrict access to only the repositories, projects and workspaces you need.

## Keeping tokens safe

- add servers to your user-level configuration, not to a repository
- do not commit tokens, API keys or other secrets
- use OAuth where the server supports it, so you do not have to manage a static token
- if you need a static token, such as an API key, do not write it into any MCP configuration file, even your user-level one. Use the secure options your tool provides, such as being asked for it when the server starts
- give each static token only the scopes it needs and the shortest expiry you can
- revoke and replace a static token straight away if you think it has been exposed

## Servers we are assessing

We are assessing other MCP servers, such as Atlassian. We are not expanding access yet.

## More information

For how Defra handles AI security and data, see [Security](/ai-toolkit/guidance/security) and [Keeping data safe](/ai-toolkit/guidance/keeping-data-safe).
