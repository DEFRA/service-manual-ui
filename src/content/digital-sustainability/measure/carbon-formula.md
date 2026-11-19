---
title: "The equation for carbon measurement"
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
  - text: "The equation for carbon measurement"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
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

Before you calculate the SCI, [set a system boundary and choose a functional unit](/digital-sustainability/measure/boundaries-and-units).

### Worked example

This example uses illustrative figures for one month. Take your own value for I from the current [UK government conversion factors for greenhouse gas reporting](https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting) (GOV.UK).

- E = 120 kWh, after adding data centre overhead with the power usage effectiveness (PUE)
- I = 0.177 kgCO2e per kWh
- M = 8 kgCO2e
- R = 40,000 transactions

E × I = 120 × 0.177 = 21.24 kgCO2e

(E × I) + M = 21.24 + 8 = 29.24 kgCO2e

SCI = 29.24 ÷ 40,000 = 0.00073 kgCO2e per transaction (0.73 grams)

### Extensions to the SCI

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
