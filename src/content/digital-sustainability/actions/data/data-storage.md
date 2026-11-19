---
title: "4b. Optimise data storage and queries"
caption: "Data"
description: "Store, query and access data efficiently. This cuts infrastructure, energy and cooling, which lowers carbon, water use, hardware needs and cost."
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
  - text: "4b. Optimise data storage and queries"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
**Applies to:** services and data platforms on and off CDP, including internal tools.

**Lead role families:** Data and Architecture

This action has two parts: how you store data, in points (i) to (v), and how you query and give access to it, in points (vi) to (ix).

---

## (i) Use the right storage tiers

Storage tiers sort data by how often it is used. They are often described by temperature: "hot" storage is fast and high-performance, for data you use often, and "cold" storage is slower and cheaper, for data you use less often.

Put data you rarely use, or do not need straight away, in cold or archive tiers. This uses less energy.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, moving data to slower storage tiers brings co-benefits in terms of:

- cost: cold or archive tiers usually cost less than warmer ones
- data management: moving data between tiers over time is good practice for managing the data lifecycle

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- speed: cold or archive tiers take longer to access
- complexity: moving data between tiers needs lifecycle policies that are defined and managed carefully

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Optimize data and storage for sustainability](https://docs.cloud.google.com/architecture/framework/sustainability/optimize-storage/) (Google Cloud Architecture Center)

</div>
</details>

---

## (ii) Compress data

Data compression encodes, restructures or changes data to make the file smaller.

Compress data where it helps. Smaller files take less energy to store and to retrieve.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, compressing data brings co-benefits in terms of:

- cost: less data costs less to store
- performance: files transfer faster and applications respond faster

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- energy use: data that is compressed and decompressed often can use more energy, not less

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Compress stored data](https://patterns.greensoftware.foundation/development/data-handling/compress-stored-data) (Green Software Foundation)

</div>
</details>

---

## (iii) Choose the right data formats

File formats differ in how well they compress and how efficiently they store data. That affects how much storage you use, and how much energy.

Use more efficient formats, especially for large volumes of data. For example, Parquet files store large data sets more efficiently than comma-separated values (CSV) files. Parquet is a columnar format: it stores data by column rather than by row, so files are smaller and analytical queries can read only the columns they need.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, choosing the right data formats brings co-benefits in terms of:

- cost: smaller files cost less to store and to move
- service performance: columnar formats such as Parquet speed up analytical queries by reading only the columns needed
- data quality: formats that store a schema, such as Parquet, keep data types consistent between uses

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- usability: formats like Parquet do not open in a spreadsheet, so some users may still need a CSV copy
- conversion: converting existing data uses compute and may need changes to pipelines

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [What to use, Parquet or CSV](https://dev.to/hiteshchawla/what-to-use-parquet-or-csv-3bp7) (DEV Community)

</div>
</details>

---

## (iv) Deduplicate stored data

Data deduplication finds and removes redundant copies of data in a storage system, which saves the energy used to store them.

Find redundant files or data blocks, and replace the duplicates with references or pointers to a single copy.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, deduplicating data brings co-benefits in terms of:

- data quality: deduplicating improves data quality and integrity
- performance: less data to transfer and back up improves performance and shortens backup times
- cost: removing duplicate data cuts storage costs

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- complexity: deduplication can be complex to set up, especially across distributed systems

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Data deduplication overview](https://learn.microsoft.com/en-us/windows-server/storage/data-deduplication/overview) (Microsoft)
- [What is data deduplication](https://www.oracle.com/uk/data-deduplication/) (Oracle)

</div>
</details>

---

## (v) Index databases efficiently

A database index is a structure that makes it faster to find data and improves database performance.

Without a suitable index, a query may have to read every row in a table. This is called a full-table scan. Good indexing makes queries more efficient, so there are fewer full-table scans and less energy is used.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, good database indexing brings co-benefits in terms of:

- cost: less load on database infrastructure can lower costs
- scaling: more efficient access patterns help the service scale

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- storage: indexes take up storage, so many indexes add to the overall data volume

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Index architecture and design guide](https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-index-design-guide) (Microsoft): designing efficient indexes for SQL Server and Azure SQL
- [Indexes](https://www.postgresql.org/docs/current/indexes.html) (PostgreSQL): index types, and the overhead indexes add
- [Web Sustainability Guidelines](https://www.w3.org/TR/web-sustainability-guidelines/) (W3C): guideline 3.16 covers reducing the number and complexity of database queries

</div>
</details>

---

## (vi) Fit data structures to expected query patterns

Query patterns are reusable templates for structuring queries to solve recurring problems efficiently.

Shape your data structures around how queries will run. This avoids inefficient queries and processing, so less energy is used.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, fitting data to expected query patterns brings co-benefits in terms of:

- performance: common operations run faster and respond better

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- effort: it needs upfront data modelling and an understanding of how data will be accessed

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [NoSQL design for DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-general-nosql-design.html) (Amazon Web Services): identifying query patterns before you design a schema
- [SUS03-BP05 Use software patterns and architectures that best support data access and storage patterns](https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_software_a6.html) (Amazon Web Services): matching architecture to how data is read, written and stored
- [Data partitioning recommendations for reliability](https://learn.microsoft.com/en-us/azure/well-architected/design-guides/partition-data) (Microsoft): partitioning data around how it is queried and used

</div>
</details>

---

## (vii) Plan permissions and access to minimise the data each user loads

Permissions and access plans decide who can view, change or share data. They support security, compliance and collaboration.

Plan permissions and access so each user loads and processes only the data they need. This reduces network use and energy.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, permissions and access plans that minimise data load per user bring co-benefits in terms of:

- performance: less unnecessary data transfer improves performance
- security: least-privilege access to data improves security and privacy

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- planning: roles, permissions and access patterns need careful design
- complexity: access control is more complex to manage and govern

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Identity and access management](https://www.ncsc.gov.uk/collection/10-steps/identity-and-access-management) (National Cyber Security Centre): controlling who can access what, and removing privileges people do not need
- [Reduce transmitted data](https://patterns.greensoftware.foundation/development/data-handling/reduce-transmitted-data) (Green Software Foundation): sending only the fields a client needs
- [Web Sustainability Guidelines](https://www.w3.org/TR/web-sustainability-guidelines/) (W3C): guideline 3.11 covers including only the data a task needs in API requests and responses

</div>
</details>

---

## (viii) Use edge computing

Edge computing means storing and processing data at the edge of a network.

This can put data much closer to the devices that produce it and the users who need it. Data travels less far, which reduces network load and energy use.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, processing data at the edge brings co-benefits in terms of:

- performance: less delay, because data is processed closer to users or devices

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- complexity: processing data at the edge adds infrastructure
- management: it needs careful management to keep data consistent, secure and in sync

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Asset management policy for edge devices](https://www.security.gov.uk/policy-and-guidance/government-cyber-security-policy-asset-management-policy-for-edge-devices/) (Government Security)
- [Why do we need edge computing for a sustainable future](https://objectbox.io/why-do-we-need-edge-computing-for-a-sustainable-future/) (ObjectBox)

</div>
</details>

---

## (ix) Match data consistency to real need

Data consistency means information stays the same, accurate and in sync across all databases, applications and systems.

Strong consistency means every user sees the latest data straight away. Eventual consistency means copies catch up after a short delay. Eventual consistency is often enough when a short delay in seeing the latest data does no harm. Keep strong consistency where out-of-date data could lead to a wrong decision, such as a payment.

Match the level of consistency to what users and systems need. Avoid synchronisation, duplication and real-time processing you do not need.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, matching consistency to real need brings co-benefits in terms of:

- cost: less replication and synchronisation lowers infrastructure costs
- service performance: relaxed consistency can make reads faster, especially across regions
- resilience: systems that accept short delays in syncing can often keep working when one part fails

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- data quality: users may briefly see out-of-date data, which matters for some decisions, such as payments
- complexity: applications must handle conflicts and stale reads, which adds design and testing work

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Data consistency versus data integrity](https://www.ibm.com/think/topics/data-consistency-vs-data-integrity/) (IBM)
- [Why you should pick strong consistency whenever possible](https://cloud.google.com/blog/products/databases/why-you-should-pick-strong-consistency-whenever-possible/) (Google Cloud)

</div>
</details>

---

## How to measure this

To measure the impact of data storage, read [measuring the impact of data](/digital-sustainability/measure/data).
