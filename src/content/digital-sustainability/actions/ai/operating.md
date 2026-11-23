---
title: "6d. Take a sustainable approach to operating AI"
caption: "Artificial intelligence"
description: "Run AI efficiently. Match each task to a suitable model, avoid repeated processing, track the tokens you use, trim agent workflows and run models locally where it helps."
layout: section
sectionNav: nav-ds-ai
customNav: nav-digital-sustainability
headerServiceName: Sustainability
headerServiceUrl: /digital-sustainability
breadcrumbItems:
  - text: "Digital Defra"
    href: /
  - text: "Sustainability"
    href: /digital-sustainability
  - text: "Digital sustainability actions"
    href: /digital-sustainability/actions
  - text: "Artificial intelligence"
    href: /digital-sustainability/actions/ai
  - text: "6d. Take a sustainable approach to operating AI"
---
<div class="app-applies-to">

**This action applies to:** any team running AI in a service, internal tool or agent, on or off the Core Delivery Platform (CDP). That includes models you reach through a provider such as Amazon Bedrock.

**Lead role families:** AI engineer, architect and software

</div>

---

## (i) Implement a multi-tiered approach to AI

A multi-tiered approach means choosing the right AI model for each task, rather than relying on one model for everything.

Your organisation needs a range of AI technologies for this, such as AI agents (see (iv)), large language models and decision models. Each prompt or agent workflow then goes to the simplest or most cost-effective model that can handle it reliably.

This avoids sending simple prompts to complex models, which cuts waste and energy use.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, a multi-tiered approach to AI brings co-benefits in terms of:

- accuracy: matching each task to a suitable model reduces the risk of errors in an AI workflow

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- complexity: routing prompts to different models adds a layer to build, test and maintain

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Multi-LLM routing strategies for generative AI applications on AWS](https://aws.amazon.com/blogs/machine-learning/multi-llm-routing-strategies-for-generative-ai-applications-on-aws/) (Amazon Web Services)

</div>
</details>

See also [6a (i) Be clear on the use case for AI](/digital-sustainability/actions/ai/need-and-readiness).

---

## (ii) Implement prompt caching

AI models read and write text in tokens, which are small chunks of words. Input tokens are what you send the model. Output tokens are what it sends back.

Often the first part of a prompt stays the same between requests. Prompt caching stores that part, so the model does not reprocess those tokens every time. The model processes fewer input tokens, which cuts energy use and cost.

Prompt caching is not the same as caching results. The AI toolkit says to [cache results](/ai-toolkit/guidance/sustainability). That means storing the model's responses to repeated, similar requests, so you do not call the model again. Use both where they fit. Cached responses can go out of date, so decide how long to keep them.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, prompt caching brings co-benefits in terms of:

- cost: tokens read from the cache are usually billed at a lower rate than standard input
- speed: the model skips reprocessing the cached part, so responses start sooner

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- short cache life: many prompt caches expire after a few minutes without use, so low-traffic services gain little
- write cost: writing to the cache can cost more than standard input, so savings depend on reuse
- prompt design: savings only come when the fixed part of the prompt sits at the start and stays unchanged
- freshness: cached responses can be out of date, so set how long they are kept

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [What is prompt caching](https://www.ibm.com/think/topics/prompt-caching) (IBM)

</div>
</details>

---

## (iii) Implement token metering

Token metering tracks the tokens your service uses when it calls an AI model. It can count input tokens, from prompts, conversation history and files. It can also count the output tokens the model generates.

Token metering shows where you can use AI more efficiently. It can also guide model routing, where prompts go to smaller, task-specific models.

Measure input and output tokens together. Defra's [token optimisation pattern](/ai-toolkit/patterns/token-optimisation) found that when prompts were compressed, models wrote longer responses. This partly cancelled out the input savings. Fewer input tokens does not always mean less energy.

Log token counts, not prompt text, unless you need the content. Full logs can hold personal data.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, token metering brings co-benefits in terms of:

- cost: teams can see where tokens go and set budgets or alerts before costs grow
- service performance: metering spots runaway prompts or agent loops early
- governance: token data gives evidence for model choice and sustainability reporting

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- proxy measure: tokens do not map directly to energy, which varies by model and hardware
- overhead: dashboards and alerts take time to set up, and need someone to act on them

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Tokens and greens: measuring the impacts of agentic AI](https://greensoftware.foundation/articles/tokens-and-greens-measuring-the-impacts-of-agentic-ai/) (Green Software Foundation)
- [Return on AI: how CFOs and CIOs can manage the token meter](https://www.bcg.com/publications/2026/managing-ai-token-costs/) (Boston Consulting Group)

</div>
</details>

See also (i) Implement a multi-tiered approach to AI, on this page.

---

## (iv) Optimise agentic AI workflows

AI agents are autonomous AI systems that make decisions and perform actions with little human supervision. In an agentic workflow, agents work through several steps, using tools and datasets and following set rules.

When you cut steps to save energy, keep a human approval step before an agent writes to any system. Read the AI toolkit's guidance on [working with agents](/ai-toolkit/guidance/working-with-agents).

Agentic AI can automate complex processes and save resources. But it also uses a lot of resources itself.

Design the workflow your agents follow so it makes only the model and tool calls it needs, and still gives high-quality output. In Defra, also read [working with AI agents](/ai-toolkit/guidance/working-with-agents).

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, optimising agentic workflows brings co-benefits in terms of:

- cost: fewer model and tool calls per task lower running costs
- reliability: shorter, well-defined workflows are easier to test and give more predictable results
- security: limiting which tools an agent can call reduces the harm if it is misled
- speed: fewer steps mean users get a result sooner

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- versatility: tighter workflows handle unexpected cases less well and may need a human fallback
- delivery time: finding which steps to cut takes evaluation, logging and testing

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [AI insights: agentic workflow](https://www.gov.uk/government/publications/ai-insights/ai-insights-agentic-workflow-html) (Department for Digital, Culture, Media and Sport and Government Digital Service)
- [Optimize agent orchestration to reduce unnecessary model calls](https://patterns.greensoftware.foundation/development/optimize-agent-orchestration-reduce-model-calls/) (Green Software Foundation)

</div>
</details>

---

## (v) Run AI models at the edge

Running AI at the edge means running models on local hardware, such as laptops, mobile phones or edge servers. You do not send the data to a model in the cloud.

Data is processed near where it is created. This reduces network use and can reduce overall energy use.

Defra's [green summarisation pattern](/ai-toolkit/patterns/green-summarisation) ran small models locally. They handled short summaries well and kept the source text on Defra infrastructure. But they could not produce longer, detailed summaries.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, running AI models at the edge brings co-benefits in terms of:

- security: data can stay on the device, which reduces what is sent and stored elsewhere. The rules on [using data with AI](/ai-toolkit/guidance/using-data-with-ai) still apply
- speed: running the model on the device (local inference) avoids network round trips, so responses can be faster
- resilience: local models can keep working with a poor connection or none

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- device capability: edge models need enough memory and processing power, which older devices may lack
- inclusion: requiring newer devices can exclude some users and push early hardware replacement (see [8a. Extend the working life of hardware](/digital-sustainability/actions/hardware/extend-hardware-life))
- device management: Defra Group IT manages staff devices, so local models need its approval and support

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Run AI models at the edge](https://patterns.greensoftware.foundation/architecture/system-topology/run-ai-models-edge/) (Green Software Foundation)
- [Foundation models at the edge](https://www.ibm.com/think/insights/edge-ai-strategy) (IBM)

</div>
</details>

---

## How to measure this

[Measuring the impact of AI](/digital-sustainability/measure/ai) explains how to use token counts to estimate energy use.
