---
title: "Measuring the impact of service journeys and processes"
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
  - text: "Measuring the impact of service journeys and processes"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
Measuring the environmental impacts of stpes in service journeys and business processes can:

- Provide insight that can guide practitioners working on this aspect of digital services towards identifying how reductions can be made
- Feed into estimates of the environmental impacts of a [whole service or project](/digital-sustainability/measure)

Measuring the environmental impacts can be conducted for:

- Digital journey steps
- Offline part of journeys

---

## Digital steps

For the digital steps of service journeys and business processes, the energy use of software can be measured through the following approaches:

1. Estimating the energy use of software running in the cloud
2. Measuring the energy use of software when we have visibility of the hardware on which it runs

The energy used by software can then be converted into an estimate for carbon emissions and water use.

<div class="govuk-inset-text">

For guidance on these approaches, see the [Software Measurement](/digital-sustainability/measure/software) page.

</div>

### (i) Using proxy measures for websites and applications

For software that runs on the internet as ‘web applications’ and websites, there are a number of observable proxy measures that can be used as ‘directional indicators’ for energy use. This means that we assume that if we reduce one of these proxy metrics, there will be a corresponding reduction in energy use.

In this way, these proxy measures can guide the decisions taken by those designing websites and web applications. Proxies include:

<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">‘Time-to-Interactive (TTI)’ / Page Load Speed</dt><dd class="govuk-summary-list__value">This approach assumes that faster, leaner experiences consume less device and network energy.</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Page Weight</dt><dd class="govuk-summary-list__value">This method is used by a number of online webpage carbon footprint calculators and models like the <a class="govuk-link" href="https://sustainablewebdesign.org/">Sustainable Web Design Model </a>and CO2.js. They take the weight (in bytes) of web pages and multiply it by an energy intensity factor to estimate the carbon emissions from the transfer of this data to the end user.</dd></div></dl>

### (ii) Other proxies

There are a number of other proxies that can be treated as ‘directional indicators’ and can be used to guide the design of digital journey steps. These include:

- User time on task (for example, registration or data submission)
- User task completion rate
- The number of users succeeding at the first attempt versus abandoned or repeated visits

Proxies for internal business processes might include:

- Support contacts per hundred registrations
- Staff processing time per completed case
- Number of processing steps or hand-offs
- Number of internal system transactions

---

## Offline journey steps

Estimating the environmental impacts of offline steps of service journeys and business processes typically involves a combination of data from:

- Life Cycle Assessments (LCA)
- Activity-based measures that take inputs such as transport methods and distances, and then use conversion factors to estimate either energy use or carbon. The latest [UK government conversion factors,](https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2026) which cover activities such as fuel and electricity use, travel, freight and waste can be used for this purpose.

### (i) Customer & Staff Travel

Travel, whether via public transport or private means is often the single largest contributor to offline carbon emissions.

UK Government Conversion factors can be used to multiply the distance travelled (or fuel consumed) by the relevant emission factor per kilometre or litre.

There are also number of tools that can help estimate the environmental impacts coming from user or staff travel. These include:

- The [Deloitte Travel Emissions Calculator](https://www.deloitte.com/uk/en/issues/climate/content/travel-emissions-calculator.html) combines distance-based travel emissions with hotel stays, allowing you to estimate emissions for a single trip, event or project.
- The [BlocCarbon Travel Carbon Calculator](https://bloccarbon.com/calculators/travel) estimates and compare emissions across different transport modes, including cars, buses, trains and flights.
- The [University of Manchester Carbon Emissions Saving Tool](https://carbon.manchester.ac.uk/) compares the carbon footprint of point-to-point journeys by air, rail, ferry, electric car and fossil-fuel car, showing potential carbon savings from switching transport mode.

### (ii) Buildings & Facilities

When an in-person service interaction takes place, a portion of the host building’s energy, heating, cooling and waste can be apportioned to it.

<div class="govuk-inset-text">

Where direct measurement is unavailable, allocate building consumption by occupied floor area, opening hours, staff time, appointments or number of visitors.

</div>

### (iii) Paper, printing and other materials

To estimate the environmental impacts of physical artefacts such as posted letters, measure the number, weight and delivery class of letters or parcels, transport distances, failed deliveries and returns. These figures can then be combined with the [UK government conversion factors](https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2026) to estimate carbon emissions.

### (iv) Call centre interactions

For the impacts of call centres, use call volumes and average handling time alongside measured or estimated energy consumption for offices, telephony, devices and supporting systems. Include repeat calls and transfers because these may be significant sources of avoidable demand.
