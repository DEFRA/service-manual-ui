---
title: "Measuring the impact of AI"
caption: "Measure sustainability"
layout: section
sectionNav: nav-ds-measure
customNav: nav-digital-sustainability
headerServiceName: Sustainability
headerServiceUrl: /digital-sustainability
breadcrumbItems:
  - text: "Digital Defra"
    href: /
  - text: "Sustainability"
    href: /digital-sustainability
  - text: "Measure sustainability"
    href: /digital-sustainability/measure
  - text: "Measuring the impact of AI"
---
Measuring the environmental impacts of artificial intelligence (AI) can:

- show the people working on AI where they can make reductions
- feed into estimates of the impacts of a [whole service or project](/digital-sustainability/measure)

<div class="govuk-inset-text">

Measuring the whole lifecycle of an AI technology would cover:

- data preparation
- training
- inference (when the AI is used)

Most approaches focus on training and inference.

</div>

Results are usually given per unit of use, called a [functional unit](/digital-sustainability/measure/rate-of-emissions#choosing-a-functional-unit), such as:

- per token, for large language models (a token is a small piece of text the model reads or writes)
- per image, for image generation
- per workflow run, for agentic AI (AI that plans and carries out tasks in steps)

## Measuring the energy AI models use

The right method depends on where the model runs:

- AI models accessed through the public cloud
- local, self-hosted AI models
- AI built into other software

## AI models accessed through the public cloud

AI used through APIs in the public cloud is usually paid for by input and output tokens.

In the AI toolkit's rules on [using data with AI](/ai-toolkit/guidance/using-data-with-ai), a model in a Defra tenancy, such as Bedrock or Azure OpenAI, counts as Defra-hosted. Those rules decide what data you can use with it.

Ways to access it include:

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header">Approach</th><th scope="col" class="govuk-table__header">Description</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Direct model APIs</th><td class="govuk-table__cell">You call a provider's own model API, such as OpenAI, Anthropic or Google AI Studio. You pay for the input and output tokens used.</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">AI model as a service (AIaaS or MaaS)</th><td class="govuk-table__cell">Raw or pretrained AI or machine learning models, delivered through cloud infrastructure and standard API endpoints. You pay by subscription or by token.</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Hyperscaler managed AI platforms</th><td class="govuk-table__cell">Enterprise AI suites built into the cloud platforms of hyperscalers, the very large cloud providers. Examples are Microsoft Azure AI Services, Amazon Bedrock, Google Cloud Vertex AI and Oracle Cloud OCI Generative AI.</td></tr></tbody></table>

You can estimate the energy used by AI models in the public cloud by:

- using tokens to estimate energy use in the inference phase
- top-down methods that use cloud provider billing for training and inference

### (i) Estimate energy from tokens

Energy use for generative AI models in the inference phase is sometimes reported per query. But queries vary a lot in length and complexity. Tokens count how much work a model is actually doing.

There are 2 kinds of token:

<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Input tokens</dt><dd class="govuk-summary-list__value">Everything you give the model before it generates an answer. This can include your prompt, system instructions, chat history, attached documents, code snippets and background data.</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Output tokens</dt><dd class="govuk-summary-list__value">The response the model generates. This includes the final answer, summary, table or code, and hidden reasoning (thinking) tokens.</dd></div></dl>

Token counts can help you estimate the energy used for inference, if the energy factor fits the model and workload. Energy also depends on the model, context length, batching and caching. Generating an output token uses much more energy than processing an input token. Where you can, keep input, output and cached tokens separate.

Token usage data should be in provider dashboards and billing reports. Some tools estimate the energy used by input and output tokens.

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header">Tool</th><th scope="col" class="govuk-table__header">Description</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">CLEER Dashboard</th><td class="govuk-table__cell">A public tool from the Sustainable AI Group that models and estimates the energy used per token by proprietary and open source models</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">ML.Energy Dashboard</th><td class="govuk-table__cell">A benchmarking and tracking tool for machine learning and generative AI models. It measures and publishes their energy and resource use, including electricity per generated token or chain-of-thought step.</td></tr></tbody></table>

### (ii) Top-down estimates from billing data

You may be able to work out what share of your cloud computing is AI. If so, you can use cloud provider metrics and reporting to estimate what an AI model uses.

Read about using cloud usage data to estimate energy and carbon in [calculating carbon for services based in the cloud](/digital-sustainability/measure/cloud-carbon).

## Self-hosted AI models

Self-hosting a model means running it on hardware the organisation owns or rents, or on dedicated single-tenant infrastructure. This could be:

- local machines, such as personal computers, high-end laptops with graphics processing units (GPUs), or other edge devices
- a server rack in an on-premises or off-premises data centre
- virtual machines on private cloud instances

Measuring the energy a self-hosted model uses usually needs a bottom-up approach. The main approaches are:

- direct measurement of energy use through telemetry
- hardware profiling to model energy use
- using token counts to estimate energy use

Direct measurement and hardware profiling can produce energy estimates for both training and inference.

### (i) Direct measurement of energy use through telemetry

Modern processors, GPUs and AI accelerators have hardware performance counters that track operations, which can be mapped to energy use. At a larger scale, physical hardware probes or power distribution unit (PDU) meters measure power for a rack or server.

Read about [estimating the energy use of hardware](/digital-sustainability/measure/hardware-energy) and [calculating carbon for on-premises and off-premises data centres](/digital-sustainability/measure/data-centre-carbon).

### (ii) Hardware profiling and software instrumentation

Several software frameworks can track hardware usage during training or inference runs and log energy use. Examples for AI include:

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header">Software tool</th><th scope="col" class="govuk-table__header">Description</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">EcolagM</th><td class="govuk-table__cell">Estimates and tracks the environmental footprint of generative AI models at inference</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">EcoLogits</th><td class="govuk-table__cell">An open-source Python library. It tracks and calculates the environmental and energy impacts of generative AI models in real time, when they are used through APIs.</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">CodeCarbon</th><td class="govuk-table__cell">Monitors power use across the CPU, GPU and RAM</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Carbontracker</th><td class="govuk-table__cell">Tracks power use by hardware components such as graphics processing units (GPUs), central processing units (CPUs) and RAM</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">MIT's EnergAIzer</th><td class="govuk-table__cell">Uses predictive modelling to forecast how much electricity an AI workload will draw. It analyses the parameters of an AI task, such as training or inference jobs on GPUs, and estimates power demand in advance.</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Experiment Impact Tracker</th><td class="govuk-table__cell">The <a class="govuk-link" href="https://oecd.ai/en/catalogue/tools/experiment-impact-tracker">Experiment Impact Tracker</a> (OECD.AI) is a Python library that measures energy use, hardware use and carbon emissions in real time during machine learning training</td></tr></tbody></table>

<div class="govuk-warning-text"><span class="govuk-warning-text__icon" aria-hidden="true">!</span><strong class="govuk-warning-text__text"><span class="govuk-visually-hidden">Warning</span>Tools may use different system boundaries, assumptions and carbon intensity data. Record the tool, version, configuration and date you used.</strong></div>

## AI built into other software

AI can be built into software such as customer relationship management (CRM) systems, customer support tools or productivity suites.

If AI is built into software you buy, only the supplier can measure its energy use. Ask them to report it. You could ask for:

### (i) Energy use

The supplier gives the [AI Energy Score](https://huggingface.github.io/AIEnergyScore/) (Hugging Face) for the proposed AI models, or an equivalent industry-standard energy efficiency benchmark. The supplier also reports their energy use.

### (ii) Lifecycle analysis (LCA)

The supplier gives an attributional LCA for the whole lifecycle of the proposed AI models, verified in line with ISO 14040 and 14044. An attributional LCA adds up the impacts that belong to the product itself.

The functional unit for this LCA should include the proposed AI models. It should also include the data, hardware, networking and infrastructure they use across development, training and deployment.

The LCA should cover:

#### A: raw material acquisition

- mining lithium, cobalt, nickel, copper and rare-earth elements
- extracting raw materials used to make aluminium, steel, plastics and glass
- processing and refining these materials for manufacturing
- energy, water and other resources used in extraction and processing

#### B: production of devices

- production and assembly
- manufacturer support activities
- production of support equipment
- ICT-specific site construction

#### C: use

- acquiring, processing and storing training data
- model training, including research and development compute, retraining and fine-tuning
- the model inference service, including active compute, networking, idle tasks, storage and cooling
- network transfer of requests to inference and to the end user
- use of support equipment
- operator support activities
- service provider support activities

#### D: end of life

- preparing ICT goods for reuse
- storage, disassembly, dismantling and crushing

The LCA should, at minimum, give:

- energy use (Wh)
- greenhouse gas emissions (kgCO2e, kilograms of carbon dioxide equivalent)
- water use (litres or cubic metres)
- abiotic resource depletion (kgSb-e, kilograms of antimony equivalent)

### If there is no lifecycle analysis

If there is no LCA, the supplier gives real metrics, or verified estimates, for these phases of the lifecycle of the proposed AI models:

- acquiring, processing and storing training data
- training, including research and development compute, retraining and fine-tuning for the current model version
- the inference service on a defined set of hardware, as a median per token. Use per inference if the model does not use tokens
- the embodied impacts of sourcing, making, transporting and disposing of the hardware used for these

Metrics include:

- energy used (Wh)
- greenhouse gas emissions (kgCO2e)
- water used (litres or cubic metres)
- abiotic resource depletion for minerals and metals (kgSb-e)
