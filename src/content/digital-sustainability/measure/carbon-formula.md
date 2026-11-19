---
title: "The equation for carbon measurement"
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
  - text: "The equation for carbon measurement"
supportBox:
  title: Get support
  description: "The <strong>Sustainable IT Team</strong> can help you with digital sustainability."
  items:
    - "Email: <a href=\"mailto:sustainableICT@defra.gov.uk\" class=\"govuk-link\">sustainableICT@defra.gov.uk</a>"
---
The [Software Carbon Intensity (SCI) specification](https://grnsft.org/sci) by the the [Green Software Foundation](https://greensoftware.foundation/standards/sci/) provides a formula to calculate the carbon produced by digital software and systems.

Rather than measuring total carbon, the SCI is an intensity metric that measures emissions per unit of service delivered, such as per completed transaction or volume of data captured per user. The closer the SCI score is to zero, the lower the carbon emissions per functional unit of the software system.

The SCI makes it easier to assess changes in carbon efficiency as service use grows or falls, helping teams make better, evidence-based decisions on what they can influence – whether technology stack, design, development and operation in order to minimise carbon emissions.

The SCI is an ISO standard and following the formula for whole-service carbon measurement should be considered best practice.

## The Formula

The SCI methodology calculates emissions using the equation:

<div class="govuk-inset-text">

SCI = (E × I) + M per R

</div>

Where:

<dl class="govuk-summary-list"><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">(E × I)</dt><dd class="govuk-summary-list__value">Describes the operational carbon produced by the service:</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">E (Energy)</dt><dd class="govuk-summary-list__value">The amount of energy (in kilowatt-hours, or kWh) the software consumes to run on servers, storage, and networks.</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">I (Carbon Intensity)</dt><dd class="govuk-summary-list__value">The carbon intensity of the electricity grid where the software runs (measured in grams of CO₂ per kWh).</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">M (Embodied Emissions)</dt><dd class="govuk-summary-list__value">A proportional share of the carbon emissions tied to manufacturing and disposing of the physical hardware the software uses, split by time and resource allocation.</dd></div><div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">R (Functional Unit)</dt><dd class="govuk-summary-list__value">The specific unit of output that the software scales with (such as per active user or per Gigabyte processed)</dd></div></dl>

Before we can calculate the SCI, we need to determine:

- The functional unit (R)
- The system boundary

### Extensions to the SCI standard

There are a number of domain-specific standards that build on the original SCI for software that are in progress by the Green Software Foundation.

<details class="govuk-details">
<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Read more about extensions to the SCI</span></summary>
<div class="govuk-details__text">

**SCI for AI:** The [SCI for AI](https://greensoftware.foundation/standards/sci-ai/) extends the SCI ISO speciation to address the unique aspects of Artificial Intelligence systems across its entire lifecycle. This includes:

- AI training
- Data preparation
- Inference

**SCI for Web:** The SCI for Web adapts the ISO-accredited SCI framework specifically to web applications, helping to define appropriate boundaries across servers, networks, third-party services, and end-user devices

The SCI for web [https://greensoftware.foundation/standards/sci-web/](https://greensoftware.foundation/standards/sci-web/)

[https://www.thegreenwebfoundation.org/news/an-update-on-sci-for-web-a-new-standard-for-measuring-software-carbon-intensity-for-the-web/](https://www.thegreenwebfoundation.org/news/an-update-on-sci-for-web-a-new-standard-for-measuring-software-carbon-intensity-for-the-web/) An update on SCI for Web – a new standard for measuring software carbon intensity for the Web

</div>
</details>
