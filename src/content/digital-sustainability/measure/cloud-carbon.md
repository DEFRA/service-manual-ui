---
title: "Calculating carbon for services based in the cloud"
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
  - text: "Calculating carbon for services based in the cloud"
---
In a public cloud, a third-party provider hosts shared compute, storage and databases and delivers them over the internet. Read about the [government Cloud First policy](https://www.gov.uk/government/collections/cloud-technology-and-the-public-sector) (GOV.UK).

## Setting the boundary

For a cloud service, include the servers, instances and storage it uses. Read about the [recommended boundary](/digital-sustainability/measure/boundary).

You can get a carbon figure in 2 ways:

- from the cloud provider's carbon reporting, usually monthly
- by converting more detailed cloud usage data into estimates of energy and carbon

A cloud provider's emissions are Defra's scope 3 emissions: indirect emissions from Defra's value chain. Read about [scopes of emissions](/digital-sustainability/measure/carbon).

## Using cloud provider carbon reporting

Cloud providers usually give carbon figures through dashboards, monthly usage reports and monitoring tools. These tools vary in maturity. They typically show high-level carbon emissions, and the data covers a period 1 to 3 months in the past, not real time.

Provider data usually includes:

<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Operational carbon</dt><dd class="govuk-summary-list__value">Emissions from the electricity used to power servers, network equipment, heating, ventilation and cooling systems, and from backup generators. Providers report these as their own scopes 1 and 2. Many providers use the market-based method to claim zero-emissions electricity, by buying renewable energy in other locations. Use location-based figures, based on the local grid, where the provider gives them.</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Embodied carbon</dt><dd class="govuk-summary-list__value">Emissions from the whole lifecycle of the equipment the service uses, including building the data centre and its systems. This should cover extracting and processing raw materials, manufacture, distribution and disposal. Providers report this as their scope 3.</dd></div></dl>

<div class="govuk-inset-text">

For many services and projects, the carbon figures from a cloud provider's dashboard are enough for a first measurement.

</div>

Several cloud providers are working to widen the scope and detail of these figures. Some organisations also use GreenOps providers to get more accurate and detailed data. GreenOps providers track the environmental impact of cloud use alongside its cost.

<div class="govuk-inset-text">

**In Defra:** Cloudability is a cloud cost management tool from IBM. Its [cloud sustainability reporting](https://www.ibm.com/docs/en/cloudability-commercial/cloudability-enterprise/saas?topic=insights-cloud-sustainability-reporting) (IBM) estimates energy use and carbon emissions for compute, data storage and data transfer. Ask the CDP team or your hosting supplier whether you can see Cloudability figures for your service.

</div>

## Estimating carbon from usage data

Teams designing and building a service may need more detailed data on specific components, over shorter periods, than provider dashboards give. This shows them how their development and operational decisions affect emissions.

Cloud usage reports and monitoring tools can give this detail. Core metrics in usage reports include:

<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Compute</dt><dd class="govuk-summary-list__value">Virtual machine (VM) or instance type, number of instances, allocated virtual central processing units (vCPUs), allocated graphics processing units (GPUs), allocated memory and running hours</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Data storage</dt><dd class="govuk-summary-list__value">Storage capacity used (gigabytes or terabytes) across storage tiers, input and output (I/O) operations, and snapshot or backup volumes</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Data transfer</dt><dd class="govuk-summary-list__value">Ingress (data coming in) and egress (data going out to the internet), and traffic between availability zones and between regions</dd></div></dl>

Cloud provider monitoring tools may also give:

<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Compute</dt><dd class="govuk-summary-list__value">Average and peak central processing unit (CPU) utilisation (%)</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Memory</dt><dd class="govuk-summary-list__value">Average and peak memory utilisation (%)</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Resource efficiency</dt><dd class="govuk-summary-list__value">Number of idle, underused or over-provisioned resources</dd></div></dl>

You can convert these usage metrics into estimated energy use (kWh) with modelling approaches and open-source tools. Then combine the energy estimates with grid carbon intensity to produce carbon emissions (CO2e). For grid carbon intensity, use the [UK government conversion factors for greenhouse gas reporting](https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting) (GOV.UK) or [Electricity Maps data](https://www.electricitymaps.com/data). Read about [converting energy to carbon](/digital-sustainability/measure/carbon).
