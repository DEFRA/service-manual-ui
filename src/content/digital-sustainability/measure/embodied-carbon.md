---
title: "Calculating embodied carbon"
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
  - text: "Calculating embodied carbon"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
Embodied carbon is the total carbon emissions emitted during the manufacturing, transport, and eventual disposal of the physical hardware. This is typically factored into carbon reports provided by public cloud providers, but not from supplier reporting of off and on premise hosting.

Embodied carbon is calculated at a product level and may be provided in manufacture Product Carbon Footprint sheets or Lifecycle Assessments. Note where it is not available, reference items can be used.

## Apportion embodied emissions

Where hardware is shared with other services, then the embodied emissions need to be apportioned to isolate the fractional share of a particular service, as for operational emissions. This means we need to know:

<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Time Allocation</dt><dd class="govuk-summary-list__value">How many hours the software utilised hardware relative to it’s expected total lifespan</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Expected lifespan</dt><dd class="govuk-summary-list__value">the expected useful lifetime of hardware</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Resource Allocation</dt><dd class="govuk-summary-list__value">Measure the share of the physical machine resources the software reserved (e.g., specific allocated vCPUs divided by the total vCPUs on the host machine).</dd></div></dl>

## Calculate the total embodied carbon

The total embodied carbon of the service can then be calculated as:

<div class="govuk-inset-text">

Embodied carbon x service resource allocation % x (service usage hours/expected lifespan of hardware in hours)

</div>
