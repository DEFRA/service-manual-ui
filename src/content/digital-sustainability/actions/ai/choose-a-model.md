---
title: "6b. Choose the lowest energy AI model that meets your needs"
caption: "Artificial intelligence"
description: "The AI model chosen for a digital service can significantly affect its environmental impact because model size, architecture and reasoning requirements influence the computing, memory and energy needed for training and inference."
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
**Lead role families:** AI Engineer, Architect, Software

**Likely co-benefits:** Cost, service performance

---

## (i) Choose the smallest viable model for your task

The size of an AI model refers to its scale and complexity, primarily determined by the number of parameters (the internal variables) that the model uses to process information and make predictions.

General-purpose generative models (such as Large Language Models) are those that have been trained on broad datasets, and can perform a variety of tasks, such as coding and generating text or images. In contrast, task-specific models are those built and fine-tuned for a single, well-defined function and trained on specific datasets.

General-purpose models are usually more complex than task-specific models, with significantly more parameters.

Choosing the smallest model that can deliver for the task at hand can lead to significant reductions to energy usage across training and operational phases.

Smaller AI models can sometimes be run 'at the edge' rather than in the cloud.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [Task-specific models and content understanding](https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/the-future-of-ai-horses-for-courses---task-specific-models-and-content-understan/4363563/) Microsoft
- [Choose the right AI model for your workload](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/choose-ai-model/) Microsoft Azure
- [Use right-sized and energy-efficient AI models](https://patterns.greensoftware.foundation/development/right-sized-energy-efficient-ai-models/) Green Software Foundation

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, smaller and task-specific models bring co-benefits in terms of:

- Accuracy: Task-specific models often outperform larger models where workflows are well-defined
- Governance: Task-specific models can make it more straightforward to apply strict compliance and safety guardrails
- Speed: Smaller models usually allow for faster inference
- Cost: Task-specific models are often significantly cheaper to use than larger, general models

### Trade-offs

Potential trade-offs may include:

- Versatility: General-purpose models are able to pivot to unfamiliar domains and respond to out-of-scope prompts

</div>
</details>

---

## (ii) Choose an energy-efficient model

AI models of similiar size and task-specificity may still vary significantly in terms of their energy efficiency.

Evaluate and compare models to help you to choose the most energy-efficient options that provide outputs of acceptable quality and accuracy for your needs.

There are a number of AI model energy use comparison tools, which can help you choose models that are more energy-efficient.

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header">Tool</th><th scope="col" class="govuk-table__header">Description</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">AI Energy Score</th><td class="govuk-table__cell">A benchmarking tool and 1 to 5-star rating system designed to measure and compare the energy efficiency of artificial intelligence models during inference</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header"><strong>ML.ENERGY Leaderboard</strong></th><td class="govuk-table__cell">A dedicated public benchmarking platform designed to track and compare the energy consumption and performance of various open-weight Large Language Models (LLMs)</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">whatmodel.sh</th><td class="govuk-table__cell">An open-source AI leaderboard allowing users to filter models by hardware specs (RAM, Apple Silicon, GPU types) and view performance-versus-resource or price trade-offs</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Hugging Face AI Energy Score</th><td class="govuk-table__cell">The leaderboard uses a standardized methodology to publish per-task, per-model energy scores that allow apples-to-apples comparison across different foundation models</td></tr></tbody></table>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [AI energy score,](https://huggingface.co/blog/sasha/ai-energy-score-v2/) Hugging Face
- [AI energy & carbon dashboards,](https://cleerdash.sustainableaigroup.com/) Sustainable AI Group

</div>
</details>

---

## (iii) Choose a model with the minimum required modality

A 'multimodal' AI model is one that can process, interpret, and generate multiple types of data, such as text, images, audio, and video. This can bring value in connecting different data types, such as the ability to analyse and generate a written description of an image.

The more 'modes' a model has, the higher the energy consumption tends to be.

Where possible, choose AI models with only the modality required for your project. For example, a chat-bot AI application will not need a model that can generate images.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [What is multimodal AI?,](https://www.ibm.com/think/topics/multimodal-ai/) IBM
- [Multimodal AI,](https://cloud.google.com/use-cases/multimodal-ai/) Google Cloud

</div>
</details>

---

## (iv) Consider open-source AI models, where appropriate

An open-source AI model is one where underlying components, such as source code, model parameters and documentation are in the public domain.

Open-source AI models are usually general-use, rather than being task-specfic. There are a number available, such as Mistral, Llama, Gemma or GPT-OSS.

The open nature of these models usually provide more transparency about performance and energy-efficiency than closed-source models. However, the open nature can create trade-offs from a security perspective: While the open architecture permits security experts to audit code for vulnerabilities, knowing model weights and data used for training could aid the targeting of attacks.

If you need a general-purpose AI model, consider open source models.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [What is open-source AI?,](https://www.ibm.com/think/topics/open-source-ai/) IBM
- [Security,](https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government/artificial-intelligence-playbook-for-the-uk-government-html#security/) AI Playbook for the UK Government
- [Open source, open risks: The growing dangers of unregulated generative AI,](https://www.ibm.com/think/insights/unregulated-generative-ai-dangers-open-source/) IBM
- [AI, open code and vulnerability risk in the public sector,](https://www.gov.uk/guidance/ai-open-code-and-vulnerability-risk-in-the-public-sector/) Government Digital Service

</div>
</details>
