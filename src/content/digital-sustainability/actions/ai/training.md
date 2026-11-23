---
title: "6c. Take a sustainable approach to training AI models"
caption: "Artificial intelligence"
description: "Training AI models uses a lot of computing power and energy. Reuse models that already exist, and make the models you train smaller through pruning, quantization and knowledge distillation."
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
  - text: "6c. Take a sustainable approach to training AI models"
---
<div class="app-applies-to">

**This action applies to:** only teams that train, fine-tune or adapt their own AI models, on or off the Core Delivery Platform (CDP). If you use a ready-made model without changing it, go to [6d. Take a sustainable approach to operating AI](/digital-sustainability/actions/ai/operating).

**Lead role families:** AI engineer, architect and software

</div>

---

## (i) Reuse pre-trained models

Reusing a model means taking one already trained for a task and using it for a new one. This saves time, cost and energy compared with training a model from scratch.

Transfer learning starts a new or related task from what a pre-trained model has already learned: its patterns, features and weights. Weights are the values a model learns during training. Two common ways to do this are:

- fine-tuning: unfreeze the pre-trained model's weights, so they can change, and train it further on a smaller, specialised dataset for your task
- feature extraction: keep the pre-trained model's layers frozen, so they do not change, and add new layers on top

Do not train a model from scratch if a suitable pre-trained model exists. Encourage transfer learning and model sharing between teams. In Defra, the AI toolkit says to [share models across teams](/ai-toolkit/guidance/sustainability), so one model run can serve several teams' needs.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, reusing pre-trained models brings co-benefits in terms of:

- cost: reusing a model avoids most of the computing cost of training from scratch
- delivery time: starting from a working model shortens build and test time
- reuse: one shared model can serve several teams, which cuts duplicate effort

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- bias: a pre-trained model carries the gaps and biases of its original training data
- fit: a model trained for another task may need fine-tuning before it is accurate enough
- licensing: check the model's licence allows your intended use and any changes you make

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [What is fine-tuning](https://www.ibm.com/think/topics/fine-tuning) (IBM)
- [Model fine-tuning concepts](https://learn.microsoft.com/en-us/windows/ai/fine-tuning) (Microsoft Learn)
- [What is transfer learning](https://www.ibm.com/think/topics/transfer-learning) (IBM)

</div>
</details>

---

## (ii) Prune AI models

Pruning removes parameters that contribute little to a model's output, such as weights, neurons and layers.

Pruning can greatly reduce a model's size, complexity and energy use while keeping its outputs accurate.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, pruning AI models brings co-benefits in terms of:

- speed: smaller models run faster, which cuts response times for users
- cost: a pruned model needs less memory, so it can run on cheaper hardware

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- accuracy: pruning can reduce accuracy on rare or edge cases, so retest with real data
- effort: pruned models often need retraining afterwards, which takes time and computing power
- scope: you can only prune models your team trains or hosts, not managed models from a provider

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Use right-sized and energy-efficient AI models](https://patterns.greensoftware.foundation/development/right-sized-energy-efficient-ai-models/) (Green Software Foundation)

</div>
</details>

---

## (iii) Quantize AI models

Quantization stores a model's parameters as less precise numbers.

This makes models smaller and faster, and reduces their energy use, without a large loss of accuracy. It can also make a model small enough to run on hardware such as mobile devices.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, quantizing AI models brings co-benefits in terms of:

- speed: lower precision speeds up inference (running the model to answer a request), so responses come back faster
- cost: quantized models need less memory and can run on smaller, cheaper cloud servers (instances)
- versatility: smaller models can run on laptops or phones, which opens up use at the edge, on local devices

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- accuracy: lower precision can cut accuracy on edge cases, so test against your own examples
- scope: quantization applies to models you host yourself, not managed models from a provider

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [What is quantization](https://www.ibm.com/think/topics/quantization) (IBM)

</div>
</details>

See also [6d (v) Run AI models at the edge](/digital-sustainability/actions/ai/operating).

---

## (iv) Use knowledge distillation to shrink models

Knowledge distillation trains a small, fast model to copy the behaviour and performance of a larger, more complex one.

Replacing a larger model with a smaller one can greatly reduce the energy your AI uses.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, distilling knowledge into smaller models brings co-benefits in terms of:

- speed: a smaller student model responds faster than the larger model it learned from
- cost: running the smaller model costs less per request once training is done
- governance: a narrow, task-specific model is easier to test and constrain

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- upfront cost: distillation needs extra training runs, so it pays back only on high-volume tasks
- accuracy: the student model inherits the larger model's errors and may lose some of its range
- licensing: some providers' terms limit using their outputs to train other models, so check before you start

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [AI insights: model distillation](https://www.gov.uk/government/publications/ai-insights/ai-insights-model-distillation-html) (Department for Digital, Culture, Media and Sport and Government Digital Service)
- [What is knowledge distillation](https://www.ibm.com/think/topics/knowledge-distillation) (IBM)

</div>
</details>

---

## How to measure this

[Measuring the impact of AI](/digital-sustainability/measure/ai) covers the training phase as well as running a model.
