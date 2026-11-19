---
title: "6b. Choose the lowest energy AI model that meets your needs"
caption: "Artificial intelligence"
description: "A model's size, design and reasoning needs drive the computing, memory and energy it uses. Choose the smallest, most efficient model that does the job well enough."
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
  - text: "6b. Choose the lowest energy AI model that meets your needs"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
**Applies to:** any team choosing an AI model for a service, internal tool or agent, on or off the Core Delivery Platform (CDP). If you buy software with AI built in, ask the supplier how they chose the model.

**Lead role families:** AI engineer, architect and software

---

## (i) Choose the smallest viable model for your task

In Defra, the AI toolkit says to [use the smallest model that meets your needs](/ai-toolkit/guidance/sustainability). This point explains why.

The size of an AI model is mainly set by its number of parameters: the internal variables it uses to process information and make predictions.

General-purpose generative models, such as large language models (LLMs), are trained on broad datasets and can do many tasks, such as writing code or generating text or images. Task-specific models are built and fine-tuned for one well-defined job, using specific datasets. General-purpose models usually have far more parameters.

Choosing the smallest model that can do the job can cut energy use a lot, in training and in inference. Inference is when a trained model runs to answer a request.

Test a smaller model against your real task before you commit. Defra's [green summarisation pattern](/ai-toolkit/patterns/green-summarisation) found that small local models matched an LLM on short summaries, but could not produce longer, detailed ones.

Smaller models can sometimes run on local devices rather than in the cloud. See [6d (v) Run AI models at the edge](/digital-sustainability/actions/ai/operating).

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, smaller and task-specific models bring co-benefits in terms of:

- accuracy: task-specific models often do better than larger models where workflows are well defined
- governance: task-specific models can make it easier to apply strict compliance and safety guardrails
- speed: smaller models usually run inference faster
- cost: task-specific models are often much cheaper to use than larger, general models

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- versatility: general-purpose models can move into unfamiliar areas and respond to out-of-scope prompts

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Task-specific models and content understanding](https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/the-future-of-ai-horses-for-courses---task-specific-models-and-content-understan/4363563/) (Microsoft)
- [Choose the right AI model for your workload](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/choose-ai-model) (Microsoft Azure)
- [Use right-sized and energy-efficient AI models](https://patterns.greensoftware.foundation/development/right-sized-energy-efficient-ai-models/) (Green Software Foundation)

</div>
</details>

---

## (ii) Choose an energy-efficient model

Models of similar size and purpose can still vary a lot in how much energy they use.

Compare models and choose the most energy-efficient one that gives outputs of acceptable quality and accuracy for your needs. These tools compare the energy use of AI models.

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header">Tool</th><th scope="col" class="govuk-table__header">Description</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">AI Energy Score (Hugging Face)</th><td class="govuk-table__cell">A benchmark and 1 to 5 star rating that compares the energy efficiency of AI models during inference, using a standard method to publish scores for each task and model</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">ML.ENERGY Leaderboard</th><td class="govuk-table__cell">A public benchmark that tracks and compares the energy use and performance of open-weight large language models</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">whatmodel.sh</th><td class="govuk-table__cell">An open-source leaderboard that filters models by hardware, such as RAM, Apple Silicon and GPU type, and shows performance against resource use or price</td></tr></tbody></table>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, choosing an energy-efficient model brings co-benefits in terms of:

- cost: models that use less computing power per request are often cheaper per token
- speed: efficient models usually respond faster, which helps users waiting for an answer

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- evidence gaps: energy leaderboards mostly cover open-weight models, so many commercial models have no published score
- delivery time: testing several models against your own tasks takes time before you can choose
- accuracy: the most efficient model may fall short on harder cases, so test with real examples

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [AI Energy Score](https://huggingface.co/blog/sasha/ai-energy-score-v2) (Hugging Face)
- [AI energy and carbon dashboards](https://cleerdash.sustainableaigroup.com/) (Sustainable AI Group)

</div>
</details>

---

## (iii) Choose a model with the minimum required modality

A multimodal AI model can process and generate several types of data, such as text, images, audio and video. This can be useful, for example to write a description of an image.

The more modes a model has, the more energy it tends to use.

Choose a model with only the modes your project needs. For example, a text chatbot does not need a model that can generate images.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, choosing a model with only the modes you need brings co-benefits in terms of:

- cost: text-only models are usually cheaper per request than multimodal ones
- security: accepting fewer input types reduces the ways hidden instructions can reach the model
- speed: simpler models usually respond faster

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- versatility: if the service later needs images or audio, you may have to choose and test a new model
- complexity: running separate single-mode models for different tasks adds routing and maintenance work

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [What is multimodal AI](https://www.ibm.com/think/topics/multimodal-ai) (IBM)
- [Multimodal AI](https://cloud.google.com/use-cases/multimodal-ai) (Google Cloud)

</div>
</details>

---

## (iv) Consider open-source AI models

An open-source AI model publishes its source code, model parameters (weights) and documentation under a licence that lets others use and change them. They are not in the public domain: the licence sets what you can do. Some models described as open, such as Llama, are open-weight. Their weights are published but their training data is not, and the licence may limit how you use them.

Open models are usually general-purpose rather than task-specific. Examples include Mistral, Llama, Gemma and GPT-OSS.

Open models usually tell you more about their performance and energy efficiency than closed models. They are also easier to audit for flaws. But published weights can also help attackers.

If you need a general-purpose model, consider an open one. In Defra, models must come through an approved route. Check the [AI toolkit tools](/ai-toolkit/tools) and talk to the AI Capability and Enablement team before you use one.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, using open-source models brings co-benefits in terms of:

- transparency: published weights and documentation make performance and energy use easier to compare
- portability: open models can move between hosting options, which reduces lock-in to one provider
- cost: self-hosted open models carry no licence fee, though hosting costs still apply

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- security: the team must check, patch and monitor the model itself, with no vendor support contract
- licensing: some open models publish weights but restrict how they can be used, so check the licence
- hosting: self-hosting needs GPUs and specialist skills, though some open-weight models are also offered as managed models, for example through Amazon Bedrock

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [What is open-source AI](https://www.ibm.com/think/topics/open-source-ai) (IBM)
- [Security](https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government/artificial-intelligence-playbook-for-the-uk-government-html#security) (Artificial Intelligence Playbook for the UK Government)
- [Open source, open risks: the growing dangers of unregulated generative AI](https://www.ibm.com/think/insights/unregulated-generative-ai-dangers-open-source) (IBM)
- [AI, open code and vulnerability risk in the public sector](https://www.gov.uk/guidance/ai-open-code-and-vulnerability-risk-in-the-public-sector) (Government Digital Service)

</div>
</details>

---

## How to measure this

[Measuring the impact of AI](/digital-sustainability/measure/ai) explains how to estimate a model's energy use, so you can compare the options.
