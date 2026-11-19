---
title: "1b. Include sustainability in business cases, requirements and planning"
caption: "Research and planning"
description: "Put sustainability into the business case, requirements and plan early, so impact, whole-life cost and risk shape decisions before you are locked in."
layout: section
sectionNav: nav-ds-research-and-planning
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
  - text: "Research and planning"
    href: /digital-sustainability/actions/research-and-planning
  - text: "1b. Include sustainability in business cases, requirements and planning"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
**Applies to:** any project that needs a business case, a plan or a set of requirements. This includes services on and off the Core Delivery Platform (CDP), internal tools, infrastructure projects and procurement.

**Lead role families:** Product and delivery

---

## (i) Include sustainability in business cases

Your business case must set out each option's environmental effects, good and bad. Then apply the 5 environmental principles to the proposal.

The Environmental Principles Policy Statement (EPPS) legally requires ministers and policymakers to give "due regard" to 5 environmental principles when they develop policy. HM Treasury's Green Book builds these duties into the Five Case Model for business cases.

Setting out the environmental risks and benefits in the business case builds environmental objectives into the project from the start.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, including sustainability in business cases brings co-benefits in terms of:

- compliance: shows due regard to the Environmental Principles Policy Statement, as the Green Book expects
- cost: whole-life costing counts costs over the full life of an option. It can show savings from options that use less energy, hardware or travel
- resilience: naming environmental risks early lets approvers weigh them against other options

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- upfront effort: estimating the environmental effects of each option takes time and some specialist input
- uncertainty: early estimates are rough, so they may carry more weight in decisions than they deserve

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [The Green Book](https://www.gov.uk/government/publications/the-green-book--2) (HM Treasury and Government Finance Function)
- [Environmental Principles Policy Statement](https://www.gov.uk/government/publications/environmental-principles-policy-statement/environmental-principles-policy-statement) (Department for Environment, Food and Rural Affairs)

</div>
</details>

---

## (ii) Include environmental sustainability in project planning

A project plan sets out how a service or other project will be researched, designed, built, launched and maintained.

Plan for environmental factors alongside your other priorities. This means thinking about:

- co-benefits between priorities, for example a lighter service that is faster, more accessible and more inclusive, and also uses less energy
- trade-offs between sustainability and other factors, for example when cost or the need to link to legacy systems rules out the lowest-carbon option
- the environmental risks of keeping parts of an existing service or process running alongside the new one

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, including sustainability in project planning brings co-benefits in terms of:

- delivery time: planning for sustainability from the start avoids costly changes later in delivery
- accessibility: lighter services planned from the start tend to work better on older devices and slow connections
- cost: planning when to switch off old systems avoids paying to run two services side by side

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- competing priorities: sustainability work may compete with new features for time in each sprint
- legacy constraints: plans may need to accept a higher footprint where links to legacy systems cannot be avoided

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [The Teal Book](https://projectdelivery.gov.uk/teal-book/home/) (Government Project Delivery): guidance for directing and managing portfolios, programmes and projects in government
- [Planning in agile](https://www.gov.uk/service-manual/agile-delivery/planning-agile) (GOV.UK Service Manual)
- [Developing a roadmap](https://www.gov.uk/service-manual/agile-delivery/developing-a-roadmap) (GOV.UK Service Manual)

</div>
</details>

---

## (iii) Include sustainability in non-functional requirements

Non-functional requirements (NFRs) set out a software system's capabilities and constraints, such as speed, security and reliability. They describe how a system behaves rather than what it does, and guide design and development choices as the project goes on.

Include sustainability in your NFRs. For example, you could:

- cap the cloud carbon footprint for each user transaction
- set a minimum life for hardware
- schedule some kinds of work to run when electricity is cleaner (see [shift workloads in time](/digital-sustainability/actions/architecture/low-carbon-electricity))

Defra's guidance on [non-functional requirements](/business-analysis/non-functional-requirements) explains how to write and manage them.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, including sustainability in non-functional requirements brings co-benefits in terms of:

- service performance: limits on compute, data or page weight often make a service faster and more reliable too
- cost: caps on resource use for each transaction help control hosting costs
- accessibility: requirements to support older devices widen the range of people who can use the service

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- measurement: some requirements, such as carbon for each transaction, are hard to measure accurately with current tools
- conflict: sustainability requirements may clash with others, such as availability or recovery time, and need a recorded decision

</div>
</details>

---

## (iv) Include climate risks in continuity plans

Business continuity teams design, test and run plans that keep an organisation's core operations going during disruption. Disruption might come from power cuts, cyber attacks or extreme weather such as drought.

Work with your business continuity team to put proportionate plans in place to cope with, and adapt to, climate risks.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Co-benefits</span></summary>
<div class="govuk-details__text">

Alongside sustainability impact, including climate risks in business continuity planning brings co-benefits in terms of:

- resilience: plans that cover heat, flooding and drought protect services against a wider range of disruption
- service performance: users are less likely to lose access to the service during extreme weather

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Trade-offs</span></summary>
<div class="govuk-details__text">

Potential trade-offs may include:

- resource use: some mitigations, such as running a copy in a second region, add cost and environmental impact
- upfront effort: assessing climate risk needs input from continuity, estates and supplier teams

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading</span></summary>
<div class="govuk-details__text">

- [Business continuity practitioner](https://www.security.gov.uk/government-security-profession-career-framework/resilience/business-continuity-practitioner/) (Government Security)
- [Business continuity guide launched](https://www.gov.uk/government/news/business-continuity-guide-launched) (Cabinet Office)

</div>
</details>
