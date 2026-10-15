---
title: Designing for AI-assisted journeys
caption: Design
description: 'People increasingly use AI tools to find, understand and use government services. This guidance helps Defra service teams make sure those people still reach accurate, trusted outcomes.'
layout: section
sectionTitle: Design
sectionNav: nav-design
supportBox:
  title: Get support
  description: Contact the Design Team with your questions
  items:
    - >-
      Email: <a href="mailto:DesignOps@defra.gov.uk"
      class="govuk-link">DesignOps@defra.gov.uk</a>
breadcrumbItems:
  - text: Digital Defra
    href: /
  - text: Digital service manual
    href: /service-manual
  - text: Design
    href: /design
  - text: Designing for AI-assisted journeys
---

<p class="govuk-body-l">AI search, assistants and agents may already be affecting your service without you knowing. If you do not check and act, you risk increasing failure demand across your service.</p>

^ This guidance is based on early findings from testing AI-assisted journeys on a Defra service. The picture will develop as evidence grows across Defra and wider government, and as AI tools and technology evolves. Help keep this guidance up to date by sharing your own findings and examples. ^

## What this guidance is about

AI is adding a new context of use for government services. Before, during or instead of using your service, people may:

- get an AI-generated answer in search before they click a government link
- ask an AI assistant in their browser or productivity tools to interpret what is on screen
- use an AI agent to complete tasks on their behalf, sometimes repeatedly and at scale

This is not about designing services for AI instead of people. It is about making sure that when people use AI as part of their journey, your service still leads them to accurate, trusted and usable outcomes.

## Why it's important

The service experience may now start outside your service. Users may already have been given a route, a classification or a suggested action before they reach you. That answer can feel complete, even when it is incomplete, out of date or wrong.

If you do not consider AI-assisted users, you risk:

- users acting on false or outdated information, such as the wrong result for their location
- users being sent to slower, historic routes that create manual work for your team
- users following invented service steps that do not exist
- falling user visits to your service that do not show up clearly in analytics
- more support contacts from confused or unhappy users
- sudden, unmanaged demand from automated requests

This creates failure demand: avoidable work caused by users not getting the right outcome first time. It is often hard to trace back to AI, so do not assume your service is unaffected until you have checked.

Designing for AI-assisted journeys is not a new requirement. It is part of meeting the [Service Standard](https://www.gov.uk/service-manual/service-standard), which already asks teams to understand the whole journey users take, help them succeed first time, and keep improving as technology changes.

Services that went live before AI summaries, assistants and agents were widely used were not designed with this in mind. That does not mean they are failing. It means they may need another round of discovery, testing and iteration.

## Types of AI-assisted user

This guidance is split into 3 types of AI-assisted user. Many people will be more than one type.

- [Users who get answers from AI search](/design/designing-for-ai-assisted-journeys/users-who-get-answers-from-ai-search) – People who receive an AI summary or chatbot answer before, or instead of, visiting your service.
- [Users who use AI assistants with your service](/design/designing-for-ai-assisted-journeys/users-who-use-ai-assistants) – People who ask an AI assistant to read, explain or summarise your service while they use it.
- [Users who delegate tasks to AI agents](/design/designing-for-ai-assisted-journeys/users-who-delegate-tasks-to-ai-agents) – People and organisations using agents to complete tasks for them, including at scale.

## What designers should do

These 5 things apply to every service, whatever type of AI-assisted user you design for:

1. [Treat AI-assisted use as a new context of use](/design/designing-for-ai-assisted-journeys/what-designers-should-do#treat-ai-assisted-use-as-a-new-context-of-use)
2. [Make the source of truth easy to recognise](/design/designing-for-ai-assisted-journeys/what-designers-should-do#make-the-source-of-truth-easy-to-recognise)
3. [Monitor the journey before the click](/design/designing-for-ai-assisted-journeys/what-designers-should-do#monitor-the-journey-before-the-click)
4. [Design for people first](/design/designing-for-ai-assisted-journeys/what-designers-should-do#design-for-people-first)
5. [Welcome helpful automation and plan for the demand it brings](/design/designing-for-ai-assisted-journeys/what-designers-should-do#welcome-helpful-automation-and-plan-for-the-demand-it-brings)

## When this matters most

This guidance is especially important if your service:

- relies on live or location-specific data that users need to make decisions
- has its main call to action behind triage questions, forms or interactive steps
- uses maps, visual layers, dynamic panels or other complex visuals
- relies on JavaScript to show key content, routes or results
- has older guidance that describes previous routes, such as requesting something by email
- publishes data through APIs, feeds or other structured routes
- has downstream processes that are manual or only partly automated
