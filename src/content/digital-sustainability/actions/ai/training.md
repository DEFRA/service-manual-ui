---
title: "6c. Take a sustainable approach to training AI models"
caption: "Artificial intelligence"
description: "Reduce the environmental impact of AI training by reusing suitable pretrained models where possible, minimising unnecessary training and experimentation, optimising training data and model size through techniques such as quantization, pruning, and knowledge distillation."
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
  - text: "6c. Take a sustainable approach to training AI models"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
**Lead role families:** AI Engineer, Architect, Software

**Likely co-benefits:** Cost, service performance

---

## (i) Reuse pre-trained models

Reusing an AI model means taking one that has already been trained for a particular task and reusing it for a new one.

Reusing pre-trained models can enable significant savings in terms of time, costs and energy consumption compared to training a model from scratch.

'Transfer learning' techniques take the patterns, features and weights learned by a pre-trained model for a 'source task' as a starting point for a new or related task.

Avoid training models from scratch where appropriate pre-trained models are available, and encourage transfer learning and model sharing between teams. In this way, a single AI model may be able to serve multiple teams' needs.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

### Fine-tuning AI models

Fine-tuning involves taking a pre-trained AI model, unfreezing model weights and training the model further on a smaller, specialised dataset to adapt it for a specific task.

- [What is fine-tuning?,](https://www.ibm.com/think/topics/fine-tuning/) IBM
- [Model fine-tuning concepts,](https://learn.microsoft.com/en-us/windows/ai/fine-tuning/) Microsoft Learn

### Feature extraction in transfer learning

Feature extraction is an approach where the pre-trained model's layers remain frozen and new layers added ontop.

- [What is transfer learning?,](https://www.ibm.com/think/topics/transfer-learning/) IBM

</div>
</details>

---

## (ii) Prune AI models

When training an AI model, pruning is a technique that removes unnecessary parameters, such as weights, neurons and layers, that are contributing little to a model's output.

Pruning can significantly reduce the size, complexity and energy consumption of models while preserving high accuracy of outputs.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [Use right-sized and energy-efficient AI models](https://patterns.greensoftware.foundation/development/right-sized-energy-efficient-ai-models/) Green Software Foundation

</div>
</details>

---

## (iii) Quantize AI models

Quantization is an approach that reduces the numerical precision of a model's parameters.

This approach can reduce the size of AI models, speeding up computation without a significant loss of accuracy, whilst also reducing energy consumption.

Quantization can also allow models to be made small enough to be deployed on hardware like mobile devices.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [What is quantization?,](https://www.ibm.com/think/topics/quantization/) IBM

</div>
</details>

See also [6d. (v) Run AI models 'at the edge'](/digital-sustainability/actions/ai/operating)

---

## (iv) Distill knowledge to transfer learnings

Knowledge distillation is a technique where a small, fast model is trained to replicate the behaviour and performance of a larger and more complex one.

By replacing larger models with smaller ones, this approach can significantly reduce the energy consumption coming from AI model use.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [AI insights: Model distillation,](https://www.gov.uk/government/publications/ai-insights/ai-insights-model-distillation-html/) Department for Digital, Culture, Media and Sport, Government Digital Service
- [What is knowledge distillation?,](https://www.ibm.com/think/topics/knowledge-distillation/) IBM

</div>
</details>

---
