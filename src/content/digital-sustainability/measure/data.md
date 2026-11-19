---
title: "Measuring the impact of data"
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
  - text: "Measuring the impact of data"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
Measuring the environmental impacts of storing and transferring data can:

- Provide insight that can guide practitioners working on this aspect of digital services towards identifying how reductions can be made
- Feed into estimates of the environmental impacts of a [whole service or project](/digital-sustainability/measure)

The primary thing to measure is the storage and transfer of data. These metrics can either be used as proxies for sustainability in themselves, or can be used to estimate energy, carbon and water use using conversion factors.

There are a few ways data can be measured:

- Absolute metrics: such as the total volume of data stored or transferred
- Time metrics: such as monthly storage growth
- Intensity metrics: convert absolute and time metrics relative to a meaningful unit of service activity, such as data stored per user or data transferred per transaction

<div class="govuk-inset-text">

These metrics can be assessed alongside a service’s data management policies and settings, such as data retention periods, archiving policies, back up policies and storage-tiering rules. Used together, these metrics support service teams to identify and demonstrate improvements in service efficiency independently of service growth.

</div>

## Suggested metrics

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header">Measurement</th><th scope="col" class="govuk-table__header">What to capture</th><th scope="col" class="govuk-table__header">Unit</th><th scope="col" class="govuk-table__header">Purpose</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Data storage volume, by tier</th><td class="govuk-table__cell">Total stored data, by tier</td><td class="govuk-table__cell">GB/TB</td><td class="govuk-table__cell">Establish a baseline and identify where stored data is concentrated</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Data growth by tier</th><td class="govuk-table__cell">Change in stored data over a reporting period</td><td class="govuk-table__cell">GB/TB growth per month or % growth</td><td class="govuk-table__cell">Identify growth or reduction in data and investigate causes. Assess optimisation alongside changes in service demand.</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Data storage intensity</th><td class="govuk-table__cell">Volume of stored data divided by a scaling metric, such as active users or licenses issued</td><td class="govuk-table__cell">GB/MB per metric</td><td class="govuk-table__cell">Track storage efficiency independently of service growth</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Inbound and outbound data transfer</th><td class="govuk-table__cell">Volume of data transferred into and out of the service, including between regions, cloud services and users.</td><td class="govuk-table__cell">GB/TB over a time frame</td><td class="govuk-table__cell">Identify hotspots and track changes over time</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Data transfer intensity</th><td class="govuk-table__cell">Data transferred divided by a scaling metric, such as active users or licenses issued</td><td class="govuk-table__cell">GB/MB per metric</td><td class="govuk-table__cell">Track data transfer efficiency independent of service growth</td></tr></tbody></table>

## Different tiers of digital data storage

Estimating energy use for stored data means understanding which tiers data is stored at. This is often described in terms of 3 broad tiers, although tiers specifically available may vary between providers:

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header"><span class="govuk-visually-hidden">Characteristic</span></th><th scope="col" class="govuk-table__header">Hot tier</th><th scope="col" class="govuk-table__header">Warm tier</th><th scope="col" class="govuk-table__header">Cold tier</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Technology</th><td class="govuk-table__cell">Solid-State Drives (SSDs)</td><td class="govuk-table__cell">Hard Disk Drives (HDDs)</td><td class="govuk-table__cell">Magnetic tape or offline disks</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Speed / Latency</th><td class="govuk-table__cell">Ultra-fast (~10–200 µs)</td><td class="govuk-table__cell">Moderate (~5–15 ms)</td><td class="govuk-table__cell">Slow / Sequential (Seconds to minutes)</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Power usage</th><td class="govuk-table__cell">Highest</td><td class="govuk-table__cell">Moderate</td><td class="govuk-table__cell">Lowest</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Use</th><td class="govuk-table__cell">High-performance tiers</td><td class="govuk-table__cell">General file storage, standard backups</td><td class="govuk-table__cell">Long term storage and can often be powered off entirely</td></tr></tbody></table>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more on storage tiers from major cloud providers</span></summary>
<div class="govuk-details__text">

- [AWS storage tiers](https://aws.amazon.com/blogs/architecture/optimizing-your-aws-infrastructure-for-sustainability-part-ii-storage/)
- [Google Cloud storage classes](https://docs.cloud.google.com/storage/docs/storage-classes)
- [Azure Blob Storage access tiers](https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview)
- [Oracle Cloud Infrastructure storage](https://docs.oracle.com/en/cloud/paas/ociov/oci_storage.html)

</div>
</details>

We need different estimation methodologies depending on whether our services are based in cloud or on- or off-premises environments.

## Estimating energy and carbon used by data in the cloud

Cloud provider billing and monitoring tools commonly gives the following metrics:

- Compute: Active instance hours, virtual central processing unit (vCPU) and memory allocations, Graphics Processing Unit (GPU) usage
- Data Storage: Capacity consumed across storage tiers, I/O operations, and snapshot or backup volumes.
- Data Transfer: Ingress (inbound) versus egress (outbound to the internet), inter-availability zone inter-region data traffic.

Estimating the energy use from data storage and transfer in the cloud involves taking these usage numbers and then applying an ‘energy use factor’.

This section will focus on the energy use and carbon coming from data that is stored and transferred. For cloud compute see the [Architecture](/digital-sustainability/measure/architecture) measurement page.

### Applying industry benchmark factors

Energy use factors can be applied to data storage and transfer figures to calculate a total energy use figure. As cloud and data center providers typically do not disclose energy or carbon estimates for data storage, services should use industry estimates for these factors. Although approximate, these estimates can help service teams track trends and assess improvements.

The [Impact of Growth of Data Centres on Energy Consumption Report (2025)](https://assets.publishing.service.gov.uk/media/689d9dc487bf475940723f6c/impact-of-growth-of-data-centres.pdf) supported by the Department for Energy Security and Net Zero used the following estimates for energy use per annum:

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header">Data type</th><th scope="col" class="govuk-table__header">Estimates</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Storage</th><td class="govuk-table__cell"><p class="govuk-body">Long-term storage at:</p><ul class="govuk-list govuk-list--bullet govuk-!-margin-bottom-0"><li>0.0025 kWh per GB for HDDs (cold storage)</li><li>0.005kWh per GB central estimate (warm storage)</li><li>0.008 kWh per GB for SSDs (hot storage)</li></ul></td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Transfer</th><td class="govuk-table__cell">Energy intensity of 0.02 kWh per GB for uploading data to a data centre (Ingress)</td></tr></tbody></table>

### Using open-source tooling to apply factors

Energy use factors can also be applied through open-source tooling. Tools available include:

- E-footprint: an open source tool that models the environmental footprint of a service prior to building it
- Cloud Carbon Footprint: analyses public cloud usage and estimates energy consumption and carbon for data storage
- Boavista cloud scanner: calculates the environmental impacts of AWS storage usage by combining inventory and usage data
- CO2.js: estimates carbon emissions from transferring data on the internet

<div class="govuk-inset-text">

In Defra,Cloudability is now available as a tool that maps items in the Cost and Usage Report (CUR) to its corresponding physical hardware to estimate electricity consumption, water consumption and carbon emissions. Users can drill down into services to view metrics associated with data storage and transfer.

</div>

### Accounting for data centre overhead for data storage in the cloud

As for other aspects of digital services, once energy consumption of data storage has been calculated, the data centre overhead must be factored in. The data centre overhead is accounted for using Power Usage Effectiveness (PUE); the ratio of total data centre energy consumption to IT equipment energy consumption. This can be provided by the supplier. The formula for using PUE is:

<div class="govuk-inset-text">

Total energy in kWh= energy consumption of data (kWh) x (PUE)

</div>

### Accounting for redundancy and replication of data storage in the cloud

Depending on the cloud provider storage configuration, and the level of redundancy, replication and backup configurations selected, data may be duplicated across multiple servers or data centres. This can increase the physical storage capacity and associated energy consumption. The redundancy configuration is typically reflected in the pricing of storage, rather by affecting estimates of storage consumption.

<div class="govuk-warning-text"><span class="govuk-warning-text__icon" aria-hidden="true">!</span><strong class="govuk-warning-text__text"><span class="govuk-visually-hidden">Warning</span>When estimating storage energy consumption, consider what redundancy is configured for the service and account for each back up in the calculation.</strong></div>

## Estimating energy use for data in on- and off-premises data centres

### For data storage:

For services with data stored in hardware that is located in on- and off-premises data centres, a bottom-up model can be used to estimate the energy being used. The metrics required will depend on the measurement approach used.

Metrics required when the service has dedicated storage:

- Power consumption: electricity consumption (kWh) of storage hardware over the reporting period. Calculate this from power monitoring or metered electricity consumption. If this is not available, use manufacturer power specifications for the relevant storage hardware, using typical energy consumption rather than maximum rated power. If manufacture datasheets are not available, use a reference item (a similar piece of hardware).
- Operating time: The duration the hardware is powered on or actively serving data over the target period, such as a month or a year.

Where the service uses shared storage an extra step is required to allocate the total storage energy consumption to the specific service:

- Storage capacity and allocation: Obtain the storage capacity allocated to the service and the total capacity of the storage infrastructure to apportion the % of the total power that should be allocated to the service. If this is not available, use service spend as a basis for allocation.

If no data is available:

- Use the intensity metrics outlined in the ‘estimating energy from cloud’ section to calculate average energy consumption per GB of data stored.

#### Adding data centre overhead

As for Cloud services, when data is stored in on- or off-premises data centres the data centre overhead needs to be factored into energy use via use of Power Usage Effectiveness (PUE) multiplication factors.

### Calculating data transfer:

Metrics required:

- Data transfer volume in GB or TB over a given time frame. This can be obtained through network monitoring systems, or supplier reports. If unavailable, use estimated traffic from service logs.
- Network energy intensity: Use an energy-intensity benchmark to estimate electricity consumption from the volume of data transferred.

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header">Energy intensity factor</th><th scope="col" class="govuk-table__header">Source</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">0.001 kWh/Gb</th><td class="govuk-table__cell">Cloud carbon footprint calculation for exchanging data between hyperscaler data centres</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">0.02 kWh/GB</th><td class="govuk-table__cell">DESNZ 2025 data centre energy study: for uploading into a data centre</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">0.015 kWh/GB</th><td class="govuk-table__cell">DESNZ 2025 data centre energy study: for downloading into a data centre</td></tr></tbody></table>

## Calculating carbon and water use

To convert energy use into carbon and water figures, you multiply your energy consumption (such as kilowatt-hours or fuel volume) by specific carbon intensity factors and water intensity factors that vary depending on region.

See the [measurement section](/digital-sustainability/measure) for guidance on this.
