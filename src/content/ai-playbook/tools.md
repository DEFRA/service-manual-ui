---
title: Tools
description: AI tools, platforms and frameworks the AI Capability and Enablement team has evaluated for use across Defra.
layout: article
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
  - text: Tools
supportBox:
  title: Get involved
  description: Suggest a tool, platform or framework for the radar.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

<dl class="app-radar-key">
  <div class="app-radar-key__row">
    <dt class="app-radar-key__term"><strong class="govuk-tag govuk-tag--green">Endorse</strong></dt>
    <dd class="app-radar-key__desc">Approved for use within team guidelines.</dd>
  </div>
  <div class="app-radar-key__row">
    <dt class="app-radar-key__term"><strong class="govuk-tag govuk-tag--blue">Pilot</strong></dt>
    <dd class="app-radar-key__desc">Being piloted with specific teams.</dd>
  </div>
  <div class="app-radar-key__row">
    <dt class="app-radar-key__term"><strong class="govuk-tag govuk-tag--yellow">Assess</strong></dt>
    <dd class="app-radar-key__desc">Under evaluation. Do not use without consulting the team.</dd>
  </div>
  <div class="app-radar-key__row">
    <dt class="app-radar-key__term"><strong class="govuk-tag govuk-tag--red">Do not use</strong></dt>
    <dd class="app-radar-key__desc">Avoid due to security, licensing or support issues.</dd>
  </div>
</dl>

<div class="app-radar" id="radar" data-radar>

<div class="app-radar-controls">
  <div class="app-radar-controls__row" data-radar-search-wrapper hidden>
    <div class="app-radar-controls__search govuk-form-group">
      <label class="govuk-label" for="radar-search">Search by name</label>
      <input class="govuk-input" id="radar-search" name="radar-search" type="search" data-radar-search autocomplete="off" spellcheck="false">
    </div>
  </div>
  <p class="govuk-body govuk-!-margin-top-3 govuk-!-margin-bottom-1"><strong>Filter by status</strong></p>
  <ul class="app-radar-chips">
    <li><a href="#radar" class="app-radar-chips__item" aria-current="true" data-radar-chip="all">All</a></li>
    <li><a href="#endorse" class="app-radar-chips__item" data-radar-chip="endorse">Endorse</a></li>
    <li><a href="#pilot" class="app-radar-chips__item" data-radar-chip="pilot">Pilot</a></li>
    <li><a href="#assess" class="app-radar-chips__item" data-radar-chip="assess">Assess</a></li>
    <li><a href="#avoid" class="app-radar-chips__item" data-radar-chip="avoid">Do not use</a></li>
  </ul>
</div>

<div class="govuk-visually-hidden" aria-live="polite" data-radar-live></div>

<div class="app-radar-noresults" hidden data-radar-noresults>
  <h3 class="app-radar-noresults__title" data-radar-noresults-title>No tools match your search</h3>
  <p class="app-radar-noresults__body">The radar may not include this yet. The team can advise on tools that are not on the list.</p>
  <a class="govuk-button" href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Tool%20enquiry%20for%20the%20radar" data-radar-noresults-link>
    Ask about this
  </a>
  <p class="govuk-body govuk-!-margin-top-3 govuk-!-margin-bottom-0"><button type="button" class="govuk-link app-radar-link-button" data-radar-clear>Clear your search</button></p>
</div>

<section class="app-radar-section" id="endorse" data-section="endorse">

## Endorse

<ul class="app-radar-grid">

<li class="app-radar-card" data-status="endorse" data-category="tool" data-name="github copilot">
  <div class="app-radar-card__head">
    <span class="app-radar-card__category">Tool</span>
  </div>
  <h3 class="app-radar-card__title"><a href="/ai-playbook/tools/github-copilot" class="govuk-link app-radar-card__link">GitHub Copilot</a></h3>
  <p class="app-radar-card__description">AI pair programmer that suggests code as you type.</p>
</li>

</ul>
</section>

<section class="app-radar-section" id="pilot" data-section="pilot">

## Pilot

<ul class="app-radar-grid">

<li class="app-radar-card" data-status="pilot" data-category="platform" data-name="aws bedrock">
  <div class="app-radar-card__head">
    <span class="app-radar-card__category">Platform</span>
  </div>
  <h3 class="app-radar-card__title"><a href="/ai-playbook/tools/aws-bedrock" class="govuk-link app-radar-card__link">AWS Bedrock</a></h3>
  <p class="app-radar-card__description">Managed service for foundation models on AWS.</p>
</li>

<li class="app-radar-card" data-status="pilot" data-category="platform" data-name="azure ai foundry">
  <div class="app-radar-card__head">
    <span class="app-radar-card__category">Platform</span>
  </div>
  <h3 class="app-radar-card__title"><a href="/ai-playbook/tools/azure-ai-foundry" class="govuk-link app-radar-card__link">Azure AI Foundry</a></h3>
  <p class="app-radar-card__description">Microsoft's platform for building and deploying AI applications.</p>
</li>

</ul>
</section>

<section class="app-radar-section" id="assess" data-section="assess">

## Assess

<ul class="app-radar-grid">

<li class="app-radar-card" data-status="assess" data-category="framework" data-name="model context protocol mcp">
  <div class="app-radar-card__head">
    <span class="app-radar-card__category">Framework</span>
  </div>
  <h3 class="app-radar-card__title"><a href="/ai-playbook/tools/model-context-protocol" class="govuk-link app-radar-card__link">Model Context Protocol (MCP)</a></h3>
  <p class="app-radar-card__description">Open standard for connecting AI assistants to data sources.</p>
</li>

<li class="app-radar-card" data-status="assess" data-category="framework" data-name="agent to agent a2a">
  <div class="app-radar-card__head">
    <span class="app-radar-card__category">Framework</span>
  </div>
  <h3 class="app-radar-card__title"><a href="/ai-playbook/tools/agent-to-agent" class="govuk-link app-radar-card__link">Agent-to-Agent (A2A)</a></h3>
  <p class="app-radar-card__description">Communication framework for AI agent collaboration.</p>
</li>

<li class="app-radar-card" data-status="assess" data-category="framework" data-name="langgraph">
  <div class="app-radar-card__head">
    <span class="app-radar-card__category">Framework</span>
  </div>
  <h3 class="app-radar-card__title"><a href="/ai-playbook/tools/langgraph" class="govuk-link app-radar-card__link">LangGraph</a></h3>
  <p class="app-radar-card__description">Building stateful, multi-actor LLM applications as graphs.</p>
</li>

<li class="app-radar-card" data-status="assess" data-category="framework" data-name="retrieval augmented generation rag">
  <div class="app-radar-card__head">
    <span class="app-radar-card__category">Framework</span>
  </div>
  <h3 class="app-radar-card__title"><a href="/ai-playbook/tools/retrieval-augmented-generation" class="govuk-link app-radar-card__link">Retrieval-augmented generation (RAG)</a></h3>
  <p class="app-radar-card__description">Combining a model with retrieved documents to ground its answers.</p>
</li>

<li class="app-radar-card" data-status="assess" data-category="platform" data-name="langfuse">
  <div class="app-radar-card__head">
    <span class="app-radar-card__category">Platform</span>
  </div>
  <h3 class="app-radar-card__title"><a href="/ai-playbook/tools/langfuse" class="govuk-link app-radar-card__link">Langfuse</a></h3>
  <p class="app-radar-card__description">Monitoring and evaluation for AI applications.</p>
</li>

<li class="app-radar-card" data-status="assess" data-category="platform" data-name="aws bedrock agentcore">
  <div class="app-radar-card__head">
    <span class="app-radar-card__category">Platform</span>
  </div>
  <h3 class="app-radar-card__title"><a href="/ai-playbook/tools/aws-bedrock-agentcore" class="govuk-link app-radar-card__link">AWS Bedrock AgentCore</a></h3>
  <p class="app-radar-card__description">Managed cloud platform for production AI agents.</p>
</li>

<li class="app-radar-card" data-status="assess" data-category="tool" data-name="claude code plugin marketplace">
  <div class="app-radar-card__head">
    <span class="app-radar-card__category">Tool</span>
  </div>
  <h3 class="app-radar-card__title"><a href="/ai-playbook/tools/claude-code-marketplace" class="govuk-link app-radar-card__link">Claude Code plugin marketplace</a></h3>
  <p class="app-radar-card__description">Extensions for Anthropic's coding agent.</p>
</li>

<li class="app-radar-card" data-status="assess" data-category="tool" data-name="git ai">
  <div class="app-radar-card__head">
    <span class="app-radar-card__category">Tool</span>
  </div>
  <h3 class="app-radar-card__title"><a href="/ai-playbook/tools/git-ai" class="govuk-link app-radar-card__link">Git AI</a></h3>
  <p class="app-radar-card__description">Open-source AI code lineage tracker.</p>
</li>

</ul>
</section>

<section class="app-radar-section" id="avoid" data-section="avoid">

## Do not use

<p class="govuk-body">Nothing is listed here yet.</p>

<p class="govuk-body">When the team has reviewed a tool and found serious problems, we will add it here with a reason.</p>

<p class="govuk-body">This radar only covers tools the team has reviewed. If a tool is not listed, it has not been reviewed yet.</p>

</section>

</div>
