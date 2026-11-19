---
title: "5c. Shift cloud demand to match low-carbon electricity"
caption: "Architecture"
description: "Carbon-aware services respond to changes in the carbon intensity of the electricity grid. They run workloads at times and in places where more renewable energy is available."
layout: section
sectionNav: nav-ds-architecture
customNav: nav-digital-sustainability
headerServiceName: Digital sustainability
headerServiceUrl: /digital-sustainability
breadcrumbItems:
  - text: "Digital Defra"
    href: /
  - text: "Digital sustainability"
    href: /digital-sustainability
  - text: "Digital sustainability actions"
    href: /digital-sustainability/actions
  - text: "Architecture"
    href: /digital-sustainability/actions/architecture
  - text: "5c. Shift cloud demand to match low-carbon electricity"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
**Applies to:** workloads that can wait or move, on and off CDP, in the cloud or on premises. On CDP, ask the CDP team what scheduling and region options your service has.

**Lead role families:** Architecture and IT operations

<div class="govuk-inset-text">

Shifting where cloud workloads run may not always be possible, because of contracts or data sovereignty.

</div>

---

## (i) Shift workloads in time

The UK electricity grid tends to have its highest mix of renewable electricity late at night and early in the morning, and on bright, windy days.

Shift workloads that can wait to times when grid carbon intensity is lowest. This is often called temporal demand shifting. Workloads that suit it include:

- batch processing and data backups
- AI model training
- routine software updates, background processing and continuous integration and continuous delivery (CI/CD) workloads
- routine, intensive security scans

Never delay security patches, incident fixes or scans you need for a live threat.

Use a carbon intensity forecast, such as the [Carbon Intensity API](https://carbonintensity.org.uk/) (National Energy System Operator), which gives regional forecasts for Great Britain about four days ahead, to find lower-carbon times. Off-peak hours are not always the lowest-carbon hours, so check the forecast rather than assume.

To design workloads that can move in time, see [design for time-flexible workloads](/digital-sustainability/actions/architecture/flexible-workloads).

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, shifting workloads in time brings co-benefits in terms of:

- cost: off-peak running can match lower pricing and spare capacity
- service performance: moving batch jobs out of busy hours frees capacity for users

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- speed: results from delayed jobs arrive later, which may not suit every user
- tooling: scheduling by carbon intensity needs forecast data and changes to pipelines

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Use carbon-aware scheduling and region selection for AI workloads](https://patterns.greensoftware.foundation/operations/carbon-aware-ai-scheduling) (Green Software Foundation): shifting jobs that can wait to lower-carbon times and places
- [Time-shift Kubernetes cron jobs](https://patterns.greensoftware.foundation/operations/time-shift-kubernetes-cron-jobs) (Green Software Foundation): scheduling recurring jobs, such as scans, for times of lower grid carbon intensity

</div>
</details>

---

## (ii) Shift workload location

The share of renewable energy on the electricity grid varies a lot between UK regions. It depends on how electricity is generated locally and how it moves between regions.

Where you can, move workloads from regions with fewer renewables to regions with more. This is often called spatial demand shifting. Check with your platform team which regions you can use.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, shifting workload location brings co-benefits in terms of:

- resilience: workloads that can move between regions cope better with a regional outage
- flexibility: workloads built to move are easier to shift between regions or suppliers later

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- data sovereignty: contracts and data protection rules may limit where data can be stored or processed
- latency: running workloads further from users can slow response times
- data transfer: moving data between regions uses network energy and can add cost

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Carbon intensity dashboard](https://dashboard.neso.energy/) (National Energy System Operator)

</div>
</details>

---

## How to measure this

To measure the carbon of your cloud workloads, read [measuring the impact of architectural decisions](/digital-sustainability/measure/architecture).
