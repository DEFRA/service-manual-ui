---
title: "Measuring the impact of AI"
caption: "Measure sustainability"
layout: section
sectionNav: nav-ds-measure
customNav: nav-digital-sustainability
headerServiceName: Digital sustainability
headerServiceUrl: /digital-sustainability
breadcrumbItems:
  - text: "Digital Defra"
    href: /
  - text: "Digital sustainability"
    href: /digital-sustainability
  - text: "Measure sustainability"
    href: /digital-sustainability/measure
  - text: "Measuring the impact of AI"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
Measuring the environmental impacts of Artificial Intelligence can:

- Provide insight that can guide practitioners working on this aspect of digital services towards identifying how reductions can be made
- Feed into estimates of the environmental impacts of a [whole service or project](/digital-sustainability/measure)

<div class="govuk-inset-text">

Measuring the environmental impacts of the whole lifecycle of AI technologies would mean covering:

- Data preparation
- Training
- Inference (when AI is used)

However, most approaches focs on training and inference.

</div>

- Per token (for Large Language Models)
- Per image (for image generation)
- Per workflow execution (for agentic AI)

## Measuring AI model energy use

Different methodologies are appropriate for the measurement of the energy use of AI technologies, depending on where models are running. Approaches can include:

- AI models accessed through public cloud
- Local, self-hosted AI models
- AI that is integrated into other software

## AI models accessed through public cloud

AI that is consumed through APIs in the public cloud is generally paid for through input and output tokens.

Approaches can include:

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header">Approach</th><th scope="col" class="govuk-table__header">Description</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Direct Model APIs</th><td class="govuk-table__cell">Call a provider’s proprietary API model (e.g., OpenAI, Anthropic, Google AI Studio) and pay for the input and output tokens consumed</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">AI Model as a Service (AIaaS / MaaS)</th><td class="govuk-table__cell">The delivery of raw or pretrained Artificial Intelligence or Machine Learning models via cloud infrastructure and standardized API endpoints, which can be paid for by subscription or tokens</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Hyperscaler Managed AI Platforms</th><td class="govuk-table__cell">Comprehensive enterprise suites integrated into major cloud ecosystems (e.g., Microsoft Azure AI Services, Amazon Bedrock, Google Cloud Vertex AI, Oracle Cloud OCI Generative AI)</td></tr></tbody></table>

Estimating the energy use of AI models through the public cloud can be calculated through:

- Using tokens to estimate energy consumption for the inference phase
- Top-down methods utilising cloud provider billing for training and inference

### (i) Using tokens to estimate energy use

Energy usage for generative AI models in the inference phase is sometimes reported ‘per query’. However, queries can range greatly in length and complexity, while tokens usages serves to count how much work an AI model is actually doing.

Tokens are divided into:

<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Input Tokens</dt><dd class="govuk-summary-list__value">Everything you feed into the model before it generates an answer. This can include your prompt, system instructions, chat history, attached documents, code snippets, and background data.</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Output tokens</dt><dd class="govuk-summary-list__value">The response or content the model generates for you. This includes the final answer, summary, table, code output, as well as hidden "reasoning" (thinking) tokens.</dd></div></dl>

Energy consumption scales directly with the number of tokens processed, and generating an output token takes significantly more energy than processing an input token.

Token usage data should be available through provider dashboards and billing reports, and there are a number of tools we can use to estimate the energy use of input and output tokens.

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header">Tool</th><th scope="col" class="govuk-table__header">Description</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">CLEER Dashboard</th><td class="govuk-table__cell">A public tool created by the Sustainable AI Group that models and estimates the per-token energy consumption for both proprietary and open source models</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">ML.Energy Dashboard</th><td class="govuk-table__cell">A benchmarking and tracking tool that measures, analyses, and exposes the energy and resource consumption of modern machine learning and generative AI models, including electricity consumption per generated token or chain-of-thought step</td></tr></tbody></table>

### (ii) Top-down estimates of AI energy use using billing data

Cloud provider metrics and reporting can then be utilised to estimate the consumption of an AI model where the share of AI workloads versus other cloud computing can be determined.

For guidance on using cloud provider usage data to estimate energy use and carbon, see the [Measuring cloud carbon](/digital-sustainability/measure/cloud-carbon) page.

## Self-hosted AI models

Self-hosting an AI model means running it on hardware that the organisation owns or rents, or as dedicated instances on exclusive single-tenant infrastructure. This could be:

- Local machines such as personal computers, high-end laptops with Graphical Processing Units (GPUs), or other edge devices
- A server rack in on- and off-premises data centres
- Virtual machines running on private cloud instances

Measurement of the energy use of self-hosted models generally requires a bottom-up approach. The main approaches to bottom-up model-level estimation are:

- Direct measurement of energy use via telemetry
- Hardware profiling to model energy use
- Token usage to estimate energy consumption

Direct energy measurement and hardware profiling can be used to produce energy estimates for both training and inference phases.

### (i) Direct measurement of energy use via telemetry

Modern processors, GPUs, and AI accelerators feature hardware performance counters that track operational events, which can be mapped to energy consumption. At a higher scale, physical hardware probes or Power Distribution Unit (PDU) meters measure power at the rack or server level.

For guidance on this approach, see the [Measuring on-premises carbon](/digital-sustainability/measure/data-centre-carbon) page.

### (ii) Use of hardware profiling and software instrumentation

There are a number of software frameworks can be used to track hardware usage logs during training or inference runs to log energy consumption. Some examples of software tools that can be used for AI are:

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header">Software tool</th><th scope="col" class="govuk-table__header">Description</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">EcolagM</th><td class="govuk-table__cell">Estimate and track the environmental footprint of Generative Al models at inference</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">EcoLogits</th><td class="govuk-table__cell">An open-source Python library that tracks and calculates the environmental and energy impacts of generative AI models in real time when accessed through APIs</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">CodeCarbon</th><td class="govuk-table__cell">Can monitor power consumption across the CPU, GPU, and RAM.</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Carbontracker</th><td class="govuk-table__cell">Can be used to track power usage across specific hardware components such as Graphical Processor Units (GPUs), Central Processing Units (CPUs) and RAM.</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">MIT's EnergAIzer</th><td class="govuk-table__cell">EnergAIzer uses predictive modeling to forecast how much electricity an AI workload will draw. It analyzes the specific parameters of an AI task (such as training or inference jobs running on GPUs) and estimates power demands beforehand.</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Experiment Impact Tracker</th><td class="govuk-table__cell">The <a class="govuk-link" href="https://oecd.ai/en/catalogue/tools/experiment-impact-tracker">Experiment Impact Tracker </a>is a Python library designed to measure real-time energy use, hardware resource usage, and carbon emissions during machine learning training</td></tr></tbody></table>

<div class="govuk-warning-text"><span class="govuk-warning-text__icon" aria-hidden="true">!</span><strong class="govuk-warning-text__text"><span class="govuk-visually-hidden">Warning</span>Note: Tools may use different system boundaries, assumptions and carbon intensity data. Record the tool, version, configuration and date used.</strong></div>

## AI that is integrated into other software

AI capabilities can be built directly into user-facing software applications like Customer Relationship Management (CRM), customer support, or productivity suites.

For AI that is integrated into broader software solutions and hosted in cloud services or software-as-a-service (SaaS), estimating the energy use of AI models requires that reporting be made available by suppliers. This could include:

### (i) Energy use

The supplier provides the [AI Energy Score](https://huggingface.github.io/AIEnergyScore/) (or an equivalent industry-standard energy efficiency benchmark) for the proposed AI model(s), and reports on the energy consumption.

### (ii) Lifecycle analysis (LCA)

The supplier provides an attributional LCA for the end-to-end lifecycle of the proposed AI model(s) verified in accordance with ISO 14040 and 14044.

The functional unit for this LCA should include the proposed AI model(s) and the associated data, hardware, networking and infrastructure assets over any development, training and deployment phases.

The LCA should include in its scope:

#### A - Raw material acquisition

- mining lithium, cobalt, nickel, copper and rare-earth elements
- extracting raw materials used to make aluminium, steel, plastics and glass
- processing and refining these materials into forms suitable for manufacturing
- energy, water and other resources consumed during extraction and processing

#### B - Production of devices

- production and assembly
- manufacturer support activities
- production of support equipment
- ICT-specific site construction

#### C - Use

- training data acquisition, processing and storage
- model training, including R&D compute, retraining and finetuning
- model inference service, including active compute, networking, idle tasks, storage and cooling
- network transfer of requests to inference and the end user
- use of support equipment
- operator support activities
- service provider support activities

#### D - End of life

- preparation of ICT goods for reuse
- storage / disassembly / dismantling / crushing

The LCA should, at minimum, provide metrics on:

- energy consumption (Wh)
- greenhouse gas emissions (gCO2-e)
- water consumption (L or m3)
- abiotic resource depletion (kgSb-e)

### In the absence of lifecycle analysis

In the absence of a lifecycle analysis, the supplier provides real metrics, or verified estimates, for the sustainability of the following phases of the AI lifecycle for the proposed AI model(s):

- the acquisition, processing and storage of training data
- the training phase, including R&D compute, retraining and finetuning required for the current model version
- the inference service on a defined set of hardware, measured as a median per token (or per inference if the model is not tokenised)
- the embodied impacts from sourcing, manufacturing, transportation and end-of-life of hardware used for the above

Metrics offered include, but are not limited to:

- energy consumed (Wh)
- greenhouse gas emissions (gCO2-e)
- water consumed (L or m3)
- abiotic resource depletion for minerals and metals (kgSb-e)
