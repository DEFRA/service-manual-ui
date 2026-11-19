---
title: "Calculating carbon for services based in the cloud"
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
  - text: "Calculating carbon for services based in the cloud"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
Public Cloud services are those where shared compute, storage, and databases are hosted by a third-party provider and delivered over the internet.

Around 60% of UK government and public sector IT systems operate on cloud services, guided by the official [Government Cloud First Policy on GOV.UK](https://www.gov.uk/government/collections/cloud-technology-and-the-public-sector) .

## Setting the boundary

For services that are based in the cloud, an appropriate boundary is the carbon produced by This cover the servers, cloud instances and data storage.

A carbon figure can be obtained by the following approaches:

- Cloud-provider carbon metrics, typically at the monthly level
- Converting more granular cloud-usage metrics into estimates of energy consumption and carbon

## Using cloud-provider carbon metrics

Carbon footprint data can usually be obtained from cloud provider dashboards, monthly usage reports and monitoring tools. These tools are at varying degrees of maturity, but typically feature high level carbon emissions and data is not provided in real-time but for 1-3 months in the past.

Data available from cloud providers usually includes:

<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Operational carbon</dt><dd class="govuk-summary-list__value">the carbon emissions coming from the electricity used to power servers, network equipment, heating, ventilation and cooling systems and backup generators (scopes 1 &amp; 2). Note that in many cases, providers offset operational emissions with renewable purchases.</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Embodied carbon</dt><dd class="govuk-summary-list__value">carbon emissions coming from the whole lifecycle of equipment used by the service, including the building of the data centre and associated systems. This should cover the extraction and processing of raw materials, manufacture, distribution and disposal at the end of life. (scope 3)</dd></div></dl>

<div class="govuk-inset-text">

For many services or other projects, taking these carbon emission figures from cloud provider dashboards is sufficient as an initial measurement for carbon emission calculations.

</div>

Several cloud providers are working to increase the scope and granularity of these emissions, and some organisations may also use Greenops providers that are able to provide more accurate and granular data.

<div class="govuk-inset-text">

**In Defra**: Services using public cloud in Defra should be able to use the cloudability module from late 2026 to see granular energy and carbon emission estimates for compute as well as data storage and transfer.

</div>

## Calculating carbon from usage and energy estimates

Teams working on the design and development of digital services may need more granular data on specific components of a service, over shorter timescales, than are available from cloud-provider dashboards. This is so they can see how their development and operational decisions affect emissions.

Cloud usage metrics and monitoring tools can help provide the insight that teams need. Core metrics available through usage reports include:

<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Compute</dt><dd class="govuk-summary-list__value">Virtual machine (VM) or instance type, number of instances, allocated virtual Central Processing Units (vCPU), allocated Graphic Processing Unit (GU), allocated memory, running hours</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Data storage</dt><dd class="govuk-summary-list__value">storage capacity consumed (gigabytes/terabytes) across storage tiers, input/output (I/O) operations, and snapshot or backup volumes</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Data transfer</dt><dd class="govuk-summary-list__value">Ingress (inbound data transfer) versus egress (outbound to the internet), inter-availability zone inter-region data traffic</dd></div></dl>

The following additional data may also be available through cloud provider monitoring tools:

<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Compute</dt><dd class="govuk-summary-list__value">average and peak core processing unit (CPU) utilisation (%)</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Memory</dt><dd class="govuk-summary-list__value">average and peak memory utilisation (%)</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Resource efficiency</dt><dd class="govuk-summary-list__value">number of idle, underutilised or over-provisioned resources</dd></div></dl>

These usage metrics can be converted into estimated energy use (kWh) using modelling approaches and open-source tools. The energy estimates are then combined with electricity grid carbon intensity using the [GHG Conversion Factors](https://www.google.com/search?q=ghg+conversion+factors+2026&oq=ghg+&gs_lcrp=EgRlZGdlKgkIABBFGDsY-QcyCQgAEEUYOxj5BzIOCAEQRRg7GEMYgAQYigUyBggCEEUYOzIMCAMQABhDGIAEGIoFMgwIBBAAGEMYgAQYigUyDAgFEAAYQxiABBiKBTIKCAYQABiABBi0BzIGCAcQRRg8MgYICBBFGDwyCAgJEOkHGPxV0gEIMTYxNmowajSoAgGwAgE&sourceid=chrome&source=chrome.ob&ie=UTF-8) , or [Electricity Maps data](https://www.electricitymaps.com/data) to produce carbon emissions (CO2e).
