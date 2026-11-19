---
title: "Measuring the impact of software"
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
  - text: "Measuring the impact of software"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
Measuring the environmental impacts produced by software can:

- Provide insight that can guide practitioners working on this aspect of digital services towards identifying how reductions can be made
- Feed into estimates of the environmental impacts of a [whole service or project](/digital-sustainability/measure)

There are a number of methods to estimate software energy consumption, depending on whether:

- Software runs in the cloud
- Software runs on hardware that we can access
- Software is consumed 'as a service'

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about measuring software energy use</span></summary>
<div class="govuk-details__text">

- [How to accurately measure the energy consumption of application software,](https://greensoftware.foundation/articles/how-to-accurately-measure-the-energy-consumption-of-application-software/) Green Software Foundation
- [Software Energy Intensity (SEI),](https://greensoftware.foundation/standards/sei/) Green Software Foundation
- [How to measure and reduce the carbon footprint of your application,](https://www.microsoft.com/en-gb/microsoft-cloud/blog/technetuk/2021/10/12/how-to-measure-and-reduce-the-carbon-footprint-of-your-application/) Microsoft

</div>
</details>

---

## Software running in the cloud

When software applications run in the public cloud, we do not have access to power meters or sensors that can be used to directly measure energy use. Instead, assumptions must be used about the shared hardware it runs on and the rate at which that hardware is utilised.

The page on approaching measuring the [carbon for cloud computing](/digital-sustainability/measure/cloud-carbon) details approaches that can be taken to converting cloud usage metrics from supplier reporting and dashboards into energy use estimates.

---

## Software running on visible hardware

Software can run on equipment that is controlled by the organisation. This could be a laptop, or a server in an on-premises data centre.

In these cases, measuring energy use can occur by:

- Direct measurement of hardware power draw
- Modelling of energy use through hardware utisilisation

Guidance on taking these approaches can be found on the [energy use](/digital-sustainability/measure/hardware-energy) page in the measurement section.

---

## Software-as-a-Service and other managed software

Software is often consumed ‘as a service’, through Software-as-a-Service or Managed Software-as-a-Service models. In these circumstances the hosting and maintenance of software will be managed by a supplier and are outside of the direct control of teams working to design and develop government services.

Where a service team has contact with the supplier, request the following metrics:

- Energy consumption attributable to the software in kWh. For complex software comprising multiple applications, modules or functional components, energy consumption should be disaggregated at component level wherever possible.
- Hosting location
- Data centre Power Usage Effectiveness (PUE, if not accounted for in energy consumption)
- Hardware embodied carbon
- Hardware expected lifespan

Collecting these metrics is valuable, as although services cannot directly influence the hosting infrastructure, teams may be able to influence how the software is configured, used and managed. For example, services may be able to set data retention policies, storage configuration and usage configurations which impact the environmental footprint.

Metrics provided by suppliers can then be combined with the Greenhouse Gas (GHG) conversion factors for electricity and an appropriate functional unit to calculate the [Software Carbon Intensity](/digital-sustainability/measure/carbon-formula).

For complex software, it may be appropriate to calculate SCI scores at component level as a more granular assessment can highlight opportunities for targeted optimisation.
