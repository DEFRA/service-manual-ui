---
title: Interaction designer plugin
caption: Proof of concept
description: An AICE proof of concept. A Claude Code plugin that brings reusable AICE patterns into an interaction designer's workflow.
layout: section
sectionTitle: Use AI patterns
sectionNav:
  - title: In this section
    items:
      - text: Use AI patterns
        href: /ai-toolkit/patterns
  - title: Proofs of concept
    items:
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
  - text: Use AI patterns
    href: /ai-toolkit/patterns
  - text: Interaction designer plugin
supportBox:
  title: Contribute a pattern
  description: If your team has a reusable approach you want to share, AICE can help you write it up.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Pattern%20enquiry%3A%20Interaction%20designer%20plugin" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

<p class="govuk-body-l">Give it a verbal brief and it produces a journey doc, page specs and a GOV.UK-styled HTML preview, all in one Claude Code session.</p>

## How it works

Two surfaces, same skills underneath.

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li><strong>Orchestrator surface.</strong> <code>/interaction-designer</code> walks through an eight-phase arc, calling the leaf skills in a curated order. Good for first-time use.</li>
<li><strong>Leaf skills.</strong> <code>/read-corpus</code>, <code>/frame-policy</code>, <code>/map-journey</code>, <code>/spec-page</code>, <code>/preview-spec</code>, <code>/wrap-up</code>. Invoked directly in any order. Good for power users.</li>
</ul>

A designer who knows the shape can skip the orchestrator and call the leaves directly. The artefacts produced are identical.

## What you get out

By the end of a session:

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li>A journey doc, from <code>map-journey</code></li>
<li>One or more page specs, from <code>spec-page</code></li>
<li>A GOV.UK-styled HTML preview per spec'd page, from <code>preview-spec</code></li>
<li><code>DESIGN_HISTORY.md</code>, a narrative journal of decisions and reasoning that every skill appends to</li>
</ul>

The skill outputs are declarative: what was built. The journal is where the reasoning lives. The split is load-bearing.

## How to try it

The repo ships in two modes.

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li><strong>Demo mode.</strong> Run <code>bin/run-demo.sh</code> from a clone. Claude Code launches isolated from your usual config, with a fictional designer's fixture corpus to work against. No install. Try this first.</li>
<li><strong>Plugin mode.</strong> Install via the local marketplace into your normal Claude Code config and run against your own design workspace. Use this once you have decided to keep it.</li>
</ul>

Both modes share the same plugin source. They differ only in how Claude Code is launched and which workspace it sees.

## Trust at commit time

No skill runs git. Each one ends by suggesting the <code>git add ... &amp;&amp; git commit -m '...'</code> line for the designer to paste. The designer stays in control of what enters version history.

## More info

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li>Repo: <a href="https://github.com/DEFRA/interaction-designer-layered" class="govuk-link">DEFRA/interaction-designer-layered</a> on GitHub</li>
<li>Before you point <code>read-corpus</code> at real design material, check what you can feed an AI tool in <a href="/ai-toolkit/guidance/using-data-with-ai" class="govuk-link">Using data with AI</a></li>
</ul>
