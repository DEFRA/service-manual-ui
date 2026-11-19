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
Carbon is the most measured environmental impact. Carbon footprint calculation should be done in accordance with the [GHG Protocol](https://ghgprotocol.org/) and their accompanying [Product Life Cycle Accounting and Reporting Standard](Product-Life-Cycle-Accounting-Reporting-Standard_041613.pdf)

There are three scopes of carbon emissions:

- Scope 1 emissions – direct greenhouse gas emissions from sources that are owned or controlled by the reporting body (for example, emissions from combustion of fuel in a back up generator)
- Scope 2 emissions – indirect greenhouse gas emissions associated with the generation of purchased energy consumed by the reporting body
- Scope 3 emissions - all other indirect emissions occurring across the upstream and downstream value chain (for example, the embodied emissions present in hardware through its manufacture and transport, and the emissions generated from e-waste)

<div class="govuk-inset-text">

Services have most control over the scope 2 emissions, which are calculated from energy consumption.

</div>

## Calculating Scope 1 carbon

Scope 1 emissions for digital services are primarily from the back up generators used to power data centres.

To calculate the energy from sources owned or controlled by the reporting body, multiply the total quantity of fuel by the relevant emissions factor in the [GHG conversion factors](https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2026) .

Public cloud providers and off premise hosting suppliers will supply this data as part of their cloud dashboards.

## Calculating carbon from energy consumption

Energy can be converted to carbon using emissions factors, such as the [GHG conversion factors](https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2026) or the [electricity maps API](https://app.electricitymaps.com/docs) .

The conversion from electricity to carbon is calculated by a market-based or location-based methodology. For government services the location-based methodology must be used.

<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Location-based</dt><dd class="govuk-summary-list__value">measures the carbon intensity of the local electrical grid where the energy is physically consumed.</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Market-based</dt><dd class="govuk-summary-list__value">reflect the electricity purchased through contractual instruments such as renewable energy purchased elsewhere on the grid, or carbon offsets.</dd></div></dl>

<div class="govuk-warning-text"><span class="govuk-warning-text__icon" aria-hidden="true">!</span><strong class="govuk-warning-text__text"><span class="govuk-visually-hidden">Warning</span>For government services the location-based methodology must be used.</strong></div>

Note that the locality of the location-based methodology can vary. The GHG conversion factors provide a UK wide measure of carbon intensity per annum, whereas providers such as the electricity maps API provides a carbon intensity figure per local grid and by time.

Service teams that have control over where their service is hosted, or at what time workloads are scheduled should use carbon intensity data for the local grid with time use data, so that their emissions calculations reflect the service teams decisions.
