---
title: Setting up your project
caption: Get started
description: Install your AI assistant, turn on privacy settings, and add the rules and instructions your repo needs.
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
  - text: Setting up your project
supportBox:
  title: Get help with this
  description: Ask the AI Capability and Enablement team for advice or hands-on support.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Help%20setting%20up%20my%20project" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

Set up your development environment to use AI tools safely and effectively. Doing this once at the start of a project pays back many times over.

## Install an AI coding assistant

Pick a coding assistant from the [tools radar](/ai-playbook/tools). Use only assistants that are endorsed or in pilot for your use case.

## Turn on privacy settings

Privacy settings stop your code and data from being stored on AI providers' servers. They also prevent your data being used to train AI models.

You must turn on privacy settings before using any AI assistant on Defra work.

For tool-specific settings, see the page for your assistant in the [tools radar](/ai-playbook/tools), or the official [Defra AI SDLC tool guidance](https://defra.github.io/ai-sdlc-tool-guidance/).

## Add AI rules and instructions

Add a rules and instructions file to your repository so the AI follows your codebase's conventions, security rules and accessibility standards.

Each tool has its own format and location:

- **[GitHub Copilot](/ai-playbook/tools/github-copilot).** `.github/copilot-instructions.md` and `.github/instructions/*.instructions.md`
- **Cursor.** `.cursor/rules/*.mdc`
- **Claude Code.** `CLAUDE.md` and `.claude/rules/*.md`
- **Windsurf.** `.windsurf/rules/*.md`

Commit these files to version control. Every team member and every AI interaction will then follow the same standards. See [Rules for AI in your repo](/ai-playbook/guidance/rules-for-ai) for what to put in them.

## Configure MCP connections (pilot projects only)

MCP ([Model Context Protocol](/ai-playbook/tools/model-context-protocol)) lets your AI assistant talk to Jira, GitHub, Azure DevOps and similar systems. It is currently under review at Defra and limited to designated pilot projects.

If your project is approved to use MCP, follow the rules in [MCP servers and integrations](/ai-playbook/guidance/mcp-servers).

## Make your project artefacts accessible to your assistant

Your assistant works better when it can see your user stories, technical designs, diagrams and interface designs.

Some teams use [Obsidian](https://obsidian.md/) to manage these centrally, either as a vault inside the code repo or as a separate repo linked with git submodules. Use whatever approach works for your team, as long as the materials are easy to point your assistant at.
