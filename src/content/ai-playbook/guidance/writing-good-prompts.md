---
title: Writing good prompts
caption: Working with AI
description: Context, role, tasks, constraints. How to write prompts that produce reliable results, and how to refine them when they do not.
layout: section
sectionTitle: Guidance
sectionNav:
  - title: In this section
    items:
      - text: Guidance
        href: /ai-playbook/guidance
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
      - text: Cost and tokens
        href: /ai-playbook/guidance/cost-and-tokens
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
customNav:
  - text: Home
    href: /
  - text: Guidance
    href: /ai-playbook/guidance
  - text: Tools
    href: /ai-playbook/tools
  - text: Patterns
    href: /ai-playbook/patterns
  - text: From the field
    href: /ai-playbook/from-the-field
headerServiceName: AI digital toolkit
headerServiceUrl: /ai-playbook
breadcrumbItems:
  - text: Digital Defra
    href: /
  - text: AI digital toolkit
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

Tell the model what you are working on. For example: _"Programming in Python within a microservices architecture..."_

### Role

Tell the model who to be. For example: _"You are an experienced software engineer specialising in JavaScript."_

### Tasks

Break the work into steps. For example: _"First, summarise the requirements. Next, identify the conventions used in the existing code. Then propose a design before writing anything."_

### Constraints

Tell the model what not to do. For example: _"Do not implement anything outside the specified requirements."_

### Examples

Show what a good answer looks like. A worked example shapes the response more than any amount of description.

### Output format

Tell the model what shape you want the answer in. For example: _"Write the result as a user story document in markdown, with these sections..."_

## More techniques

Once you have the basics, these techniques help you get more out of your assistant.

<div class="govuk-accordion" data-module="govuk-accordion" id="prompts-accordion">

<div class="govuk-accordion__section">
<div class="govuk-accordion__section-header">
<h3 class="govuk-accordion__section-heading">
<span class="govuk-accordion__section-button" id="prompts-accordion-heading-1">Sharpen your prompts</span>
</h3>
</div>
<div id="prompts-accordion-content-1" class="govuk-accordion__section-content">

<h4 class="govuk-heading-s">Be specific. Be longer than feels necessary</h4>
<p class="govuk-body">Short prompts produce unpredictable results. Detailed prompts produce focused ones. It is almost always better to be too detailed than too brief.</p>

<h4 class="govuk-heading-s">Get the model to improve your prompt</h4>
<p class="govuk-body">Before you run a complex prompt, ask the model to refine it. This is one of the most effective techniques you can use.</p>
<blockquote class="govuk-inset-text">
<p class="govuk-body">"I am drafting a prompt to implement a user story using Claude Sonnet and Cursor. Please give me an improved version of this prompt."</p>
</blockquote>
<p class="govuk-body">The model often spots gaps you missed.</p>

<h4 class="govuk-heading-s">Ask for variants</h4>
<p class="govuk-body">When you are not sure how to phrase something, ask for several versions.</p>
<blockquote class="govuk-inset-text">
<p class="govuk-body">"Give me three alternative prompts for summarising technical documents."</p>
</blockquote>
<p class="govuk-body">If you have access to more than one model (Anthropic, OpenAI, Google), try the same prompt on each. The differences in how each model interprets a prompt often show you a better way to ask.</p>

</div>
</div>

<div class="govuk-accordion__section">
<div class="govuk-accordion__section-header">
<h3 class="govuk-accordion__section-heading">
<span class="govuk-accordion__section-button" id="prompts-accordion-heading-2">Work in stages</span>
</h3>
</div>
<div id="prompts-accordion-content-2" class="govuk-accordion__section-content">

<h4 class="govuk-heading-s">Work in steps</h4>
<p class="govuk-body">For complex tasks, do not expect a finished answer in one go. Work in stages:</p>
<ol class="govuk-list govuk-list--number">
<li>Ask for analysis only, no changes yet</li>
<li>Use the analysis as the basis for the next prompt</li>
<li>Ask the assistant to plan and pause for your feedback before generating</li>
<li>Then ask it to execute some or all of the plan</li>
</ol>
<p class="govuk-body">You can also narrow scope: <em>"Analyse this product requirements document and only implement section 5.1. Do not address any other section."</em></p>

<h4 class="govuk-heading-s">Narrow the focus as the task grows</h4>
<p class="govuk-body">As the codebase or task gets bigger, narrow each prompt. Reference specific files rather than relying on the model to find them. Use phrases like <em>"make targeted edits"</em> to stop the model rewriting more than you asked for.</p>

<h4 class="govuk-heading-s">Ask for step-by-step reasoning</h4>
<p class="govuk-body">For complex tasks, ask the model to <em>"think step by step"</em>.</p>
<blockquote class="govuk-inset-text">
<p class="govuk-body">"Before addressing this issue, outline a step-by-step plan that considers the whole codebase."</p>
</blockquote>
<p class="govuk-body">Reasoning models often do this internally, so you may not need to ask explicitly.</p>

</div>
</div>

<div class="govuk-accordion__section">
<div class="govuk-accordion__section-header">
<h3 class="govuk-accordion__section-heading">
<span class="govuk-accordion__section-button" id="prompts-accordion-heading-3">Recover when things go wrong</span>
</h3>
</div>
<div id="prompts-accordion-content-3" class="govuk-accordion__section-content">

<h4 class="govuk-heading-s">Avoid the "doom loop"</h4>
<p class="govuk-body">You are in the doom loop when:</p>
<ul class="govuk-list govuk-list--bullet">
<li>your prompt was unclear</li>
<li>the model produced something close but wrong</li>
<li>you nudged with a quick follow-up</li>
<li>the result drifted further from what you wanted</li>
<li>you kept nudging</li>
</ul>
<p class="govuk-body">Roll back to a clean state. Rewrite the original prompt with proper context, role, tasks and constraints. This takes less time than trying to dig out of the loop.</p>

<h4 class="govuk-heading-s">Ask the model what was missing</h4>
<p class="govuk-body">If you needed several unintended rounds of iteration, end with:</p>
<blockquote class="govuk-inset-text">
<p class="govuk-body">"What was missing from my original prompt that caused the problems?"</p>
</blockquote>
<p class="govuk-body">The model's answer is often a useful prompt template for next time.</p>

</div>
</div>

<div class="govuk-accordion__section">
<div class="govuk-accordion__section-header">
<h3 class="govuk-accordion__section-heading">
<span class="govuk-accordion__section-button" id="prompts-accordion-heading-4">Use markers and images</span>
</h3>
</div>
<div id="prompts-accordion-content-4" class="govuk-accordion__section-content">

<h4 class="govuk-heading-s">Use contextual markers</h4>
<p class="govuk-body">Many AI IDEs let you reference docs and the web with markers like <code>@docs</code> or <code>@web</code>. Use them to give the model the specific context it needs rather than relying on its training.</p>

<h4 class="govuk-heading-s">Work with images, not just text</h4>
<p class="govuk-body">For UI work, attach screenshots. For tricky bugs, include the browser markup or stack trace. The model can use images and structured text alongside your words.</p>

</div>
</div>

</div>
