---
title: Patterns
description: Reusable approaches Defra teams are exploring with AI.
layout: section
sectionTitle: Patterns
sectionNav:
  - title: In this section
    items:
      - text: Patterns
        href: /ai-playbook/patterns
  - title: Proofs of concept
    items:
      - text: Agent swarms
        href: /ai-playbook/patterns/agent-swarms
      - text: AI assistant
        href: /ai-playbook/patterns/ai-assistant
      - text: Green summarisation
        href: /ai-playbook/patterns/green-summarisation
      - text: Token optimisation
        href: /ai-playbook/patterns/token-optimisation
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
  - text: Patterns
---

A pattern is a reusable approach to a recurring problem, written up so the next team does not have to start from scratch.

These are early proofs of concept, aimed at engineers and technical architects. More are coming for other digital roles. [Email the team](mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Pattern%20enquiry) if one fits your work, whatever your role.

## Find a pattern that fits

<div class="app-pattern-finder" data-pattern-finder hidden>
  <form data-pattern-finder-form>
    <fieldset class="govuk-fieldset">
      <legend class="govuk-fieldset__legend govuk-fieldset__legend--s">
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
    <a href="/ai-playbook/patterns/agent-swarms" role="button" draggable="false" class="govuk-button" data-module="govuk-button">
      Read the agent swarms proof of concept
    </a>
    <p class="govuk-body govuk-!-margin-top-2 govuk-!-margin-bottom-0">Or <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Pattern%20enquiry%3A%20agent%20swarms" class="govuk-link">email the team</a> to discuss this for your project.</p>
  </template>

  <template data-pattern-finder-rec="ai-assistant">
    <p class="govuk-body-l govuk-!-margin-bottom-2">Try the <strong>AI assistant</strong></p>
    <p class="govuk-body">The team's prototype Defra-hosted AI stack lets you run multiple providers behind a single interface, with consistent guardrails and monitoring.</p>
    <a href="/ai-playbook/patterns/ai-assistant" role="button" draggable="false" class="govuk-button" data-module="govuk-button">
      Read the AI assistant proof of concept
    </a>
    <p class="govuk-body govuk-!-margin-top-2 govuk-!-margin-bottom-0">Or <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Pattern%20enquiry%3A%20AI%20assistant" class="govuk-link">email the team</a> to discuss this for your project.</p>
  </template>

  <template data-pattern-finder-rec="green-summarisation">
    <p class="govuk-body-l govuk-!-margin-bottom-2">Try <strong>Green summarisation</strong></p>
    <p class="govuk-body">Smaller, local models can match cloud LLMs for short summaries. Useful when sustainability matters and the task is constrained.</p>
    <a href="/ai-playbook/patterns/green-summarisation" role="button" draggable="false" class="govuk-button" data-module="govuk-button">
      Read the green summarisation proof of concept
    </a>
    <p class="govuk-body govuk-!-margin-top-2 govuk-!-margin-bottom-0">Or <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Pattern%20enquiry%3A%20green%20summarisation" class="govuk-link">email the team</a> to discuss this for your project.</p>
  </template>

  <template data-pattern-finder-rec="token-optimisation">
    <p class="govuk-body-l govuk-!-margin-bottom-2">Try <strong>Token optimisation</strong></p>
    <p class="govuk-body">Prompt compression techniques can reduce token cost on repeat prompts. Results vary by task; the proof of concept shows where it works and where it does not.</p>
    <a href="/ai-playbook/patterns/token-optimisation" role="button" draggable="false" class="govuk-button" data-module="govuk-button">
      Read the token optimisation proof of concept
    </a>
    <p class="govuk-body govuk-!-margin-top-2 govuk-!-margin-bottom-0">Or <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Pattern%20enquiry%3A%20token%20optimisation" class="govuk-link">email the team</a> to discuss this for your project.</p>
  </template>

  <template data-pattern-finder-rec="none">
    <p class="govuk-body-l govuk-!-margin-bottom-2"><strong>Talk to the team</strong></p>
    <p class="govuk-body">If none of the four fits, your work might be a candidate for a new pattern. The team is also currently exploring:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Hallucination detection at scale</li>
      <li>LLM-as-a-judge for output validation</li>
      <li>Async inference patterns</li>
      <li>AI frameworks evaluation (LangChain, LangGraph, AWS Bedrock Agents)</li>
    </ul>
    <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Pattern%20enquiry" role="button" draggable="false" class="govuk-button" data-module="govuk-button">
      Email the team
    </a>
  </template>
</div>
