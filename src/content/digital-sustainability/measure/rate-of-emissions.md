---
title: "Calculating a rate of emissions"
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
  - text: "Calculating a rate of emissions"
---
The [Software Carbon Intensity (SCI) specification](https://grnsft.org/sci) from the [Green Software Foundation](https://greensoftware.foundation/standards/sci/) gives a formula for the carbon produced by software and digital systems. It is an ISO standard (ISO/IEC 21031).

The SCI does not measure total carbon. It is an intensity metric: emissions per unit of service delivered, such as per completed transaction or per user. The closer the SCI score is to zero, the lower the emissions for each unit.

Because it is a rate, the SCI shows changes in carbon efficiency as use of the service grows or falls. It shows how your choices of technology, design and operation affect carbon.

Defra recommends the SCI for measuring carbon for a whole service.

## The formula

<div class="govuk-inset-text">

SCI = ((E × I) + M) per R

</div>

Where:

<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">E × I</dt><dd class="govuk-summary-list__value">The operational carbon produced by the service, in kilograms of carbon dioxide equivalent (kgCO2e)</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">E (energy)</dt><dd class="govuk-summary-list__value">The energy the software uses to run on servers, storage and networks, in kilowatt-hours (kWh)</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">I (carbon intensity)</dt><dd class="govuk-summary-list__value">The carbon intensity of the electricity grid where the software runs, in kgCO2e per kWh. The UK government conversion factors give this in kilograms.</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">M (embodied emissions)</dt><dd class="govuk-summary-list__value">A share of the emissions from making and disposing of the hardware the software uses, split by time and resource allocation, in kgCO2e. Read about <a class="govuk-link" href="/digital-sustainability/measure/embodied-carbon">calculating embodied carbon</a>.</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">R (functional unit)</dt><dd class="govuk-summary-list__value">The unit of output the software scales with, such as per active user or per gigabyte processed</dd></div></dl>

Before you calculate the SCI, [set a system boundary](/digital-sustainability/measure/boundary) and [choose a functional unit](#choosing-a-functional-unit).

<h2 class="govuk-heading-m" id="choosing-a-functional-unit">Choosing a functional unit (R)</h2>

The functional unit (R) is the unit of output your software scales with, such as a user or a transaction. The SCI gives carbon per functional unit.

Choose a functional unit for the whole service, or for the part of a service you are measuring.

### Choosing a functional unit for a whole service

Choose a functional unit that drives the service's load and resource use.

For example, the energy and carbon of an application people use may scale with active users, user sessions or logged-in minutes. For a data project, the functional unit might be a scheduled job, a database transaction or a gigabyte of data processed.

Common functional units for a whole service include:

- carbon per active user
- carbon per completed user transaction
- carbon per gigabyte (GB) of data processed

### Choosing a functional unit for a part of a service

If you calculate SCI scores for different parts of a service, the functional units can differ. Base each one on what drives that part's load.

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header">Aspect</th><th scope="col" class="govuk-table__header">Recommended functional unit (R)</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">User-facing applications</th><td class="govuk-table__cell"><ul class="govuk-list govuk-list--bullet govuk-!-margin-bottom-0"><li>Per active user</li><li>Per user session</li></ul></td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">AI inference</th><td class="govuk-table__cell"><ul class="govuk-list govuk-list--bullet govuk-!-margin-bottom-0"><li>Per token (for large language models)</li><li>Per image (for image generation)</li><li>Per workflow run (for agentic AI)</li></ul></td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Batch or scheduled jobs</th><td class="govuk-table__cell"><ul class="govuk-list govuk-list--bullet govuk-!-margin-bottom-0"><li>Per job run</li><li>Per database transaction</li><li>Per page processed</li></ul></td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">APIs and microservices</th><td class="govuk-table__cell"><ul class="govuk-list govuk-list--bullet govuk-!-margin-bottom-0"><li>Per API request</li><li>Per transaction</li></ul></td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Data pipelines</th><td class="govuk-table__cell"><ul class="govuk-list govuk-list--bullet govuk-!-margin-bottom-0"><li>Per job</li><li>Per record processed</li><li>Per gigabyte transferred</li></ul></td></tr></tbody></table>

These pages give more detail on measuring energy use and proxies for each area:

- [data](/digital-sustainability/measure/data)
- [software](/digital-sustainability/measure/software)
- [architecture](/digital-sustainability/measure/architecture)
- [AI](/digital-sustainability/measure/ai)
- [service journeys and processes](/digital-sustainability/measure/journeys-and-processes)


## Worked example

This example uses illustrative figures for one month. Take your own value for I from the current [UK government conversion factors for greenhouse gas reporting](https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting) (GOV.UK).

- E = 120 kWh, after adding data centre overhead with the power usage effectiveness (PUE)
- I = 0.177 kgCO2e per kWh
- M = 8 kgCO2e
- R = 40,000 transactions

E × I = 120 × 0.177 = 21.24 kgCO2e

(E × I) + M = 21.24 + 8 = 29.24 kgCO2e

SCI = 29.24 ÷ 40,000 = 0.00073 kgCO2e per transaction (0.73 grams)

## Extensions to the SCI

The Green Software Foundation is working on standards for particular domains that build on the SCI.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about extensions to the SCI</span></summary>
<div class="govuk-details__text">

**SCI for AI:** [SCI for AI](https://greensoftware.foundation/standards/sci-ai/) extends the SCI to the parts of an AI system's lifecycle that only AI has, including:

- data preparation
- training
- inference

**SCI for Web:** [SCI for Web](https://greensoftware.foundation/standards/sci-web/) (Green Software Foundation) adapts the SCI for web applications. It helps you set boundaries across servers, networks, third-party services and end-user devices.

Read [an update on SCI for Web](https://www.thegreenwebfoundation.org/news/an-update-on-sci-for-web-a-new-standard-for-measuring-software-carbon-intensity-for-the-web/) (Green Web Foundation).

</div>
</details>
