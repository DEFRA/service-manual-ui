---
title: "4c. Optimise data for transit"
caption: "Data"
description: "Optimising data for transit reduces unnecessary network and computing activity, lowering energy use, carbon emissions, infrastructure demand and costs."
layout: section
sectionNav: nav-ds-data
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
  - text: "Data"
    href: /digital-sustainability/actions/data
  - text: "4c. Optimise data for transit"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
**Lead role families:** Data, Architecture

**Likely co-benefits:** Cost

---

## (i) Compress data for transit

Compressing data for transit means reducing the file size or bit-rate of digital information before sending it across a network.

Compression can help reduce network load and energy consumption.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [Compress transmitted data,](https://patterns.greensoftware.foundation/development/data-handling/compress-transmitted-data/) Green Software Foundation

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, compressing data for transit brings co-benefits in terms of:

- Cost: Reduced network usage can lead to cost savings

### Trade-offs

Potential trade-offs may include:

- Compression introduces additional CPU overhead for encoding and decoding

</div>
</details>

---

## (ii) Enable consumption of data from primary source

Consuming data from its primary source means accessing data from where it was first generated.

This approach means we can access the most up-to-date information without the need for any intermediary processing or transformation, in turn reducing energy use from data processing, duplicate data storage and replication, and network transmission.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, compressing data for transit brings co-benefits in terms of:

- Efficiency: Ensures access to up-to-date data without maintaining multiple copies

### Trade-offs

Potential trade-offs may include:

- Performance: Enabling consumption from primary source may conflict with performance optimisation patterns (e.g. caching, CDNs, edge computing), which intentionally duplicate data closer to user
- Dependencies: Consumption from primary sources may introduce dependency on availability and performance of upstream systems

</div>
</details>

---

## (iii) Use efficient network protocols

A network protocol is a set of rules that define how data is exchanged between devices on a network.

Using efficient protocols like UDP based HTTP3 or QUIC can help reduce retransmissions.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [What is a protocol?,](https://www.cloudflare.com/learning/network-layer/what-is-a-protocol/) Cloudflare

</div>
</details>
