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
Measuring the environmental impacts of software can:

- show the people working on software where they can make reductions
- feed into estimates of the impacts of a [whole service or project](/digital-sustainability/measure)

How you estimate the energy software uses depends on whether it:

- runs in the cloud
- runs on hardware you can access
- is bought as a service

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Further reading on measuring software energy use</span></summary>
<div class="govuk-details__text">

- [How to accurately measure the energy consumption of application software](https://greensoftware.foundation/articles/how-to-accurately-measure-the-energy-consumption-of-application-software/) (Green Software Foundation)
- [Software Energy Intensity (SEI)](https://greensoftware.foundation/standards/sei/) (Green Software Foundation)
- [How to measure and reduce the carbon footprint of your application](https://www.microsoft.com/en-gb/microsoft-cloud/blog/technetuk/2021/10/12/how-to-measure-and-reduce-the-carbon-footprint-of-your-application/) (Microsoft)

</div>
</details>

---

## Software in the cloud

In the public cloud you cannot use power meters or sensors to measure energy directly. Instead, you make assumptions about the shared hardware the software runs on and how heavily it is used.

[Calculating carbon for services based in the cloud](/digital-sustainability/measure/cloud-carbon) explains how to turn cloud usage data from supplier reporting and dashboards into energy estimates.

---

## Software on hardware you can access

Software can run on equipment your organisation controls, such as a laptop or a server in an on-premises data centre.

You can then measure energy use by:

- measuring the power the hardware draws directly
- modelling energy use from hardware utilisation

Read about [estimating the energy use of hardware](/digital-sustainability/measure/hardware-energy).

---

## Software as a service

Software is often bought as a service, through software as a service (SaaS) or managed SaaS. The supplier hosts and maintains the software, so it is outside the direct control of teams designing and building government services. It is still inside the [recommended boundary](/digital-sustainability/measure/boundaries-and-units).

If you are in contact with the supplier, ask for:

- the energy the software uses, in kWh, broken down by application, module or component where possible for complex software
- the hosting location
- the data centre's power usage effectiveness (PUE), if it is not already in the energy figure
- the embodied carbon of the hardware: the carbon from making and transporting it
- the expected lifespan of the hardware

These metrics are worth collecting. You cannot change the supplier's infrastructure, but you may be able to change how the software is configured, used and managed. For example, you may be able to set data retention policies, storage settings and usage settings that affect its footprint.

You can use the supplier's figures to calculate the [Software Carbon Intensity (SCI)](/digital-sustainability/measure/carbon-formula). Combine them with the [UK government conversion factors for greenhouse gas reporting](https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting) (GOV.UK) for electricity. Then use a suitable functional unit: a unit of output, such as a user or a transaction.

For complex software, it may help to calculate an SCI score for each component. A more detailed assessment can show where to target improvements.

---

## Reuse of components

Reusing software components is part of Defra's objective to put circular practices into action. Record:

- the proportion of software components you reuse, compared with those you build from scratch
