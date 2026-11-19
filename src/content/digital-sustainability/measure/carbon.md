---
title: "Carbon"
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
  - text: "Carbon"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
Carbon is the most measured environmental impact. Calculate a carbon footprint in line with the [GHG Protocol](https://ghgprotocol.org/) and its [Product Standard](https://ghgprotocol.org/product-standard) (GHG Protocol).

Carbon figures are given in carbon dioxide equivalent (CO2e): other greenhouse gases are converted to the amount of carbon dioxide with the same warming effect. Report them in kilograms (kgCO2e).

## Scopes of emissions

There are 3 scopes of carbon emissions:

- scope 1: direct greenhouse gas emissions from sources the reporting body owns or controls, for example burning fuel in a backup generator
- scope 2: indirect emissions from generating the energy the reporting body buys and uses
- scope 3: all other indirect emissions across the value chain, for example the embodied emissions from making and transporting hardware, and emissions from e-waste

Which scope your service's emissions fall into depends on who owns the hardware and buys the electricity.

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header">Where the service runs</th><th scope="col" class="govuk-table__header">Scope for Defra</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Public cloud</th><td class="govuk-table__cell">The provider owns the data centres and buys the electricity. All of the provider's emissions, including those it reports as its own scope 1 and 2, are Defra's scope 3.</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">A data centre Defra runs and buys the electricity for</th><td class="govuk-table__cell">Electricity used is Defra's scope 2. Fuel burned on site, such as in backup generators, is scope 1. Embodied emissions from the hardware are scope 3.</td></tr></tbody></table>

<div class="govuk-inset-text">

Whatever the scope, the emissions your team can influence most are the ones that come from the energy your service uses.

</div>

## Scope 1 emissions

For digital services, scope 1 emissions come mainly from the backup generators that power data centres.

To calculate them, multiply the total fuel used by the relevant factor in the [UK government conversion factors for greenhouse gas reporting](https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting) (GOV.UK).

Public cloud providers and off-premises hosting suppliers may include this in their carbon reporting.

## Converting energy to carbon

Convert energy to carbon with emission factors, such as the [UK government conversion factors for greenhouse gas reporting](https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting) (GOV.UK) or the [Electricity Maps API](https://app.electricitymaps.com/docs).

<div class="govuk-inset-text">

Carbon (kgCO2e) = energy (kWh) × emission factor (kgCO2e per kWh)

</div>

There are 2 ways to convert electricity to carbon.

<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Location-based</dt><dd class="govuk-summary-list__value">Uses the carbon intensity of the local electricity grid where the energy is used.</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Market-based</dt><dd class="govuk-summary-list__value">Uses the electricity bought through contracts, such as renewable energy bought elsewhere on the grid, or carbon offsets.</dd></div></dl>

<div class="govuk-warning-text"><span class="govuk-warning-text__icon" aria-hidden="true">!</span><strong class="govuk-warning-text__text"><span class="govuk-visually-hidden">Warning</span>For government services, use the location-based method. If a supplier also gives market-based figures, record them separately and do not use them in place of location-based figures.</strong></div>

The area that location-based figures cover can vary. The UK government conversion factors give one carbon intensity for the whole UK for each year. Providers such as Electricity Maps give a figure for each local grid, by time.

If you choose where or when workloads run, use hourly data for the local grid. Your figures will then show the effect of your decisions.
