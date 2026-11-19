---
title: "Sustainability questions for alpha and beta"
caption: "Meet the sustainability standard"
layout: section
sectionNav: nav-ds-standard
customNav: nav-digital-sustainability
headerServiceName: Sustainability
headerServiceUrl: /digital-sustainability
breadcrumbItems:
  - text: "Digital Defra"
    href: /
  - text: "Sustainability"
    href: /digital-sustainability
  - text: "Meet the sustainability standard"
    href: /digital-sustainability/service-standard
  - text: "Sustainability questions for alpha and beta"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
The [Defra digital sustainability strategy 2025 to 2030](https://www.gov.uk/government/publications/defra-digital-sustainability-strategy-2025-to-2030/defra-digital-sustainability-strategy-2025-to-2030) (GOV.UK) sets out 6 sustainability objectives. The 15th Service Standard point asks services to take action and track performance against them.

Your team records this in the digital sustainability statement. For each of the 6 objectives, record the actions you have taken or plan to take. Record how you track sustainability performance too.

This page lists the questions to think about at alpha and beta, for each objective.

For more help:

- the [digital sustainability actions](/digital-sustainability/actions) give detailed advice on the actions a project can take, across 9 themes
- [measure sustainability](/digital-sustainability/measure) explains how to start quantifying energy use and carbon for a whole service

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">A pragmatic approach to tracking sustainability performance and taking action</span></summary>
<div class="govuk-details__text">

Defra wants each project and service to track sustainability performance for all 6 objectives in the strategy.

Measuring some objectives is fairly simple. For others, it can still be very hard. This page sets out what Defra expects you to track for each objective.

You can take many useful sustainability actions without measuring and tracking your service's performance. For example:

- reducing data capture and storage
- turning off environments when not in use
- re-using components rather than developing them from scratch
- treating any hardware in as circular a way as possible, so it is kept in use for longer

</div>
</details>

## Objective 1: Reduce and mitigate carbon emissions towards net zero targets

### What this objective is about

Digital technology creates carbon emissions from the electricity it uses when it runs.

It also has embodied carbon. This is the carbon from mining, processing, manufacturing, distributing and disposing of the hardware services use. It also comes from the work of designing and developing digital services.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Questions to ask at alpha</span></summary>
<div class="govuk-details__text">

**Procurement of hosting**

- Will the service need new cloud hosting or data centre capacity?
- If so, are you factoring sustainability into where the infrastructure is located? Look at how much renewable energy is available and used on site, and at water stress (how short of water the region is).
- Are you choosing suppliers that monitor sustainability metrics and score well on them? Will they commit to manage and report on those metrics for your service?

**Working with delivery suppliers**

- Will the project work with suppliers to design and develop the service?
- If so, have suppliers made commitments to environmental sustainability in delivery?

**Planning for sustainable delivery from private beta**

- Does the team know the best practice for private beta, and plan to follow it? This covers delivering efficient, appropriately provisioned and carbon-aware services. It applies to software, AI, architecture, UX and journey design, and data management. Carbon-aware services respond to changes in the carbon intensity of the electricity grid.

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Questions to ask at beta</span></summary>
<div class="govuk-details__text">

**Software**

- How are you making your software as energy efficient as possible?
- How are you making your testing as efficient as possible?

**Architecture**

- How are you making sure services are efficiently provisioned, with high server utilisation and compute efficiency?
- How do you manage environments so they are only turned on when needed? How do you remove unused assets?
- Where possible, are you shifting workloads in time to match when low carbon electricity is available?

**Data**

- Is there a clear reason for all the data the service collects? Do you avoid 'single use' data where possible?
- How are you reducing the energy used to store, process and transfer data?
- Are security measures proportionate and balanced against sustainability impacts?

**User experience and journey design**

- How are you designing service journeys to be as sustainable as possible? Include online and offline steps. Reduce the need for users to change channels as far as you can.
- How are you making web pages, notifications and documentation as lightweight as possible?
- Have you thought about rebound effects and their sustainability impacts? A rebound effect is when making something more efficient leads people to use it more, so the total impact can go up.

**AI**

- Is the service clear about why it needs AI and what benefits AI brings?
- Have you chosen the lowest energy AI model that meets the project's needs?
- How have you reduced the environmental impacts of training and operating AI models?

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Tracking sustainability performance for this objective</span></summary>
<div class="govuk-details__text">

- See [measure sustainability](/digital-sustainability/measure) for guidance on quantifying energy use and carbon for a service

</div>
</details>

## Objective 2: Reduce the wider planetary impacts of digital services

### What this objective is about

Defra's digital sustainability strategy aims to understand and reduce the planetary impacts of technology beyond carbon emissions. These are:

- water consumption
- resource use
- land-use change
- biodiversity impacts
- local air pollution

These impacts can come from:

- mining
- manufacturing and processing
- distribution processes
- running digital services, such as water used to cool data centres

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Questions to ask at alpha</span></summary>
<div class="govuk-details__text">

**Procurement of hosting**

- Will the service need new cloud hosting or data centre capacity?
- If so, are you factoring sustainability into where the infrastructure is located? Look at:
  - cooling methods, for example passive air cooling or water cooling
  - Water Usage Effectiveness (WUE), which is how efficiently water is used compared with the energy used by IT equipment
  - water stress levels in the regions where the data centres will be

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Questions to ask at beta</span></summary>
<div class="govuk-details__text">

There are no questions for this objective beyond those for objective 1.

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Tracking sustainability performance for this objective</span></summary>
<div class="govuk-details__text">

Suppliers of hosting or hardware may track planetary impacts, such as water use or land use change. Beyond supplier reporting, Defra does not currently expect services to track performance for this objective.

</div>
</details>

## Objective 3: Reduce natural resource use and improve our circular economy approach

### What this objective is about

Circularity means using fewer new resources, and avoiding resource use and waste you do not need.

It can apply to hardware, software, architectural components and the design patterns we use for service journeys.

You can follow the 4 principles of the [Circular and Fair ICT Pact](https://circularandfairictpact.com/cfit-framework-cases/):

- **Buy Less:** only buy new hardware and software when it is clear that existing products cannot do the job
- **Buy Better:** if you need new products, buy or develop energy-efficient, durable items that are designed to be repaired, upgraded and re-used
- **Use Better:** get the most out of ICT products through their working life, with proper maintenance, upgrades and sharing
- **Use Longer:** extend the life of devices or software through repair, refurbishment and sharing, so they are not thrown away too early

When products reach the end of their life, make sure they are recycled properly.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Questions to ask at alpha</span></summary>
<div class="govuk-details__text">

**Legacy systems and technology**

- Do any legacy systems, hardware or software need to be decommissioned? This includes zombie applications in the cloud, which still run but nobody uses.
- If so, are you factoring sustainability into decommissioning? Are you disposing of hardware and software in as circular a way as possible?

**Procurement of equipment and systems**

- Is the service buying or renting hardware?
- If so, are you considering refurbished or remanufactured equipment before new?

**Planning for sustainable delivery from private beta**

- Does the team know the principles of circularity, and plan to follow them from private beta onwards? This covers software, architecture and hardware management.

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Questions to ask at beta</span></summary>
<div class="govuk-details__text">

**Hardware**

- If you are buying or renting hardware, how are you managing its lifecycle impacts? How are you keeping it in use for as long as possible?
- How are you supporting older end-user devices and slower connections?

**Software**

- Are you re-using existing software tools and components, where appropriate, rather than developing them from scratch?

**Architecture**

- Are you re-using existing architectural components, rather than developing them from scratch?

**User experience and journey design**

- Are you using established service patterns to design service journeys?
- Are you following existing design patterns for interactions and page layouts?

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Tracking sustainability performance for this objective</span></summary>
<div class="govuk-details__text">

- See [measuring the impact of hardware](/digital-sustainability/measure/hardware) for guidance on hardware and circularity metrics

</div>
</details>

## Objective 4: Reduce social risk and deliver social value

### What this objective is about

[Embedding social value](https://www.gov.uk/government/publications/ppn-002-taking-account-of-social-value-in-the-award-of-contracts/procurement-policy-note-002-the-social-value-model-html) is a core value of UK government procurement. It makes sure public spending brings extra economic, social and environmental benefits.

Procurement also needs to find and reduce the risks in operational supply chains where the risk of social exploitation or inequality is high.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Questions to ask at alpha</span></summary>
<div class="govuk-details__text">

**Procurement**

- Is the service doing any procurement?
- If so, is social value a core part of it? Are you choosing suppliers that make significant social value commitments? Do they find and act on social risks, both their own and those in their supply chain?

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Tracking sustainability performance for this objective</span></summary>
<div class="govuk-details__text">

To track success against this objective, you mainly rely on suppliers and partners reporting on:

- progress on any social value commitments they made
- evidence of action to uphold fair labour practices
- actions to address modern slavery
- actions to address equality, diversity and inclusion (EDI) risks
- the sustainable use of resources

</div>
</details>

## Objective 5: Increase transparency and accountability, internally and in the supply chain

### What this objective is about

It is often hard to see the full environmental and social impacts of the hardware and services suppliers provide. This is because there is little visibility of the supply chain beyond the first supplier.

By 2030, Defra wants a clear understanding of the sustainability risks and global challenges in its supply chain. Then it can act to reduce them as far as possible.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Questions to ask at alpha</span></summary>
<div class="govuk-details__text">

**Procurement**

- Is the service doing any procurement?
- If so, are you choosing suppliers that commit to working towards transparency? This means being open about the environmental and social impacts of processes in their supply chain.

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Tracking sustainability performance for this objective</span></summary>
<div class="govuk-details__text">

At service level, you can track success through reports from suppliers and partners. They can report on how open they are about the environmental and social impacts of processes in the technology supply chain. They can also report on what they do to reduce those impacts.

</div>
</details>

## Objective 6: Improve our technology's resilience to climate and environment risks

### What this objective is about

Defra's digital and technology operations and services may be at risk from:

- climate change in the near future
- extreme weather events
- shortages of critical minerals

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Questions to ask at alpha</span></summary>
<div class="govuk-details__text">

**Planning for sustainable delivery from private beta**

- From private beta onwards, are you planning for resilience to climate and extreme weather events?

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Questions to ask at beta</span></summary>
<div class="govuk-details__text">

**Service delivery**

- Are you building resilience to climate and extreme weather events into service design and development?
- Are you taking any adaptation measures you need? These are changes that help the service cope with a changing climate.
- Are backups and redundancy sized and balanced appropriately, given the risks and the environmental footprint of this resilience?

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Tracking sustainability performance for this objective</span></summary>
<div class="govuk-details__text">

To track success against this objective, you will probably rely mainly on suppliers and partners reporting on:

- how aware they are of climate risk to the services they provide
- evidence that they have appropriate mitigation and adaptation plans in place

</div>
</details>
