---
title: "Calculating embodied carbon"
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
  - text: "Calculating embodied carbon"
---
Embodied carbon is the total carbon emitted in making, transporting and finally disposing of physical hardware. Public cloud providers usually include it in their carbon reports. Suppliers of on-premises and off-premises hosting usually do not.

Manufacturers publish embodied carbon in product carbon footprint sheets or lifecycle assessments. If there is none, use a similar product's figure.

## Apportion embodied emissions

If hardware is shared with other services, work out your service's share of its embodied emissions. Do this as you would for operational emissions, the emissions from running it. Read about [allocation](/digital-sustainability/measure/data-centre-carbon). You need to know:

<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Time allocation</dt><dd class="govuk-summary-list__value">How many hours the software used the hardware, compared with the hardware's expected lifespan</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Expected lifespan</dt><dd class="govuk-summary-list__value">The expected useful life of the hardware, in hours</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Resource allocation</dt><dd class="govuk-summary-list__value">The share of the machine's resources the software reserved. For example, the virtual processors (vCPUs) allocated to it divided by the total vCPUs on the host machine</dd></div></dl>

## Calculate the total embodied carbon

Calculate the service's embodied carbon, in kilograms of carbon dioxide equivalent (kgCO2e), as:

<div class="govuk-inset-text">

Service embodied carbon (kgCO2e) = hardware embodied carbon (kgCO2e) × service resource allocation (%) × (service usage hours ÷ expected lifespan of hardware in hours)

</div>

This is M in the [Software Carbon Intensity formula](/digital-sustainability/measure/carbon-formula).
