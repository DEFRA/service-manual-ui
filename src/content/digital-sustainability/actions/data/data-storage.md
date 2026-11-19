---
title: "4b. Optimise data storage"
caption: "Data"
description: "Optimising data storage reduces unnecessary infrastructure, energy use and cooling demand, which can lower carbon emissions, water consumption, hardware requirements and costs while extending the useful life of existing resources."
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
  - text: "4b. Optimise data storage"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
**Lead role families:** Data, Architecture

**Likely co-benefits:** Cost

---

## (i) Use appropriate data storage tiers

Storage tiers organise data into different levels of access based on how often it is used.

These tiers are often referred to by ‘temperature’: ‘hot’ for high-performance, fast access storage for data that needs to be accessed often, and ‘cold’ for slower, cheaper storage options for data accessed less often.

Choosing slower ('cold') or archive storage tiers for data that is not accessed often or required instantly reduces energy consumption.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [Optimize data and storage for sustainability](https://docs.cloud.google.com/architecture/framework/sustainability/optimize-storage/) Google Cloud Architecture Center

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, moving data to slower storage tiers brings co-benefits in terms of:

- Cost: 'Cold' or archive storage tiers are usually cheaper that warmer ones
- Data Management: Transitioning data between tiers over time supports general best practice for data lifecyle management

### Trade-offs

Potential trade-offs may include:

- Speed: 'Cold' or archive storage tiers mean slower access times for data
- Complexity: Moving data between tiers requires lifecyle policies to be defined and managed carefully

</div>
</details>

---

## (ii) Compress data

Data compression is the process of encoding, restructuring, or modifying data to reduce its file size.

Compressing data, where appropriate, reduces the energy associated with both the storage and retrieval of that data.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [Compress stored data](https://patterns.greensoftware.foundation/development/data-handling/compress-stored-data/) Green Software Foundation

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, compressing data brings co-benefits in terms of:

- Cost: Reducing data volumes reduces the costs associated with data storage
- Performance: Compressing data means faster file transfer and application response times

### Trade-offs

Potential trade-offs may include:

- Energy use: If there is data that needs to be frequently compressed and decompressed, this could contribute to increases in energy consumption

</div>
</details>

---

## (iii) Choose the right data formats

Different file formats offer varying levels of compression and efficiency for data storage, which in turn impact data storage volumes and energy consumption.

Consider use of more efficient data formats, particularly when large volumes of data are involved.

For example, Parquet files are a more efficient way to store large datasets than Comma Separated Values (CSV), leading to smaller file sizes, as well as being optimised for analytical queries.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [Parquet or CSV?](https://dev.to/hiteshchawla/what-to-use-parquet-or-csv-3bp7/) Dev.to

</div>
</details>

---

## (iv) Deduplicate stored data

Data deduplication identifies and removes redundant copies of data in a storage system, saving on associated energy consumption.

Identify redundant files or data blocks and replace the duplicates with references or pointers.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [Data deduplication overview,](https://learn.microsoft.com/en-us/windows-server/storage/data-deduplication/overview/) Microsoft
- [What is data deduplication? Methods and benefits,](https://www.oracle.com/uk/data-deduplication/) Oracle

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, deduplicating data brings co-benefits in terms of:

- Data Quality: Deduplicating improves data quality and integrity
- Performance: Reducing data transfer and backup volumes improves performance and reduces backup times
- Cost: Removing duplicate data the costs associated with data storage

### Trade-offs

Potential trade-offs may include:

- Complexity: Deduplication can introduce additional complexity in implementation, especially across distributed systems

</div>
</details>

---

## (v) Apply best practice for database indexing

A database index is a structure that improves the speed of data retrieval and optimises database performance.

Appropriate database indexing improves query efficiency, reducing the number of full-table scans and with it energy consumption.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, applying best practice for database indexing brings co-benefits in terms of:

- Cost: Reducing the load on database infrastructure can lower costs
- Scalability: More efficient access patterns, enabling better scalability

### Trade-offs

Potential trade-offs may include:

- Storage: Indexes require additional storage, so creating multiple database indexes adds to overall data volumes

</div>
</details>

---

## (vi) Fit data formatting to expected query patterns

Query patterns are reusable templates for structuring queries to solve recurring problems efficiently.

Aligning data structures with how queries are executed reduces inefficient queries and processing, leading to lower energy consumption.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, fitting data to expected query patterns brings co-benefits in terms of:

- Performance: Improved performance and responsiveness for common operations

### Trade-offs

Potential trade-offs may include:

- Storage: Requires upfront data modelling and understanding of access patterns

</div>
</details>

---

## (vii) Create permissions and access plans that minimise the amount of data load per user

Permissions and access plans determine who can view, modify, or share data, ensuring security, compliance, and effective collaboration.

Create permissions and access plans that minimise the amount of data loaded and processed per user based on their actual needs.

This approach serves to reduce network usage and energy consumption.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, permissions and access plans that minimise data load per user bring co-benefits in terms of:

- Performance: Limiting unneccessary data transfer improves performance
- Security: Enhancing security and privacy by enforcing least-privilege access to data

### Trade-offs

Potential trade-offs may include:

- Planning: Careful design of roles, permissions, and access patterns are required
- Complexity: Added complexity in access control management and governance

</div>
</details>

---

## (viii) Utilise edge computing

Edge computing means storing and processing data at the ‘edge’ of networks.

This can mean data is much closer to the devices that produce it and the users who consume it, reducing data transfer distances, network load and energy consumption.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [Government cyber security policy: Asset management policy for edge devices,](https://www.security.gov.uk/policy-and-guidance/government-cyber-security-policy-asset-management-policy-for-edge-devices/) UK Government Security
- [Why do we need Edge Computing for a sustainable future?,](https://objectbox.io/why-do-we-need-edge-computing-for-a-sustainable-future/) ObjectBox

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, processing data at the 'edge' brings co-benefits in terms of:

- Performance: Decreased latency by processing data closer to users or devices

### Trade-offs

Potential trade-offs may include:

- Complexity: Processing data at the edge introduces additional infrastructure
- Management: Processing data at the edge requires careful management to ensure consistency, security, and data synchronisation

</div>
</details>

---

## (ix) Consider the need for consistency of data

Data consistency means that digital information remains uniform, accurate, and synchronised across all databases, applications, and systems.

Align the level of data consistency with actual user and system requirements, avoiding unnecessary synchronisation, duplication, and real-time processing where not required

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [Data consistency versus data integrity: similarities and differences,](https://www.ibm.com/think/topics/data-consistency-vs-data-integrity/) IBM
- [Why you should pick strong consistency, whenever possible,](https://cloud.google.com/blog/products/databases/why-you-should-pick-strong-consistency-whenever-possible/) Google Cloud

</div>
</details>
