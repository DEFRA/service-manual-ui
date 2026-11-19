---
title: "5a. Design workloads for modularity, portability and flexibility"
caption: "Architecture"
description: "Modular, portable, time-flexible workloads need less infrastructure. You can reuse parts and run work when capacity is spare or electricity cleaner."
layout: section
sectionNav: nav-ds-architecture
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
  - text: "Architecture"
    href: /digital-sustainability/actions/architecture
  - text: "5a. Design workloads for modularity, portability and flexibility"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
**Applies to:** services, platforms and infrastructure projects on and off the Core Delivery Platform (CDP). CDP runs services in containers, so on CDP much of the portability in point (ii) is already built in.

**Lead role families:** Architecture and IT operations

---

## (i) Design for modular architectural patterns

A traditional monolithic application is built, compiled and deployed as one self-contained unit. More modular patterns break it into self-contained, reusable parts:

- a modular monolith is still one application, but split into independent, loosely coupled modules, each depending little on the others
- a microservice architecture structures an application as a set of small, independent, loosely coupled services

Modular approaches can help sustainability because they:

- let you scale parts of a service independently, so you allocate compute more efficiently and use less energy
- make it easier to reuse components across projects, which saves the resources needed to develop and test them from scratch

For reusing software components, see [apply the principles of circularity to software](/digital-sustainability/actions/software/circular-software).

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, modular monoliths bring co-benefits in terms of:

- development time: developers work in a single codebase, so refactoring, testing and continuous integration are faster
- cost: they need less infrastructure, cloud overhead and maintenance than a distributed architecture

Microservice approaches bring co-benefits in terms of:

- cost: services scale independently and costs can be allocated to each one
- resilience: a failure in one service does not bring down the whole system

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs of modular monoliths may include:

- scaling: the whole application scales as one block, so you cannot scale single modules
- resilience: a server crash or exception in one module can bring down the whole application

Potential trade-offs of microservices may include:

- resource use: communication between services can increase energy use
- complexity: microservices add architectural and operational complexity, for example in deployment and monitoring

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

On modular monoliths:

- [What is monolithic architecture](https://www.ibm.com/think/topics/monolithic-architecture/) (IBM)
- [Microservices versus monolithic architecture](https://www.atlassian.com/microservices/microservices-architecture/microservices-vs-monolith/) (Atlassian)
- [Developing modular monolith versus traditional monolith in software engineering](https://dev.to/flashblack/developing-modular-monolith-vs-traditional-monolith-in-software-engineering-pros-and-cons-p61/) (DEV Community)
- [Modular monoliths explained](https://medium.com/@husain.ammar/modular-monoliths-explained-structure-strategy-and-scalability-ba94b103b345) (Ammar Husain)

On microservices:

- [Microservices](https://aws.amazon.com/microservices/) (Amazon Web Services)
- [Microservices architecture style](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices/) (Microsoft Azure)
- [What is microservices architecture](https://cloud.google.com/learn/what-is-microservices-architecture/) (Google Cloud)
- [Microservices architecture](https://www.atlassian.com/microservices/microservices-architecture/) (Atlassian)
- [What are microservices](https://www.ibm.com/think/topics/microservices/) (IBM)

</div>
</details>

---

## (ii) Design for portable workloads

Portable workloads are applications, data and services that can move between computing environments with little code refactoring or configuration change.

They must not rely on any single environment or underlying infrastructure. Then they can move between public and private cloud, on premises, or between providers.

Portability can help sustainability because you can:

- move workloads to places with more energy-efficient hardware, which uses less energy
- run workloads where the grid has more low-carbon electricity, as set out in [shift workload location](/digital-sustainability/actions/architecture/low-carbon-electricity)

CDP runs services in containers, so if you are on CDP you already have much of this. Approaches that help portability include:

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header">Approach</th><th scope="col" class="govuk-table__header">Description</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><td class="govuk-table__cell">Use containers</td><td class="govuk-table__cell">Containerised architecture packages software into self-contained units that can run in any environment</td></tr><tr class="govuk-table__row"><td class="govuk-table__cell">Automate container workflows</td><td class="govuk-table__cell">Platforms such as Kubernetes can automate the deployment, scaling and management of containerised workloads</td></tr><tr class="govuk-table__row"><td class="govuk-table__cell">Follow open standards</td><td class="govuk-table__cell">Applications that follow open industry standards, rather than proprietary, vendor-specific ones, are easier to move between environments</td></tr></tbody></table>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, portable workloads bring co-benefits in terms of:

- cost: more choice about where workloads run lets you optimise for cost and avoid being locked in to one supplier (vendor lock-in)
- resilience: workloads can be moved or scaled across environments
- performance: you can choose where a workload runs, such as the region, provider or type of infrastructure

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- complexity: portable workloads add architectural and operational complexity

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Hybrid and portable](https://www.ibm.com/think/architectures/well-architected/hybrid) (IBM Well-Architected Framework)
- [What is cloud portability](https://www.akamai.com/glossary/what-is-cloud-portability/) (Akamai)
- [Portability](https://microsoft.github.io/code-with-engineering-playbook/non-functional-requirements/portability/) (Microsoft)

</div>
</details>

---

## (iii) Design for time-flexible workloads

A time-flexible workload does not have to finish as soon as possible. You can move when it runs, rather than designing for real time.

Flexible workloads avoid relying on infrastructure sized for peak demand. They can run when there is spare capacity or when the grid is lower carbon, which can save cost as well as carbon.

To be time-flexible, a workload must not need to give a user an immediate response. Examples include batch jobs, data analytics, video encoding and rendering, and large-scale AI model training.

For when to run them, see [shift workloads in time](/digital-sustainability/actions/architecture/low-carbon-electricity). They can also use spare capacity at lower cost: see [use spot instances](/digital-sustainability/actions/architecture/cloud-provisioning).

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, flexible workloads can bring co-benefits in terms of:

- cost: matching resources to actual use keeps infrastructure costs down
- scaling: you can put more efficient scaling strategies in place

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- complexity: flexible workloads add architectural complexity, such as queues, event handling and retry logic

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Asynchronous request-reply pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/asynchronous-request-reply/) (Microsoft Azure)
- [Workload shifting techniques](https://dl.acm.org/doi/full/10.1145/3769301) (ACM Digital Library)

</div>
</details>

---

## How to measure this

To measure the impact of architecture decisions, read [measuring the impact of architectural decisions](/digital-sustainability/measure/architecture).
