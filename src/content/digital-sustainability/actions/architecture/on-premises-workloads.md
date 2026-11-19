---
title: "5d. Maximise efficiency for on-premises workloads"
caption: "Architecture"
description: "Maximising efficiencies in on-premises data centres involves consolidating and refreshing servers where appropriate, and increasing utilisation rates as far as possible."
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
  - text: "5d. Maximise efficiency for on-premises workloads"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
**Lead role families:** Architecture, IT Operations

**Likely co-benefits:** Cost, service performance, development time

---

### (i) Monitor, consolidate and refresh server hardware when appropriate

Powering down, sleeping or retiring servers that are running with low-levels of utilisation or energy efficiency can save on overall energy consumption.

Approaches can include:

- Identifying low-utilisation and zombie servers: Track inventory, monitor hardware power, and orchestrate analytics to identify servers that are consistently running at low rates of utilisation or are ‘zombies’ (doing no productive work)
- Powering down or retiring low-utilisation and zombie servers: Sleep and shut down underutilised, abandoned, or single-purpose legacy servers
- Refreshing server hardware where appropriate: Replace older servers, storage arrays, and network switches with more energy-efficient hardware, when this is the more sustainable option

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [What is server monitoring?,](https://www.ibm.com/think/topics/server-monitoring/) IBM

</div>
</details>

See also [8b. ake the most sustainable approaches to renting or buying hardware](/digital-sustainability/actions/hardware/renting-or-buying) and [8c. Choose the most sustainable options at the end of life](/digital-sustainability/actions/hardware/end-of-life)

---

## (ii) Maximise server utilisation

Increasing server utilisation rates improves the efficiency of an on-premises data centre and reduces overall energy consumption.

Approaches that can maximise server utilisation include:

- Virtualising workloads: Run workloads inside virtual machines (VMs) to enable multiple applications to run on an individual server, reducing the total number of physical machines required
- Consolidating workloads: Combine multiple applications, databases, or virtual machines that previously ran on separate physical servers onto a smaller number of higher capacity servers
- Dynamic workload balancing: Move workloads across servers in real-time based on demand, including scheduling batch workloads for times of low demand

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about implementing this point</span></summary>
<div class="govuk-details__text">

- [What is virtualisation?,](https://www.ibm.com/think/topics/virtualization/) IBM
- [What is a virtual machine?,](https://cloud.google.com/learn/what-is-a-virtual-machine/) Google Cloud
- [Dynamic load balancing,](https://www.sciencedirect.com/topics/computer-science/dynamic-load-balancing/) Science Direct

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits and trade-offs</span></summary>
<div class="govuk-details__text">

### Co-benefits

Alongside sustainability benefits, maximising server utilisation brings co-benefits in terms of:

- Cost: Lowering costs associated with operating servers and the need to purchase new hardware
- Agility: Virtualised and containerised workloads allow teams to spin up, clone, or scale workloads quickly

</div>
</details>

---
