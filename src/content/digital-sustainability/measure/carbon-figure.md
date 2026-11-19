---
title: "Get a carbon figure for your service"
caption: "Measure sustainability"
description: "Seven steps to a carbon figure for your service, in kgCO2e, recorded in your digital sustainability statement. Start here if you have not measured carbon before."
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
  - text: "Get a carbon figure for your service"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
---

## 1. Decide what you are measuring

Set your boundary: the parts of the service you will count. Use the [recommended boundary](/digital-sustainability/measure/boundaries-and-units) unless you have a reason not to. It covers the servers, cloud instances and storage your service uses, and any managed services or software as a service it relies on.

Choose a period, such as a month or a year.

## 2. Ask what you can get

If your service runs on the Core Delivery Platform (CDP), ask the CDP team what carbon or energy figures they can give you for your service. If it does not, ask your hosting supplier.

Ask what each figure covers, how it was calculated and what period it is for.

## 3. Find your energy or carbon figures

What you look for depends on where your service is hosted.

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header">Hosting</th><th scope="col" class="govuk-table__header">What to find</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Cloud</th><td class="govuk-table__cell"><p class="govuk-body">Find your cloud provider's carbon reporting. It may already be in kilograms of carbon dioxide equivalent (kgCO2e). These figures are usually monthly and cover a period 1 to 3 months in the past.</p><p class="govuk-body">A cloud provider's emissions, from running and building its data centres, are Defra's scope 3 emissions.</p><p class="govuk-body govuk-!-margin-bottom-0">Read more about <a class="govuk-link" href="/digital-sustainability/measure/cloud-carbon">calculating carbon for services based in the cloud</a>.</p></td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">On-premises or off-premises data centre</th><td class="govuk-table__cell"><p class="govuk-body">Get your data centre's energy figures for the hardware your service uses, in kilowatt-hours (kWh). Add the data centre overhead using its power usage effectiveness (PUE). If the hardware is shared with other services, allocate a share to yours.</p><p class="govuk-body govuk-!-margin-bottom-0">Read more about <a class="govuk-link" href="/digital-sustainability/measure/data-centre-carbon">calculating carbon for on-premises and off-premises data centres</a>.</p></td></tr></tbody></table>

## 4. Convert energy to carbon

If you have energy figures rather than carbon, convert them with the [UK government conversion factors for greenhouse gas reporting](https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting) (GOV.UK).

<div class="govuk-inset-text">

Carbon (kgCO2e) = energy (kWh) × conversion factor for electricity (kgCO2e per kWh)

</div>

Use the location-based method, and the factors for the year you are reporting on. Read more about [converting energy to carbon](/digital-sustainability/measure/carbon).

## 5. Report in kgCO2e

Report your figure in kgCO2e. Give:

- the total for the period, such as total annual carbon emissions of the service
- the figure per functional unit if you can, such as carbon per user transaction

Read more about the [Software Carbon Intensity formula](/digital-sustainability/measure/carbon-formula) and how to [choose a functional unit](/digital-sustainability/measure/boundaries-and-units).

## 6. Record the figure and method in your statement

Record the figure in your [digital sustainability statement](/digital-sustainability/service-standard/process). Say how you got it, so someone else could repeat it. Record:

- what you measured and the value
- the unit and the period
- the boundary, and anything you left out
- the functional unit, if you used one
- where the data came from, such as the provider's reporting, a tool and its version, or a supplier
- the conversion factor and its year
- whether the figure is measured or estimated
- the date you calculated it

## 7. Measure again the same way

Use the same boundary, method and factors each time, so you can compare one period with the next. If you change the method, say so in your statement.

<div class="govuk-inset-text">

If you cannot get a figure yet, you can still act. Read about [acting before you can measure](/digital-sustainability/measure), and the [proxies you can track instead](/digital-sustainability/measure/data-and-proxies).

</div>
