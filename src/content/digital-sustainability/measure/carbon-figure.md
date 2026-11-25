---
title: "Get a carbon figure for your service"
caption: "Measure sustainability"
description: "Follow these 7 steps to calculate a carbon figure for your service, in kgCO2e. You can then record it in your digital sustainability statement. Start here if you have not measured carbon before."
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
  - text: "Get a carbon figure for your service"
---
---

## 1. Decide what you are measuring

Set your boundary: the parts of the service you will count. Use the [recommended boundary](/digital-sustainability/measure/boundary) unless you have a reason not to. It covers the servers, cloud instances and storage your service uses, and any managed services or software as a service it relies on.

Then decide if you are measuring a carbon total for a period of time, such as a month or a year, or a [rate of emissions](/digital-sustainability/measure/rate-of-emissions). A rate measures the amount of carbon produced for a unit of work. You can choose this unit depending on what is most relevant for your service.

Measuring a rate of carbon emissions is recommended. It helps teams focus on how carbon-efficient a service is, and track improvements over time.

## 2. Find your usage, energy or carbon figures

What you look for depends on where your service is hosted.

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header">Hosting</th><th scope="col" class="govuk-table__header">What to find</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Cloud</th><td class="govuk-table__cell"><p class="govuk-body">If your service is based in the cloud, you can get to a carbon figure in 2 ways.</p><p class="govuk-body">You can get carbon emission figures from your cloud provider's reporting. This is often provided in kilograms of carbon dioxide equivalent (kgCO2e). These figures are usually monthly averages and cover a period 1 to 3 months in the past.</p><p class="govuk-body">In Defra, these monthly carbon averages are made available for individual services through the Cloudability tool. This data will shortly be accompanied by more granular estimates of carbon and energy usage.</p><p class="govuk-body">You can also convert cloud usage data into estimates of energy and carbon. Cloud usage data is often provided at a more granular level than monthly carbon estimates. This means it is often a good starting point for understanding the impact of efforts to reduce the carbon footprint of services.</p><p class="govuk-body govuk-!-margin-bottom-0">Read more about <a class="govuk-link" href="/digital-sustainability/measure/cloud-carbon">calculating carbon for services based in the cloud</a>.</p></td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">On-premises or off-premises data centre</th><td class="govuk-table__cell"><p class="govuk-body">Get your data centre's energy figures for the hardware your service uses, in kilowatt-hours (kWh). Add the data centre overhead, the energy used for cooling, power distribution and lighting. Use the data centre's power usage effectiveness (PUE) to do this. If the hardware is shared with other services, allocate a share to yours.</p><p class="govuk-body govuk-!-margin-bottom-0">Read more about <a class="govuk-link" href="/digital-sustainability/measure/data-centre-carbon">calculating carbon for on-premises and off-premises data centres</a>.</p></td></tr></tbody></table>

## 3. Convert usage or energy to carbon, where necessary

If you have figures for usage of cloud computing resources, or estimates of energy use for your service, convert them into carbon.

Read more about [converting usage to energy and carbon](/digital-sustainability/measure/cloud-carbon) for services based in the cloud.

If you have energy figures rather than carbon, convert them with the [UK government conversion factors for greenhouse gas reporting](https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting) (GOV.UK).

<div class="govuk-inset-text">

Carbon (kgCO2e) = energy (kWh) × conversion factor for electricity (kgCO2e per kWh)

</div>

Use the location-based method, which uses the carbon intensity of the grid where the energy is used. Use the factors for the year you are reporting on. Read more about [converting energy to carbon](/digital-sustainability/measure/carbon).

## 4. Add embodied carbon to totals, where necessary

The total emissions of a digital service equal operational carbon plus embodied carbon.

Embodied carbon covers the emissions from the mining and processing of materials, manufacturing, distribution and end-of-life treatment of the hardware that digital systems run on.

For services based in the cloud, provider reporting will often include embodied carbon. For on-premises and off-premises data centres, you need to add embodied carbon to operational totals.

If you cannot estimate embodied carbon yet, report your figure as operational emissions only. Do not call it the total, and record that you left embodied carbon out.

Read more about [calculating embodied carbon](/digital-sustainability/measure/embodied-carbon).

## 5. Report in carbon dioxide equivalent (kgCO2e)

Report your figure in kgCO2e. Give:

- the total for the period, such as total annual carbon emissions of the service, or operational emissions only if you left out embodied carbon
- the figure per functional unit, if you can: a unit of output your service scales with, such as carbon per user transaction

Read more about the [Software Carbon Intensity formula](/digital-sustainability/measure/rate-of-emissions) and how to [choose a functional unit](/digital-sustainability/measure/rate-of-emissions#choosing-a-functional-unit).

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
