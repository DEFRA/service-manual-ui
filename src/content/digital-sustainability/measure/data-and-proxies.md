---
title: "Data availability, using proxies and direct measurement"
caption: "Measure sustainability"
layout: section
sectionNav: nav-ds-measure
customNav: nav-digital-sustainability
headerServiceName: Digital sustainability
headerServiceUrl: /digital-sustainability
breadcrumbItems:
  - text: "Digital Defra"
    href: /
  - text: "Digital sustainability"
    href: /digital-sustainability
  - text: "Measure sustainability"
    href: /digital-sustainability/measure
  - text: "Data availability, using proxies and direct measurement"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
## The 'measurement gap'

It is often said that a ‘measurement gap’ exists in digital sustainability, whereby there is a disconnect between the fast-moving development of technology (such as AI and cloud computing) and the tools available to track its real environmental and societal impacts.

Lack of access to quality data, application of consistent boundaries and methodologies and tooling mean that often parts of digital systems are invisible, and comparison between services and products can be challenging.

Some of the main issues include:

<table class="govuk-table"><thead class="govuk-table__head"><tr class="govuk-table__row"><th scope="col" class="govuk-table__header">Issue</th><th scope="col" class="govuk-table__header">Description</th></tr></thead><tbody class="govuk-table__body"><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Lack of access to quality data</th><td class="govuk-table__cell">Data is often not made available from suppliers across supply chains, meaning parts of systems are often invisible. This leads to fragmented metrics and heavy reliance on rough estimates</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">No standard boundaries set for digital systems</th><td class="govuk-table__cell">Making comparison between calculations difficult.</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Tooling</th><td class="govuk-table__cell">Tooling to enable teams to make calculations is often not available</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Lack of industry-wide standard methodologies</th><td class="govuk-table__cell"><p class="govuk-body">There is no one universally adopted framework for measurement of IT systems and services, making comparisons between systems and services challenges. This is especially the case for AI. Existing frameworks include:</p><ul class="govuk-list govuk-list--bullet govuk-!-margin-bottom-0"><li>The Software Carbon Intensity (ISO Standard)</li><li>OECD AI Footprint initiative</li><li><a class="govuk-link" href="https://www.google.com/search?q=ghg+product+standard&amp;oq=ghg+product&amp;gs_lcrp=EgRlZGdlKgoIABAAGIAEGPkHMgoIABAAGIAEGPkHMgYIARBFGDkyCAgCEAAYFhgeMggIAxAAGBYYHjIICAQQABgWGB4yCAgFEAAYFhgeMggIBhAAGBYYHjIICAcQABgWGB4yCAgIEAAYFhgeMggICRDpBxj8VdIBCDI1OThqMGo3qAIAsAIA&amp;sourceid=chrome&amp;source=chrome.ob&amp;ie=UTF-8">GHG product standard</a></li><li><a class="govuk-link" href="https://ghgprotocol.org/sites/default/files/2023-03/GHGP-ICTSG%20-%20ALL%20Chapters.pdf">GHG protocol ICT guidance</a></li></ul></td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Top-Down vs. Bottom-Up Divergence</th><td class="govuk-table__cell">Macro or "top-down" estimates (extrapolating aggregate sectoral energy use) frequently clash with "bottom-up" calculations (summing individual device, component, and network footprints), leading to wide margins of error</td></tr><tr class="govuk-table__row"><th scope="row" class="govuk-table__header">Mandatory disclosure</th><td class="govuk-table__cell">Methods, boundaries and assumptions are often not disclosed, making verification challenging</td></tr></tbody></table>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Link to further reading on this topic</span></summary>
<div class="govuk-details__text">

- [https://greensoftware.foundation/standards/sci-web/](https://greensoftware.foundation/standards/sci-web/) this page for example discusses some of the measurement gap challenges.
- [https://greensoftware.foundation/articles/tokens-and-greens-measuring-the-impacts-of-agentic-ai/](https://greensoftware.foundation/articles/tokens-and-greens-measuring-the-impacts-of-agentic-ai/) GSF calling for ‘share responsibility’ and work still required?
- [https://oecd.ai/en/footprint](https://oecd.ai/en/footprint)
- [https://www.cmu.edu/work-that-matters/energy-innovation/measuring-ais-energy-and-environmental-footprint](https://www.cmu.edu/work-that-matters/energy-innovation/measuring-ais-energy-and-environmental-footprint)
- [https://research-information.bris.ac.uk/ws/portalfiles/portal/477196732/HAL\_Augmenting\_Methodologies\_for\_Net\_Environmental\_Impact\_Assessments\_for\_AI.pdf](https://research-information.bris.ac.uk/ws/portalfiles/portal/477196732/HAL_Augmenting_Methodologies_for_Net_Environmental_Impact_Assessments_for_AI.pdf) Beyond Counting Carbon: AI Environmental Assessments Struggle to Inform Net Impact Decisions, Joseph Cook, Romain Jacob, Jo Lindsay Walton, Adrien Berthelot, Asim Hussain, Daniel Schien

</div>
</details>

Because of the 'measurement gap' and the challenges around measuring sustainability, we often need to look to 'proxy' metrics.

## Usy proxies to estimate environemntal impacts

A proxy is an indirect measure that stands in for an environmental or social impact that cannot be measured directly. Project and service teams will often need to use proxies to estimate environmental impact, as direct measurement is not feasible.

If appropriate proxies are chosen, they can act as a 'directional indocator, and changes to the proxy measure can demonstrate whether sustainability actions are having the intended effect, and support teams to prioritise their work.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Proxy example: volume of stored data as a proxy.</span></summary>
<div class="govuk-details__text">

The volume of stored data, measured in gigabytes, can be used as a proxy for environmental impact. A reduction in stored data would indicate progress based on an assumption that less storage requires fewer resources and therefore has a lower environmental footprint. In this example, the proxy misses key distinctions such as the tier of storage the data is in. A larger volume of data held in ‘cold storage’ may have a lower carbon footprint than a smaller volume held in ‘hot storage’.

</div>
</details>

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Proxy example: Carbon dioxide-equivalence as a proxy for all greenhouse gases</span></summary>
<div class="govuk-details__text">

The global warming impact of a range of greenhouse gases (such as methane and nitrous oxide) are often converted into a figure of the warming impact that an equivalent amount of carbon dioxide would have. When we talk about ‘carbon’ emissions, this is carbon dioxide-equivalence, which is already a proxy measure.

[https://www.theccc.org.uk/2012/05/16/getting-the-measure-of-ghg-emissions/](https://www.theccc.org.uk/2012/05/16/getting-the-measure-of-ghg-emissions/)

</div>
</details>

Proxies are often combined with a conversion factor to generate an estimate for energy, carbon or water usage. The formula for this is below. The proxy can represent a measurable unit of work, and the emission factor is a calculated consistent of the energy, carbon dioxide-equivalence (CO2e) or water is consumed per activity of work.

<div class="govuk-inset-text">

Environmental Impact = Proxy x Emission Factor

</div>

For digital systems, proxies are normally split into:

- Spend-based proxies
- Activity-based proxies

The proxy type selected will depend on what tooling and data is available to measure environmental and social impacts, and the level of accuracy required.

### Spend-based proxies

Spend-based proxies use monetary expenditure to measure environmental impact. This can either be done:

- Using an emission factor (e.g., kg carbon dioxide per unit of currency) to estimate carbon emissions, or water or other environmental impacts.
- Using cost as a directional indicator for resource consumption. For example, right sizing an over-provisioned resource or turning off in-active environments will save both cost and carbon.

<div class="govuk-warning-text"><span class="govuk-warning-text__icon" aria-hidden="true">!</span><strong class="govuk-warning-text__text"><span class="govuk-visually-hidden">Warning</span>Note: There are instances where spend can be misleading. For example, newer and more efficient processers may cost more than older ones, while delivering lower energy consumption. Price fluctuation of cloud provider services can also occur independently to emissions making it an unreliable marker over time.</strong></div>

For cloud-based digital services, spend data is readily available through cloud billing APIs and standard invoices.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more on spend- and activity-based proxies</span></summary>
<div class="govuk-details__text">

- [https://www.climatepartner.com/en/knowledge/blog/spend-based-vs-activity-based](https://www.climatepartner.com/en/knowledge/blog/spend-based-vs-activity-based)
- [https://www.climatiq.io/blog/spend-based-vs-activity-based](https://www.climatiq.io/blog/spend-based-vs-activity-based)

</div>
</details>

### Activity-based proxies

Activity proxies are quantifiable metric of digital usage or activity. This could be:

- computing hours (vCPU hours)
- data storage
- data transferred

Activity data can also include offline aspects of the service:

- distance travelled
- fuel consumption
- paper consumption

Activity proxies can either be used as a stand in for environmental metrics directly or combined with conversion factors to estimate energy or carbon.

<div class="govuk-warning-text"><span class="govuk-warning-text__icon" aria-hidden="true">!</span><strong class="govuk-warning-text__text"><span class="govuk-visually-hidden">Warning</span>Note: Note that activity-based proxies may not capture important variables that influence the actual environmental impact. For example, a reduction in the total volume of data transferred (measured in GB) over time may be used as an indicator of reduced environmental impact. Alternatively, data transfer volumes can be converted into estimated energy consumption and associated emissions using relevant conversion factors. What this wouldn’t capture is the such as the energy efficiency of the underlying network infrastructure, the efficiency of data transfer, or variations in local grid carbon intensity.</strong></div>

### Selecting between direct measurement, spend based and activity based

The purpose of any metrics used should be to guide practitioners working on particular aspects of digital services or other projects to assess the impacts of actions.

Where possible, direct measurement should be preferred, followed by activity-based proxies and then spend-based proxies are last choice.
