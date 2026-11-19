---
title: "7. Hosting"
caption: "Hosting"
description: "Hosting decides what infrastructure runs a service, how well that infrastructure is used, where its electricity comes from, and how much cooling, water and hardware it needs."
layout: section
sectionNav: nav-ds-hosting
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
  - text: "7. Hosting"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
**Applies to:** anyone who chooses or runs hosting, including infrastructure projects, commercial teams buying hosting, and services on and off the Core Delivery Platform (CDP).

Most Defra services run on the [Core Delivery Platform](/architecture-and-software-development/core-delivery-platform), which hosts them on Amazon Web Services (AWS) in a UK region. CDP and Defra Commercial choose the provider, so a team on CDP does not choose a data centre. Infrastructure projects and services hosted outside CDP do choose, and actions 7a to 7d are for them.

---

## If your service runs on CDP

The platform has made the hosting choice for you. You still control how your service uses it:

- right-size your cloud resources, as set out in [5b. Provision cloud services efficiently](/digital-sustainability/actions/architecture/cloud-provisioning)
- scale down non-production environments when no one is using them
- ask the CDP team what carbon and energy figures it can give for your service
- agree your resilience needs with the CDP team, based on your service tier in [non-functional requirements](/business-analysis/non-functional-requirements)

## If you choose a hosting provider

Use these actions when you choose a provider, write hosting requirements or review a hosting contract:

- [7a. Choose data centres in more sustainable locations](/digital-sustainability/actions/hosting/data-centre-location): sites with low-carbon electricity and enough water
- [7b. Choose data centres that are energy, heat and water-efficient](/digital-sustainability/actions/hosting/efficient-data-centres): compare PUE and WUE, and look for heat reuse
- [7c. Choose data centres that can manage sustainability at the service level](/digital-sustainability/actions/hosting/service-level-reporting): providers that report figures for your service
- [7d. Choose data centres with resilient infrastructure](/digital-sustainability/actions/hosting/resilient-data-centres): resilience that matches your need without waste

To find out which figures to ask providers for, see [measuring the impact of hosting](/digital-sustainability/measure/hosting).

## Types of data centre

There are three broad types of data centre:

- on-premises: infrastructure owned or controlled by an organisation and hosted on its own premises, which gives more direct control over hardware, energy use, cooling and operations
- off-premises: infrastructure hosted in an external facility, such as a colocation data centre, where a third party provides space, power and cooling, and the organisation may keep control of its hardware
- cloud: computing, storage and other infrastructure provided on demand by cloud providers, with physical infrastructure shared between customers and resources that scale with demand
