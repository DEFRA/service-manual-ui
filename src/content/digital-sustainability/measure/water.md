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

- In supply chain during the manufacture of devices and infrastructure,
- During operation through electricity generation and data centre cooling.

<div class="govuk-inset-text">

Service-level water measurement is not yet commonplace, and data availability may limit the scope and accuracy of an assessment. Currently some cloud providers and GreenOps providers supply this data.

</div>

## Water associated with hardware manufacture

Where available, supplier lifecycle assessments can provide information on water use associated with manufacturing the hardware used by a service. Availability is limited, and assessments may use different boundaries or water indicators. Check what each figure covers before combining or comparing results, and allocate a suitable share to the service where hardware is shared, taking account of its expected lifespan and the assessment period.

See the section on embodied carbon of hardware for a calculation on how to attribute a total figure to a service.

## Water associated with electricity generation

The electricity consumed by a service has indirect water footprint, including water used for cooling at power stations. This is not routinely reported at service level. Where suitable data is available, estimate this separately by multiplying electricity consumption by a water intensity factor for the relevant electricity supply.

## Water used for data centre cooling

Some data centres use water to remove heat from IT equipment, with water consumed through evaporation in cooling systems. Ask the hosting provider for metered water data and the reporting boundary, ideally for the specific facility hosting the service.

Water Usage Effectiveness (WUE) expresses data centre water use relative to the energy consumed by its IT equipment, normally in litres per kilowatt-hour (L/kWh):

<div class="govuk-inset-text">

WUE = Site water use (litres) ÷ IT equipment energy consumption (kWh)

</div>

Where a suitable site WUE and the service’s allocated IT energy consumption are available, an indicative service-level estimate can be calculated:

<div class="govuk-inset-text">

Allocated site water use (litres) = Site WUE (L/kWh) × Service IT energy consumption (kWh)

</div>

<div class="govuk-warning-text"><span class="govuk-warning-text__icon" aria-hidden="true">!</span><strong class="govuk-warning-text__text"><span class="govuk-visually-hidden">Warning</span>This apportions site water use using IT energy as a proxy. It is not a direct measurement of the service’s cooling water consumption. Use IT energy rather than total facility energy, as the WUE denominator excludes cooling and other facility overheads. Prioritise site-specific data as a provider-wide average may not reflect the facility or period relevant to the service.</strong></div>
