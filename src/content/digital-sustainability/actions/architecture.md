---
title: "5. Architecture"
caption: "Architecture"
description: "Architecture decisions set how much infrastructure, computing, storage and data transfer a service needs. That drives its energy, carbon and resource use throughout its life."
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
  - text: "5. Architecture"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
**Applies to:** services, platforms and infrastructure projects, on and off CDP, in the cloud or on premises.

In Defra, many services are moving to the [Core Delivery Platform (CDP)](/architecture-and-software-development/core-delivery-platform), which has build pipelines, hosting, logging and monitoring already in place. If your service is on CDP, the platform makes many architecture decisions for you. Work with your architect and the CDP team on the choices you still control, and read [architecture in Defra](/architecture).

Many government services are hosted in the public cloud, where a third-party provider delivers computing resources over the internet to many customers who share the same hardware. The government's [Cloud First policy](https://www.gov.uk/guidance/government-cloud-first-policy), introduced in 2013, requires public sector organisations to evaluate and use public cloud services as their first choice when they buy or design IT services. Read the [cloud guide for the public sector](https://www.gov.uk/government/publications/cloud-guide-for-the-public-sector/cloud-guide-for-the-public-sector) and [cloud technology and the public sector](https://www.gov.uk/government/collections/cloud-technology-and-the-public-sector).

The major cloud providers publish their own sustainability guidance: the [AWS Well-Architected sustainability pillar](https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sustainability-pillar.html) (Amazon Web Services), the [Well-Architected Framework sustainability pillar](https://docs.cloud.google.com/architecture/framework/sustainability/) (Google Cloud) and [sustainable workloads](https://learn.microsoft.com/en-us/azure/well-architected/sustainability/overview) (Microsoft Azure).

GreenOps is the practice of cutting the carbon emissions of cloud workloads by optimising resources, architecture and use. It is closely related to FinOps, financial operations, because lower emissions often mean lower costs. Read [how FinOps and GreenOps relate](https://greenly.earth/en-gb/blog/industries/finops-and-greenops-how-do-they-relate/) (Greenly) and join the [FinOps community](https://www.gov.uk/service-manual/communities/finops-community) (GOV.UK Service Manual).

The actions in this theme are:

- [5a. Design workloads for modularity, portability and flexibility](/digital-sustainability/actions/architecture/flexible-workloads): modular patterns, portable workloads and work that can wait
- [5b. Provision cloud services efficiently](/digital-sustainability/actions/architecture/cloud-provisioning): tagging, right-sizing, autoscaling, spot instances and removing unused assets
- [5c. Shift cloud demand to match low-carbon electricity](/digital-sustainability/actions/architecture/low-carbon-electricity): run work when and where electricity is cleaner
- [5d. Maximise efficiency for on-premises workloads](/digital-sustainability/actions/architecture/on-premises-workloads): for the services and systems that still run in your own data centres

To measure the impact of architecture decisions, read [measuring the impact of architectural decisions](/digital-sustainability/measure/architecture).
