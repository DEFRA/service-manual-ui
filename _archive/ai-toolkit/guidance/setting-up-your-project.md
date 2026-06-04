---
title: Setting up your project
caption: Get started
description: Install your AI assistant, turn on privacy settings, and add the rules and instructions your repo needs.
layout: section
sectionTitle: Deliver with AI
sectionNav:
  - title: In this section
    items:
      - text: Deliver with AI
        href: /ai-toolkit/deliver-with-ai
  - title: Common questions
    items:
      - text: Using AI tools
        href: /ai-toolkit/guidance/using-ai-tools
      - text: Putting data into AI tools
        href: /ai-toolkit/guidance/data-in-ai-tools
      - text: Shared team knowledge bases
        href: /ai-toolkit/guidance/team-knowledge-bases
      - text: AI in your CI/CD pipeline
        href: /ai-toolkit/guidance/ai-in-pipelines
  - title: Set yourself up
    items:
      - text: Setting up your project
        href: /ai-toolkit/guidance/setting-up-your-project
      - text: Rules for AI in your repo
        href: /ai-toolkit/guidance/rules-for-ai
customNav:
  - text: Home
    href: /
  - text: Deliver with AI
    href: /ai-toolkit/deliver-with-ai
  - text: Find a tool
    href: /ai-toolkit/tools
  - text: Use AI responsibly
    href: /ai-toolkit/build-responsibly
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
  - text: Setting up your project
supportBox:
  title: Get help with this
  description: Ask the AI Capability and Enablement team for advice or hands-on support.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Help%20setting%20up%20my%20project" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

<p class="govuk-body-l">Set up your development environment to use AI tools safely and effectively. Doing this once at the start of a project pays back many times over.</p>

## Install an AI coding assistant

Pick a coding assistant from the [tools radar](/ai-toolkit/tools). Use only assistants that are endorsed or in pilot for your use case.

## Turn on privacy settings

Privacy settings stop your code and data from being stored on AI providers' servers. They also prevent your data being used to train AI models.

You must turn on privacy settings before using any AI assistant on Defra work.

For tool-specific settings, see the page for your assistant in the [tools radar](/ai-toolkit/tools).

## Add AI rules and instructions

Add a rules and instructions file to your repository so the AI follows your codebase's conventions, security rules and accessibility standards.

Each tool has its own format and location:

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li><strong><a href="/ai-toolkit/tools/github-copilot" class="govuk-link">GitHub Copilot</a>.</strong> <code>.github/copilot-instructions.md</code> and <code>.github/instructions/*.instructions.md</code></li>
<li><strong>Cursor.</strong> <code>.cursor/rules/*.mdc</code></li>
<li><strong>Claude Code.</strong> <code>CLAUDE.md</code> and <code>.claude/rules/*.md</code></li>
<li><strong>Windsurf.</strong> <code>.windsurf/rules/*.md</code></li>
</ul>

Commit these files to version control. Every team member and every AI interaction will then follow the same standards. See [Rules for AI in your repo](/ai-toolkit/guidance/rules-for-ai) for what to put in them.

## Configure MCP connections (pilot projects only)

MCP ([Model Context Protocol](/ai-toolkit/tools/model-context-protocol)) lets your AI assistant talk to Jira, GitHub, Azure DevOps and similar systems. It is currently under review at Defra and limited to designated pilot projects.

If your project is approved to use MCP, follow the rules on the [Model Context Protocol page](/ai-toolkit/tools/model-context-protocol).

## Make your project artefacts accessible to your assistant

Your assistant works better when it can see your user stories, technical designs, diagrams and interface designs.

Keep them somewhere your assistant can read, either inside the code repo or in a separate repo linked with git submodules. Use whatever approach works for your team, as long as the materials are easy to point your assistant at.
