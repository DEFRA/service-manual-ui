---
title: "4c. Optimise data for transit"
caption: "Data"
description: "Optimising data for transit cuts unnecessary network and computing activity, which lowers energy use, carbon emissions, infrastructure demand and cost."
layout: section
sectionNav: nav-ds-data
customNav: nav-digital-sustainability
headerServiceName: Sustainability
headerServiceUrl: /digital-sustainability
breadcrumbItems:
  - text: "Digital Defra"
    href: /
  - text: "Sustainability"
    href: /digital-sustainability
  - text: "Digital sustainability actions"
    href: /digital-sustainability/actions
  - text: "Data"
    href: /digital-sustainability/actions/data
  - text: "4c. Optimise data for transit"
---
<div class="app-applies-to">

**This action applies to:** services and data platforms on and off the Core Delivery Platform (CDP) that send data over networks, including internal tools. On CDP, the platform usually sets network settings such as protocols, so ask the CDP team.

**Lead role families:** Data and Architecture

</div>

---

## (i) Compress data for transit

Compressing data for transit means making files smaller, or lowering their bit rate, before you send them across a network. Bit rate is the amount of data sent each second.

Compression can reduce network load and energy use.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, compressing data for transit brings co-benefits in terms of:

- cost: using less network can save money

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- processing: compression adds processor (CPU) work to encode and decode data

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Compress transmitted data](https://patterns.greensoftware.foundation/development/data-handling/compress-transmitted-data) (Green Software Foundation)

</div>
</details>

---

## (ii) Use data from its primary source

Using data from its primary source means getting it from where it was first created.

You get the most up-to-date data without any processing or transformation in between. This saves the energy used for processing, for storing and replicating duplicate copies, and for sending data across networks.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, using data from its primary source brings co-benefits in terms of:

- efficiency: you get up-to-date data without keeping several copies

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- performance: it can conflict with patterns that copy data closer to users on purpose. Examples are caching, content delivery networks and edge computing
- dependencies: your service depends on the availability and performance of the upstream system

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [API catalogue](https://www.api.gov.uk/) (Government Digital Service): a directory of public sector APIs, to help find data at its source
- [API technical and data standards](https://www.gov.uk/guidance/gds-api-technical-and-data-standards) (GOV.UK): standards for designing, building and running government APIs

</div>
</details>

---

## (iii) Use efficient network protocols

A network protocol is a set of rules for how devices exchange data on a network.

Newer protocols, such as HTTP/3, which runs on the QUIC protocol, can reduce how often data has to be sent again. On CDP this is usually a platform setting, so ask the CDP team before you change anything.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, using efficient network protocols brings co-benefits in terms of:

- usability and performance: HTTP/3 sets up connections faster and copes better with weak mobile signals
- security: QUIC, which HTTP/3 runs on, encrypts all traffic by default

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- compatibility: some networks and firewalls block the traffic QUIC uses, so services still need a fallback to older protocols
- monitoring: fully encrypted traffic can make network troubleshooting harder
- processing: QUIC can use more server processing than older protocols in some set-ups

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [What is a protocol](https://www.cloudflare.com/learning/network-layer/what-is-a-protocol/) (Cloudflare)

</div>
</details>

---

## How to measure this

To measure the impact of data, read [measuring the impact of data](/digital-sustainability/measure/data).
