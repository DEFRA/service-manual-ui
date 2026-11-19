---
title: "Measuring the impact of data"
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
  - text: "Measuring the impact of data"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
Measuring the environmental impacts of storing and transferring data can:

- show the people working with data where they can make reductions
- feed into estimates of the impacts of a [whole service or project](/digital-sustainability/measure)

The main things to measure are how much data you store and transfer. You can use these metrics as [proxies](/digital-sustainability/measure/data-and-proxies) in their own right, or use conversion factors to estimate energy, carbon and water use.

You can measure data in 3 ways:

- absolute metrics, such as the total volume of data stored or transferred
- time metrics, such as monthly storage growth
- intensity metrics, which divide absolute and time metrics by a unit of service activity. For example, data stored per user or data transferred per transaction

<div class="govuk-inset-text">

Look at these metrics alongside the service's data management policies and settings, such as retention periods, archiving, backup policies and storage tiering rules. Together they show improvements in efficiency that do not depend on how much the service grows.

</div>

## Suggested metrics

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header">Measurement</th><th scope="col" class="govuk-table__header">What to capture</th><th scope="col" class="govuk-table__header">Unit</th><th scope="col" class="govuk-table__header">Purpose</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Data storage volume, by tier</th><td class="govuk-table__cell">Total stored data, by tier</td><td class="govuk-table__cell">GB or TB</td><td class="govuk-table__cell">Set a baseline and find where stored data is concentrated</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Data growth, by tier</th><td class="govuk-table__cell">Change in stored data over a reporting period</td><td class="govuk-table__cell">GB or TB growth per month, or % growth</td><td class="govuk-table__cell">Find growth or reduction in data and investigate the causes. Compare with changes in service demand.</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Data storage intensity</th><td class="govuk-table__cell">Volume of stored data divided by a scaling metric, such as active users or licences issued</td><td class="govuk-table__cell">GB or MB per unit</td><td class="govuk-table__cell">Track storage efficiency separately from service growth</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Inbound and outbound data transfer</th><td class="govuk-table__cell">Volume of data transferred into and out of the service, including between regions, cloud services and users</td><td class="govuk-table__cell">GB or TB over a set period</td><td class="govuk-table__cell">Find hotspots and track changes over time</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Data transfer intensity</th><td class="govuk-table__cell">Data transferred divided by a scaling metric, such as active users or licences issued</td><td class="govuk-table__cell">GB or MB per unit</td><td class="govuk-table__cell">Track transfer efficiency separately from service growth</td></tr></tbody></table>

## Tiers of data storage

To estimate the energy used by stored data, you need to know which tier it is stored in. There are usually 3 broad tiers, although the tiers on offer vary between providers:

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header"><span class="govuk-visually-hidden">Characteristic</span></th><th scope="col" class="govuk-table__header">Hot tier</th><th scope="col" class="govuk-table__header">Warm tier</th><th scope="col" class="govuk-table__header">Cold tier</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Technology</th><td class="govuk-table__cell">Solid-state drives (SSDs)</td><td class="govuk-table__cell">Hard disk drives (HDDs)</td><td class="govuk-table__cell">Magnetic tape or offline disks</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Speed and latency</th><td class="govuk-table__cell">Very fast (about 10 to 200 µs)</td><td class="govuk-table__cell">Moderate (about 5 to 15 ms)</td><td class="govuk-table__cell">Slow and sequential (seconds to minutes)</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Power use</th><td class="govuk-table__cell">Highest</td><td class="govuk-table__cell">Moderate</td><td class="govuk-table__cell">Lowest</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Use</th><td class="govuk-table__cell">High-performance work</td><td class="govuk-table__cell">General file storage, standard backups</td><td class="govuk-table__cell">Long-term storage, often powered off entirely</td></tr></tbody></table>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading on storage tiers from major cloud providers</span></summary>
<div class="govuk-details__text">

- [Optimising your AWS infrastructure for sustainability: storage](https://aws.amazon.com/blogs/architecture/optimizing-your-aws-infrastructure-for-sustainability-part-ii-storage/) (AWS)
- [Storage classes](https://docs.cloud.google.com/storage/docs/storage-classes) (Google Cloud)
- [Access tiers for blob data](https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview) (Microsoft Azure)
- [Oracle Cloud Infrastructure storage](https://docs.oracle.com/en/cloud/paas/ociov/oci_storage.html) (Oracle)

</div>
</details>

How you estimate depends on whether the service is in the cloud or in an on-premises or off-premises data centre.

## Estimating energy and carbon for data in the cloud

Cloud provider billing and monitoring tools commonly give these metrics:

- compute: active instance hours, virtual central processing unit (vCPU) and memory allocations, graphics processing unit (GPU) use
- data storage: capacity used across storage tiers, input and output (I/O) operations, and snapshot or backup volumes
- data transfer: ingress (data coming in) and egress (data going out to the internet), and traffic between availability zones and between regions

To estimate the energy used to store and transfer data in the cloud, multiply these usage figures by an energy use factor.

This section covers data storage and transfer. For compute, read [calculating carbon for services based in the cloud](/digital-sustainability/measure/cloud-carbon).

### Industry benchmark factors

Apply energy use factors to data storage and transfer figures to get a total energy figure. Cloud and data centre providers usually do not publish energy or carbon figures for data storage, so use industry estimates. They are approximate, but they help you track trends and check improvements.

The Department for Energy Security and Net Zero supported a 2025 report, [Impact of growth of data centres on energy consumption](https://assets.publishing.service.gov.uk/media/689d9dc487bf475940723f6c/impact-of-growth-of-data-centres.pdf) (PDF). It used these estimates of energy use a year:

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header">Data type</th><th scope="col" class="govuk-table__header">Estimates</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Storage</th><td class="govuk-table__cell"><p class="govuk-body">Long-term storage at:</p><ul class="govuk-list govuk-list--bullet govuk-!-margin-bottom-0"><li>0.0025 kWh per GB for HDDs (cold storage)</li><li>0.005 kWh per GB central estimate (warm storage)</li><li>0.008 kWh per GB for SSDs (hot storage)</li></ul></td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Transfer</th><td class="govuk-table__cell">Energy intensity of 0.02 kWh per GB for uploading data to a data centre (ingress)</td></tr></tbody></table>

### Open-source tools

You can also apply energy use factors with open-source tools, such as:

- e-footprint: models the environmental footprint of a service before you build it
- Cloud Carbon Footprint: analyses public cloud usage and estimates the energy and carbon of data storage
- Boavizta cloud scanner: calculates the environmental impact of AWS storage from inventory and usage data
- CO2.js: estimates the carbon emissions of transferring data over the internet

Cloudability can also estimate energy, water and carbon for data storage and transfer. Read about [Cloudability in Defra](/digital-sustainability/measure/cloud-carbon).

### Data centre overhead

Once you have the energy used to store data, add the data centre overhead using the provider's power usage effectiveness (PUE). Read how to [add data centre overhead](/digital-sustainability/measure/data-centre-carbon).

### Redundancy and replication

Your data may be copied across several servers or data centres. This depends on the storage configuration and the redundancy, replication and backup you choose. Each copy increases the physical storage and the energy it uses. Usage reports may count one copy of your data. Multiply by the copies you keep.

<div class="govuk-warning-text"><span class="govuk-warning-text__icon" aria-hidden="true">!</span><strong class="govuk-warning-text__text"><span class="govuk-visually-hidden">Warning</span>When you estimate storage energy, check what redundancy is configured for the service and count every copy and backup.</strong></div>

## Estimating energy for data in on-premises and off-premises data centres

### Data storage

For data stored on hardware in on-premises or off-premises data centres, you can build a bottom-up model to estimate energy use. The metrics you need depend on your approach.

If the service has its own storage, you need:

- power use: the electricity (kWh) the storage hardware used over the reporting period, from power monitoring or metered electricity. If you do not have this, use the manufacturer's typical power figures for the hardware, not its maximum rated power. If there is no manufacturer datasheet, use a reference item: a similar piece of hardware.
- operating time: how long the hardware is powered on or serving data over the period, such as a month or a year

If the service uses shared storage, allocate a share of the total storage energy to the service:

- storage capacity and allocation: get the capacity allocated to the service and the total capacity of the storage. Use them to work out the service's percentage of the total power. If you do not have this, use the service's spend. Read about [allocation](/digital-sustainability/measure/data-centre-carbon).

If you have no data, use the benchmark factors in the cloud section of this page to estimate average energy per GB stored.

Then add the data centre overhead using the PUE. Read how to [add data centre overhead](/digital-sustainability/measure/data-centre-carbon).

### Data transfer

You need:

- data transfer volume, in GB or TB over a set period, from network monitoring systems or supplier reports. If you do not have this, estimate traffic from service logs.
- network energy intensity: a benchmark to estimate electricity use from the volume of data transferred

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header">Energy intensity factor</th><th scope="col" class="govuk-table__header">Source</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">0.001 kWh/Gb</th><td class="govuk-table__cell">Cloud Carbon Footprint calculation for exchanging data between hyperscaler (very large cloud provider) data centres</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">0.02 kWh/GB</th><td class="govuk-table__cell">Department for Energy Security and Net Zero 2025 data centre energy study: for uploading into a data centre</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">0.015 kWh/GB</th><td class="govuk-table__cell">Department for Energy Security and Net Zero 2025 data centre energy study: for downloading into a data centre</td></tr></tbody></table>

## Calculating carbon and water use

To convert energy into carbon and water figures, multiply energy use by carbon intensity and water intensity factors for the region. Energy use might be in kilowatt-hours or fuel volume. Read about [converting energy to carbon](/digital-sustainability/measure/carbon) and [water](/digital-sustainability/measure/water).
