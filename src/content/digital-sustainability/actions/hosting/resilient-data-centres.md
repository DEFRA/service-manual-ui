---
title: "7d. Choose data centres with resilient infrastructure"
caption: "Hosting"
description: "Resilient data centres help services withstand climate-related and other disruptions, and avoid the environmental impacts of outages, recovery, replacement and rebuilding."
layout: section
sectionNav: nav-ds-hosting
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
  - text: "Hosting"
    href: /digital-sustainability/actions/hosting
  - text: "7d. Choose data centres with resilient infrastructure"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
**Applies to:** infrastructure projects, commercial teams buying hosting, and services hosted outside the Core Delivery Platform (CDP). A team on CDP should agree its resilience needs with the CDP team, based on its service tier.

**Lead role families:** Procurement, Product and delivery, and Architecture

---

## (i) Choose providers that build resilience into site selection

In September 2024 the UK government designated data infrastructure as Critical National Infrastructure (CNI). This covers data centres and cloud operators. It puts them on the same footing as energy, water and the emergency services.

Building resilience into site selection means choosing locations with less exposure to environmental and logistical risks. The site should also have good access to the resources a data centre needs.

Ask providers:

- what climate risks, such as flooding, high temperatures, water scarcity or wildfires, have you mapped at each site?
- how reliable is each site's power connection, and does it have access to renewable energy?
- how do you spread critical services across separate zones, so one climate event cannot stop a whole region?

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, building resilience into site selection brings co-benefits in terms of:

- resilience: sites with low exposure to flooding and heat are less likely to suffer outages
- service performance: fewer outages mean users can reach the service when they need it
- cost: avoiding high-risk sites reduces recovery and repair costs

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- resource use: geographic redundancy runs duplicate infrastructure, which adds energy and hardware use
- data residency: spreading services across regions can conflict with keeping data in the UK

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Data centres: planning policy, sustainability, and resilience](https://commonslibrary.parliament.uk/research-briefings/cbp-10315/) (House of Commons Library)
- [Climate resilience: a critical pillar of data centre strategy](https://www.the-esg-institute.org/blog/climate-resilience-a-critical-pillar-of-data-centre-strategy-the-esg-institute/) (The ESG Institute)

</div>
</details>

---

## (ii) Choose providers with proportionate systems for resilience

Backups, redundancy and other resilience measures use resources and have environmental impacts of their own. Match them to what your service needs. Your service tier sets the [non-functional requirements](/business-analysis/non-functional-requirements) your service must meet as a minimum.

A resilient data centre has physical and technical systems built to withstand disruption. It keeps running and recovers quickly from failures. Measures can include:

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th class="govuk-table__header">Measure</th><th class="govuk-table__header">Description</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><td class="govuk-table__cell">On-site generation and storage</td><td class="govuk-table__cell">Backup generators, uninterruptible power supplies (UPS), and renewable energy or battery storage on the same site. These keep critical servers and services online if the power fails.</td></tr><tr class="govuk-table__row"><td class="govuk-table__cell">Heatwave-adapted systems</td><td class="govuk-table__cell">Cooling that can handle long heatwaves, such as liquid cooling, closed-loop systems or higher-capacity chillers. Analytics that adjust workloads during sudden temperature spikes to avoid overheating.</td></tr><tr class="govuk-table__row"><td class="govuk-table__cell">Water-scarcity redundancy</td><td class="govuk-table__cell">In water-stressed regions, moving away from water-intensive evaporative cooling, or installing on-site water recycling and storage</td></tr><tr class="govuk-table__row"><td class="govuk-table__cell">Physical and structural engineering</td><td class="govuk-table__cell">Structures built to withstand storm winds, with physical infrastructure raised above predicted flood levels</td></tr></tbody></table>

Choose hosting providers whose resilience measures are proportionate. They stay resilient without wasting energy.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, proportionate resilience systems bring co-benefits in terms of:

- cost: sizing backup systems to real need avoids paying for idle capacity
- resilience: well-matched backup power and cooling keep services running through heatwaves and power cuts

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- risk: cutting redundancy too far raises the chance of an outage, so agree the level with service owners
- emissions: backup generators often run on diesel, so ask about cleaner fuels and testing schedules

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Data centres: planning policy, sustainability, and resilience](https://commonslibrary.parliament.uk/research-briefings/cbp-10315/) (House of Commons Library)

</div>
</details>

---

## (iii) Choose providers with operational plans for resilience

Operational plans for resilience can cover:

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th class="govuk-table__header">Plan</th><th class="govuk-table__header">Description</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><td class="govuk-table__cell">Early warning of climate events</td><td class="govuk-table__cell">Real-time weather tracking and natural catastrophe monitoring built into site management</td></tr><tr class="govuk-table__row"><td class="govuk-table__cell">Emergency response</td><td class="govuk-table__cell">Clear procedures for staff safety, site access during floods or wildfires, and emergency fuel and water resupply contracts</td></tr><tr class="govuk-table__row"><td class="govuk-table__cell">Upstream dependencies</td><td class="govuk-table__cell">Backup routes for fibre-optic cables, transport and cloud dependencies, so a local physical impact does not cut wider network operations</td></tr></tbody></table>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, choosing providers with operational resilience plans brings co-benefits in terms of:

- resilience: tested plans shorten recovery time after floods, heatwaves or power cuts
- service performance: faster recovery keeps the service available when users need it
- security: clear emergency procedures help keep sites and data secure when normal controls are disrupted

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- effort: plans need regular testing and updating, which takes staff time
- what to watch: services on CDP rely on the platform's and its provider's plans, so check what those cover

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Plan for disaster recovery](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/plan-for-disaster-recovery-dr.html) (AWS Well-Architected Framework): setting recovery objectives and testing recovery plans
- [The UK Government Resilience Framework](https://www.gov.uk/government/publications/the-uk-government-resilience-framework) (Cabinet Office): the government's approach to preparing for and recovering from disruption
- [Operate a reliable service](https://www.gov.uk/service-manual/service-standard/point-14-operate-a-reliable-service) (GOV.UK Service Manual): point 14 of the Service Standard, on keeping a service available and recovering from failure
- [Cyber Assessment Framework](https://www.ncsc.gov.uk/collection/cyber-assessment-framework) (National Cyber Security Centre): a framework for assessing the resilience of essential services

</div>
</details>

---

## How to measure this

[Measuring the impact of hosting](/digital-sustainability/measure/hosting) explains what to ask providers to report on resilience.
