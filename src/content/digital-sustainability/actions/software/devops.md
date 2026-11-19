---
title: "3d. Factor sustainability into DevOps practices"
caption: "Software"
description: "Build on established DevOps best practices to reduce unnecessary computing, storage and data transfer throughout software development and operation."
layout: section
sectionNav: nav-ds-software
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
  - text: "Software"
    href: /digital-sustainability/actions/software
  - text: "3d. Factor sustainability into DevOps practices"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
**Lead role families:** Software, IT Operations

**Likely co-benefits:** Cost

---

## (i) Optimise your logging and retention policy

Check logging and retention policies are appropriate, and automate the deletion and archiving of usused and unneeded logs.

Removing unused logs reduces data storage and lowers energy consumption.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability benefits, optimising logging and retention brings co-benefits in terms of:

- Cost: Reducing storage volumes can lower infrastructure costs
- Efficiency and observability: Having fewer logs to index, query, and analyse decreases data processing overhead, and improves system efficiency and observability by focusing on meaningful, high-value logs

### Trade-offs

Trade-offs may include:

- Balancing sustainability with potential future data use: Risk of losing valuable diagnostic or audit information if retention policies are too aggressive
- Upfront effort: Careful design of retention policies is required to ensure compliance, security, and incident response needs are met

</div>
</details>

---

## (ii) Update libraries and dependencies only when necessary

Consider how often libraries and dependencies are updated, and avoid daily or continual updates if they are not needed.

Removing unnecessary build, testing, and deployment cycles lowers compute usage and energy consumption.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Reducing library and dependency updates brings co-benefits in terms of:

- Stability: Improved stability by avoiding excessive churn from frequent dependency changes
- Control: Enabling more controlled, planned upgrades aligned to risk and value

### Trade-offs

Trade-offs may include:

- Balancing priorities: A balance between efficiency, security patching, and maintainability needs to be found for updates. Infrequent updates may increase exposure to security vulnerabilities
- Complexity: Larger, less frequent updates can introduce higher change risk and complexity

</div>
</details>

---

## (iii) Continue to optimise and refactor new code

Refactoring is the process of restructuring code, without affecting its original functionality.

Refactoring improves code efficiency over time and so reduces CPU, memory, and processing requirements.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, optimising and refactoring new code brings co-benefits in terms of:

- Performance: Enables continuous performance improvements without changing functionality
- Maintainability: Reduced technical debt, leading to simpler, more maintainable systems and avoiding inefficient legacy patterns accumulating

### Trade-offs

Trade-offs may include:

- Delivery time: Ongoing engineering effort and prioritisation is required alongside feature delivery
- Complexity: Poorly managed refactoring can introduce defects or regressions

</div>
</details>

---

## (iv) Schedule carbon-aware updates and other operational practices

Carbon-aware operations are those that run when the electricity mix is made up of a higher proportion of renewable and low-carbon sources.

These can include software updates, as well as broader operational practices, such as batch jobs, background processing, and CI/CD (Continuous Integration and Continuous Delivery) workloads.

Rather than patching immediately, where possible schedule carbon-aware updates and other operations to take advantage of low carbon electricity.

See also: [5c. Shift cloud demand to match availability of low carbon electricity](/digital-sustainability/actions/architecture/low-carbon-electricity)

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, scheduling carbon-aware updates brings co-benefits in terms of:

- Costs: Off-peak or flexible scheduling aligns with lower pricing models.

### Trade-offs

Potential trade-offs may include:

- Speed: Carbon-aware updates may delay updates or operations, impacting timelines and responsiveness
- Security: Critical updates (e.g. security patches, incident fixes) which must be applied immediately
- Tooling: Additional tooling and scheduling capability may be reqired to integrate carbon intensity data into pipelines

</div>
</details>

---
