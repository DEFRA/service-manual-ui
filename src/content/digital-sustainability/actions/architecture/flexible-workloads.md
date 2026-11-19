---
title: "5a. Design workloads for modularity, portability and flexibility"
caption: "Architecture"
description: "Designing workloads for modularity, portability and flexibility helps enable the development and operation of more sustainable digital services, by avoiding over-provisioning infrastructure, supporting reuse and sharing of architectural components and running workloads when there is unused capacity or the electricity grid is greener."
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
  - text: "5a. Design workloads for modularity, portability and flexibility"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
**Lead role families:** Architecture, IT Operations

**Likely co-benefits:** Cost

---

## (i) Design for 'modular' architectural patterns

Traditional monolithic architecture is where an application is built, compiled, and deployed as a single, self-contained unit.

More modular patterns, such as modular monoliths and microservice architectures, break traditional monolithic systems down into self-contained and reusable components.

Modular approaches can bring sustainability benefits through:

- Enabling the independent scaling of services, more efficient allocation of compute resources and reduced energy consumption
- Aiding the reuse of modular components across projects, which saves on the resources associated with developing and testing components from scratch.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

### Modular Monoliths

A modular monolithic architecture breaks a single, unified application into independent, loosely coupled logical modules.

- [What is monolithic architecture?](https://www.ibm.com/think/topics/monolithic-architecture/) IBM
- [Microservices vs. monolithic architecture](https://www.atlassian.com/microservices/microservices-architecture/microservices-vs-monolith/) Atlassian
- [Developing modular monolith vs. traditional monolith in software engineering, pros and cons](https://dev.to/flashblack/developing-modular-monolith-vs-traditional-monolith-in-software-engineering-pros-and-cons-p61/) DEV.TO
- [Modular monoliths explained: Structure, strategy, and scalability](https://medium.com/@husain.ammar/modular-monoliths-explained-structure-strategy-and-scalability-ba94b103b345) Ammar Husain

### Microservices

A microservice architecture structures an application as a collection of small, autonomous, and loosely coupled services, rather than a single unified codebase.

- [Microservices](https://aws.amazon.com/microservices/) Amazon Web Services
- [Microservices architecture style](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices/) Microsoft Azure
- [What is microservices architecture?](https://cloud.google.com/learn/what-is-microservices-architecture/) Google Cloud
- [Microservices architecture](https://www.atlassian.com/microservices/microservices-architecture/) Atlassian
- [What are microservices?](https://www.ibm.com/think/topics/microservices/) IBM

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits of modular monoliths

Alongside sustainability impact, modular monoliths bring co-benefits in terms of:

- Development Time: Developers work within a single codebase, making refactoring, testing and continuous integration faster
- Cost: Reduced costs as less infrastructure, cloud resource overhead, and maintenance required compared to distributed architecture

### Trade-offs of modular monoliths

Potential trade-offs of modular monoliths may include:

- Scalability: With a modular monolith, the entire application scales as one block, limiting the scalbility of individual modules
- Resilience: A sever crash or exception in one module can bring down the entire application process

### Co-benefits of microservices

Alongside sustainability impact, microservice approaches bring co-benefits in terms of:

- Cost: Microservice architectures support independent scaling of services and efficient cost allocation
- Resilience: Improved resilience and fault isolation as failure in one service does not impact the whole system

### Trade-offs of microservices

Potential trade-offs of microservices may include:

- Resource usage: Communication between microservices can lead to increased energy consumption due to communication between services
- Complexity: Microservice approaches can increase architectural and operational complexity through deployment and monitoring

</div>
</details>

See also [3a. Apply the principles of circularity to software](/digital-sustainability/actions/software/circular-software) and [5b. (vi) Move from rented infrastructure to platform and serverless models where appropriate](/digital-sustainability/actions/architecture/cloud-provisioning)

---

## (ii) Design for portable workloads

Portable workloads are those where applications, data, and services can be moved between computing environments with minimal code refactoring or configuration changes.

This requires that workloads not be reliant on any single environment or underlying infrastructure, and then 'porting' can occur between public and private cloud, on-premises or even between different providers.

This approach can bring sustainability benefit by:

- Enabling workloads to be shifted to locations where more energy-efficient hardware is available, so reducing energy consumption
- Running workloads in locations where more low carbon electricity is available on the grid

Approaches that can help enable portability include:

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th class="govuk-table__header">Approach</th><th class="govuk-table__header">Description</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><td class="govuk-table__cell">Use of containers</td><td class="govuk-table__cell">Containarised architecture means packaging software into self-contained units that can then run in any environment</td></tr><tr class="govuk-table__row"><td class="govuk-table__cell">Automated container workflows</td><td class="govuk-table__cell">Platforms such as Kubernetes can be used to automate the deployment, scaling, and management of containerized workloads</td></tr><tr class="govuk-table__row"><td class="govuk-table__cell">Following open standards</td><td class="govuk-table__cell">Applications that are designed to follow open industry standards, rather than proprietary, vendor-specific standards, can more easily be ported between environments</td></tr></tbody></table>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [Hybrid and portable](https://www.ibm.com/think/architectures/well-architected/hybrid) IBM Well-architected framework
- [What is cloud portability?](https://www.akamai.com/glossary/what-is-cloud-portability/) Akamai
- [Portability](https://microsoft.github.io/code-with-engineering-playbook/non-functional-requirements/portability/) Microsoft

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, portable workloads bring co-benefits in terms of:

- Cost: Increased flexibility in terms of workload placement allows optimising for cost, avoiding vendor lock-in
- Resilience: Improved resilience by allowing workloads to be relocated or scaled across environments
- Performance: Supports workload placement optimisation (e.g. region, provider, infrastructure type)

### Trade-offs

Potential trade-offs may include:

- Complexity: Portable workloads introduce additional architectural and operational complexity

</div>
</details>

See also [5c. Shift cloud demand to match availability of low carbon electricity](/digital-sustainability/actions/architecture/low-carbon-electricity)

---

### (iii) Design for time-flexible workloads

Designing workloads for flexibility means moving away from 'real-time' models that aim to complete tasks as soon as possible, to those where computational demand can be dynamically shifted in time.

Flexible workload patterns can help maximise efficiency by avoiding reliance on peak-capacity infrastructure, and allow workloads to be scheduled when there is unused capacity or the electricity grid is at a lower carbon intensity.

These approaches can save significantly on costs as well as carbon.

To be time-flexible, workloads must not require that an immediate response be provided to a end user. These include things like batch jobs, data analytics, video encoding and rendering or large-scale AI model training.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [Asynchronous Request-Reply pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/asynchronous-request-reply/) Microsoft Azure
- [Workload shifting techniques: From digital inebriation to sobriety](https://dl.acm.org/doi/full/10.1145/3769301/) ACM Digital Library

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability impact, flexible workloads can bring co-benefits in terms of:

- Cost: Aligning resources with actual usage optimises infrastructure costs
- Scaling: Enables more efficient scaling strategies to be put in place

### Trade-offs

Potential trade-offs may include:

- Complexity: Flexible workloads introduce architectural complexity (e.g. queues, event handling, retry logic)

</div>
</details>

See also [5c. Shift cloud demand to match availability of low carbon electricity](/digital-sustainability/actions/architecture/low-carbon-electricity) and [5b, (iv) Use spot instances](/digital-sustainability/actions/architecture/cloud-provisioning)
