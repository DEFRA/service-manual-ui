---
title: "Measuring the impact of architectural decisions"
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
  - text: "Measuring the impact of architectural decisions"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
Measuring the environmental impacts of a service's architecture can:

- show architects where they can make reductions
- feed into estimates of the impacts of a [whole service or project](/digital-sustainability/measure)

Architects often get more from looking at specific components than at total figures. Usage metrics from cloud provider dashboards, usage reports and monitoring tools can act as [proxies](/digital-sustainability/measure/data-and-proxies) to guide architectural decisions.

## What to track

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header">Metric</th><th scope="col" class="govuk-table__header">What it shows</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Average and peak CPU and memory utilisation (%)</th><td class="govuk-table__cell">Whether the service is efficiently provisioned, with servers kept busy. Utilisation is how much of the capacity is in use.</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Number of idle, underused or over-provisioned resources</th><td class="govuk-table__cell">Unused assets to remove, and resources to right-size (make smaller to match what you use)</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Running hours, by environment</th><td class="govuk-table__cell">Whether environments are turned on only when they are needed</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Proportion of architectural components reused, compared with those built from scratch</th><td class="govuk-table__cell">Progress on Defra's objective to put circular practices into action</td></tr></tbody></table>

## Turn usage into energy and carbon

To convert usage metrics into energy and carbon estimates, read:

- [calculating carbon for services based in the cloud](/digital-sustainability/measure/cloud-carbon)
- [calculating carbon for services using on-premises or off-premises data centres](/digital-sustainability/measure/data-centre-carbon)
