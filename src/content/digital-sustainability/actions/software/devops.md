---
title: "3d. Factor sustainability into DevOps practices"
caption: "Software"
description: "DevOps brings development and IT operations together to build, release and run software. Build on DevOps good practice to cut unnecessary computing, storage and data transfer."
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
**Applies to:** teams that build and run software on and off the Core Delivery Platform (CDP), and IT operations teams. On CDP, build pipelines, hosting, logging and monitoring are already in place, so ask the CDP team which settings you control.

**Lead role families:** Software and IT operations

---

## (i) Optimise your logging and retention policy

Check that your logging and retention policies fit what your service needs. Automate deleting and archiving logs you no longer use or need.

Removing unused logs cuts data storage and energy use. Keep the logs you need for security and incident response, and agree retention periods with your security team. For retaining other data, see [implement a data retention policy](/digital-sustainability/actions/data/lean-data).

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, optimising logging and retention brings co-benefits in terms of:

- cost: storing less can lower infrastructure costs
- efficiency and observability: fewer logs to index, query and analyse means less processing. Focusing on useful logs also makes it easier to see what is happening inside your systems

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Trade-offs may include:

- future use: retention that is too aggressive can lose useful diagnostic or audit information
- upfront effort: retention policies need careful design to meet compliance, security and incident response needs

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Introduction to logging for security purposes](https://www.ncsc.gov.uk/guidance/introduction-logging-security-purposes) (National Cyber Security Centre): building a logging capability, including how long to keep logs
- [Set storage retention policies](https://patterns.greensoftware.foundation/operations/resource-lifecycle/set-retention-policy-on-storage-resources) (Green Software Foundation): automating deletion of data once it is no longer needed
- [SUS04-BP03 Use policies to manage the lifecycle of your datasets](https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_data_a4.html) (Amazon Web Services): automating archiving and deletion, including log retention settings

</div>
</details>

---

## (ii) Batch routine updates to libraries and dependencies

Batch routine updates. Apply security updates when they are released.

Libraries and dependencies are code from elsewhere that your software relies on. For routine updates that do not fix a security issue, update in batches rather than daily or continually. You run fewer build, test and deployment cycles, which lowers compute use and energy.

Security updates are always necessary. Never hold one back to save energy. Follow the [Defra software development standards](https://defra.github.io/software-development-standards/) and Defra's guidance on [creating a secure service](/security).

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Batching routine updates brings co-benefits in terms of:

- stability: less churn from frequent dependency changes
- control: upgrades can be planned around risk and value

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Trade-offs may include:

- complexity: larger, less frequent updates can bring more change risk and complexity

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Managing software dependencies](https://www.gov.uk/service-manual/technology/managing-software-dependencies) (GOV.UK Service Manual): says you must keep dependencies up to date, as new versions often fix security issues
- [Vulnerability management guidance](https://www.ncsc.gov.uk/guidance/vulnerability-management) (National Cyber Security Centre): applying updates within best-practice timescales, and what to do when no fix exists

</div>
</details>

---

## (iii) Continue to optimise and refactor new code

Keep optimising and refactoring code as it changes. For how, see [optimise code](/digital-sustainability/actions/software/energy-efficient-software).

---

## (iv) Schedule routine operations for lower-carbon times

Run routine operations that can wait when electricity is lower carbon. These include batch jobs, background processing and continuous integration and continuous delivery (CI/CD) workloads, the automated building, testing and release of code. Never delay security patches or incident fixes to do this. For how, see [shift workloads in time](/digital-sustainability/actions/architecture/low-carbon-electricity).

---

## How to measure this

To measure the impact of software, read [measuring the impact of software](/digital-sustainability/measure/software).
