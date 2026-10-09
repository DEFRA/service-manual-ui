---
title: Why we are building a way to ask the toolkit
date: 2026-10-02
type: Blog post
author: Chris Leo
authorRole: Design Lead for the AI Capability and Enablement team
summary: Why we are adding a way to ask the toolkit questions, and how it builds on what GDS learned from GOV.UK Chat.
---

I lead design for the AI Capability and Enablement team, including the AI digital toolkit. In this post I explain the problem Ask the toolkit solves, how it builds on GOV.UK Chat, and how we keep people in charge of the answers that artificial intelligence (AI) writes.

## Search needs the right words

The question we hear most is "Can I put this data into an AI tool?" The answer is on a page called [Using data with AI](/ai-toolkit/guidance/using-data-with-ai). But you have to know that page exists, and what it is called.

We searched our own site for "can I use copilot with personal data" and got 20 results. None of them was the right page. So people email us instead, and wait.

## Asking keeps the detail that matters

When you ask a colleague, you tell them what you are doing. "I'm a supplier." "It's test data with real names in it." That context changes the answer. A search box throws it away. A conversation keeps it, and lets you ask a follow-up.

<figure>
  <picture>
    <source media="(max-width: 40.0525em)" srcset="/public/images/whats-changed/ask-conversation-phone.png">
    <img src="/public/images/whats-changed/ask-conversation.png" alt="A question, &quot;Can I use Copilot with personal data?&quot;, and the reply. The reply explains that Microsoft 365 Copilot is inside Defra's data boundary, but that is not clearance to use personal data in it. A rule from Using data with AI is shown in its own box, word for word: &quot;For personal data, the DPIA route is for a service you are building to process it, not a way to paste it into an everyday tool. For everyday use, remove personal data first.&quot; Under it are the guidance used and the line &quot;AI can make mistakes. Check the guidance before you act.&quot; Below the reply is a link to report a problem with this answer.">
  </picture>
  <figcaption>A reply from Ask the toolkit. The rule in the green-edged box is copied from the guidance, word for word.</figcaption>
</figure>

## Conversation is a new way to use government

In May 2026, the Government Digital Service (GDS) launched [GOV.UK Chat](https://gds.blog.gov.uk/2026/05/14/gov-uk-chat-launches/) in the GOV.UK app. People can ask about government in everyday words and get one joined-up answer. GDS calls it the biggest change to how people use government content since GOV.UK launched in 2012.

Chat started in the app, and GDS intends to make it [available on the GOV.UK website](https://gds.blog.gov.uk/2026/01/20/our-roadmap-for-modern-digital-government) too. Conversation could become a way to use government wherever people are. Designing it well is a new skill, and every department will need it.

Ask the toolkit builds on what GDS has shared about [designing Chat](https://insidegovuk.blog.gov.uk/2026/08/19/designing-gov-uk-chat-for-the-gov-uk-app/). It is a small, specialist service on the web, for Defra's digital teams. That means we can try ideas quickly, and share what works across government.

## AI can be wrong and still sound sure

That is the risk with a conversation. AI writes fluently, so a wrong answer can sound as convincing as a right one. We gave each job to whatever does it best.

<figure>
  <ol class="app-flow">
    <li class="app-flow__step"><strong class="app-flow__action">You ask</strong> in your own words</li>
    <li class="app-flow__step"><strong class="app-flow__action">AI drafts</strong> from the guidance</li>
    <li class="app-flow__step"><strong class="app-flow__action">Code checks</strong> quotes and links</li>
    <li class="app-flow__step"><strong class="app-flow__action">You decide</strong> with the sources</li>
  </ol>
</figure>

The guidance holds the rules. When an answer quotes a rule, code checks the words are really on the page. If they are not, the quote is removed. People write the guidance, and answer what the AI should not.

Ask is also honest about what it is. It has no name or face, and we designed it never to say 'I'. Every answer ends with 'AI can make mistakes. Check the guidance before you act.' And a person is always one step away, even when the AI is down.

## We build on how GDS tests GOV.UK Chat

GDS [checks Chat's answers](https://insidegovuk.blog.gov.uk/2026/05/15/developing-gov-uk-chat-our-data-science-and-ai-engineering-journey/) against clear measures, such as whether an answer comes from GOV.UK, and whether it is accurate and complete. AI marks the answers at scale, and experts check them by hand.

We do the same. We have more than 100 test questions, each with an answer we would accept. An AI marks every answer, and people check a sample. We also test for the risks in our own service:

- whole conversations, to check Ask keeps hold of what you told it earlier
- questions only Defra teams ask, such as which tools they can use with which data
- the marker itself, to check it marks fairly

That last one mattered most. People found the AI marker was too kind. It passed 13 of 21 answers that quoted a rule from the wrong page. So we made the rule stricter, and the scores went down. Ask had not got worse. The marking had got honest.

## What guides our work

^ AI can help you find an answer faster. The guidance, and the people who write it, stay in charge of what the answer is. ^

Before we tested Ask with people, we tested it with AI. [Sharing our AI skills for user-centred design](/ai-toolkit/whats-changed/sharing-our-ai-skills-for-user-centred-design) explains how, and shares the skills we built to do it.

<a href="/ai-toolkit/ask" role="button" draggable="false" class="govuk-button" data-module="govuk-button">Ask the toolkit a question</a>

<p class="govuk-body">Questions or ideas about Ask the toolkit?<br>Email <a class="govuk-link" href="mailto:AICapabilityAndEnablement@defra.gov.uk">AICapabilityAndEnablement@defra.gov.uk</a></p>
