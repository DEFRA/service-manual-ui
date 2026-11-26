---
title: "5d. Maximise efficiency for on-premises workloads"
caption: "Architecture"
description: "If you run workloads in your own data centres, consolidate and refresh servers where it makes sense. Keep the servers you have as busy as possible."
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
  - text: "5d. Maximise efficiency for on-premises workloads"
---
<div class="app-applies-to">

**This action applies to:** services, systems and infrastructure that run in on-premises data centres. Most Defra services run in the cloud, so this is mainly for infrastructure and IT operations teams looking after the systems that remain.

**Lead role families:** Architecture and IT operations

</div>

---

## (i) Monitor, consolidate and refresh server hardware

Utilisation is how much of a server's capacity is in use. Powering down, sleeping or retiring servers with low utilisation or low energy efficiency saves energy overall.

Approaches include:

- finding low-utilisation and zombie servers: track your inventory and monitor hardware power. Use analytics to find servers that consistently run at low utilisation, or "zombies" that do no useful work
- powering down or retiring them: sleep or shut down underused, abandoned or single-purpose legacy servers
- refreshing server hardware where it makes sense: replace older servers, storage arrays and network switches with more energy-efficient hardware. Do this only when it is the more sustainable option

For buying hardware, see [take the most sustainable approaches to renting or buying hardware](/digital-sustainability/actions/hardware/renting-or-buying) (8b). For disposing of it, see [choose the most sustainable options for hardware at end of life](/digital-sustainability/actions/hardware/end-of-life) (8c).

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [What is server monitoring](https://www.ibm.com/think/topics/server-monitoring/) (IBM)

</div>
</details>

---

## (ii) Maximise server utilisation

Busier servers make an on-premises data centre more efficient and use less energy overall.

Ways to increase server utilisation include:

- virtualising workloads: run workloads in virtual machines (VMs), software that acts like a separate computer. Several applications can then share one server, so you need fewer physical machines
- consolidating workloads: move applications, databases or virtual machines that ran on separate physical servers onto fewer, higher-capacity servers
- balancing workloads dynamically: move workloads between servers as demand changes

To run batch work when electricity is cleaner, see [shift workloads in time](/digital-sustainability/actions/architecture/low-carbon-electricity) (5c).

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, maximising server utilisation brings co-benefits in terms of:

- cost: lower running costs for servers, and less need to buy new hardware
- agility: teams can start, copy or scale virtualised and containerised workloads quickly

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [What is virtualisation](https://www.ibm.com/think/topics/virtualization/) (IBM)
- [What is a virtual machine](https://cloud.google.com/learn/what-is-a-virtual-machine/) (Google Cloud)
- [Dynamic load balancing](https://www.sciencedirect.com/topics/computer-science/dynamic-load-balancing/) (ScienceDirect)

</div>
</details>

---

## How to measure this

To measure the impact of on-premises workloads, read [measuring the impact of architectural decisions](/digital-sustainability/measure/architecture).
