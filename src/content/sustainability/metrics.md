---
title: Taking action and tracking sustainability performance through the Agile lifecycle
caption: How to meet the standard
layout: section
sectionTitle: Sustainability
sectionNav:
  - title: In this section
    items:
      - text: Deliver a sustainable service
        href: /sustainability
      - text: Defra's six objectives
        href: /sustainability/objectives
  - title: How to do this
    items:
      - text: Assess risks and record sustainability actions
        href: /sustainability/process
      - text: Taking action and tracking sustainability performance
        href: /sustainability/metrics
---

[Defra's Digital Sustainability Strategy](https://www.gov.uk/government/publications/defra-digital-sustainability-strategy-2025-to-2030/defra-digital-sustainability-strategy-2025-to-2030) lays out 6 key sustainability objectives, and the 15th Service Standard point requires that services take action and track performance against these.

The Digital Sustainability Statement provides a document for service teams to record what sustainability actions they have been able to take, or plan to, and how sustainability performance is being tracked for each of the 6 strategic sustainability objectives.

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      A pragmatic approach to tracking sustainability performance and taking action in the absence of metrics
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body">Defra has the aspiration for individual projects and services to track sustainability performance for each of the 6 objectives of the Digital Sustainability Strategy.</p>
    <p class="govuk-body">However, while measurement may be relatively straightforward for some objectives, for others, it may still be very challenging at present. This page lays out expectations for tracking sustainability performance for each of the 6 objectives.</p>
    <p class="govuk-body">Even in the absence of tracking particular metrics, it is important to note that many meaningful sustainability actions can be taken without explicitly quantifying and tracking the performance of a service in this regard, such as:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>reducing data capture and storage</li>
      <li>turning off environments when not in use</li>
      <li>re-using components rather than developing them from scratch</li>
      <li>ensuring that any hardware is treated in as circular a manner as possible</li>
    </ul>
  </div>
</details>

## Objective 1: Decarbonisation towards net zero targets

### What this objective is about

Digital technology creates carbon emissions from the electricity it consumes when operational.

Embodied carbon comes through the mining, processing, manufacture, distribution and disposal of hardware used by services, as well as the processes that are followed to design and develop digital services.

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      Key sustainability considerations at Alpha
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body"><strong>Procurement of hosting</strong></p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Will the service require new cloud hosting or data centre capacity?</li>
      <li>If so, is sustainability being factored into the choice of locations for infrastructure, in terms of the proportion of renewable energy that is available and used on site, and levels of water stress? Are suppliers being selected that are monitoring and scoring well on sustainability metrics, as well as committing to manage and report on those at the service level?</li>
    </ul>
    <p class="govuk-body"><strong>Working with delivery suppliers</strong></p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Will the project be working with suppliers to design and develop the service?</li>
      <li>If so, have suppliers made commitments to environmental sustainability in delivery?</li>
    </ul>
    <p class="govuk-body"><strong>Planning for sustainable delivery from Private Beta</strong></p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Are the team aware of and planning to follow best practice at Private Beta for the delivery of efficient, appropriately provisioned and carbon aware services in terms of software, AI, architecture, UX and journey design and data management?</li>
    </ul>
  </div>
</details>

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      Key sustainability considerations at Beta
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body"><strong>Software</strong></p>
    <ul class="govuk-list govuk-list--bullet">
      <li>What approaches are being taken to ensure that software solutions are as energy efficient as possible?</li>
      <li>What is being done to take an approach to testing that is as efficient as possible?</li>
    </ul>
    <p class="govuk-body"><strong>Architecture</strong></p>
    <ul class="govuk-list govuk-list--bullet">
      <li>What approaches are being taken to ensure services are efficiently provisioned, with high server utilisation and compute efficiency?</li>
      <li>How are different environments being managed so that they are only turned on when needed, and any unused assets removed?</li>
      <li>Are workloads being shifted in time to match the availability of low carbon electricity, where possible?</li>
    </ul>
    <p class="govuk-body"><strong>Data</strong></p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Is there a clear rationale for all data the service collects, avoiding 'single use' data where possible?</li>
      <li>What approaches are being taken to reduce the energy consumption associated with data storage, processing and transfer?</li>
      <li>Are security measures proportionate and balanced against sustainability impacts?</li>
    </ul>
    <p class="govuk-body"><strong>User Experience &amp; Journey Design</strong></p>
    <ul class="govuk-list govuk-list--bullet">
      <li>What approaches are being taken to design service journeys to be as sustainable as possible, including both online and offline steps, and reducing the need for users to change channels as far as possible?</li>
      <li>How are web pages, notifications and documentation being designed to be as lightweight as possible?</li>
      <li>Are potential rebound effects of the service, and associated sustainability impacts, being considered?</li>
    </ul>
    <p class="govuk-body"><strong>Artificial Intelligence</strong></p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Is the service clear on the need for and benefits coming from any use of AI?</li>
      <li>Has the lowest energy AI model that meets the project's needs been selected?</li>
      <li>What approaches have been taken to reduce the environmental impacts of training and operating AI models?</li>
    </ul>
  </div>
</details>

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      Tracking sustainability performance for this objective
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body">You can measure against this objective with these suggested metrics:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>carbon per user transaction</li>
      <li>total annual carbon emissions of the service</li>
    </ul>
  </div>
</details>

### Recommended methodology

The [Software Carbon Intensity (SCI) specification (opens in a new tab)](https://grnsft.org/sci) is a methodology for calculating the rate of carbon emissions for a software system and is now an ISO standard (ISO/IEC 21031).

It aims to help teams developing software make better, evidence-based decisions during system design, development, and deployment, that will ultimately minimise carbon emissions.

### A suggested boundary for calculating carbon

An initial boundary that includes Cloud usage, 'Software as a Service' and managed services is suggested as a practical starting point for assessing the carbon emissions of the digital portion of a service.

### Tooling

For tooling, you can use the [Cloudability tool (opens in a new tab)](https://www.ibm.com/docs/en/cloudability-commercial/cloudability-enterprise/saas?topic=insights-cloud-sustainability-reporting). It offers estimations of operational and embodied carbon emissions data for Cloud services from the following operators:

- Amazon Web Services (AWS)
- Microsoft Azure
- Google Cloud Platform (GCP)
- Oracle Cloud Infrastructure (OCI)

Services can use their project codes to access this data. It is updated monthly.

## Objective 2: Reduce the wider planetary impacts of digital services

### What this objective is about

Defra's digital sustainability strategy outlines the department's ambition to understand and act to reduce the planetary impacts of technology usage beyond carbon emissions. It covers:

- water consumption
- resource use
- land-use change
- biodiversity impacts
- local air pollution

These impacts can occur through:

- mining
- manufacturing and processing
- distribution processes
- the operation of digital services, such as water used for cooling in data centres

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      Key sustainability considerations at Alpha
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body"><strong>Procurement of hosting</strong></p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Will the service require new cloud hosting or data centre capacity?</li>
    </ul>
    <p class="govuk-body">If so, is sustainability being factored into the choice of locations for infrastructure, including cooling methods (e.g. passive air cooling, water cooling), the Water Usage Effectiveness (WUE - the efficiency of water usage in relation to IT equipment energy consumption) and water stress levels of the regions that data centres will be located in?</p>
  </div>
</details>

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      Key sustainability considerations at Beta
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body">There are no additional sustainability considerations for this objective, in addition to those laid out for Objective 1: Decarbonisation towards net zero targets.</p>
  </div>
</details>

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      Tracking sustainability performance for this objective
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body">Planetary impacts, such as water usage or land use change may be tracked by suppliers of hosting or hardware. Beyond supplier reporting, Defra does not currently expect services to be tracking performance for this objective.</p>
  </div>
</details>

## Objective 3: Reduce natural resource use and improve our circular economy approach

### What this objective is about

Circularity means minimising our demand for primary resources and preventing unnecessary resource consumption and waste generation.

It can apply to hardware, software, architectural components and the design patterns we utilise for service journeys.

Circularity can be achieved through following the 4 principles of the [Circular and Fair ICT Pact](https://circularandfairictpact.com/cfit-framework-cases/):

- **Buy Less:** Ensure that we are only purchasing new hardware and software when it is clear that existing products cannot do the job
- **Buy Better:** If new products are necessary, then ensure that we are procuring or developing energy-efficient, durable items that are designed to be repaired, upgraded and re-used
- **Use Better:** Optimising the use of ICT products through their functional life, through proper maintenance, upgrades and sharing
- **Use Longer:** Extending the lifespan of devices or software to avoid premature disposal, through repair and refurbishment, and sharing to keep in use

When products reach their end of life, then we should ensure that they are appropriately recycled.

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      Key sustainability considerations at Alpha
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body"><strong>Legacy systems and technology</strong></p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Are there legacy systems that need to be decommissioned, including hardware and software, such as zombie applications in the cloud?</li>
      <li>If so, is sustainability being factored into decommissioning, and any hardware or software disposed of in as circular a manner as possible?</li>
    </ul>
    <p class="govuk-body"><strong>Procurement of equipment and systems</strong></p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Is there hardware being bought or rented by the service?</li>
      <li>If so, are refurbished or remanufactured equipment options being considered over new?</li>
    </ul>
    <p class="govuk-body"><strong>Planning for sustainable delivery from Private Beta</strong></p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Are the team aware of and planning to follow the principles of circularity from the Private Beta onwards, in terms of software, architecture and hardware management?</li>
    </ul>
  </div>
</details>

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      Key sustainability considerations at Beta
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body"><strong>Hardware</strong></p>
    <ul class="govuk-list govuk-list--bullet">
      <li>If hardware is being purchased or rented, what approaches are being taken to manage the lifecycle impacts and treat it in as circular a manner as possible?</li>
      <li>What approaches are being taken to support older end-user devices and slower connections?</li>
    </ul>
    <p class="govuk-body"><strong>Software</strong></p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Are existing software tools and components being re-used, rather than developed from scratch, where appropriate?</li>
    </ul>
    <p class="govuk-body"><strong>Architecture</strong></p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Are existing architectural components being re-used, rather than developed from scratch?</li>
    </ul>
    <p class="govuk-body"><strong>User Experience &amp; Journey Design</strong></p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Are established service patterns being used to design service journeys?</li>
      <li>Are existing design patterns being followed for interactions and the layout of website pages?</li>
    </ul>
  </div>
</details>

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      Tracking sustainability performance for this objective
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body">The following metrics can be recorded for this objective:</p>
    <p class="govuk-body"><strong>For hardware:</strong></p>
    <ul class="govuk-list govuk-list--bullet">
      <li>volume of new hardware purchased or rented, number of devices made from recycled materials, number of devices with particular eco-labels or meeting particular standards</li>
      <li>volume of refurbished or remanufactured hardware purchased or rented</li>
      <li>volume of decommissioned equipment, and the fate of that waste (whether buy-back, re-used, re-distributed, recycled, sent to landfill etc)</li>
    </ul>
    <p class="govuk-body"><strong>For software and architectural components:</strong></p>
    <ul class="govuk-list govuk-list--bullet">
      <li>proportion of components re-used versus those built from scratch</li>
    </ul>
    <p class="govuk-body"><strong>For service and design patterns:</strong></p>
    <ul class="govuk-list govuk-list--bullet">
      <li>proportion of established service and design patterns re-used versus those developed from scratch</li>
    </ul>
  </div>
</details>

## Objective 4: Reduce social risk and deliver social value

### What this objective is about

[Embedding social value](https://www.gov.uk/government/publications/ppn-002-taking-account-of-social-value-in-the-award-of-contracts/procurement-policy-note-002-the-social-value-model-html) is a core value of procurement in UK government, to ensure public spending generates additional economic, social and environmental benefits.

We also need to ensure that procurement considers and seeks to mitigate areas of operational supply chains that are high risk for social exploitation or inequality.

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      Key sustainability considerations at Alpha
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body"><strong>Procurement</strong></p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Is the service conducting any procurement?</li>
      <li>If so, is social value being embedded as a core component of procurement, in terms of selecting suppliers making significant commitments to deliver on social value and identifying and taking action on their own social risks and those in the supply chain?</li>
    </ul>
  </div>
</details>

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      Tracking sustainability performance for this objective
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body">Tracking success against this objective primarily involves reporting from suppliers and partners on:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>progress on delivering on any social value commitments made</li>
      <li>evidence of action to uphold fair labour practices</li>
      <li>actions to address modern slavery</li>
      <li>actions to address Equality, Diversity, and Inclusion (EDI) risks</li>
      <li>the sustainable use of resources</li>
    </ul>
  </div>
</details>

## Objective 5: Increase supply chain transparency and accountability

### What this objective is about

The full environmental and social impacts of hardware components and other services that suppliers provide may often be obscured due to the lack of supply chain visibility beyond the first supplier.

Defra has the ambition to be an organisation that has a clear understanding of the sustainability risks and global challenges within its supply chain by 2030, in order that action can be taken to reduce these as far as possible.

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      Key sustainability considerations at Alpha
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body"><strong>Procurement</strong></p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Is the service conducting any procurement?</li>
      <li>If so, are suppliers being selected that are making commitments on working towards transparency on the environmental and social impacts of processes in the supply chain?</li>
    </ul>
  </div>
</details>

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      Recommended metrics
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body">At the service level, tracking success can involve reporting from suppliers and partners on the transparency on the environmental and social impacts of processes in the technology supply chain and actions to reduce these.</p>
  </div>
</details>

## Objective 6: Improve resilience to climate and environment risks

### What this objective is about

Defra's digital and technology operations and services may be at risk from an imminently changing climate, risks of extreme weather events and critical minerals shortages.

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      Key sustainability considerations at Alpha
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body"><strong>Planning for sustainable delivery from Private Beta</strong></p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Is resilience to climate and extreme weather events being factored into the delivery of the service from Private Beta onwards?</li>
    </ul>
  </div>
</details>

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      Key sustainability considerations at Beta
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body"><strong>Service delivery</strong></p>
    <ul class="govuk-list govuk-list--bullet">
      <li>Is resilience to climate and extreme weather events being factored into service design and development, and any appropriate adaptation measures being taken?</li>
      <li>Are backups and redundancy be sized and balanced appropriately, given the risks and the environmental footprint of this resilience?</li>
    </ul>
  </div>
</details>

<details class="govuk-details" data-module="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      Tracking sustainability performance for this objective
    </span>
  </summary>
  <div class="govuk-details__text">
    <p class="govuk-body">Tracking success against this objective will likely primarily involve reporting from suppliers and partners on:</p>
    <ul class="govuk-list govuk-list--bullet">
      <li>awareness of climate risk to the services they provide</li>
      <li>evidence of appropriate mitigation and adaptation plans in place</li>
    </ul>
  </div>
</details>
