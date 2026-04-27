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
    href: /ai-playbook/proofs-of-concept/ai-assistant
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

A good prompt is the difference between a useful AI response and a generic one. The model has been trained on a vast range of content, so your job is to give it enough context and clear enough instructions for it to focus on what you actually need.

## What to put in a prompt

A well-crafted prompt usually contains some or all of these elements. You do not need every element in every prompt. Use this as a checklist.

### Context

Give the model the relevant background. For example: *"Programming in Python within a microservices architecture..."*.

### Role

Specify the expertise or persona you want the model to take. For example: *"You are an experienced software engineer with specialised knowledge in JavaScript."*.

### Tasks

Break the work into clear steps. For example: *"First, summarise your understanding of the requirements. Next, identify the current conventions in the codebase. Then propose a design before writing code."*.

### Constraints

Make the boundaries explicit. For example: *"Do not implement sections outside the specified requirements."*.

### Examples

Show what good output looks like. A worked example shapes the response more than any amount of description.

### Output format

Where it matters, say what shape you want the output in. For example: *"Create a detailed user story document in markdown, structured as follows..."*.

## Be specific and verbose

Ambiguous or short prompts produce unpredictable results. Provide clear instructions, sufficient context and examples.

It is almost always better to be too detailed than too brief.

## Use meta-prompting

Ask the model to improve your prompt before you run it. This is one of the most effective techniques.

For example: *"I am drafting a prompt to implement a user story using Claude Sonnet and Cursor. Please provide an improved version of this prompt."*.

The model often spots gaps you missed. Many of the prompts in the [SDLC prompt library](https://defra.github.io/defra-ai-sdlc/) were refined this way.

## Generate variants

When you are not sure how to phrase something, ask for several versions. For example: *"Provide three alternative prompts for summarising technical documents."*.

If you have access to more than one model (Anthropic, OpenAI, Google), try the same prompt on each. Different models will sometimes show you a better way to ask.

## Solve problems collaboratively

For complex tasks, do not expect a finished solution in one go. Work in steps:

1. Ask for a comprehensive analysis without any code changes
2. Use the analysis as the basis for the next prompt
3. Ask the assistant to plan and prompt you for feedback before generating
4. Then ask it to execute some or all of the plan

You can also focus on one section at a time: *"Analyse this product requirements document and only implement section 5.1. Do not address any other sections."*.

## Avoid the "doom loop"

If you find yourself making rapid edits and getting compounding errors, stop. The pattern is:

- prompt is unclear or rushed
- model produces something close but wrong
- you nudge with another quick prompt
- result drifts further from what you wanted
- you keep nudging

Roll back to a clean state and rewrite the original prompt with proper context, role, tasks and constraints. This is faster than trying to dig out of the loop.

## Ask for feedback

If your work needed several rounds of unintended iterations, end with: *"What was missing from the original prompt that contributed to the problems?"*.

The model's answer is often a useful prompt-template you can reuse next time.

## Narrow the scope as complexity grows

As the task or codebase gets bigger, narrow the focus of each prompt. Reference specific files instead of relying on the model to find them. Use phrases like *"make targeted edits"* to stop the model rewriting more than you wanted.

## Encourage step-by-step reasoning

For complex tasks, ask the model to *"think step by step"*. For example: *"Before addressing this issue, outline a step-by-step plan considering the entire codebase."*.

You may not need this for reasoning models that already plan internally.

## Use contextual markers

Many AI-powered IDEs let you reference docs and the web with markers like `@docs` or `@web`. Use these to feed the model the specific context it needs rather than relying on its training.

## Work multimodally

For UI work, attach screenshots. For tricky bugs, include the relevant browser markup or stack trace. The model can use images and structured text alongside your words.
