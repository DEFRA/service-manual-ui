---
title: "Measuring the impact of service journeys and processes"
caption: "Measure sustainability"
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
  - text: "Measuring the impact of service journeys and processes"
---
Measuring the environmental impacts of steps in service journeys and business processes can:

- show the people working on these parts of a service where they can make reductions
- feed into estimates of the impacts of a [whole service or project](/digital-sustainability/measure)

You can measure:

- digital steps of a journey
- offline steps of a journey
- how much the service reuses established patterns

---

## Digital steps

To measure the energy used by the software behind digital steps, and convert it to carbon and water, read [measuring the impact of software](/digital-sustainability/measure/software).

### (i) Proxies for websites and applications

Websites and web applications have some measures you can observe and use as [proxies](/digital-sustainability/measure/data-and-proxies) for energy use. They can guide the decisions of the people designing them. Proxies include:

<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Page load speed</dt><dd class="govuk-summary-list__value">Measure <a class="govuk-link" href="https://web.dev/articles/lcp">Largest Contentful Paint (LCP)</a> (web.dev): how long the main content takes to appear. This approach assumes that faster, leaner pages use less device and network energy.</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Page weight</dt><dd class="govuk-summary-list__value">The transfer size of a page, in bytes. Online page carbon calculators and models such as the <a class="govuk-link" href="https://sustainablewebdesign.org/">Sustainable Web Design Model</a> and CO2.js multiply page weight by an energy intensity factor to estimate the carbon from sending the page to the user.</dd></div></dl>

### (ii) Other proxies

Other proxies can also act as directional indicators: if the proxy number changes, it is a sign that the resource use and carbon from the service have probably changed too. They can guide the design of digital journey steps.

For each proxy, know which direction is better. Use rates rather than totals, so a change in how many people use the service does not look like a change in efficiency.

Proxies for digital journey steps include:

- user time on task, such as registering or submitting data: lower is better
- user task completion rate: higher is better
- first-time success rate, the share of users who succeed first time rather than giving up or coming back again: higher is better

Proxies for internal business processes might include:

- support contacts per hundred registrations: lower is better
- staff processing time per completed case: lower is better
- number of processing steps or hand-offs: fewer is better
- number of internal system transactions per completed case: fewer is better

---

## Offline journey steps

To estimate the environmental impacts of offline steps in service journeys and business processes, you usually combine:

- life cycle assessments (LCA), which add up a product's impacts from raw materials to disposal
- activity-based measures, which take inputs such as transport methods and distances and use conversion factors to estimate energy or carbon

The [UK government conversion factors for greenhouse gas reporting](https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting) (GOV.UK) cover activities such as fuel and electricity use, travel, freight and waste.

### (i) Customer and staff travel

Travel, by public transport or private vehicle, is often the largest source of offline carbon emissions.

Use the UK government conversion factors to multiply the distance travelled, or fuel used, by the emission factor per kilometre or litre.

Some tools can help estimate the impact of user or staff travel. These include:

- the [Deloitte Travel Emissions Calculator](https://www.deloitte.com/uk/en/issues/climate/content/travel-emissions-calculator.html), which combines distance-based travel emissions with hotel stays to estimate emissions for a single trip, event or project
- the [BlocCarbon Travel Carbon Calculator](https://bloccarbon.com/calculators/travel), which estimates and compares emissions for different transport, including cars, buses, trains and flights
- the [University of Manchester Carbon Emissions Saving Tool](https://carbon.manchester.ac.uk/), which compares the carbon footprint of point-to-point journeys by air, rail, ferry, electric car and fossil-fuel car. It shows the savings from switching

### (ii) Buildings and facilities

When an interaction happens in person, you can attribute a share of the building's energy, heating, cooling and waste to it.

<div class="govuk-inset-text">

If you cannot measure directly, share out the building's consumption by floor area used, opening hours, staff time, appointments or number of visitors.

</div>

### (iii) Paper and post

To estimate the impact of physical items such as posted letters, measure:

- the number, weight and delivery class of letters or parcels
- transport distances
- failed deliveries and returns

Combine these figures with the UK government conversion factors to estimate carbon emissions.

### (iv) Call centre interactions

For call centres, use call volumes and average handling time alongside measured or estimated energy use for offices, telephony, devices and supporting systems. Include repeat calls and transfers, because they can be a large source of avoidable demand.

---

## Reuse of patterns

Reusing established patterns is part of Defra's objective to put circular practices into action. Record:

- the proportion of established service and design patterns you reuse, compared with those you develop from scratch
