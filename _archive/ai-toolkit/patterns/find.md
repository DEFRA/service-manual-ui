---
title: Find a pattern
caption: Deliver with AI
description: Pick the priority that matches your work and we will point you at the right Defra proof of concept.
layout: section
sectionTitle: Deliver with AI
sectionNav:
  - title: In this section
    items:
      - text: Deliver with AI
        href: /ai-toolkit/deliver-with-ai
  - title: What you can do with AI at Defra
    items:
      - text: Tools and data
        href: /ai-toolkit/guidance/tools-and-data
      - text: Shared team knowledge bases
        href: /ai-toolkit/guidance/team-knowledge-bases
      - text: AI in your CI/CD pipeline
        href: /ai-toolkit/guidance/ai-in-pipelines
  - title: Using AI patterns
    items:
      - text: Find a pattern
        href: /ai-toolkit/patterns/find
      - text: AI assistant
        href: /ai-toolkit/patterns/ai-assistant
      - text: Green summarisation
        href: /ai-toolkit/patterns/green-summarisation
      - text: Agent swarms
        href: /ai-toolkit/patterns/agent-swarms
      - text: Token optimisation
        href: /ai-toolkit/patterns/token-optimisation
      - text: Interaction designer plugin
        href: /ai-toolkit/patterns/interaction-designer-plugin
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
  - text: Find a pattern
supportBox:
  title: Contribute a pattern
  description: If your team has a reusable approach you want to share, AICE can help you write it up.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Pattern%20contribution" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

<p class="govuk-body-l">Pick the priority that matches your work and we will point you at the right Defra proof of concept.</p>

<div class="app-pattern-finder" data-pattern-finder hidden>
  <form data-pattern-finder-form>
    <fieldset class="govuk-fieldset">
      <legend class="govuk-fieldset__legend govuk-fieldset__legend--m">
        Which of these is your team's priority right now?
      </legend>
      <div class="govuk-radios" data-module="govuk-radios">
        <div class="govuk-radios__item">
          <input class="govuk-radios__input" id="finder-1" name="finder" type="radio" value="agent-swarms">
          <label class="govuk-label govuk-radios__label" for="finder-1">Producing higher-quality analysis on complex problems</label>
        </div>
        <div class="govuk-radios__item">
          <input class="govuk-radios__input" id="finder-2" name="finder" type="radio" value="ai-assistant">
          <label class="govuk-label govuk-radios__label" for="finder-2">A single Defra interface to multiple AI providers</label>
        </div>
        <div class="govuk-radios__item">
          <input class="govuk-radios__input" id="finder-3" name="finder" type="radio" value="green-summarisation">
          <label class="govuk-label govuk-radios__label" for="finder-3">Reducing the energy use of AI workloads</label>
        </div>
        <div class="govuk-radios__item">
          <input class="govuk-radios__input" id="finder-4" name="finder" type="radio" value="token-optimisation">
          <label class="govuk-label govuk-radios__label" for="finder-4">Cutting token cost on AI calls</label>
        </div>
        <div class="govuk-radios__item">
          <input class="govuk-radios__input" id="finder-5" name="finder" type="radio" value="none">
          <label class="govuk-label govuk-radios__label" for="finder-5">None of these, or not sure</label>
        </div>
      </div>
    </fieldset>
  </form>

  <div class="app-pattern-finder__result" aria-live="polite" data-pattern-finder-result hidden></div>

  <template data-pattern-finder-rec="agent-swarms">
    <p class="govuk-body-l govuk-!-margin-bottom-2">Try <strong>Agent swarms</strong></p>
    <p class="govuk-body">Multiple specialist agents working together tend to produce richer analysis than a single agent, especially on complex policy or strategic questions.</p>
    <a href="/ai-toolkit/patterns/agent-swarms" role="button" draggable="false" class="govuk-button" data-module="govuk-button">
      Read the agent swarms proof of concept
    </a>
    <p class="govuk-body govuk-!-margin-top-2 govuk-!-margin-bottom-0">Or <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Pattern%20enquiry%3A%20agent%20swarms" class="govuk-link">email the team</a> to discuss this for your project.</p>
  </template>

  <template data-pattern-finder-rec="ai-assistant">
    <p class="govuk-body-l govuk-!-margin-bottom-2">Try the <strong>AI assistant</strong></p>
    <p class="govuk-body">The team's prototype Defra-hosted AI stack lets you run multiple providers behind a single interface, with consistent guardrails and monitoring.</p>
    <a href="/ai-toolkit/patterns/ai-assistant" role="button" draggable="false" class="govuk-button" data-module="govuk-button">
      Read the AI assistant proof of concept
    </a>
    <p class="govuk-body govuk-!-margin-top-2 govuk-!-margin-bottom-0">Or <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Pattern%20enquiry%3A%20AI%20assistant" class="govuk-link">email the team</a> to discuss this for your project.</p>
  </template>

  <template data-pattern-finder-rec="green-summarisation">
    <p class="govuk-body-l govuk-!-margin-bottom-2">Try <strong>Green summarisation</strong></p>
    <p class="govuk-body">Smaller, local models can match cloud LLMs for short summaries. Useful when sustainability matters and the task is constrained.</p>
    <a href="/ai-toolkit/patterns/green-summarisation" role="button" draggable="false" class="govuk-button" data-module="govuk-button">
      Read the green summarisation proof of concept
    </a>
    <p class="govuk-body govuk-!-margin-top-2 govuk-!-margin-bottom-0">Or <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Pattern%20enquiry%3A%20green%20summarisation" class="govuk-link">email the team</a> to discuss this for your project.</p>
  </template>

  <template data-pattern-finder-rec="token-optimisation">
    <p class="govuk-body-l govuk-!-margin-bottom-2">Try <strong>Token optimisation</strong></p>
    <p class="govuk-body">Prompt compression techniques can reduce token cost on repeat prompts. Results vary by task; the proof of concept shows where it works and where it does not.</p>
    <a href="/ai-toolkit/patterns/token-optimisation" role="button" draggable="false" class="govuk-button" data-module="govuk-button">
      Read the token optimisation proof of concept
    </a>
    <p class="govuk-body govuk-!-margin-top-2 govuk-!-margin-bottom-0">Or <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Pattern%20enquiry%3A%20token%20optimisation" class="govuk-link">email the team</a> to discuss this for your project.</p>
  </template>

  <template data-pattern-finder-rec="none">
    <p class="govuk-body-l govuk-!-margin-bottom-2"><strong>Talk to the team</strong></p>
    <p class="govuk-body">If none of the four fits, your work might be a candidate for a new pattern. Email AICE to discuss.</p>
    <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Pattern%20enquiry" role="button" draggable="false" class="govuk-button" data-module="govuk-button">
      Email the team
    </a>
  </template>
</div>

<noscript>
<p class="govuk-body">The interactive finder needs JavaScript. <a href="/ai-toolkit/deliver-with-ai#using-ai-patterns" class="govuk-link">Browse all four patterns</a> instead.</p>
</noscript>
