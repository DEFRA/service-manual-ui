---
title: "Water"
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
  - text: "Water"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
Water is used throughout the lifecycle of a digital service:

- in the supply chain, to make devices and infrastructure
- during operation, to generate electricity and cool data centres

<div class="govuk-inset-text">

Few services measure water yet, and the data available may limit how much you can assess and how accurately. Some cloud providers and GreenOps providers, which track the environmental impact of cloud use alongside its cost, supply this data.

</div>

## Water used to make hardware

Lifecycle assessments add up a product's impacts from raw materials to disposal. Where suppliers have them, they can show the water used to make the hardware your service uses. Few are available, and they may use different boundaries or water indicators. Check what each figure covers before you combine or compare results.

If hardware is shared, allocate a share to your service, taking account of the hardware's expected lifespan and the assessment period. The method is the same as for [embodied carbon](/digital-sustainability/measure/embodied-carbon).

## Water used to generate electricity

The electricity a service uses has an indirect water footprint, including water used for cooling at power stations. This is not routinely reported for individual services. Where you have suitable data, estimate it separately: multiply electricity use by a water intensity factor for the electricity supply.

## Water used to cool data centres

Some data centres use water to remove heat from IT equipment, and water is lost through evaporation in cooling systems. Ask the hosting provider for metered water data and what it covers, ideally for the facility that hosts your service.

Water usage effectiveness (WUE) is a data centre's water use compared with the energy its IT equipment uses, normally in litres per kilowatt-hour (L/kWh):

<div class="govuk-inset-text">

WUE = site water use (litres) ÷ IT equipment energy use (kWh)

</div>

If you have the site's WUE and your service's allocated IT energy use, you can make an indicative estimate for your service:

<div class="govuk-inset-text">

Allocated site water use (litres) = site WUE (L/kWh) × service IT energy use (kWh)

</div>

<div class="govuk-warning-text"><span class="govuk-warning-text__icon" aria-hidden="true">!</span><strong class="govuk-warning-text__text"><span class="govuk-visually-hidden">Warning</span>This shares out site water use using IT energy as a proxy. It does not measure the cooling water your service uses. Use IT energy, not total facility energy, because WUE leaves out cooling and other overheads. Use figures for the specific site where you can, because a provider-wide average may not reflect your facility or period.</strong></div>
