---
title: "Setting boundaries and functional units"
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
  - text: "Setting boundaries and functional units"
---
If you are measuring the carbon or energy of a service, you need to choose a boundary. If you are also calculating a carbon intensity figure in line with the [Software Carbon Intensity (SCI) formula](/digital-sustainability/measure/carbon-formula), you need to choose a functional unit.

## Choose a system boundary

The system boundary sets out which parts of a digital system you include in the assessment, and which you leave out.

A boundary that covered every part of a digital service would include:

- data centres, where the service is hosted
- network infrastructure, which connects the service to its users
- end-user devices, such as the phones or laptops people use to reach the service

<div class="govuk-inset-text">

Choose a boundary you can measure. It is a practical starting point for measuring a service.

</div>

### The recommended boundary

Draw the boundary around the parts of the service your team can change and influence: the infrastructure that runs the service.

The boundary **includes**:

- the servers, cloud instances and storage the service uses, in the cloud or in on-premises or off-premises data centres
- managed services and software as a service that the service uses

The boundary **excludes** these, where they are outside the service's control:

- networking hardware
- end-user devices such as phones or laptops
- offline parts of the service, such as paper, travel and phone calls

<div class="govuk-inset-text">

You can include end-user devices in the boundary if the service manages, buys or disposes of them.

</div>

Use this boundary every time, so your figures can be compared.

### How to calculate carbon for this boundary

How you calculate the carbon footprint within this boundary depends on where the service is hosted:

- [calculating carbon for services based in the cloud](/digital-sustainability/measure/cloud-carbon)
- [calculating carbon for services using on-premises or off-premises data centres](/digital-sustainability/measure/data-centre-carbon)
- for software as a service and managed software, ask the supplier for the [metrics on the software page](/digital-sustainability/measure/software)

### Setting a boundary for one part of a service

Some services have several parts, such as software components or architectural layers. For these, it can help to calculate an SCI score for each part, as well as one for the whole service.

Parts of a service can differ a lot in the energy and resources they use and in their environmental impact. Measuring them separately shows which parts contribute most, so you can target your improvements.

Measure the part before and after a change, with the same method and comparable workloads. This separates the effect of the change from changes in how much the service is used.

<div class="govuk-inset-text">

For example, a team working on data storage could set a boundary around the storage footprint, rather than the footprint of the whole service.

</div>

## Choosing a functional unit (R)

The functional unit (R) is the unit of output your software scales with, such as a user or a transaction. The SCI gives carbon per functional unit.

Choose a functional unit for the whole service, or for the part of a service you are measuring.

### Choosing a functional unit for a whole service

Choose a functional unit that drives the service's load and resource use.

For example, the energy and carbon of an application people use may scale with active users, user sessions or logged-in minutes. For a data project, the functional unit might be a scheduled job, a database transaction or a gigabyte of data processed.

Common functional units for a whole service include:

- carbon per active user
- carbon per completed user transaction
- carbon per gigabyte (GB) of data processed

### Choosing a functional unit for one part of a service

If you calculate SCI scores for different parts of a service, the functional units can differ. Base each one on what drives that part's load.

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header">Aspect</th><th scope="col" class="govuk-table__header">Recommended functional unit (R)</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">User-facing applications</th><td class="govuk-table__cell"><ul class="govuk-list govuk-list--bullet govuk-!-margin-bottom-0"><li>Per active user</li><li>Per user session</li></ul></td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">AI inference</th><td class="govuk-table__cell"><ul class="govuk-list govuk-list--bullet govuk-!-margin-bottom-0"><li>Per token (for large language models)</li><li>Per image (for image generation)</li><li>Per workflow run (for agentic AI)</li></ul></td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Batch or scheduled jobs</th><td class="govuk-table__cell"><ul class="govuk-list govuk-list--bullet govuk-!-margin-bottom-0"><li>Per job run</li><li>Per database transaction</li><li>Per page processed</li></ul></td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">APIs and microservices</th><td class="govuk-table__cell"><ul class="govuk-list govuk-list--bullet govuk-!-margin-bottom-0"><li>Per API request</li><li>Per transaction</li></ul></td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Data pipelines</th><td class="govuk-table__cell"><ul class="govuk-list govuk-list--bullet govuk-!-margin-bottom-0"><li>Per job</li><li>Per record processed</li><li>Per gigabyte transferred</li></ul></td></tr></tbody></table>

These pages give more detail on measuring energy use and proxies for each area:

- [data](/digital-sustainability/measure/data)
- [software](/digital-sustainability/measure/software)
- [architecture](/digital-sustainability/measure/architecture)
- [AI](/digital-sustainability/measure/ai)
- [service journeys and processes](/digital-sustainability/measure/journeys-and-processes)
