---
title: What designers should do
caption: Designing for AI-assisted journeys
description: 'Responding to AI-assisted users does not need to be defensive. Most of what helps is what good government services already aim to do.'
layout: section
sectionTitle: Design
sectionNav: nav-design
breadcrumbItems:
  - text: Digital Defra
    href: /
  - text: Digital service manual
    href: /service-manual
  - text: Design
    href: /design
  - text: Designing for AI-assisted journeys
    href: /design/designing-for-ai-assisted-journeys
  - text: What designers should do
---

These 5 themes apply to every service. The pages for each type of AI-assisted user explain how to apply them in more detail.

<h2 class="govuk-heading-m" id="treat-ai-assisted-use-as-a-new-context-of-use">1. Treat AI-assisted use as a new context of use</h2>

Consider AI-assisted use alongside browser, device, accessibility and assisted digital testing. It is a change in the environment around your service, not a sign that your service has failed.

You should:

- add AI-assisted scenarios to your test plan, especially for maps, dynamic panels and multi-step triage journeys
- test your key journeys with AI assistants and agents
- plan a round of discovery if your service went live before AI summaries, assistants and agents were widely used
- ask users in research and feedback whether they used an AI summary, AI assistant or AI-generated advice before or during their journey

<h2 class="govuk-heading-m" id="make-the-source-of-truth-easy-to-recognise">2. Make the source of truth easy to recognise</h2>

AI search answers fill gaps from whatever evidence they can find, and AI assistants can misread what is on screen. Make the authoritative route and data easy for people and tools to find.

You should:

- say clearly where users should go for authoritative, up-to-date results
- make the intended route visible on start pages and guidance pages, before users reach complex interactive steps
- work with the BAU content team on your GOV.UK start page and guidance, so the real steps and the right route are clear. [Designing for different content types](/content/designing-different-content-types) explains what they manage
- describe the real steps of your journey as numbered steps on your start page, so AI tools have the actual process to quote
- write content that AI search can quote accurately, with self-contained sections and the answer first
- update, archive or add clear warnings to older content that no longer reflects the preferred journey
- where you publish APIs, feeds or structured data, explain what they can and cannot be used for
- check with your developers that AI crawlers are not all blocked by default, so AI tools can find your official content

<h2 class="govuk-heading-m" id="monitor-the-journey-before-the-click">3. Monitor the journey before the click</h2>

Users may get an answer before they reach you, so your analytics may not show the whole picture. Bot traffic is also growing, so look at user traffic separately from automated traffic.

You should:

- run regular prompt checks on the questions where a wrong answer would cause the most harm
- look for support contacts and feedback that mention AI answers
- ask users in research whether they used an AI tool before or during their journey
- work with your performance analyst to track user traffic, AI referrals and how often your pages appear in AI answers

<h2 class="govuk-heading-m" id="design-for-people-first">4. Design for people first</h2>

Most changes that help AI tools also help people, particularly people who use assistive technology or find complex visuals hard to use.

You should:

- make sure maps and complex visuals have a text alternative that says what they show. [Test for accessibility](/accessibility/test-for-accessibility) explains how to check this
- provide structured alternatives, such as uploading a file or reading a text summary, so users are not forced through an interaction that people or tools find hard to interpret
- use clear, plain content and semantic HTML so the meaning of each page does not depend on visuals alone
- build with progressive enhancement, so core content, routes and results are in the HTML your server sends and work before any JavaScript runs

^ **Progressive enhancement is essential.** It is already expected of government services, and it matters even more for AI-assisted users. Google renders JavaScript, but most other AI crawlers (at the time of publishing) do not, and some AI tools run it late or only partly. Anything that only appears after scripts run, such as a call to action, a result or an updated panel, may be invisible to or misread by assistants. ^

<h2 class="govuk-heading-m" id="welcome-helpful-automation-and-plan-for-the-demand-it-brings">5. Welcome helpful automation and plan for the demand it brings</h2>

Many agents will be productivity tools helping legitimate users. Enable this, but do not expose your service or team to unmanaged demand.

You should:

- decide which tasks suit automation, and which need a person to use the full service
- offer structured routes where they help people and agents, such as uploading a file
- agree with your team and operational colleagues how much demand the service can handle
- plan human checks for high-volume or high-impact requests
- when you make a journey easier to automate, agree the controls in the same piece of work

## Test with AI tools

AI tools are now part of the environment your service runs in. Test against them as part of your normal quality assurance, not as a one-off exercise.

You should:

- add the AI assistants and browser agents your users are most likely to have to your test plan
- write test scenarios for key journeys that check whether assistants and agents find the right route and describe results correctly
- test with JavaScript turned off to check core content, routes and results still work
- check that when content on the page changes, the change is announced to screen readers
- repeat prompt checks after releases and content changes

Agree with your testers how AI tools fit into your wider testing, including testing for automated demand. The [recommended approach to testing](/testing-and-assurance/recommended-approach) links to the performance test strategy.

^ AI tools change often, and the same prompt can give different answers. Test regularly, record which tool and version you used, and look for patterns rather than relying on a single result. ^

## When to do it

| **Phase** | **What to do** |
|---|---|
| **Discovery** | Find out whether users arrive via AI answers or use AI tools. Run baseline prompt checks. Map where AI answers could mislead users. |
| **Alpha** | Prototype clear start pages, numbered steps and structured alternatives. Test key journeys with AI assistants. |
| **Beta** | Agree with your team how you will monitor AI referrals and automated demand. Add AI assistants to your test plan. Agree the controls you need before you go live. |
| **Live** | Repeat prompt checks regularly and after content changes. Re-test with AI assistants after releases. Review older content. |
