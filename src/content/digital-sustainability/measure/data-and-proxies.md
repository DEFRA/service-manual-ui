---
title: "Data availability, using proxies and direct measurement"
caption: "Measure sustainability"
description: "You often cannot measure an impact directly. Use direct measurement where you can, then activity-based proxies, then spend-based proxies."
layout: section
sectionNav: nav-ds-measure
customNav: nav-digital-sustainability
headerServiceName: Sustainability
headerServiceUrl: /digital-sustainability
breadcrumbItems:
  - text: "Digital Defra"
    href: /
  - text: "Sustainability"
    href: /digital-sustainability
  - text: "Measure sustainability"
    href: /digital-sustainability/measure
  - text: "Data availability, using proxies and direct measurement"
---
## The measurement gap

People often talk about a measurement gap in digital sustainability. Technology such as AI and cloud computing moves fast, and the tools to track its real environmental and social impacts lag behind.

Suppliers often hold back data and methods differ, so parts of a service cannot be seen or compared.

The main issues are:

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header">Issue</th><th scope="col" class="govuk-table__header">Description</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Lack of access to quality data</th><td class="govuk-table__cell">Suppliers across the supply chain often do not share data, so parts of systems are invisible. This leads to fragmented metrics and heavy reliance on rough estimates.</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">No standard boundaries for digital systems</th><td class="govuk-table__cell">This makes it hard to compare calculations.</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Tooling</th><td class="govuk-table__cell">Teams often do not have tools to make the calculations.</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">No industry-wide standard methods</th><td class="govuk-table__cell"><p class="govuk-body">No single framework for measuring IT systems and services is used everywhere, so systems and services are hard to compare. This is especially true for AI. Existing frameworks include:</p><ul class="govuk-list govuk-list--bullet govuk-!-margin-bottom-0"><li>the <a class="govuk-link" href="/digital-sustainability/measure/carbon-formula">Software Carbon Intensity (SCI)</a> specification, an ISO standard</li><li>the <a class="govuk-link" href="https://oecd.ai/en/footprint">AI footprint</a> initiative (OECD.AI)</li><li>the <a class="govuk-link" href="https://ghgprotocol.org/product-standard">Product Standard</a> (GHG Protocol)</li><li>the <a class="govuk-link" href="https://ghgprotocol.org/sites/default/files/2023-03/GHGP-ICTSG%20-%20ALL%20Chapters.pdf">ICT sector guidance</a> (GHG Protocol, PDF)</li></ul></td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Top-down and bottom-up estimates differ</th><td class="govuk-table__cell">Top-down estimates extrapolate from total energy use across a sector. Bottom-up calculations add up the footprints of individual devices, components and networks. The two often disagree, which leads to wide margins of error.</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Limited disclosure</th><td class="govuk-table__cell">Methods, boundaries and assumptions are often not published, so figures are hard to verify.</td></tr></tbody></table>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading on the measurement gap</span></summary>
<div class="govuk-details__text">

- [SCI for Web](https://greensoftware.foundation/standards/sci-web/) (Green Software Foundation): discusses some of the measurement gap challenges
- [Tokens and greens: measuring the impacts of agentic AI](https://greensoftware.foundation/articles/tokens-and-greens-measuring-the-impacts-of-agentic-ai/) (Green Software Foundation): calls for shared responsibility for measuring AI
- [Measuring the environmental impacts of artificial intelligence computing and applications](https://oecd.ai/en/footprint) (OECD.AI)
- [Measuring AI's energy and environmental footprint](https://www.cmu.edu/work-that-matters/energy-innovation/measuring-ais-energy-and-environmental-footprint) (Carnegie Mellon University)
- [Beyond counting carbon: AI environmental assessments struggle to inform net impact decisions](https://research-information.bris.ac.uk/ws/portalfiles/portal/477196732/HAL_Augmenting_Methodologies_for_Net_Environmental_Impact_Assessments_for_AI.pdf) (Cook, Jacob, Lindsay Walton, Berthelot, Hussain and Schien, University of Bristol, PDF)

</div>
</details>

Because of the measurement gap, teams often need to use proxy metrics.

## Using proxies to estimate environmental impacts

A proxy is an indirect measure that stands in for an environmental or social impact you cannot measure directly. Project and service teams often need proxies, because direct measurement is not possible.

A well-chosen proxy works as a directional indicator. If the proxy goes down, you can expect the impact to go down too. Changes in the proxy show whether your actions are working, and help you prioritise.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Proxy example: volume of stored data</span></summary>
<div class="govuk-details__text">

The volume of stored data, in gigabytes, can be a proxy for environmental impact. Storing less data counts as progress, on the assumption that less storage needs fewer resources and has a smaller footprint. But this proxy misses the tier the data is stored in. A large volume of data in cold storage may have a smaller carbon footprint than a small volume in hot storage.

</div>
</details>

Carbon dioxide equivalent (CO2e) is itself a proxy. Greenhouse gases such as methane and nitrous oxide are converted into the amount of carbon dioxide that would have the same warming effect. When people talk about carbon emissions, they mean CO2e. Read [getting the measure of GHG emissions](https://www.theccc.org.uk/2012/05/16/getting-the-measure-of-ghg-emissions/) (Climate Change Committee).

Proxies are often combined with a conversion factor to estimate energy, carbon or water use. The proxy is a measurable unit of work. An emission factor is the energy, carbon or water used for each unit of activity.

<div class="govuk-inset-text">

Environmental impact = proxy × emission factor

</div>

For digital systems, proxies are usually either:

- spend-based
- activity-based

Which you use depends on the tools and data you have, and how accurate you need to be.

### Spend-based proxies

Spend-based proxies use money spent to measure environmental impact. You can either:

- multiply spend by an emission factor, such as kilograms of CO2e per pound, to estimate carbon, water or other impacts
- use cost as a directional indicator of resource use. For example, right-sizing an over-provisioned resource (making it match what you use) or turning off an unused environment saves both cost and carbon

<div class="govuk-warning-text"><span class="govuk-warning-text__icon" aria-hidden="true">!</span><strong class="govuk-warning-text__text"><span class="govuk-visually-hidden">Warning</span>Spend can mislead. Newer, more efficient processors may cost more than older ones and use less energy. Cloud prices can also change for reasons that have nothing to do with emissions, so spend is an unreliable marker over time.</strong></div>

For cloud services, spend data is easy to get through cloud billing APIs and standard invoices.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading on spend-based and activity-based proxies</span></summary>
<div class="govuk-details__text">

- [Spend-based vs activity-based data](https://www.climatepartner.com/en/knowledge/blog/spend-based-vs-activity-based) (ClimatePartner)
- [Spend-based vs activity-based: how to choose the right carbon accounting method](https://www.climatiq.io/blog/spend-based-vs-activity-based) (Climatiq)

</div>
</details>

### Activity-based proxies

Activity-based proxies are measures of digital use or activity, such as:

- computing hours (vCPU hours: hours of virtual processor time)
- data storage
- data transferred

Activity data can also cover offline parts of the service:

- distance travelled
- fuel used
- paper used

You can use an activity proxy on its own, as a stand-in for an environmental metric. Or you can combine it with a conversion factor to estimate energy or carbon.

<div class="govuk-warning-text"><span class="govuk-warning-text__icon" aria-hidden="true">!</span><strong class="govuk-warning-text__text"><span class="govuk-visually-hidden">Warning</span>Activity-based proxies can miss things that change the real impact. For example, a fall in the gigabytes of data transferred may show a reduced impact. You can also convert it to energy and emissions with conversion factors. It will not show how efficient the network is, or how clean the grid is.</strong></div>

### Choosing between direct measurement, activity-based and spend-based proxies

Use metrics to help the people working on a service assess the impact of their actions.

Use direct measurement where you can. If you cannot, use activity-based proxies. Use spend-based proxies last.
