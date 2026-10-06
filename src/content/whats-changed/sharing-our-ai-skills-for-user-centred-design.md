---
title: Sharing our AI skills for user-centred design
date: 2026-10-12
type: Blog post
author: Chris Leo
authorRole: AI Design Lead
summary: We have published the instructions we give AI for design and research work, so any team can use them.
---

In my [last post](/ai-toolkit/whats-changed/why-we-are-building-a-way-to-ask-the-toolkit), I explained why we are building Ask the toolkit. This time I want to share the AI skills we used to design and test it. They are open, so any team can use them and help improve them.

## What a skill is

A skill is a set of written instructions that an AI assistant follows for one kind of task. It is like giving a new colleague your team's method, its standards and a worked example. The assistant picks it up when your request matches.

Each skill sets out a method: the rule, the reason for it and a real example. That way a designer can learn from it too.

## Skills for designers

The user-centred designer skills cover 3 kinds of work:

- writing and visual style, built on the GOV.UK content design rules
- service design, for blueprints and journey maps
- interaction and content design, for prototypes, Design System patterns and accessibility

I have refined them over a year of real work: on this service manual, content for Defra's delivery groups, the AI digital toolkit and several incubator projects, including one with the Rural Payments Agency. Whenever a design decision would help other services too, it went into a skill. So every rule comes from a real decision on a real service.

## A usability check before research

Before we tested Ask with people, we wanted to fix the problems almost anyone would hit. So we built a skill that lets AI try a service first.

The synthetic usability review skill tries a service in a real browser. It plays different kinds of people, each doing a real job.

It checks every screen against:

- Nielsen's 10 usability heuristics
- Microsoft's guidelines for human-AI interaction
- the GOV.UK Design System

Then a second AI reviews the same evidence on its own. One reviewer finds only about a third of the problems, so a second review catches more.

<figure>
  <ol class="app-flow">
    <li class="app-flow__step"><strong class="app-flow__action">AI tries the jobs</strong>as different people</li>
    <li class="app-flow__step"><strong class="app-flow__action">Another AI</strong>reviews it alone</li>
    <li class="app-flow__step"><strong class="app-flow__action">Fix the obvious</strong>before research</li>
    <li class="app-flow__step"><strong class="app-flow__action">People test</strong>how it feels to use</li>
  </ol>
</figure>

On Ask, it played 4 kinds of people doing 10 jobs. It found 29 problems, 5 of them serious enough to fix before research.

The most serious was about who to tell after a mistake with data. Ask's answer was right for most people at Defra, but the person asking worked somewhere with a different process. A good answer in general can still be wrong for the person asking. So the skill asks one question before it judges any answer: what did this person need to hear?

## What it cannot do

A week later, 6 people tried Ask. They found things the review did not. Reporting a problem was the hardest task. The box for a follow-up question looked too small for a real question.

^ The AI found what was broken. People found what it was like to use. ^

That is why every report the skill writes says, near the top, that it is not research with real people. Synthetic users are not users.

It also never guesses who uses your service, or what they need to do. Those come from you.

<figure>
  <picture>
    <source media="(max-width: 40.0525em)" srcset="/public/images/whats-changed/skills-asks-phone.png">
    <img src="/public/images/whats-changed/skills-asks.png" alt="A section of the skill's page on GitHub, headed &quot;What it asks you&quot;. It says the skill asks 4 things before it starts: who uses the service, what they are trying to do, where the service is running, and which screens exist, including errors and waiting.">
  </picture>
  <figcaption>The skill's page on GitHub. It asks 4 questions before it tries anything.</figcaption>
</figure>

## Use them and help improve them

The skills are on GitHub under the Open Government Licence. Skills follow an open standard, so they work in many AI tools, including [GitHub Copilot](/ai-toolkit/tools/github-copilot) and [Claude Code](/ai-toolkit/tools/claude-code-marketplace). Before you point them at real material, check [Using data with AI](/ai-toolkit/guidance/using-data-with-ai).

<a href="https://github.com/DEFRA/defra-ai-plugins" role="button" draggable="false" class="govuk-button" data-module="govuk-button">See the skills on GitHub</a>

<p class="govuk-body">Found something wrong or missing in a skill?<br>Email <a class="govuk-link" href="mailto:AICapabilityAndEnablement@defra.gov.uk">AICapabilityAndEnablement@defra.gov.uk</a></p>
