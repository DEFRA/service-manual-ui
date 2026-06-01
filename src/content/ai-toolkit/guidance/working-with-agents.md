---
title: Working with AI agents
caption: Deliver with AI
description: What Defra teams have learned about building AI agents. Identity and data, connecting to tools, evaluation and observability.
layout: section
sectionTitle: Deliver with AI
sectionNav:
  - title: In this section
    items:
      - text: Deliver with AI
        href: /ai-toolkit/deliver-with-ai
  - title: Choose tools and use data
    items:
      - text: Choosing a tool
        href: /ai-toolkit/guidance/choosing-a-tool
      - text: Using data with AI
        href: /ai-toolkit/guidance/using-data-with-ai
      - text: Keeping data safe
        href: /ai-toolkit/guidance/keeping-data-safe
      - text: Working with AI agents
        href: /ai-toolkit/guidance/working-with-agents
  - title: Use AI responsibly
    items:
      - text: Security
        href: /ai-toolkit/guidance/security
      - text: Ethics
        href: /ai-toolkit/guidance/ethics
      - text: Sustainability
        href: /ai-toolkit/guidance/sustainability
      - text: Report an AI incident
        href: /ai-toolkit/guidance/report-an-ai-incident
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
  - text: Deliver with AI
    href: /ai-toolkit/deliver-with-ai
  - text: Working with AI agents
supportBox:
  title: Ask AICE about agents
  description: Talk to us before you build an agent. We can share what other Defra teams have learned.
  items:
    - 'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Working%20with%20AI%20agents" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>'
---

<p class="govuk-body-l">An AI agent uses tools and data to carry out a task with limited human steering. Building one is new ground at Defra, so this page shares what teams have learned so far.</p>

## How agents handle identity and data

An agent never holds credentials or secrets. Identity is managed outside the agent, and only data is passed to it during a task, never keys.

An agent can only reach data the signed-in user is allowed to see. Access is enforced by the user's own identity.

A user without permission to a SharePoint site, for example, cannot retrieve its content through an agent, and a user with permission can. This is least-privilege by design.

Conversation state can be held for a single session, or kept for longer if you configure it. Decide what you actually need before you build.

## Connecting an agent to data and tools

An agent is only useful if it can reach external data or tools. There is more than one way to connect it.

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li><strong>Model Context Protocol (MCP).</strong> A standard way to expose tools and data to an agent. See <a href="/ai-toolkit/tools/model-context-protocol" class="govuk-link">Model Context Protocol</a>.</li>
<li><strong>Direct function calls.</strong> The agent calls a function you define.</li>
<li><strong>Structured prompts or payloads.</strong> You pass the agent the data it needs in a fixed shape.</li>
<li><strong>Code execution.</strong> The agent runs code, for example a Python tool, to fetch or process data.</li>
</ul>

You do not always need MCP. Pick the simplest approach that does the job.

Whatever you choose, the data rules still apply. Check [Using data with AI](/ai-toolkit/guidance/using-data-with-ai) and [Keeping data safe](/ai-toolkit/guidance/keeping-data-safe) before an agent touches real content.

An agent that can act on its own output raises the stakes, so keep a human approval step before anything writes to a system. See [Security](/ai-toolkit/guidance/security).

## Check your agent against expected answers

Test an agent with evaluations: structured tests that compare its output to answers your subject matter experts agree are correct. An LLM can act as the judge, and you run the tests across many cases to set a baseline.

Two kinds are worth running:

<ul class="govuk-list govuk-list--bullet govuk-list--spaced">
<li><strong>Answer correctness.</strong> Is the output right, compared to the expected answer?</li>
<li><strong>Behaviour validation.</strong> Did the agent use the right tools and data to get there?</li>
</ul>

Evaluations let you see whether a change improved the agent or quietly broke something else. Without them, you are guessing.

## See what your agent is doing

When an agent gives a wrong answer, you need to see how it got there. Agent platforms provide logs and traces that show each step the agent took.

Use them to find where it went wrong, then improve the prompt, the tools or the design. Treat this as a normal part of building, not an afterthought.

## Before you pick a platform

AICE is evaluating agent platforms, including AWS AgentCore and Microsoft Foundry, alongside extensions to the Core Delivery Platform. No platform is settled yet, and what is available changes often.

Talk to AICE before you commit to one, and we will tell you what is working today and what is not yet ready.
