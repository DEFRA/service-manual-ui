---
title: "6d. Take a sustainable approach to operating AI"
caption: "Artificial intelligence"
description: "Operate AI efficiently by matching models to tasks, reducing repeated processing, managing token use, optimising agentic workflows and using edge AI where appropriate."
layout: section
sectionNav: nav-ds-ai
customNav: nav-digital-sustainability
headerServiceName: Digital sustainability
headerServiceUrl: /digital-sustainability
breadcrumbItems:
  - text: "Digital Defra"
    href: /
  - text: "Digital sustainability"
    href: /digital-sustainability
  - text: "Digital sustainability actions"
    href: /digital-sustainability/actions
  - text: "Artificial intelligence"
    href: /digital-sustainability/actions/ai
  - text: "6d. Take a sustainable approach to operating AI"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
**Lead role families:** AI Engineer, Architect, Software

**Likely co-benefits:** Cost, service performance

---

## (i) Implement a multi-tiered approach to AI

Rather than relying on a single solution, a multi-tier approach means the right AI model is selected for each task.

Implementing a multi-tiered approach requires that a suitable range of AI technologies (such as AI agents, Large Language Models and decision models) are available in an organisation. User prompts and agent workflows can then be directed to the simplest and/or most cost-effective model capable of solving them reliably.

A multi-tiered approach reduces waste by avoiding simple prompts being sent to complex models, and in this way reduces energy consumption.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [Multi-LLM routing strategies for generative AI applications on AWS,](https://aws.amazon.com/blogs/machine-learning/multi-llm-routing-strategies-for-generative-ai-applications-on-aws/) Amazon Web Services

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, a multi-tiered approach to AI brings co-benefits in terms of:

- Accuracy: Appropriate multi-tiered approach reduces risk of error within an AI workflow

### Trade-offs

Potential trade-offs may include:

- Versatility: G

</div>
</details>

See also [6a. (i) Be clear on the use case for AI](/digital-sustainability/actions/ai/need-and-readiness)

---

## (ii) Implement prompt caching

Prompt caching stores the frequently unchanged first part of an AI prompt so the model does not have to reprocess those tokens on every request.

This approach can reduce input token usage by as much as 80%, lowering energy use and costs significantly

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [What is prompt caching?,](https://www.ibm.com/think/topics/prompt-caching/) IBM

</div>
</details>

---

## (iii) Implement token metering

Token metering is the process of tracking the number of tokens consumed when interacting with an AI model.

This can cover both the ‘input’ tokens (consumed through the prompts, conversation history and files provided to models) and the tokens associated with the ‘outputs’ that are generated in response.

Token metering provides insight into opportunities for optimisation of AI use, and can guide intelligent model routing, where prompts are matched to smaller, task-specific models.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [Tokens and greens: Measuring the impacts of agentic AI,](https://greensoftware.foundation/articles/tokens-and-greens-measuring-the-impacts-of-agentic-ai/) Green Software Foundation
- [Return on AI: How CFOs and CIOs can manage the token meter,](https://www.bcg.com/publications/2026/managing-ai-token-costs/) Boston Consulting Group

</div>
</details>

See also [6d. (i) Implement a multi-tiered approach to AI](/digital-sustainability/actions/ai/operating)

---

## (iv) Optimise agentic AI workflows

Agents are autonomous AI systems that can make decisions and perform actions with minimal human supervision.

An AI agentic workflow is a multi-step process within which agents make decisions and interact with tools and datasets following a set of predefined rules.

Agentic AI has the potential to automate complex processes, deliver significant efficiencies and with this, resource savings. However Agentic AI also comes with significant resource consumption of its own.

Optimising the workflow that AI agents follow ensures that energy consumption is reduced as far as possible while output quality is maximised.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [AI Insights: Agentic Workflow,](https://www.gov.uk/government/publications/ai-insights/ai-insights-agentic-workflow-html/) Department for Digital, Culture, Media & Sport and Government Digital Service
- [Optimize agent orchestration to reduce unnecessary model calls,](https://patterns.greensoftware.foundation/development/optimize-agent-orchestration-reduce-model-calls/) Green Software Foundation

</div>
</details>

---

## (v) Run AI models 'at the edge'

Instead of sending data to a model in the cloud, using AI 'at the edge' means running models directly on local hardware such as laptops, mobile phones, or edge servers.

This approach can mean that data is processed near its source, reducing network usage and overall energy consumption.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [Run AI models at the edge,](https://patterns.greensoftware.foundation/architecture/system-topology/run-ai-models-edge/) Green Software Foundation
- [Foundation models at the edge,](https://www.ibm.com/think/insights/edge-ai-strategy/) IBM

</div>
</details>
