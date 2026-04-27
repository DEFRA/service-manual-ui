---
title: Writing good prompts
caption: Working with AI
description: Context, role, tasks, constraints. How to write prompts that produce reliable results, and how to refine them when they do not.
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
  - text: Writing good prompts
supportBox:
  title: Get help with this
  description: Ask the AI Capability and Enablement team for advice or hands-on support.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Help%20with%20writing%20prompts" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

A clear prompt gets you a useful answer. A vague one gets you a generic one. Most of the difference is just being specific about what you want, what you do not want, and what good looks like.

## Six things a good prompt has

You do not need all six in every prompt. Use them as a checklist when a prompt is not working.

### Context

Tell the model what you are working on. For example: *"Programming in Python within a microservices architecture.."*

### Role

Tell the model who to be. For example: *"You are an experienced software engineer specialising in JavaScript."*

### Tasks

Break the work into steps. For example: *"First, summarise the requirements. Next, identify the conventions used in the existing code. Then propose a design before writing anything."*

### Constraints

Tell the model what not to do. For example: *"Do not implement anything outside the specified requirements."*

### Examples

Show what a good answer looks like. A worked example shapes the response more than any amount of description.

### Output format

Tell the model what shape you want the answer in. For example: *"Write the result as a user story document in markdown, with these sections.."*

## Be specific. Be longer than feels necessary.

Short prompts produce unpredictable results. Detailed prompts produce focused ones. It is almost always better to be too detailed than too brief.

## Get the model to improve your prompt

Before you run a complex prompt, ask the model to refine it. This is one of the most effective techniques you can use.

> "I am drafting a prompt to implement a user story using Claude Sonnet and Cursor. Please give me an improved version of this prompt."

The model often spots gaps you missed.

## Ask for variants

When you are not sure how to phrase something, ask for several versions.

> "Give me three alternative prompts for summarising technical documents."

If you have access to more than one model (Anthropic, OpenAI, Google), try the same prompt on each. The differences in how each model interprets a prompt often show you a better way to ask.

## Work in steps

For complex tasks, do not expect a finished answer in one go. Work in stages:

1. Ask for analysis only, no changes yet
2. Use the analysis as the basis for the next prompt
3. Ask the assistant to plan and pause for your feedback before generating
4. Then ask it to execute some or all of the plan

You can also narrow scope: *"Analyse this product requirements document and only implement section 5.1. Do not address any other section."*

## Avoid the "doom loop"

You are in the doom loop when:

- your prompt was unclear
- the model produced something close but wrong
- you nudged with a quick follow-up
- the result drifted further from what you wanted
- you kept nudging

Roll back to a clean state. Rewrite the original prompt with proper context, role, tasks and constraints. This takes less time than trying to dig out of the loop.

## Ask the model what was missing

If you needed several unintended rounds of iteration, end with:

> "What was missing from my original prompt that caused the problems?"

The model's answer is often a useful prompt template for next time.

## Narrow the focus as the task grows

As the codebase or task gets bigger, narrow each prompt. Reference specific files rather than relying on the model to find them. Use phrases like *"make targeted edits"* to stop the model rewriting more than you asked for.

## Ask for step-by-step reasoning

For complex tasks, ask the model to *"think step by step"*.

> "Before addressing this issue, outline a step-by-step plan that considers the whole codebase."

Reasoning models often do this internally, so you may not need to ask explicitly.

## Use contextual markers

Many AI IDEs let you reference docs and the web with markers like `@docs` or `@web`. Use them to give the model the specific context it needs rather than relying on its training.

## Work with images, not just text

For UI work, attach screenshots. For tricky bugs, include the browser markup or stack trace. The model can use images and structured text alongside your words.
