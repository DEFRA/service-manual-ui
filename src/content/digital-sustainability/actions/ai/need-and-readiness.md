---
title: "6a. Be clear on the need and readiness for AI use"
caption: "Artificial intelligence"
description: "Check AI is the right tool first. AI you do not need wastes energy. You also need the data and governance to use it responsibly."
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
  - text: "6a. Be clear on the need and readiness for AI use"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
**Applies to:** any project thinking about using AI, on or off the Core Delivery Platform (CDP), before you choose a model or a tool.

**Lead role families:** AI engineer, architect and software

---

## (i) Be clear on the use case for AI

Not every problem needs artificial intelligence (AI). In Defra, the AI toolkit says to [use AI only when it is the best option](/ai-toolkit/guidance/sustainability). Use the toolkit to [check if AI is right for your idea](/ai-toolkit/triage/question-1).

Small or static datasets may not need machine learning or AI models. Traditional statistical methods may give the result you need for a fraction of the resources.

Different fields of AI use very different amounts of energy. It depends on the size of the model, how complex the task is, and whether the model is being trained or run in real time.

Before you choose AI, ask:

- will AI add benefit compared with non-AI technologies or processes?
- if you do need AI, which field fits the task? Do you need generative or agentic AI, or would a decision model do?

This table gives a broad guide to the relative energy use of common fields of AI.

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th class="govuk-table__header">AI field</th><th class="govuk-table__header">Description</th><th class="govuk-table__header">Relative energy use</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><td class="govuk-table__cell">Classifier models</td><td class="govuk-table__cell">Machine learning algorithms trained to assign labels or categories to input data</td><td class="govuk-table__cell">Low</td></tr><tr class="govuk-table__row"><td class="govuk-table__cell">Decision models</td><td class="govuk-table__cell">Models that answer a question by selecting from a fixed set of answers rather than generating new content</td><td class="govuk-table__cell">Low</td></tr><tr class="govuk-table__row"><td class="govuk-table__cell">Generative AI</td><td class="govuk-table__cell">Models that generate text, images, video or other outputs in response to prompts</td><td class="govuk-table__cell">Medium</td></tr><tr class="govuk-table__row"><td class="govuk-table__cell">Agentic AI</td><td class="govuk-table__cell">Autonomous systems that make decisions and perform actions with little human intervention</td><td class="govuk-table__cell">High</td></tr></tbody></table>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, avoiding unnecessary use of AI brings co-benefits in terms of:

- reliability: traditional analytics and automation can give more transparent and predictable outputs
- operational overhead: AI can add compliance and auditing work that established tools and processes do not need
- speed: for smaller or static datasets, traditional approaches may give results faster than AI

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

Use cases for AI:

- [What are you looking to do with AI](https://ai.gov.uk/knowledge-hub/) (AI.GOV.UK knowledge hub)
- [Principle 1: you know what AI is and what its limitations are](https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government/artificial-intelligence-playbook-for-the-uk-government-html#principle-1-you-know-what-ai-is-and-what-its-limitations-are) (Artificial Intelligence Playbook for the UK Government)
- [Assessing if artificial intelligence is the right solution](https://www.gov.uk/guidance/assessing-if-artificial-intelligence-is-the-right-solution) (GOV.UK)
- [The most valuable AI use cases for business](https://www.ibm.com/think/topics/artificial-intelligence-business-use-cases) (IBM)

Fields of AI:

- [Fields of AI](https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government/artificial-intelligence-playbook-for-the-uk-government-html#fields-of-ai) (Artificial Intelligence Playbook for the UK Government)
- [AI insights: agentic AI](https://www.gov.uk/government/publications/ai-insights/ai-insights-agentic-ai-html) (Department for Digital, Culture, Media and Sport and Government Digital Service)
- [What are classification models](https://www.ibm.com/think/topics/classification-models) (IBM)
- [What is machine learning](https://www.ibm.com/think/topics/machine-learning) (IBM)

</div>
</details>

See also [6d (i) Implement a multi-tiered approach to AI](/digital-sustainability/actions/ai/operating).

---

## (ii) Check you have suitable data for AI

AI learns from data to find patterns and make predictions or decisions. Good data gives more accurate and reliable results. Poor data can give biased or flawed outputs. You may need to clean it, and repair the data pipelines that collect and prepare it, before you can use it.

Make sure your data is accessible, relevant and good enough for what you want AI to do. In Defra, read [using data with AI](/ai-toolkit/guidance/using-data-with-ai) before you point any tool at real data.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, checking data is ready before using AI brings co-benefits in terms of:

- accuracy: complete, current and consistent data gives more accurate and less biased outputs
- delivery time: finding data gaps early avoids building a tool that stalls before it can go live
- compliance: knowing where data comes from and who owns it makes data protection checks quicker
- data quality: fixing data for AI also improves it for the service and for reporting

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- delivery time: cleaning data and repairing pipelines can take weeks before any AI work starts
- resource use: large data preparation jobs use computing power of their own, so size them to the task

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Making data ready for AI](https://ai.gov.uk/knowledge-hub/how-to/Making-data-ready-for-AI/) (AI.GOV.UK knowledge hub)
- [Data preparation for your AI model](https://online.hbs.edu/blog/post/data-preparation) (Harvard Business School)
- [Artificial intelligence](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/) (Information Commissioner's Office)

</div>
</details>

---

## (iii) Create and maintain a register of AI use

If your AI tool significantly influences a decision with a public effect, or interacts directly with the public, you must publish a record in the [Algorithmic Transparency Recording Standard (ATRS)](https://www.gov.uk/government/collections/algorithmic-transparency-recording-standard-hub). Read the AI toolkit's guidance on [ethics](/ai-toolkit/guidance/ethics).

To see which tools teams across Defra already use, check the [AI toolkit tools](/ai-toolkit/tools).

An AI register is a catalogue of the AI systems a project or organisation uses.

A register can record use cases, system types, ownership and data use, and track deployment, monitoring and compliance.

When you know which AI systems teams use, you can share and reuse tools and datasets, and use fewer resources.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, creating a register of AI use brings co-benefits in terms of:

- cost: a list of active AI systems helps you find redundant tools to remove and avoid duplicate purchases
- security: a register helps you find tools nobody knew about and monitor security weaknesses

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Algorithmic Transparency Recording Standard hub](https://www.gov.uk/government/collections/algorithmic-transparency-recording-standard-hub) (Government Digital Service): the cross-government standard for recording algorithmic tools, with its template and scope policy
- [Guidance for organisations using the Algorithmic Transparency Recording Standard](https://www.gov.uk/government/publications/guidance-for-organisations-using-the-algorithmic-transparency-recording-standard) (Government Digital Service): how to decide what to record and how to complete a record
- [Find out how algorithmic tools are used in public organisations](https://www.gov.uk/algorithmic-transparency-records) (GOV.UK): published records from other public bodies, useful as worked examples

</div>
</details>
